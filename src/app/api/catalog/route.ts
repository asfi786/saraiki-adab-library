import { NextResponse } from "next/server";
import { readCatalog } from "@/lib/libraryFiles";

export const dynamic = "force-dynamic";

/** Public: list books uploaded via the admin panel. */
export async function GET() {
  const catalog = await readCatalog();
  return NextResponse.json(
    { books: catalog.books, authors: catalog.authors },
    { headers: { "cache-control": "no-store" } }
  );
}
