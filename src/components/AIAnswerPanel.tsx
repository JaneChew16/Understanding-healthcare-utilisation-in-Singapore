import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';
import { AISearchResponse } from '../types/hospital';

interface AIAnswerPanelProps {
  data: AISearchResponse | null;
  onSelectSuggestedQuery: (query: string) => void;
  isLoading: boolean;
}

export const AIAnswerPanel: React.FC<AIAnswerPanelProps> = ({
  data,
  onSelectSuggestedQuery,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-2xs animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full"></div>
          <div className="h-4 bg-slate-200 rounded w-48"></div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-slate-100 rounded w-full"></div>
          <div className="h-3 bg-slate-100 rounded w-5/6"></div>
          <div className="h-3 bg-slate-100 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-2xs relative overflow-hidden transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="p-1 bg-blue-100 text-blue-700 rounded text-xs font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> AI GEMINI INSIGHT
          </span>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-700">
            {data.hospitalName ? `${data.hospitalName} (${data.year || 'Singapore MOH'})` : 'Hospital Query Result'}
          </h2>
        </div>
        {data.isAIProcessed && (
          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            Model: gemini-3.6-flash &bull; Grounded Dataset
          </span>
        )}
      </div>

      {/* Main Answer text */}
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal mb-4 bg-slate-50/80 p-3.5 rounded border border-slate-100">
        {data.answer}
      </p>

      {/* Key Takeaways */}
      {data.keyTakeaways && data.keyTakeaways.length > 0 && (
        <div className="mb-4">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
            Key Analysis Takeaways
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.keyTakeaways.map((takeaway, i) => (
              <li
                key={i}
                className="text-xs text-slate-700 bg-white border border-slate-100 rounded p-2 flex items-start gap-2 shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Comparison Data Table if present */}
      {data.comparisonData && data.comparisonData.length > 0 && (
        <div className="mb-4 border border-slate-200 rounded overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold uppercase text-[10px] text-slate-500">
              <tr>
                <th className="px-3 py-2">Hospital</th>
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2">Admissions</th>
                <th className="px-3 py-2">Rate / 1k Pop.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {data.comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="px-3 py-1.5 font-sans font-semibold text-slate-900">{row.hospitalName}</td>
                  <td className="px-3 py-1.5 text-slate-600">{row.year}</td>
                  <td className="px-3 py-1.5 font-bold text-slate-900">{row.admissions.toLocaleString()}</td>
                  <td className="px-3 py-1.5 text-blue-700 font-bold">{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Suggested Follow-up Queries */}
      {data.suggestedQueries && data.suggestedQueries.length > 0 && (
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Related Follow-up Queries
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.suggestedQueries.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => onSelectSuggestedQuery(sq)}
                className="text-xs bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium px-2.5 py-1 rounded border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>{sq}</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grounding Sources */}
      {data.groundingSources && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 text-[10px] text-slate-400">
          <span className="font-semibold uppercase tracking-wider">Citations:</span>
          {data.groundingSources.map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noreferrer"
              className="text-slate-500 hover:text-blue-600 flex items-center gap-1 underline decoration-slate-300"
            >
              <span>{src.title}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
