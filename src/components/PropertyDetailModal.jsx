import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { X, MapPin, Phone, Share2, Calendar, Compass, Ruler, Building2, Car, Zap, Droplets, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';

export default function PropertyDetailModal({ property, onClose }) {
  const { isDark, language } = useTheme();
  const t = translations[language];
  const [currentImage, setCurrentImage] = useState(0);

  if (!property) return null;

  const specs = [
    property.subtype && { label: language === 'en' ? 'Property / offered unit' : 'संपत्ति / प्रस्तावित इकाई', value: property.subtype },
    property.availabilityDate && { label: language === 'en' ? 'Availability date' : 'उपलब्धता तिथि', value: property.availabilityDate },
    property.floor && { label: language === 'en' ? 'Floor' : 'मंजिल', value: property.floor },
    property.furnishing && { label: language === 'en' ? 'Furnishing' : 'फर्निशिंग', value: property.furnishing },
    property.facing && { label: language === 'en' ? 'Facing' : 'दिशा', value: property.facing },
    property.parking && { label: language === 'en' ? 'Parking' : 'पार्किंग', value: property.parking },
    property.roadAccess && { label: language === 'en' ? 'Road / truck access' : 'सड़क / ट्रक पहुँच', value: property.roadAccess },
    property.electricity && { label: language === 'en' ? 'Electricity' : 'बिजली', value: property.electricity },
    property.water && { label: language === 'en' ? 'Water' : 'पानी', value: property.water },
    property.constructionAge && { label: language === 'en' ? 'Construction age' : 'निर्माण आयु', value: property.constructionAge },
  ].filter(Boolean);

  const handleShare = () => {
    const url = `${window.location.origin}/?property=${property.id}`;
    navigator.clipboard.writeText(url);
    alert(language === 'en' ? 'Link copied to clipboard!' : 'लिंक कॉपी हो गया!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl ${isDark ? 'bg-[#132018] border border-[#23382A]' : 'bg-white border border-[#E3DEC3]'} animate-scale-in`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`sticky top-4 float-right mr-4 z-10 p-2 rounded-xl ${isDark ? 'bg-[#0B130E]/80 text-[#A7B5A8] hover:text-[#F3F6F3]' : 'bg-white/80 text-[#5C6B5E] hover:text-[#152419]'} backdrop-blur-sm border ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'}`}
        >
          <X size={18} />
          <span className="sr-only">{t.close}</span>
        </button>

        {/* Image Gallery */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
          <img
            src={property.images[currentImage]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Sample watermark */}
          {property.sample && (
            <div className="absolute top-4 left-4">
              <span className="property-badge bg-[#E5C358]/90 text-[#0B130E]">
                SAMPLE · NOT AVAILABLE
              </span>
            </div>
          )}

          {/* Image navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage(i => i > 0 ? i - 1 : property.images.length - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentImage(i => i < property.images.length - 1 ? i + 1 : 0)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-6' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div>
              <div className={`property-badge mb-2 ${isDark ? 'bg-[#0B130E] text-[#C8E972] border border-[#23382A]' : 'bg-[#F4F0E6] text-[#152419] border border-[#E3DEC3]'}`}>
                {property.category.replace('-', ' ')}
              </div>
              <h2 className={`text-xl font-semibold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {property.title}
              </h2>
              <div className={`flex items-center gap-1 mt-1 text-sm ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                <MapPin size={14} />
                <span>{property.locality}, {property.district}</span>
                <span className="mx-1">·</span>
                <span className={`${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>{property.id}</span>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                {t.totalAskingPrice}
              </p>
              <p className={`text-2xl font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {property.priceLabel}
              </p>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                {property.area} {property.areaUnit}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm mb-6 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            {property.description}
          </p>

          {/* Specs Grid */}
          <div className={`rounded-xl border p-4 mb-6 ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'}`}>
            <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {language === 'en' ? 'Property specifications' : 'संपत्ति विनिर्देश'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specs.map((spec, i) => (
                <div key={i} className={`flex justify-between items-start py-2 ${i < specs.length - 1 ? `border-b ${isDark ? 'border-[#23382A]/50' : 'border-[#E3DEC3]/50'}` : ''}`}>
                  <span className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>{spec.label}</span>
                  <span className={`text-xs font-medium text-right ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {property.highlights && property.highlights.length > 0 && (
            <div className={`rounded-xl border p-4 mb-6 ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {language === 'en' ? 'Verified highlights' : 'सत्यापित मुख्य बातें'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.highlights.map((h, i) => (
                  <span key={i} className={`text-xs px-3 py-1.5 rounded-lg ${isDark ? 'bg-[#0B130E] text-[#A7B5A8] border border-[#23382A]' : 'bg-[#F4F0E6] text-[#5C6B5E] border border-[#E3DEC3]'}`}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Fee Transparency */}
          <div className={`rounded-xl border p-4 mb-6 ${isDark ? 'border-[#23382A] bg-[#0B130E]/50' : 'border-[#E3DEC3] bg-[#F4F0E6]/50'}`}>
            <h3 className={`text-xs font-semibold mb-2 uppercase tracking-wider ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {language === 'en' ? 'Fee transparency' : 'शुल्क पारदर्शिता'}
            </h3>
            <div className={`text-xs space-y-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {property.purpose === 'sale' ? (
                <>
                  <p>• {t.buyerFee}</p>
                  <p>• {t.sellerFee}</p>
                </>
              ) : (
                <p>• {t.rentalFee}</p>
              )}
            </div>
            <p className={`text-[10px] mt-2.5 pt-2 border-t leading-tight ${isDark ? 'border-[#23382A] text-[#7A8A7C]' : 'border-[#E3DEC3] text-[#7A8A7C]'}`}>
              {language === 'en'
                ? 'Statutory Notice: Commission and brokerage terms are subject to formal written mediation agreement and statutory Inland Revenue Department (IRD) taxation rules (PAN/VAT/TDS) in Nepal.'
                : 'वैधानिक सूचना: कमिसन तथा मध्यस्थता शुल्क लिखित सम्झौता र आन्तरिक राजस्व विभाग (IRD) को कर नियम (PAN/VAT/TDS) बमोजिम लागू हुनेछ।'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`tel:+977${property.owner?.phone || '9817486280'}`} className="flex-1 btn-primary justify-center text-center">
              <Phone size={16} />
              <span>{t.callAdvisor}</span>
            </a>
            <a
              href={`https://wa.me/9779817486280?text=${encodeURIComponent(
                `Namaste Anil ji, I am interested in property [ID: ${property.id}] "${property.title}" in ${property.locality}, Rupandehi.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-[#25D366] text-white hover:bg-[#20ba59] rounded-xl py-3 font-medium text-sm justify-center flex items-center gap-2 transition-colors text-center"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Inquiry</span>
            </a>
            <button onClick={handleShare} className="btn-outline justify-center px-4">
              <Share2 size={16} />
              <span>{t.shareProperty}</span>
            </button>
          </div>

          {/* Quote property ID */}
          <div className={`mt-4 text-center text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
            <p>{t.quotePropertyId} : <span className="font-mono font-medium">{property.id}</span></p>
            <p className="mt-1">
              <a href={`tel:+977${property.owner.phone}`} className="text-[#C8E972] hover:underline font-medium">
                {property.owner.phone}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
