"use client";

import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  );
}
