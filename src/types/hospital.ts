export type HealthcareCluster = 'SingHealth' | 'National Healthcare Group (NHG)' | 'National University Health System (NUHS)';

export interface HospitalProfile {
  id: string;
  name: string;
  shortName: string;
  cluster: HealthcareCluster;
  beds: number;
  region: 'Central' | 'East' | 'West' | 'North' | 'Northeast';
  openedYear: number;
  address: string;
  website: string;
  description: string;
  specialties: string[];
}

export interface HospitalYearlyStats {
  hospitalId: string;
  year: number;
  inpatientAdmissions: number;
  daySurgeries: number;
  admissionRatePer1000: number; // Inpatient admissions per 1000 resident population served
  bedOccupancyRate: number; // Percentage, e.g., 87.5
  avgLengthOfStayDays: number; // Days, e.g., 5.8
  emergencyAttendance: number; // A&E visits
  emergencyAdmissionRate: number; // Percentage of A&E visits admitted to ward
  avgWaitTimeToWardHours: number; // Median wait time from A&E to ward in hours
  topSpecialties: {
    specialty: string;
    admissions: number;
    percentage: number;
  }[];
}

export interface NationalHeaderStats {
  year: number;
  totalPublicHospitalAdmissions: number;
  residentPopulation: number;
  nationalAdmissionRatePer1000: number;
  avgBedOccupancyRate: number;
  totalPublicBeds: number;
}

export interface SearchQueryParams {
  query?: string;
  hospitalId?: string;
  year?: number;
  cluster?: string;
  specialty?: string;
}

export interface AISearchResponse {
  answer: string;
  hospitalName?: string;
  year?: number;
  admissionsCount?: number;
  admissionRatePer1000?: number;
  bedOccupancyRate?: number;
  avgLengthOfStayDays?: number;
  comparisonData?: {
    hospitalName: string;
    year: number;
    admissions: number;
    rate: number;
  }[];
  keyTakeaways: string[];
  suggestedQueries: string[];
  groundingSources?: { title: string; url: string }[];
  isAIProcessed: boolean;
}
