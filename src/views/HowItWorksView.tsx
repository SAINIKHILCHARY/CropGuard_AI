import React, { useState } from 'react';
import { Language, ActiveTab } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Workflow,
  ShieldAlert,
  TrendingUp,
  Database,
  Cpu,
  CheckCircle2,
  HelpCircle,
  Award,
  ChevronDown,
  ArrowRight,
  Droplets,
  CloudRain,
  MapPin,
  Sparkles
} from 'lucide-react';

interface HowItWorksViewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ language, setActiveTab }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const t = TRANSLATIONS[language];

  const steps = [
    {
      number: '01',
      title: language === 'te' ? 'వ్యవసాయ పారామితుల ఎంపిక' : 'Specify Agro-Climatic Coordinates',
      desc: language === 'te'
        ? 'తెలంగాణలోని మీ జిల్లా, సాగు చేయాలనుకుంటున్న పంట, సీజన్ (వానాకాలం/యాసంగి) మరియు భూమి విస్తీర్ణం (హెక్టార్లు/ఎకరాలు) నమోదు చేయండి.'
        : 'Select your administrative district from 32 Telangana regions, target crop from 40 verified species, agricultural season (Kharif/Rabi), and farm area.',
      icon: <MapPin className="w-5 h-5 text-emerald-700" />
    },
    {
      number: '02',
      title: language === 'te' ? 'రెండు ML మోడల్స్ ప్రాసెసింగ్' : 'Dual-Model ML Pipeline Evaluation',
      desc: language === 'te'
        ? 'మీ ఇన్పుట్స్ ఆధారంగా మా డెసిషన్ ట్రీ క్లాసిఫైయర్ మరియు రాండమ్ ఫారెస్ట్ రిగ్రెసర్ 10,708 చారిత్రక రికార్డులతో సరిపోల్చి అంచనా వేస్తాయి.'
        : 'Inputs are dispatched to high-performance FastAPI microservices where multi-class decision trees evaluate risk and regression forests forecast expected yield.',
      icon: <Cpu className="w-5 h-5 text-amber-700" />
    },
    {
      number: '03',
      title: language === 'te' ? 'ప్రధాన ఒత్తిడి కారకాల గుర్తింపు' : 'Multi-Factor Stress Attribution',
      desc: language === 'te'
        ? 'వర్షపాత స్థితి, చారిత్రక అస్థిరత, సాగునీటి విస్తీర్ణం మరియు దిగుబడి పోకడల ఆధారంగా రిస్క్ యొక్క మూల కారణాలు విశ్లేషించబడతాయి.'
        : 'The model decomposes risk into 4 core agronomic factors: rainfall sufficiency, historical yield volatility, sub-surface irrigation coverage, and long-term yield momentum.',
      icon: <CloudRain className="w-5 h-5 text-sky-700" />
    },
    {
      number: '04',
      title: language === 'te' ? 'తక్కువ రిస్క్ ప్రత్యామ్నాయ పంట సిఫార్సు' : 'Resilient Alternative Crop Recommendation',
      desc: language === 'te'
        ? 'ఎంచుకున్న పంట అధిక రిస్క్ కలిగి ఉంటే, అదే నేల మరియు సీజన్‌లో మెరుగైన ఫలితాన్నిచ్చే ప్రత్యామ్నాయ పంటను మోడల్ సిఫార్సు చేస్తుంది.'
        : 'When high climatic or water stress is identified, the recommendation engine calculates optimal crop alternatives with verified risk reduction scores.',
      icon: <Sparkles className="w-5 h-5 text-emerald-700" />
    },
    {
      number: '05',
      title: language === 'te' ? 'దిగుబడి మరియు మార్కెట్ ఆదాయ అంచనా' : 'Yield Forecasting & Market Projections',
      desc: language === 'te'
        ? 'మొత్తం దిగుబడిని టన్నులు మరియు క్వింటాళ్లలో లెక్కించి, ప్రస్తుత ప్రభుత్వ కనీస మద్దతు ధర (MSP) ప్రకారం మార్కెట్ ఆదాయాన్ని అంచనా వేస్తుంది.'
        : 'The yield predictor outputs per-hectare productivity and aggregate production volume, enabling farmers to project MSP revenue before investing in seed & fertilizer.',
      icon: <TrendingUp className="w-5 h-5 text-amber-700" />
    }
  ];

  const faqs = [
    {
      q: language === 'te'
        ? 'CropGuard AI అంచనాలు ఎంతవరకు నమ్మదగినవి?'
        : 'How reliable are CropGuard AI predictions?',
      a: language === 'te'
        ? 'CropGuard AI తెలంగాణలో 2014 నుండి 2023 వరకు 9 సంవత్సరాల కాలంలో సేకరించిన 10,708 వ్యవసాయ రికార్డులపై శిక్షణ పొందింది. మా క్లాసిఫికేషన్ మోడల్ 97.4% F1-స్కోర్ మరియు దిగుబడి మోడల్ 0.93 R² టెస్ట్ స్కోర్ సాధించాయి.'
        : 'CropGuard AI is trained on 10,708 validated farm records spanning 2014–15 to 2022–23 across all 32 Telangana districts. The classifier achieves a 97.4% F1-score and the yield regressor achieves an R² score of 0.93 against ground-truth harvest records.'
    },
    {
      q: language === 'te'
        ? 'నేను వేయాలనుకుంటున్న పంట అధిక రిస్క్ అని వస్తే నేనేం చేయాలి?'
        : 'What should I do if my planned crop shows High Risk?',
      a: language === 'te'
        ? 'అధిక రిస్క్ ఫలితం వచ్చినప్పుడు, సిస్టమ్ కింద సూచించిన కారణాలను (ఉదా: వర్షపాతం తక్కువ లేదా నీటి ఎద్దడి) గమనించండి. అలాగే మోడల్ సూచించిన ప్రత్యామ్నాయ పంటను లేదా అదనపు రక్షణ పద్ధతులను (డ్రిప్ ఇరిగేషన్, క్రాప్ ఇన్సూరెన్స్) పరిశీలించండి.'
        : 'Review the 4 contributing stress factors shown in the results. If rainfall or irrigation volatility is the driver, evaluate the model-recommended alternative crop (e.g., switching from water-intensive Paddy to Maize or Bajra) or secure micro-irrigation backup.'
    },
    {
      q: language === 'te'
        ? 'CropGuard AI ప్రభుత్వ అధికారిక సంస్థకు చెందినదా?'
        : 'Is CropGuard AI an official government portal?',
      a: language === 'te'
        ? 'లేదు. CropGuard AI అనేది స్వతంత్ర పరిశోధన ఆధారిత AI సాంకేతిక వేదిక. ఇది రైతులకు మరియు అధికారులకు నిర్ణయ సహాయక వేదికగా (Decision Support) మాత్రమే పనిచేస్తుంది. పంట వేసేముందు స్థానిక వ్యవసాయ విస్తరణాధికారులను (AEO) కూడా సంప్రదించవచ్చు.'
        : 'No. CropGuard AI is an independent academic and technological agricultural decision-support platform. It assists farmers and agronomists with pre-cultivation intelligence but does not issue government directives.'
    },
    {
      q: language === 'te'
        ? 'తెలంగాణలోని ఏయే పంటలు ఈ ప్లాట్‌ఫారమ్‌లో ఉన్నాయి?'
        : 'Which crops and seasons are supported?',
      a: language === 'te'
        ? 'వరి, ప్రత్తి, మొక్కజొన్న, కంది, వేరుశనగ, మిర్చి, సోయాబీన్, చెరకు, జొన్నలతో సహా మొత్తం 40 తెలంగాణ పంటలు, మరియు వానాకాలం (ఖరీఫ్), యాసంగి (రబీ) సీజన్లు పూర్తిగా సపోర్ట్ చేయబడతాయి.'
        : 'All 40 primary crops grown in Telangana—including Paddy, Cotton, Maize, Red Gram, Groundnut, Chilli, Soybean, Sugarcane, and Jowar—are fully supported across Kharif, Rabi, and Whole Year cultivation.'
    }
  ];

  return (
    <div className="space-y-14 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <Workflow className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'పనిచేసే విధానం & శాస్త్రీయ ఆధారం' : 'System Architecture & User Guide'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {t.navHowItWorks}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
          {language === 'te'
            ? 'తెలంగాణ రైతులకు పంట వేయకముందే సరైన నిర్ణయాలు తీసుకోవడంలో CropGuard AI ఎలా సహాయపడుతుంది? పూర్తి 5 దశల ప్రక్రియ మరియు మోడల్ సాంకేతిక వివరాలు.'
            : 'How CropGuard AI transforms historical agronomic telemetry, monsoon dynamics, and soil characteristics into actionable pre-sowing decisions for Telangana.'}
        </p>
      </div>

      {/* 5-Step Visual Walkthrough */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {language === 'te' ? 'దశలవారీ మార్గదర్శి' : 'Five-Stage Workflow'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-1">
            {language === 'te' ? 'ఇన్‌పుట్ నుండి నిర్ణయం వరకు' : 'From Input to Confident Harvest'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => (
            <div
              key={s.number}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-2xl font-black text-stone-300 font-mono">
                    {s.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-stone-900">{s.title}</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-1.5 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{language === 'te' ? 'ఖచ్చితమైన ప్రాసెసింగ్' : 'Automated Validation'}</span>
              </div>
            </div>
          ))}

          {/* Quick CTA Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-800 to-green-950 text-white shadow-md flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {language === 'te' ? 'ఇప్పుడే ప్రయత్నించండి' : 'Try Live Inference'}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {language === 'te' ? 'మీ జిల్లా పంటను పరీక్షించండి' : 'Ready to assess your farm?'}
              </h3>
              <p className="text-xs text-stone-200 mt-2">
                {language === 'te'
                  ? 'రిస్క్ క్లాసిఫైయర్ మరియు ఈల్డ్ ప్రెడిక్టర్ రెండూ ప్రస్తుతం లైవ్ క్లౌడ్ ద్వారా అందుబాటులో ఉన్నాయి.'
                  : 'Execute instant pre-cultivation risk classification or yield forecast on Telangana FastAPI backend.'}
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveTab('classify');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.navClassifier}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTab('yield');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.navYield}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset & Accuracy Specs Banner */}
      <section className="p-8 rounded-3xl bg-stone-100 border border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'ప్రామాణిక డేటా ఆధారాలు' : 'Verified Dataset Specifications'}</span>
            </div>
            <h3 className="text-2xl font-black text-stone-900">
              {language === 'te' ? '10,708 రికార్డుల శాస్త్రీయ శిక్షణ' : 'Empirical Ground Truth: 10,708 Records'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
              {language === 'te'
                ? 'తెలంగాణ 33 జిల్లాల (32 వ్యవసాయ జిల్లాలు) నుండి 2014-15 నుండి 2022-23 వరకు 9 సంవత్సరాల డేటా ఆధారంగా ఈ మోడల్ రూపొందించబడింది. వాతావరణం, నేల రకాలు, వర్షపాతం, కాలువ మరియు బోరుబావుల సాగునీటి పరిమాణాలను సమగ్రంగా పరిగణనలోకి తీసుకుంటుంది.'
                : 'CropGuard AI is built upon 9 continuous agricultural seasons in Telangana. It pairs localized precipitation matrices with micro-watershed irrigation indices, eliminating speculative estimates.'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <span className="text-xl font-black text-stone-900 font-mono">10,708</span>
                <span className="text-[10px] text-stone-500 block">Agri Records</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <span className="text-xl font-black text-stone-900 font-mono">32</span>
                <span className="text-[10px] text-stone-500 block">Districts</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <span className="text-xl font-black text-stone-900 font-mono">40</span>
                <span className="text-[10px] text-stone-500 block">Crops</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-stone-200 text-center">
                <span className="text-xl font-black text-emerald-700 font-mono">97.4%</span>
                <span className="text-[10px] text-stone-500 block">F1-Score</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
            <h4 className="text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
              {language === 'te' ? 'మోడల్ ఫీచర్ ప్రాముఖ్యత' : 'Agronomic Feature Attribution Matrix'}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Rainfall Deviation from Normal (mm)</span>
                  <span className="font-mono text-emerald-700 font-bold">34.2% weight</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="w-[34.2%] h-full bg-emerald-600 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Irrigation Coverage & Command Network</span>
                  <span className="font-mono text-emerald-700 font-bold">28.6% weight</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="w-[28.6%] h-full bg-emerald-600 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Historical Yield Variance & Instability</span>
                  <span className="font-mono text-amber-700 font-bold">22.4% weight</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="w-[22.4%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-medium mb-1">
                  <span>Seasonal Crop Acreage & Soil Index</span>
                  <span className="font-mono text-sky-700 font-bold">14.8% weight</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                  <div className="w-[14.8%] h-full bg-sky-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="space-y-4 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            {language === 'te' ? 'తరచుగా అడిగే ప్రశ్నలు' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-2xl font-black text-stone-900 mt-1">
            {language === 'te' ? 'రైతులు మరియు అధికారుల సందేహాలు' : 'Questions from Farmers & Agronomists'}
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-stone-200 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-stone-900 hover:text-emerald-800 transition-colors text-sm sm:text-base cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
