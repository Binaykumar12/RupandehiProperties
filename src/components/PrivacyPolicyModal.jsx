import { useTheme } from '../context/ThemeContext';
import { X, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyModal({ onClose }) {
  const { isDark, language } = useTheme();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content max-w-2xl max-h-[85vh] overflow-y-auto animate-scale-in ${
          isDark ? 'bg-[#132018] border border-[#23382A]' : 'bg-white border border-[#E3DEC3]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4 pb-3 border-b border-[#23382A]/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C8E972]/15 text-[#C8E972] flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className={`text-lg font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
              </h2>
              <p className={`text-[11px] ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                {language === 'en'
                  ? 'Pursuant to Nepal Individual Privacy Act, 2075 (2018) · Effective Date: November 2026'
                  : 'नेपाल वैयक्तिक गोपनीयता ऐन, २०७५ बमोजिम · लागु मिति: नोभेम्बर २०२६'}
              </p>
            </div>
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

        <div className={`space-y-4 text-xs leading-relaxed ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '1. Data Controller Identification' : '१. डाटा नियन्त्रक पहिचान'}
            </h3>
            <p>
              {language === 'en'
                ? 'Rupandehi Property Hub (represented by Lead Advisor Anil Chaudhary, Butwal/Tilottama, Rupandehi District, Lumbini Province, Nepal; contact: 9817486280; email: info@rupandehipropertyhub.com) acts as the data controller responsible for personal information submitted through this website.'
                : 'रूपन्देही प्रॉपर्टी हब (मुख्य सल्लाहकार अनिल चौधरी, बुटवल/तिलोत्तमा, रूपन्देही जिल्ला, लुम्बिनी प्रदेश, नेपाल; फोन: ९८१७४८६२८०; इमेल: info@rupandehipropertyhub.com) यस वेबसाइट मार्फत संकलित व्यक्तिगत विवरणहरूको आधिकारिक डाटा नियन्त्रक हो।'}
            </p>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '2. Information We Collect' : '२. संकलन गरिने विवरण'}
            </h3>
            <ul className="list-disc pl-4 space-y-1">
              <li>{language === 'en' ? 'User-provided details: Full name, phone number, email address, role (Buyer/Seller), and inquiry messages.' : 'प्रयोगकर्ताद्वारा उपलब्ध गराइएको विवरण: नाम, फोन नम्बर, इमेल ठेगाना, भूमिका (खरीदकर्ता/विक्रेता), र सोधपुछ सन्देशहरू।'}</li>
              <li>{language === 'en' ? 'Property submission data: Ownership status, property title, land unit (Kattha/Dhur/Bigha), valuation, floor plan, and photographs.' : 'प्रॉपर्टी विवरण: स्वामित्व स्थिति, शीर्षक, जग्गाको क्षेत्रफल (कट्ठा/धुर/बीघा), मूल्याङ्कन, र तस्बिरहरू।'}</li>
              <li>{language === 'en' ? 'Technical metadata: Device session tokens, dark/light theme choices, and language preferences stored strictly in client local storage.' : 'प्राविधिक विवरण: डिभाइस सेसन टोकन, थिम छनोट, र भाषा प्राथमिकताहरू (स्थानीय ब्राउजर स्टोरेजमा मात्र)।'}</li>
            </ul>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '3. Strict Owner Privacy Protection' : '३. गोपनीयता संरक्षण र तेस्रो पक्ष प्रकटीकरण निषेध'}
            </h3>
            <p>
              {language === 'en'
                ? 'In adherence to privacy regulations, seller telephone numbers and personal addresses are never published openly on public catalogue pages. All prospective inquiries are routed through verified advisors to shield owners from unsolicited communications and aggressive marketing.'
                : 'गोपनीयता नियम अनुसार, विक्रेताहरूको व्यक्तिगत फोन नम्बर र निजी ठेगाना सार्वजनिक क्याटलगमा कहिल्यै खुला गरिँदैन। अनावश्यक फोन वा अवाञ्छित सम्पर्कबाट जोगाउन सबै सोधपुछ आधिकारिक सल्लाहकार मार्फत समन्वय गरिन्छ।'}
            </p>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '4. Purpose & Legal Basis of Processing' : '४. प्रशोधनको उद्देश्य र कानुनी आधार'}
            </h3>
            <p>
              {language === 'en'
                ? 'We process your information solely to: (a) verify property title details prior to scheduling visits, (b) facilitate transparent communication between registered buyers and sellers in Rupandehi District, and (c) provide authorized documentation support on conveyance day.'
                : 'तपाईंको विवरण केवल निम्न कार्यका लागि प्रयोग गरिन्छ: (क) स्थल भ्रमण अघि लालपुर्जा र स्वामित्व प्रमाण प्रमाणीकरण, (ख) रूपन्देही जिल्लाका खरीदकर्ता र विक्रेता बीच पारदर्शी संवाद, र (ग) कागजात तयारीमा प्राविधिक सहयोग।'}
            </p>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '5. User Rights Under Nepal Law' : '५. प्रयोगकर्ताको कानुनी अधिकार'}
            </h3>
            <p>
              {language === 'en'
                ? 'Under the Individual Privacy Act 2075, you have the right to inspect, update, rectify, or request deletion of your submitted listings and personal data at any time by contacting our advisory desk at 9817486280 or info@rupandehipropertyhub.com.'
                : 'वैयक्तिक गोपनीयता ऐन २०७५ अन्तर्गत, तपाईंलाई आफ्नो विवरण हेर्न, सच्याउन वा स्थायी रूपमा हटाउन अनुरोध गर्ने पूर्ण अधिकार छ। यसका लागि हाम्रो डेस्क ९८१७४८६२८० वा info@rupandehipropertyhub.com मा सम्पर्क गर्न सक्नुहुन्छ।'}
            </p>
          </section>
        </div>

        <div className="mt-5 pt-3 border-t border-[#23382A]/50 flex justify-end">
          <button
            onClick={onClose}
            className="btn-primary text-xs px-5 py-2 font-semibold"
          >
            {language === 'en' ? 'Acknowledge & Close' : 'स्वीकार गर्नुहोस् र बन्द गर्नुहोस्'}
          </button>
        </div>
      </div>
    </div>
  );
}
