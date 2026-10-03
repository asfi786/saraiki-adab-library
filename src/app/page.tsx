"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedBooks, NewArrivals } from "@/components/home/FeaturedBooks";
import { PopularAuthors } from "@/components/home/PopularAuthors";
import { Categories } from "@/components/home/Categories";
import { AboutSection } from "@/components/home/AboutSection";
import { QuoteOfDay } from "@/components/home/QuoteOfDay";
import { BookCardSkeleton } from "@/components/ui/Skeleton";
import { useLibraryData } from "@/hooks/useLibraryData";

export default function HomePage() {
  const { books, authors, categories, loaded } = useLibraryData();

  const featured = books.filter((b) => b.featured);
  const newArrivals = [...books].sort((a, b) => b.year - a.year).slice(0, 8);
  const totalReads = books.reduce((s, b) => s + b.reads, 0);

  return (
    <div className="animate-fade-in">
      <HeroSection stats={{ books: books.length, authors: authors.length, reads: totalReads }} />
      {loaded ? (
        <>
          <FeaturedBooks books={featured} authors={authors} categories={categories} />
          <NewArrivals books={newArrivals} authors={authors} categories={categories} />
          <PopularAuthors authors={authors} books={books} />
          <Categories categories={categories} books={books} />
        </>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <BookCardSkeleton key={i} />
          ))}
        </div>
      )}
      <AboutSection />
      <QuoteOfDay />
    </div>
  );
}
