"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Moon,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { PDFDocumentProxy } from "pdfjs-dist";

interface PdfReaderProps {
  bookId: string;
  pdfUrl: string;
  title: string;
}

type ZoomMode = "fit-width" | "fit-page" | number;

export function PdfReader({ bookId, pdfUrl, title }: PdfReaderProps) {
  const { t, dir } = useLanguage();
  const { page: savedPage, savePage } = useReadingProgress(bookId);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const docRef = useRef<PDFDocumentProxy | null>(null);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState<ZoomMode>("fit-width");
  const [night, setNight] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [jump, setJump] = useState("");

  const goTo = useCallback(
    (p: number) => {
      const clamped = Math.min(Math.max(1, p), numPages || 1);
      setPage(clamped);
      savePage(clamped);
    },
    [numPages, savePage]
  );

  // Load the document once
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        const doc = await pdfjs.getDocument(pdfUrl).promise;
        if (cancelled) {
          doc.destroy();
          return;
        }
        docRef.current = doc;
        setNumPages(doc.numPages);
        setLoading(false);
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      docRef.current?.destroy();
      docRef.current = null;
    };
  }, [pdfUrl]);

  // Restore saved page after load
  useEffect(() => {
    if (!loading && numPages > 0 && savedPage > 1) {
      setPage(Math.min(savedPage, numPages));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, numPages]);

  // Render the current page
  useEffect(() => {
    if (loading || error || !docRef.current) return;
    const doc = docRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let cancelled = false;
    (async () => {
      try {
        renderTaskRef.current?.cancel();
        const pdfPage = await doc.getPage(page);
        if (cancelled) return;

        const containerWidth = container.clientWidth - 32;
        const base = pdfPage.getViewport({ scale: 1 });
        let scale: number;
        if (zoom === "fit-width") scale = containerWidth / base.width;
        else if (zoom === "fit-page") {
          const h = Math.max(400, window.innerHeight - 220);
          scale = Math.min(containerWidth / base.width, h / base.height);
        } else scale = zoom;

        const viewport = pdfPage.getViewport({ scale: Math.min(scale, 3) });
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const task = pdfPage.render({ canvasContext: ctx, viewport });
        renderTaskRef.current = task;
        await task.promise;
      } catch (e) {
        if ((e as Error)?.name !== "RenderingCancelledException") {
          // keep previous frame on transient errors
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, zoom, loading, error]);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else containerRef.current?.requestFullscreen?.().catch(() => {});
  };

  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24" role="status">
        <Loader2 className="h-10 w-10 animate-spin text-ajrak-crimson dark:text-ajrak-gold" />
        <p className="font-nastaliq text-2xl leading-nastaliq text-ajrak-indigo dark:text-ajrak-ecru">
          {t("readerLoading")}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center" role="alert">
        <AlertTriangle className="h-10 w-10 text-ajrak-crimson" />
        <p className="font-nastaliq text-2xl leading-nastaliq">{t("readerError")}</p>
        <p className="text-sm text-ajrak-iron/60 dark:text-ajrak-ecru/60">{title}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="sticky top-[76px] z-30 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-ajrak-crimson/15 bg-white/95 p-2 shadow-md backdrop-blur dark:border-white/10 dark:bg-ajrak-indigo-dark/95">
        <Button size="sm" variant="ghost" onClick={() => goTo(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <PrevIcon className="h-4 w-4" />
        </Button>
        <form
          className="flex items-center gap-1 text-sm"
          onSubmit={(e) => {
            e.preventDefault();
            const n = parseInt(jump, 10);
            if (!Number.isNaN(n)) goTo(n);
            setJump("");
          }}
        >
          <span className="font-nastaliq text-base">{t("pageOf")}</span>
          <input
            value={jump}
            onChange={(e) => setJump(e.target.value)}
            placeholder={String(page)}
            inputMode="numeric"
            aria-label={t("pageOf")}
            className="w-14 rounded-lg border border-ajrak-crimson/20 bg-transparent px-2 py-1 text-center text-sm dark:border-white/20"
          />
          <span className="text-ajrak-iron/60 dark:text-ajrak-ecru/60">/ {numPages}</span>
        </form>
        <Button size="sm" variant="ghost" onClick={() => goTo(page + 1)} disabled={page >= numPages} aria-label="Next page">
          <NextIcon className="h-4 w-4" />
        </Button>

        <span className="mx-1 h-6 w-px bg-ajrak-crimson/15 dark:bg-white/10" aria-hidden="true" />

        <Button size="sm" variant="ghost" onClick={() => setZoom((z) => (typeof z === "number" ? Math.min(3, +(z + 0.25).toFixed(2)) : 1.25))} aria-label={t("zoomIn")}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setZoom((z) => (typeof z === "number" ? Math.max(0.5, +(z - 0.25).toFixed(2)) : 0.75))} aria-label={t("zoomOut")}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button size="sm" variant={zoom === "fit-width" ? "indigo" : "ghost"} onClick={() => setZoom("fit-width")}>
          {t("fitWidth")}
        </Button>
        <Button size="sm" variant={zoom === "fit-page" ? "indigo" : "ghost"} onClick={() => setZoom("fit-page")}>
          {t("fitPage")}
        </Button>

        <span className="mx-1 h-6 w-px bg-ajrak-crimson/15 dark:bg-white/10" aria-hidden="true" />

        <Button
          size="sm"
          variant={night ? "indigo" : "ghost"}
          onClick={() => setNight((n) => !n)}
          aria-pressed={night}
          aria-label={t("nightMode")}
        >
          <Moon className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost" onClick={toggleFullscreen} aria-label={t("fullscreen")}>
          <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {savedPage > 1 && page === savedPage && (
        <p className="text-center font-nastaliq text-base text-ajrak-crimson dark:text-ajrak-gold">
          {t("resumeReading")} — {t("pageOf")} {savedPage}
        </p>
      )}

      {/* Page canvas */}
      <div
        ref={containerRef}
        className={cn(
          "flex justify-center overflow-auto rounded-2xl border border-ajrak-crimson/15 p-4 dark:border-white/10",
          night ? "bg-black" : "bg-ajrak-ecru-dark/60 dark:bg-black/40"
        )}
      >
        <canvas
          ref={canvasRef}
          className={cn("max-w-full rounded shadow-lg", night && "invert-[0.92] hue-rotate-180")}
          role="img"
          aria-label={`${title} — ${t("pageOf")} ${page}`}
        />
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => goTo(page - 1)} disabled={page <= 1}>
          <PrevIcon className="h-4 w-4" aria-hidden="true" />
          {page - 1 > 0 ? `${t("pageOf")} ${page - 1}` : t("pageOf")}
        </Button>
        <span className="font-inter text-sm text-ajrak-iron/60 dark:text-ajrak-ecru/60">
          {page} / {numPages}
        </span>
        <Button variant="outline" onClick={() => goTo(page + 1)} disabled={page >= numPages}>
          {page + 1 <= numPages ? `${t("pageOf")} ${page + 1}` : t("pageOf")}
          <NextIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
