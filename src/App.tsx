import React, { useState, useEffect } from 'react';
import {
  ActiveTab,
  UserProfile,
  ClassificationRequest,
  YieldPredictionRequest,
  Language
} from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomeView } from './views/HomeView';
import { ClassifierView } from './views/ClassifierView';
import { YieldPredictorView } from './views/YieldPredictorView';
import { InsightsView } from './views/InsightsView';
import { CropsView } from './views/CropsView';
import { HowItWorksView } from './views/HowItWorksView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { checkBackendHealth } from './services/classificationApi';
import { checkYieldBackendHealth } from './services/yieldApi';

const USER_STORAGE_KEY = 'cropguard_active_user';
const LANG_STORAGE_KEY = 'cropguard_language';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const validTabs: ActiveTab[] = [
      'home',
      'classify',
      'yield',
      'insights',
      'crops',
      'how-it-works',
      'about',
      'contact'
    ];
    if (validTabs.includes(hash as ActiveTab)) {
      return hash as ActiveTab;
    }
    return 'home';
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'te' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [serverOnline, setServerOnline] = useState<boolean>(true);

  // Cross-view parameter transfer state
  const [classifierPrefill, setClassifierPrefill] = useState<ClassificationRequest | null>(null);
  const [yieldPrefill, setYieldPrefill] = useState<YieldPredictionRequest | null>(null);

  // Persist language selection
  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch (e) {
      console.warn('Failed to save language choice', e);
    }
  };

  // Sync hash routing
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validTabs: ActiveTab[] = [
        'home',
        'classify',
        'yield',
        'insights',
        'crops',
        'how-it-works',
        'about',
        'contact'
      ];
      if (validTabs.includes(hash as ActiveTab)) {
        setActiveTab(hash as ActiveTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check remote backend health on mount and periodically
  useEffect(() => {
    let isMounted = true;
    const verifyHealth = async () => {
      const [classStatus, yieldStatus] = await Promise.all([
        checkBackendHealth(),
        checkYieldBackendHealth()
      ]);
      if (isMounted) {
        setServerOnline(classStatus.online || yieldStatus.online);
      }
    };

    verifyHealth();
    const interval = setInterval(verifyHealth, 35000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleLoginSuccess = (newUser: UserProfile) => {
    setUser(newUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.warn('Failed to save user session', e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear user session', e);
    }
  };

  const handleTransferToClassifier = (
    district: string,
    crop: string,
    season: string,
    area: number
  ) => {
    setClassifierPrefill({
      district_name: district,
      crop_name: crop,
      season: season,
      area: area
    });
    setActiveTab('classify');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTransferToYield = (
    district: string,
    crop: string,
    season: string,
    area: number
  ) => {
    setYieldPrefill({
      district_name: district,
      crop_name: crop,
      season: season,
      area: area
    });
    setActiveTab('yield');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans antialiased selection:bg-emerald-600 selection:text-white">
      {/* Navigation Header with Language Switcher and Status */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        serverOnline={serverOnline}
        language={language}
        setLanguage={handleSetLanguage}
      />

      {/* Main Content View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            serverOnline={serverOnline}
            language={language}
            onTransferToClassifier={handleTransferToClassifier}
            onTransferToYield={handleTransferToYield}
          />
        )}
        {activeTab === 'classify' && (
          <ClassifierView
            serverOnline={serverOnline}
            initialParams={classifierPrefill}
            onNavigateToYield={handleTransferToYield}
            language={language}
          />
        )}
        {activeTab === 'yield' && (
          <YieldPredictorView
            serverOnline={serverOnline}
            setActiveTab={setActiveTab}
            onTransferToClassifier={handleTransferToClassifier}
            initialParams={yieldPrefill}
            language={language}
          />
        )}
        {activeTab === 'insights' && (
          <InsightsView
            language={language}
            setActiveTab={setActiveTab}
            onTransferToClassifier={handleTransferToClassifier}
            onTransferToYield={handleTransferToYield}
          />
        )}
        {activeTab === 'crops' && (
          <CropsView
            language={language}
            setActiveTab={setActiveTab}
            onTransferToClassifier={handleTransferToClassifier}
            onTransferToYield={handleTransferToYield}
          />
        )}
        {activeTab === 'how-it-works' && (
          <HowItWorksView
            language={language}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'about' && (
          <AboutView
            setActiveTab={setActiveTab}
            language={language}
          />
        )}
        {activeTab === 'contact' && (
          <ContactView
            language={language}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        serverOnline={serverOnline}
        language={language}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
