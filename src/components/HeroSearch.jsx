import { useTheme } from '../context/ThemeContext';
import { useProperty } from '../context/PropertyContext';
import { translations, localities, propertyCategories, buyBudgets, rentBudgets } from '../data/properties';
import { MapPin, Building2, Banknote, Search } from 'lucide-react';

export default function HeroSearch({ onSearch }) {
  const { isDark, language } = useTheme();
  const { filters, setFilters } = useProperty();
  const t = translations[language];

  const handlePurposeChange = (purpose) => {
    setFilters(prev => ({ ...prev, purpose, budget: 'all', minBudget: '', maxBudget: '' }));
  };

  const handleLocalityChange = (e) => {
    setFilters(prev => ({ ...prev, locality: e.target.value }));
  };

  const handleCategoryChange = (e) => {
    setFilters(prev => ({ ...prev, category: e.target.value }));
  };

  const handleBudgetChange = (e) => {
    const val = e.target.value;
    if (val === 'all') {
      setFilters(prev => ({ ...prev, budget: 'all', minBudget: '', maxBudget: '' }));
      return;
    }
    const budgetList = filters.purpose === 'sale' ? buyBudgets : rentBudgets;
    const selected = budgetList.find(b => b.value === val);
    if (selected) {
      setFilters(prev => ({ ...prev, budget: val, minBudget: '', maxBudget: selected.max }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
    const el = document.getElementById('catalogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentBudgets = filters.purpose === 'sale' ? buyBudgets : rentBudgets;

  return (
    <div className={`w-full rounded-2xl border p-5 md:p-6 transition-colors shadow-2xl ${
      isDark ? 'bg-[#132018]/90 border-[#23382A]' : 'bg-[#FFFFFF]/90 border-[#E3DEC3]'
    }`}>
      {/* Purpose Tabs */}
      <div className={`flex items-center gap-6 border-b pb-4 mb-5 ${isDark ? 'border-[#23382A]' : 'border-[#E3DEC3]'}`}>
        <button
          type="button"
          onClick={() => handlePurposeChange('sale')}
          className={`relative pb-2 text-sm md:text-base font-medium transition-colors ${
            filters.purpose === 'sale'
              ? 'text-[#C8E972] font-semibold'
              : isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
          }`}
        >
          {t.buyProperty}
          {filters.purpose === 'sale' && (
            <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#C8E972]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => handlePurposeChange('rent')}
          className={`relative pb-2 text-sm md:text-base font-medium transition-colors ${
            filters.purpose === 'rent'
              ? 'text-[#C8E972] font-semibold'
              : isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
          }`}
        >
          {t.rentProperty}
          {filters.purpose === 'rent' && (
            <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#C8E972]" />
          )}
        </button>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Field 1: Location */}
        <div>
          <label className={`flex items-center gap-1.5 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5 ${
            isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'
          }`}>
            <MapPin size={13} className="text-[#C8E972]" />
            {t.locationLabel}
          </label>
          <select
            value={filters.locality}
            onChange={handleLocalityChange}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors appearance-none cursor-pointer outline-none ${
              isDark
                ? 'bg-[#0B130E] border-[#23382A] text-[#F3F6F3] focus:border-[#C8E972]'
                : 'bg-[#F4F0E6] border-[#E3DEC3] text-[#152419] focus:border-[#C8E972]'
            }`}
          >
            <option value="all">{t.locationPlaceholder}</option>
            {localities.map(loc => (
              <option key={loc} value={loc} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                {loc} · Rupandehi
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: Property Type & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={`flex items-center gap-1.5 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5 ${
              isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'
            }`}>
              <Building2 size={13} className="text-[#C8E972]" />
              {t.propertyTypeLabel}
            </label>
            <select
              value={filters.category}
              onChange={handleCategoryChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors appearance-none cursor-pointer outline-none ${
                isDark
                  ? 'bg-[#0B130E] border-[#23382A] text-[#F3F6F3] focus:border-[#C8E972]'
                  : 'bg-[#F4F0E6] border-[#E3DEC3] text-[#152419] focus:border-[#C8E972]'
              }`}
            >
              <option value="all">{t.allPropertyTypes}</option>
              {propertyCategories.map(cat => (
                <option key={cat.id} value={cat.id} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`flex items-center gap-1.5 text-[10px] md:text-xs font-semibold tracking-wider uppercase mb-1.5 ${
              isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'
            }`}>
              <Banknote size={14} className="text-[#C8E972]" />
              {filters.purpose === 'sale' ? t.budgetLabel : t.monthlyBudget}
            </label>
            <select
              value={filters.budget}
              onChange={handleBudgetChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors appearance-none cursor-pointer outline-none ${
                isDark
                  ? 'bg-[#0B130E] border-[#23382A] text-[#F3F6F3] focus:border-[#C8E972]'
                  : 'bg-[#F4F0E6] border-[#E3DEC3] text-[#152419] focus:border-[#C8E972]'
              }`}
            >
              <option value="all">{t.selectBudget}</option>
              {currentBudgets.map(b => (
                <option key={b.value} value={b.value} className={isDark ? 'bg-[#0B130E]' : 'bg-white'}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full mt-3 py-3 px-6 rounded-xl bg-[#C8E972] hover:bg-[#B5DB58] text-[#0D1611] font-semibold text-sm md:text-base flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] shadow-md hover:shadow-lg hover:shadow-[#C8E972]/20 cursor-pointer"
        >
          <Search size={18} className="text-[#0D1611]" />
          <span>{t.findProperty}</span>
        </button>

        {/* Feature strip below form */}
        <p className={`text-center text-[10px] md:text-xs pt-2 ${
          isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'
        }`}>
          {t.searchValueProps}
        </p>
      </form>
    </div>
  );
}
