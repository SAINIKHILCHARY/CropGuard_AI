import React, { useState, useMemo } from 'react';
import {
  HISTORICAL_9_YEAR_TRENDS,
  DISTRICT_YIELD_BENCHMARK,
  CROP_PRODUCTION_BENCHMARK,
  RAINFALL_VS_YIELD_DATA,
  IRRIGATION_VS_YIELD_DATA,
  TELANGANA_DISTRICTS
} from '../data/telanganaAgriData';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Area,
  AreaChart,
  ComposedChart
} from 'recharts';
import {
  Database,
  MapPin,
  Wheat,
  Calendar,
  TrendingUp,
  Layers,
  CloudRain,
  Droplets,
  Filter,
  BarChart3,
  LineChart as LineChartIcon
} from 'lucide-react';

interface AgriStatsDashboardProps {
  language: Language;
}

export const AgriStatsDashboard: React.FC<AgriStatsDashboardProps> = ({ language }) => {
  const [selectedSeason, setSelectedSeason] = useState<'All' | 'Kharif' | 'Rabi' | 'Whole Year'>('All');
  const [activeChartTab, setActiveChartTab] = useState<'district-yield' | 'crop-production' | 'yearly-trend' | 'rainfall-yield' | 'irrigation-yield'>('district-yield');
  const [selectedZone, setSelectedZone] = useState<'All' | 'Northern' | 'Central' | 'Southern'>('All');

  const t = TRANSLATIONS[language];

  // Filtered district benchmarks
  const filteredDistricts = useMemo(() => {
    if (selectedZone === 'All') return DISTRICT_YIELD_BENCHMARK;
    const zoneDistricts = new Set(
      TELANGANA_DISTRICTS.filter((d) => d.zone === selectedZone).map((d) => d.name)
    );
    return DISTRICT_YIELD_BENCHMARK.filter((d) => zoneDistricts.has(d.district));
  }, [selectedZone]);

  return (
    <div className="space-y-6">
      {/* Top 8 Key Metrics Bento Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Records */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'వ్యవసాయ రికార్డులు' : 'Total Agricultural Records'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            10,708
          </div>
          <div className="mt-1 text-[11px] text-emerald-800 font-medium">
            {language === 'te' ? 'ప్రామాణిక డేటాసెట్' : 'Validated farm-level records'}
          </div>
        </div>

        {/* Districts Covered */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'తెలంగాణ జిల్లాలు' : 'Districts Covered'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            32
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            {language === 'te' ? 'ఆదిలాబాద్ నుండి గద్వాల వరకు' : '100% State Coverage'}
          </div>
        </div>

        {/* Crops Covered */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'పంట రకాలు' : 'Crops Covered'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Wheat className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            40
          </div>
          <div className="mt-1 text-[11px] text-amber-800 font-medium">
            {language === 'te' ? 'ధాన్యాలు, ప్రత్తి, పప్పుధాన్యాలు' : 'Cereals, Cash, Pulses, Oilseeds'}
          </div>
        </div>

        {/* Agricultural Years */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'వ్యవసాయ సంవత్సరాలు' : 'Agricultural Years'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            9
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            2014–15 to 2022–23
          </div>
        </div>

        {/* State Average Yield */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'రాష్ట్ర సగటు దిగుబడి' : 'Average Yield'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            2.94 <span className="text-sm font-sans font-normal text-stone-500">t/ha</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium">
            +39.5% {language === 'te' ? '2014 నుండి పెరుగుదల' : 'growth since 2014'}
          </div>
        </div>

        {/* Total Annual Production */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'వార్షిక ఆహార ఉత్పత్తి' : 'Annual Production'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            19.4M <span className="text-sm font-sans font-normal text-stone-500">t</span>
          </div>
          <div className="mt-1 text-[11px] text-stone-500">
            {language === 'te' ? 'ఆహార ధాన్యాలు & ప్రత్తి' : 'Grain & Commercial Output'}
          </div>
        </div>

        {/* Normal Rainfall */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'వర్షపాత స్థితి' : 'Rainfall Status'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
              <CloudRain className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            906 <span className="text-sm font-sans font-normal text-stone-500">mm</span>
          </div>
          <div className="mt-1 text-[11px] text-sky-700 font-medium">
            {language === 'te' ? 'రాష్ట్ర సాధారణ వర్షపాతం' : 'Normal State Monsoon Avg'}
          </div>
        </div>

        {/* Irrigation Coverage */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500">
              {language === 'te' ? 'సాగునీటి విస్తీర్ణం' : 'Irrigation Coverage'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-stone-900 font-mono">
            68.5%
          </div>
          <div className="mt-1 text-[11px] text-teal-800 font-medium">
            {language === 'te' ? 'కాలువలు & చెరువులు' : 'Canal & Project Command'}
          </div>
        </div>
      </div>

      {/* Main Interactive Charts Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden">
        {/* Header with Navigation and Filters */}
        <div className="p-5 sm:p-6 border-b border-stone-100 bg-gradient-to-r from-emerald-50/50 via-stone-50 to-stone-50">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-stone-900">
                {language === 'te' ? 'వ్యవసాయ పరిశీలనలు & గ్రాఫ్‌లు' : 'Agricultural Analytics & Interactive Charts'}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                {language === 'te'
                  ? 'తెలంగాణ 10,708 రికార్డుల ఆధారంగా దిగుబడి, ఉత్పత్తి మరియు వర్షపాతం విశ్లేషణ.'
                  : 'Multi-dimensional correlation analysis from Telangana 10,708 micro-record dataset.'}
              </p>
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Zone selector */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-xs">
                <Filter className="w-3.5 h-3.5 text-stone-400" />
                <span className="text-stone-500 font-medium">{language === 'te' ? 'ప్రాంతం:' : 'Zone:'}</span>
                <select
                  value={selectedZone}
                  onChange={(e) => setSelectedZone(e.target.value as any)}
                  className="bg-transparent font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="All">{language === 'te' ? 'అన్ని ప్రాంతాలు' : 'All Telangana'}</option>
                  <option value="Northern">{language === 'te' ? 'ఉత్తర తెలంగాణ' : 'Northern Zone'}</option>
                  <option value="Central">{language === 'te' ? 'మధ్య తెలంగాణ' : 'Central Zone'}</option>
                  <option value="Southern">{language === 'te' ? 'దక్షిణ తెలంగాణ' : 'Southern Zone'}</option>
                </select>
              </div>

              {/* Season selector */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white border border-stone-200 text-xs">
                <span className="text-stone-500 font-medium">{language === 'te' ? 'సీజన్:' : 'Season:'}</span>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value as any)}
                  className="bg-transparent font-semibold text-stone-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="All">{language === 'te' ? 'అన్ని సీజన్లు' : 'All Seasons'}</option>
                  <option value="Kharif">Kharif (వానాకాలం)</option>
                  <option value="Rabi">Rabi (యాసంగి)</option>
                  <option value="Whole Year">Whole Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Chart Selection Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 border-t border-stone-100 mt-4 no-scrollbar">
            <button
              onClick={() => setActiveChartTab('district-yield')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeChartTab === 'district-yield'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'జిల్లా సగటు దిగుబడి' : 'District Average Yield'}</span>
            </button>

            <button
              onClick={() => setActiveChartTab('crop-production')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeChartTab === 'crop-production'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Wheat className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'పంటల ఉత్పత్తి వాటా' : 'Crop Production Volume'}</span>
            </button>

            <button
              onClick={() => setActiveChartTab('yearly-trend')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeChartTab === 'yearly-trend'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <LineChartIcon className="w-3.5 h-3.5" />
              <span>{language === 'te' ? '9 ఏళ్ళ ఉత్పత్తి ధోరణి' : '9-Year Production Trend'}</span>
            </button>

            <button
              onClick={() => setActiveChartTab('rainfall-yield')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeChartTab === 'rainfall-yield'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'వర్షపాతం vs దిగుబడి' : 'Rainfall vs. Yield'}</span>
            </button>

            <button
              onClick={() => setActiveChartTab('irrigation-yield')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeChartTab === 'irrigation-yield'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>{language === 'te' ? 'సాగునీరు vs దిగుబడి' : 'Irrigation vs. Yield'}</span>
            </button>
          </div>
        </div>

        {/* Chart Viewport */}
        <div className="p-4 sm:p-7">
          {/* 1. District-wise Average Yield Bar Chart */}
          {activeChartTab === 'district-yield' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-bold text-stone-900">
                    {language === 'te' ? 'జిల్లా వారీ సగటు పంట దిగుబడి (టన్నులు / హెక్టారుకు)' : 'District-Wise Average Crop Yield (tonnes / hectare)'}
                  </h5>
                  <p className="text-xs text-stone-500">
                    {language === 'te' ? 'గోదావరి మరియు కృష్ణా ఆయకట్టు ఆధారంగా సగటు ఉత్పాదకత' : 'Productivity baseline derived across 10,708 historical records'}
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  {language === 'te' ? 'రాష్ట్ర గరిష్టం: ఖమ్మం 3.82 t/ha' : 'Max: Khammam 3.82 t/ha'}
                </span>
              </div>

              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredDistricts} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="district"
                      tick={{ fontSize: 11, fill: '#475569' }}
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                    />
                    <YAxis
                      domain={[1.5, 4.2]}
                      tick={{ fontSize: 11, fill: '#475569' }}
                      unit=" t/ha"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                      formatter={(value: any) => [`${value} tonnes/ha`, 'Avg Yield']}
                    />
                    <Bar
                      dataKey="yield"
                      fill="#047857"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 2. Crop-wise Production Volume */}
          {activeChartTab === 'crop-production' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-bold text-stone-900">
                    {language === 'te' ? 'తెలంగాణ ప్రధాన పంటల వార్షిక ఉత్పత్తి పరిమాణం (మిలియన్ టన్నులు)' : 'Annual Crop Production Volume in Telangana (Million Tonnes)'}
                  </h5>
                  <p className="text-xs text-stone-500">
                    {language === 'te' ? 'వరి మరియు ప్రత్తి అత్యధిక సాగు విస్తీర్ణం మరియు ఉత్పత్తి వాటాను కలిగి ఉన్నాయి' : 'Paddy and Cotton represent over 75% of state cultivated value'}
                  </p>
                </div>
              </div>

              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CROP_PRODUCTION_BENCHMARK} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="crop" tick={{ fontSize: 11, fill: '#475569' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#475569' }} unit=" M t" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                      formatter={(val: any, name: string) => [
                        name === 'production' ? `${val} Million Tonnes` : `${val}%`,
                        name === 'production' ? 'Production' : 'Acreage Share'
                      ]}
                    />
                    <Bar dataKey="production" fill="#d97706" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 3. 9-Year Historical Production Trend (2014-15 to 2022-23) */}
          {activeChartTab === 'yearly-trend' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-bold text-stone-900">
                    {language === 'te' ? '9 ఏళ్ళ వ్యవసాయ ఉత్పత్తి వృద్ధి ధోరణి (2014–15 నుండి 2022–23)' : '9-Year Agricultural Output Growth (2014–15 through 2022–23)'}
                  </h5>
                  <p className="text-xs text-stone-500">
                    {language === 'te' ? 'సాగునీటి ప్రాజెక్టుల పునరుజ్జీవనంతో మొత్తం ఉత్పత్తి 11.2M నుండి 19.4M టన్నులకు చేరింది' : 'State output expanded from 11.2M to 19.4M tonnes with irrigation network expansion'}
                  </p>
                </div>
              </div>

              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={HISTORICAL_9_YEAR_TRENDS} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" tick={{ fontSize: 11, fill: '#475569' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#475569' }} unit=" Mt" />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#475569' }} unit=" t/ha" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                    />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="production"
                      name={language === 'te' ? 'మొత్తం ఉత్పత్తి (M Tonnes)' : 'Total Production (M Tonnes)'}
                      fill="#a7f3d0"
                      stroke="#059669"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="avgYield"
                      name={language === 'te' ? 'సగటు దిగుబడి (t/ha)' : 'Avg Productivity (t/ha)'}
                      stroke="#b45309"
                      strokeWidth={2.5}
                      dot={{ r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 4. Rainfall vs Yield */}
          {activeChartTab === 'rainfall-yield' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-bold text-stone-900">
                    {language === 'te' ? 'వర్షపాతం మరియు పంట దిగుబడి మధ్య సహసంబంధం' : 'Monsoon Rainfall vs. District Agricultural Productivity'}
                  </h5>
                  <p className="text-xs text-stone-500">
                    {language === 'te' ? '800–1050 మి.మీ వర్షపాతం కలిగిన జిల్లాల్లో అత్యధిక దిగుబడి నమోదైంది' : 'Optimal productivity band sits between 800mm and 1050mm normal precipitation'}
                  </p>
                </div>
              </div>

              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={RAINFALL_VS_YIELD_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="rainfall"
                      tick={{ fontSize: 11, fill: '#475569' }}
                      unit=" mm"
                    />
                    <YAxis
                      domain={[1.8, 4.0]}
                      tick={{ fontSize: 11, fill: '#475569' }}
                      unit=" t/ha"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                      formatter={(val: any, name: string) => [`${val} t/ha`, 'Avg Yield']}
                      labelFormatter={(label) => `Rainfall: ${label} mm`}
                    />
                    <Area type="monotone" dataKey="yield" stroke="#0284c7" fill="#bae6fd" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* 5. Irrigation Coverage vs Yield */}
          {activeChartTab === 'irrigation-yield' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="text-sm font-bold text-stone-900">
                    {language === 'te' ? 'సాగునీటి విస్తీర్ణం మరియు దిగుబడి పెరుగుదల' : 'Irrigation Command Area vs. Agricultural Yield'}
                  </h5>
                  <p className="text-xs text-stone-500">
                    {language === 'te' ? '70% కంటే ఎక్కువ సాగునీరు ఉన్న జిల్లాల్లో దిగుబడి 3.4 t/ha పైగా ఉంది' : 'Districts exceeding 70% irrigation coverage consistently deliver yields above 3.4 tonnes/ha'}
                  </p>
                </div>
              </div>

              <div className="w-full h-80 sm:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={IRRIGATION_VS_YIELD_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="irrigation"
                      tick={{ fontSize: 11, fill: '#475569' }}
                      unit="%"
                    />
                    <YAxis
                      domain={[2.0, 4.0]}
                      tick={{ fontSize: 11, fill: '#475569' }}
                      unit=" t/ha"
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                      formatter={(val: any) => [`${val} t/ha`, 'Yield']}
                      labelFormatter={(l) => `Irrigation Coverage: ${l}%`}
                    />
                    <Line
                      type="monotone"
                      dataKey="yield"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ r: 5, fill: '#047857' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
