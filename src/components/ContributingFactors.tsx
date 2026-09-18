import React from 'react';
import { CloudRain, TrendingDown, Droplets, History, Activity } from 'lucide-react';
import { CONTRIBUTING_FACTOR_METADATA } from '../data/agronomyData';

interface ContributingFactorsProps {
  factors: Record<string, string>;
}

export const ContributingFactors: React.FC<ContributingFactorsProps> = ({ factors }) => {
  const getIcon = (factorName: string) => {
    switch (factorName) {
      case 'Rainfall condition':
        return CloudRain;
      case 'Historical instability':
        return History;
      case 'Irrigation condition':
        return Droplets;
      case 'Historical yield trend':
        return TrendingDown;
      default:
        return Activity;
    }
  };

  const getBadgeStyle = (level: string) => {
    const norm = (level || '').toLowerCase();
    if (norm.includes('high')) {
      return 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
    }
    if (norm.includes('med') || norm.includes('mod')) {
      return 'bg-amber-50 text-amber-700 border-amber-200 font-medium';
    }
    return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium';
  };

  const factorKeys = Object.keys(factors).length > 0
    ? Object.keys(factors)
    : ['Rainfall condition', 'Historical instability', 'Irrigation condition', 'Historical yield trend'];

  return (
    <div id="contributing-factors-card" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h4 className="text-base font-bold text-slate-900">Key Stress Drivers & Factor Attribution</h4>
          <p className="text-xs text-slate-500">
            Decomposition of variables impacting the classifier’s risk determination
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">
          4 Feature Nodes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {factorKeys.map((key) => {
          const rawValue = factors[key] || 'Low';
          const meta = CONTRIBUTING_FACTOR_METADATA[key] || {
            label: key,
            desc: 'Agronomic indicator derived from localized sub-district datasets.'
          };
          const Icon = getIcon(key);
          const badgeClass = getBadgeStyle(rawValue);

          return (
            <div
              key={key}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-slate-300 transition-colors space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800">{meta.label}</span>
                </div>

                <span className={`px-2 py-0.5 rounded-md text-[11px] border ${badgeClass}`}>
                  {rawValue.includes('contribution') ? rawValue : `${rawValue} impact`}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-snug pl-9">
                {meta.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
