"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowUpDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { BookGrid } from "@/components/books/BookGrid";
import { BookFilters, EMPTY_FILTERS, type FilterState } from "@/components/books/BookFilters";
import { SearchBar } from "@/components/ui/SearchBar";
import { Card } from "@/components/ui/Card";

type SortKey = "newest" | "popular" | "az";

function LibraryContent() {
  const { t } = useLanguage();
  const { books, authors, categories, loaded } = useLibraryData();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>("newest");
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...EMPTY_FILTERS,
    categoryIds: searchParams.get("category") ? [searchParams.get("category")!] : [],
  }));

  const yearRange = useMemo<[number, number]>(() => {
    if (books.length === 0) return [1900, new Date().getFullYear()];
    const years = books.map((b) => b.year);
    return [Math.min(...years), Math.max(...years)];
  }, [books]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = books.filter((b) => {
      if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(b.categoryId)) return false;
      if (filters.authorIds.length > 0 && !filters.authorIds.includes(b.authorId)) return false;
      if (filters.language && b.language !== filters.language) return false;
      if (filters.yearMin !== null && b.year < filters.yearMin) return false;
      if (filters.yearMax !== null && b.year > filters.yearMax) return false;
      if (q) {
        const author = authors.find((a) => a.id === b.authorId)?.name ?? "";
        const hay = `${b.title} ${author} ${b.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    if (sort === "newest") list = [...list].sort((a, b) => b.year - a.year);
    else if (sort === "popular") list = [...list].sort((a, b) => b.reads - a.reads);
    else list = [...list].sort((a, b) => a.title.localeCompare(b.title, "ur"));
    return list;
  }, [books, authors, query, sort, filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-nastaliq text-4xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("libraryTitle")}
      </h1>
      <p className="mt-1 font-nastaliq text-lg text-ajrak-iron/60 dark:text-ajrak-ecru/60">
        {filtered.length} {t("resultsCount")}
      </p>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row">
        <BookFilters
          filters={filters}
          onChange={setFilters}
          authors={authors}
          categories={categories}
          yearRange={yearRange}
        />

        <div className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder={t("librarySearchPlaceholder")}
              className="flex-1"
            />
            <label className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-ajrak-crimson dark:text-ajrak-gold" aria-hidden="true" />
              <span className="sr-only">{t("sortLabel")}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-xl border-2 border-ajrak-crimson/20 bg-white px-3 py-2.5 font-nastaliq text-base dark:border-white/15 dark:bg-ajrak-indigo-dark"
                aria-label={t("sortLabel")}
              >
                <option value="newest">{t("sortNewest")}</option>
                <option value="popular">{t("sortPopular")}</option>
                <option value="az">{t("sortAZ")}</option>
              </select>
            </label>
          </div>

          {!loaded ? (
            <Card className="p-8 text-center font-nastaliq text-xl">{t("readerLoading")}</Card>
          ) : (
            <BookGrid books={filtered} authors={authors} categories={categories} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense>
      <LibraryContent />
    </Suspense>
  );
}
