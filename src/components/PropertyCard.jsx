import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { MapPin, ArrowUpRight } from 'lucide-react';

export default function PropertyCard({ property, onClick }) {
  const { isDark, language } = useTheme();
  const t = translations[language];

  const categoryLabels = {
    'commercial': language === 'en' ? 'Commercial property' : 'व्यावसायिक संपत्ति',
    'homes': language === 'en' ? 'Homes' : 'घर',
    'residential-plots': language === 'en' ? 'Residential plots' : 'आवासीय भूखंड',
    'agricultural': language === 'en' ? 'Agricultural land' : 'कृषि भूमि',
    'industrial': language === 'en' ? 'Industrial property' : 'औद्योगिक संपत्ति',
  };

  return (
    <div
      className={`card overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.01] ${
        isDark ? 'bg-[#132018] border-[#23382A] hover:border-[#C8E972]/60' : 'bg-white border-[#E3DEC3] hover:border-[#152419]'
      }`}
      onClick={() => onClick && onClick(property)}
    >
      {/* Property Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-black/20">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Category Badge Top-Left */}
        <div className="absolute top-3 left-3">
          <span className={`property-badge ${
            isDark ? 'bg-[#0B130E]/90 text-[#C8E972] border border-[#23382A]' : 'bg-white/95 text-[#152419] border border-[#E3DEC3]'
          }`}>
            {categoryLabels[property.category] || property.category}
          </span>
        </div>

        {/* Sample Badge Top-Right */}
        {property.sample && (
          <div className="absolute top-3 right-3">
            <span className="property-badge bg-[#E5C358] text-[#0B130E] font-semibold">
              SAMPLE · NOT AVAILABLE
            </span>
          </div>
        )}

        {/* Bottom Locality Tag on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1 text-white/90">
            <MapPin size={12} className="text-[#C8E972]" />
            <span>{property.locality}, Rupandehi</span>
          </div>
          <span className="text-[11px] font-mono text-white/70">
            {property.id}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className={`text-base font-semibold truncate ${
              isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'
            }`}>
              {property.title}
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {property.locality} · {property.subtype || property.category}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className={`shrink-0 opacity-0 group-hover:opacity-100 transition-all ${
              isDark ? 'text-[#C8E972]' : 'text-[#152419]'
            }`}
          />
        </div>

        <div className="flex items-end justify-between mt-3 pt-3 border-t border-[#23382A]/50">
          <div>
            <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {t.totalAskingPrice}
            </p>
            <p className={`text-xl font-bold ${isDark ? 'text-[#C8E972]' : 'text-[#152419]'}`}>
              {property.priceLabel}
            </p>
          </div>

          <div className={`text-right text-xs font-medium ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
            {property.area} {property.areaUnit}
          </div>
        </div>

        {property.sample && (
          <div className={`mt-3 pt-2 border-t ${isDark ? 'border-[#23382A]/30' : 'border-[#E3DEC3]/40'} flex items-center justify-between`}>
            <span className={`text-[10px] tracking-wide ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              Sample · {language === 'en' ? 'unverified' : 'असत्यापित'}
            </span>
            <span className="text-[10px] text-[#C8E972] font-medium group-hover:underline">
              {language === 'en' ? 'View details →' : 'विवरण देखें →'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
