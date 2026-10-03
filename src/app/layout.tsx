import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu, Gulzar, Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const nastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-nastaliq",
  display: "swap",
});

const gulzar = Gulzar({
  subsets: ["arabic"],
  weight: "400",
  variable: "--font-gulzar",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سرائیکی ادب لائبریری | Saraiki Adab Library",
  description:
    "A digital library for Saraiki literature — browse, read and download books wrapped in Ajrak design. سرائیکی ادب دا ڈیجیٹل خزانہ۔",
  keywords: ["Saraiki", "سرائیکی", "library", "adab", "books", "Ajrak"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="skr" dir="rtl" suppressHydrationWarning>
      <body
        className={`${nastaliq.variable} ${gulzar.variable} ${inter.variable} min-h-screen bg-ajrak-ecru font-nastaliq text-ajrak-iron antialiased dark:bg-ajrak-indigo-dark dark:text-ajrak-ecru`}
      >
        <Providers>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
