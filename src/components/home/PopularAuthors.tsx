"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { AjrakBlueBand } from "@/components/ajrak/AjrakBluePattern";
import { initials, cn } from "@/lib/utils";
import type { Author, Book } from "@/types";

interface Props {
  authors: Author[];
  books: Book[];
}

export function PopularAuthors({ authors, books }: Props) {
  const { t } = useLanguage();

  const counts = new Map<string, number>();
  books.forEach((b) => counts.set(b.authorId, (counts.get(b.authorId) ?? 0) + 1));
  const sorted = [...authors].sort((a, b) => (counts.get(b.id) ?? 0) - (counts.get(a.id) ?? 0)).slice(0, 5);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-5 font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("popularAuthors")}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {sorted.map((a, i) => (
          <Link
            key={a.id}
            href={`/authors/${a.id}`}
            className={cn(
              "group flex flex-col items-center gap-2 rounded-2xl border border-ajrak-crimson/15 bg-white p-5 text-center",
              "transition-all hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-ajrak-indigo-dark/60"
            )}
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-full font-nastaliq text-2xl text-ajrak-ecru shadow-md"
              style={{ backgroundColor: ["#841B2D", "#16284E", "#008B9E", "#5E1220", "#243B6B"][i % 5] }}
              aria-hidden="true"
            >
              {initials(a.name)}
            </span>
            <span className="font-nastaliq text-lg leading-nastaliq-tight text-ajrak-indigo group-hover:text-ajrak-crimson dark:text-ajrak-ecru dark:group-hover:text-ajrak-gold">
              {a.name}
            </span>
            <span className="text-xs text-ajrak-iron/55 dark:text-ajrak-ecru/55">
              {counts.get(a.id) ?? 0} {t("booksCount")}
            </span>
          </Link>
        ))}
      </div>
      <AjrakBlueBand slim className="mt-6" />
    </section>
  );
}
