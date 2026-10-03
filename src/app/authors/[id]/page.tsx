"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Award } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { BookGrid } from "@/components/books/BookGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { initials } from "@/lib/utils";

export default function AuthorDetailPage() {
  const { t } = useLanguage();
  const { authors, books, categories, loaded } = useLibraryData();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  if (!loaded) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center font-nastaliq text-2xl">
        {t("readerLoading")}
      </div>
    );
  }

  const author = authors.find((a) => a.id === id);
  if (!author) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="font-nastaliq text-2xl">{t("noResults")}</p>
        <Button className="mt-6" onClick={() => router.push("/authors")}>
          {t("authorsTitle")}
        </Button>
      </div>
    );
  }

  const authorBooks = books.filter((b) => b.authorId === author.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/authors"
        className="mb-6 inline-flex items-center gap-1 font-nastaliq text-lg text-ajrak-crimson hover:underline dark:text-ajrak-gold"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t("authorsTitle")}
      </Link>

      <Card className="flex flex-col items-center gap-5 p-8 text-center sm:flex-row sm:text-start">
        <span
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-ajrak-crimson font-nastaliq text-4xl text-ajrak-ecru shadow-lg"
          aria-hidden="true"
        >
          {initials(author.name)}
        </span>
        <div>
          <h1 className="font-nastaliq text-4xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
            {author.name}
          </h1>
          <p className="font-inter text-sm text-ajrak-iron/55 dark:text-ajrak-ecru/55">{author.era}</p>
          <p className="mt-1 text-sm text-ajrak-iron/60 dark:text-ajrak-ecru/60">
            {authorBooks.length} {t("booksCount")}
          </p>
          {author.notableWorks.length > 0 && (
            <div className="mt-3">
              <p className="flex items-center justify-center gap-1.5 font-nastaliq text-lg text-ajrak-gold sm:justify-start">
                <Award className="h-4 w-4" aria-hidden="true" />
                {t("notableWorks")}
              </p>
              <div className="mt-1.5 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                {author.notableWorks.map((w) => (
                  <Badge key={w} tone="gold">{w}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="font-nastaliq text-2xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
          {t("biography")}
        </h2>
        <p className="mt-2 font-nastaliq text-lg leading-nastaliq text-ajrak-iron/85 dark:text-ajrak-ecru/85">
          {author.bio}
        </p>
      </Card>

      {authorBooks.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-5 font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
            {t("booksCount")} — {author.name}
          </h2>
          <BookGrid books={authorBooks} authors={authors} categories={categories} />
        </section>
      )}
    </div>
  );
}
