import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { translations, areaUnits, furnishingOptions } from '../data/properties';
import { X, RotateCcw } from 'lucide-react';

export default function FilterModal({ onClose, filters, setFilters }) {
  const { isDark, language } = useTheme();
  const t = translations[language];
  const [local, setLocal] = useState({ ...filters });

  const updateLocal = (key, value) => setLocal(prev => ({ ...prev, [key]: value }));

  const handleApply = () => {
    setFilters(local);
    onClose();
  };

  const handleReset = () => {
    const reset = {
      ...filters,
      minArea: '',
      maxArea: '',
      areaUnit: 'sqyd',
      bedrooms: 'any',
      minBudget: '',
      maxBudget: '',
      furnishing: 'any',
    };
    setLocal(reset);
    setFilters(reset);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content max-w-lg animate-scale-in ${isDark ? '' : 'bg-white border-[#E3DEC3]'}`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
            {t.refineSearch}
          </h2>
          <button onClick={onClose} className={`p-1 rounded-lg ${isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'}`}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Area */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.minArea} / {t.maxArea}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="0"
                value={local.minArea}
                onChange={e => updateLocal('minArea', e.target.value)}
                className="input-field text-sm"
              />
              <input
                type="number"
                placeholder={t.any}
                value={local.maxArea}
                onChange={e => updateLocal('maxArea', e.target.value)}
                className="input-field text-sm"
              />
              <select
                value={local.areaUnit}
                onChange={e => updateLocal('areaUnit', e.target.value)}
                className="input-field text-sm"
              >
                {areaUnits.map(u => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
            <p className={`text-[10px] mt-1 ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
              {language === 'en'
                ? 'Area filters compare sizes across units: 1 Kattha = 20 Dhur (~3,645 sq ft); 1 Bigha = 20 Kattha.'
                : 'क्षेत्र फ़िल्टर इकाइयों के बीच तुलना करते हैं: 1 कट्ठा = 20 धुर (~3,645 वर्ग फुट); 1 बीघा = 20 कट्ठा।'
              }
            </p>
          </div>

          {/* Bedrooms */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.bedrooms}
            </label>
            <div className="flex gap-2">
              {['any', '1', '2', '3', '4'].map(val => (
                <button
                  key={val}
                  onClick={() => updateLocal('bedrooms', val)}
                  className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                    local.bedrooms === val
                      ? 'bg-[#C8E972]/10 border-[#C8E972] text-[#C8E972]'
                      : isDark
                        ? 'border-[#23382A] text-[#A7B5A8] hover:border-[#2D4837]'
                        : 'border-[#E3DEC3] text-[#5C6B5E] hover:border-[#D8D1BE]'
                  }`}
                >
                  {val === 'any' ? t.any : `${val} +`}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.minBudget} / {t.maxBudget}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="0"
                value={local.minBudget}
                onChange={e => updateLocal('minBudget', e.target.value)}
                className="input-field text-sm"
              />
              <input
                type="number"
                placeholder={t.any}
                value={local.maxBudget}
                onChange={e => updateLocal('maxBudget', e.target.value)}
                className="input-field text-sm"
              />
            </div>
          </div>

          {/* Furnishing */}
          <div>
            <label className={`block text-xs font-medium mb-2 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.furnishing}
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => updateLocal('furnishing', 'any')}
                className={`py-2 px-4 text-sm rounded-lg border transition-colors ${
                  local.furnishing === 'any'
                    ? 'bg-[#C8E972]/10 border-[#C8E972] text-[#C8E972]'
                    : isDark ? 'border-[#23382A] text-[#A7B5A8]' : 'border-[#E3DEC3] text-[#5C6B5E]'
                }`}
              >
                {t.any}
              </button>
              {furnishingOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => updateLocal('furnishing', opt.toLowerCase())}
                  className={`py-2 px-4 text-sm rounded-lg border transition-colors ${
                    local.furnishing === opt.toLowerCase()
                      ? 'bg-[#C8E972]/10 border-[#C8E972] text-[#C8E972]'
                      : isDark ? 'border-[#23382A] text-[#A7B5A8]' : 'border-[#E3DEC3] text-[#5C6B5E]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <button onClick={handleReset} className="btn-outline flex-1 justify-center">
            <RotateCcw size={14} />
            {t.resetAll}
          </button>
          <button onClick={handleApply} className="btn-primary flex-1 justify-center">
            {t.showMatches}
          </button>
        </div>
      </div>
    </div>
  );
}
