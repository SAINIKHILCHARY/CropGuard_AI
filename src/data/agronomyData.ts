import { ClassificationRequest, YieldPredictionRequest } from '../types';

export const DISTRICTS = [
  'Adilabad',
  'Bhadradri Kothagudem',
  'Hyderabad',
  'Jagtial',
  'Jangaon',
  'Jayashankar Bhupalpally',
  'Jogulamba Gadwal',
  'Kamareddy',
  'Karimnagar',
  'Khammam',
  'Kumuram Bheem Asifabad',
  'Mahabubabad',
  'Mahbubnagar',
  'Mancherial',
  'Medak',
  'Medchal Malkajgiri',
  'Mulugu',
  'Nagarkurnool',
  'Nalgonda',
  'Narayanpet',
  'Nirmal',
  'Nizamabad',
  'Peddapalli',
  'Rajanna Sircilla',
  'Ranga Reddy',
  'Sangareddy',
  'Siddipet',
  'Suryapet',
  'Vikarabad',
  'Wanaparthy',
  'Warangal',
  'Warangal Rural',
  'Warangal Urban',
  'Yadadri Bhuvanagiri',
  'Guntur',
  'Krishna',
  'Kurnool',
  'Anantapur',
  'East Godavari',
  'West Godavari',
  'Prakasam',
  'Nellore',
  'Visakhapatnam'
];

export const CROPS = [
  'Rice',
  'Cotton',
  'Maize',
  'Groundnut',
  'Gram',
  'Soyabean',
  'Sugarcane',
  'Bajra',
  'Jowar',
  'Arhar/Tur',
  'Moong(Green Gram)',
  'Urad',
  'Sweet Potato',
  'Wheat',
  'Sunflower',
  'Castor seed',
  'Onion',
  'Potato',
  'Banana',
  'Chilli',
  'Turmeric'
];

export const SEASONS = [
  { value: 'Kharif', label: 'Kharif (Monsoon)', timing: 'June – October', icon: 'cloud-rain' },
  { value: 'Rabi', label: 'Rabi (Winter)', timing: 'October – March', icon: 'snowflake' },
  { value: 'Whole Year', label: 'Whole Year (Perennial)', timing: 'All Seasons', icon: 'sun' }
];

export interface PresetScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  request: ClassificationRequest;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'preset-rice-karimnagar',
    title: 'Rice in Karimnagar',
    badge: 'Kharif • Canal-fed',
    description: 'High water requirement staple during monsoon with regulated reservoir access.',
    request: {
      district_name: 'Karimnagar',
      crop_name: 'Rice',
      season: 'Kharif',
      area: 2.5
    }
  },
  {
    id: 'preset-cotton-warangal',
    title: 'Cotton in Warangal',
    badge: 'Kharif • Rain-fed',
    description: 'Cash crop sensitive to mid-season dry spells and pest vulnerability.',
    request: {
      district_name: 'Warangal',
      crop_name: 'Cotton',
      season: 'Kharif',
      area: 4.0
    }
  },
  {
    id: 'preset-maize-khammam',
    title: 'Maize in Khammam',
    badge: 'Rabi • Semi-irrigated',
    description: 'Winter cereal crop with stable market demand and moderate moisture dependency.',
    request: {
      district_name: 'Khammam',
      crop_name: 'Maize',
      season: 'Rabi',
      area: 1.8
    }
  },
  {
    id: 'preset-groundnut-mahbubnagar',
    title: 'Groundnut in Mahbubnagar',
    badge: 'Rabi • Semi-arid',
    description: 'Leguminous oilseed suited for red sandy soils with drought resistance.',
    request: {
      district_name: 'Mahbubnagar',
      crop_name: 'Groundnut',
      season: 'Rabi',
      area: 3.2
    }
  }
];

export interface YieldPresetScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  expectedYield: string;
  request: YieldPredictionRequest;
}

export const YIELD_PRESETS: YieldPresetScenario[] = [
  {
    id: 'yp-rice-nalgonda',
    title: 'Rice in Nalgonda',
    badge: 'Kharif • 2.5 ha',
    description: 'Canal irrigation basin in Nalgonda; highly predictable baseline yield.',
    expectedYield: '≈ 3.37 t/ha',
    request: {
      district_name: 'Nalgonda',
      crop_name: 'Rice',
      season: 'Kharif',
      area: 2.5
    }
  },
  {
    id: 'yp-maize-khammam',
    title: 'Maize in Khammam',
    badge: 'Rabi • 1.5 ha',
    description: 'Fertile river basin soils with winter tube-well irrigation yielding high tonnage.',
    expectedYield: '≈ 7.18 t/ha',
    request: {
      district_name: 'Khammam',
      crop_name: 'Maize',
      season: 'Rabi',
      area: 1.5
    }
  },
  {
    id: 'yp-rice-karimnagar',
    title: 'Rice in Karimnagar',
    badge: 'Kharif • 3.0 ha',
    description: 'SRSP reservoir command area paddy cultivation.',
    expectedYield: '≈ 2.85 t/ha',
    request: {
      district_name: 'Karimnagar',
      crop_name: 'Rice',
      season: 'Kharif',
      area: 3.0
    }
  },
  {
    id: 'yp-soyabean-medak',
    title: 'Soyabean in Medak',
    badge: 'Kharif • 3.0 ha',
    description: 'Black cotton soil rainfed pulse with robust historical yield records.',
    expectedYield: '≈ 1.65 t/ha',
    request: {
      district_name: 'Medak',
      crop_name: 'Soyabean',
      season: 'Kharif',
      area: 3.0
    }
  },
  {
    id: 'yp-gram-adilabad',
    title: 'Gram in Adilabad',
    badge: 'Rabi • 3.0 ha',
    description: 'Winter pulse cultivation following monsoon harvest in Northern Telangana.',
    expectedYield: '≈ 1.71 t/ha',
    request: {
      district_name: 'Adilabad',
      crop_name: 'Gram',
      season: 'Rabi',
      area: 3.0
    }
  },
  {
    id: 'yp-sugarcane-khammam',
    title: 'Sugarcane in Khammam',
    badge: 'Kharif • 1.0 ha',
    description: 'Perennial heavy biomass crop with intensive canal water supply.',
    expectedYield: '≈ 93.08 t/ha',
    request: {
      district_name: 'Khammam',
      crop_name: 'Sugarcane',
      season: 'Kharif',
      area: 1.0
    }
  }
];

// Reference Minimum Support Prices (MSP) in INR per quintal (10 quintals = 1 tonne)
export const ESTIMATED_MSP_PER_QUINTAL: Record<string, number> = {
  rice: 2320,
  maize: 2225,
  sugarcane: 340,
  cotton: 7521,
  soyabean: 4892,
  groundnut: 6783,
  gram: 5650,
  bajra: 2625,
  jowar: 3371,
  'arhar/tur': 7550,
  'moong(green gram)': 8682,
  urad: 7400,
  sunflower: 7280,
  wheat: 2425,
  'sweet potato': 1850,
  potato: 1400,
  onion: 1600,
  banana: 1750,
  tobacco: 5200,
  'castor seed': 6200
};

export const CONTRIBUTING_FACTOR_METADATA: Record<
  string,
  { label: string; desc: string; category: 'climate' | 'irrigation' | 'historical' | 'market' }
> = {
  'Rainfall condition': {
    label: 'Rainfall Condition & Anomaly',
    desc: 'Deviation of seasonal precipitation from 10-year district moving averages.',
    category: 'climate'
  },
  'Historical instability': {
    label: 'Historical Yield Volatility',
    desc: 'Coefficient of variation in historical crop outputs across localized test blocks.',
    category: 'historical'
  },
  'Irrigation condition': {
    label: 'Irrigation & Groundwater Access',
    desc: 'Net irrigated farm area ratio and tubewell aquifer sustainability index.',
    category: 'irrigation'
  },
  'Historical yield trend': {
    label: 'Historical Production Trend',
    desc: 'Multi-year trajectory slope indicating whether yields have been rising or declining.',
    category: 'historical'
  }
};
