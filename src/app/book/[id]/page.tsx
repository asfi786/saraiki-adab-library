"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, Download, Eye, ArrowLeft, AlertTriangle, FileText, Calendar, Building2, Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { BookCard } from "@/components/books/BookCard";
import { AjrakBorder } from "@/components/ajrak/AjrakBorder";
import { categoryName, coverPalette, formatNumber, languageLabel } from "@/lib/utils";

export default function BookDetailPage() {
  const { t, language, dir } = useLanguage();
  const { books, authors, categories, loaded } = useLibraryData();
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

  const book = books.find((b) => b.id === id);
  if (!book) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <AlertTriangle className="mx-auto h-10 w-10 text-ajrak-crimson" />
        <p className="mt-4 font-nastaliq text-2xl">{t("noResults")}</p>
        <Button className="mt-6" onClick={() => router.push("/library")}>
          {t("backToLibrary")}
        </Button>
      </div>
    );
  }

  const author = authors.find((a) => a.id === book.authorId);
  const category = categories.find((c) => c.id === book.categoryId);
  const palette = coverPalette(book.id);
  const related = books.filter((b) => b.id !== book.id && (b.categoryId === book.categoryId || b.authorId === book.authorId)).slice(0, 4);
  const authorMap = new Map(authors.map((a) => [a.id, a.name]));
  const catMap = new Map(categories.map((c) => [c.id, c]));

  const meta: { icon: React.ReactNode; label: string; value: string }[] = [
    { icon: <FileText className="h-4 w-4" />, label: t("metaPages"), value: formatNumber(book.pages) },
    { icon: <Calendar className="h-4 w-4" />, label: t("metaYear"), value: String(book.year) },
    { icon: <Building2 className="h-4 w-4" />, label: t("metaPublisher"), value: book.publisher },
    { icon: <Languages className="h-4 w-4" />, label: t("metaLanguage"), value: languageLabel(book.language) },
    { icon: <Eye className="h-4 w-4" />, label: t("metaReads"), value: formatNumber(book.reads) },
    { icon: <Download className="h-4 w-4" />, label: t("metaDownloads"), value: formatNumber(book.downloads) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1 font-nastaliq text-lg text-ajrak-crimson hover:underline dark:text-ajrak-gold"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t("backToLibrary")}
      </button>

      {book.isSample && (
        <div className="mb-6 flex items-start gap-2 rounded-2xl border border-ajrak-gold/40 bg-ajrak-gold/10 p-4" role="note">
          <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-[#8a6420]" aria-hidden="true" />
          <p className="font-nastaliq text-lg leading-nastaliq-tight">{t("sampleNotice")}</p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        {/* Cover */}
        <div className="mx-auto w-full max-w-[280px]">
          {book.coverUrl ? (
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={book.coverUrl} alt={book.title} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-3 rounded-xl border-2 opacity-60" style={{ borderColor: palette.accent }} aria-hidden="true" />
            </div>
          ) : (
          <div
            className="relative flex aspect-[3/4] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center shadow-xl"
            style={{ backgroundColor: palette.bg }}
          >
            <div className="pointer-events-none absolute inset-3 rounded-xl border-2 opacity-60" style={{ borderColor: palette.accent }} aria-hidden="true" />
            <div className="pointer-events-none absolute inset-5 rounded-lg border opacity-40" style={{ borderColor: palette.accent }} aria-hidden="true" />
            <p className="relative z-10 font-nastaliq text-2xl leading-nastaliq-tight text-ajrak-ecru" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              {book.title}
            </p>
            <p className="relative z-10 mt-3 font-nastaliq text-lg text-ajrak-ecru/85">{author?.name}</p>
          </div>
          )}
          <AjrakBorder variant="crimson" className="mt-0 rounded-b-2xl [height:12px]" />
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap gap-2">
            {category && <Badge tone="indigo">{categoryName(category, language)}</Badge>}
            <Badge tone="gold">{book.fileSize}</Badge>
          </div>
          <h1 className="mt-3 font-nastaliq text-4xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
            {book.title}
          </h1>
          {author && (
            <p className="mt-1 font-nastaliq text-xl text-ajrak-iron/70 dark:text-ajrak-ecru/70">
              {t("byAuthor")}{" "}
              <Link href={`/authors/${author.id}`} className="text-ajrak-crimson hover:underline dark:text-ajrak-gold">
                {author.name}
              </Link>
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/book/${book.id}/read`}>
              <Button size="lg">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
                {t("readOnline")}
              </Button>
            </Link>
            <a href={book.pdfUrl} download>
              <Button size="lg" variant="indigo">
                <Download className="h-5 w-5" aria-hidden="true" />
                {t("downloadPdf")}
              </Button>
            </a>
            <Button size="lg" variant="ghost" onClick={() => router.push("/contact")}>
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              {t("reportBook")}
            </Button>
          </div>

          <Card className="mt-6 p-5">
            <h2 className="font-nastaliq text-2xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
              {t("description")}
            </h2>
            <p className="mt-2 font-nastaliq text-lg leading-nastaliq text-ajrak-iron/85 dark:text-ajrak-ecru/85">
              {book.description}
            </p>
          </Card>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {meta.map((m) => (
              <Card key={m.label} className="flex items-center gap-3 p-3">
                <span className="rounded-lg bg-ajrak-crimson/10 p-2 text-ajrak-crimson dark:bg-ajrak-gold/10 dark:text-ajrak-gold" aria-hidden="true">
                  {m.icon}
                </span>
                <span>
                  <dt className="text-xs text-ajrak-iron/55 dark:text-ajrak-ecru/55">{m.label}</dt>
                  <dd className="font-medium">{m.value}</dd>
                </span>
              </Card>
            ))}
          </dl>

          {author && (
            <Card className="mt-6 p-5">
              <h2 className="font-nastaliq text-2xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
                {t("authorBio")}
              </h2>
              <p className="mt-2 font-nastaliq text-lg leading-nastaliq text-ajrak-iron/85 dark:text-ajrak-ecru/85">
                {author.bio}
              </p>
            </Card>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-5 font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
            {t("relatedBooks")}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <BookCard key={b.id} book={b} authorName={authorMap.get(b.authorId) ?? ""} category={catMap.get(b.categoryId)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
