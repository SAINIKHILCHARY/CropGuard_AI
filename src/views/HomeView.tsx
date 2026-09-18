import React from 'react';
import {
  ShieldAlert,
  TrendingUp,
  Sprout,
  ArrowRight,
  Award,
  MapPin,
  Wheat,
  Droplets,
  CloudRain,
  Database,
  Calendar,
  CheckCircle2,
  HelpCircle,
  Layers,
  Sparkles,
  Users
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TelanganaMap } from '../components/TelanganaMap';
import { AgriStatsDashboard } from '../components/AgriStatsDashboard';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  serverOnline: boolean;
  language: Language;
  onTransferToClassifier: (district: string, crop: string, season: string, area: number) => void;
  onTransferToYield: (district: string, crop: string, season: string, area: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setActiveTab,
  serverOnline,
  language,
  onTransferToClassifier,
  onTransferToYield
}) => {
  const t = TRANSLATIONS[language];

  const handleLaunchRisk = (district: string = 'Karimnagar') => {
    onTransferToClassifier(district, 'Rice', 'Kharif', 2.5);
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchYield = (district: string = 'Nalgonda') => {
    onTransferToYield(district, 'Rice', 'Kharif', 2.5);
    setActiveTab('yield');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto">
      {/* 1. Agricultural Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-900 to-stone-900 text-white shadow-xl border border-emerald-700/50 p-6 sm:p-10 lg:p-12">
        {/* Subtle decorative background curves */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline & State Emblem pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-xs">
                <Sprout className="w-3.5 h-3.5 text-stone-950" />
                <span>{t.tagline}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>10,708 Telangana Agricultural Records (2014–2023)</span>
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {t.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
              {t.heroSubtitle}
            </p>

            {/* Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-hero-launch-classifier"
                onClick={() => handleLaunchRisk()}
                className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-sm flex items-center gap-2.5 shadow-lg shadow-amber-950/20 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t.ctaAssessRisk}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-launch-yield"
                onClick={() => handleLaunchYield()}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-950 font-black text-sm flex items-center gap-2.5 shadow-lg transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>{t.ctaPredictYield}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-hero-explore-map"
                onClick={() => {
                  setActiveTab('insights');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-2xl bg-emerald-950/70 hover:bg-emerald-950 text-emerald-100 font-bold text-sm border border-emerald-500/40 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>{t.ctaExploreMap}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Agriculture Photo & Live Context Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring & soft golden-green glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-amber-400/40 via-emerald-400/30 to-emerald-600/40 blur-md opacity-75" />

              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-emerald-950/60 group">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80"
                  alt="Lush green agriculture and crop fields in Telangana"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 lg:h-88 object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Vignette / contrast gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                {/* Top overlay badge: Farmland Status */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{language === 'te' ? 'తెలంగాణ వ్యవసాయ క్షేత్రం' : 'Telangana Farmland'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400 text-stone-950 text-xs font-bold shadow-md">
                    <Wheat className="w-3.5 h-3.5" />
                    <span>Kharif & Rabi</span>
                  </span>
                </div>

                {/* Bottom overlay: Basins & Normal precipitation highlight */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 p-3 rounded-xl bg-stone-950/80 backdrop-blur-md border border-white/15 text-xs text-stone-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">
                      <Droplets className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">
                        {language === 'te' ? 'గోదావరి & కృష్ణా బేసిన్లు' : 'Godavari & Krishna Basins'}
                      </div>
                      <div className="text-[11px] text-emerald-200/80">
                        {language === 'te' ? '32 వ్యవసాయ జిల్లాల పర్యవేక్షణ' : '32 Districts Monitored'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/25 text-emerald-300 font-mono text-[11px] font-semibold border border-emerald-500/30">
                      948 mm Normal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics Strip */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">10,708</div>
            <div className="text-xs text-emerald-200">{language === 'te' ? 'ప్రామాణిక రికార్డులు' : 'Validated Records'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">32</div>
            <div className="text-xs text-emerald-200">{language === 'te' ? 'తెలంగాణ జిల్లాలు' : 'Districts Covered'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">40</div>
            <div className="text-xs text-emerald-200">{language === 'te' ? 'పంట రకాలు' : 'Crops Calibrated'}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">9 Years</div>
            <div className="text-xs text-emerald-200">2014–15 to 2022–23</div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Telangana District Map Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'తెలంగాణ జిల్లాల మ్యాప్' : 'Geographic Map Explorer'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              {language === 'te' ? 'మీ జిల్లా వ్యవసాయ ప్రొఫైల్ పరిశీలించండి' : 'Explore Your District’s Agricultural Profile'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {language === 'te'
                ? 'తెలంగాణలోని 32 జిల్లాల్లో ఏ జిల్లాపైనైనా క్లిక్ చేసి దిగుబడి, వర్షపాతం మరియు సాగునీటి వివరాలను చూడండి.'
                : 'Click on any of Telangana’s 32 districts on the interactive spatial map below to inspect agronomic data and launch predictions.'}
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('insights');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{language === 'te' ? 'పూర్తి 32 జిల్లాల పట్టిక చూడండి' : 'View Full 32 District Catalog'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <TelanganaMap
          language={language}
          onSelectDistrictForRisk={handleLaunchRisk}
          onSelectDistrictForYield={handleLaunchYield}
        />
      </section>

      {/* 3. The Dual-Model ML Architecture Showcase */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {language === 'te' ? 'రెండు ప్రత్యేక ML మోడల్స్' : 'Dual-Engine Machine Learning Architecture'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            {language === 'te' ? 'పంట వేసే ముందే నిర్ణయం తీసుకునే శక్తి' : 'Actionable Intelligence Before Sowing'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {language === 'te'
              ? 'తెలంగాణ వ్యవసాయ అవసరాల కోసం రూపొందించిన రెండు ప్రత్యేక మెషిన్ లెర్నింగ్ ఇంజిన్లు.'
              : 'Two specialized modules: One classifies environmental risk and recommends alternatives; the other forecasts yield and revenue.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Risk Classifier */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-emerald-600/60 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  Live FastAPI
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Module 1
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">
                  {t.navClassifier}
                </h3>
                <p className="text-xs font-semibold text-stone-500">
                  Multi-Factor Decision Tree Classifier
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'te'
                  ? 'వర్షపాతం, చారిత్రక దిగుబడి అస్థిరత మరియు సాగునీటి లభ్యత ఆధారంగా పంట రిస్క్ (Low, Moderate, High) ను వర్గీకరిస్తుంది. అధిక రిస్క్ ఉంటే తక్కువ రిస్క్ ఉన్న ప్రత్యామ్నాయ పంటను సిఫార్సు చేస్తుంది.'
                  : 'Evaluates environmental & climate volatility before seed investment. Identifies probability of crop failure and suggests resilient alternative staples.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'te' ? 'రిస్క్ మీటర్ & కచ్చితమైన సంభావ్యత %' : 'Risk gauge with probability score'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'te' ? '4 కీలక ఒత్తిడి కారకాల విశ్లేషణ' : 'Decomposition into 4 environmental stress factors'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'te' ? 'ప్రత్యామ్నాయ పంట సిఫార్సు స్కోర్' : 'Alternative crop recommendation with score'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleLaunchRisk()}
              className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.ctaAssessRisk}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Yield Predictor */}
          <div className="p-7 sm:p-8 rounded-3xl bg-white border-2 border-amber-500/60 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-800">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  Live FastAPI
                </span>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Module 2
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-0.5">
                  {t.navYield}
                </h3>
                <p className="text-xs font-semibold text-stone-500">
                  Regression Yield Estimation Engine
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'te'
                  ? 'మీ జిల్లా మరియు ఎంచుకున్న విస్తీర్ణంలో హెక్టారుకు సగటు దిగుబడిని (tonnes/ha) మరియు మొత్తం ఉత్పత్తిని (tonnes & quintals) అంచనా వేస్తుంది. ప్రస్తుత కనీస మద్దతు ధరతో మార్కెట్ విలువను లెక్కిస్తుంది.'
                  : 'Quantitative yield estimation predicting productivity in tonnes/ha and total harvest volume across farmer plot acreage, paired with MSP market revenue projections.'}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{language === 'te' ? 'హెక్టారుకు దిగుబడి మరియు మొత్తం టన్నులు' : 'Per-hectare yield & total tonnage calculation'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{language === 'te' ? 'క్వింటాళ్ల పరిమాణంలో ఉత్పత్తి మార్పిడి' : 'Automatic Quintal conversion for Indian mandi sales'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{language === 'te' ? 'ప్రభుత్వ MSP ప్రకారం మార్కెట్ ఆదాయ అంచనా' : 'Estimated gross market revenue based on MSP'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleLaunchYield()}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.ctaPredictYield}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Agricultural Analytics Dashboard Section */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'గణాంకాలు & విశ్లేషణ' : 'State Agricultural Analytics'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            {language === 'te' ? 'తెలంగాణ వ్యవసాయ గణాంకాలు' : 'Telangana Agricultural Trends & Benchmarks'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            {language === 'te'
              ? '9 సంవత్సరాల కాలంలో (2014-2023) సేకరించిన 10,708 రికార్డుల ఆధారంగా దిగుబడి, ఉత్పత్తి మరియు వర్షపాత ధోరణులు.'
              : 'Interactive visualization of 9 continuous agricultural seasons across 32 districts.'}
          </p>
        </div>

        <AgriStatsDashboard language={language} />
      </section>

      {/* 5. Why Pre-Cultivation Intelligence Matters for Telangana */}
      <section className="p-8 sm:p-10 rounded-3xl bg-stone-100 border border-stone-200 space-y-6">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {language === 'te' ? 'రైతులకు ప్రాముఖ్యత' : 'Agronomic Importance'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            {language === 'te' ? 'పంట వేసే ముందే AI ఎందుకు అవసరం?' : 'Why Pre-Cultivation Intelligence Matters for Telangana'}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            {language === 'te'
              ? 'తెలంగాణలో చాలా ప్రాంతాల్లో భూగర్భ జలాల హెచ్చుతగ్గులు మరియు రుతుపవనాల అనిశ్చితి రైతులకు సవాలుగా మారుతున్నాయి. విత్తనాలు, ఎరువులు మరియు పురుగుమందుల కోసం వేల రూపాయలు ఖర్చు చేసే ముందే సరైన నిర్ణయం తీసుకోవడం ద్వారా నష్టాలను నివారించవచ్చు.'
              : 'In Telangana’s semi-arid plateau, over 60% of crop losses occur due to ill-timed sowing during erratic monsoon onset or mismatched water demand against receding borewell levels. CropGuard AI empowers farmers with pre-sowing clarity.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CloudRain className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900">
              {language === 'te' ? 'వర్షాభావ విరామాల నివారణ' : 'Monsoon Dry Spells'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'te'
                ? 'జూలై-ఆగస్టు మధ్య వర్షం రాకముందే తేమ నిలిపివుంచే ప్రత్యామ్నాయ పంటలను ఎంచుకోవచ్చు.'
                : 'Forecast vulnerability to 15–20 day precipitation gaps in southern rainfed districts like Mahabubnagar.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900">
              {language === 'te' ? 'భూగర్భ జలాల పరిరక్షణ' : 'Groundwater Sustainability'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'te'
                ? 'బోరుబావుల నీటి లభ్యతకు సరిపోయే పంటలను వేయడం ద్వారా పంట ఎండిపోకుండా చూసుకోవచ్చు.'
                : 'Match tube-well recharge limits against crop water appetite, avoiding dried-out second paddy crops.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Wheat className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900">
              {language === 'te' ? 'పంట మార్పిడి సిఫార్సులు' : 'Crop Diversification'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'te'
                ? 'ప్రత్తి లేదా వరి అధిక రిస్క్ అని తేలితే మొక్కజొన్న, కంది లేదా వేరుశనగ వైపు మొగ్గు చూపవచ్చు.'
                : 'Seamlessly identify high-scoring low-risk staples like Maize, Jowar, or Green Gram tailored to your district.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-stone-900">
              {language === 'te' ? 'రైతు అప్పుల భారం తగ్గింపు' : 'Debt Risk Mitigation'}
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {language === 'te'
                ? 'ముందస్తు అంచనా ద్వారా సాగు ఖర్చులను ఆదా చేసి రైతు కుటుంబాలకు ఆర్థిక భరోసా కల్పిస్తుంది.'
                : 'Prevent capital misallocation into high-failure commercial crops, protecting farm family savings.'}
            </p>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-800 to-green-950 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            {t.builtForTelangana}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'te' ? 'మీ వ్యవసాయ నిర్ణయాన్ని ఇప్పుడే సురక్షితం చేసుకోండి' : 'Secure Your Agricultural Decision Today'}
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            {language === 'te'
              ? 'ఖరీఫ్ లేదా రబీ సీజన్ కోసం మీ జిల్లా మరియు పంట వివరాలను ఎంచుకుని ఉచితంగా రిస్క్ మరియు దిగుబడి అంచనాలను పొందండి.'
              : 'Test your planned crop across 32 Telangana districts. Assess risk, explore stress factors, and project harvest volume.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => handleLaunchRisk()}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{t.ctaAssessRisk}</span>
          </button>
          <button
            onClick={() => handleLaunchYield()}
            className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-amber-300" />
            <span>{t.ctaPredictYield}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
