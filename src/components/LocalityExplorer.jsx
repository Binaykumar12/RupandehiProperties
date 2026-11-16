import { useTheme } from '../context/ThemeContext';
import { useProperty } from '../context/PropertyContext';
import { MapPin, ArrowRight } from 'lucide-react';

const LOCALITIES = [
  {
    name: 'Butwal',
    tag: 'Commercial & Financial Hub',
    desc: 'Traffic Chowk, Golpark, Deepnagar, Kalikanagar',
    popularFor: 'Commercial Showrooms & Prime Residences',
    accentColor: '#2E7D32',
  },
  {
    name: 'Tilottama',
    tag: 'Premier Residential Corridor',
    desc: 'Drivertole, Bhalwari, Kotihawa, Shankarnagar',
    popularFor: 'Plotted Townships & Modern Bungalows',
    accentColor: '#0284c7',
  },
  {
    name: 'Bhairahawa (Siddharthanagar)',
    tag: 'Airport & Industrial Gateway',
    desc: 'Bank Road, Gautam Buddha Airport, SEZ Zone',
    popularFor: 'Logistics Warehouses & Border Trade Land',
    accentColor: '#7c3aed',
  },
  {
    name: 'Devdaha',
    tag: 'Cultural Heritage & Living',
    desc: 'Pakari Tree, Buddhist Circuit, Highway Plots',
    popularFor: 'Fertile Farmland & Quiet Residential',
    accentColor: '#d97706',
  },
  {
    name: 'Sainamaina',
    tag: 'Rapidly Expanding Townships',
    desc: 'Murgiya Chowk, Saljhandi, Highway Proximity',
    popularFor: 'Budget Housing Plots & Land Parcellation',
    accentColor: '#059669',
  },
];

export default function LocalityExplorer() {
  const { isDark, language } = useTheme();
  const { filters, setFilters } = useProperty();

  const handleSelectLocality = (localityName) => {
    setFilters((prev) => ({
      ...prev,
      locality: prev.locality === localityName ? '' : localityName,
    }));
    const catalogue = document.getElementById('catalogue');
    if (catalogue) {
      catalogue.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 border-b border-black/5 dark:border-white/5">
      <div className="mb-6">
        <span className="section-kicker">
          {language === 'en' ? 'RUPANDEHI DISTRICT CORRIDORS' : 'रुपन्देही जिल्लाका प्रमुख क्षेत्रहरू'}
        </span>
        <h2
          className={`text-2xl sm:text-3xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {language === 'en' ? 'Explore by Municipality & Zone' : 'पालिका तथा क्षेत्र अनुसार अन्वेषण गर्नुहोस्'}
        </h2>
        <p className={`text-xs sm:text-sm mt-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
          {language === 'en'
            ? 'Discover vetted properties across Rupandehi’s fastest appreciating economic and residential belts.'
            : 'रुपन्देहीका सबैभन्दा तीव्र गतिमा विकास भइरहेका आर्थिक तथा आवासीय क्षेत्रहरूका प्रमाणित घरजग्गा हेर्नुहोस्।'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LOCALITIES.map((loc) => {
          const isSelected = filters.locality === loc.name;
          return (
            <button
              key={loc.name}
              type="button"
              onClick={() => handleSelectLocality(loc.name)}
              className={`p-5 rounded-2xl border text-left transition-all hover:scale-[1.01] flex flex-col justify-between ${
                isSelected
                  ? 'border-[#2E7D32] ring-2 ring-[#2E7D32]/30 bg-[#2E7D32]/5'
                  : isDark
                  ? 'bg-[#132018] border-[#23382A] hover:border-[#2D4837]'
                  : 'bg-white border-[#E3DEC3] hover:border-[#D8D1BE]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={15} style={{ color: loc.accentColor }} />
                    <h3 className={`font-serif font-bold text-base ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                      {loc.name}
                    </h3>
                  </div>
                  <span
                    style={{ backgroundColor: `${loc.accentColor}15`, color: loc.accentColor }}
                    className="text-[10px] px-2 py-0.5 rounded-md font-semibold"
                  >
                    {loc.tag}
                  </span>
                </div>

                <p className={`text-xs mt-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {loc.desc}
                </p>

                <p className="text-[11px] text-[#7A8A7C] mt-3 italic">
                  Key: {loc.popularFor}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5 dark:border-white/5 text-xs font-medium">
                <span className={isSelected ? 'text-[#2E7D32] font-bold' : isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}>
                  {isSelected ? '✓ Filter Active' : 'View Properties'}
                </span>
                <ArrowRight size={13} className={isSelected ? 'text-[#2E7D32]' : isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'} />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
