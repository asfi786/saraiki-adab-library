"use client";

import Link from "next/link";
import { BookMarked, Feather, ScrollText, BookOpen, Library, History, Users, Languages, Baby, Microscope, Quote } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { AjrakBlueBand } from "@/components/ajrak/AjrakBluePattern";
import { categoryName } from "@/lib/utils";
import type { Book, Category } from "@/types";

const ICONS = [Feather, Quote, BookMarked, ScrollText, BookOpen, Library, History, Users, Languages, Baby, Microscope];

interface Props {
  categories: Category[];
  books: Book[];
}

export function Categories({ categories, books }: Props) {
  const { t, language } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h2 className="mb-5 font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("browseCategories")}
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => {
          const Icon = ICONS[i % ICONS.length];
          const count = books.filter((b) => b.categoryId === c.id).length;
          return (
            <Link
              key={c.id}
              href={`/library?category=${c.id}`}
              className="group flex items-center gap-3 rounded-2xl border border-ajrak-crimson/15 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-ajrak-crimson/40 hover:shadow-md dark:border-white/10 dark:bg-ajrak-indigo-dark/60"
            >
              <span className="rounded-xl bg-ajrak-crimson/10 p-2.5 text-ajrak-crimson transition-colors group-hover:bg-ajrak-crimson group-hover:text-ajrak-ecru dark:bg-ajrak-gold/10 dark:text-ajrak-gold dark:group-hover:bg-ajrak-gold dark:group-hover:text-ajrak-iron">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-nastaliq text-lg leading-nastaliq-tight text-ajrak-indigo dark:text-ajrak-ecru">
                  {categoryName(c, language)}
                </span>
                <span className="text-xs text-ajrak-iron/55 dark:text-ajrak-ecru/55">
                  {count} {t("statBooks")}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <AjrakBlueBand slim className="mt-6" />
    </section>
  );
}
