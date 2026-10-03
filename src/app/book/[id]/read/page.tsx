"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { PdfReader } from "@/components/reader/PdfReader";

export default function ReadPage() {
  const { t } = useLanguage();
  const { books, loaded } = useLibraryData();
  const params = useParams();
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
        <p className="font-nastaliq text-2xl">{t("noResults")}</p>
        <Link href="/library" className="mt-4 inline-block text-ajrak-crimson hover:underline dark:text-ajrak-gold">
          {t("backToLibrary")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <Link
          href={`/book/${book.id}`}
          className="flex items-center gap-1 font-nastaliq text-lg text-ajrak-crimson hover:underline dark:text-ajrak-gold"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {book.title}
        </Link>
      </div>
      <PdfReader bookId={book.id} pdfUrl={book.pdfUrl} title={book.title} />
    </div>
  );
}
