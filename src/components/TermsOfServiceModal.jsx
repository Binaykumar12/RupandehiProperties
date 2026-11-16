import { useTheme } from '../context/ThemeContext';
import { X, FileText } from 'lucide-react';

export default function TermsOfServiceModal({ onClose }) {
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
              <FileText size={18} />
            </div>
            <div>
              <h2 className={`text-lg font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {language === 'en' ? 'Terms of Service' : 'सेवाका सर्तहरू'}
              </h2>
              <p className={`text-[11px] ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                {language === 'en'
                  ? 'Commercial & Mediation Terms · Rupandehi Property Hub · Effective: November 2026'
                  : 'व्यावसायिक र मध्यस्थता सर्तहरू · रूपन्देही प्रॉपर्टी हब · लागु: नोभेम्बर २०२६'}
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
              {language === 'en' ? '1. Scope of Platform Services' : '१. प्लेटफर्म सेवाको दायरा'}
            </h3>
            <p>
              {language === 'en'
                ? 'Rupandehi Property Hub operates as an independent property portal and advisory coordination desk serving Rupandehi District, Lumbini Province, Nepal (including Butwal, Siddharthanagar, Tilottama, Devdaha, Sainamaina, and Lumbini). We provide curated property listings, site visit coordination, and preliminary title documentation reviews.'
                : 'रूपन्देही प्रॉपर्टी हब रूपन्देही जिल्ला (बुटवल, सिद्धार्थनगर, तिलोत्तमा, देवदह, सैनामैना, र लुम्बिनी) का लागि समर्पित एक स्वतन्त्र जग्गाजमिन पोर्टल र समन्वय डेस्क हो। हामी प्रमाणीकरण, स्थल भ्रमण, र प्रारम्भिक कागजात सहयोग प्रदान गर्दछौं।'}
            </p>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '2. Brokerage & Mediation Fee Schedule' : '२. मध्यस्थता तथा सेवा शुल्क नीति'}
            </h3>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
              <ul className="space-y-1.5">
                <li>• <strong>{language === 'en' ? 'Property Purchases' : 'जग्गा/घर खरिद'}:</strong> {language === 'en' ? 'Buyer agrees to pay 1% of the final agreed net transaction value on formal conveyance / documentation day at the Land Revenue Office (Malpot Karyalaya). Seller pays 0% company listing fee.' : 'खरिदकर्ताले मालपोत कार्यालयमा पास हुने दिन अन्तिम कारोबार रकमको १% सेवा शुल्क बुझाउन सहमत हुनुपर्नेछ। बिक्रेतालाई कुनै लिस्टिङ शुल्क लाग्ने छैन (०%)।'}</li>
                <li>• <strong>{language === 'en' ? 'Rental Agreements' : 'भाडा सम्झौता'}:</strong> {language === 'en' ? 'Landlord and tenant each contribute 50% of one month’s agreed rent as a one-time mediation fee upon agreement execution.' : 'घरधनी र भाडामा बस्ने दुवै पक्षले सम्झौता हुँदा एक महिनाको भाडाको ५०-५०% सेवा शुल्क बुझाउनुपर्नेछ।'}</li>
                <li>• <strong>{language === 'en' ? 'Taxation Notice' : 'कर सम्बन्धी सूचना'}:</strong> {language === 'en' ? 'All fees are billed in Nepalese Rupees (NPR) and subject to applicable statutory taxation under Nepal Inland Revenue Department regulations (PAN/VAT/TDS).' : 'सबै शुल्क नेपाली रुपैयाँमा भुक्तानी हुनेछ र नेपाल सरकारको आन्तरिक राजस्व विभागको नियम (PAN/VAT/TDS) अनुसार हुनेछ।'}</li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '3. Verification & Independent Due Diligence' : '३. प्रमाणीकरण र कानुनी जाँचबुझ'}
            </h3>
            <p>
              {language === 'en'
                ? 'While our team conducts preliminary reviews of owner identity, road access width, and land registration certificates (Lalpurja), buyers and tenants are advised to conduct formal independent legal due diligence before executing monetary advances or final deed transfers.'
                : 'हाम्रो टोलीले लालपुर्जा, बाटोको चौडाइ, र फिल्ड निरीक्षणको प्रारम्भिक जाँच गरे तापनि, खरिदकर्ता वा भाडामा लिने पक्षले अन्तिम बैना वा पास गर्नु अघि आफ्नै तर्फबाट पनि आवश्यक कानुनी परामर्श लिन सल्लाह दिइन्छ।'}
            </p>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '4. Intellectual Property & Trademarks' : '४. बौद्धिक सम्पत्ति तथा ट्रेडमार्क'}
            </h3>
            <p>
              {language === 'en'
                ? 'The name "Rupandehi Property Hub", stylized logos, curated catalogue formats, and design elements are provisional commercial assets of Rupandehi Property Hub in Nepal. Google and related marks are trademarks of Google LLC and referenced solely for OAuth identity integration.'
                : '"रूपन्देही प्रॉपर्टी हब" नाम, लोगो, र क्याटलग ढाँचा यस संस्थाका व्यावसायिक सम्पत्ति हुन्। Google ट्रेडमार्क Google LLC को सम्पत्ति हो र केवल प्रमाणीकरण प्रयोजनका लागि उल्लेख गरिएको हो।'}
            </p>
          </section>

          <section>
            <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? '5. Governing Law & Dispute Resolution' : '५. लागु हुने कानुन तथा क्षेत्राधिकार'}
            </h3>
            <p>
              {language === 'en'
                ? 'These terms are governed by the laws of Nepal. Any disputes arising in connection with mediation services shall be subject to the exclusive jurisdiction of the District Court of Rupandehi, Nepal.'
                : 'यी सर्तहरू नेपालको प्रचलित कानुन अनुसार व्याख्या गरिनेछन्। कुनै पनि विवाद उत्पन्न भएमा रूपन्देही जिल्ला अदालतको क्षेत्राधिकार रहनेछ।'}
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
