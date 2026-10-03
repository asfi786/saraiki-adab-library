export type Language = "skr" | "ur" | "en";
export type Theme = "light" | "dark";

export interface Category {
  id: string;
  nameSk: string;
  nameUr: string;
  nameEn: string;
  slug: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  era: string;
  notableWorks: string[];
}

export interface Book {
  id: string;
  title: string;
  authorId: string;
  categoryId: string;
  description: string;
  language: Language;
  year: number;
  publisher: string;
  pages: number;
  fileSize: string;
  downloads: number;
  reads: number;
  featured: boolean;
  isSample: boolean;
  pdfUrl: string;
  /** Optional uploaded cover image. When absent, an Ajrak palette cover is generated. */
  coverUrl?: string;
  /** True for books added via the admin panel (stored in the cloud catalog). */
  uploaded?: boolean;
}

export interface Quote {
  text: string;
  author: string;
}
