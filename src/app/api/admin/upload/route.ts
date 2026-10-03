import { NextResponse } from "next/server";
import { uploadLibraryFile } from "@/lib/libraryFiles";

export const runtime = "nodejs";

const MAX_PDF_BYTES = 50 * 1024 * 1024; // 50 MB
const MAX_IMG_BYTES = 5 * 1024 * 1024; // 5 MB

function authed(req: Request): boolean {
  const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
  return req.headers.get("x-admin-password") === expected;
}

/**
 * POST /api/admin/upload
 * Multipart form: file (PDF or image), kind ("pdf" | "cover").
 * Commits the file to the library's GitHub repo and returns its public CDN URL.
 */
export async function POST(req: Request) {
  if (!authed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const file = form.get("file");
  const kind = form.get("kind") === "cover" ? "cover" : "pdf";
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }

  if (kind === "pdf") {
    const okType =
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!okType) return NextResponse.json({ error: "not_pdf" }, { status: 400 });
    if (file.size > MAX_PDF_BYTES)
      return NextResponse.json({ error: "pdf_too_large" }, { status: 400 });
  } else {
    if (!file.type.startsWith("image/"))
      return NextResponse.json({ error: "not_image" }, { status: 400 });
    if (file.size > MAX_IMG_BYTES)
      return NextResponse.json({ error: "image_too_large" }, { status: 400 });
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const url = await uploadLibraryFile(kind, file.name, bytes);
    return NextResponse.json({ url, size: file.size });
  } catch (e) {
    console.error("library upload failed", e);
    return NextResponse.json({ error: "upload_failed" }, { status: 500 });
  }
}
