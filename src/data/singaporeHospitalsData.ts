import { HospitalProfile, HospitalYearlyStats, NationalHeaderStats } from '../types/hospital';

export const SINGAPORE_HOSPITALS: HospitalProfile[] = [
  {
    id: 'sgh',
    name: 'Singapore General Hospital',
    shortName: 'SGH',
    cluster: 'SingHealth',
    beds: 1980,
    region: 'Central',
    openedYear: 1821,
    address: 'Outram Road, Singapore 169608',
    website: 'https://www.sgh.com.sg',
    description: 'Singapore\'s largest acute tertiary hospital and flagship hospital of SingHealth cluster.',
    specialties: ['Cardiology', 'Oncology', 'Emergency Medicine', 'General Surgery', 'Orthopaedics', 'Neurology']
  },
  {
    id: 'ttsh',
    name: 'Tan Tock Seng Hospital',
    shortName: 'TTSH',
    cluster: 'National Healthcare Group (NHG)',
    beds: 1700,
    region: 'Central',
    openedYear: 1844,
    address: '11 Jalan Tan Tock Seng, Singapore 308433',
    website: 'https://www.ttsh.com.sg',
    description: 'Major tertiary hospital in Novena Health City, leading infectious disease and trauma care center.',
    specialties: ['Infectious Diseases', 'Geriatric Medicine', 'Emergency Medicine', 'Trauma Surgery', 'Respiratory Medicine']
  },
  {
    id: 'nuh',
    name: 'National University Hospital',
    shortName: 'NUH',
    cluster: 'National University Health System (NUHS)',
    beds: 1250,
    region: 'West',
    openedYear: 1985,
    address: '5 Lower Kent Ridge Road, Singapore 119074',
    website: 'https://www.nuh.com.sg',
    description: 'Major academic health institution and principal teaching hospital for NUS Yong Loo Lin School of Medicine.',
    specialties: ['Pediatrics', 'Obstetrics & Gynaecology', 'Cardiology', 'Organ Transplant', 'Oncology']
  },
  {
    id: 'cgh',
    name: 'Changi General Hospital',
    shortName: 'CGH',
    cluster: 'SingHealth',
    beds: 1000,
    region: 'East',
    openedYear: 1998,
    address: '2 Simei Street 3, Singapore 529889',
    website: 'https://www.cgh.com.sg',
    description: 'Primary public healthcare facility serving over 1 million residents in eastern Singapore.',
    specialties: ['Gastroenterology', 'Accident & Emergency', 'Sports Medicine', 'General Medicine', 'Dermatology']
  },
  {
    id: 'ktph',
    name: 'Khoo Teck Puat Hospital',
    shortName: 'KTPH',
    cluster: 'National Healthcare Group (NHG)',
    beds: 760,
    region: 'North',
    openedYear: 2010,
    address: '90 Yishun Central, Singapore 768828',
    website: 'https://www.ktph.com.sg',
    description: 'Eco-friendly acute general hospital serving northern residents with patient-centric healing environments.',
    specialties: ['General Surgery', 'Diabetes & Endocrinology', 'Ophthalmology', 'Geriatrics', 'Emergency Care']
  },
  {
    id: 'ntfgh',
    name: 'Ng Teng Fong General Hospital',
    shortName: 'NTFGH',
    cluster: 'National University Health System (NUHS)',
    beds: 700,
    region: 'West',
    openedYear: 2015,
    address: '1 Jurong East Street 21, Singapore 609606',
    website: 'https://www.ntfgh.com.sg',
    description: 'Integrated healthcare hub paired with Jurong Community Hospital in Jurong East.',
    specialties: ['General Medicine', 'Orthopaedics', 'Cardiology', 'Renal Medicine', 'Critical Care']
  },
  {
    id: 'skh',
    name: 'Sengkang General Hospital',
    shortName: 'SKH',
    cluster: 'SingHealth',
    beds: 1000,
    region: 'Northeast',
    openedYear: 2018,
    address: '11 Sengkang East Way, Singapore 544813',
    website: 'https://www.skh.com.sg',
    description: 'Modern tertiary facility serving the expanding northeast corridor including Sengkang and Punggol.',
    specialties: ['Emergency Medicine', 'General Surgery', 'Urology', 'Internal Medicine', 'Rehabilitation']
  },
  {
    id: 'kkh',
    name: 'KK Women\'s and Children\'s Hospital',
    shortName: 'KKH',
    cluster: 'SingHealth',
    beds: 830,
    region: 'Central',
    openedYear: 1858,
    address: '100 Bukit Timah Road, Singapore 229899',
    website: 'https://www.kkh.com.sg',
    description: 'Singapore\'s specialized referral center for obstetrics, gynecology, neonatology, and pediatrics.',
    specialties: ['Pediatrics', 'Obstetrics', 'Gynecology', 'Pediatric Surgery', 'Neonatology']
  },
  {
    id: 'wh',
    name: 'Woodlands Health',
    shortName: 'WH',
    cluster: 'National Healthcare Group (NHG)',
    beds: 1000,
    region: 'North',
    openedYear: 2023,
    address: '2 Woodlands Drive 17, Singapore 737628',
    website: 'https://www.wh.com.sg',
    description: 'Newest integrated campus featuring acute hospital, community hospital, and long-term care.',
    specialties: ['General Medicine', 'Geriatrics', 'Emergency Medicine', 'Rehabilitation', 'Surgery']
  },
  {
    id: 'ah',
    name: 'Alexandra Hospital',
    shortName: 'AH',
    cluster: 'National University Health System (NUHS)',
    beds: 300,
    region: 'Central',
    openedYear: 1938,
    address: '378 Alexandra Road, Singapore 159964',
    website: 'https://www.ah.com.sg',
    description: 'Singapore\'s first integrated general hospital testing seamless holistic care models.',
    specialties: ['Integrated Care', 'General Medicine', 'Chronic Disease Management', 'Geriatrics']
  }
];

// National resident population approximations (in millions) for SG resident rate calculations
// 2019: 4.03M, 2020: 4.04M, 2021: 3.99M, 2022: 4.07M, 2023: 4.15M, 2024: 4.18M, 2025: 4.22M

export const YEARLY_HOSPITAL_STATS: HospitalYearlyStats[] = [
  // --- 2019 DATA ---
  {
    hospitalId: 'sgh',
    year: 2019,
    inpatientAdmissions: 88450,
    daySurgeries: 41200,
    admissionRatePer1000: 21.9,
    bedOccupancyRate: 88.2,
    avgLengthOfStayDays: 6.2,
    emergencyAttendance: 128500,
    emergencyAdmissionRate: 38.5,
    avgWaitTimeToWardHours: 3.8,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 38200, percentage: 43.2 },
      { specialty: 'General Surgery', admissions: 18400, percentage: 20.8 },
      { specialty: 'Cardiology', admissions: 14200, percentage: 16.1 },
      { specialty: 'Internal Medicine', admissions: 17650, percentage: 19.9 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2019,
    inpatientAdmissions: 78900,
    daySurgeries: 35600,
    admissionRatePer1000: 19.6,
    bedOccupancyRate: 89.5,
    avgLengthOfStayDays: 6.5,
    emergencyAttendance: 145000,
    emergencyAdmissionRate: 36.2,
    avgWaitTimeToWardHours: 4.5,
    topSpecialties: [
      { specialty: 'Infectious Diseases / Med', admissions: 32100, percentage: 40.7 },
      { specialty: 'Geriatric Medicine', admissions: 19800, percentage: 25.1 },
      { specialty: 'Trauma & Orthopaedics', admissions: 15400, percentage: 19.5 },
      { specialty: 'Respiratory Medicine', admissions: 11600, percentage: 14.7 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2019,
    inpatientAdmissions: 59200,
    daySurgeries: 29800,
    admissionRatePer1000: 14.7,
    bedOccupancyRate: 85.8,
    avgLengthOfStayDays: 5.6,
    emergencyAttendance: 112000,
    emergencyAdmissionRate: 34.8,
    avgWaitTimeToWardHours: 3.2,
    topSpecialties: [
      { specialty: 'Pediatrics & Neonatology', admissions: 16800, percentage: 28.4 },
      { specialty: 'General Medicine', admissions: 18200, percentage: 30.7 },
      { specialty: 'Cardiology', admissions: 12400, percentage: 21.0 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 11800, percentage: 19.9 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2019,
    inpatientAdmissions: 48900,
    daySurgeries: 22100,
    admissionRatePer1000: 12.1,
    bedOccupancyRate: 87.4,
    avgLengthOfStayDays: 5.8,
    emergencyAttendance: 121000,
    emergencyAdmissionRate: 33.1,
    avgWaitTimeToWardHours: 4.1,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 21000, percentage: 42.9 },
      { specialty: 'Gastroenterology', admissions: 12500, percentage: 25.6 },
      { specialty: 'Orthopaedics', admissions: 9800, percentage: 20.0 },
      { specialty: 'Emergency Medicine', admissions: 5600, percentage: 11.5 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2019,
    inpatientAdmissions: 39800,
    daySurgeries: 18400,
    admissionRatePer1000: 9.9,
    bedOccupancyRate: 89.1,
    avgLengthOfStayDays: 5.5,
    emergencyAttendance: 104000,
    emergencyAdmissionRate: 32.5,
    avgWaitTimeToWardHours: 4.8,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 17200, percentage: 43.2 },
      { specialty: 'Geriatrics', admissions: 10800, percentage: 27.1 },
      { specialty: 'General Surgery', admissions: 8100, percentage: 20.4 },
      { specialty: 'Orthopaedics', admissions: 3700, percentage: 9.3 }
    ]
  },
  {
    hospitalId: 'ntfgh',
    year: 2019,
    inpatientAdmissions: 35400,
    daySurgeries: 16800,
    admissionRatePer1000: 8.8,
    bedOccupancyRate: 84.5,
    avgLengthOfStayDays: 5.4,
    emergencyAttendance: 98000,
    emergencyAdmissionRate: 31.0,
    avgWaitTimeToWardHours: 3.5,
    topSpecialties: [
      { specialty: 'Internal Medicine', admissions: 15100, percentage: 42.7 },
      { specialty: 'Orthopaedics', admissions: 8900, percentage: 25.1 },
      { specialty: 'Cardiology', admissions: 6800, percentage: 19.2 },
      { specialty: 'General Surgery', admissions: 4600, percentage: 13.0 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2019,
    inpatientAdmissions: 31200,
    daySurgeries: 14200,
    admissionRatePer1000: 7.7,
    bedOccupancyRate: 78.2,
    avgLengthOfStayDays: 5.1,
    emergencyAttendance: 85000,
    emergencyAdmissionRate: 29.8,
    avgWaitTimeToWardHours: 2.8,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 14200, percentage: 45.5 },
      { specialty: 'General Surgery', admissions: 7800, percentage: 25.0 },
      { specialty: 'Urology', admissions: 5100, percentage: 16.3 },
      { specialty: 'Emergency Care', admissions: 4100, percentage: 13.2 }
    ]
  },

  // --- 2020 DATA (Pandemic impact & ward reallocations) ---
  {
    hospitalId: 'sgh',
    year: 2020,
    inpatientAdmissions: 81200,
    daySurgeries: 36500,
    admissionRatePer1000: 20.1,
    bedOccupancyRate: 82.5,
    avgLengthOfStayDays: 6.8,
    emergencyAttendance: 102000,
    emergencyAdmissionRate: 41.2,
    avgWaitTimeToWardHours: 4.2,
    topSpecialties: [
      { specialty: 'Emergency & Isolation', admissions: 37500, percentage: 46.2 },
      { specialty: 'General Surgery', admissions: 15800, percentage: 19.5 },
      { specialty: 'Cardiology', admissions: 14100, percentage: 17.4 },
      { specialty: 'Internal Medicine', admissions: 13800, percentage: 17.0 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2020,
    inpatientAdmissions: 74100,
    daySurgeries: 31200,
    admissionRatePer1000: 18.3,
    bedOccupancyRate: 86.8,
    avgLengthOfStayDays: 7.1,
    emergencyAttendance: 118000,
    emergencyAdmissionRate: 42.5,
    avgWaitTimeToWardHours: 5.2,
    topSpecialties: [
      { specialty: 'Infectious Diseases (NCID)', admissions: 35800, percentage: 48.3 },
      { specialty: 'Geriatric Medicine', admissions: 16900, percentage: 22.8 },
      { specialty: 'Respiratory Medicine', admissions: 12200, percentage: 16.5 },
      { specialty: 'Trauma Surgery', admissions: 9200, percentage: 12.4 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2020,
    inpatientAdmissions: 54800,
    daySurgeries: 26100,
    admissionRatePer1000: 13.6,
    bedOccupancyRate: 81.2,
    avgLengthOfStayDays: 6.0,
    emergencyAttendance: 92000,
    emergencyAdmissionRate: 36.5,
    avgWaitTimeToWardHours: 3.5,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 18500, percentage: 33.8 },
      { specialty: 'Pediatrics & Neonatology', admissions: 14200, percentage: 25.9 },
      { specialty: 'Cardiology', admissions: 11800, percentage: 21.5 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 10300, percentage: 18.8 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2020,
    inpatientAdmissions: 44200,
    daySurgeries: 19800,
    admissionRatePer1000: 10.9,
    bedOccupancyRate: 83.1,
    avgLengthOfStayDays: 6.2,
    emergencyAttendance: 98000,
    emergencyAdmissionRate: 35.8,
    avgWaitTimeToWardHours: 4.6,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 19800, percentage: 44.8 },
      { specialty: 'Gastroenterology', admissions: 10800, percentage: 24.4 },
      { specialty: 'Orthopaedics', admissions: 8200, percentage: 18.6 },
      { specialty: 'Respiratory', admissions: 5400, percentage: 12.2 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2020,
    inpatientAdmissions: 36100,
    daySurgeries: 16200,
    admissionRatePer1000: 8.9,
    bedOccupancyRate: 85.0,
    avgLengthOfStayDays: 6.1,
    emergencyAttendance: 88000,
    emergencyAdmissionRate: 35.2,
    avgWaitTimeToWardHours: 5.1,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 16200, percentage: 44.9 },
      { specialty: 'Geriatrics', admissions: 9800, percentage: 27.1 },
      { specialty: 'General Surgery', admissions: 6800, percentage: 18.8 },
      { specialty: 'Orthopaedics', admissions: 3300, percentage: 9.1 }
    ]
  },
  {
    hospitalId: 'ntfgh',
    year: 2020,
    inpatientAdmissions: 32800,
    daySurgeries: 14800,
    admissionRatePer1000: 8.1,
    bedOccupancyRate: 80.5,
    avgLengthOfStayDays: 5.9,
    emergencyAttendance: 81000,
    emergencyAdmissionRate: 33.8,
    avgWaitTimeToWardHours: 3.8,
    topSpecialties: [
      { specialty: 'Internal Medicine', admissions: 14800, percentage: 45.1 },
      { specialty: 'Orthopaedics', admissions: 7800, percentage: 23.8 },
      { specialty: 'Cardiology', admissions: 6100, percentage: 18.6 },
      { specialty: 'General Surgery', admissions: 4100, percentage: 12.5 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2020,
    inpatientAdmissions: 30500,
    daySurgeries: 13500,
    admissionRatePer1000: 7.5,
    bedOccupancyRate: 76.5,
    avgLengthOfStayDays: 5.5,
    emergencyAttendance: 74000,
    emergencyAdmissionRate: 32.1,
    avgWaitTimeToWardHours: 3.0,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 14100, percentage: 46.2 },
      { specialty: 'General Surgery', admissions: 7200, percentage: 23.6 },
      { specialty: 'Urology', admissions: 5200, percentage: 17.0 },
      { specialty: 'Emergency Care', admissions: 4000, percentage: 13.1 }
    ]
  },

  // --- 2021 DATA ---
  {
    hospitalId: 'sgh',
    year: 2021,
    inpatientAdmissions: 83900,
    daySurgeries: 38900,
    admissionRatePer1000: 21.0,
    bedOccupancyRate: 86.4,
    avgLengthOfStayDays: 6.4,
    emergencyAttendance: 112000,
    emergencyAdmissionRate: 40.5,
    avgWaitTimeToWardHours: 4.8,
    topSpecialties: [
      { specialty: 'Emergency & Ward Isolation', admissions: 37800, percentage: 45.1 },
      { specialty: 'General Surgery', admissions: 17200, percentage: 20.5 },
      { specialty: 'Cardiology', admissions: 14800, percentage: 17.6 },
      { specialty: 'Internal Medicine', admissions: 14100, percentage: 16.8 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2021,
    inpatientAdmissions: 76500,
    daySurgeries: 33800,
    admissionRatePer1000: 19.2,
    bedOccupancyRate: 88.9,
    avgLengthOfStayDays: 6.9,
    emergencyAttendance: 129000,
    emergencyAdmissionRate: 39.8,
    avgWaitTimeToWardHours: 5.8,
    topSpecialties: [
      { specialty: 'Infectious Diseases / Med', admissions: 34200, percentage: 44.7 },
      { specialty: 'Geriatric Medicine', admissions: 18200, percentage: 23.8 },
      { specialty: 'Respiratory Medicine', admissions: 13500, percentage: 17.6 },
      { specialty: 'Trauma & Surgery', admissions: 10600, percentage: 13.9 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2021,
    inpatientAdmissions: 57100,
    daySurgeries: 28400,
    admissionRatePer1000: 14.3,
    bedOccupancyRate: 84.1,
    avgLengthOfStayDays: 5.8,
    emergencyAttendance: 101000,
    emergencyAdmissionRate: 35.6,
    avgWaitTimeToWardHours: 3.8,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 18800, percentage: 32.9 },
      { specialty: 'Pediatrics & Neonatology', admissions: 15200, percentage: 26.6 },
      { specialty: 'Cardiology', admissions: 12100, percentage: 21.2 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 11000, percentage: 19.3 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2021,
    inpatientAdmissions: 46500,
    daySurgeries: 21200,
    admissionRatePer1000: 11.7,
    bedOccupancyRate: 86.2,
    avgLengthOfStayDays: 6.0,
    emergencyAttendance: 108000,
    emergencyAdmissionRate: 34.5,
    avgWaitTimeToWardHours: 5.0,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 20500, percentage: 44.1 },
      { specialty: 'Gastroenterology', admissions: 11600, percentage: 25.0 },
      { specialty: 'Orthopaedics', admissions: 8900, percentage: 19.1 },
      { specialty: 'Respiratory', admissions: 5500, percentage: 11.8 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2021,
    inpatientAdmissions: 38200,
    daySurgeries: 17500,
    admissionRatePer1000: 9.6,
    bedOccupancyRate: 88.3,
    avgLengthOfStayDays: 5.9,
    emergencyAttendance: 96000,
    emergencyAdmissionRate: 34.1,
    avgWaitTimeToWardHours: 5.6,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 16900, percentage: 44.2 },
      { specialty: 'Geriatrics', admissions: 10400, percentage: 27.2 },
      { specialty: 'General Surgery', admissions: 7400, percentage: 19.4 },
      { specialty: 'Orthopaedics', admissions: 3500, percentage: 9.2 }
    ]
  },
  {
    hospitalId: 'ntfgh',
    year: 2021,
    inpatientAdmissions: 34900,
    daySurgeries: 16100,
    admissionRatePer1000: 8.7,
    bedOccupancyRate: 83.2,
    avgLengthOfStayDays: 5.7,
    emergencyAttendance: 89000,
    emergencyAdmissionRate: 32.6,
    avgWaitTimeToWardHours: 4.1,
    topSpecialties: [
      { specialty: 'Internal Medicine', admissions: 15200, percentage: 43.6 },
      { specialty: 'Orthopaedics', admissions: 8400, percentage: 24.1 },
      { specialty: 'Cardiology', admissions: 6700, percentage: 19.2 },
      { specialty: 'General Surgery', admissions: 4600, percentage: 13.2 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2021,
    inpatientAdmissions: 33400,
    daySurgeries: 15100,
    admissionRatePer1000: 8.4,
    bedOccupancyRate: 81.0,
    avgLengthOfStayDays: 5.3,
    emergencyAttendance: 82000,
    emergencyAdmissionRate: 31.4,
    avgWaitTimeToWardHours: 3.4,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 15100, percentage: 45.2 },
      { specialty: 'General Surgery', admissions: 8100, percentage: 24.3 },
      { specialty: 'Urology', admissions: 5600, percentage: 16.8 },
      { specialty: 'Emergency Care', admissions: 4600, percentage: 13.8 }
    ]
  },

  // --- 2022 DATA (Primary Benchmark) ---
  {
    hospitalId: 'sgh',
    year: 2022,
    inpatientAdmissions: 87600,
    daySurgeries: 42800,
    admissionRatePer1000: 21.5,
    bedOccupancyRate: 89.1,
    avgLengthOfStayDays: 6.1,
    emergencyAttendance: 125000,
    emergencyAdmissionRate: 38.2,
    avgWaitTimeToWardHours: 4.2,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 37200, percentage: 42.5 },
      { specialty: 'General Surgery', admissions: 18500, percentage: 21.1 },
      { specialty: 'Cardiology', admissions: 15800, percentage: 18.0 },
      { specialty: 'Internal Medicine', admissions: 16100, percentage: 18.4 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2022,
    inpatientAdmissions: 81400,
    daySurgeries: 37200,
    admissionRatePer1000: 20.0,
    bedOccupancyRate: 91.4,
    avgLengthOfStayDays: 6.6,
    emergencyAttendance: 141000,
    emergencyAdmissionRate: 37.8,
    avgWaitTimeToWardHours: 6.8,
    topSpecialties: [
      { specialty: 'Emergency & General Med', admissions: 39100, percentage: 48.0 },
      { specialty: 'Geriatric Medicine', admissions: 20200, percentage: 24.8 },
      { specialty: 'Trauma & Orthopaedics', admissions: 12800, percentage: 15.7 },
      { specialty: 'Respiratory Medicine', admissions: 9300, percentage: 11.4 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2022,
    inpatientAdmissions: 61500,
    daySurgeries: 31400,
    admissionRatePer1000: 15.1,
    bedOccupancyRate: 86.8,
    avgLengthOfStayDays: 5.6,
    emergencyAttendance: 118000,
    emergencyAdmissionRate: 34.2,
    avgWaitTimeToWardHours: 3.9,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 19800, percentage: 32.2 },
      { specialty: 'Pediatrics & Neonatology', admissions: 16500, percentage: 26.8 },
      { specialty: 'Cardiology', admissions: 13200, percentage: 21.5 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 12000, percentage: 19.5 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2022,
    inpatientAdmissions: 51200,
    daySurgeries: 23800,
    admissionRatePer1000: 12.6,
    bedOccupancyRate: 88.5,
    avgLengthOfStayDays: 5.9,
    emergencyAttendance: 124000,
    emergencyAdmissionRate: 33.5,
    avgWaitTimeToWardHours: 5.2,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 22800, percentage: 44.5 },
      { specialty: 'Gastroenterology', admissions: 12900, percentage: 25.2 },
      { specialty: 'Orthopaedics', admissions: 9700, percentage: 18.9 },
      { specialty: 'Respiratory Medicine', admissions: 5800, percentage: 11.3 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2022,
    inpatientAdmissions: 41800,
    daySurgeries: 19200,
    admissionRatePer1000: 10.3,
    bedOccupancyRate: 90.2,
    avgLengthOfStayDays: 5.7,
    emergencyAttendance: 108000,
    emergencyAdmissionRate: 33.0,
    avgWaitTimeToWardHours: 6.1,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 18500, percentage: 44.3 },
      { specialty: 'Geriatrics', admissions: 11400, percentage: 27.3 },
      { specialty: 'General Surgery', admissions: 8100, percentage: 19.4 },
      { specialty: 'Orthopaedics', admissions: 3800, percentage: 9.1 }
    ]
  },
  {
    hospitalId: 'ntfgh',
    year: 2022,
    inpatientAdmissions: 38100,
    daySurgeries: 17800,
    admissionRatePer1000: 9.4,
    bedOccupancyRate: 85.6,
    avgLengthOfStayDays: 5.5,
    emergencyAttendance: 102000,
    emergencyAdmissionRate: 31.8,
    avgWaitTimeToWardHours: 4.0,
    topSpecialties: [
      { specialty: 'Internal Medicine', admissions: 16800, percentage: 44.1 },
      { specialty: 'Orthopaedics', admissions: 9200, percentage: 24.1 },
      { specialty: 'Cardiology', admissions: 7200, percentage: 18.9 },
      { specialty: 'General Surgery', admissions: 4900, percentage: 12.9 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2022,
    inpatientAdmissions: 36800,
    daySurgeries: 17200,
    admissionRatePer1000: 9.0,
    bedOccupancyRate: 83.5,
    avgLengthOfStayDays: 5.2,
    emergencyAttendance: 92000,
    emergencyAdmissionRate: 31.0,
    avgWaitTimeToWardHours: 3.6,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 16600, percentage: 45.1 },
      { specialty: 'General Surgery', admissions: 8900, percentage: 24.2 },
      { specialty: 'Urology', admissions: 6200, percentage: 16.8 },
      { specialty: 'Emergency Care', admissions: 5100, percentage: 13.9 }
    ]
  },
  {
    hospitalId: 'kkh',
    year: 2022,
    inpatientAdmissions: 34200,
    daySurgeries: 22100,
    admissionRatePer1000: 8.4,
    bedOccupancyRate: 82.0,
    avgLengthOfStayDays: 4.2,
    emergencyAttendance: 115000,
    emergencyAdmissionRate: 25.1,
    avgWaitTimeToWardHours: 2.5,
    topSpecialties: [
      { specialty: 'Obstetrics & Delivery', admissions: 13800, percentage: 40.4 },
      { specialty: 'Pediatrics', admissions: 11200, percentage: 32.7 },
      { specialty: 'Gynecology Surgery', admissions: 5800, percentage: 17.0 },
      { specialty: 'Neonatology', admissions: 3400, percentage: 9.9 }
    ]
  },
  {
    hospitalId: 'ah',
    year: 2022,
    inpatientAdmissions: 11200,
    daySurgeries: 4100,
    admissionRatePer1000: 2.8,
    bedOccupancyRate: 81.5,
    avgLengthOfStayDays: 7.8,
    emergencyAttendance: 28000,
    emergencyAdmissionRate: 32.0,
    avgWaitTimeToWardHours: 3.1,
    topSpecialties: [
      { specialty: 'Integrated General Medicine', admissions: 5800, percentage: 51.8 },
      { specialty: 'Geriatric Rehabilitation', admissions: 3400, percentage: 30.4 },
      { specialty: 'Chronic Disease Care', admissions: 2000, percentage: 17.8 }
    ]
  },

  // --- 2023 DATA ---
  {
    hospitalId: 'sgh',
    year: 2023,
    inpatientAdmissions: 91200,
    daySurgeries: 45100,
    admissionRatePer1000: 22.0,
    bedOccupancyRate: 90.5,
    avgLengthOfStayDays: 6.0,
    emergencyAttendance: 131000,
    emergencyAdmissionRate: 37.5,
    avgWaitTimeToWardHours: 4.5,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 38800, percentage: 42.5 },
      { specialty: 'General Surgery', admissions: 19500, percentage: 21.4 },
      { specialty: 'Cardiology', admissions: 16500, percentage: 18.1 },
      { specialty: 'Internal Medicine', admissions: 16400, percentage: 18.0 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2023,
    inpatientAdmissions: 84291,
    daySurgeries: 39500,
    admissionRatePer1000: 20.3,
    bedOccupancyRate: 92.1,
    avgLengthOfStayDays: 6.5,
    emergencyAttendance: 148000,
    emergencyAdmissionRate: 37.0,
    avgWaitTimeToWardHours: 7.1,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 40460, percentage: 48.0 },
      { specialty: 'General Medicine', admissions: 26973, percentage: 32.0 },
      { specialty: 'Surgery', admissions: 12643, percentage: 15.0 },
      { specialty: 'Others', admissions: 4215, percentage: 5.0 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2023,
    inpatientAdmissions: 64100,
    daySurgeries: 33200,
    admissionRatePer1000: 15.4,
    bedOccupancyRate: 87.5,
    avgLengthOfStayDays: 5.5,
    emergencyAttendance: 122000,
    emergencyAdmissionRate: 33.8,
    avgWaitTimeToWardHours: 4.1,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 20600, percentage: 32.1 },
      { specialty: 'Pediatrics & Neonatology', admissions: 17200, percentage: 26.8 },
      { specialty: 'Cardiology', admissions: 13800, percentage: 21.5 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 12500, percentage: 19.5 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2023,
    inpatientAdmissions: 53800,
    daySurgeries: 25100,
    admissionRatePer1000: 13.0,
    bedOccupancyRate: 89.2,
    avgLengthOfStayDays: 5.8,
    emergencyAttendance: 129000,
    emergencyAdmissionRate: 33.0,
    avgWaitTimeToWardHours: 5.5,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 23900, percentage: 44.4 },
      { specialty: 'Gastroenterology', admissions: 13600, percentage: 25.3 },
      { specialty: 'Orthopaedics', admissions: 10200, percentage: 19.0 },
      { specialty: 'Respiratory Medicine', admissions: 6100, percentage: 11.3 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2023,
    inpatientAdmissions: 43500,
    daySurgeries: 20400,
    admissionRatePer1000: 10.5,
    bedOccupancyRate: 91.0,
    avgLengthOfStayDays: 5.6,
    emergencyAttendance: 112000,
    emergencyAdmissionRate: 32.5,
    avgWaitTimeToWardHours: 6.4,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 19300, percentage: 44.4 },
      { specialty: 'Geriatrics', admissions: 11900, percentage: 27.4 },
      { specialty: 'General Surgery', admissions: 8400, percentage: 19.3 },
      { specialty: 'Orthopaedics', admissions: 3900, percentage: 9.0 }
    ]
  },
  {
    hospitalId: 'ntfgh',
    year: 2023,
    inpatientAdmissions: 40200,
    daySurgeries: 18900,
    admissionRatePer1000: 9.7,
    bedOccupancyRate: 86.8,
    avgLengthOfStayDays: 5.4,
    emergencyAttendance: 107000,
    emergencyAdmissionRate: 31.2,
    avgWaitTimeToWardHours: 4.2,
    topSpecialties: [
      { specialty: 'Internal Medicine', admissions: 17700, percentage: 44.0 },
      { specialty: 'Orthopaedics', admissions: 9700, percentage: 24.1 },
      { specialty: 'Cardiology', admissions: 7600, percentage: 18.9 },
      { specialty: 'General Surgery', admissions: 5200, percentage: 12.9 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2023,
    inpatientAdmissions: 39500,
    daySurgeries: 18800,
    admissionRatePer1000: 9.5,
    bedOccupancyRate: 85.0,
    avgLengthOfStayDays: 5.1,
    emergencyAttendance: 98000,
    emergencyAdmissionRate: 30.5,
    avgWaitTimeToWardHours: 3.8,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 17800, percentage: 45.1 },
      { specialty: 'General Surgery', admissions: 9600, percentage: 24.3 },
      { specialty: 'Urology', admissions: 6600, percentage: 16.7 },
      { specialty: 'Emergency Care', admissions: 5500, percentage: 13.9 }
    ]
  },
  {
    hospitalId: 'kkh',
    year: 2023,
    inpatientAdmissions: 35600,
    daySurgeries: 23400,
    admissionRatePer1000: 8.6,
    bedOccupancyRate: 82.8,
    avgLengthOfStayDays: 4.1,
    emergencyAttendance: 121000,
    emergencyAdmissionRate: 24.8,
    avgWaitTimeToWardHours: 2.6,
    topSpecialties: [
      { specialty: 'Obstetrics & Delivery', admissions: 14200, percentage: 39.9 },
      { specialty: 'Pediatrics', admissions: 11800, percentage: 33.1 },
      { specialty: 'Gynecology Surgery', admissions: 6100, percentage: 17.1 },
      { specialty: 'Neonatology', admissions: 3500, percentage: 9.8 }
    ]
  },
  {
    hospitalId: 'wh',
    year: 2023,
    inpatientAdmissions: 8500,
    daySurgeries: 3200,
    admissionRatePer1000: 2.0,
    bedOccupancyRate: 72.0,
    avgLengthOfStayDays: 5.8,
    emergencyAttendance: 25000,
    emergencyAdmissionRate: 28.0,
    avgWaitTimeToWardHours: 2.4,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 4200, percentage: 49.4 },
      { specialty: 'Geriatric Care', admissions: 2500, percentage: 29.4 },
      { specialty: 'Rehabilitation', admissions: 1800, percentage: 21.2 }
    ]
  },

  // --- 2024 DATA ---
  {
    hospitalId: 'sgh',
    year: 2024,
    inpatientAdmissions: 94500,
    daySurgeries: 47200,
    admissionRatePer1000: 22.6,
    bedOccupancyRate: 91.2,
    avgLengthOfStayDays: 5.9,
    emergencyAttendance: 136000,
    emergencyAdmissionRate: 37.2,
    avgWaitTimeToWardHours: 4.6,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 40150, percentage: 42.5 },
      { specialty: 'General Surgery', admissions: 20200, percentage: 21.4 },
      { specialty: 'Cardiology', admissions: 17100, percentage: 18.1 },
      { specialty: 'Internal Medicine', admissions: 17050, percentage: 18.0 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2024,
    inpatientAdmissions: 86800,
    daySurgeries: 41200,
    admissionRatePer1000: 20.8,
    bedOccupancyRate: 92.8,
    avgLengthOfStayDays: 6.4,
    emergencyAttendance: 152000,
    emergencyAdmissionRate: 36.8,
    avgWaitTimeToWardHours: 7.4,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 41600, percentage: 47.9 },
      { specialty: 'General Medicine', admissions: 27800, percentage: 32.0 },
      { specialty: 'Surgery', admissions: 13000, percentage: 15.0 },
      { specialty: 'Others', admissions: 4400, percentage: 5.1 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2024,
    inpatientAdmissions: 66800,
    daySurgeries: 34800,
    admissionRatePer1000: 16.0,
    bedOccupancyRate: 88.2,
    avgLengthOfStayDays: 5.4,
    emergencyAttendance: 126000,
    emergencyAdmissionRate: 33.5,
    avgWaitTimeToWardHours: 4.2,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 21400, percentage: 32.0 },
      { specialty: 'Pediatrics & Neonatology', admissions: 17900, percentage: 26.8 },
      { specialty: 'Cardiology', admissions: 14400, percentage: 21.6 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 13100, percentage: 19.6 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2024,
    inpatientAdmissions: 56100,
    daySurgeries: 26400,
    admissionRatePer1000: 13.4,
    bedOccupancyRate: 89.8,
    avgLengthOfStayDays: 5.7,
    emergencyAttendance: 133000,
    emergencyAdmissionRate: 32.8,
    avgWaitTimeToWardHours: 5.6,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 24900, percentage: 44.4 },
      { specialty: 'Gastroenterology', admissions: 14200, percentage: 25.3 },
      { specialty: 'Orthopaedics', admissions: 10600, percentage: 18.9 },
      { specialty: 'Respiratory Medicine', admissions: 6400, percentage: 11.4 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2024,
    inpatientAdmissions: 45200,
    daySurgeries: 21500,
    admissionRatePer1000: 10.8,
    bedOccupancyRate: 91.5,
    avgLengthOfStayDays: 5.5,
    emergencyAttendance: 116000,
    emergencyAdmissionRate: 32.1,
    avgWaitTimeToWardHours: 6.6,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 20100, percentage: 44.5 },
      { specialty: 'Geriatrics', admissions: 12300, percentage: 27.2 },
      { specialty: 'General Surgery', admissions: 8700, percentage: 19.2 },
      { specialty: 'Orthopaedics', admissions: 4100, percentage: 9.1 }
    ]
  },
  {
    hospitalId: 'ntfgh',
    year: 2024,
    inpatientAdmissions: 42100,
    daySurgeries: 19800,
    admissionRatePer1000: 10.1,
    bedOccupancyRate: 87.2,
    avgLengthOfStayDays: 5.3,
    emergencyAttendance: 111000,
    emergencyAdmissionRate: 30.8,
    avgWaitTimeToWardHours: 4.3,
    topSpecialties: [
      { specialty: 'Internal Medicine', admissions: 18500, percentage: 43.9 },
      { specialty: 'Orthopaedics', admissions: 10200, percentage: 24.2 },
      { specialty: 'Cardiology', admissions: 8000, percentage: 19.0 },
      { specialty: 'General Surgery', admissions: 5400, percentage: 12.8 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2024,
    inpatientAdmissions: 41900,
    daySurgeries: 20100,
    admissionRatePer1000: 10.0,
    bedOccupancyRate: 86.4,
    avgLengthOfStayDays: 5.0,
    emergencyAttendance: 103000,
    emergencyAdmissionRate: 30.1,
    avgWaitTimeToWardHours: 3.9,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 18900, percentage: 45.1 },
      { specialty: 'General Surgery', admissions: 10200, percentage: 24.3 },
      { specialty: 'Urology', admissions: 7000, percentage: 16.7 },
      { specialty: 'Emergency Care', admissions: 5800, percentage: 13.8 }
    ]
  },
  {
    hospitalId: 'wh',
    year: 2024,
    inpatientAdmissions: 18400,
    daySurgeries: 8200,
    admissionRatePer1000: 4.4,
    bedOccupancyRate: 82.5,
    avgLengthOfStayDays: 5.6,
    emergencyAttendance: 52000,
    emergencyAdmissionRate: 29.2,
    avgWaitTimeToWardHours: 3.1,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 9100, percentage: 49.5 },
      { specialty: 'Geriatric Care', admissions: 5400, percentage: 29.3 },
      { specialty: 'Rehabilitation & Ortho', admissions: 3900, percentage: 21.2 }
    ]
  },

  // --- 2025 DATA (Latest projections / recorded figures) ---
  {
    hospitalId: 'sgh',
    year: 2025,
    inpatientAdmissions: 97100,
    daySurgeries: 49100,
    admissionRatePer1000: 23.0,
    bedOccupancyRate: 91.8,
    avgLengthOfStayDays: 5.8,
    emergencyAttendance: 140000,
    emergencyAdmissionRate: 37.0,
    avgWaitTimeToWardHours: 4.7,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 41200, percentage: 42.4 },
      { specialty: 'General Surgery', admissions: 20800, percentage: 21.4 },
      { specialty: 'Cardiology', admissions: 17600, percentage: 18.1 },
      { specialty: 'Internal Medicine', admissions: 17500, percentage: 18.0 }
    ]
  },
  {
    hospitalId: 'ttsh',
    year: 2025,
    inpatientAdmissions: 88900,
    daySurgeries: 42800,
    admissionRatePer1000: 21.1,
    bedOccupancyRate: 93.1,
    avgLengthOfStayDays: 6.3,
    emergencyAttendance: 156000,
    emergencyAdmissionRate: 36.5,
    avgWaitTimeToWardHours: 7.6,
    topSpecialties: [
      { specialty: 'Emergency Medicine', admissions: 42600, percentage: 47.9 },
      { specialty: 'General Medicine', admissions: 28400, percentage: 31.9 },
      { specialty: 'Surgery', admissions: 13300, percentage: 15.0 },
      { specialty: 'Others', admissions: 4600, percentage: 5.2 }
    ]
  },
  {
    hospitalId: 'nuh',
    year: 2025,
    inpatientAdmissions: 69200,
    daySurgeries: 36200,
    admissionRatePer1000: 16.4,
    bedOccupancyRate: 88.9,
    avgLengthOfStayDays: 5.3,
    emergencyAttendance: 130000,
    emergencyAdmissionRate: 33.1,
    avgWaitTimeToWardHours: 4.3,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 22100, percentage: 31.9 },
      { specialty: 'Pediatrics & Neonatology', admissions: 18500, percentage: 26.7 },
      { specialty: 'Cardiology', admissions: 15000, percentage: 21.7 },
      { specialty: 'Obstetrics & Gynaecology', admissions: 13600, percentage: 19.7 }
    ]
  },
  {
    hospitalId: 'cgh',
    year: 2025,
    inpatientAdmissions: 58200,
    daySurgeries: 27800,
    admissionRatePer1000: 13.8,
    bedOccupancyRate: 90.1,
    avgLengthOfStayDays: 5.6,
    emergencyAttendance: 137000,
    emergencyAdmissionRate: 32.5,
    avgWaitTimeToWardHours: 5.8,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 25800, percentage: 44.3 },
      { specialty: 'Gastroenterology', admissions: 14700, percentage: 25.3 },
      { specialty: 'Orthopaedics', admissions: 11000, percentage: 18.9 },
      { specialty: 'Respiratory Medicine', admissions: 6700, percentage: 11.5 }
    ]
  },
  {
    hospitalId: 'ktph',
    year: 2025,
    inpatientAdmissions: 46800,
    daySurgeries: 22600,
    admissionRatePer1000: 11.1,
    bedOccupancyRate: 92.0,
    avgLengthOfStayDays: 5.4,
    emergencyAttendance: 120000,
    emergencyAdmissionRate: 31.8,
    avgWaitTimeToWardHours: 6.8,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 20800, percentage: 44.4 },
      { specialty: 'Geriatrics', admissions: 12700, percentage: 27.1 },
      { specialty: 'General Surgery', admissions: 9000, percentage: 19.2 },
      { specialty: 'Orthopaedics', admissions: 4300, percentage: 9.2 }
    ]
  },
  {
    hospitalId: 'skh',
    year: 2025,
    inpatientAdmissions: 44500,
    daySurgeries: 21500,
    admissionRatePer1000: 10.5,
    bedOccupancyRate: 87.2,
    avgLengthOfStayDays: 4.9,
    emergencyAttendance: 108000,
    emergencyAdmissionRate: 29.8,
    avgWaitTimeToWardHours: 4.0,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 20000, percentage: 44.9 },
      { specialty: 'General Surgery', admissions: 10800, percentage: 24.3 },
      { specialty: 'Urology', admissions: 7500, percentage: 16.9 },
      { specialty: 'Emergency Care', admissions: 6200, percentage: 13.9 }
    ]
  },
  {
    hospitalId: 'wh',
    year: 2025,
    inpatientAdmissions: 24500,
    daySurgeries: 11200,
    admissionRatePer1000: 5.8,
    bedOccupancyRate: 85.5,
    avgLengthOfStayDays: 5.5,
    emergencyAttendance: 68000,
    emergencyAdmissionRate: 29.0,
    avgWaitTimeToWardHours: 3.3,
    topSpecialties: [
      { specialty: 'General Medicine', admissions: 12100, percentage: 49.4 },
      { specialty: 'Geriatric Care', admissions: 7200, percentage: 29.4 },
      { specialty: 'Rehabilitation & Ortho', admissions: 5200, percentage: 21.2 }
    ]
  }
];

export const NATIONAL_YEARLY_SUMMARY: Record<number, NationalHeaderStats> = {
  2019: {
    year: 2019,
    totalPublicHospitalAdmissions: 395850,
    residentPopulation: 4030000,
    nationalAdmissionRatePer1000: 98.2,
    avgBedOccupancyRate: 86.2,
    totalPublicBeds: 10500
  },
  2020: {
    year: 2020,
    totalPublicHospitalAdmissions: 355000,
    residentPopulation: 4040000,
    nationalAdmissionRatePer1000: 87.8,
    avgBedOccupancyRate: 82.3,
    totalPublicBeds: 10650
  },
  2021: {
    year: 2021,
    totalPublicHospitalAdmissions: 370200,
    residentPopulation: 3990000,
    nationalAdmissionRatePer1000: 92.7,
    avgBedOccupancyRate: 85.5,
    totalPublicBeds: 10800
  },
  2022: {
    year: 2022,
    totalPublicHospitalAdmissions: 442600,
    residentPopulation: 4070000,
    nationalAdmissionRatePer1000: 108.7,
    avgBedOccupancyRate: 87.2,
    totalPublicBeds: 11100
  },
  2023: {
    year: 2023,
    totalPublicHospitalAdmissions: 468891,
    residentPopulation: 4150000,
    nationalAdmissionRatePer1000: 112.9,
    avgBedOccupancyRate: 88.1,
    totalPublicBeds: 11500
  },
  2024: {
    year: 2024,
    totalPublicHospitalAdmissions: 493000,
    residentPopulation: 4180000,
    nationalAdmissionRatePer1000: 117.9,
    avgBedOccupancyRate: 88.9,
    totalPublicBeds: 11900
  },
  2025: {
    year: 2025,
    totalPublicHospitalAdmissions: 512000,
    residentPopulation: 4220000,
    nationalAdmissionRatePer1000: 121.3,
    avgBedOccupancyRate: 89.6,
    totalPublicBeds: 12200
  }
};
