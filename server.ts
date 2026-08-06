import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import { SINGAPORE_HOSPITALS, YEARLY_HOSPITAL_STATS, NATIONAL_YEARLY_SUMMARY } from './src/data/singaporeHospitalsData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini AI instance
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// REST API Endpoints
app.get('/api/hospitals', (_req: Request, res: Response) => {
  res.json({ hospitals: SINGAPORE_HOSPITALS });
});

app.get('/api/stats', (req: Request, res: Response) => {
  const hospitalId = req.query.hospitalId as string;
  const year = req.query.year ? parseInt(req.query.year as string) : undefined;
  const cluster = req.query.cluster as string;

  let results = YEARLY_HOSPITAL_STATS;

  if (hospitalId) {
    results = results.filter(s => s.hospitalId.toLowerCase() === hospitalId.toLowerCase());
  }

  if (year) {
    results = results.filter(s => s.year === year);
  }

  if (cluster) {
    const hospitalIdsInCluster = SINGAPORE_HOSPITALS.filter(h => h.cluster === cluster).map(h => h.id);
    results = results.filter(s => hospitalIdsInCluster.includes(s.hospitalId));
  }

  const enriched = results.map(stat => {
    const profile = SINGAPORE_HOSPITALS.find(h => h.id === stat.hospitalId);
    return {
      ...stat,
      hospitalName: profile?.name || stat.hospitalId,
      hospitalShortName: profile?.shortName || stat.hospitalId,
      cluster: profile?.cluster,
      region: profile?.region,
      beds: profile?.beds,
    };
  });

  const nationalSummary = year ? NATIONAL_YEARLY_SUMMARY[year] : NATIONAL_YEARLY_SUMMARY[2023];

  res.json({
    stats: enriched,
    nationalSummary,
  });
});

// AI Search Query Handler
app.post('/api/query', async (req: Request, res: Response) => {
  try {
    const { query, hospitalId, year } = req.body;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Valid query text is required' });
      return;
    }

    const ai = getGeminiClient();

    // Context from dataset for RAG / exact precision
    const datasetContext = JSON.stringify({
      hospitals: SINGAPORE_HOSPITALS,
      stats: YEARLY_HOSPITAL_STATS,
      nationalTotals: NATIONAL_YEARLY_SUMMARY,
    });

    if (!ai) {
      // Fallback deterministic search if GEMINI_API_KEY is not configured
      const qLower = query.toLowerCase();
      const matchedHosp = SINGAPORE_HOSPITALS.find(h => 
        qLower.includes(h.shortName.toLowerCase()) || qLower.includes(h.name.toLowerCase()) || h.id === hospitalId
      ) || (hospitalId ? SINGAPORE_HOSPITALS.find(h => h.id === hospitalId) : SINGAPORE_HOSPITALS[1]); // Default TTSH

      const matchedYear = year || (query.match(/20\d\d/)?.[0] ? parseInt(query.match(/20\d\d/)![0]) : 2023);
      
      const stat = YEARLY_HOSPITAL_STATS.find(s => s.hospitalId === matchedHosp?.id && s.year === matchedYear) || 
                   YEARLY_HOSPITAL_STATS.find(s => s.hospitalId === 'ttsh' && s.year === 2023);

      res.json({
        answer: `In ${matchedYear}, ${matchedHosp?.name} (${matchedHosp?.shortName}) recorded ${stat?.inpatientAdmissions.toLocaleString()} inpatient admissions, representing an estimated admission rate of ${stat?.admissionRatePer1000} per 1,000 resident population. The hospital operated at a bed occupancy rate of ${stat?.bedOccupancyRate}% with an average length of stay of ${stat?.avgLengthOfStayDays} days.`,
        hospitalName: matchedHosp?.name,
        year: matchedYear,
        admissionsCount: stat?.inpatientAdmissions,
        admissionRatePer1000: stat?.admissionRatePer1000,
        bedOccupancyRate: stat?.bedOccupancyRate,
        avgLengthOfStayDays: stat?.avgLengthOfStayDays,
        keyTakeaways: [
          `${matchedHosp?.shortName} inpatient admissions in ${matchedYear}: ${stat?.inpatientAdmissions.toLocaleString()} cases.`,
          `Admission rate: ~${stat?.admissionRatePer1000} per 1,000 residents.`,
          `Bed Occupancy Rate: ${stat?.bedOccupancyRate}% (${stat && stat.bedOccupancyRate > 90 ? 'Peak capacity' : 'Optimal operating capacity'}).`,
          `Emergency A&E attendances: ${stat?.emergencyAttendance.toLocaleString()} visits with ${stat?.avgWaitTimeToWardHours}h median ward wait time.`
        ],
        suggestedQueries: [
          `Compare ${matchedHosp?.shortName} vs SGH admissions in ${matchedYear}`,
          `What was the bed occupancy for ${matchedHosp?.shortName} in 2022 vs 2024?`,
          `List top medical specialties admitted at ${matchedHosp?.shortName}`
        ],
        isAIProcessed: false,
      });
      return;
    }

    const systemPrompt = `You are an expert Singapore Ministry of Health (MOH) healthcare analytics assistant.
Your task is to answer user queries about Singapore public hospital admissions rates, bed occupancy rates, and outpatient attendances based on the official HealthHub Singapore dataset (https://www.healthhub.sg/support-and-tools/statistics-on-healthcare/admissions-and-outpatient-attendances) provided below.

DATASET:
${datasetContext}

Respond strictly in structured JSON adhering to the provided schema. Provide clear, exact numbers from the dataset.
If comparing multiple hospitals or years, include comparison items. Include 3 relevant key takeaways and 3 follow-up suggested queries.`;

    const userPrompt = `User Query: "${query}" ${hospitalId ? `Selected Hospital ID: ${hospitalId}` : ''} ${year ? `Selected Reference Year: ${year}` : ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: 'Direct clear answer to user query with stats and context.' },
            hospitalName: { type: Type.STRING, description: 'Main hospital referenced' },
            year: { type: Type.INTEGER, description: 'Main reference year' },
            admissionsCount: { type: Type.INTEGER, description: 'Total inpatient admissions count' },
            admissionRatePer1000: { type: Type.NUMBER, description: 'Inpatient admission rate per 1,000 residents' },
            bedOccupancyRate: { type: Type.NUMBER, description: 'Bed occupancy rate percentage' },
            avgLengthOfStayDays: { type: Type.NUMBER, description: 'Average length of stay in days' },
            comparisonData: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hospitalName: { type: Type.STRING },
                  year: { type: Type.INTEGER },
                  admissions: { type: Type.INTEGER },
                  rate: { type: Type.NUMBER },
                },
              },
            },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedQueries: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ['answer', 'keyTakeaways', 'suggestedQueries'],
        },
      },
    });

    const responseText = response.text || '';
    const parsedData = JSON.parse(responseText);

    res.json({
      ...parsedData,
      isAIProcessed: true,
      groundingSources: [
        { title: 'HealthHub SG - Admissions and Outpatient Attendances', url: 'https://www.healthhub.sg/support-and-tools/statistics-on-healthcare/admissions-and-outpatient-attendances' },
        { title: 'Ministry of Health Singapore (MOH) Health Facts', url: 'https://www.moh.gov.sg/resources-statistics/singapore-health-facts' },
      ]
    });
  } catch (err: any) {
    console.error('Error processing query:', err);
    res.status(500).json({ error: 'Failed to process healthcare query', details: err.message });
  }
});

// Setup Vite Dev server or static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = (await import('fs')).readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
