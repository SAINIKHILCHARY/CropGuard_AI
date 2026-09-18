import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    appName: 'CropGuard AI',
    tagline: 'Smart Farming for a Stronger Telangana',
    navHome: 'Home',
    navClassifier: 'Risk Classifier',
    navYield: 'Yield Predictor',
    navInsights: 'Telangana Insights',
    navCrops: 'Crops & Seasons',
    navHowItWorks: 'How It Works',
    navAbout: 'About & Science',
    navContact: 'Contact',
    signIn: 'Farmer Sign In',
    signOut: 'Sign Out',
    apiActive: 'FastAPI Active',
    apiStandby: 'FastAPI Standby',

    // Hero
    heroTitle: 'AI-Powered Agriculture for a Stronger Telangana',
    heroSubtitle:
      'Make smarter cultivation decisions with machine learning-powered crop risk assessment and yield prediction designed for Telangana agriculture.',
    btnCheckRisk: 'Check Crop Risk',
    btnPredictYield: 'Predict Crop Yield',
    btnExploreMap: 'Explore Telangana Map',

    // Trust Indicators
    statRecords: '10,708 Agricultural Records',
    statDistricts: '32 Telangana Districts',
    statYears: '9 Agricultural Years',
    statModels: '2 ML Models',
    statRecordsDesc: 'Validated micro-level farm data',
    statDistrictsDesc: 'From Adilabad to Gadwal',
    statYearsDesc: '2014–2015 through 2022–2023',
    statModelsDesc: 'Classification + Regression',

    // Sections
    secMapTitle: 'Explore Agriculture Across Telangana',
    secMapSubtitle:
      'Select any district to inspect agro-climatic zones, primary crops, average productivity, and irrigation coverage.',
    secDashboardTitle: 'Telangana Agricultural Dashboard',
    secDashboardSubtitle:
      'Interactive crop production, district yield rankings, and agro-meteorological patterns from the 10,708-record baseline.',
    secHowItWorksTitle: 'Simple 3-Step Agricultural Workflow',
    secHowItWorksSubtitle:
      'From farmer input to machine learning inference and actionable agronomic guidance.',

    // Classifier Form
    classifierTitle: 'Agricultural Risk Assessment',
    classifierSubtitle:
      'Assess the historical agricultural risk associated with your selected district, crop and season before cultivation.',
    labelDistrict: 'District',
    labelCrop: 'Crop',
    labelSeason: 'Season',
    labelArea: 'Area (Hectares)',
    selectDistrict: 'Select Telangana District',
    selectCrop: 'Select Crop Species',
    selectSeason: 'Select Cultivation Season',
    btnPredictRisk: 'Predict Crop Risk',
    btnPredicting: 'Analyzing Agro-Climatic Data...',

    // Classifier Results
    resultTitle: 'Crop Risk Assessment Result',
    predictedRisk: 'Predicted Risk Level',
    riskProbability: 'Risk Probability',
    contributingFactors: 'Main Contributing Factors',
    contributingDisclaimer:
      'Contributing factors represent model-derived sensitivity indicators and historical deviation, not scientifically proven direct causation.',
    recommendedAlternative: 'Recommended Alternative Crop',
    recommendationReason:
      'Based on historical crop characteristics, district soil conditions, seasonal viability, and the ML recommendation model.',
    btnViewCropDetails: 'View Crop Details',
    btnForecastAltYield: 'Forecast Yield for this Alternative Crop',

    // Yield Predictor
    yieldTitle: 'Pre-Cultivation Crop Yield Predictor',
    yieldSubtitle:
      'Quantitative harvest volume forecasting based on historical district productivity and seasonal agro-climatic parameters.',
    btnPredictHarvestYield: 'Predict Crop Yield',
    predictedYield: 'Predicted Yield',
    estimatedProduction: 'Estimated Total Production',
    referenceYear: 'Historical Reference Year',
    tonnesPerHa: 'tonnes / hectare',
    tonnes: 'tonnes',
    quintals: 'quintals',
    mandiCalculatorTitle: 'Telangana Mandi MSP Harvest Valuation',
    mandiCalculatorDesc:
      'Estimated gross crop harvest value computed using official Government Minimum Support Price (MSP) benchmarks.',
    estimatedGrossValue: 'Estimated Gross Harvest Value',

    // Risk levels
    lowRisk: 'Low Risk',
    moderateRisk: 'Moderate Risk',
    highRisk: 'High Risk',

    // Common
    loading: 'Loading...',
    retry: 'Retry Prediction',
    serviceUnavailable: 'CropGuard AI service is temporarily unavailable. Please try again.',
    builtForTelangana: 'Built for Telangana Agriculture',
    allRightsReserved: 'All rights reserved. AI-assisted agricultural decision support.'
  },
  te: {
    // Navigation
    appName: 'క్రాప్‌గార్డ్ AI',
    tagline: 'బలమైన తెలంగాణ కోసం స్మార్ట్ వ్యవసాయం',
    navHome: 'హోమ్',
    navClassifier: 'పంట రిస్క్ అంచనా',
    navYield: 'దిగుబడి అంచనా',
    navInsights: 'తెలంగాణ సమాచారం',
    navCrops: 'పంటలు & కాలాలు',
    navHowItWorks: 'ఎలా పనిచేస్తుంది',
    navAbout: 'విజ్ఞానం & మోడల్',
    navContact: 'సంప్రదించండి',
    signIn: 'రైతు లాగిన్',
    signOut: 'లాగ్ అవుట్',
    apiActive: 'FastAPI ఆన్లైన్',
    apiStandby: 'FastAPI సిద్ధంగా ఉంది',

    // Hero
    heroTitle: 'బలమైన తెలంగాణ కోసం ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ఆధారిత వ్యవసాయం',
    heroSubtitle:
      'తెలంగాణ వ్యవసాయం కోసం రూపొందించిన మెషిన్ లెర్నింగ్ ఆధారిత పంట రిస్క్ మరియు దిగుబడి అంచనాతో సరైన సాగు నిర్ణయాలు తీసుకోండి.',
    btnCheckRisk: 'పంట రిస్క్ తనిఖీ చేయండి',
    btnPredictYield: 'దిగుబడిని అంచనా వేయండి',
    btnExploreMap: 'తెలంగాణ మ్యాప్ చూడండి',

    // Trust Indicators
    statRecords: '10,708 వ్యవసాయ రికార్డులు',
    statDistricts: '32 తెలంగాణ జిల్లాలు',
    statYears: '9 వ్యవసాయ సంవత్సరాలు',
    statModels: '2 ML మోడల్స్',
    statRecordsDesc: 'ప్రామాణిక వ్యవసాయ డేటాబేస్',
    statDistrictsDesc: 'ఆదిలాబాద్ నుండి గద్వాల వరకు',
    statYearsDesc: '2014–2015 నుండి 2022–2023 వరకు',
    statModelsDesc: 'క్లాసిఫికేషన్ + రిగ్రెషన్',

    // Sections
    secMapTitle: 'తెలంగాణ వ్యాప్తంగా వ్యవసాయ సమాచారం',
    secMapSubtitle:
      'ఏదైనా జిల్లాను ఎంచుకుని ఆ ప్రాంతం పంటలు, సగటు దిగుబడి, వర్షపాతం మరియు సాగునీటి సౌకర్యాలను చూడండి.',
    secDashboardTitle: 'తెలంగాణ వ్యవసాయ డ్యాష్‌బోర్డ్',
    secDashboardSubtitle:
      '10,708 రికార్డుల ఆధారంగా పంట ఉత్పత్తి, జిల్లా దిగుబడి ర్యాంకింగ్స్ మరియు వాతావరణ పోకడలు.',
    secHowItWorksTitle: 'సులభమైన 3-దశల వ్యవసాయ విధానం',
    secHowItWorksSubtitle:
      'రైతు వివరాలు నమోదు చేయడం నుండి మెషిన్ లెర్నింగ్ విశ్లేషణ మరియు ఆచరణాత్మక సలహాలు పొందడం వరకు.',

    // Classifier Form
    classifierTitle: 'వ్యవసాయ పంట రిస్క్ అంచనా',
    classifierSubtitle:
      'సాగు ప్రారంభించే ముందే మీ జిల్లా, పంట మరియు కాలానికి సంబంధించిన చారిత్రక వ్యవసాయ రిస్క్‌ను విశ్లేషించండి.',
    labelDistrict: 'జిల్లా',
    labelCrop: 'పంట',
    labelSeason: 'కాలం (సీజన్)',
    labelArea: 'విస్తీర్ణం (హెక్టార్లు)',
    selectDistrict: 'తెలంగాణ జిల్లాను ఎంచుకోండి',
    selectCrop: 'పంట రకాన్ని ఎంచుకోండి',
    selectSeason: 'సాగు కాలాన్ని ఎంచుకోండి',
    btnPredictRisk: 'రిస్క్ అంచనా వేయండి',
    btnPredicting: 'వివరాలను విశ్లేషిస్తోంది...',

    // Classifier Results
    resultTitle: 'పంట రిస్క్ విశ్లేషణ ఫలితం',
    predictedRisk: 'అంచనా వేసిన రిస్క్ స్థాయి',
    riskProbability: 'రిస్క్ సంభావ్యత',
    contributingFactors: 'ముఖ్య ప్రభావ కారకాలు',
    contributingDisclaimer:
      'ఈ కారకాలు మోడల్ గణాంక విశ్లేషణ సూచికలు మాత్రమే; ఇవి శాస్త్రీయ ప్రత్యక్ష కారణాలు కావు.',
    recommendedAlternative: 'సిఫార్సు చేయబడిన ప్రత్యామ్నాయ పంట',
    recommendationReason:
      'చారిత్రక పంట లక్షణాలు, జిల్లా నేల పరిస్థితులు మరియు సీజన్ అనుకూలత ఆధారంగా సిఫార్సు చేయబడింది.',
    btnViewCropDetails: 'పంట వివరాలు చూడండి',
    btnForecastAltYield: 'ఈ ప్రత్యామ్నాయ పంట దిగుబడి అంచనా వేయండి',

    // Yield Predictor
    yieldTitle: 'సాగుకు ముందే పంట దిగుబడి అంచనా',
    yieldSubtitle:
      'చారిత్రక జిల్లా ఉత్పాదకత మరియు వాతావరణ పారామితుల ఆధారంగా ఆశించిన పంట దిగుబడి పరిమాణ అంచనా.',
    btnPredictHarvestYield: 'దిగుబడిని అంచనా వేయండి',
    predictedYield: 'అంచనా దిగుబడి',
    estimatedProduction: 'మొత్తం అంచనా ఉత్పత్తి',
    referenceYear: 'చారిత్రక రిఫరెన్స్ సంవత్సరం',
    tonnesPerHa: 'టన్నులు / హెక్టారుకు',
    tonnes: 'టన్నులు',
    quintals: 'క్వింటాళ్ళు',
    mandiCalculatorTitle: 'తెలంగాణ మార్కెట్ MSP ఆదాయ గణన',
    mandiCalculatorDesc:
      'ప్రభుత్వ కనీస మద్దతు ధర (MSP) ప్రమాణాలతో అంచనా వేయబడిన స్థూల పంట రాబడి.',
    estimatedGrossValue: 'అంచనా వేసిన స్థూల రాబడి',

    // Risk levels
    lowRisk: 'తక్కువ రిస్క్ (సురక్షితం)',
    moderateRisk: 'మధ్యస్థ రిస్క్',
    highRisk: 'అధిక రిస్క్',

    // Common
    loading: 'లోడ్ అవుతోంది...',
    retry: 'మళ్ళీ ప్రయత్నించండి',
    serviceUnavailable: 'క్రాప్‌గార్డ్ AI సర్వర్ తాత్కాలికంగా అందుబాటులో లేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    builtForTelangana: 'తెలంగాణ వ్యవసాయం కోసం ప్రత్యేకంగా రూపొందించబడింది',
    allRightsReserved: 'సర్వహక్కులు ప్రత్యేకించబడ్డాయి. AI-ఆధారిత వ్యవసాయ నిర్ణయ వేదిక.'
  }
};
