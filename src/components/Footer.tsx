import React from 'react';
import { Sprout, ShieldCheck, MapPin, Mail, Phone, Award, ExternalLink } from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  serverOnline: boolean;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, serverOnline, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-950">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-black text-white text-lg tracking-tight">CropGuard AI</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              {language === 'te'
                ? 'తెలంగాణ కోసం ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ఆధారిత వ్యవసాయ నిర్ణయ వేదిక. పంట వేసే ముందే రిస్క్ మరియు దిగుబడి అంచనా.'
                : 'AI-powered agricultural decision support for Telangana. Helping farming communities assess pre-cultivation risk and forecast crop yields.'}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>{t.builtForTelangana}</span>
            </div>
          </div>

          {/* Col 2: Platform Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              {language === 'te' ? 'ప్లాట్‌ఫారమ్' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('classify');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 text-stone-300 transition-colors cursor-pointer"
                >
                  {t.navClassifier}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('yield');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 text-stone-300 transition-colors cursor-pointer"
                >
                  {t.navYield}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('insights');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 text-stone-300 transition-colors cursor-pointer"
                >
                  {t.navInsights}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('crops');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 text-stone-300 transition-colors cursor-pointer"
                >
                  {t.navCrops}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('how-it-works');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-emerald-400 text-stone-300 transition-colors cursor-pointer"
                >
                  {t.navHowItWorks}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Dataset */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-3">
              {language === 'te' ? 'వనరులు & సమాచారం' : 'Resources & Data'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center justify-between">
                <span>{language === 'te' ? 'ధృవీకరించిన రికార్డులు:' : 'Dataset Size:'}</span>
                <span className="font-mono text-stone-200 font-bold">10,708 Records</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{language === 'te' ? 'కవర్ చేసిన జిల్లాలు:' : 'Districts:'}</span>
                <span className="font-mono text-stone-200 font-bold">32 Telangana</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{language === 'te' ? 'వ్యవసాయ కాలం:' : 'Temporal Span:'}</span>
                <span className="font-mono text-stone-200 font-bold">2014–15 to 2022–23</span>
              </li>
              <li className="flex items-center justify-between">
                <span>{language === 'te' ? 'మెషిన్ లెర్నింగ్ మోడల్స్:' : 'ML Pipelines:'}</span>
                <span className="font-mono text-emerald-400 font-bold">Classifier + Regressor</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => {
                    setActiveTab('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'te' ? 'మోడల్ ఆర్కిటెక్చర్ వివరాలు' : 'View ML Benchmark Specs'}</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200 mb-2">
              {language === 'te' ? 'సంప్రదించండి' : 'Contact & Advisory'}
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>Hyderabad, Telangana 500001, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-mono">support@cropguard.telangana.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Kisan Helpline: 1800-180-1551 (Toll-Free)</span>
              </div>
            </div>

            {/* Service Status */}
            <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs flex items-center justify-between">
              <span className="text-stone-400">FastAPI ML Cloud:</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {serverOnline ? 'Operational' : 'Standby'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="text-center sm:text-left">
            © 2026 CropGuard AI. {t.allRightsReserved}
          </p>
          <p className="text-center sm:text-right text-[11px] text-stone-500 max-w-xl">
            Disclaimer: Predictions are generated as AI-assisted decision support based on 10,708 historical Telangana agricultural records. Always cross-verify with local Agricultural Extension Officers before sowing.
          </p>
        </div>
      </div>
    </footer>
  );
};
