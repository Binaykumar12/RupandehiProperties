import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { X, Landmark, Percent, Calendar, DollarSign, Info } from 'lucide-react';

export default function EmiCalculatorModal({ initialPrice = 12500000, onClose }) {
  const { isDark, language } = useTheme();

  const [price, setPrice] = useState(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(40); // 40% down payment
  const [interestRate, setInterestRate] = useState(10.5); // 10.5% p.a.
  const [tenureYears, setTenureYears] = useState(15); // 15 years

  // Calculations
  const downPaymentAmount = Math.round((price * downPaymentPercent) / 100);
  const principalLoanAmount = price - downPaymentAmount;

  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let monthlyEmi = 0;
  if (principalLoanAmount > 0 && monthlyRate > 0 && totalMonths > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEmi = Math.round((principalLoanAmount * monthlyRate * factor) / (factor - 1));
  }

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principalLoanAmount);
  const interestRatio = totalPayment > 0 ? ((totalInterest / totalPayment) * 100).toFixed(1) : 0;
  const principalRatio = totalPayment > 0 ? (100 - interestRatio).toFixed(1) : 0;

  // Format NPR
  const formatNpr = (val) => {
    return `Rs. ${Number(val).toLocaleString('en-IN')}`;
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
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32]/15 flex items-center justify-center text-[#2E7D32]">
              <Landmark size={22} />
            </div>
            <div>
              <span className="section-kicker">
                {language === 'en' ? 'NEPAL BANK FINANCING' : 'नेपाली बैंक गृह कर्जा'}
              </span>
              <h2
                className={`text-xl font-serif font-bold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {language === 'en' ? 'Home Loan & EMI Calculator' : 'घरजग्गा कर्जा ईएमआई क्यालकुलेटर'}
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

        {/* Inputs */}
        <div className="space-y-4 mb-6">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className={isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}>
                {language === 'en' ? 'Property Valuation (NPR)' : 'जग्गा / घरको मूल्य (रु.)'}
              </span>
              <span className="font-bold text-[#2E7D32]">{formatNpr(price)}</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#2E7D32] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium mb-1.5">
              <span className={isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}>
                {language === 'en' ? 'Down Payment (Equity)' : 'प्रारम्भिक भुक्तानी (डाउन पेमेन्ट)'}
              </span>
              <span className="font-bold">
                {downPaymentPercent}% ({formatNpr(downPaymentAmount)})
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="80"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-[#2E7D32] cursor-pointer"
            />
            <span className="text-[10px] text-[#7A8A7C]">
              *NRB guidelines recommend minimum 30-40% down payment for real estate.
            </span>
          </div>

          {/* Interest Rate & Tenure Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className={isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}>
                  {language === 'en' ? 'Interest Rate' : 'ब्याजदर'}
                </span>
                <span className="font-bold text-[#2E7D32]">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="8.0"
                max="15.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-[#2E7D32] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                <span className={isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}>
                  {language === 'en' ? 'Loan Tenure' : 'कर्जा अवधि'}
                </span>
                <span className="font-bold">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full accent-[#2E7D32] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Banner */}
        <div className={`p-4 rounded-2xl border mb-6 ${
          isDark ? 'bg-[#0B130E] border-[#23382A]' : 'bg-[#F4F0E6] border-[#E3DEC3]'
        }`}>
          <div className="text-center pb-3 border-b border-black/10 dark:border-white/10">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#7A8A7C]">
              {language === 'en' ? 'Estimated Monthly EMI' : 'अनुमानित मासिक किस्ता (EMI)'}
            </span>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#2E7D32] mt-1">
              {formatNpr(monthlyEmi)}
              <span className="text-xs font-normal text-[#7A8A7C]"> / month</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 text-center">
            <div>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Bank Loan</span>
              <span className="text-xs font-bold">{formatNpr(principalLoanAmount)}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Total Interest</span>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{formatNpr(totalInterest)}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#7A8A7C] uppercase font-medium">Total Payable</span>
              <span className="text-xs font-bold">{formatNpr(totalPayment)}</span>
            </div>
          </div>

          {/* Visual Ratio Bar */}
          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
              <div style={{ width: `${principalRatio}%` }} className="h-full bg-[#2E7D32]" title="Principal" />
              <div style={{ width: `${interestRatio}%` }} className="h-full bg-amber-500" title="Interest" />
            </div>
            <div className="flex justify-between text-[10px] text-[#7A8A7C] mt-1">
              <span>Principal: {principalRatio}%</span>
              <span>Interest: {interestRatio}%</span>
            </div>
          </div>
        </div>

        {/* Commercial Banking Disclaimer */}
        <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2 ${
          isDark ? 'bg-[#0B130E]/50 border-[#23382A] text-[#829685]' : 'bg-[#F4F0E6]/50 border-[#E3DEC3] text-[#5C6B5E]'
        }`}>
          <Info size={14} className="text-[#2E7D32] shrink-0 mt-0.5" />
          <p>
            Subject to credit appraisal by commercial banks operating in Rupandehi (e.g. NIC Asia, Nabil, Global IME, Rastriya Banijya Bank). Loan processing fees and mortgage registration charges apply under Nepal Rastra Bank directives.
          </p>
        </div>
      </div>
    </div>
  );
}
