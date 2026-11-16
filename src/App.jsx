import { useState, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { useProperty } from './context/PropertyContext';
import { translations, propertyCategories, localities } from './data/properties';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSearch from './components/HeroSearch';
import PropertyCard from './components/PropertyCard';
import PropertyDetailModal from './components/PropertyDetailModal';
import FilterModal from './components/FilterModal';
import ContactModal from './components/ContactModal';
import HowItWorksModal from './components/HowItWorksModal';
import AddPropertyModal from './components/AddPropertyModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import TermsOfServiceModal from './components/TermsOfServiceModal';
import LandUnitConverterModal from './components/LandUnitConverterModal';
import EmiCalculatorModal from './components/EmiCalculatorModal';
import AgentDirectoryModal from './components/AgentDirectoryModal';
import LocalityExplorer from './components/LocalityExplorer';
import SellerDesk from './components/SellerDesk';
import AdminConsole from './components/AdminConsole';
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpRight,
  ChevronDown,
  Building2,
  Store,
  Home,
  LandPlot,
  Tractor,
  Factory,
  ShieldCheck,
  CheckCircle,
  Eye,
  Phone,
  PhoneCall,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  const { isDark, language, role, setRole } = useTheme();
  const { properties, allProperties, filters, setFilters, sortBy, setSortBy } = useProperty();
  const t = translations[language];

  // Routing state
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '');

  // Modals
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [converterOpen, setConverterOpen] = useState(false);
  const [emiOpen, setEmiOpen] = useState(false);
  const [agentsOpen, setAgentsOpen] = useState(false);

  // Hero carousel
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Pagination for properties
  const [visibleCount, setVisibleCount] = useState(6);

  // Handle Hash and Query params on mount & changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
    };

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const propId = params.get('property');
      if (propId) {
        const found = allProperties.find(p => p.id === propId);
        if (found) setSelectedProperty(found);
      } else {
        setSelectedProperty(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);

    // Initial check
    handlePopState();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [allProperties]);

  const openPropertyDetail = (property) => {
    setSelectedProperty(property);
    const url = new URL(window.location);
    url.searchParams.set('property', property.id);
    window.history.pushState({}, '', url);
  };

  const closePropertyDetail = () => {
    setSelectedProperty(null);
    const url = new URL(window.location);
    url.searchParams.delete('property');
    window.history.pushState({}, '', url);
  };

  const handleCategoryClick = (categoryId) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    const el = document.getElementById('catalogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLocalityFilter = (localityName) => {
    setFilters(prev => ({ ...prev, locality: localityName }));
    const el = document.getElementById('catalogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const carouselImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
  ];

  const categoryIcons = {
    'commercial': Store,
    'homes': Home,
    'residential-plots': LandPlot,
    'agricultural': Tractor,
    'industrial': Factory,
  };

  // If viewing admin route
  if (currentRoute === '#admin') {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-[#0B130E] text-[#F3F6F3]' : 'bg-[#FAF8F2] text-[#152419]'}`}>
        <AdminConsole onBackToPublic={() => {
          window.location.hash = '';
          setCurrentRoute('');
        }} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-[#0B130E] text-[#F3F6F3]' : 'bg-[#FAF8F2] text-[#152419]'
    }`}>
      {/* Top Navbar */}
      <Navbar
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
        onOpenConverter={() => setConverterOpen(true)}
        onOpenEmi={() => setEmiOpen(true)}
        onOpenAgents={() => setAgentsOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* If Role is SELLER, show SellerDesk workspace */}
        {role === 'seller' ? (
          <SellerDesk />
        ) : (
          /* Role is BUYER - Full Consumer Catalogue */
          <>
            {/* 1. HERO SECTION */}
            <section className="py-8 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Heading & Search Form */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-[1.5px] bg-[#C8E972]" />
                      <span className="section-kicker">{t.heroKicker}</span>
                    </div>

                    <h1
                      className={`text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] ${
                        isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'
                      }`}
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {t.heroTitle1} <br />
                      <span className="italic font-medium text-[#C8E972]">{t.heroTitle2}</span>
                    </h1>

                    <p className={`mt-4 text-sm sm:text-base max-w-xl ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                      {t.heroSubtitle}
                    </p>
                  </div>

                  {/* Hero Search Box */}
                  <HeroSearch />
                </div>

                {/* Right Column: Visual Carousel ("Property Highlights") */}
                <div className="lg:col-span-5">
                  <div className={`relative rounded-3xl overflow-hidden border p-2 shadow-2xl transition-all ${
                    isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'
                  }`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <img
                        src={carouselImages[carouselIndex]}
                        alt="Property Highlight"
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Content inside photo */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C8E972] block mb-1">
                          {t.carouselSlides[carouselIndex].kicker}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {t.carouselSlides[carouselIndex].title}
                        </h2>

                        <button
                          onClick={() => {
                            const el = document.getElementById('catalogue');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-[#C8E972] transition-colors"
                        >
                          <span>{t.carouselSlides[carouselIndex].cta}</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>

                      {/* Pagination Controls */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-2">
                        <span className="text-xs font-mono text-white/80">
                          0{carouselIndex + 1} / 0{carouselImages.length}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setCarouselIndex(i => (i > 0 ? i - 1 : carouselImages.length - 1))}
                            className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            onClick={() => setCarouselIndex(i => (i < carouselImages.length - 1 ? i + 1 : 0))}
                            className="p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. CATEGORY QUICK EXPLORATION ("WHAT ARE YOU LOOKING FOR?") */}
            <section className="py-10 border-t border-[#23382A]/40">
              <div className="mb-6">
                <span className="section-kicker">{t.whatLookingFor}</span>
                <h2 className={`text-2xl md:text-3xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {language === 'en' ? 'Explore by property type' : 'प्रॉपर्टी प्रकार द्वारा अन्वेषण करें'}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                {propertyCategories.map(cat => {
                  const IconComp = categoryIcons[cat.id] || Building2;
                  const isSelected = filters.category === cat.id;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`card p-4 sm:p-5 cursor-pointer text-left transition-all group ${
                        isSelected
                          ? 'border-[#C8E972] bg-[#C8E972]/5'
                          : isDark ? 'hover:border-[#2D4837] hover:bg-[#16251C]' : 'bg-white hover:border-[#D8D1BE]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                        isSelected
                          ? 'bg-[#C8E972] text-[#0D1611]'
                          : isDark ? 'bg-[#0B130E] text-[#C8E972] group-hover:bg-[#C8E972]/20' : 'bg-[#F4F0E6] text-[#152419]'
                      }`}>
                        <IconComp size={20} />
                      </div>

                      <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                        {cat.name}
                      </h3>
                      <p className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                        {cat.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2.5 RUPANDEHI LOCALITY EXPLORER */}
            <LocalityExplorer />

            {/* 3. PROPERTY CATALOGUE ("A PLACE FOR EVERY PLAN") */}
            <section id="catalogue" className="py-12 border-t border-[#23382A]/40 scroll-mt-20">
              {/* Header & Controls Toolbar */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <div>
                  <span className="section-kicker">{t.placeForEveryPlan}</span>
                  <h2 className={`text-2xl md:text-3xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {t.discoverAddress}
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                    {t.exploreApproved} <strong className="text-[#C8E972]">{properties.length} {t.properties}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Refine Search / Filters Modal Button */}
                  <button
                    onClick={() => setFilterModalOpen(true)}
                    className="btn-outline text-xs px-3.5 py-2"
                  >
                    <SlidersHorizontal size={14} />
                    <span>{t.filters}</span>
                  </button>

                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      className={`text-xs px-3.5 py-2 rounded-xl border appearance-none pr-8 cursor-pointer outline-none font-medium ${
                        isDark
                          ? 'bg-[#132018] border-[#23382A] text-[#F3F6F3] focus:border-[#C8E972]'
                          : 'bg-white border-[#E3DEC3] text-[#152419] focus:border-[#C8E972]'
                      }`}
                    >
                      <option value="recommended">{language === 'en' ? 'Recommended' : 'अनुशंसित'}</option>
                      <option value="price_asc">{language === 'en' ? 'Price: low to high' : 'मूल्य: कम से ज्यादा'}</option>
                      <option value="price_desc">{language === 'en' ? 'Price: high to low' : 'मूल्य: ज्यादा से कम'}</option>
                    </select>
                    <ChevronDown size={14} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`} />
                  </div>
                </div>
              </div>

              {/* Sample Disclaimer Banner */}
              <div className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${
                isDark ? 'bg-[#132018]/50 border-[#E5C358]/30 text-[#E5C358]' : 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]'
              }`}>
                <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  {t.sampleNotice}
                </p>
              </div>

              {/* Active Filter Chips (if any) */}
              {(filters.category !== 'all' || filters.locality !== 'all' || filters.bedrooms !== 'any') && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                    {language === 'en' ? 'Active filters:' : 'सक्रिय फ़िल्टर:'}
                  </span>
                  {filters.category !== 'all' && (
                    <span className="property-badge bg-[#C8E972]/15 text-[#C8E972] border border-[#C8E972]/30 flex items-center gap-1">
                      {filters.category}
                      <button onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))} className="hover:text-white">✕</button>
                    </span>
                  )}
                  {filters.locality !== 'all' && (
                    <span className="property-badge bg-[#C8E972]/15 text-[#C8E972] border border-[#C8E972]/30 flex items-center gap-1">
                      {filters.locality}
                      <button onClick={() => setFilters(prev => ({ ...prev, locality: 'all' }))} className="hover:text-white">✕</button>
                    </span>
                  )}
                  <button
                    onClick={() => setFilters({
                      purpose: 'sale',
                      category: 'all',
                      locality: 'all',
                      budget: 'all',
                      minArea: '',
                      maxArea: '',
                      areaUnit: 'sqyd',
                      bedrooms: 'any',
                      furnishing: 'any',
                      minBudget: '',
                      maxBudget: '',
                    })}
                    className="text-xs text-[#A7B5A8] hover:underline ml-2"
                  >
                    {t.resetAll}
                  </button>
                </div>
              )}

              {/* Properties Grid */}
              {properties.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.slice(0, visibleCount).map(property => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        onClick={openPropertyDetail}
                      />
                    ))}
                  </div>

                  {/* Show More Button */}
                  {visibleCount < properties.length && (
                    <div className="text-center mt-10">
                      <button
                        onClick={() => setVisibleCount(c => c + 6)}
                        className="btn-outline text-xs px-6 py-3 font-semibold"
                      >
                        {t.showMore}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className={`p-12 text-center rounded-2xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
                  <p className={`text-base font-semibold mb-2 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                    {language === 'en' ? 'No matching properties found in Rupandehi' : 'रूपन्देही में कोई मेल खाती संपत्ति नहीं मिली'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                    {language === 'en' ? 'Try adjusting your filters or search criteria.' : 'अपने फ़िल्टर या खोज मानदंड समायोजित करने का प्रयास करें।'}
                  </p>
                  <button
                    onClick={() => setFilters({
                      purpose: 'sale',
                      category: 'all',
                      locality: 'all',
                      budget: 'all',
                      minArea: '',
                      maxArea: '',
                      areaUnit: 'sqyd',
                      bedrooms: 'any',
                      furnishing: 'any',
                      minBudget: '',
                      maxBudget: '',
                    })}
                    className="btn-primary text-xs px-5 py-2.5 mt-4"
                  >
                    {t.resetAll}
                  </button>
                </div>
              )}
            </section>

            {/* 4. NEIGHBOURHOOD SPOTLIGHT ("FIND YOUR NEIGHBOURHOOD") */}
            <section className="py-12 border-t border-[#23382A]/40">
              <div className="mb-6">
                <span className="section-kicker">{t.findNeighbourhood}</span>
                <h2 className={`text-2xl md:text-3xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {t.differentPlaces}
                </h2>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                  {t.neighbourhoodSubtext} · <strong className="text-[#C8E972]">{t.districtOnly}</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { num: '01', name: 'Butwal', sub: 'Commercial center & highway hub' },
                  { num: '02', name: 'Tilottama', sub: 'Planned townships & green avenues' },
                  { num: '03', name: 'Industrial Area · Bhairahawa', sub: 'Trade, warehousing & manufacturing' },
                  { num: '04', name: 'Siddarthanagar', sub: 'Gateway city & international hub' },
                ].map(area => (
                  <div
                    key={area.num}
                    onClick={() => handleLocalityFilter(area.name.split(' · ')[0])}
                    className={`card p-5 cursor-pointer transition-all group ${
                      isDark ? 'hover:border-[#C8E972] hover:bg-[#16251C]' : 'bg-white hover:border-[#152419]'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold text-[#C8E972] mb-3">
                      {area.num}
                    </div>
                    <h3 className={`text-base font-semibold mb-1 group-hover:text-[#C8E972] transition-colors ${
                      isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'
                    }`}>
                      {area.name}
                    </h3>
                    <p className={`text-xs mb-4 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
                      {area.sub}
                    </p>

                    <div className="flex items-center gap-1 text-xs font-medium text-[#C8E972]">
                      <span>{t.viewApproved}</span>
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. GUIDANCE / PROCESS SECTION ("REAL PEOPLE. CLEAR NEXT STEPS.") */}
            <section id="process" className="py-12 border-t border-[#23382A]/40 scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="section-kicker">{t.realPeople}</span>
                  <h2 className={`text-2xl md:text-3xl font-serif font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`} style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {t.guidanceTitle}
                  </h2>
                </div>

                <button
                  onClick={() => setHowItWorksOpen(true)}
                  className="btn-outline text-xs px-4 py-2 self-start sm:self-auto"
                >
                  {t.understandProcess}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    num: '01',
                    title: t.step1Title,
                    desc: t.step1Desc,
                    icon: Eye,
                  },
                  {
                    num: '02',
                    title: t.step2Title,
                    desc: t.step2Desc,
                    icon: PhoneCall,
                  },
                  {
                    num: '03',
                    title: t.step3Title,
                    desc: t.step3Desc,
                    icon: CheckCircle,
                  },
                ].map(step => (
                  <div
                    key={step.num}
                    className={`card p-6 relative overflow-hidden ${isDark ? '' : 'bg-white'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-mono font-bold text-[#C8E972]">
                        {step.num}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-[#C8E972]/15 text-[#C8E972] flex items-center justify-center">
                        <step.icon size={16} />
                      </div>
                    </div>

                    <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. SELLER CALL-TO-ACTION CARD ("YOUR PROPERTY. ITS NEXT CHAPTER.") */}
            <section id="seller-cta" className="py-12 border-t border-[#23382A]/40">
              <div className={`p-8 md:p-12 rounded-3xl border relative overflow-hidden ${
                isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-[#FAF8F2] border-[#E3DEC3]'
              }`}>
                <div className="max-w-2xl relative z-10">
                  <span className="section-kicker">{t.sellerCTA}</span>
                  <h2
                    className={`text-2xl sm:text-3xl md:text-4xl font-serif font-bold mt-2 ${
                      isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'
                    }`}
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {t.havePlace}
                  </h2>
                  <p className={`text-sm md:text-base mt-2 mb-6 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                    {t.listForSale}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setAddPropertyOpen(true)}
                      className="btn-primary text-sm px-6 py-3 font-semibold"
                    >
                      <span>{t.listProperty}</span>
                      <span>+</span>
                    </button>

                    <button
                      onClick={() => setRole('seller')}
                      className="btn-outline text-sm px-5 py-3"
                    >
                      {language === 'en' ? 'Open Seller Desk' : 'सेलर डेस्क खोलें'}
                    </button>
                  </div>
                </div>

                {/* Subtle graphic accent in background */}
                <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
                  <Building2 size={280} className="text-[#C8E972]" />
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onContactClick={() => setContactModalOpen(true)}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
        onOpenTerms={() => setTermsModalOpen(true)}
      />

      {/* Global Modals */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={closePropertyDetail}
        />
      )}

      {filterModalOpen && (
        <FilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setFilterModalOpen(false)}
        />
      )}

      {contactModalOpen && (
        <ContactModal onClose={() => setContactModalOpen(false)} />
      )}

      {howItWorksOpen && (
        <HowItWorksModal onClose={() => setHowItWorksOpen(false)} />
      )}

      {addPropertyOpen && (
        <AddPropertyModal onClose={() => setAddPropertyOpen(false)} />
      )}

      {privacyModalOpen && (
        <PrivacyPolicyModal onClose={() => setPrivacyModalOpen(false)} />
      )}

      {termsModalOpen && (
        <TermsOfServiceModal onClose={() => setTermsModalOpen(false)} />
      )}

      {converterOpen && (
        <LandUnitConverterModal onClose={() => setConverterOpen(false)} />
      )}

      {emiOpen && (
        <EmiCalculatorModal onClose={() => setEmiOpen(false)} />
      )}

      {agentsOpen && (
        <AgentDirectoryModal onClose={() => setAgentsOpen(false)} />
      )}
    </div>
  );
}
