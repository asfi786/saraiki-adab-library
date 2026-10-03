"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type TranslationKey } from "@/lib/translations";
import type { Language } from "@/types";

interface LanguageContextValue {
  language: Language;
  dir: "rtl" | "ltr";
  setLanguage: (l: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "skr",
  dir: "rtl",
  setLanguage: () => {},
  t: (k) => k,
});

const STORAGE_KEY = "sal_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("skr");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (saved === "skr" || saved === "ur" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const dir = language === "en" ? "ltr" : "rtl";
    const langAttr = language === "skr" ? "skr" : language === "ur" ? "ur" : "en";
    document.documentElement.dir = dir;
    document.documentElement.lang = langAttr;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore */
    }
  }, [language]);

  const setLanguage = useCallback((l: Language) => setLanguageState(l), []);
  const t = useCallback((key: TranslationKey) => translations[language][key] ?? key, [language]);
  const dir = language === "en" ? "ltr" : "rtl";

  return (
    <LanguageContext.Provider value={{ language, dir, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
