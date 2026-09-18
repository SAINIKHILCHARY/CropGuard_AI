import React, { useState } from 'react';
import { X, Sprout, Mail, Lock, User, Check, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'farmer' | 'agronomist' | 'researcher'>('farmer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedName = name.trim() || (isSignUp ? 'New Member' : email.split('@')[0] || 'Farmer Partner');
    const user: UserProfile = {
      id: `user-${Date.now()}`,
      name: resolvedName,
      email: email || 'farmer@cropguard.local',
      role: role,
      organization: role === 'agronomist' ? 'Regional Agro-Science Center' : 'Local Cultivator Syndicate'
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleQuickDemoLogin = (selectedRole: 'farmer' | 'agronomist' | 'researcher', demoName: string) => {
    const user: UserProfile = {
      id: `demo-${selectedRole}`,
      name: demoName,
      email: `${selectedRole}@cropguard.demo`,
      role: selectedRole,
      organization: selectedRole === 'agronomist' ? 'Telangana Agricultural University' : 'Karimnagar Agri Farmers FPO'
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        id="auth-modal"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">CropGuard AI Portal</h3>
              <p className="text-xs text-slate-400">
                {isSignUp ? 'Create your agronomic account' : 'Access your farm classification records'}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => setIsSignUp(false)}
              className={`py-2 rounded-lg transition-all ${!isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`py-2 rounded-lg transition-all ${isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Reddy"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Role / Affiliation</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {(['farmer', 'agronomist', 'researcher'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`py-2 px-2 rounded-lg border text-center capitalize transition-colors ${
                        role === r
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>{isSignUp ? 'Complete Registration' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 text-center">
              Or Fast-Track Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('farmer', 'Narsimha Rao (Farmer)')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Progressive Farmer</div>
                <div className="text-[10px] text-slate-500">Narsimha Rao • 3.5 ha</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('agronomist', 'Dr. Radhika Sharma')}
                className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all text-xs"
              >
                <div className="font-semibold text-slate-800">Extension Officer</div>
                <div className="text-[10px] text-slate-500">Dr. Radhika Sharma • KVK</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
