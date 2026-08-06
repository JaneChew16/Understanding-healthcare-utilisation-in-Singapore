import React, { useState, useEffect } from 'react';
import { HospitalProfile, HospitalYearlyStats, AISearchResponse, NationalHeaderStats } from './types/hospital';
import { SidebarQueryPanel } from './components/SidebarQueryPanel';
import { HeaderNav } from './components/HeaderNav';
import { StatsCards } from './components/StatsCards';
import { AIAnswerPanel } from './components/AIAnswerPanel';
import { AdmissionsChart } from './components/AdmissionsChart';
import { HospitalTable } from './components/HospitalTable';
import { HospitalDetailModal } from './components/HospitalDetailModal';
import { CompareModal } from './components/CompareModal';
import { DisqusComments } from './components/DisqusComments';

export default function App() {
  const [hospitals, setHospitals] = useState<HospitalProfile[]>([]);
  const [allStats, setAllStats] = useState<HospitalYearlyStats[]>([]);
  const [nationalSummary, setNationalSummary] = useState<NationalHeaderStats | null>(null);

  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2023);

  const [metricFilters, setMetricFilters] = useState({
    totalAdmissions: true,
    bedOccupancy: true,
    lengthOfStay: true,
    emergencyWait: true,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [aiSearchResult, setAiSearchResult] = useState<AISearchResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);

  const [profileHospital, setProfileHospital] = useState<HospitalProfile | null>(null);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  const sampleQueries = [
    'What was Tan Tock Seng Hospital admissions rate in 2023?',
    'Compare SGH and TTSH bed occupancy in 2022 vs 2024',
    'What is NUH admission rate per 1,000 residents in 2023?',
    'List KTPH emergency attendance and ward wait times',
    'Which Singapore public hospital had the highest admissions in 2023?'
  ];

  // Load initial dataset from backend API
  useEffect(() => {
    fetchHospitals();
    fetchStats(selectedHospitalId, selectedYear);
  }, []);

  useEffect(() => {
    fetchStats(selectedHospitalId, selectedYear);
  }, [selectedHospitalId, selectedYear]);

  const fetchHospitals = async () => {
    try {
      const res = await fetch('/api/hospitals');
      const data = await res.json();
      if (data.hospitals) {
        setHospitals(data.hospitals);
      }
    } catch (err) {
      console.error('Failed to fetch hospitals:', err);
    }
  };

  const fetchStats = async (hospId: string, yr: number) => {
    try {
      const queryParams = new URLSearchParams();
      if (hospId !== 'all') queryParams.append('hospitalId', hospId);
      if (yr) queryParams.append('year', yr.toString());

      const res = await fetch(`/api/stats?${queryParams.toString()}`);
      const data = await res.json();
      if (data.stats) {
        setAllStats(data.stats);
      }
      if (data.nationalSummary) {
        setNationalSummary(data.nationalSummary);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  // AI query handler
  const handleExecuteAIQuery = async (overrideQuery?: string) => {
    const qText = overrideQuery || searchQuery || `What is the admission rate for ${selectedHospitalId === 'all' ? 'Singapore public hospitals' : selectedHospitalId} in ${selectedYear}?`;
    setIsLoadingAI(true);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: qText,
          hospitalId: selectedHospitalId !== 'all' ? selectedHospitalId : undefined,
          year: selectedYear,
        }),
      });

      const data = await res.json();
      setAiSearchResult(data);

      if (data.year && data.year !== selectedYear) {
        setSelectedYear(data.year);
      }
    } catch (err) {
      console.error('Error executing query:', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleToggleMetric = (key: keyof typeof metricFilters) => {
    setMetricFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleResetFilters = () => {
    setSelectedHospitalId('all');
    setSelectedYear(2023);
    setSearchQuery('');
    setAiSearchResult(null);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Hospital Code', 'Hospital Name', 'Cluster', 'Year', 'Inpatient Admissions', 'Admission Rate per 1k', 'Bed Occupancy %', 'Avg Length Stay (d)', 'A&E Ward Wait (h)'];
    const rows = filteredStatsList.map((st) => {
      const p = hospitals.find((h) => h.id === st.hospitalId);
      return [
        `${p?.shortName || st.hospitalId}-01`,
        `"${p?.name || st.hospitalId}"`,
        `"${p?.cluster || ''}"`,
        st.year,
        st.inpatientAdmissions,
        st.admissionRatePer1000,
        st.bedOccupancyRate,
        st.avgLengthOfStayDays,
        st.avgWaitTimeToWardHours,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Singapore_Hospital_Admissions_${selectedYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Report
  const handlePrintReport = () => {
    window.print();
  };

  // Computed display stats
  const selectedHospital = hospitals.find((h) => h.id === selectedHospitalId);
  
  // Filter stats for table & cards
  const filteredStatsList = selectedHospitalId === 'all'
    ? allStats.filter((s) => s.year === selectedYear)
    : allStats.filter((s) => s.hospitalId === selectedHospitalId && s.year === selectedYear);

  // Compute aggregate stats for top cards
  const totalAdmissions = selectedHospitalId === 'all'
    ? (nationalSummary?.totalPublicHospitalAdmissions || filteredStatsList.reduce((acc, c) => acc + c.inpatientAdmissions, 0))
    : (filteredStatsList[0]?.inpatientAdmissions || 0);

  // Get previous year admissions for YoY metric
  const prevYear = selectedYear - 1;
  const prevYearStat = selectedHospitalId === 'all'
    ? null
    : allStats.find((s) => s.hospitalId === selectedHospitalId && s.year === prevYear);

  const prevYearAdmissions = prevYearStat?.inpatientAdmissions;

  const admissionRatePer1000 = selectedHospitalId === 'all'
    ? (nationalSummary?.nationalAdmissionRatePer1000 || 112.9)
    : (filteredStatsList[0]?.admissionRatePer1000 || 0);

  const bedOccupancyRate = selectedHospitalId === 'all'
    ? (nationalSummary?.avgBedOccupancyRate || 88.1)
    : (filteredStatsList[0]?.bedOccupancyRate || 0);

  const avgLengthOfStayDays = filteredStatsList.length > 0
    ? (filteredStatsList.reduce((acc, c) => acc + c.avgLengthOfStayDays, 0) / filteredStatsList.length)
    : 5.8;

  const emergencyAttendance = filteredStatsList.length > 0
    ? filteredStatsList.reduce((acc, c) => acc + (c.emergencyAttendance || 0), 0)
    : undefined;

  return (
    <div className="w-screen h-screen bg-slate-50 flex overflow-hidden font-sans text-slate-900">
      {/* Sidebar Query Panel */}
      <SidebarQueryPanel
        hospitals={hospitals}
        selectedHospitalId={selectedHospitalId}
        onSelectHospital={setSelectedHospitalId}
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        metricFilters={metricFilters}
        onToggleMetric={handleToggleMetric}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onExecuteQuery={handleExecuteAIQuery}
        isLoading={isLoadingAI}
        recentQueries={sampleQueries}
      />

      {/* Main View Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Top Header */}
        <HeaderNav
          onExportCSV={handleExportCSV}
          onPrintReport={handlePrintReport}
          onOpenCompareModal={() => setIsCompareModalOpen(true)}
          onResetFilters={handleResetFilters}
          selectedHospitalName={selectedHospital ? selectedHospital.name : 'All Public Hospitals (Singapore National)'}
          selectedYear={selectedYear}
        />

        {/* Content Workspace */}
        <div className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Top High-Density Metric Cards */}
          <StatsCards
            totalAdmissions={totalAdmissions}
            prevYearAdmissions={prevYearAdmissions}
            admissionRatePer1000={admissionRatePer1000}
            bedOccupancyRate={bedOccupancyRate}
            avgLengthOfStayDays={avgLengthOfStayDays}
            emergencyAttendance={emergencyAttendance}
            selectedYear={selectedYear}
            hospitalName={selectedHospital ? selectedHospital.shortName : 'All Public Hospitals (Singapore National)'}
          />

          {/* AI Search Answer Banner (if user queried or asked AI) */}
          {(aiSearchResult || isLoadingAI) && (
            <AIAnswerPanel
              data={aiSearchResult}
              onSelectSuggestedQuery={(q) => {
                setSearchQuery(q);
                handleExecuteAIQuery(q);
              }}
              isLoading={isLoadingAI}
            />
          )}

          {/* Chart Section */}
          <AdmissionsChart
            statsList={filteredStatsList}
            selectedHospital={selectedHospital}
            selectedYear={selectedYear}
            allHospitalsStats={allStats}
          />

          {/* High-Density Hospital Admissions Table */}
          <HospitalTable
            stats={filteredStatsList}
            hospitals={hospitals}
            selectedYear={selectedYear}
            onSelectHospital={(id) => setSelectedHospitalId(id)}
            onOpenHospitalProfile={(h) => setProfileHospital(h)}
          />

          {/* Disqus Comments Section */}
          <DisqusComments />
        </div>
      </main>

      {/* Hospital Detail Profile Modal */}
      <HospitalDetailModal
        hospital={profileHospital}
        onClose={() => setProfileHospital(null)}
        yearlyStats={allStats}
      />

      {/* Side-by-Side Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        hospitals={hospitals}
        yearlyStats={allStats}
        selectedYear={selectedYear}
      />
    </div>
  );
}
