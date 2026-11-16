import { useTheme } from '../context/ThemeContext';
import { translations } from '../data/properties';
import { X } from 'lucide-react';

export default function SignInModal({ onClose, onOpenPrivacy, onOpenTerms }) {
  const { isDark, language, signIn } = useTheme();
  const t = translations[language];

  const handleGoogleSignIn = () => {
    signIn({ name: 'Anil Chaudhary', email: 'anil@example.com' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content max-w-md animate-scale-in ${isDark ? '' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className={`text-xl font-semibold ${isDark ? 'text-[#F3F6F3]' : 'text-[#152419]'}`}>
              {t.signInTitle}
            </h2>
            <p className={`text-sm mt-1 ${isDark ? 'text-[#A7B5A8]' : 'text-[#5C6B5E]'}`}>
              {t.signInSubtitle}
            </p>
          </div>
          <button onClick={onClose} className={`p-1 rounded-lg ${isDark ? 'text-[#A7B5A8] hover:text-[#F3F6F3]' : 'text-[#5C6B5E] hover:text-[#152419]'}`}>
            <X size={20} />
          </button>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl border text-sm font-medium transition-all ${isDark ? 'border-[#23382A] text-[#F3F6F3] hover:bg-[#16251C]' : 'border-[#E3DEC3] text-[#152419] hover:bg-[#F4F0E6]'}`}
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {t.continueGoogle} (Sandbox Demo)
        </button>

        <p className="text-[10px] text-center mt-2 text-[#7A8A7C]">
          Google is a trademark of Google LLC. Demo sandbox authentication.
        </p>

        <div className={`mt-5 p-4 rounded-xl text-xs ${isDark ? 'bg-[#0B130E] text-[#829685]' : 'bg-[#F4F0E6] text-[#5C6B5E]'}`}>
          <p className="mb-2 font-medium">
            {language === 'en' ? 'For buyers:' : 'खरीदारहरूका लागि:'}
          </p>
          <p>{language === 'en' ? 'Save searches, express interest, keep contacts private.' : 'खोजहरू सुरक्षित गर्नुहोस्, चासो देखाउनुहोस्, सम्पर्कहरू निजी राख्नुहोस्।'}</p>
          <p className="mt-2 font-medium">
            {language === 'en' ? 'For sellers:' : 'बिक्रेताहरूका लागि:'}
          </p>
          <p>{language === 'en' ? 'Manage desk, review verification status, track enquiries.' : 'डेस्क व्यवस्थापन गर्नुहोस्, प्रमाणीकरण स्थिति हेर्नुहोस्।'}</p>
        </div>

        <p className={`text-[11px] mt-4 text-center leading-relaxed ${isDark ? 'text-[#829685]' : 'text-[#5C6B5E]'}`}>
          {language === 'en' ? (
            <>
              By continuing, you agree to our{' '}
              <button
                type="button"
                onClick={() => { onClose(); onOpenTerms?.(); }}
                className="underline hover:text-[#2E7D32] font-medium"
              >
                Terms of Service
              </button>{' '}
              and acknowledge our{' '}
              <button
                type="button"
                onClick={() => { onClose(); onOpenPrivacy?.(); }}
                className="underline hover:text-[#2E7D32] font-medium"
              >
                Privacy Policy
              </button>
              .
            </>
          ) : (
            <>
              जारी राखेर, तपाईं हाम्रा{' '}
              <button
                type="button"
                onClick={() => { onClose(); onOpenTerms?.(); }}
                className="underline hover:text-[#2E7D32] font-medium"
              >
                सेवाका सर्तहरू
              </button>{' '}
              र{' '}
              <button
                type="button"
                onClick={() => { onClose(); onOpenPrivacy?.(); }}
                className="underline hover:text-[#2E7D32] font-medium"
              >
                गोपनीयता नीति
              </button>{' '}
              स्वीकार गर्नुहुन्छ।
            </>
          )}
        </p>
      </div>
    </div>
  );
}
