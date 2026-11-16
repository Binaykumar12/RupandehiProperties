import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('rph-theme');
    return saved ? saved === 'dark' : true;
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('rph-lang') || 'en';
  });

  const [role, setRole] = useState('buyer'); // 'buyer' or 'seller'
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('rph-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('rph-lang', language);
  }, [language]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'hi' : 'en');
  
  const signIn = (userData) => {
    setIsSignedIn(true);
    setUser(userData || { name: 'Anil Chaudhary', email: 'anil@example.com' });
  };

  const signOut = () => {
    setIsSignedIn(false);
    setUser(null);
    setRole('buyer');
  };

  return (
    <ThemeContext.Provider value={{
      isDark, toggleTheme,
      language, setLanguage, toggleLanguage,
      role, setRole,
      isSignedIn, user, signIn, signOut,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
