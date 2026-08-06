import React from 'react';
import { Search, Building2, Calendar, Filter, Sparkles, Activity, CheckCircle2, RefreshCw, ExternalLink } from 'lucide-react';
import { HospitalProfile } from '../types/hospital';

interface SidebarQueryPanelProps {
  hospitals: HospitalProfile[];
  selectedHospitalId: string;
  onSelectHospital: (id: string) => void;
  selectedYear: number;
  onSelectYear: (year: number) => void;
  metricFilters: {
    totalAdmissions: boolean;
    bedOccupancy: boolean;
    lengthOfStay: boolean;
    emergencyWait: boolean;
  };
  onToggleMetric: (metric: keyof SidebarQueryPanelProps['metricFilters']) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onExecuteQuery: (queryText?: string) => void;
  isLoading: boolean;
  recentQueries: string[];
}

export const SidebarQueryPanel: React.FC<SidebarQueryPanelProps> = ({
  hospitals,
  selectedHospitalId,
  onSelectHospital,
  selectedYear,
  onSelectYear,
  metricFilters,
  onToggleMetric,
  searchQuery,
  onSearchQueryChange,
  onExecuteQuery,
  isLoading,
  recentQueries,
}) => {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteQuery();
  };

  return (
    <aside className="w-80 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-slate-900 block leading-tight">
              MedData SG
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">
              MOH Admissions Engine
            </span>
          </div>
        </div>

        {/* AI Prompt Input Box */}
        <form onSubmit={handleSubmit} className="mb-4">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center justify-between">
            <span>Natural Language Search</span>
            <span className="text-blue-600 flex items-center gap-1 font-semibold text-[9px]">
              <Sparkles className="w-2.5 h-2.5" /> AI GEMINI
            </span>
          </label>
          <div className="relative">
            <textarea
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="e.g. What was TTSH hospital admission rate in 2023?"
              rows={3}
              className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 resize-none transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  onExecuteQuery();
                }
              }}
            />
          </div>
        </form>

        {/* Form Selectors */}
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Public Hospital
            </label>
            <select
              value={selectedHospitalId}
              onChange={(e) => onSelectHospital(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="all">All Public Hospitals (Singapore National)</option>
              {hospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name} ({h.shortName})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
              Reference Year
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {years.map((y) => {
                const isSelected = selectedYear === y;
                return (
                  <button
                    key={y}
                    type="button"
                    onClick={() => onSelectYear(y)}
                    className={`px-2 py-1 text-xs font-mono font-medium rounded transition-all ${
                      isSelected
                        ? 'border border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              Metric Filters
            </label>
            <div className="space-y-1.5 bg-slate-50 p-2.5 rounded border border-slate-200/80">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={metricFilters.totalAdmissions}
                  onChange={() => onToggleMetric('totalAdmissions')}
                  className="rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                Total Admissions
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={metricFilters.bedOccupancy}
                  onChange={() => onToggleMetric('bedOccupancy')}
                  className="rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                Bed Occupancy Rate (%)
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={metricFilters.lengthOfStay}
                  onChange={() => onToggleMetric('lengthOfStay')}
                  className="rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                Avg Length of Stay (Days)
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  checked={metricFilters.emergencyWait}
                  onChange={() => onToggleMetric('emergencyWait')}
                  className="rounded text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                A&E Emergency Wait Times
              </label>
            </div>
          </div>
        </div>

        {/* Execute Button */}
        <button
          type="button"
          onClick={() => onExecuteQuery()}
          disabled={isLoading}
          className="w-full mt-5 bg-slate-900 text-white font-semibold py-2.5 rounded hover:bg-slate-800 active:bg-slate-950 transition-colors text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Querying Dataset...</span>
            </>
          ) : (
            <>
              <Search className="w-3.5 h-3.5" />
              <span>Execute AI Query</span>
            </>
          )}
        </button>
      </div>

      {/* Recent Queries List */}
      <div className="flex-1 p-5 overflow-y-auto">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
          <span>Sample & Recent Queries</span>
          <Activity className="w-3 h-3 text-slate-400" />
        </h3>
        <ul className="space-y-2">
          {recentQueries.map((q, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSearchQueryChange(q);
                onExecuteQuery(q);
              }}
              className="text-xs text-slate-600 hover:text-blue-600 cursor-pointer hover:bg-blue-50/50 p-1.5 rounded transition-colors flex items-start gap-1.5 group"
            >
              <span className="text-blue-500 font-bold text-xs select-none">•</span>
              <span className="group-hover:underline line-clamp-2 leading-tight">{q}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Footer Status */}
      <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
        <a
          href="https://www.healthhub.sg/support-and-tools/statistics-on-healthcare/admissions-and-outpatient-attendances"
          target="_blank"
          rel="noreferrer"
          className="text-[10px] text-blue-600 hover:underline font-semibold flex items-center justify-between bg-blue-50/70 p-2 rounded border border-blue-100"
        >
          <span>HealthHub SG Statistics Dataset</span>
          <ExternalLink className="w-3 h-3 text-blue-500 shrink-0" />
        </a>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-slate-400" /> DATA ENGINE
          </span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> ONLINE
          </span>
        </div>
      </div>
    </aside>
  );
};
