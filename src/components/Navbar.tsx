import React, { useState } from 'react';
import {
  Sprout,
  ShieldAlert,
  TrendingUp,
  MapPin,
  Wheat,
  Workflow,
  Info,
  PhoneCall,
  User,
  CheckCircle2,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { ActiveTab, UserProfile, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  serverOnline: boolean;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  onOpenAuth,
  onLogout,
  serverOnline,
  language,
  setLanguage
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; isHot?: boolean }[] = [
    { id: 'home', label: t.navHome, icon: <Sprout className="w-4 h-4" /> },
    {
      id: 'classify',
      label: t.navClassifier,
      icon: <ShieldAlert className="w-4 h-4" />,
      isHot: true
    },
    {
      id: 'yield',
      label: t.navYield,
      icon: <TrendingUp className="w-4 h-4" />,
      isHot: true
    },
    { id: 'insights', label: t.navInsights, icon: <MapPin className="w-4 h-4" /> },
    { id: 'crops', label: t.navCrops, icon: <Wheat className="w-4 h-4" /> },
    { id: 'how-it-works', label: t.navHowItWorks, icon: <Workflow className="w-4 h-4" /> },
    { id: 'about', label: t.navAbout, icon: <Info className="w-4 h-4" /> },
    { id: 'contact', label: t.navContact, icon: <PhoneCall className="w-4 h-4" /> }
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs text-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Telangana Tagline */}
          <button
            id="nav-brand-btn"
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-3 group text-left focus:outline-hidden cursor-pointer shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform border border-emerald-500/30">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-stone-900 tracking-tight flex items-center">
                  CropGuard<span className="text-emerald-700 ml-0.5">AI</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300/80">
                  Telangana
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium">
                {language === 'te'
                  ? 'బలమైన తెలంగాణ కోసం స్మార్ట్ వ్యవసాయం'
                  : 'Smart Farming for a Stronger Telangana'}
              </p>
            </div>
          </button>

          {/* Center Nav Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1 bg-stone-100/80 p-1 rounded-2xl border border-stone-200/70">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}-btn`}
                  onClick={() => handleSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/80'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-emerald-700'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {item.isHot && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? 'bg-amber-300' : 'bg-emerald-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Area: Language Switcher, API Status, Farmer Auth & Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Button (English | తెలుగు) */}
            <div className="inline-flex rounded-xl bg-stone-100 p-0.5 border border-stone-200 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-white text-emerald-800 shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                  language === 'te'
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                తెలుగు
              </button>
            </div>

            {/* Live API Status indicator */}
            <div
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-medium text-emerald-900"
              title="FastAPI Render Backend Active"
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    serverOnline ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    serverOnline ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </span>
              <span>{serverOnline ? t.apiActive : t.apiStandby}</span>
            </div>

            {/* Farmer Auth Area */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-stone-900 leading-tight">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-emerald-700 capitalize font-medium">
                    {user.role} {user.district ? `• ${user.district}` : ''}
                  </span>
                </div>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-rose-700 bg-stone-100 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  {t.signOut}
                </button>
              </div>
            ) : (
              <button
                id="nav-login-btn"
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.signIn}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors text-left ${
                    isActive
                      ? 'bg-emerald-700 text-white font-bold'
                      : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-emerald-700'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>FastAPI Backend: {serverOnline ? 'Connected' : 'Standby'}</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-800">
              Telangana AgriTech
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
