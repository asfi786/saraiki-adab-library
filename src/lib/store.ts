import { authors as seedAuthors, books as seedBooks, categories as seedCategories } from "@/lib/data";
import type { Author, Book, Category } from "@/types";

const KEYS = {
  books: "sal_books_v1",
  authors: "sal_authors_v1",
  categories: "sal_categories_v1",
} as const;

function read<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      window.localStorage.setItem(key, JSON.stringify(seed));
      return seed;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seed;
  } catch {
    return seed;
  }
}

function write(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / unavailable — ignore */
  }
}

export function loadBooks(): Book[] {
  return read<Book>(KEYS.books, seedBooks);
}
export function saveBooks(books: Book[]): void {
  write(KEYS.books, books);
}

export function loadAuthors(): Author[] {
  return read<Author>(KEYS.authors, seedAuthors);
}
export function saveAuthors(authors: Author[]): void {
  write(KEYS.authors, authors);
}

export function loadCategories(): Category[] {
  return read<Category>(KEYS.categories, seedCategories);
}
export function saveCategories(categories: Category[]): void {
  write(KEYS.categories, categories);
}

export function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
