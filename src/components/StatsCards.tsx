import React from 'react';
import { TrendingUp, AlertTriangle, Clock, Users, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface StatsCardsProps {
  totalAdmissions: number;
  prevYearAdmissions?: number;
  admissionRatePer1000: number;
  bedOccupancyRate: number;
  avgLengthOfStayDays: number;
  emergencyAttendance?: number;
  selectedYear: number;
  hospitalName: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalAdmissions,
  prevYearAdmissions,
  admissionRatePer1000,
  bedOccupancyRate,
  avgLengthOfStayDays,
  emergencyAttendance,
  selectedYear,
  hospitalName,
}) => {
  // YoY admission calculation
  const yoyDiff = prevYearAdmissions ? totalAdmissions - prevYearAdmissions : 0;
  const yoyPercent = prevYearAdmissions && prevYearAdmissions > 0
    ? ((yoyDiff / prevYearAdmissions) * 100).toFixed(1)
    : null;

  // Bed occupancy status threshold
  const isCriticalBed = bedOccupancyRate >= 91.0;
  const isHighBed = bedOccupancyRate >= 87.0 && bedOccupancyRate < 91.0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 1. Total Inpatient Admissions */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Total Inpatient Admissions
          </span>
          <Users className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
          {totalAdmissions.toLocaleString()}
        </div>
        <div className="text-[10px] font-semibold mt-1 flex items-center gap-1">
          {yoyPercent !== null ? (
            parseFloat(yoyPercent) >= 0 ? (
              <span className="text-emerald-600 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +{yoyPercent}% vs {selectedYear - 1}
              </span>
            ) : (
              <span className="text-blue-600 flex items-center gap-0.5">
                <ArrowDownRight className="w-3 h-3" />
                {yoyPercent}% vs {selectedYear - 1}
              </span>
            )
          ) : (
            <span className="text-slate-500 font-normal">Official MOH Record ({selectedYear})</span>
          )}
        </div>
      </div>

      {/* 2. Admission Rate per 1,000 residents */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Admission Rate / 1k Pop.
          </span>
          <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
          {admissionRatePer1000.toFixed(1)} <span className="text-xs text-slate-500 font-normal">/ 1,000</span>
        </div>
        <div className="text-[10px] text-slate-500 font-medium mt-1">
          {hospitalName === 'All Public Hospitals (Singapore National)'
            ? 'National Public Admission Rate'
            : `Hospital share of SG resident care`}
        </div>
      </div>

      {/* 3. Bed Occupancy Rate */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Bed Occupancy Rate
          </span>
          <Activity className={`w-3.5 h-3.5 ${isCriticalBed ? 'text-red-500' : 'text-slate-400'}`} />
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
          {bedOccupancyRate.toFixed(1)}%
        </div>
        <div className="text-[10px] font-semibold mt-1">
          {isCriticalBed ? (
            <span className="text-red-600 flex items-center gap-1 font-bold">
              <AlertTriangle className="w-3 h-3" /> Critical Capacity Warning
            </span>
          ) : isHighBed ? (
            <span className="text-amber-600 font-bold">High Capacity Utilization</span>
          ) : (
            <span className="text-emerald-600 font-bold">Optimal Operating Level</span>
          )}
        </div>
      </div>

      {/* 4. Avg Length of Stay */}
      <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition-colors">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Avg Length of Stay
          </span>
          <Clock className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="text-2xl font-bold font-mono tracking-tighter text-slate-900">
          {avgLengthOfStayDays.toFixed(1)} <span className="text-xs text-slate-500 font-normal">days</span>
        </div>
        <div className="text-[10px] text-slate-500 font-semibold mt-1">
          {emergencyAttendance ? `A&E Visits: ${emergencyAttendance.toLocaleString()}` : 'Stable Inpatient Duration'}
        </div>
      </div>
    </div>
  );
};
