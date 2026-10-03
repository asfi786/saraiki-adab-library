"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";
import { Check } from "lucide-react";

const OPTIONS: { value: Language; label: string }[] = [
  { value: "skr", label: "سرائیکی" },
  { value: "ur", label: "اردو" },
  { value: "en", label: "English" },
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 rounded-full bg-white/15 p-1 backdrop-blur"
      role="group"
      aria-label="Language / زبان"
    >
      {OPTIONS.map((o) => {
        const active = language === o.value;
        return (
          <button
            key={o.value}
            onClick={() => setLanguage(o.value)}
            aria-pressed={active}
            className={cn(
              "flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-all",
              compact && "px-2",
              active
                ? "bg-ajrak-ecru text-ajrak-crimson shadow"
                : "text-ajrak-ecru/80 hover:text-ajrak-ecru"
            )}
          >
            {active && <Check className="h-3 w-3" aria-hidden="true" />}
            <span className={o.value === "en" ? "font-inter" : "font-nastaliq leading-nastaliq-tight"}>
              {o.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
