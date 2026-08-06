import React from 'react';
import { Download, FileText, ArrowLeftRight, RotateCcw, Database, ExternalLink } from 'lucide-react';

interface HeaderNavProps {
  onExportCSV: () => void;
  onPrintReport: () => void;
  onOpenCompareModal: () => void;
  onResetFilters: () => void;
  selectedHospitalName: string;
  selectedYear: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onExportCSV,
  onPrintReport,
  onOpenCompareModal,
  onResetFilters,
  selectedHospitalName,
  selectedYear,
}) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between shrink-0 select-none">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-bold text-slate-900 tracking-tight">
            Singapore Hospital Admission Analysis Dashboard
          </h1>
          <span className="bg-slate-100 text-slate-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-slate-200">
            {selectedYear}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
          <Database className="w-3 h-3 text-slate-400 shrink-0" />
          <span>
            Source:{' '}
            <a
              href="https://www.healthhub.sg/support-and-tools/statistics-on-healthcare/admissions-and-outpatient-attendances"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
            >
              HealthHub SG (MOH) Admissions & Outpatient Attendances
              <ExternalLink className="w-2.5 h-2.5" />
            </a>{' '}
            &bull; Viewing: <strong className="text-slate-700 font-semibold">{selectedHospitalName}</strong>
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onResetFilters}
          className="px-2.5 py-1.5 text-xs border border-slate-200 rounded bg-white text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Reset selections"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={onOpenCompareModal}
          className="px-3 py-1.5 text-xs border border-blue-200 rounded bg-blue-50/60 text-blue-700 font-semibold hover:bg-blue-100 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Compare Hospitals</span>
        </button>

        <button
          onClick={onExportCSV}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white font-medium text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Export CSV</span>
        </button>

        <button
          onClick={onPrintReport}
          className="px-3 py-1.5 text-xs border border-slate-200 rounded bg-white font-medium text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Print Report</span>
        </button>
      </div>
    </header>
  );
};
