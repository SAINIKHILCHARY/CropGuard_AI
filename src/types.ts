export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk';
export type Language = 'en' | 'te';

export interface ClassificationRequest {
  district_name: string;
  crop_name: string;
  season: string;
  area: number;
}

export interface ContributingFactorItem {
  name: string;
  contribution: 'High' | 'Medium' | 'Low' | string;
  description: string;
  category: 'climate' | 'irrigation' | 'historical' | 'market';
}

export interface RecommendedCropInfo {
  crop: string;
  risk_level: RiskLevel;
  risk_probability: number;
  recommendation_score?: number;
  reason?: string;
  yield_advantage?: string;
}

export interface ClassificationResponse {
  risk_level: RiskLevel;
  risk_probability: number;
  contributing_factors?: Record<string, string> | ContributingFactorItem[];
  recommended_crop?: RecommendedCropInfo;
  input_summary?: ClassificationRequest;
  message?: string;
  is_simulated?: boolean;
  latency_ms?: number;
}

export interface QueryHistoryRecord {
  id: string;
  timestamp: number;
  input: ClassificationRequest;
  result: ClassificationResponse;
}

// Model 2: Yield Prediction Types
export interface YieldPredictionRequest {
  district_name: string;
  crop_name: string;
  season: string;
  area: number;
}

export interface YieldPredictionResponse {
  prediction: number;
  unit: string;
  estimated_total_production: number;
  production_unit: string;
  district: string;
  crop: string;
  season: string;
  farmer_area: number;
  area_unit: string;
  historical_reference_year?: string;
  is_simulated?: boolean;
  latency_ms?: number;
  message?: string;
}

export interface YieldHistoryRecord {
  id: string;
  timestamp: number;
  input: YieldPredictionRequest;
  result: YieldPredictionResponse;
}

export interface DistrictProfile {
  id: string;
  name: string;
  nameTe: string;
  zone: 'Northern' | 'Central' | 'Southern';
  majorCrops: string[];
  avgYield: number; // tonnes/ha
  avgProduction: number; // thousand tonnes
  normalRainfall: number; // mm
  irrigationPct: number; // %
  primaryIrrigation: string;
  soilTypes: string[];
  hq: string;
  description: string;
}

export interface CropProfile {
  id: string;
  name: string;
  nameTe: string;
  category: 'Cereals' | 'Commercial' | 'Pulses' | 'Oilseeds' | 'Horticulture';
  seasons: ('Kharif' | 'Rabi' | 'Whole Year')[];
  avgYield: number; // tonnes/ha
  typicalYieldRange: string;
  waterNeed: 'High' | 'Medium' | 'Low';
  soilSuitability: string;
  mspPerQuintal: number;
  riskTendency: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  image: string;
  description: string;
}

export interface PresetScenario {
  id: string;
  title: string;
  description: string;
  badge: string;
  request: ClassificationRequest;
}

export interface YieldPresetScenario {
  id: string;
  title: string;
  description: string;
  badge: string;
  request: YieldPredictionRequest;
  expectedYield?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'agronomist' | 'researcher' | 'analyst';
  district?: string;
  phone?: string;
  organization?: string;
}

export type ActiveTab =
  | 'home'
  | 'classify'
  | 'yield'
  | 'insights'
  | 'crops'
  | 'how-it-works'
  | 'about'
  | 'contact';

