import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { X, Phone } from 'lucide-react';

export default function ContactModal({ onClose }) {
  const { isDark, language } = useTheme();
  const t = translations[language];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content max-w-sm text-center animate-scale-in ${isDark ? '' : 'bg-white border-[#E3DEC3]'}`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className={`p-1 rounded-lg ${isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'}`}>
            <X size={18} />
          </button>
        </div>

        <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-[#23382A]' : 'bg-[#C8E972]/20'}`}>
          <Phone size={28} className="text-[#C8E972]" />
        </div>

        <h2 className={`text-lg font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
          {t.contactModalTitle}
        </h2>
        <p className={`text-sm mb-2 font-medium ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
          {t.contactModalSubtitle}
        </p>
        <p className={`text-sm mb-6 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
          {t.contactModalText}
        </p>

        <a
          href="tel:+9779817486280"
          className="btn-primary w-full justify-center rounded-full text-base py-3.5 mb-3"
        >
          <Phone size={18} />
          9817486280
        </a>

        <button
          onClick={onClose}
          className={`text-sm font-medium ${isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'} transition-colors`}
        >
          {t.continueExploring}
        </button>
      </div>
    </div>
  );
}
