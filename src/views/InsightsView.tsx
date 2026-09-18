import React, { useState, useMemo } from 'react';
import { TELANGANA_DISTRICTS } from '../data/telanganaAgriData';
import { Language, ActiveTab } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { TelanganaMap } from '../components/TelanganaMap';
import { AgriStatsDashboard } from '../components/AgriStatsDashboard';
import {
  MapPin,
  Search,
  Filter,
  TrendingUp,
  Droplets,
  CloudRain,
  Wheat,
  Layers,
  ShieldCheck,
  ArrowRight,
  Info,
  ChevronDown
} from 'lucide-react';

interface InsightsViewProps {
  language: Language;
  setActiveTab: (tab: ActiveTab) => void;
  onTransferToClassifier: (district: string, crop: string, season: string, area: number) => void;
  onTransferToYield: (district: string, crop: string, season: string, area: number) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  language,
  setActiveTab,
  onTransferToClassifier,
  onTransferToYield
}) => {
  const [zoneFilter, setZoneFilter] = useState<'All' | 'Northern' | 'Central' | 'Southern'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'yield' | 'production' | 'rainfall'>('yield');
  const [selectedDistrictModal, setSelectedDistrictModal] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  // Filtered and sorted districts
  const processedDistricts = useMemo(() => {
    let list = TELANGANA_DISTRICTS.filter((d) => {
      const matchZone = zoneFilter === 'All' || d.zone === zoneFilter;
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.nameTe.includes(searchQuery) ||
        d.majorCrops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.hq.toLowerCase().includes(searchQuery.toLowerCase());
      return matchZone && matchSearch;
    });

    list.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'yield') return b.avgYield - a.avgYield;
      if (sortBy === 'production') return b.avgProduction - a.avgProduction;
      if (sortBy === 'rainfall') return b.normalRainfall - a.normalRainfall;
      return 0;
    });

    return list;
  }, [zoneFilter, searchQuery, sortBy]);

  const handleLaunchRisk = (districtName: string) => {
    onTransferToClassifier(districtName, 'Rice', 'Kharif', 2.5);
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLaunchYield = (districtName: string) => {
    onTransferToYield(districtName, 'Rice', 'Kharif', 2.5);
    setActiveTab('yield');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'తెలంగాణ సమగ్ర సమాచారం' : 'Statewide Agronomic Intelligence'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight">
              {t.navInsights}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              {language === 'te'
                ? '32 తెలంగాణ జిల్లాల సగటు దిగుబడి, వర్షపాతం, సాగునీటి విస్తీర్ణం మరియు ప్రధాన పంటల విశ్లేషణ. 10,708 రికార్డుల ఆధారంగా సంకలనం చేయబడింది.'
                : 'Interactive spatial and empirical analysis of crop productivity, normal precipitation, and irrigation networks across all 32 Telangana districts.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveTab('classify');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.navClassifier}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('yield');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <TrendingUp className="w-4 h-4" />
              <span>{t.navYield}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Spatial Interactive Map Component */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <span>{language === 'te' ? 'తెలంగాణ ఇంటరాక్టివ్ జిల్లా మ్యాప్' : 'Interactive Geographic District Explorer'}</span>
            </h2>
            <p className="text-xs text-stone-500">
              {language === 'te' ? 'గోదావరి & కృష్ణా బేసిన్ ఆధారంగా జిల్లాల విభజన' : 'Spatial zoning across Godavari and Krishna agricultural basins'}
            </p>
          </div>
        </div>

        <TelanganaMap
          language={language}
          onSelectDistrictForRisk={handleLaunchRisk}
          onSelectDistrictForYield={handleLaunchYield}
        />
      </section>

      {/* 2. Agricultural Data Analytics Dashboard */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-700" />
            <span>{language === 'te' ? 'రాష్ట్ర స్థాయి ఉత్పత్తి & దిగుబడి పోకడలు' : 'Empirical State Productivity Benchmarks'}</span>
          </h2>
          <p className="text-xs text-stone-500">
            {language === 'te' ? '9 ఏళ్ళ డేటా ఆధారంగా విశ్లేషించబడిన చార్టులు' : 'Multi-year agro-climatic trends and yield distribution from 2014 to 2023'}
          </p>
        </div>

        <AgriStatsDashboard language={language} />
      </section>

      {/* 3. Comprehensive 32 Districts Catalog Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-stone-100 border border-stone-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {language === 'te' ? 'అన్ని 32 జిల్లాల పూర్తి సూచిక' : 'Complete 32 District Profiles Catalog'}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {language === 'te'
                ? `${processedDistricts.length} జిల్లాలు కనుగొనబడ్డాయి`
                : `Displaying ${processedDistricts.length} verified administrative agro-districts`}
            </p>
          </div>

          {/* Controls: Search, Zone, Sort */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'te' ? 'జిల్లా లేదా పంట శోధించండి...' : 'Search district, crop, HQ...'}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 w-44 sm:w-52"
              />
            </div>

            {/* Zone Filter */}
            <select
              value={zoneFilter}
              onChange={(e) => setZoneFilter(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold focus:outline-hidden"
            >
              <option value="All">{language === 'te' ? 'అన్ని ప్రాంతాలు' : 'All Zones'}</option>
              <option value="Northern">{language === 'te' ? 'ఉత్తర తెలంగాణ' : 'Northern Zone'}</option>
              <option value="Central">{language === 'te' ? 'మధ్య తెలంగాణ' : 'Central Zone'}</option>
              <option value="Southern">{language === 'te' ? 'దక్షిణ తెలంగాణ' : 'Southern Zone'}</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 font-semibold focus:outline-hidden"
            >
              <option value="yield">{language === 'te' ? 'దిగుబడి ప్రకారం (ఎక్కువ)' : 'Sort: Highest Yield'}</option>
              <option value="production">{language === 'te' ? 'ఉత్పత్తి ప్రకారం (ఎక్కువ)' : 'Sort: Highest Production'}</option>
              <option value="rainfall">{language === 'te' ? 'వర్షపాతం ప్రకారం' : 'Sort: Highest Rainfall'}</option>
              <option value="name">{language === 'te' ? 'పేరు ప్రకారం (A-Z)' : 'Sort: Alphabetical (A-Z)'}</option>
            </select>
          </div>
        </div>

        {/* Districts Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {processedDistricts.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-stone-900">
                        {d.name}
                      </h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {d.nameTe}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                      <span>{d.zone} Zone</span>
                      <span>•</span>
                      <span>HQ: {d.hq}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      d.zone === 'Northern'
                        ? 'bg-emerald-100 text-emerald-800'
                        : d.zone === 'Central'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {d.zone}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {d.description}
                </p>

                {/* Metrics pill grid */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-stone-100 text-xs">
                  <div className="p-2 rounded-lg bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'సగటు దిగుబడి' : 'Avg Yield'}
                    </span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {d.avgYield} t/ha
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'సాధారణ వర్షపాతం' : 'Normal Rain'}
                    </span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {d.normalRainfall} mm
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'సాగునీరు' : 'Irrigation'}
                    </span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">
                      {d.irrigationPct}%
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-stone-50">
                    <span className="text-[10px] text-stone-500 block">
                      {language === 'te' ? 'వార్షిక ఉత్పత్తి' : 'Production'}
                    </span>
                    <span className="font-mono font-bold text-stone-900 text-sm">
                      {d.avgProduction}K t
                    </span>
                  </div>
                </div>

                {/* Major crops */}
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    {language === 'te' ? 'కీలక పంటలు:' : 'Key Crops:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {d.majorCrops.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px] font-medium"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  onClick={() => handleLaunchRisk(d.name)}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'రిస్క్ అంచనా' : 'Check Risk'}</span>
                </button>
                <button
                  onClick={() => handleLaunchYield(d.name)}
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
