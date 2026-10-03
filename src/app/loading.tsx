"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { AjrakStar } from "@/components/ajrak/AjrakStar";

/** Friendly Saraiki loading state for route transitions. */
export default function Loading() {
  const { language } = useLanguage();
  const msg =
    language === "en"
      ? "Opening the library…"
      : language === "ur"
        ? "لائبریری کھل رہی ہے…"
        : "لائبریری کُھل رہی ہے…";

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <AjrakStar size={48} className="animate-pulse text-ajrak-crimson dark:text-ajrak-gold" />
      <p className="font-nastaliq text-2xl leading-nastaliq-tight text-ajrak-indigo dark:text-ajrak-ecru">
        {msg}
      </p>
    </div>
  );
}
