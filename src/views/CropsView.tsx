import React, { useState, useMemo } from 'react';
import { TELANGANA_CROPS } from '../data/telanganaAgriData';
import { Language, ActiveTab, CropProfile } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  Wheat,
  Search,
  Calendar,
  Droplets,
  Coins,
  ShieldCheck,
  TrendingUp,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

interface CropsViewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  onTransferToClassifier: (district: string, crop: string, season: string, area: number) => void;
  onTransferToYield: (district: string, crop: string, season: string, area: number) => void;
}

export const CropsView: React.FC<CropsViewProps> = ({
  language,
  setActiveTab,
  onTransferToClassifier,
  onTransferToYield
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSeasonTab, setActiveSeasonTab] = useState<'kharif' | 'rabi' | 'calendar'>('kharif');

  const t = TRANSLATIONS[language];

  const filteredCrops = useMemo(() => {
    return TELANGANA_CROPS.filter((c) => {
      const matchCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchSeason = selectedSeason === 'All' || c.seasons.includes(selectedSeason as any);
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.nameTe.includes(searchQuery) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.soilSuitability.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSeason && matchSearch;
    });
  }, [selectedCategory, selectedSeason, searchQuery]);

  const handleAssessCrop = (cropName: string, defaultSeason: string) => {
    onTransferToClassifier('Karimnagar', cropName, defaultSeason, 2.5);
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePredictCropYield = (cropName: string, defaultSeason: string) => {
    onTransferToYield('Karimnagar', cropName, defaultSeason, 2.5);
    setActiveTab('yield');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
              <Wheat className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'తెలంగాణ 40 పంట రకాలు & సీజన్లు' : 'Telangana 40 Crops & Agricultural Seasons'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {t.navCrops}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {language === 'te'
                ? 'తెలంగాణలో ప్రధానంగా సాగుచేసే పంటలు, వాటి వానాకాలం (ఖరీఫ్) మరియు యాసంగి (రబీ) సీజన్లు, నీటి అవసరాలు, కనీస మద్దతు ధర (MSP) మరియు నేల రకాలు.'
                : 'Comprehensive guide to Telangana crops, sowing calendars (Kharif/Rabi), water intensity profiles, historical baseline productivity, and Minimum Support Prices (MSP).'}
            </p>
          </div>
        </div>
      </div>

      {/* 1. Telangana Seasonal Calendar Overview */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-900 to-stone-900 text-white shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {language === 'te' ? 'వ్యవసాయ క్యాలెండర్' : 'Telangana Agronomic Cycles'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {language === 'te' ? 'వానాకాలం (ఖరీఫ్) & యాసంగి (రబీ) క్యాలెండర్' : 'Kharif (Monsoon) vs. Rabi (Post-Monsoon) Calendar'}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              {language === 'te'
                ? 'తెలంగాణ వాతావరణ పరిస్థితులకు అనుగుణంగా పంట విత్తే సమయం మరియు కోత సమయాల విశ్లేషణ.'
                : 'Telangana agriculture follows two principal cultivation cycles governed by the Southwest monsoon and winter reservoir storage.'}
            </p>
          </div>

          <div className="flex rounded-xl bg-white/10 p-1 border border-white/20 text-xs font-semibold">
            <button
              onClick={() => setActiveSeasonTab('kharif')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSeasonTab === 'kharif' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-200 hover:text-white'
              }`}
            >
              {language === 'te' ? 'వానాకాలం (ఖరీఫ్)' : 'Kharif (వానాకాలం)'}
            </button>
            <button
              onClick={() => setActiveSeasonTab('rabi')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSeasonTab === 'rabi' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-200 hover:text-white'
              }`}
            >
              {language === 'te' ? 'యాసంగి (రబీ)' : 'Rabi (యాసంగి)'}
            </button>
            <button
              onClick={() => setActiveSeasonTab('calendar')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeSeasonTab === 'calendar' ? 'bg-amber-400 text-stone-950 font-bold' : 'text-stone-200 hover:text-white'
              }`}
            >
              {language === 'te' ? 'సంవత్సర చక్రం' : 'Full Year Cycle'}
            </button>
          </div>
        </div>

        {/* Season details card */}
        <div className="pt-6">
          {activeSeasonTab === 'kharif' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">{language === 'te' ? 'సమయం & కాలం' : 'Timing & Monsoon'}</span>
                <h4 className="text-lg font-bold text-white">{language === 'te' ? 'జూన్ – నవంబర్' : 'June to November'}</h4>
                <p className="text-xs text-stone-300">
                  {language === 'te'
                    ? 'నైరుతి రుతుపవనాల వర్షాలపై ఆధారపడుతుంది. వర్షపాతం 750-1100 మి.మీ సాధారణం.'
                    : 'Governed by the Southwest Monsoon. Telangana receives ~80% of its annual precipitation during this season.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">{language === 'te' ? 'ప్రధాన పంటలు' : 'Dominant Crops'}</span>
                <h4 className="text-lg font-bold text-white">{language === 'te' ? 'వరి, ప్రత్తి, మొక్కజొన్న, కంది' : 'Paddy, Cotton, Maize, Red Gram'}</h4>
                <p className="text-xs text-stone-300">
                  {language === 'te'
                    ? 'రాష్ట్ర సాగు విస్తీర్ణంలో 65% పైగా ఖరీఫ్ సీజన్‌లోనే సాగవుతుంది.'
                    : 'Represents the primary acreage season with high moisture requirements and extensive rainfed coverage.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">{language === 'te' ? 'ముఖ్యమైన సూచన' : 'Agronomic Risk Advisory'}</span>
                <h4 className="text-lg font-bold text-white">{language === 'te' ? 'వర్షపాత విరామ పర్యవేక్షణ' : 'Dry Spell Monitoring'}</h4>
                <p className="text-xs text-stone-300">
                  {language === 'te'
                    ? 'జూలై-ఆగస్టు మధ్య వర్షాభావ పరిస్థితులపై అప్రమత్తంగా ఉండాలి. పంట రక్షణకు సహాయక తడులు అవసరం.'
                    : 'Mid-season dry spells in July/August pose the largest stress factor for red soil cotton and groundnut belts.'}
                </p>
              </div>
            </div>
          )}

          {activeSeasonTab === 'rabi' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">{language === 'te' ? 'సమయం & కాలం' : 'Timing & Water Source'}</span>
                <h4 className="text-lg font-bold text-white">{language === 'te' ? 'అక్టోబర్ – మార్చి' : 'October to March'}</h4>
                <p className="text-xs text-stone-300">
                  {language === 'te'
                    ? 'బోరుబావులు, చెరువులు మరియు కాలువల ద్వారా సాగు. చల్లని వాతావరణం అనుకూలం.'
                    : 'Post-monsoon winter crop dependent entirely on groundwater, minor tanks (Mission Kakatiya), and canal command.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">{language === 'te' ? 'ప్రధాన పంటలు' : 'Dominant Crops'}</span>
                <h4 className="text-lg font-bold text-white">{language === 'te' ? 'వరి (యాసంగి), వేరుశనగ, శనగ, నువ్వులు' : 'Paddy, Groundnut, Bengal Gram, Sesame'}</h4>
                <p className="text-xs text-stone-300">
                  {language === 'te'
                    ? 'చీడపీడల బెడద తక్కువగా ఉండటం వల్ల దిగుబడి స్థిరంగా ఉంటుంది.'
                    : 'Lower pest infestation and controlled tube-well water application result in higher per-hectare productivity.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <span className="text-xs text-amber-300 font-bold uppercase">{language === 'te' ? 'ముఖ్యమైన సూచన' : 'Agronomic Risk Advisory'}</span>
                <h4 className="text-lg font-bold text-white">{language === 'te' ? 'భూగర్భ జలాల సామర్థ్యం' : 'Groundwater Table Check'}</h4>
                <p className="text-xs text-stone-300">
                  {language === 'te'
                    ? 'జనవరి తర్వాత బోరుబావుల్లో నీటి మట్టం తగ్గకుండా నీటిని పొదుపుగా వాడాలి.'
                    : 'Verify sub-surface groundwater table before committing to water-intensive second paddy in upland districts.'}
                </p>
              </div>
            </div>
          )}

          {activeSeasonTab === 'calendar' && (
            <div className="p-4 rounded-2xl bg-white/10 border border-white/10">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-black/20">
                  <span className="text-amber-300 font-bold">June – July</span>
                  <div className="text-white font-semibold mt-1">Kharif Sowing</div>
                  <div className="text-[11px] text-stone-300">Cotton, Paddy, Maize</div>
                </div>
                <div className="p-3 rounded-xl bg-black/20">
                  <span className="text-amber-300 font-bold">Aug – Sept</span>
                  <div className="text-white font-semibold mt-1">Vegetative Growth</div>
                  <div className="text-[11px] text-stone-300">Weeding & Fertilization</div>
                </div>
                <div className="p-3 rounded-xl bg-black/20">
                  <span className="text-amber-300 font-bold">Oct – Nov</span>
                  <div className="text-white font-semibold mt-1">Kharif Harvest</div>
                  <div className="text-[11px] text-stone-300">Cotton Pickings, Paddy</div>
                </div>
                <div className="p-3 rounded-xl bg-black/20">
                  <span className="text-amber-300 font-bold">Nov – Dec</span>
                  <div className="text-white font-semibold mt-1">Rabi Sowing</div>
                  <div className="text-[11px] text-stone-300">Groundnut, Gram, Rice</div>
                </div>
                <div className="p-3 rounded-xl bg-black/20">
                  <span className="text-amber-300 font-bold">Jan – Feb</span>
                  <div className="text-white font-semibold mt-1">Winter Maturation</div>
                  <div className="text-[11px] text-stone-300">Irrigation Scheduling</div>
                </div>
                <div className="p-3 rounded-xl bg-black/20">
                  <span className="text-amber-300 font-bold">March – April</span>
                  <div className="text-white font-semibold mt-1">Rabi Harvest</div>
                  <div className="text-[11px] text-stone-300">Market Procurement</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Crop Filter & Search Controls */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-100 border border-stone-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {language === 'te' ? 'తెలంగాణ పంటల కేటలాగ్' : 'Telangana Crop Catalog & Agronomic Specifications'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'te'
                ? `${filteredCrops.length} పంటలు కనుగొనబడ్డాయి`
                : `Showing ${filteredCrops.length} crops calibrated in CropGuard ML models`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'te' ? 'పంట పేరు శోధించండి...' : 'Search crop name, soil...'}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 w-44 sm:w-52"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold focus:outline-hidden"
            >
              <option value="All">{language === 'te' ? 'అన్ని కేటగిరీలు' : 'All Categories'}</option>
              <option value="Cereals">{language === 'te' ? 'ధాన్యాలు (Cereals)' : 'Cereals'}</option>
              <option value="Commercial">{language === 'te' ? 'వాణిజ్య పంటలు (Commercial)' : 'Commercial'}</option>
              <option value="Pulses">{language === 'te' ? 'పప్పుధాన్యాలు (Pulses)' : 'Pulses'}</option>
              <option value="Oilseeds">{language === 'te' ? 'నూనెగింజలు (Oilseeds)' : 'Oilseeds'}</option>
              <option value="Horticulture">{language === 'te' ? 'ఉద్యానవన పంటలు (Horticulture)' : 'Horticulture'}</option>
            </select>

            {/* Season Filter */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold focus:outline-hidden"
            >
              <option value="All">{language === 'te' ? 'అన్ని సీజన్లు' : 'All Seasons'}</option>
              <option value="Kharif">Kharif (వానాకాలం)</option>
              <option value="Rabi">Rabi (యాసంగి)</option>
              <option value="Whole Year">Whole Year</option>
            </select>
          </div>
        </div>

        {/* Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-stone-900">{c.name}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                        {c.nameTe}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-stone-500 mt-0.5 block">
                      {c.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      c.riskTendency === 'Low Risk'
                        ? 'bg-emerald-100 text-emerald-800'
                        : c.riskTendency === 'Moderate Risk'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {c.riskTendency}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-2.5 leading-relaxed line-clamp-2">
                  {c.description}
                </p>

                {/* Agronomic details */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-stone-100 text-xs">
                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'సగటు దిగుబడి' : 'Avg Productivity'}
                    </span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {c.avgYield} t/ha
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      ({c.typicalYieldRange})
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'నీటి అవసరం' : 'Water Need'}
                    </span>
                    <span
                      className={`font-semibold text-xs inline-block px-1.5 py-0.5 rounded ${
                        c.waterNeed === 'High'
                          ? 'bg-sky-100 text-sky-800'
                          : c.waterNeed === 'Medium'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-stone-200 text-stone-800'
                      }`}
                    >
                      {c.waterNeed}
                    </span>
                  </div>

                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'కనీస మద్దతు ధర' : 'MSP Reference'}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">
                      ₹{c.mspPerQuintal.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400 block mt-0.5">per quintal</span>
                  </div>

                  <div className="p-2 rounded-xl bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'అనుకూల సీజన్లు' : 'Seasons'}
                    </span>
                    <span className="font-semibold text-stone-800 text-xs truncate block">
                      {c.seasons.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-stone-500">
                  <strong className="text-stone-700">{language === 'te' ? 'నేల రకాలు: ' : 'Soils: '}</strong>
                  {c.soilSuitability}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => handleAssessCrop(c.name, c.seasons[0] || 'Kharif')}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'రిస్క్ అంచనా' : 'Check Risk'}</span>
                </button>
                <button
                  onClick={() => handlePredictCropYield(c.name, c.seasons[0] || 'Kharif')}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'దిగుబడి అంచనా' : 'Predict Yield'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
