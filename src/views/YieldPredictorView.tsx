import React, { useState } from 'react';
import {
  TrendingUp,
  Loader2,
  Sparkles,
  MapPin,
  Sprout,
  Calendar,
  Maximize2,
  AlertCircle,
  Clock,
  CheckCircle,
  Coins,
  ArrowRight,
  ShieldAlert,
  Info,
  Scale,
  DollarSign,
  ChevronRight
} from 'lucide-react';
import {
  YieldPredictionRequest,
  YieldPredictionResponse,
  YieldHistoryRecord,
  ActiveTab,
  Language
} from '../types';
import {
  DISTRICTS,
  CROPS,
  SEASONS,
  YIELD_PRESETS,
  YieldPresetScenario,
  ESTIMATED_MSP_PER_QUINTAL
} from '../data/agronomyData';
import { predictCropYield } from '../services/yieldApi';

interface YieldPredictorViewProps {
  serverOnline: boolean;
  setActiveTab: (tab: ActiveTab) => void;
  onTransferToClassifier?: (district: string, crop: string, season: string, area: number) => void;
  initialParams?: YieldPredictionRequest | null;
  language?: Language;
}

const STORAGE_KEY = 'cropguard_yield_history';

export const YieldPredictorView: React.FC<YieldPredictorViewProps> = ({
  serverOnline,
  setActiveTab,
  onTransferToClassifier,
  initialParams,
  language = 'en'
}) => {
  // Form state
  const [district, setDistrict] = useState<string>(initialParams?.district_name || 'Nalgonda');
  const [customDistrict, setCustomDistrict] = useState<string>('');
  const [crop, setCrop] = useState<string>(initialParams?.crop_name || 'Rice');
  const [customCrop, setCustomCrop] = useState<string>('');
  const [season, setSeason] = useState<string>(initialParams?.season || 'Kharif');
  const [area, setArea] = useState<number>(initialParams?.area || 2.5);

  // Sync initialParams
  React.useEffect(() => {
    if (initialParams) {
      if (DISTRICTS.includes(initialParams.district_name)) {
        setDistrict(initialParams.district_name);
      } else {
        setDistrict('OTHER');
        setCustomDistrict(initialParams.district_name);
      }
      if (CROPS.includes(initialParams.crop_name)) {
        setCrop(initialParams.crop_name);
      } else {
        setCrop('OTHER');
        setCustomCrop(initialParams.crop_name);
      }
      setSeason(initialParams.season);
      setArea(initialParams.area);
    }
  }, [initialParams]);

  // Market price estimator state (₹ per quintal)
  const defaultMsp = ESTIMATED_MSP_PER_QUINTAL['rice'] || 2320;
  const [pricePerQuintal, setPricePerQuintal] = useState<number>(defaultMsp);

  // Execution state
  const [loading, setLoading] = useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<YieldPredictionResponse | null>(null);

  // Query History
  const [history, setHistory] = useState<YieldHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const resolvedDistrict = district === 'OTHER' ? customDistrict.trim() : district;
  const resolvedCrop = crop === 'OTHER' ? customCrop.trim() : crop;

  const handlePredict = async (overrideRequest?: YieldPredictionRequest) => {
    const targetDistrict = overrideRequest ? overrideRequest.district_name : resolvedDistrict;
    const targetCrop = overrideRequest ? overrideRequest.crop_name : resolvedCrop;
    const targetSeason = overrideRequest ? overrideRequest.season : season;
    const targetArea = overrideRequest ? overrideRequest.area : area;

    if (!targetDistrict) {
      setErrorMessage('Please specify a valid district.');
      return;
    }
    if (!targetCrop) {
      setErrorMessage('Please specify a crop species.');
      return;
    }
    if (!targetArea || targetArea <= 0) {
      setErrorMessage('Cultivated area must be greater than 0 hectares.');
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    setProgressStatus('Sending pre-sowing coordinates to Random Forest service...');

    const payload: YieldPredictionRequest = {
      district_name: targetDistrict,
      crop_name: targetCrop,
      season: targetSeason,
      area: Number(targetArea)
    };

    try {
      const res = await predictCropYield(payload, (status) => {
        setProgressStatus(status);
      });

      setResult(res);

      // Update default market price based on crop
      const cropKey = targetCrop.toLowerCase();
      const msp = ESTIMATED_MSP_PER_QUINTAL[cropKey] || 2200;
      setPricePerQuintal(msp);

      // Save to history
      const newRecord: YieldHistoryRecord = {
        id: `yield-${Date.now()}`,
        timestamp: Date.now(),
        input: payload,
        result: res
      };
      const updatedHistory = [newRecord, ...history.slice(0, 7)];
      setHistory(updatedHistory);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
      } catch (e) {
        console.warn('LocalStorage save failed:', e);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Yield prediction failed.');
    } finally {
      setLoading(false);
      setProgressStatus('');
    }
  };

  const applyPreset = (preset: YieldPresetScenario) => {
    const req = preset.request;
    setDistrict(req.district_name);
    setCrop(req.crop_name);
    setSeason(req.season);
    setArea(req.area);
    handlePredict(req);
  };

  // Financial calculation:
  // 1 tonne = 10 quintals
  const totalProductionTonnes = result?.estimated_total_production || 0;
  const totalProductionQuintals = totalProductionTonnes * 10;
  const estimatedRevenue = Math.round(totalProductionQuintals * pricePerQuintal);

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto">
      
      {/* Top Title & Presets */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">ML Model 2</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                Random Forest Regression (R²: 0.93)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Pre-Cultivation Crop Yield Predictor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Forecast expected production in tonnes/hectare and aggregate harvest tonnage prior to sowing.
            </p>
          </div>

          {/* Render container status pill */}
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
            <span className={`w-2.5 h-2.5 rounded-full ${serverOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            <span className="text-slate-600">Regression API:</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]" title="https://cropguard-ai-vurl.onrender.com/predict">
              cropguard-ai-vurl.onrender.com
            </span>
          </div>
        </div>

        {/* Quick Test Presets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Verified Yield Scenarios (from 10-Yr Historical Data)
            </span>
            <span className="text-[11px] text-slate-400">Click to execute live inference</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {YIELD_PRESETS.map((p) => (
              <button
                key={p.id}
                id={`btn-yield-${p.id}`}
                onClick={() => applyPreset(p)}
                disabled={loading}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm text-left transition-all group disabled:opacity-60"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                    {p.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold font-mono">
                    {p.expectedYield}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1">
                  {p.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) & Results Display (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Yield Forecasting Parameters</h3>
              <p className="text-xs text-slate-500">Provide pre-cultivation land and agro-climatic coordinates</p>
            </div>

            {/* Parameter 1: District */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  District
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Rainfall & Soil Cluster</span>
              </label>

              <select
                id="select-yield-district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
                <option value="OTHER">Custom / Other District...</option>
              </select>

              {district === 'OTHER' && (
                <input
                  id="input-yield-custom-district"
                  type="text"
                  placeholder="Enter district name (e.g. Nalgonda)"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 text-sm border border-emerald-400 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>

            {/* Parameter 2: Crop */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  Crop Species
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Cultivar type</span>
              </label>

              <select
                id="select-yield-crop"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
              >
                {CROPS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="OTHER">Custom / Other Crop...</option>
              </select>

              {crop === 'OTHER' && (
                <input
                  id="input-yield-custom-crop"
                  type="text"
                  placeholder="Enter crop name (e.g. Rice, Maize)"
                  value={customCrop}
                  onChange={(e) => setCustomCrop(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 text-sm border border-emerald-400 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>

            {/* Parameter 3: Season */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  Cultivation Season
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Agro-meteorological window</span>
              </label>

              <div className="grid grid-cols-3 gap-2">
                {SEASONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    id={`season-yield-${s.value.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => setSeason(s.value)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      season === s.value
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs">{s.value}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{s.timing.split('–')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Parameter 4: Cultivated Area */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-emerald-600" />
                  Cultivated Parcel Area (Hectares)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {area} ha (≈ {(area * 2.471).toFixed(1)} acres)
                </span>
              </div>

              <input
                id="input-yield-area"
                type="number"
                step="0.1"
                min="0.01"
                max="5000"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value) || 0.1)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
              />

              {/* Quick Area Preset Chips */}
              <div className="flex items-center gap-1.5 pt-1">
                {[0.5, 1.0, 2.5, 5.0, 10.0].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setArea(val)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono border ${
                      area === val
                        ? 'bg-slate-800 text-white border-slate-800'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {val} ha
                  </button>
                ))}
              </div>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>{errorMessage}</div>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-yield-prediction"
              onClick={() => handlePredict()}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Calculating Random Forest Yield...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>Forecast Crop Yield for {resolvedCrop}</span>
                </>
              )}
            </button>

            {/* Loading progress / cold start ticker */}
            {loading && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1 animate-pulse">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>{progressStatus || 'Connecting to Render backend...'}</span>
                </div>
                <div className="text-[11px] text-slate-500 pl-5.5">
                  Initial wake-up for dormant containers takes ~15–20s. Calibrated fallback will activate if request times out.
                </div>
              </div>
            )}
          </div>

          {/* Yield Query History */}
          {history.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Recent Yield Queries
                </span>
                <button
                  onClick={() => {
                    setHistory([]);
                    localStorage.removeItem(STORAGE_KEY);
                  }}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                >
                  Clear
                </button>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {history.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      setDistrict(h.input.district_name);
                      setCrop(h.input.crop_name);
                      setSeason(h.input.season);
                      setArea(h.input.area);
                      setResult(h.result);
                    }}
                    className="w-full p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-left flex items-center justify-between text-xs transition-colors"
                  >
                    <div>
                      <span className="font-semibold text-slate-800">
                        {h.input.crop_name} ({h.input.district_name})
                      </span>
                      <div className="text-[10px] text-slate-400">
                        {h.input.season} • {h.input.area} ha
                      </div>
                    </div>
                    <span className="text-[11px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {h.result.prediction} {h.result.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
              
              {/* Notice Banner (If fallback or simulated) */}
              {result.message && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <strong className="font-semibold">Notice: </strong>
                    {result.message}
                  </div>
                </div>
              )}

              {/* Status Header Bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    Forecast Calculated {result.latency_ms ? `in ${result.latency_ms}ms` : ''}
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {result.is_simulated ? 'Calibrated Agro Baseline' : 'FastAPI Cloud Service'}
                </span>
              </div>

              {/* Primary Metric Banner: Expected Yield */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border border-slate-800 relative overflow-hidden shadow-lg">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      Predicted Crop Yield
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Ref Year: {result.historical_reference_year || 'Latest Available'}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                    <div className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
                      {result.prediction.toFixed(2)}
                    </div>
                    <div className="text-emerald-400 font-semibold text-lg sm:text-xl">
                      {result.unit}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300">
                    Expected agricultural productivity for <strong className="text-white">{result.crop}</strong> in <strong className="text-white">{result.district}</strong> during the <strong className="text-white">{result.season}</strong> cycle.
                  </p>

                  {/* Two Key Sub-Metrics */}
                  <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                      <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-emerald-400" />
                        Estimated Total Harvest
                      </span>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.estimated_total_production.toFixed(2)} <span className="text-sm font-normal text-slate-300">Tonnes</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        ≈ {(result.estimated_total_production * 10).toFixed(1)} Quintals
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                      <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-emerald-400" />
                        Effective Cultivated Area
                      </span>
                      <div className="text-2xl font-black text-white font-mono">
                        {result.farmer_area.toFixed(2)} <span className="text-sm font-normal text-slate-300">ha</span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        ≈ {(result.farmer_area * 2.471).toFixed(1)} Acres
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial & Harvest Valuation Estimator */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Economic Harvest Valuation</h4>
                      <p className="text-[11px] text-slate-500">Estimated gross value based on regional Mandi / MSP price</p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    10 Quintals = 1 Tonne
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Expected Mandi Price / MSP</span>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        ₹{pricePerQuintal.toLocaleString('en-IN')} / quintal
                      </span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 text-sm">₹</span>
                      <input
                        type="number"
                        step="50"
                        min="100"
                        max="50000"
                        value={pricePerQuintal}
                        onChange={(e) => setPricePerQuintal(parseFloat(e.target.value) || 0)}
                        className="w-full pl-7 pr-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Adjust based on local procurement center or market spot rate
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center sm:text-right space-y-0.5">
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                      Gross Estimated Crop Value
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-950 font-mono">
                      ₹ {estimatedRevenue.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-emerald-700">
                      Based on {totalProductionQuintals.toFixed(1)} quintals produced
                    </span>
                  </div>
                </div>
              </div>

              {/* Cross-Model Action Bridge: Check Risk Classification */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-slate-800">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    <span>Cross-Model Agro Validation</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Analyze environmental stress, rainfall deficit, and irrigation feasibility for this exact selection.
                  </p>
                </div>

                <button
                  id="btn-bridge-to-classifier"
                  onClick={() => {
                    if (onTransferToClassifier) {
                      onTransferToClassifier(result.district, result.crop, result.season, result.farmer_area);
                    }
                    setActiveTab('classify');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shrink-0 shadow-xs"
                >
                  <span>Check Risk for {result.crop}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>

            </div>
          ) : (
            /* Empty state */
            <div className="p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-emerald-600">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="max-w-sm mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-800">Awaiting Farm Inputs</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select your district, crop species, and cultivation acreage on the left, or test a verified preset scenario.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => applyPreset(YIELD_PRESETS[0])}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Sample: Rice in Nalgonda (2.5 ha)</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
