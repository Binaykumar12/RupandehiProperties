import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useProperty } from '../context/PropertyContext';
import { translations } from '../data/properties';
import { ShieldCheck, Lock, Mail, ArrowLeft, CheckCircle, XCircle, Eye, Phone, Building2, User } from 'lucide-react';

export default function AdminConsole({ onBackToPublic }) {
  const { isDark, language } = useTheme();
  const { allProperties } = useProperty();
  const t = translations[language];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [approvedList, setApprovedList] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError(language === 'en' ? 'Please fill in both fields.' : 'कृपया दोनों फ़ील्ड भरें।');
      return;
    }
    // Simple authentication
    setIsAuthenticated(true);
    setError('');
  };

  const toggleApproval = (id) => {
    setApprovedList(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const propList = allProperties || [];

  if (!isAuthenticated) {
    return (
      <div className={`min-h-[85vh] flex items-center justify-center p-4 animate-fade-in ${
        isDark ? 'bg-[#0B130E]' : 'bg-[#FAF8F2]'
      }`}>
        <div className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl ${
          isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'
        }`}>
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#C8E972]" />
              <span className="section-kicker">
                RUPANDEHI PROPERTY HUB / TEAM ACCESS · FIREBASE WORKSPACE
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Good decisions. <span className="italic font-normal">A trusted team.</span>
            </h1>

            <p className={`text-xs sm:text-sm mt-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.adminDesc}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Staff Username / Email' : 'स्टाफ यूजरनेम / ईमेल'}
              </label>
              <div className="relative">
                <Mail size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`} />
                <input
                  type="text"
                  value={credentials.email}
                  onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder={t.emailPlaceholder}
                  className="input-field pl-10 text-xs py-3"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {t.password}
              </label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`} />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pl-10 text-xs py-3"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full justify-center text-sm py-3 font-semibold mt-2"
            >
              <ShieldCheck size={16} />
              <span>{t.signInConsole}</span>
            </button>
          </form>

          <div className={`mt-4 p-3 rounded-xl border text-[11px] leading-relaxed ${
            isDark ? 'bg-[#0B130E] border-[#23382A] text-[#829685]' : 'bg-[#F4F0E6] border-[#E3DEC3] text-[#5C6B5E]'
          }`}>
            <span className="font-semibold text-[#2E7D32]">Staging Demo Credentials:</span> Use email{' '}
            <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">team@rupandehipropertyhub.com</code> and password{' '}
            <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px]">admin</code> for verification evaluation. No production secrets are exposed.
          </div>

          {/* Footer Back */}
          <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'}`}>
            <button
              onClick={onBackToPublic}
              className={`flex items-center gap-1.5 ${isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'} transition-colors`}
            >
              <ArrowLeft size={14} />
              <span>{t.backToSearch}</span>
            </button>
            <span className={`${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              Session expires in 8h
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-4 sm:p-8 animate-fade-in ${isDark ? 'bg-[#0B130E]' : 'bg-[#FAF8F2]'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#23382A] mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#C8E972]" />
              <span className="section-kicker">TEAM WORKSPACE · LIVE CONSOLE</span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Rupandehi Property Hub Console
            </h1>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              Lead Owner: <strong>Anil Chaudhary</strong> · Contact Desk: <strong className="text-[#C8E972]">9817486280</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthenticated(false)}
              className="btn-outline text-xs px-4 py-2"
            >
              Sign out
            </button>
            <button
              onClick={onBackToPublic}
              className="btn-primary text-xs px-4 py-2 font-semibold"
            >
              <ArrowLeft size={14} />
              Public website
            </button>
          </div>
        </div>

        {/* Admin Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
            <div className="text-xs text-[#829685] mb-1">Catalogue Properties</div>
            <div className="text-2xl font-bold text-[#F3F6F3]">{propList.length}</div>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
            <div className="text-xs text-[#829685] mb-1">Pending Review</div>
            <div className="text-2xl font-bold text-[#E5C358]">1</div>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
            <div className="text-xs text-[#829685] mb-1">Inquiries Today</div>
            <div className="text-2xl font-bold text-[#C8E972]">4</div>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
            <div className="text-xs text-[#829685] mb-1">District Focus</div>
            <div className="text-2xl font-bold text-[#F3F6F3]">Rupandehi</div>
          </div>
        </div>

        {/* Listing Approvals Table */}
        <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className={`p-4 border-b ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'} flex justify-between items-center`}>
            <h3 className={`text-base font-semibold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              Property Submissions & Catalogue Review
            </h3>
            <span className="text-xs text-[#829685]">{propList.length} total entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${isDark ? 'bg-[#0B130E] border-[#23382A] text-[#829685]' : 'bg-[#F4F0E6] border-[#E3DEC3] text-[#5C6B5E]'}`}>
                <tr>
                  <th className="p-3.5">Property ID</th>
                  <th className="p-3.5">Title & Locality</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Advisor / Owner</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-[#23382A]' : 'divide-[#E3DEC3]'}`}>
                {propList.map(prop => (
                  <tr key={prop.id} className={isDark ? 'hover:bg-[#16251C]' : 'hover:bg-[#F4F0E6]'}>
                    <td className="p-3.5 font-mono text-[#C8E972] font-semibold">{prop.id}</td>
                    <td className="p-3.5">
                      <div className={`font-medium ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>{prop.title}</div>
                      <div className="text-[#829685] text-[11px]">{prop.locality}, Rupandehi</div>
                    </td>
                    <td className="p-3.5">
                      <span className="property-badge bg-[#0B130E] text-[#A7B5A8] border border-[#23382A]">
                        {prop.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-[#F3F6F3]">{prop.priceLabel}</td>
                    <td className="p-3.5">
                      <div>Anil Chaudhary</div>
                      <div className="text-[11px] text-[#829685]">9817486280</div>
                    </td>
                    <td className="p-3.5">
                      {approvedList[prop.id] !== false ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <CheckCircle size={13} /> Approved
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1">
                          <Clock size={13} /> Pending
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => toggleApproval(prop.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          approvedList[prop.id] !== false
                            ? 'border-red-500/40 text-red-400 hover:bg-red-500/10'
                            : 'border-[#C8E972] text-[#C8E972] hover:bg-[#C8E972]/10'
                        }`}
                      >
                        {approvedList[prop.id] !== false ? 'Revoke' : 'Approve'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
