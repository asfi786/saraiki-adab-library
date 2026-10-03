/**
 * Server-side file + catalog storage backed by a GitHub repo.
 * PDFs/covers are committed to the repo and served via the jsDelivr CDN
 * (immutable URLs, cache-friendly). The book catalog lives in
 * catalog.json in the same repo and is read fresh via the GitHub API.
 */

const API = "https://api.github.com";

function repo(): string {
  const r = process.env.GITHUB_FILES_REPO;
  if (!r || !r.includes("/")) throw new Error("GITHUB_FILES_REPO not set");
  return r;
}

function token(): string {
  const t = process.env.GITHUB_FILES_TOKEN;
  if (!t) throw new Error("GITHUB_FILES_TOKEN not set");
  return t;
}

async function gh(path: string, method = "GET", body?: unknown): Promise<any> {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token()}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`github ${method} ${path}: ${res.status} ${text.slice(0, 200)}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function toBase64(bytes: Uint8Array): string {
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    const part = bytes.subarray(i, i + CHUNK);
    for (let j = 0; j < part.length; j++) bin += String.fromCharCode(part[j]);
  }
  return btoa(bin);
}

/** Commit a file to the repo. Returns the public CDN URL. */
export async function uploadLibraryFile(
  kind: "pdf" | "cover",
  filename: string,
  bytes: Uint8Array
): Promise<string> {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80) || "file";
  const uid = `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const path = kind === "pdf" ? `pdfs/${uid}_${safe}` : `covers/${uid}_${safe}`;

  await gh(`/repos/${repo()}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`, "PUT", {
    message: `Add ${kind}: ${safe}`,
    content: toBase64(bytes),
  });

  // jsDelivr serves GitHub files over a fast CDN. New files get fresh URLs
  // (uid), so CDN caching is safe.
  return `https://cdn.jsdelivr.net/gh/${repo()}@main/${path}`;
}

export interface CatalogAuthor {
  id: string;
  name: string;
}

export interface Catalog {
  books: any[];
  authors: CatalogAuthor[];
  sha?: string;
}

const EMPTY: Catalog = { books: [], authors: [] };

/** Read catalog.json from the repo (fresh, no CDN cache). */
export async function readCatalog(): Promise<Catalog> {
  try {
    const data = await gh(`/repos/${repo()}/contents/catalog.json`);
    const content = Buffer.from(data.content as string, "base64").toString("utf-8");
    const parsed = JSON.parse(content) as Partial<Catalog>;
    return {
      books: Array.isArray(parsed.books) ? parsed.books : [],
      authors: Array.isArray(parsed.authors) ? parsed.authors : [],
      sha: data.sha as string,
    };
  } catch (e: any) {
    if (String(e?.message ?? e).includes("404")) return EMPTY;
    console.error("readCatalog failed", e);
    return EMPTY;
  }
}

/** Write catalog.json back to the repo. */
export async function writeCatalog(catalog: Catalog): Promise<void> {
  const content = Buffer.from(JSON.stringify(catalog, null, 1)).toString("base64");
  const body: Record<string, unknown> = {
    message: `Update catalog (${catalog.books.length} books)`,
    content,
  };
  // Re-read SHA to avoid conflicts when the UI double-saves.
  const current = await readCatalog().catch(() => null);
  if (current?.sha) body.sha = current.sha;
  else if (catalog.sha) body.sha = catalog.sha;
  await gh(`/repos/${repo()}/contents/catalog.json`, "PUT", body);
}
