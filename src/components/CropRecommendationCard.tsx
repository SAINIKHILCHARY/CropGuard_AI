import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Award, Wheat } from 'lucide-react';
import { RecommendedCropInfo, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CropRecommendationCardProps {
  currentCrop: string;
  currentRiskProb: number;
  recommendation: RecommendedCropInfo;
  onApplyRecommendation: (crop: string) => void;
  language?: Language;
}

export const CropRecommendationCard: React.FC<CropRecommendationCardProps> = ({
  currentCrop,
  currentRiskProb,
  recommendation,
  onApplyRecommendation,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];
  const recRisk = typeof recommendation.risk_probability === 'number' ? recommendation.risk_probability : 0.0;
  const recScore = typeof recommendation.recommendation_score === 'number' ? recommendation.recommendation_score : 98.6;
  const riskDiff = Math.max(0, currentRiskProb - recRisk);
  const percentReduction = currentRiskProb > 0 ? Math.round((riskDiff / currentRiskProb) * 100) : 0;

  return (
    <div
      id="crop-recommendation-card"
      className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white shadow-lg border border-emerald-700/50 space-y-5"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
            <Wheat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {language === 'te' ? 'సిఫార్సు చేయబడిన ప్రత్యామ్నాయ పంట' : 'Recommended Crop Alternative'}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-stone-900">
                Score: {recScore.toFixed(1)}%
              </span>
            </div>
            <h4 className="text-2xl font-black text-white mt-1">
              {recommendation.crop}
            </h4>
          </div>
        </div>

        {/* Risk Probability pill */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center bg-white/10 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-white/10">
          <span className="text-xs text-emerald-200">
            {language === 'te' ? 'అంచనా వేసిన రిస్క్:' : 'Predicted Alternative Risk:'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-amber-300 font-mono">
              {recRisk.toFixed(1)}%
            </span>
            <span className="text-xs text-emerald-300 font-semibold">
              ({recommendation.risk_level})
            </span>
          </div>
        </div>
      </div>

      {/* Reduction Banner */}
      {percentReduction > 0 && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-600/40 flex items-center justify-between text-xs sm:text-sm text-emerald-100">
          <div className="flex items-center gap-2.5">
            <TrendingUp className="w-5 h-5 text-amber-300 shrink-0" />
            <span>
              {language === 'te' ? (
                <>
                  <strong className="text-white">{currentCrop}</strong> నుండి మారడం ద్వారా దాదాపు{' '}
                  <strong className="text-amber-300 font-bold text-base">{percentReduction}% రిస్క్ తగ్గుతుంది</strong>.
                </>
              ) : (
                <>
                  Switching from <strong className="text-white">{currentCrop}</strong> provides an estimated{' '}
                  <strong className="text-amber-300 font-bold text-base">{percentReduction}% risk reduction</strong>.
                </>
              )}
            </span>
          </div>
        </div>
      )}

      {/* Explanatory reason from model */}
      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed bg-black/15 p-3 rounded-xl border border-white/5">
        <strong className="text-white font-semibold block mb-1">
          {language === 'te' ? 'సిఫార్సు ఆధారం:' : 'Recommendation Rationale:'}
        </strong>
        {recommendation.reason ||
          'Based on historical crop characteristics, district conditions, seasonal information and the recommendation model.'}
      </p>

      {/* Action Button: Apply Recommendation to Form */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-emerald-200">
          {language === 'te'
            ? 'ఈ పంటను రిస్క్ లేదా దిగుబడి ఫారమ్‌లో పరీక్షించండి'
            : 'Pre-fill and assess this crop in the risk analyzer'}
        </span>
        <button
          id="btn-apply-rec-crop"
          onClick={() => onApplyRecommendation(recommendation.crop)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{language === 'te' ? `${recommendation.crop} ను ఎంచుకోండి` : `Switch to ${recommendation.crop}`}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
