import React, { useState, useMemo } from 'react';
import { TELANGANA_DISTRICTS } from '../data/telanganaAgriData';
import { DistrictProfile, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  MapPin,
  Search,
  Droplets,
  Sprout,
  TrendingUp,
  CloudRain,
  Layers,
  ArrowRight,
  ShieldCheck,
  Wheat,
  X
} from 'lucide-react';

interface TelanganaMapProps {
  language: Language;
  onSelectDistrictForRisk?: (districtName: string) => void;
  onSelectDistrictForYield?: (districtName: string) => void;
}

// Geometric spatial positions for a stylized geographic layout of Telangana's 32 districts
const DISTRICT_MAP_COORDS: Record<string, { x: number; y: number; label: string }> = {
  // Northern Telangana
  adilabad: { x: 38, y: 10, label: 'Adilabad' },
  'komaram-bheem-asifabad': { x: 55, y: 12, label: 'K.B. Asifabad' },
  nirmal: { x: 32, y: 22, label: 'Nirmal' },
  mancherial: { x: 54, y: 24, label: 'Mancherial' },
  nizamabad: { x: 26, y: 34, label: 'Nizamabad' },
  jagtial: { x: 42, y: 32, label: 'Jagtial' },
  peddapalli: { x: 55, y: 34, label: 'Peddapalli' },
  'jayashankar-bhupalpally': { x: 68, y: 32, label: 'Bhupalpally' },
  kamareddy: { x: 25, y: 46, label: 'Kamareddy' },
  'rajanna-sircilla': { x: 38, y: 44, label: 'R. Sircilla' },
  karimnagar: { x: 48, y: 44, label: 'Karimnagar' },
  mulugu: { x: 74, y: 40, label: 'Mulugu' },

  // Central Telangana
  medak: { x: 28, y: 56, label: 'Medak' },
  siddipet: { x: 44, y: 54, label: 'Siddipet' },
  jangaon: { x: 56, y: 54, label: 'Jangaon' },
  warangal: { x: 66, y: 52, label: 'Warangal' },
  mahabubabad: { x: 74, y: 54, label: 'Mahabubabad' },
  sangareddy: { x: 22, y: 65, label: 'Sangareddy' },
  'medchal-malkajgiri': { x: 35, y: 64, label: 'Medchal' },
  hyderabad: { x: 34, y: 71, label: 'Hyderabad' },
  'yadadri-bhuvanagiri': { x: 48, y: 65, label: 'Yadadri' },
  rangareddy: { x: 34, y: 79, label: 'Rangareddy' },
  vikarabad: { x: 18, y: 76, label: 'Vikarabad' },

  // Southern & Godavari / Krishna Basin
  'bhadradri-kothagudem': { x: 84, y: 50, label: 'Bhadradri' },
  khammam: { x: 80, y: 66, label: 'Khammam' },
  suryapet: { x: 62, y: 68, label: 'Suryapet' },
  nalgonda: { x: 50, y: 78, label: 'Nalgonda' },
  mahabubnagar: { x: 27, y: 88, label: 'Mahabubnagar' },
  narayanpet: { x: 16, y: 89, label: 'Narayanpet' },
  nagarkurnool: { x: 40, y: 89, label: 'Nagarkurnool' },
  wanaparthy: { x: 32, y: 95, label: 'Wanaparthy' },
  'jogulamba-gadwal': { x: 24, y: 102, label: 'J. Gadwal' }
};

export const TelanganaMap: React.FC<TelanganaMapProps> = ({
  language,
  onSelectDistrictForRisk,
  onSelectDistrictForYield
}) => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('karimnagar');
  const [hoveredDistrictId, setHoveredDistrictId] = useState<string | null>(null);
  const [zoneFilter, setZoneFilter] = useState<'All' | 'Northern' | 'Central' | 'Southern'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[language];

  // Active district profile
  const activeDistrict = useMemo(() => {
    return (
      TELANGANA_DISTRICTS.find((d) => d.id === (hoveredDistrictId || selectedDistrictId)) ||
      TELANGANA_DISTRICTS[8] // Karimnagar fallback
    );
  }, [selectedDistrictId, hoveredDistrictId]);

  // Filtered districts
  const filteredDistricts = useMemo(() => {
    return TELANGANA_DISTRICTS.filter((d) => {
      const matchZone = zoneFilter === 'All' || d.zone === zoneFilter;
      const matchSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.nameTe.includes(searchQuery) ||
        d.majorCrops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchZone && matchSearch;
    });
  }, [zoneFilter, searchQuery]);

  return (
    <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="p-5 sm:p-7 border-b border-stone-100 bg-gradient-to-r from-emerald-50/70 via-stone-50 to-amber-50/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold mb-2">
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'తెలంగాణ 32 జిల్లాలు' : '32 Telangana Districts'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              {t.secMapTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
              {t.secMapSubtitle}
            </p>
          </div>

          {/* Controls: Search & Zone Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'te' ? 'జిల్లా లేదా పంట శోధించండి...' : 'Search district or crop...'}
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white border border-stone-300 text-stone-800 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 w-44 sm:w-56"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="inline-flex rounded-xl bg-stone-100 p-0.5 border border-stone-200 text-xs font-medium text-stone-600">
              {(['All', 'Northern', 'Central', 'Southern'] as const).map((zone) => (
                <button
                  key={zone}
                  onClick={() => setZoneFilter(zone)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    zoneFilter === zone
                      ? 'bg-emerald-700 text-white shadow-xs font-semibold'
                      : 'hover:text-stone-900'
                  }`}
                >
                  {zone === 'All'
                    ? language === 'te'
                      ? 'అన్నీ'
                      : 'All'
                    : zone === 'Northern'
                    ? language === 'te'
                      ? 'ఉత్తర'
                      : 'Northern'
                    : zone === 'Central'
                    ? language === 'te'
                      ? 'మధ్య'
                      : 'Central'
                    : language === 'te'
                    ? 'దక్షిణ'
                    : 'Southern'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Container: Map Grid & District Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Interactive Spatial District Map (7 cols) */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-stone-50/50 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-3 px-1">
            <span className="font-medium text-stone-700 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              {language === 'te' ? 'జిల్లాపై క్లిక్ చేయండి' : 'Click or hover over any district'}
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
                {language === 'te' ? 'ఉత్తర (గోదావరి)' : 'Northern (Godavari)'}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                {language === 'te' ? 'మధ్య తెలంగాణ' : 'Central Plateau'}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block"></span>
                {language === 'te' ? 'దక్షిణ (కృష్ణా)' : 'Southern (Krishna)'}
              </span>
            </div>
          </div>

          {/* Stylized Telangana Geographic Spatial Grid */}
          <div className="relative w-full aspect-4/3 sm:aspect-16/11 bg-white rounded-2xl border border-stone-200 p-3 sm:p-5 overflow-hidden shadow-inner">
            {/* Background topographic river contours */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              viewBox="0 0 100 110"
              preserveAspectRatio="none"
            >
              {/* Godavari River Path */}
              <path
                d="M 28 22 Q 45 28 65 30 T 92 52"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.5"
                strokeDasharray="2 1"
              />
              {/* Krishna River Path */}
              <path
                d="M 12 90 Q 30 92 50 82 T 95 86"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.5"
                strokeDasharray="2 1"
              />
              <text x="75" y="46" fill="#0284c7" fontSize="2.5" fontWeight="600">
                Godavari Basin
              </text>
              <text x="65" y="88" fill="#0284c7" fontSize="2.5" fontWeight="600">
                Krishna Basin
              </text>
            </svg>

            {/* Interactive District Pins */}
            <div className="relative w-full h-full">
              {TELANGANA_DISTRICTS.map((d) => {
                const pos = DISTRICT_MAP_COORDS[d.id] || { x: 50, y: 50, label: d.name };
                const isSelected = selectedDistrictId === d.id;
                const isHovered = hoveredDistrictId === d.id;
                const isFiltered = filteredDistricts.some((fd) => fd.id === d.id);

                let zoneColor = 'bg-emerald-600 border-emerald-700 text-white';
                if (d.zone === 'Central') {
                  zoneColor = 'bg-amber-600 border-amber-700 text-white';
                } else if (d.zone === 'Southern') {
                  zoneColor = 'bg-sky-600 border-sky-700 text-white';
                }

                if (!isFiltered) {
                  return null;
                }

                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrictId(d.id)}
                    onMouseEnter={() => setHoveredDistrictId(d.id)}
                    onMouseLeave={() => setHoveredDistrictId(null)}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-10 group transition-all duration-200 focus:outline-hidden ${
                      isSelected || isHovered ? 'scale-115 z-30' : 'scale-100 hover:scale-105'
                    }`}
                  >
                    <div
                      className={`px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold tracking-tight border shadow-xs flex items-center gap-1 transition-all ${
                        isSelected
                          ? 'ring-3 ring-emerald-500/50 shadow-md font-bold'
                          : ''
                      } ${zoneColor}`}
                    >
                      <span>{pos.label}</span>
                    </div>

                    {/* Ping indicator for selected */}
                    {isSelected && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-300"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick horizontal badge list of all 32 districts for accessible keyboard and mobile tap */}
          <div className="mt-4 pt-3 border-t border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              {language === 'te' ? 'అన్ని 32 తెలంగాణ జిల్లాలు (ఎంచుకోండి):' : 'All 32 Districts (Tap to Select):'}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
              {filteredDistricts.map((d) => {
                const isSelected = selectedDistrictId === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDistrictId(d.id)}
                    className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                      isSelected
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                    }`}
                  >
                    {language === 'te' ? d.nameTe : d.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active District Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-7 bg-white flex flex-col justify-between space-y-5">
          <div>
            {/* District Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-black text-stone-900">
                    {activeDistrict.name}
                  </h4>
                  <span className="text-sm font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {activeDistrict.nameTe}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                  <span className="font-medium text-stone-700">
                    {activeDistrict.zone} Telangana
                  </span>
                  <span>•</span>
                  <span>HQ: {activeDistrict.hq}</span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0">
                <Wheat className="w-5 h-5" />
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
              {activeDistrict.description}
            </p>

            {/* Key Agronomic Metrics Matrix */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              {/* Average Yield */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{language === 'te' ? 'సగటు దిగుబడి' : 'Average Yield'}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-black text-stone-900 font-mono">
                    {activeDistrict.avgYield}
                  </span>
                  <span className="text-[11px] text-stone-500">t/ha</span>
                </div>
              </div>

              {/* Annual Production */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  <span>{language === 'te' ? 'వార్షిక ఉత్పత్తి' : 'Annual Production'}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-black text-stone-900 font-mono">
                    {activeDistrict.avgProduction}K
                  </span>
                  <span className="text-[11px] text-stone-500">{t.tonnes}</span>
                </div>
              </div>

              {/* Normal Rainfall */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                  <CloudRain className="w-3.5 h-3.5 text-sky-700" />
                  <span>{language === 'te' ? 'సాధారణ వర్షపాతం' : 'Normal Rainfall'}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-black text-stone-900 font-mono">
                    {activeDistrict.normalRainfall}
                  </span>
                  <span className="text-[11px] text-stone-500">mm / yr</span>
                </div>
              </div>

              {/* Irrigation Coverage */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80">
                <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                  <Droplets className="w-3.5 h-3.5 text-teal-700" />
                  <span>{language === 'te' ? 'సాగునీటి విస్తీర్ణం' : 'Net Irrigated'}</span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-lg font-black text-stone-900 font-mono">
                    {activeDistrict.irrigationPct}%
                  </span>
                  <span className="text-[11px] text-stone-500">of cultivable</span>
                </div>
              </div>
            </div>

            {/* Major Crops */}
            <div className="mt-4">
              <label className="text-xs font-bold text-stone-700 block mb-1.5">
                {language === 'te' ? 'ప్రధాన పంటలు:' : 'Primary Cultivated Crops:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {activeDistrict.majorCrops.map((crop) => (
                  <span
                    key={crop}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 text-xs font-semibold border border-emerald-200 flex items-center gap-1"
                  >
                    <Sprout className="w-3 h-3 text-emerald-700" />
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Irrigation & Soil Context */}
            <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">
                  {language === 'te' ? 'సాగునీటి వనరు:' : 'Primary Water Source:'}
                </span>
                <span className="font-semibold text-stone-800">
                  {activeDistrict.primaryIrrigation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">
                  {language === 'te' ? 'నేల రకాలు:' : 'Soil Classification:'}
                </span>
                <span className="font-semibold text-stone-800">
                  {activeDistrict.soilTypes.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Bridge to Classifier & Yield */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
            {onSelectDistrictForRisk && (
              <button
                onClick={() => onSelectDistrictForRisk(activeDistrict.name)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {language === 'te' ? 'రిస్క్ అంచనా వేయండి' : 'Check Crop Risk'}
                </span>
              </button>
            )}

            {onSelectDistrictForYield && (
              <button
                onClick={() => onSelectDistrictForYield(activeDistrict.name)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <TrendingUp className="w-4 h-4" />
                <span>
                  {language === 'te' ? 'దిగుబడి అంచనా వేయండి' : 'Predict Crop Yield'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
