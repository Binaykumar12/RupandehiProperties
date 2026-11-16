import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, ArrowRightLeft, Calculator, Copy, Check, Info } from 'lucide-react';

// Exact mathematical land constants for Nepal
// Terai standard: 1 Dhur = 182.25 sq. ft.
const SQFT_PER_DHUR = 182.25;
const SQFT_PER_KATTHA = 3645.0; // 20 Dhur
const SQFT_PER_BIGHA = 72900.0; // 20 Kattha = 400 Dhur

// Hilly / Kathmandu standard: 1 Ropani = 5476 sq. ft.
const SQFT_PER_ROPANI = 5476.0;
const SQFT_PER_AANA = 342.25; // 16 Aana
const SQFT_PER_PAISA = 85.5625; // 4 Paisa per Aana

const SQFT_PER_SQM = 10.7639;

export default function LandUnitConverterModal({ onClose }) {
  const { isDark, language } = useTheme();

  // Mode: 'terai' (Bigha-Kattha-Dhur) or 'sqft'
  const [bigha, setBigha] = useState(0);
  const [kattha, setKattha] = useState(1);
  const [dhur, setDhur] = useState(0);
  const [sqftInput, setSqftInput] = useState(3645);
  const [activeTab, setActiveTab] = useState('terai'); // 'terai', 'sqft', 'ropani'
  const [copied, setCopied] = useState(false);

  // Compute total square feet from active mode
  let totalSqFt = 0;
  if (activeTab === 'terai') {
    totalSqFt = (Number(bigha) || 0) * SQFT_PER_BIGHA +
                (Number(kattha) || 0) * SQFT_PER_KATTHA +
                (Number(dhur) || 0) * SQFT_PER_DHUR;
  } else if (activeTab === 'sqft') {
    totalSqFt = Number(sqftInput) || 0;
  }

  // Derive all units from totalSqFt
  const calculatedBigha = Math.floor(totalSqFt / SQFT_PER_BIGHA);
  const remBighaSqft = totalSqFt % SQFT_PER_BIGHA;
  const calculatedKattha = Math.floor(remBighaSqft / SQFT_PER_KATTHA);
  const remKatthaSqft = remBighaSqft % SQFT_PER_KATTHA;
  const calculatedDhur = (remKatthaSqft / SQFT_PER_DHUR).toFixed(2);

  // Total Kattha and Dhur equivalents
  const totalKatthaFloat = (totalSqFt / SQFT_PER_KATTHA).toFixed(3);
  const totalDhurFloat = (totalSqFt / SQFT_PER_DHUR).toFixed(2);

  // Hilly Units (Ropani-Aana-Paisa)
  const calcRopani = Math.floor(totalSqFt / SQFT_PER_ROPANI);
  const remRopaniSqft = totalSqFt % SQFT_PER_ROPANI;
  const calcAana = Math.floor(remRopaniSqft / SQFT_PER_AANA);
  const remAanaSqft = remRopaniSqft % SQFT_PER_AANA;
  const calcPaisa = (remAanaSqft / SQFT_PER_PAISA).toFixed(1);

  // Metric
  const totalSqMeters = (totalSqFt / SQFT_PER_SQM).toFixed(2);

  const handleCopySummary = () => {
    const text = `${calculatedBigha} Bigha, ${calculatedKattha} Kattha, ${calculatedDhur} Dhur = ${totalSqFt.toLocaleString()} sq. ft. (${totalSqMeters} m²)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content max-w-xl animate-scale-in ${
          isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#C8E972]/15 flex items-center justify-center text-[#2E7D32]">
              <Calculator size={22} />
            </div>
            <div>
              <span className="section-kicker">
                {language === 'en' ? 'NEPAL LAND CONVERTER' : 'नेपाल जग्गा रूपान्तरण क्यालकुलेटर'}
              </span>
              <h2
                className={`text-xl font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {language === 'en' ? 'Terai Land Unit Calculator' : 'तराई जग्गा एकाइ रूपान्तरण'}
              </h2>
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

        {/* Mode Selector Tabs */}
        <div className="flex gap-2 p-1 rounded-xl bg-black/5 dark:bg-white/5 mb-5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('terai')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'terai'
                ? 'bg-[#2E7D32] text-white shadow-sm font-semibold'
                : isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
            }`}
          >
            {language === 'en' ? 'Bigha · Kattha · Dhur (Terai)' : 'बिघा · कठ्ठा · धुर (तराई)'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sqft')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              activeTab === 'sqft'
                ? 'bg-[#2E7D32] text-white shadow-sm font-semibold'
                : isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'
            }`}
          >
            {language === 'en' ? 'Square Feet (sq. ft.)' : 'वर्ग फिट (Square Feet)'}
          </button>
        </div>

        {/* Input Controls */}
        {activeTab === 'terai' ? (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Bigha (बिघा)' : 'बिघा'}
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={bigha}
                onChange={(e) => setBigha(Math.max(0, parseInt(e.target.value) || 0))}
                className="input-field text-center font-bold text-base py-2.5"
              />
              <span className="block text-[10px] text-center text-[#7A8A7C] mt-1">= 20 Kattha</span>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Kattha (कठ्ठा)' : 'कठ्ठा'}
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={kattha}
                onChange={(e) => setKattha(Math.max(0, parseInt(e.target.value) || 0))}
                className="input-field text-center font-bold text-base py-2.5"
              />
              <span className="block text-[10px] text-center text-[#7A8A7C] mt-1">= 20 Dhur</span>
            </div>

            <div>
              <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
                {language === 'en' ? 'Dhur (धुर)' : 'धुर'}
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={dhur}
                onChange={(e) => setDhur(Math.max(0, parseFloat(e.target.value) || 0))}
                className="input-field text-center font-bold text-base py-2.5"
              />
              <span className="block text-[10px] text-center text-[#7A8A7C] mt-1">= 182.25 sq ft</span>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {language === 'en' ? 'Enter Total Area in Square Feet' : 'कुल क्षेत्रफल वर्ग फिटमा राख्नुहोस्'}
            </label>
            <input
              type="number"
              min="0"
              step="50"
              value={sqftInput}
              onChange={(e) => setSqftInput(Math.max(0, parseFloat(e.target.value) || 0))}
              className="input-field font-bold text-lg py-3 text-center"
              placeholder="e.g. 3645"
            />
          </div>
        )}

        {/* Converted Results Grid */}
        <div className={`p-4 rounded-2xl border mb-6 ${isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'}`}>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2E7D32]">
              {language === 'en' ? 'Calculated Conversion' : 'रूपान्तरण नतिजा'}
            </span>
            <button
              type="button"
              onClick={handleCopySummary}
              className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-colors ${
                isDark ? 'border-[#23382A] text-[#A7B5A8] hover:text-white' : 'border-[#E3DEC3] text-[#5C6B5E] hover:text-black'
              }`}
            >
              {copied ? <Check size={12} className="text-[#2E7D32]" /> : <Copy size={12} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Terai Standard</span>
              <p className="text-base font-bold mt-1 text-[#2E7D32]">
                {calculatedBigha}b - {calculatedKattha}k - {calculatedDhur}d
              </p>
              <span className="text-[10px] text-[#7A8A7C]">Total: {totalKatthaFloat} Kattha</span>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Square Feet</span>
              <p className={`text-base font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {totalSqFt.toLocaleString()}
              </p>
              <span className="text-[10px] text-[#7A8A7C]">sq. ft.</span>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Square Meters</span>
              <p className={`text-base font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {totalSqMeters}
              </p>
              <span className="text-[10px] text-[#7A8A7C]">m²</span>
            </div>

            <div className={`p-3 rounded-xl border ${isDark ? 'bg-[#132018] border-[#23382A]' : 'bg-white border-[#E3DEC3]'}`}>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Hills / Ropani</span>
              <p className={`text-base font-bold mt-1 ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
                {calcRopani}r - {calcAana}a - {calcPaisa}p
              </p>
              <span className="text-[10px] text-[#7A8A7C]">Ropani-Aana</span>
            </div>
          </div>
        </div>

        {/* Quick Terai Benchmarks Information Box */}
        <div className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
          isDark ? 'bg-[#0B130E]/50 border-[#23382A] text-[#829685]' : 'bg-[#F4F0E6]/50 border-[#E3DEC3] text-[#5C6B5E]'
        }`}>
          <Info size={16} className="text-[#2E7D32] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#2E7D32]">Rupandehi Land Measurement Standard:</p>
            <p>1 Kattha = 20 Dhur = 3,645 sq. ft. | 1 Bigha = 20 Kattha = 400 Dhur = 72,900 sq. ft. Residential plots in Butwal and Tilottama are commonly sold in 10 Dhur, 12 Dhur, or 1 Kattha parcels.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
