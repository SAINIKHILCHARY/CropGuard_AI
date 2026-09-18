import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Building, Users, Sprout } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface ContactViewProps {
  language: Language;
}

export const ContactView: React.FC<ContactViewProps> = ({ language }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    district: 'Karimnagar',
    category: 'farmer',
    message: ''
  });

  const t = TRANSLATIONS[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-10 py-8 max-w-5xl mx-auto">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Sprout className="w-3.5 h-3.5" />
          <span>{language === 'te' ? 'సంప్రదించండి & సహాయం' : 'Advisory & Support'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          {t.navContact}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          {language === 'te'
            ? 'రైతులు, వ్యవసాయ అధికారులు (AEO), ఎఫ్‌పిఒలు (FPO) మరియు పరిశోధకుల కోసం CropGuard AI సలహా మరియు సాంకేతిక సహాయం.'
            : 'Connect with CropGuard AI agronomists, model researchers, or integrate API decision engines into Farmer Producer Organizations (FPOs).'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-stone-900 text-white space-y-6 shadow-md">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                CropGuard AI
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {language === 'te' ? 'తెలంగాణ అగ్రి-హబ్' : 'Telangana Agri-Intelligence Hub'}
              </h3>
            </div>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">
                    {language === 'te' ? 'ప్రధాన కేంద్రం' : 'Regional Coordination Center'}
                  </strong>
                  <span>Agro-Innovation Hub, Hyderabad, Telangana 500001, India</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">
                    {language === 'te' ? 'ఈమెయిల్ సంప్రదింపు' : 'Agronomy Inquiries'}
                  </strong>
                  <span className="font-mono text-stone-300">support@cropguard.telangana.ai</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">
                    {language === 'te' ? 'కిసాన్ హెల్ప్‌లైన్ (టోల్ ఫ్రీ)' : 'National Kisan Helpline'}
                  </strong>
                  <span className="font-mono text-amber-300 font-bold text-sm">1800-180-1551 (Toll Free)</span>
                  <span className="block text-[11px] text-stone-400">All India 24/7 Farmer Call Center</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-2">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                {language === 'te' ? 'సేవలు ఎవరికి అందుబాటులో ఉన్నాయి?' : 'Supported Stakeholders'}
              </span>
              <ul className="text-xs text-stone-300 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'te' ? 'రైతులు మరియు కౌలు రైతులు' : 'Farmers & Smallholder Cultivators'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'te' ? 'రైతు ఉత్పత్తిదారుల సంఘాలు (FPOs)' : 'Farmer Producer Organizations (FPOs)'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'te' ? 'వ్యవసాయ విస్తరణ అధికారులు (AEOs)' : 'Agricultural Extension Officers'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{language === 'te' ? 'వ్యవసాయ విశ్వవిద్యాలయాలు మరియు పరిశోధకులు' : 'University Agro-Researchers'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-stone-900">
                    {language === 'te' ? 'మీ సందేశం అందింది' : 'Inquiry Received'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
                    {language === 'te'
                      ? `ధన్యవాదాలు, ${formData.name || 'మిత్రమా'}. మీ విచారణను మా వ్యవసాయ సలహాదారు పరిశీలించి త్వరలో సంప్రదిస్తారు.`
                      : `Thank you, ${formData.name || 'Friend'}. An agronomic advisor will review your query and follow up shortly.`}
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
                >
                  {language === 'te' ? 'మరో సందేశం పంపండి' : 'Send Another Inquiry'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 pb-2 border-b border-stone-100">
                  {language === 'te' ? 'సందేహాన్ని పంపండి' : 'Send an Agronomic Inquiry'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">
                      {language === 'te' ? 'మీ పేరు' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'te' ? 'రమేష్ రెడ్డి' : 'e.g. Ramesh Reddy'}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">
                      {language === 'te' ? 'ఈమెయిల్ / ఫోన్' : 'Email or Phone'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="farmer@domain.com"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">
                      {language === 'te' ? 'మీ జిల్లా' : 'District'}
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="e.g. Karimnagar"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700">
                      {language === 'te' ? 'మీ విభాగం' : 'Role / Affiliation'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="farmer">{language === 'te' ? 'రైతు (Farmer)' : 'Farmer / Cultivator'}</option>
                      <option value="fpo">{language === 'te' ? 'రైతు సంఘం (FPO)' : 'FPO Representative'}</option>
                      <option value="officer">{language === 'te' ? 'వ్యవసాయ అధికారి' : 'Agricultural Officer'}</option>
                      <option value="research">{language === 'te' ? 'పరిశోధకుడు' : 'Agro-Researcher / Student'}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    {language === 'te' ? 'మీ ప్రశ్న లేదా సందేశం' : 'Your Query or Feedback'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'te' ? 'మీ సందేహం లేదా సూచనను ఇక్కడ వ్రాయండి...' : 'Describe your farm query, crop questions, or integration requirements...'}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-300 text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'te' ? 'సందేశం పంపండి' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
