"use client";

import { useMemo } from "react";
import { Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { quotes } from "@/lib/data";
import { Card } from "@/components/ui/Card";

export function QuoteOfDay() {
  const { t } = useLanguage();

  const quote = useMemo(() => {
    const day = Math.floor(Date.now() / 86400000);
    return quotes[day % quotes.length];
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <Card className="relative overflow-hidden bg-gradient-to-br from-ajrak-indigo to-ajrak-indigo-dark p-8 text-center text-ajrak-ecru dark:from-ajrak-crimson-dark dark:to-ajrak-indigo-dark">
        <Quote className="mx-auto mb-2 h-8 w-8 text-ajrak-gold" aria-hidden="true" />
        <h2 className="font-nastaliq text-2xl leading-nastaliq text-ajrak-gold">{t("quoteOfDay")}</h2>
        <blockquote className="mx-auto mt-4 max-w-2xl font-nastaliq text-2xl leading-nastaliq sm:text-3xl">
          “{quote.text}”
        </blockquote>
        <cite className="mt-3 block font-nastaliq text-lg not-italic text-ajrak-ecru/75">
          — {quote.author}
        </cite>
      </Card>
    </section>
  );
}
