import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { MapPin, Building2 } from 'lucide-react';

export default function Footer({ onContactClick, onOpenPrivacy, onOpenTerms }) {
  const { isDark, language } = useTheme();
  const t = translations[language];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={`${isDark ? 'bg-[#0B130E] border-t border-[#23382A]' : 'bg-[#FAF8F2] border-t border-[#E3DEC3]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="leading-tight">
                <span className={`text-2xl font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {t.brandName}<span className="text-[#C8E972]">.</span>
                </span>
                <span className={`ml-2 text-xs tracking-[0.15em] font-semibold ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {t.brandSub}
                </span>
              </div>
            </div>
            <p className={`text-sm mb-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.footerTagline}
            </p>
            <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              <MapPin size={14} />
              <span>{t.footerLocation}</span>
            </div>
            <p className={`text-[11px] mt-2 italic ${isDark ? 'text-[#6C7E70]' : 'text-[#8A998C]'}`}>
              Rupandehi Property Hub™ is a provisional commercial trade name in process of registration in Nepal.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex flex-wrap gap-2.5 md:justify-end">
              <button onClick={() => scrollTo('catalogue')} className={`text-sm px-4 py-2 rounded-lg border ${isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'} transition-colors`}>
                {t.buy}
              </button>
              <button onClick={() => scrollTo('catalogue')} className={`text-sm px-4 py-2 rounded-lg border ${isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'} transition-colors`}>
                {t.rent}
              </button>
              <button onClick={() => scrollTo('seller-cta')} className={`text-sm px-4 py-2 rounded-lg border ${isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'} transition-colors`}>
                {t.listAProperty}
              </button>
              <button onClick={onContactClick} className={`text-sm px-4 py-2 rounded-lg border ${isDark ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'} transition-colors`}>
                {t.contactTeam}
              </button>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs mt-1">
              <button
                onClick={onOpenPrivacy}
                className={`underline hover:text-[#2E7D32] ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}
              >
                Privacy Policy
              </button>
              <span className="text-[#829685]">·</span>
              <button
                onClick={onOpenTerms}
                className={`underline hover:text-[#2E7D32] ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}
              >
                Terms of Service
              </button>
              <span className="text-[#829685]">·</span>
              <a
                href="/third-party-licenses.txt"
                target="_blank"
                rel="noreferrer"
                className={`underline hover:text-[#2E7D32] ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}
              >
                Open Source Notices
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`mt-8 pt-6 border-t ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2`}>
          <div className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
            <span>{t.copyright} · {t.provisionalBrand}</span>
            <br />
            <span>{t.districtOnly} · {t.reviewScope}</span>
          </div>
          <a href="#admin" className={`flex items-center gap-1 text-xs ${isDark ? 'text-[#829685] hover:text-[#A7B5A8]' : 'text-[#5C6B5E] hover:text-[#152419]'} transition-colors`}>
            <Building2 size={12} />
            {t.teamLogin}
          </a>
        </div>
      </div>
    </footer>
  );
}
