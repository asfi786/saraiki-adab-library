"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { categoryName, languageLabel, cn } from "@/lib/utils";
import type { Author, Category } from "@/types";

export interface FilterState {
  categoryIds: string[];
  authorIds: string[];
  yearMin: number | null;
  yearMax: number | null;
  language: string | null;
}

export const EMPTY_FILTERS: FilterState = {
  categoryIds: [],
  authorIds: [],
  yearMin: null,
  yearMax: null,
  language: null,
};

interface BookFiltersProps {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  authors: Author[];
  categories: Category[];
  yearRange: [number, number];
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-ajrak-crimson/10 py-3 last:border-0 dark:border-white/10">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between font-nastaliq text-lg leading-nastaliq-tight text-ajrak-indigo dark:text-ajrak-ecru"
        aria-expanded={open}
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="mt-2 space-y-1.5">{children}</div>}
    </div>
  );
}

export function BookFilters({ filters, onChange, authors, categories, yearRange }: BookFiltersProps) {
  const { t, language } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = (list: string[], id: string) =>
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const activeCount =
    filters.categoryIds.length +
    filters.authorIds.length +
    (filters.language ? 1 : 0) +
    (filters.yearMin !== null || filters.yearMax !== null ? 1 : 0);

  const body = (
    <div>
      <Section title={t("filterCategory")}>
        {categories.map((c) => (
          <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.categoryIds.includes(c.id)}
              onChange={() => onChange({ ...filters, categoryIds: toggle(filters.categoryIds, c.id) })}
              className="h-4 w-4 rounded accent-[#841B2D]"
            />
            <span className="font-nastaliq text-base leading-nastaliq-tight">
              {categoryName(c, language)}
            </span>
          </label>
        ))}
      </Section>

      <Section title={t("filterAuthor")}>
        {authors.map((a) => (
          <label key={a.id} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={filters.authorIds.includes(a.id)}
              onChange={() => onChange({ ...filters, authorIds: toggle(filters.authorIds, a.id) })}
              className="h-4 w-4 rounded accent-[#841B2D]"
            />
            <span className="font-nastaliq text-base leading-nastaliq-tight">{a.name}</span>
          </label>
        ))}
      </Section>

      <Section title={t("filterYear")}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder={String(yearRange[0])}
            value={filters.yearMin ?? ""}
            min={yearRange[0]}
            max={yearRange[1]}
            onChange={(e) =>
              onChange({ ...filters, yearMin: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full rounded-lg border border-ajrak-crimson/20 bg-transparent px-2 py-1.5 text-sm dark:border-white/20"
            aria-label={`${t("filterYear")} min`}
          />
          <span className="text-ajrak-iron/50 dark:text-ajrak-ecru/50">—</span>
          <input
            type="number"
            placeholder={String(yearRange[1])}
            value={filters.yearMax ?? ""}
            min={yearRange[0]}
            max={yearRange[1]}
            onChange={(e) =>
              onChange({ ...filters, yearMax: e.target.value ? Number(e.target.value) : null })
            }
            className="w-full rounded-lg border border-ajrak-crimson/20 bg-transparent px-2 py-1.5 text-sm dark:border-white/20"
            aria-label={`${t("filterYear")} max`}
          />
        </div>
      </Section>

      <Section title={t("filterLanguage")}>
        {(["skr", "ur", "en"] as const).map((l) => (
          <label key={l} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name="filter-lang"
              checked={filters.language === l}
              onChange={() => onChange({ ...filters, language: filters.language === l ? null : l })}
              onClick={() => filters.language === l && onChange({ ...filters, language: null })}
              className="h-4 w-4 accent-[#841B2D]"
            />
            <span className="font-nastaliq text-base leading-nastaliq-tight">{languageLabel(l)}</span>
          </label>
        ))}
      </Section>

      {activeCount > 0 && (
        <Button variant="ghost" size="sm" className="mt-3 w-full" onClick={() => onChange(EMPTY_FILTERS)}>
          <X className="h-4 w-4" aria-hidden="true" />
          {t("clearAll")} ({activeCount})
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <div className="mb-4 lg:hidden">
        <Button variant="outline" onClick={() => setMobileOpen(true)} className="w-full">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          {t("filters")}
          {activeCount > 0 && (
            <span className="rounded-full bg-ajrak-crimson px-2 py-0.5 text-xs text-white">
              {activeCount}
            </span>
          )}
        </Button>
      </div>

      {/* Desktop sidebar */}
      <Card className="hidden w-64 shrink-0 self-start p-5 lg:block">
        <h2 className="mb-2 font-nastaliq text-xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("filters")}
        </h2>
        {body}
      </Card>

      {/* Mobile bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t("filters")}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute bottom-0 start-0 end-0 max-h-[80vh] overflow-y-auto rounded-t-3xl bg-white p-5 dark:bg-ajrak-indigo-dark animate-slide-up">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="font-nastaliq text-xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
                {t("filters")}
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label={t("close")}
                className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {body}
            <Button className="mt-4 w-full" onClick={() => setMobileOpen(false)}>
              {t("viewAll")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
