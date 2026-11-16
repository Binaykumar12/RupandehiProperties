import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { X, CheckCircle, ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

export default function HowItWorksModal({ onClose }) {
  const { isDark, language } = useTheme();
  const t = translations[language];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content max-w-xl animate-scale-in ${isDark ? '' : 'bg-white border-[#E3DEC3]'}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="section-kicker">
              {language === 'en' ? 'TRANSPARENT WORKFLOW' : 'पारदर्शी कार्यप्रणाली'}
            </span>
            <h2 className={`text-xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {t.processTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-lg border transition-colors ${
              isDark ? 'border-[#23382A] text-[#A7B5A8] hover:text-[#F3F6F3]' : 'border-[#E3DEC3] text-[#5C6B5E] hover:text-[#152419]'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* 3 Steps */}
        <div className="space-y-4 mb-6">
          <div className={`p-4 rounded-xl border flex gap-3.5 ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
            <div className="w-8 h-8 rounded-full bg-[#C8E972]/20 text-[#C8E972] font-semibold flex items-center justify-center shrink-0 text-sm">
              01
            </div>
            <div>
              <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {t.step1Title}
              </h4>
              <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {t.step1Desc}
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex gap-3.5 ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
            <div className="w-8 h-8 rounded-full bg-[#C8E972]/20 text-[#C8E972] font-semibold flex items-center justify-center shrink-0 text-sm">
              02
            </div>
            <div>
              <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {t.step2Title}
              </h4>
              <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {t.step2Desc}
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex gap-3.5 ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
            <div className="w-8 h-8 rounded-full bg-[#C8E972]/20 text-[#C8E972] font-semibold flex items-center justify-center shrink-0 text-sm">
              03
            </div>
            <div>
              <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {t.step3Title}
              </h4>
              <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {t.step3Desc}
              </p>
            </div>
          </div>
        </div>

        {/* Clear Commission Structure */}
        <div className={`p-4 rounded-xl border mb-6 ${isDark ? 'border-[#23382A] bg-[#0B130E]/60' : 'border-[#E3DEC3] bg-[#F4F0E6]/60'}`}>
          <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-[#C8E972]' : 'text-[#152419]'}`}>
            {language === 'en' ? 'Commission & fee policy' : 'कमीशन और शुल्क नीति'}
          </h4>
          <ul className={`text-xs space-y-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            <li className="flex items-start gap-2">
              <span className="text-[#C8E972] font-bold">✓</span>
              <span><strong>{language === 'en' ? 'Property Sales' : 'संपत्ति बिक्री'}:</strong> {t.buyerFee} · {t.sellerFee}.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C8E972] font-bold">✓</span>
              <span><strong>{language === 'en' ? 'Rental Properties' : 'किराया संपत्तियाँ'}:</strong> {t.rentalFee}.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C8E972] font-bold">✓</span>
              <span><strong>{language === 'en' ? 'Zero Upfront Fees' : 'शून्य अग्रिम शुल्क'}:</strong> {language === 'en' ? 'No listing charges or upfront consultation fees.' : 'कोई लिस्टिंग शुल्क या प्रारंभिक परामर्श शुल्क नहीं।'}</span>
            </li>
          </ul>
          <p className={`text-[10px] mt-2.5 pt-2 border-t leading-tight ${isDark ? 'border-[#23382A] text-[#7A8A7C]' : 'border-[#E3DEC3] text-[#7A8A7C]'}`}>
            {language === 'en'
              ? 'Notice: Commission structures are governed by mutual written mediation contracts in compliance with Nepal consumer regulations and Inland Revenue Department (IRD) PAN/VAT taxation guidelines.'
              : 'सूचना: कमिसन तथा सेवा शुल्क उपभोक्ता संरक्षण ऐन, २०७५ र आन्तरिक राजस्व विभाग (IRD) को कर नियम अनुसार लिखित सम्झौता मार्फत व्यवस्थित गरिन्छ।'}
          </p>
        </div>

        {/* Contact direct link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
            <span>{language === 'en' ? 'Owner / Advisor' : 'मालिक / सलाहकार'}: <strong>Anil Chaudhary</strong></span>
            <br />
            <span>{language === 'en' ? 'Direct phone' : 'सीधा फोन'}: <a href="tel:+9779817486280" className="text-[#C8E972] hover:underline font-semibold">9817486280</a></span>
          </div>

          <button onClick={onClose} className="btn-primary w-full sm:w-auto justify-center text-xs px-5 py-2.5">
            {language === 'en' ? 'Got it, close' : 'समझ गया, बंद करें'}
          </button>
        </div>
      </div>
    </div>
  );
}
