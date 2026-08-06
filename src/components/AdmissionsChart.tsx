import React, { useState } from 'react';
import { HospitalYearlyStats, HospitalProfile } from '../types/hospital';
import { BarChart3, PieChart, Info } from 'lucide-react';

interface AdmissionsChartProps {
  statsList: HospitalYearlyStats[];
  selectedHospital?: HospitalProfile;
  selectedYear: number;
  allHospitalsStats: HospitalYearlyStats[];
}

export const AdmissionsChart: React.FC<AdmissionsChartProps> = ({
  statsList,
  selectedHospital,
  selectedYear,
  allHospitalsStats,
}) => {
  const [metricMode, setMetricMode] = useState<'admissions' | 'occupancy' | 'rate'>('admissions');

  // Multi-year data for the selected hospital or national average (2019 - 2025)
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

  const yearlyChartData = years.map((yr) => {
    if (selectedHospital) {
      const match = allHospitalsStats.find(
        (s) => s.hospitalId === selectedHospital.id && s.year === yr
      );
      return {
        year: yr,
        value: match
          ? metricMode === 'admissions'
            ? match.inpatientAdmissions
            : metricMode === 'occupancy'
            ? match.bedOccupancyRate
            : match.admissionRatePer1000
          : 0,
        isSelected: yr === selectedYear,
      };
    } else {
      // National aggregate across public hospitals
      const matches = allHospitalsStats.filter((s) => s.year === yr);
      const totalAdm = matches.reduce((acc, curr) => acc + curr.inpatientAdmissions, 0);
      const avgOcc = matches.length
        ? matches.reduce((acc, curr) => acc + curr.bedOccupancyRate, 0) / matches.length
        : 0;
      const avgRate = matches.length
        ? matches.reduce((acc, curr) => acc + curr.admissionRatePer1000, 0) / matches.length
        : 0;

      return {
        year: yr,
        value:
          metricMode === 'admissions'
            ? totalAdm
            : metricMode === 'occupancy'
            ? avgOcc
            : avgRate,
        isSelected: yr === selectedYear,
      };
    }
  });

  const maxValue = Math.max(...yearlyChartData.map((d) => d.value), 1);

  // Current year stat for specialty breakdown
  const currentStat = selectedHospital
    ? allHospitalsStats.find((s) => s.hospitalId === selectedHospital.id && s.year === selectedYear)
    : allHospitalsStats.find((s) => s.hospitalId === 'ttsh' && s.year === selectedYear) ||
      allHospitalsStats.find((s) => s.hospitalId === 'sgh' && s.year === selectedYear);

  const specialties = currentStat?.topSpecialties || [
    { specialty: 'Emergency Medicine', admissions: 38200, percentage: 42.5 },
    { specialty: 'General Medicine', admissions: 26973, percentage: 32.0 },
    { specialty: 'General Surgery', admissions: 12643, percentage: 15.0 },
    { specialty: 'Others', admissions: 4215, percentage: 5.0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Multi-Year Trend Chart (2 Columns) */}
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-5 flex flex-col shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
              <span>
                {selectedHospital ? `${selectedHospital.shortName} Multi-Year Trend` : 'Singapore National Public Trend'}
              </span>
            </h2>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              {metricMode === 'admissions'
                ? 'Annual Total Inpatient Admissions'
                : metricMode === 'occupancy'
                ? 'Average Bed Occupancy Rate (%)'
                : 'Admission Rate per 1,000 Resident Population'}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded border border-slate-200 text-xs">
            <button
              onClick={() => setMetricMode('admissions')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                metricMode === 'admissions'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admissions
            </button>
            <button
              onClick={() => setMetricMode('occupancy')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                metricMode === 'occupancy'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Occupancy %
            </button>
            <button
              onClick={() => setMetricMode('rate')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                metricMode === 'rate'
                  ? 'bg-white text-blue-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Rate/1k
            </button>
          </div>
        </div>

        {/* Bar Visualizer */}
        <div className="flex-1 flex items-end gap-2.5 sm:gap-4 pb-4 pt-6 min-h-[180px]">
          {yearlyChartData.map((d) => {
            const heightPercent = Math.max((d.value / maxValue) * 100, 8);
            return (
              <div key={d.year} className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[9px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity mb-1 bg-slate-900 text-white px-1.5 py-0.5 rounded shadow-2xs pointer-events-none">
                  {metricMode === 'admissions'
                    ? `${Math.round(d.value).toLocaleString()}`
                    : metricMode === 'occupancy'
                    ? `${d.value.toFixed(1)}%`
                    : `${d.value.toFixed(1)}`}
                </div>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t transition-all duration-300 relative ${
                    d.isSelected
                      ? 'bg-blue-600 shadow-xs'
                      : 'bg-blue-300 hover:bg-blue-400'
                  }`}
                >
                  {d.isSelected && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-700 rounded-full ring-2 ring-white"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between text-[10px] font-mono text-slate-500 border-t border-slate-100 pt-2 font-bold">
          {years.map((y) => (
            <span
              key={y}
              className={y === selectedYear ? 'text-blue-700 font-extrabold underline' : 'text-slate-500'}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      {/* Specialty Breakdown (1 Column) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col shadow-2xs">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5 flex items-center gap-1.5">
          <PieChart className="w-3.5 h-3.5 text-slate-600" />
          <span>Admission Breakdown ({selectedYear})</span>
        </h2>

        <div className="space-y-4 flex-1">
          {specialties.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-700 font-medium truncate max-w-[170px]">
                  {item.specialty}
                </span>
                <span className="font-mono font-bold text-slate-900">
                  {item.percentage}%
                  <span className="text-[10px] text-slate-400 font-normal ml-1">
                    ({item.admissions.toLocaleString()})
                  </span>
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-500 italic flex items-center justify-center gap-1">
            <Info className="w-3 h-3 text-slate-400 shrink-0" />
            <span>
              Represents primary inpatient admissions for {selectedHospital ? selectedHospital.name : 'Singapore Public Hospitals'} in FY{selectedYear}.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
