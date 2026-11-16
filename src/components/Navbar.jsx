import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { Menu, X, Sun, Moon, ChevronDown, Building2, Calculator, Landmark, Award } from 'lucide-react';
import SignInModal from './SignInModal';

export default function Navbar({ onOpenPrivacy, onOpenTerms, onOpenConverter, onOpenEmi, onOpenAgents }) {
  const { isDark, toggleTheme, language, toggleLanguage, role, setRole } = useTheme();
  const t = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const roleRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (roleRef.current && !roleRef.current.contains(e.target)) setRoleOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className={`text-center py-2 text-xs tracking-widest font-medium ${
        isDark ? 'bg-[#0B130E] text-[#A7B5A8] border-b border-[#23382A]' : 'bg-[#F4F0E6] text-[#5C6B5E] border-b border-[#E3DEC3]'
      }`}>
        <span className="inline-block w-2 h-2 rounded-full bg-[#C8E972] mr-2 align-middle" />
        {t.announcementText}
      </div>

      {/* Main Navbar */}
      <header className={`sticky top-0 z-40 ${
        isDark ? 'bg-[#0B130E]/95 border-b border-[#23382A]' : 'bg-[#FAF8F2]/95 border-b border-[#E3DEC3]'
      } backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#C8E972]/10 flex items-center justify-center">
                <Building2 size={18} className="text-[#C8E972]" />
              </div>
              <div className="leading-tight">
                <span className={`text-xl font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {t.brandName}<span className="text-[#C8E972]">.</span>
                </span>
                <span className={`block text-[9px] tracking-[0.2em] font-semibold ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {t.brandSub}
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => scrollTo('catalogue')}
                className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
                }`}
              >
                {t.buyProperty}
              </button>
              <button
                onClick={() => scrollTo('catalogue')}
                className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
                }`}
              >
                {t.rentProperty}
              </button>
              <button
                onClick={() => scrollTo('process')}
                className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
                }`}
              >
                {t.howItWorks}
              </button>
              <button
                type="button"
                onClick={onOpenConverter}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  isDark ? 'border-[#23382A] text-[#C8E972] hover:bg-[#16251C]' : 'border-[#E3DEC3] text-[#2E7D32] hover:bg-[#F4F0E6]'
                }`}
                title="Bigha-Kattha-Dhur Land Unit Converter"
              >
                <Calculator size={13} />
                <span>Land Calc</span>
              </button>
              <button
                type="button"
                onClick={onOpenEmi}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  isDark ? 'border-[#23382A] text-[#C8E972] hover:bg-[#16251C]' : 'border-[#E3DEC3] text-[#2E7D32] hover:bg-[#F4F0E6]'
                }`}
                title="Nepal Bank Home Loan EMI Calculator"
              >
                <Landmark size={13} />
                <span>EMI Calc</span>
              </button>
              <button
                type="button"
                onClick={onOpenAgents}
                className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                  isDark ? 'border-[#23382A] text-[#C8E972] hover:bg-[#16251C]' : 'border-[#E3DEC3] text-[#2E7D32] hover:bg-[#F4F0E6]'
                }`}
                title="Verified Real Estate Agents in Rupandehi"
              >
                <Award size={13} />
                <span>Agents</span>
              </button>
            </div>

            {/* Right Controls */}
            <div className="hidden md:flex items-center gap-3">
              {/* Role Selector Combobox */}
              <div className="relative" ref={roleRef}>
                <button
                  type="button"
                  onClick={() => setRoleOpen(!roleOpen)}
                  className={`flex items-center gap-1.5 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                    isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'
                  }`}
                >
                  <span>
                    {role === 'buyer'
                      ? t.imBuyer
                      : role === 'renter'
                      ? (language === 'en' ? "I'm a Renter" : 'म भाडामा लिने हुँ')
                      : role === 'agent'
                      ? (language === 'en' ? "I'm an Agent" : 'म एजेन्ट हुँ')
                      : t.imSeller}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
                </button>

                {roleOpen && (
                  <div className={`absolute right-0 mt-1 w-48 rounded-xl border shadow-2xl py-1 z-50 ${
                    isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'
                  }`}>
                    <button
                      type="button"
                      onClick={() => { setRole('buyer'); setRoleOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors ${
                        role === 'buyer' ? 'text-[#C8E972] font-semibold bg-[#C8E972]/10' : isDark ? 'text-[#A7B5A8] hover:bg-[#16251C]' : 'text-[#5C6B5E] hover:bg-[#F4F0E6]'
                      }`}
                    >
                      {t.imBuyer}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setRole('renter'); setRoleOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors ${
                        role === 'renter' ? 'text-[#C8E972] font-semibold bg-[#C8E972]/10' : isDark ? 'text-[#A7B5A8] hover:bg-[#16251C]' : 'text-[#5C6B5E] hover:bg-[#F4F0E6]'
                      }`}
                    >
                      {language === 'en' ? "I'm a Renter" : 'म भाडामा लिने हुँ'}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setRole('seller'); setRoleOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors ${
                        role === 'seller' ? 'text-[#C8E972] font-semibold bg-[#C8E972]/10' : isDark ? 'text-[#A7B5A8] hover:bg-[#16251C]' : 'text-[#5C6B5E] hover:bg-[#F4F0E6]'
                      }`}
                    >
                      {t.imSeller}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setRole('agent'); setRoleOpen(false); }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm transition-colors ${
                        role === 'agent' ? 'text-[#C8E972] font-semibold bg-[#C8E972]/10' : isDark ? 'text-[#A7B5A8] hover:bg-[#16251C]' : 'text-[#5C6B5E] hover:bg-[#F4F0E6]'
                      }`}
                    >
                      {language === 'en' ? "I'm an Agent" : 'म एजेन्ट हुँ'}
                    </button>
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className={`text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                  isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'
                }`}
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>

              {/* Theme Switcher */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'
                }`}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              {/* Sign In Button */}
              <button
                type="button"
                onClick={() => setSignInOpen(true)}
                className={`text-xs sm:text-sm px-4 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  isDark ? 'border-[#23382A] text-[#F3F6F3] hover:border-[#C8E972] hover:text-[#C8E972]' : 'border-[#E3DEC3] text-[#152419] hover:border-[#152419]'
                }`}
              >
                {t.signIn}
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <div className={`md:hidden border-t ${
            isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#FAF8F2] border-[#E3DEC3]'
          } animate-slide-up`}>
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollTo('catalogue')}
                className={`block w-full text-left py-2 text-sm font-medium ${
                  isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'
                }`}
              >
                {t.buyProperty}
              </button>
              <button
                onClick={() => scrollTo('catalogue')}
                className={`block w-full text-left py-2 text-sm font-medium ${
                  isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'
                }`}
              >
                {t.rentProperty}
              </button>
              <button
                onClick={() => scrollTo('process')}
                className={`block w-full text-left py-2 text-sm font-medium ${
                  isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'
                }`}
              >
                {t.howItWorks}
              </button>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => { onOpenConverter?.(); setMenuOpen(false); }}
                  className={`text-xs py-2 px-1 rounded-lg border text-center font-medium flex items-center justify-center gap-1 ${
                    isDark ? 'border-[#23382A] text-[#C8E972]' : 'border-[#E3DEC3] text-[#2E7D32]'
                  }`}
                >
                  <Calculator size={12} />
                  <span>Land Calc</span>
                </button>
                <button
                  type="button"
                  onClick={() => { onOpenEmi?.(); setMenuOpen(false); }}
                  className={`text-xs py-2 px-1 rounded-lg border text-center font-medium flex items-center justify-center gap-1 ${
                    isDark ? 'border-[#23382A] text-[#C8E972]' : 'border-[#E3DEC3] text-[#2E7D32]'
                  }`}
                >
                  <Landmark size={12} />
                  <span>EMI Calc</span>
                </button>
                <button
                  type="button"
                  onClick={() => { onOpenAgents?.(); setMenuOpen(false); }}
                  className={`text-xs py-2 px-1 rounded-lg border text-center font-medium flex items-center justify-center gap-1 ${
                    isDark ? 'border-[#23382A] text-[#C8E972]' : 'border-[#E3DEC3] text-[#2E7D32]'
                  }`}
                >
                  <Award size={12} />
                  <span>Agents</span>
                </button>
              </div>

              <div className={`border-t pt-3 ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'}`}>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setRole('buyer'); setMenuOpen(false); }}
                    className={`flex-1 text-xs py-2 rounded-lg text-center font-medium ${
                      role === 'buyer' ? 'bg-[#C8E972] text-[#0D1611]' : isDark ? 'bg-[#132018] text-[#A7B5A8]' : 'bg-white text-[#5C6B5E]'
                    }`}
                  >
                    {t.imBuyer}
                  </button>
                  <button
                    onClick={() => { setRole('seller'); setMenuOpen(false); }}
                    className={`flex-1 text-xs py-2 rounded-lg text-center font-medium ${
                      role === 'seller' ? 'bg-[#C8E972] text-[#0D1611]' : isDark ? 'bg-[#132018] text-[#A7B5A8]' : 'bg-white text-[#5C6B5E]'
                    }`}
                  >
                    {t.imSeller}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={toggleLanguage}
                  className={`flex-1 text-xs py-2 rounded-lg border text-center font-medium ${
                    isDark ? 'border-[#23382A] text-[#A7B5A8]' : 'border-[#E3DEC3] text-[#5C6B5E]'
                  }`}
                >
                  {language === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
                </button>
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg border ${
                    isDark ? 'border-[#23382A] text-[#A7B5A8]' : 'border-[#E3DEC3] text-[#5C6B5E]'
                  }`}
                >
                  {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>
              </div>

              <button
                onClick={() => { setSignInOpen(true); setMenuOpen(false); }}
                className="w-full text-xs py-2.5 rounded-lg border border-[#23382A] text-center text-[#F3F6F3] font-medium hover:border-[#C8E972]"
              >
                {t.signIn}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Sign In Modal */}
      {signInOpen && (
        <SignInModal
          onClose={() => setSignInOpen(false)}
          onOpenPrivacy={onOpenPrivacy}
          onOpenTerms={onOpenTerms}
        />
      )}
    </>
  );
}
