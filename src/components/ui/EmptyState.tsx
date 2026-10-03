"use client";

import { BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function EmptyState() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center animate-fade-in">
      <div className="rounded-full bg-ajrak-crimson/10 p-6 dark:bg-ajrak-gold/10">
        <BookOpen className="h-10 w-10 text-ajrak-crimson dark:text-ajrak-gold" />
      </div>
      <p className="font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
        {t("noResults")}
      </p>
      <p className="font-nastaliq text-lg text-ajrak-iron/60 dark:text-ajrak-ecru/60">
        {t("noResultsHint")}
      </p>
    </div>
  );
}
