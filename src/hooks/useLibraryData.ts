"use client";

import { useCallback, useEffect, useState } from "react";
import { loadAuthors, loadBooks, loadCategories } from "@/lib/store";
import type { Author, Book, Category } from "@/types";

export interface LibraryData {
  books: Book[];
  authors: Author[];
  categories: Category[];
  loaded: boolean;
  refresh: () => void;
}

function toAuthor(a: { id: string; name: string }): Author {
  return { id: a.id, name: a.name, bio: "", era: "", notableWorks: [] };
}

/**
 * Client-side data hook: static seed + cloud catalog (admin uploads,
 * visible to everyone) + localStorage (this device only, legacy).
 * Cloud catalog wins over seed on id conflicts.
 */
export function useLibraryData(): LibraryData {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    const seedBooks = loadBooks();
    const seedAuthors = loadAuthors();
    setCategories(loadCategories());

    // Show seed data immediately so the page never waits on the network.
    setBooks(seedBooks);
    setAuthors(seedAuthors);
    setLoaded(true);

    fetch("/api/catalog", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        const cloudBooks: Book[] = Array.isArray(data.books) ? data.books : [];
        const cloudAuthors: Author[] = (Array.isArray(data.authors) ? data.authors : []).map(toAuthor);

        const byId = new Map<string, Book>();
        for (const b of [...seedBooks, ...cloudBooks]) byId.set(b.id, b);

        const authorById = new Map<string, Author>();
        for (const a of [...seedAuthors, ...cloudAuthors]) {
          if (!authorById.has(a.id)) authorById.set(a.id, a);
        }
        // Also match catalog books whose authorId isn't known (safety net).
        for (const b of Array.from(byId.values())) {
          if (!authorById.has(b.authorId)) {
            authorById.set(b.authorId, toAuthor({ id: b.authorId, name: "" }));
          }
        }

        setBooks(Array.from(byId.values()));
        setAuthors(Array.from(authorById.values()));
      })
      .catch(() => {
        /* offline — seed data stays */
      });
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { books, authors, categories, loaded, refresh };
}
