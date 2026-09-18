import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Loader2,
  RefreshCw,
  Sparkles,
  MapPin,
  Sprout,
  Calendar,
  Maximize2,
  AlertCircle,
  Clock,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  ClassificationRequest,
  ClassificationResponse,
  QueryHistoryRecord,
  Language
} from '../types';
import {
  DISTRICTS,
  CROPS,
  SEASONS,
  PRESET_SCENARIOS,
  PresetScenario
} from '../data/agronomyData';
import { predictAgriculturalRisk } from '../services/classificationApi';
import { RiskMeter } from '../components/RiskMeter';
import { ContributingFactors } from '../components/ContributingFactors';
import { CropRecommendationCard } from '../components/CropRecommendationCard';

interface ClassifierViewProps {
  serverOnline: boolean;
  initialParams?: ClassificationRequest | null;
  onNavigateToYield?: (district: string, crop: string, season: string, area: number) => void;
  language?: Language;
}

const STORAGE_KEY = 'cropguard_query_history';

export const ClassifierView: React.FC<ClassifierViewProps> = ({
  serverOnline,
  initialParams,
  onNavigateToYield,
  language = 'en'
}) => {
  // Form State
  const [district, setDistrict] = useState<string>(initialParams?.district_name || 'Karimnagar');
  const [customDistrict, setCustomDistrict] = useState<string>('');
  const [crop, setCrop] = useState<string>(initialParams?.crop_name || 'Rice');
  const [customCrop, setCustomCrop] = useState<string>('');
  const [season, setSeason] = useState<string>(initialParams?.season || 'Kharif');
  const [area, setArea] = useState<number>(initialParams?.area || 2.5);

  // Sync initialParams changes
  useEffect(() => {
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

  // Execution State
  const [loading, setLoading] = useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<ClassificationResponse | null>(null);

  // Query History
  const [history, setHistory] = useState<QueryHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const resolvedDistrict = district === 'OTHER' ? customDistrict.trim() : district;
  const resolvedCrop = crop === 'OTHER' ? customCrop.trim() : crop;

  const handlePredict = async (overrideRequest?: ClassificationRequest) => {
    const targetDistrict = overrideRequest ? overrideRequest.district_name : resolvedDistrict;
    const targetCrop = overrideRequest ? overrideRequest.crop_name : resolvedCrop;
    const targetSeason = overrideRequest ? overrideRequest.season : season;
    const targetArea = overrideRequest ? overrideRequest.area : area;

    if (!targetDistrict) {
      setErrorMessage('Please specify a valid district.');
      return;
    }
    if (!targetCrop) {
      setErrorMessage('Please specify a valid crop species.');
      return;
    }
    if (!targetArea || targetArea <= 0) {
      setErrorMessage('Cultivated area must be a positive number (greater than 0).');
      return;
    }

    setErrorMessage(null);
    setLoading(true);
    setProgressStatus('Submitting feature parameters to FastAPI server...');

    const payload: ClassificationRequest = {
      district_name: targetDistrict,
      crop_name: targetCrop,
      season: targetSeason,
      area: Number(targetArea)
    };

    try {
      const res = await predictAgriculturalRisk(payload, (status) => {
        setProgressStatus(status);
      });

      setResult(res);

      // Save to history
      const newRecord: QueryHistoryRecord = {
        id: `rec-${Date.now()}`,
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
      setErrorMessage(err.message || 'An unexpected error occurred during prediction.');
    } finally {
      setLoading(false);
      setProgressStatus('');
    }
  };

  const applyPreset = (preset: PresetScenario) => {
    const req = preset.request;
    setDistrict(req.district_name);
    setCrop(req.crop_name);
    setSeason(req.season);
    setArea(req.area);
    handlePredict(req);
  };

  const handleApplyRecommendation = (recommendedCropName: string) => {
    setCrop(recommendedCropName);
    const updatedRequest: ClassificationRequest = {
      district_name: resolvedDistrict,
      crop_name: recommendedCropName,
      season: season,
      area: area
    };
    handlePredict(updatedRequest);
  };

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto">
      
      {/* Top Title & Presets */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">ML Model 1</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold border border-emerald-300">
                Decision Tree Classifier
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
              Agricultural Risk Classifier
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select agro-climatic coordinates to evaluate multi-factor environmental risk and identify resilient alternatives.
            </p>
          </div>

          {/* Render container status pill */}
          <div className="flex items-center gap-2 text-xs font-mono bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
            <span className={`w-2.5 h-2.5 rounded-full ${serverOnline ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
            <span className="text-slate-600">API Endpoint:</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px]" title="https://cropguard-ai-api.onrender.com/predict">
              cropguard-ai-api.onrender.com
            </span>
          </div>
        </div>

        {/* Quick Test Presets */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Quick Validation Presets
            </span>
            <span className="text-[11px] text-slate-400">Click to run instant inference</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PRESET_SCENARIOS.map((p) => (
              <button
                key={p.id}
                id={`btn-${p.id}`}
                onClick={() => applyPreset(p)}
                disabled={loading}
                className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm text-left transition-all group disabled:opacity-60"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">
                    {p.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {p.badge}
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
              <h3 className="text-base font-bold text-slate-900">Pre-Sowing Parameters</h3>
              <p className="text-xs text-slate-500">Provide the 4 required farm and regional parameters</p>
            </div>

            {/* Parameter 1: District */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  District Name
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Historical reference block</span>
              </label>

              <select
                id="select-district"
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
                  id="input-custom-district"
                  type="text"
                  placeholder="Enter district name (e.g. Warangal Rural)"
                  value={customDistrict}
                  onChange={(e) => setCustomDistrict(e.target.value)}
                  className="w-full mt-1.5 px-3 py-2 text-sm border border-emerald-400 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              )}
            </div>

            {/* Parameter 2: Proposed Crop */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  Crop Species
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Proposed cultivation</span>
              </label>

              <select
                id="select-crop"
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
                  id="input-custom-crop"
                  type="text"
                  placeholder="Enter crop name (e.g. Mustard, Sesame)"
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
                    id={`season-btn-${s.value.toLowerCase()}`}
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
                  Cultivated Land Area (Hectares)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-700">
                  {area} ha (≈ {(area * 2.471).toFixed(1)} acres)
                </span>
              </div>

              <div className="relative">
                <input
                  id="input-area"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5000"
                  value={area}
                  onChange={(e) => setArea(parseFloat(e.target.value) || 0.1)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:bg-white font-mono"
                />
              </div>

              {/* Quick Area Preset Chips */}
              <div className="flex items-center gap-1.5 pt-1">
                {[1.0, 2.5, 5.0, 10.0].map((val) => (
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
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>{errorMessage}</div>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="btn-submit-prediction"
              onClick={() => handlePredict()}
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-950/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Computing Agricultural Risk...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  <span>Evaluate Risk for {resolvedCrop}</span>
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
                  If container was asleep, initial wake-up can take ~20-30s. The application will automatically fall back if network times out.
                </div>
              </div>
            )}
          </div>

          {/* Quick Query History Accordion / List */}
          {history.length > 0 && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Session Query Log
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
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        h.result.risk_level === 'Low Risk'
                          ? 'bg-emerald-100 text-emerald-800'
                          : h.result.risk_level === 'Moderate Risk'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {h.result.risk_level}
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
              
              {/* Notice Banner (If simulated or fallback) */}
              {result.message && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <strong className="font-semibold">Notice: </strong>
                    {result.message}
                  </div>
                </div>
              )}

              {/* Latency / Service attribution badge */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>
                    Inference Complete {result.latency_ms ? `in ${result.latency_ms}ms` : ''}
                  </span>
                </div>
                <span className="font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {result.is_simulated ? 'Embedded Agro-Engine' : 'FastAPI Live Cloud'}
                </span>
              </div>

              {/* Component 1: Risk Probability Gauge & Badge */}
              <RiskMeter
                riskLevel={result.risk_level}
                riskProbability={result.risk_probability}
                cropName={result.input_summary?.crop_name || resolvedCrop}
                districtName={result.input_summary?.district_name || resolvedDistrict}
              />

              {/* Component 2: 4 Contributing Stress Drivers */}
              <ContributingFactors
                factors={
                  (result.contributing_factors as Record<string, string>) || {}
                }
              />

              {/* Component 3: Content-Based Recommended Alternative Crop */}
              {result.recommended_crop && (
                <CropRecommendationCard
                  currentCrop={result.input_summary?.crop_name || resolvedCrop}
                  currentRiskProb={result.risk_probability}
                  recommendation={result.recommended_crop}
                  onApplyRecommendation={handleApplyRecommendation}
                />
              )}

              {/* Cross-Model Action Bridge: Forecast Yield */}
              {onNavigateToYield && (
                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-0.5 text-center sm:text-left">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-center sm:justify-start gap-1.5">
                      <Sprout className="w-4 h-4 text-emerald-700" />
                      <span>Ready to forecast expected harvest volume?</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Predict tonnes/hectare and calculate gross market revenue with the Random Forest Regression Model.
                    </p>
                  </div>

                  <button
                    id="btn-bridge-to-yield"
                    onClick={() => {
                      onNavigateToYield(
                        resolvedDistrict,
                        result.recommended_crop?.crop || resolvedCrop,
                        season,
                        area
                      );
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                  >
                    <span>Forecast Yield for {result.recommended_crop?.crop || resolvedCrop}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* Empty State */
            <div className="p-12 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto text-emerald-600">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="max-w-sm mx-auto space-y-1">
                <h4 className="text-base font-bold text-slate-800">Awaiting Farm Input</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Select your district, proposed crop species, and season on the left, or choose a preset to evaluate agro-climatic risk.
                </p>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => applyPreset(PRESET_SCENARIOS[0])}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run Sample: Rice in Karimnagar</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
