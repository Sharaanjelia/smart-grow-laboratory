import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export type Language = 'id' | 'en' | 'ko';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  dir: 'ltr' | 'rtl';
}

// ==========================================
// TRANSLATION IMPORTS (static JSON imports)
// ==========================================

import idTranslations from '../locales/id/translation.json';
import enTranslations from '../locales/en/translation.json';
import koTranslations from '../locales/ko/translation.json';

type TranslationDict = Record<string, unknown>;

const TRANSLATIONS: Record<Language, TranslationDict> = {
  id: idTranslations as TranslationDict,
  en: enTranslations as TranslationDict,
  ko: koTranslations as TranslationDict,
};

// ==========================================
// HELPERS
// ==========================================

const STORAGE_KEY = 'smartgrow_language';
const VALID_LANGUAGES: Language[] = ['id', 'en', 'ko'];

function resolveNestedKey(obj: TranslationDict, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

function interpolate(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => {
    return vars[key] !== undefined ? String(vars[key]) : `{${key}}`;
  });
}

function getStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Language;
    if (stored && VALID_LANGUAGES.includes(stored)) return stored;
  } catch (_) {}
  return 'id';
}

// ==========================================
// CONTEXT
// ==========================================

const LanguageContext = createContext<LanguageContextType>({
  language: 'id',
  setLanguage: () => {},
  t: (key) => key,
  dir: 'ltr',
});

// ==========================================
// PROVIDER
// ==========================================

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage);

  const setLanguage = useCallback((lang: Language) => {
    if (!VALID_LANGUAGES.includes(lang)) {
      console.warn(`[i18n] Invalid language: "${lang}". Falling back to "id".`);
      lang = 'id';
    }
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
  }, []);

  // Sync html lang attribute for SEO & accessibility
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', 'ltr');
  }, [language]);

  const t = useCallback((key: string, vars?: Record<string, string | number>): string => {
    const dict = TRANSLATIONS[language];
    const result = resolveNestedKey(dict, key);
    if (result !== undefined) return interpolate(result, vars);

    // Fallback to 'id' if key is missing in current language
    if (language !== 'id') {
      const fallback = resolveNestedKey(TRANSLATIONS['id'], key);
      if (fallback !== undefined) {
        console.warn(`[i18n] Missing key "${key}" in "${language}", using "id" fallback.`);
        return interpolate(fallback, vars);
      }
    }

    // Last resort: return the key itself
    console.warn(`[i18n] Missing translation key: "${key}"`);
    return key;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    dir: 'ltr',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// ==========================================
// HOOK
// ==========================================

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

export default LanguageContext;
