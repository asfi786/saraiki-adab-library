"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookOpen, Eye, Feather } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { SearchBar } from "@/components/ui/SearchBar";
import { Button } from "@/components/ui/Button";
import { AjrakBlueBand, AJRAK_HERO_TILE } from "@/components/ajrak/AjrakBluePattern";
import { formatNumber } from "@/lib/utils";

interface HeroSectionProps {
  stats: { books: number; authors: number; reads: number };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [q, setQ] = useState("");

  const cards = [
    { v: stats.books, l: t("statBooks"), Icon: BookOpen },
    { v: stats.authors, l: t("statAuthors"), Icon: Feather },
    { v: stats.reads, l: t("statReads"), Icon: Eye },
  ];
  const hasStats = stats.books + stats.authors + stats.reads > 0;

  return (
    <section className="relative overflow-hidden bg-ajrak-indigo-dark text-ajrak-ecru">
      {/* Refined ajrak motif at ~7% — larger scale, whispers at the edges */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: AJRAK_HERO_TILE, backgroundSize: "280px 280px" }}
      />
      {/* Calm radial vignette: quiet ground behind heading, text and search */}
      <div aria-hidden="true" className="hero-vignette absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[85vh] sm:py-16">
        {/* badge */}
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ajrak-gold/40 bg-ajrak-gold/10 px-5 py-2 backdrop-blur">
          <span className="font-nastaliq text-base leading-nastaliq-tight text-ajrak-gold">
            {t("tagline")}
          </span>
        </p>

        {/* headline — gold gradient, fluid size, padding so nothing clips */}
        <h1 className="bg-gradient-to-b from-[#FFEDB0] via-[#F6C453] to-[#DFA93B] bg-clip-text pb-[0.32em] font-nastaliq text-[clamp(2.2rem,7vw,4rem)] leading-[2.1] text-transparent drop-shadow-[0_0_28px_rgba(246,196,83,0.40)]">
          {t("heroTitle")}
        </h1>

        {/* thin gold divider */}
        <div className="mt-2 flex items-center justify-center gap-3" aria-hidden="true">
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-ajrak-gold" />
          <span className="h-2 w-2 rotate-45 bg-ajrak-gold" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-ajrak-gold" />
        </div>

        {/* one-line subtitle */}
        <p className="mx-auto mt-5 max-w-2xl font-nastaliq text-xl leading-nastaliq-tight text-ajrak-ecru/90">
          {t("heroSubtitle")}
        </p>

        {/* search bar */}
        <div className="mx-auto mt-8 w-full max-w-xl">
          <SearchBar
            value={q}
            onChange={setQ}
            onSubmit={() => router.push(`/library?q=${encodeURIComponent(q)}`)}
          />
        </div>

        {/* two buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            variant="crimson"
            className="bg-ajrak-gold !text-ajrak-indigo-dark hover:!bg-[#e2b264]"
            onClick={() => router.push("/library")}
          >
            <BookOpen className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="font-nastaliq">{t("ctaBrowse")}</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="!border-ajrak-ecru/60 !text-ajrak-ecru hover:!bg-ajrak-ecru hover:!text-ajrak-crimson"
            onClick={() => router.push("/contact")}
          >
            <span className="font-nastaliq">{t("ctaContribute")}</span>
          </Button>
        </div>

        {/* stats row — real DB numbers, equal cards */}
        {hasStats ? (
          <dl className="mx-auto mt-10 grid w-full max-w-lg grid-cols-3 gap-3 sm:gap-4">
            {cards.map((s) => (
              <div
                key={s.l}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.07] px-2 py-4 backdrop-blur"
              >
                <s.Icon className="mb-1 h-5 w-5 text-ajrak-gold" aria-hidden="true" />
                <dd className="font-inter text-2xl font-bold text-ajrak-gold sm:text-3xl">
                  {formatNumber(s.v)}
                </dd>
                <dt className="mt-1 font-nastaliq text-base leading-nastaliq-tight text-ajrak-ecru/80">
                  {s.l}
                </dt>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mx-auto mt-10 max-w-lg font-nastaliq text-lg leading-nastaliq-tight text-ajrak-ecru/70">
            {t("statsEmpty")}
          </p>
        )}
      </div>
      <AjrakBlueBand className="relative" />
    </section>
  );
}
