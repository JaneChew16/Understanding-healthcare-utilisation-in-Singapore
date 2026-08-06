import React, { useState } from 'react';
import { HospitalProfile, HospitalYearlyStats } from '../types/hospital';
import { X, ArrowLeftRight, Check, TrendingUp, AlertTriangle, ExternalLink } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitals: HospitalProfile[];
  yearlyStats: HospitalYearlyStats[];
  selectedYear: number;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  hospitals,
  yearlyStats,
  selectedYear,
}) => {
  const [hospital1Id, setHospital1Id] = useState<string>('sgh'); // SGH
  const [hospital2Id, setHospital2Id] = useState<string>('ttsh'); // TTSH
  const [year, setYear] = useState<number>(selectedYear || 2023);

  if (!isOpen) return null;

  const h1 = hospitals.find((h) => h.id === hospital1Id) || hospitals[0];
  const h2 = hospitals.find((h) => h.id === hospital2Id) || hospitals[1];

  const stat1 = yearlyStats.find((s) => s.hospitalId === h1.id && s.year === year);
  const stat2 = yearlyStats.find((s) => s.hospitalId === h2.id && s.year === year);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Side-by-Side Hospital Comparison
              </h2>
              <p className="text-[10px] text-slate-500 font-medium">
                Compare admission workloads, bed occupancy, and wait times in Singapore
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Selectors Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Hospital A
              </label>
              <select
                value={hospital1Id}
                onChange={(e) => setHospital1Id(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs font-semibold text-slate-900"
              >
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id} disabled={h.id === hospital2Id}>
                    {h.name} ({h.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Hospital B
              </label>
              <select
                value={hospital2Id}
                onChange={(e) => setHospital2Id(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs font-semibold text-slate-900"
              >
                {hospitals.map((h) => (
                  <option key={h.id} value={h.id} disabled={h.id === hospital1Id}>
                    {h.name} ({h.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded px-3 py-1.5 text-xs font-semibold text-slate-900"
              >
                {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Side-by-Side Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Hospital 1 Column */}
            <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-blue-600 text-white font-bold rounded flex items-center justify-center text-xs">
                  {h1.shortName}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">{h1.name}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{h1.cluster}</p>
                </div>
              </div>

              <div className="space-y-3 font-mono">
                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Inpatient Admissions</span>
                  <span className="text-xl font-bold text-slate-900">
                    {stat1 ? stat1.inpatientAdmissions.toLocaleString() : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Admission Rate / 1k</span>
                  <span className="text-lg font-bold text-blue-700">
                    {stat1 ? stat1.admissionRatePer1000 : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Bed Occupancy Rate</span>
                  <span className="text-lg font-bold text-slate-900">
                    {stat1 ? `${stat1.bedOccupancyRate}%` : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Avg Length of Stay</span>
                  <span className="text-base font-bold text-slate-800">
                    {stat1 ? `${stat1.avgLengthOfStayDays} days` : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">A&E Ward Wait Time</span>
                  <span className="text-base font-bold text-slate-800">
                    {stat1 ? `${stat1.avgWaitTimeToWardHours} hours` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Hospital 2 Column */}
            <div className="border border-slate-200 rounded-lg p-5 bg-white space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 bg-slate-900 text-white font-bold rounded flex items-center justify-center text-xs">
                  {h2.shortName}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">{h2.name}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{h2.cluster}</p>
                </div>
              </div>

              <div className="space-y-3 font-mono">
                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Inpatient Admissions</span>
                  <span className="text-xl font-bold text-slate-900">
                    {stat2 ? stat2.inpatientAdmissions.toLocaleString() : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Admission Rate / 1k</span>
                  <span className="text-lg font-bold text-blue-700">
                    {stat2 ? stat2.admissionRatePer1000 : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Bed Occupancy Rate</span>
                  <span className="text-lg font-bold text-slate-900">
                    {stat2 ? `${stat2.bedOccupancyRate}%` : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">Avg Length of Stay</span>
                  <span className="text-base font-bold text-slate-800">
                    {stat2 ? `${stat2.avgLengthOfStayDays} days` : 'N/A'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <span className="text-[10px] font-sans text-slate-400 uppercase block font-bold">A&E Ward Wait Time</span>
                  <span className="text-base font-bold text-slate-800">
                    {stat2 ? `${stat2.avgWaitTimeToWardHours} hours` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <a
            href="https://www.healthhub.sg/support-and-tools/statistics-on-healthcare/admissions-and-outpatient-attendances"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] text-blue-600 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Data Source: HealthHub SG Healthcare Statistics</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
