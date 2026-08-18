import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('sundry-lang');
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch {}
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('sundry-lang', language);
    } catch {}
    document.documentElement.lang = language;
    const currentLangObj = LANGUAGES.find(l => l.code === language);
    document.documentElement.dir = currentLangObj?.dir || 'ltr';
  }, [language]);

  const t = (key, defaultText = '') => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) return langDict[key];
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) return enDict[key];
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
