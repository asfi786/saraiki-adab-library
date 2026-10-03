"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Theme } from "@/types";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

const STORAGE_KEY = "sal_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "dark" || saved === "light") setTheme(saved);
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    []
  );

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
