import { NextResponse } from "next/server";
import { readCatalog, writeCatalog } from "@/lib/libraryFiles";
import type { Author, Book } from "@/types";

export const dynamic = "force-dynamic";

function authed(req: Request): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
  return req.headers.get("x-admin-password") === expected;
}

function newAuthorId(): string {
  return `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

/**
 * POST /api/admin/books
 * Body: { book: Book, authorName?: string }
 * Adds a new book (or updates an existing catalog book). Auto-creates the
 * author when authorName does not match an existing author.
 */
export async function POST(req: Request) {
  if (!authed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { book?: Book; authorName?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { book, authorName } = body;
  if (!book || !book.title?.trim() || !book.pdfUrl) {
    return NextResponse.json({ error: "invalid_book" }, { status: 400 });
  }

  const catalog = await readCatalog();
  const name = (authorName ?? "").trim();

  let authorId = book.authorId;
  if (name) {
    const existing = catalog.authors.find((a) => a.name === name) ?? null;
    if (existing) {
      authorId = existing.id;
    } else {
      authorId = newAuthorId();
      catalog.authors.push({ id: authorId, name });
    }
  }

  const record: Book = {
    ...book,
    id: book.id || `b_${Date.now().toString(36)}`,
    authorId,
    uploaded: true,
    downloads: book.downloads ?? 0,
    reads: book.reads ?? 0,
  };

  const idx = catalog.books.findIndex((b) => b.id === record.id);
  if (idx >= 0) catalog.books[idx] = record;
  else catalog.books.unshift(record);

  await writeCatalog(catalog);
  return NextResponse.json({ ok: true, book: record });
}

/**
 * DELETE /api/admin/books?id=...
 * Removes a catalog book from the library.
 * (Files stay in the repo history; harmless.)
 */
export async function DELETE(req: Request) {
  if (!authed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  const catalog = await readCatalog();
  catalog.books = catalog.books.filter((b) => b.id !== id);

  // Drop orphaned authors (only those created for catalog books).
  const used = new Set(catalog.books.map((b) => b.authorId));
  catalog.authors = catalog.authors.filter((a) => used.has(a.id));

  await writeCatalog(catalog);
  return NextResponse.json({ ok: true });
}

/** Keep the Author type import used for future author edits. */
export type { Author };
