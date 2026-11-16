import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useProperty } from '../context/PropertyContext';
import { translations } from '../data/properties';
import { PlusCircle, RefreshCw, HelpCircle, Building2, CheckCircle2, Clock, Phone, AlertCircle, FileText, ArrowRight } from 'lucide-react';
import AddPropertyModal from './AddPropertyModal';
import HowItWorksModal from './HowItWorksModal';

export default function SellerDesk() {
  const { isDark, language, user, isSignedIn } = useTheme();
  const { allProperties } = useProperty();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState('sale'); // 'sale' or 'rent'
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Filter listings submitted in this session or by seller
  const list = allProperties || [];
  const sellerListings = list.filter(p => !p.sample);
  const saleListings = sellerListings.filter(p => p.purpose === 'sale');
  const rentListings = sellerListings.filter(p => p.purpose === 'rent');

  const currentListings = activeTab === 'sale' ? saleListings : rentListings;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <div className="py-8 md:py-12 animate-fade-in">
      {/* Top Desk Header */}
      <div className="mb-8">
        <span className="section-kicker">
          {language === 'en' ? 'YOUR PROPERTY DESK' : 'आपका प्रॉपर्टी डेस्क'}
        </span>
        <h1 className={`text-3xl md:text-4xl font-serif font-bold mt-2 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          {language === 'en' ? 'Manage your Rupandehi listings.' : 'अपनी रूपन्देही लिस्टिंग प्रबंधित करें।'}
        </h1>
        <p className={`text-sm md:text-base mt-2 max-w-2xl ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
          {language === 'en'
            ? 'Keep track of your submissions, reviews and buyer enquiries in one place. Verified directly by our team.'
            : 'अपने सबमिशन, समीक्षा और खरीदार पूछताछ को एक ही स्थान पर ट्रैक करें। हमारी टीम द्वारा सीधे सत्यापित।'}
        </p>
      </div>

      {/* KPI Metrics Dashboard Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {language === 'en' ? 'Live Listings' : 'सक्रिय लिस्टिंग'}
            </span>
            <CheckCircle2 size={18} className="text-[#C8E972]" />
          </div>
          <div className={`text-3xl font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            {sellerListings.length}
          </div>
          <p className={`text-[11px] mt-1 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
            {language === 'en' ? 'Published across catalogue' : 'कैटलॉग में प्रकाशित'}
          </p>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {language === 'en' ? 'In Review' : 'समीक्षा में'}
            </span>
            <Clock size={18} className="text-[#E5C358]" />
          </div>
          <div className={`text-3xl font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            0
          </div>
          <p className={`text-[11px] mt-1 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
            {language === 'en' ? 'Average review: 24 hours' : 'औसत समीक्षा: 24 घंटे'}
          </p>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {language === 'en' ? 'Buyer Inquiries' : 'खरीदार पूछताछ'}
            </span>
            <Phone size={18} className="text-[#C8E972]" />
          </div>
          <div className={`text-3xl font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            0
          </div>
          <p className={`text-[11px] mt-1 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
            {language === 'en' ? 'Qualified leads via advisor' : 'सलाहकार के माध्यम से योग्य लीड'}
          </p>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className={`p-4 rounded-2xl border mb-8 flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-[#132018]/60 border-[#23382A]' : 'bg-white/80 border-[#E3DEC3]'
      }`}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('sale')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'sale'
                ? 'bg-[#C8E972] text-[#0D1611]'
                : isDark ? 'text-[#A7B5A8] hover:bg-[#16251C]' : 'text-[#5C6B5E] hover:bg-[#F4F0E6]'
            }`}
          >
            {language === 'en' ? `For sale (${saleListings.length})` : `बिक्री के लिए (${saleListings.length})`}
          </button>
          <button
            onClick={() => setActiveTab('rent')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'rent'
                ? 'bg-[#C8E972] text-[#0D1611]'
                : isDark ? 'text-[#A7B5A8] hover:bg-[#16251C]' : 'text-[#5C6B5E] hover:bg-[#F4F0E6]'
            }`}
          >
            {language === 'en' ? `For rent (${rentListings.length})` : `किराये के लिए (${rentListings.length})`}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`btn-outline text-xs px-3 py-2 ${refreshing ? 'opacity-50' : ''}`}
            title="Refresh desk"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{language === 'en' ? 'Refresh desk' : 'रिफ्रेश'}</span>
          </button>

          <button
            onClick={() => setProcessModalOpen(true)}
            className="btn-outline text-xs px-3 py-2"
          >
            <HelpCircle size={14} />
            <span className="hidden sm:inline">{language === 'en' ? 'What happens next?' : 'आगे क्या होगा?'}</span>
          </button>

          <button
            onClick={() => setAddModalOpen(true)}
            className="btn-primary text-xs px-4 py-2 font-semibold"
          >
            <PlusCircle size={15} />
            <span>{t.addProperty}</span>
          </button>
        </div>
      </div>

      {/* Main Content Listings or Empty State */}
      {currentListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentListings.map(prop => (
            <div
              key={prop.id}
              className={`p-4 rounded-2xl border transition-all ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
                <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2">
                  <span className="property-badge bg-[#C8E972] text-[#0D1611]">
                    {prop.purpose.toUpperCase()}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="property-badge bg-green-500/90 text-white">
                    LIVE
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#829685] mb-1 font-mono">{prop.id}</div>
              <h3 className={`text-base font-semibold mb-1 truncate ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {prop.title}
              </h3>
              <div className={`text-xs mb-3 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {prop.locality}, Rupandehi · {prop.area} {prop.areaUnit}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#23382A]">
                <div className="text-base font-bold text-[#C8E972]">
                  {prop.priceLabel}
                </div>
                <div className="text-xs text-[#829685]">
                  {prop.owner?.name || 'Anil Chaudhary'}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`p-8 md:p-12 rounded-3xl border text-center max-w-2xl mx-auto mb-12 ${
          isDark ? 'bg-[#132018]/60 border-[#23382A]' : 'bg-white border-[#E3DEC3]'
        }`}>
          <div className="w-16 h-16 rounded-full bg-[#C8E972]/15 text-[#C8E972] mx-auto flex items-center justify-center mb-4">
            <Building2 size={30} />
          </div>

          <h3 className={`text-xl font-serif font-bold mb-2 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {language === 'en' ? 'No property listed yet.' : 'अभी तक कोई प्रॉपर्टी लिस्ट नहीं की गई है।'}
          </h3>
          <p className={`text-sm max-w-md mx-auto mb-6 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            {language === 'en'
              ? 'List your home, plot, commercial or agricultural land in Rupandehi. Zero listing commission, maximum local reach.'
              : 'रूपन्देही में अपना घर, प्लॉट, कमर्शियल या कृषि भूमि जोड़ें। शून्य लिस्टिंग कमीशन, अधिकतम स्थानीय पहुँच।'}
          </p>

          <button
            onClick={() => setAddModalOpen(true)}
            className="btn-primary text-sm px-6 py-3 font-semibold mx-auto"
          >
            <PlusCircle size={17} />
            <span>{language === 'en' ? 'Add your first property' : 'अपनी पहली प्रॉपर्टी जोड़ें'}</span>
          </button>
        </div>
      )}

      {/* Seller Knowledge / Value Props Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className="w-9 h-9 rounded-xl bg-[#C8E972]/15 text-[#C8E972] flex items-center justify-center mb-3">
            <CheckCircle2 size={18} />
          </div>
          <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            {language === 'en' ? '0% Seller Commission' : '0% सेलर कमीशन'}
          </h4>
          <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            {language === 'en'
              ? 'List without any brokerage deductions from your sale price. Fair, transparent dealings.'
              : 'अपने बिक्री मूल्य से बिना किसी ब्रोकरेज कटौती के लिस्ट करें। निष्पक्ष, पारदर्शी व्यवहार।'}
          </p>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className="w-9 h-9 rounded-xl bg-[#C8E972]/15 text-[#C8E972] flex items-center justify-center mb-3">
            <FileText size={18} />
          </div>
          <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            {language === 'en' ? 'Review Before Publication' : 'प्रकाशन से पहले समीक्षा'}
          </h4>
          <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            {language === 'en'
              ? 'Our team checks title papers and dimensions so serious buyers reach out.'
              : 'हमारी टीम शीर्षक कागजात और आयामों की जाँच करती है ताकि गंभीर खरीदार संपर्क करें।'}
          </p>
        </div>

        <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
          <div className="w-9 h-9 rounded-xl bg-[#C8E972]/15 text-[#C8E972] flex items-center justify-center mb-3">
            <Phone size={18} />
          </div>
          <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            {language === 'en' ? 'Owner Privacy First' : 'मालिक की गोपनीयता पहले'}
          </h4>
          <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            {language === 'en'
              ? 'Your private phone number is never shared publicly. Advisor manages all initial calls.'
              : 'आपका निजी फोन नंबर कभी सार्वजनिक रूप से साझा नहीं किया जाता। सलाहकार सभी प्रारंभिक कॉल संभालता है।'}
          </p>
        </div>
      </div>

      {/* Modals */}
      {addModalOpen && <AddPropertyModal onClose={() => setAddModalOpen(false)} />}
      {processModalOpen && <HowItWorksModal onClose={() => setProcessModalOpen(false)} />}
    </div>
  );
}
