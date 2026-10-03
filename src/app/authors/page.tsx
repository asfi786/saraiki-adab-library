"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { initials } from "@/lib/utils";

export default function AuthorsPage() {
  const { t } = useLanguage();
  const { authors, books, loaded } = useLibraryData();

  const counts = new Map<string, number>();
  books.forEach((b) => counts.set(b.authorId, (counts.get(b.authorId) ?? 0) + 1));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-nastaliq text-4xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("authorsTitle")}
      </h1>
      <p className="mt-1 font-nastaliq text-xl text-ajrak-iron/60 dark:text-ajrak-ecru/60">
        {t("authorsSubtitle")}
      </p>

      {!loaded ? (
        <p className="py-12 text-center font-nastaliq text-2xl">{t("readerLoading")}</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((a, i) => (
            <Card key={a.id} className="flex flex-col p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg">
              <span
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full font-nastaliq text-3xl text-ajrak-ecru shadow-md"
                style={{ backgroundColor: ["#841B2D", "#16284E", "#008B9E", "#5E1220", "#243B6B"][i % 5] }}
                aria-hidden="true"
              >
                {initials(a.name)}
              </span>
              <h2 className="mt-3 font-nastaliq text-2xl leading-nastaliq-tight text-ajrak-indigo dark:text-ajrak-ecru">
                {a.name}
              </h2>
              <p className="font-inter text-sm text-ajrak-iron/55 dark:text-ajrak-ecru/55">{a.era}</p>
              <p className="mt-1 text-sm text-ajrak-iron/60 dark:text-ajrak-ecru/60">
                {counts.get(a.id) ?? 0} {t("booksCount")}
              </p>
              <p
                title={a.bio}
                className="mt-3 line-clamp-3 font-nastaliq text-base leading-nastaliq-tight text-ajrak-iron/75 dark:text-ajrak-ecru/75"
              >
                {a.bio}
              </p>
              <Link href={`/authors/${a.id}`} className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  {t("viewProfile")}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
