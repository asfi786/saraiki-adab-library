"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { BookCard } from "@/components/books/BookCard";
import { AjrakBlueBand } from "@/components/ajrak/AjrakBluePattern";
import type { Author, Book, Category } from "@/types";

interface Props {
  books: Book[];
  authors: Author[];
  categories: Category[];
  titleKey: "featuredBooks" | "newArrivals";
  viewAllHref?: string;
}

export function BookRow({ books, authors, categories, titleKey, viewAllHref = "/library" }: Props) {
  const { t, dir } = useLanguage();
  const authorMap = new Map(authors.map((a) => [a.id, a.name]));
  const catMap = new Map(categories.map((c) => [c.id, c]));

  if (books.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t(titleKey)}
        </h2>
        <Link
          href={viewAllHref}
          className="flex items-center gap-1 font-nastaliq text-lg text-ajrak-crimson hover:underline dark:text-ajrak-gold"
        >
          {t("viewAll")}
          {dir === "rtl" ? (
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
        </Link>
      </div>
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 -mx-4 px-4">
        {books.map((b) => (
          <div key={b.id} className="w-56 shrink-0 snap-start sm:w-64">
            <BookCard book={b} authorName={authorMap.get(b.authorId) ?? ""} category={catMap.get(b.categoryId)} />
          </div>
        ))}
      </div>
      <AjrakBlueBand slim className="mt-6" />
    </section>
  );
}

export function FeaturedBooks(props: Omit<Props, "titleKey">) {
  return <BookRow {...props} titleKey="featuredBooks" />;
}

export function NewArrivals(props: Omit<Props, "titleKey">) {
  return <BookRow {...props} titleKey="newArrivals" />;
}
