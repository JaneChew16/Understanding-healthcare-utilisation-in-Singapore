import React from 'react';
import { HospitalProfile, HospitalYearlyStats } from '../types/hospital';
import { X, Building2, MapPin, Calendar, Globe, Bed, Activity, Award, ExternalLink } from 'lucide-react';

interface HospitalDetailModalProps {
  hospital: HospitalProfile | null;
  onClose: () => void;
  yearlyStats: HospitalYearlyStats[];
}

export const HospitalDetailModal: React.FC<HospitalDetailModalProps> = ({
  hospital,
  onClose,
  yearlyStats,
}) => {
  if (!hospital) return null;

  const hospitalStats = yearlyStats
    .filter((s) => s.hospitalId === hospital.id)
    .sort((a, b) => b.year - a.year);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-lg shadow-2xs">
              {hospital.shortName}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {hospital.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-0.5">
                <span>{hospital.cluster}</span> &bull; <span>Opened {hospital.openedYear}</span>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded border border-slate-200">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Beds
              </span>
              <span className="text-base font-bold font-mono text-slate-900">
                {hospital.beds.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Region
              </span>
              <span className="text-base font-bold text-slate-900">{hospital.region}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Cluster
              </span>
              <span className="text-xs font-semibold text-blue-700">{hospital.cluster}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Website
              </span>
              <a
                href={hospital.website}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-600 font-medium hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Overview & Scope
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed bg-white border border-slate-100 p-3 rounded">
              {hospital.description}
            </p>
          </div>

          {/* Key Clinical Specialties */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Award className="w-3 h-3 text-slate-500" /> Key Clinical Specialties
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {hospital.specialties.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-700 font-medium text-xs px-2.5 py-1 rounded border border-blue-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Multi-Year Admissions Stats Table */}
          <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
              <Activity className="w-3 h-3 text-slate-500" /> Multi-Year Historical Metrics
            </h3>
            <div className="border border-slate-200 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 font-bold uppercase text-[10px] text-slate-400 border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2">Year</th>
                    <th className="px-3 py-2">Admissions</th>
                    <th className="px-3 py-2">Rate/1k</th>
                    <th className="px-3 py-2">Bed Occ.</th>
                    <th className="px-3 py-2">Avg Stay</th>
                    <th className="px-3 py-2">A&E Visits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {hospitalStats.map((st) => (
                    <tr key={st.year} className="hover:bg-slate-50">
                      <td className="px-3 py-2 font-sans font-bold text-slate-900">{st.year}</td>
                      <td className="px-3 py-2 font-bold text-slate-900">
                        {st.inpatientAdmissions.toLocaleString()}
                      </td>
                      <td className="px-3 py-2 text-blue-700 font-bold">{st.admissionRatePer1000}</td>
                      <td className="px-3 py-2 text-slate-800">{st.bedOccupancyRate}%</td>
                      <td className="px-3 py-2 text-slate-600">{st.avgLengthOfStayDays}d</td>
                      <td className="px-3 py-2 text-slate-500">
                        {st.emergencyAttendance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            <span>Source: HealthHub SG Healthcare Statistics</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
