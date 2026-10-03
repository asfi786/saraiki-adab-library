"use client";

import { BookCard } from "./BookCard";
import { BookCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Author, Book, Category } from "@/types";

interface BookGridProps {
  books: Book[];
  authors: Author[];
  categories: Category[];
  loading?: boolean;
}

export function BookGrid({ books, authors, categories, loading }: BookGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (books.length === 0) return <EmptyState />;

  const authorMap = new Map(authors.map((a) => [a.id, a.name]));
  const catMap = new Map(categories.map((c) => [c.id, c]));

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((b) => (
        <BookCard
          key={b.id}
          book={b}
          authorName={authorMap.get(b.authorId) ?? ""}
          category={catMap.get(b.categoryId)}
        />
      ))}
    </div>
  );
}
