import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, HelpCircle } from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskMeterProps {
  riskLevel: RiskLevel;
  riskProbability: number; // 0 to 100
  cropName: string;
  districtName: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({
  riskLevel,
  riskProbability,
  cropName,
  districtName
}) => {
  // Clamp probability between 0 and 100
  const clampedProb = Math.min(100, Math.max(0, riskProbability));

  // Determine styling based on risk category
  let badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-700';
  let Icon = ShieldCheck;
  let advisory = 'Environmental conditions, historical precipitation, and irrigation support viable cultivation with standard agro-practices.';

  if (riskLevel === 'High Risk' || clampedProb > 65) {
    badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';
    barColor = 'bg-rose-500';
    textColor = 'text-rose-700';
    Icon = AlertOctagon;
    advisory = 'Elevated probability of climate-yield stress. Consider diversifying crop portfolio, securing micro-irrigation, or reviewing low-risk alternatives below.';
  } else if (riskLevel === 'Moderate Risk' || clampedProb > 25) {
    badgeColor = 'bg-amber-50 text-amber-700 border-amber-200';
    barColor = 'bg-amber-500';
    textColor = 'text-amber-700';
    Icon = AlertTriangle;
    advisory = 'Moderate yield variability detected. Vigilant monitoring of monsoon onset, groundwater recharge, and pest scouting is strongly advised.';
  }

  return (
    <div id="risk-meter-container" className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">Classified Outcome</span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            {cropName} in {districtName}
          </h3>
        </div>

        <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-sm font-semibold ${badgeColor}`}>
          <Icon className="w-4 h-4" />
          <span>{riskLevel}</span>
        </div>
      </div>

      {/* Main Gauge / Progress Display */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className={`text-4xl font-extrabold tracking-tight ${textColor}`}>
              {clampedProb.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-500 font-medium">Estimated Risk Probability</span>
          </div>

          <div className="text-right">
            <span className="text-xs font-medium text-slate-500">Benchmark Threshold:</span>
            <div className="text-xs font-semibold text-slate-700">
              {clampedProb <= 25 ? 'Low Zone (<25%)' : clampedProb <= 65 ? 'Moderate Zone (25-65%)' : 'High Zone (>65%)'}
            </div>
          </div>
        </div>

        {/* Multi-segment Meter Bar */}
        <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 flex">
          {/* Visual gradient zones */}
          <div className="absolute inset-0 grid grid-cols-3 opacity-20 pointer-events-none">
            <div className="bg-emerald-500 border-r border-white/40" />
            <div className="bg-amber-500 border-r border-white/40" />
            <div className="bg-rose-500" />
          </div>

          {/* Active progress fill */}
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${barColor}`}
            style={{ width: `${clampedProb}%` }}
          />
        </div>

        {/* Meter Legend */}
        <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
          <span>0% Safe</span>
          <span className="text-slate-500 font-normal">25% (Low)</span>
          <span className="text-slate-500 font-normal">65% (Moderate)</span>
          <span>100% Critical</span>
        </div>
      </div>

      {/* Agronomic Advisory Card */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-700">Decision Support Advisory: </span>
          {advisory}
        </div>
      </div>
    </div>
  );
};
