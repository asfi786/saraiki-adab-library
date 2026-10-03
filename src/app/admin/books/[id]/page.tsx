"use client";

import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import { useLibraryData } from "@/hooks/useLibraryData";
import { adminFetch } from "@/lib/adminAuth";
import { BookForm, type BookFormValue } from "@/components/admin/BookForm";

export default function EditBookPage() {
  const { t } = useLanguage();
  const { books, authors, categories, loaded, refresh } = useLibraryData();
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  if (!loaded) {
    return <p className="py-12 text-center font-nastaliq text-2xl">{t("readerLoading")}</p>;
  }

  const book = books.find((b) => b.id === id);
  if (!book) {
    return <p className="py-12 text-center font-nastaliq text-2xl">{t("noResults")}</p>;
  }

  const authorName = authors.find((a) => a.id === book.authorId)?.name ?? "";

  const handleSave = async (value: BookFormValue) => {
    const res = await adminFetch("/api/admin/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        book: {
          id: book.id,
          title: value.title,
          authorId: book.authorId,
          categoryId: value.categoryId,
          description: value.description,
          language: book.language,
          year: value.year,
          publisher: value.publisher,
          pages: value.pages,
          fileSize: book.fileSize,
          downloads: book.downloads,
          reads: book.reads,
          featured: book.featured,
          isSample: book.isSample,
          pdfUrl: value.pdfUrl,
          coverUrl: value.coverUrl,
        },
        authorName: value.authorName,
      }),
    });
    if (!res.ok) throw new Error("save failed");
    refresh();
    router.push("/admin/books");
  };

  return (
    <div className="space-y-5">
      <h1 className="font-nastaliq text-3xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
        {t("editBook")}
      </h1>
      <BookForm
        initial={book}
        initialAuthorName={authorName}
        authors={authors}
        categories={categories}
        onSave={handleSave}
      />
    </div>
  );
}
