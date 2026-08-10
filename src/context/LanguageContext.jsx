import { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations.js';

const LanguageContext = createContext(null);

function getInitialLang() {
  const stored = localStorage.getItem('lang');
  if (stored === 'ar' || stored === 'en') return stored;
  return 'ar';
}

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && Object.prototype.hasOwnProperty.call(acc, key)) {
      return Reflect.get(acc, key);
    }
    return undefined;
  }, obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === 'ar' ? 'en' : 'ar'));

  const t = (key) => {
    const dict = lang === 'ar' ? translations.ar : translations.en;
    const value = getByPath(dict, key);
    if (value === undefined) return getByPath(translations.ar, key) ?? key;
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
