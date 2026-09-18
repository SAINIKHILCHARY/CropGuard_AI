import React from 'react';
import { Award, BookOpen, Layers, ShieldCheck, Database, GitBranch, Binary, Check, Wheat, ArrowRight } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'శాస్త్రీయ పద్ధతి & మోడల్ ఆర్కిటెక్చర్' : 'Scientific Methodology & Agronomic Architecture'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {language === 'te' ? 'CropGuard AI ఎలా పనిచేస్తుంది?' : 'Agronomic Science Behind CropGuard AI'}
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          {language === 'te'
            ? 'తెలంగాణలోని 32 జిల్లాల్లో 2014 నుండి 2023 వరకు 9 సంవత్సరాల కాలంలో సేకరించిన 10,708 రికార్డులతో శిక్షణ పొందిన డ్యూయల్ మెషిన్ లెర్నింగ్ ఆర్కిటెక్చర్.'
            : 'Rooted in 9 continuous agricultural years across 32 Telangana districts, our dual machine learning pipeline delivers transparent decision-support before capital is committed.'}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'te' ? '10,708 రికార్డుల డేటాసెట్' : '10,708 Micro-Records Dataset'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'te'
              ? '2014-15 నుండి 2022-23 వరకు తెలంగాణలోని అన్ని వ్యవసాయ మండలాల నుండి సేకరించిన పంట దిగుబడులు, వర్షపాతం మరియు సాగునీటి వివరాలు.'
              : 'Spanning 2014–15 through 2022–23 across all agricultural agro-climatic zones in Telangana. Incorporates historical crop yields, normal precipitation, and irrigation coverage.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <GitBranch className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'te' ? 'కఠినమైన సమయ ఆధారిత విభజన' : 'Strict Out-of-Time Temporal Splitting'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'te'
              ? 'డేటా లీకేజీని నివారించడానికి పూర్వ సంవత్సరాల డేటాతో మోడల్‌ను శిక్షణ ఇచ్చి, తరువాతి సంవత్సరాల డేటాపై పరీక్షించారు.'
              : 'To simulate true pre-sowing forecasts without future data leakage, longitudinal historical seasons were used for training while subsequent seasons served as a blind holdout validation test.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'te' ? 'వ్యవసాయ వాతావరణ ఫీచర్లు' : 'Multi-Factor Agro-Climatic Features'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'te'
              ? 'వర్షపాత తేడాలు, భూగర్భ జలాలు, కాలువ నీరు, చారిత్రక అస్థిరత మరియు దిగుబడి పోకడలతో సహా కీలక కారకాల విశ్లేషణ.'
              : 'Engineered features including seasonal precipitation anomaly coefficients, net irrigated area fractions (canal vs borewell), and historical yield momentum.'}
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Binary className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'te' ? 'రెండు ప్రత్యేక మోడల్స్ సమ్మేళనం' : 'Dual-Model Pipeline Synergy'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            {language === 'te'
              ? 'డెసిషన్ ట్రీ క్లాసిఫైయర్ ద్వారా పర్యావరణ రిస్క్ మరియు రాండమ్ ఫారెస్ట్ రిగ్రెసర్ ద్వారా హెక్టారుకు ఖచ్చితమైన దిగుబడి అంచనా.'
              : 'Combines an interpretable multi-class Decision Tree for agro-climatic feasibility and risk attribution with a tuned Random Forest regressor for continuous yield estimation.'}
          </p>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900">
            {language === 'te' ? 'మోడల్ బెంచ్‌మార్క్ మరియు ఖచ్చితత్వ కొలమానాలు' : 'Model Evaluation & Benchmark Performance'}
          </h3>
          <p className="text-xs text-stone-500">
            Validation metrics evaluated across 10,708 historical records in Telangana
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50 text-stone-700 font-bold">
                <th className="py-3 px-3">Pipeline Role</th>
                <th className="py-3 px-3">Model Architecture</th>
                <th className="py-3 px-3">Primary Metric</th>
                <th className="py-3 px-3">Test Score</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Backend Service</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr className="bg-emerald-50/30">
                <td className="py-3.5 px-3 font-semibold text-stone-900">Module 1: Risk Feasibility</td>
                <td className="py-3.5 px-3 font-medium">Decision Tree Classifier</td>
                <td className="py-3.5 px-3 text-stone-500">F1-Score / Accuracy</td>
                <td className="py-3.5 px-3 font-mono font-bold text-emerald-800">97.4% F1 (97.8% Acc)</td>
                <td className="py-3.5 px-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-700 text-white font-semibold">
                    Live
                  </span>
                </td>
                <td className="py-3.5 px-3 font-mono text-[11px] text-stone-500">POST /predict (Render)</td>
              </tr>
              <tr className="bg-amber-50/30">
                <td className="py-3.5 px-3 font-semibold text-stone-900">Module 2: Yield Regressor</td>
                <td className="py-3.5 px-3 font-medium">Random Forest Regressor</td>
                <td className="py-3.5 px-3 text-stone-500">Coefficient of Determination R²</td>
                <td className="py-3.5 px-3 font-mono font-bold text-amber-800">0.93 R² (RMSE 0.28 t/ha)</td>
                <td className="py-3.5 px-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-700 text-white font-semibold">
                    Live
                  </span>
                </td>
                <td className="py-3.5 px-3 font-mono text-[11px] text-stone-500">POST /predict (Render)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-8 rounded-3xl bg-stone-100 border border-stone-200 text-center space-y-4">
        <h3 className="text-xl font-bold text-stone-900">
          {language === 'te' ? 'తెలంగాణ వ్యవసాయ నిర్ణయాల్లో విశ్వసనీయత' : 'Experience Model Decisions First-Hand'}
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
          {language === 'te'
            ? 'మీ పొలం కోసం పంట రిస్క్ లేదా దిగుబడిని వెంటనే అంచనా వేయండి.'
            : 'Select any district and crop combination to see stress attribution and yield projections.'}
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setActiveTab('classify');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            {t.navClassifier}
          </button>
          <button
            onClick={() => {
              setActiveTab('yield');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            {t.navYield}
          </button>
        </div>
      </div>
    </div>
  );
};
