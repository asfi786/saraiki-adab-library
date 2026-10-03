"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
  onSubmit?: () => void;
}

export function SearchBar({ value, onChange, placeholder, className, onSubmit }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <form
      role="search"
      className={cn("relative w-full", className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <Search
        className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-ajrak-crimson/70 dark:text-ajrak-gold/80 start-4"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? t("heroSearchPlaceholder")}
        aria-label={t("search")}
        className={cn(
          "h-14 w-full rounded-2xl border-2 bg-ajrak-ecru text-lg shadow-lg",
          "border-ajrak-crimson/25 text-ajrak-iron placeholder:text-ajrak-iron/60",
          "dark:border-white/15 dark:bg-ajrak-indigo-dark/90 dark:text-ajrak-ecru dark:placeholder:text-ajrak-ecru/60",
          "ps-12 pe-28 font-nastaliq leading-nastaliq transition-colors duration-200",
          "focus:border-ajrak-gold focus:outline-none focus:ring-2 focus:ring-ajrak-gold/60"
        )}
      />
      <button
        type="submit"
        className={cn(
          "absolute top-1/2 h-11 -translate-y-1/2 rounded-xl bg-ajrak-crimson px-5",
          "font-nastaliq text-base text-ajrak-ecru shadow-sm transition-colors duration-200",
          "hover:bg-ajrak-crimson-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ajrak-gold",
          "dark:bg-ajrak-gold dark:text-ajrak-iron dark:hover:bg-[#e2b264]",
          "end-1.5"
        )}
      >
        {t("search")}
      </button>
    </form>
  );
}
