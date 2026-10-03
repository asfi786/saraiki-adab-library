"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "sal_reading_progress";

type ProgressMap = Record<string, number>;

function readAll(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

/** Tracks the current page per book in localStorage so reading can resume. */
export function useReadingProgress(bookId: string) {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const all = readAll();
    if (all[bookId]) setPage(all[bookId]);
  }, [bookId]);

  const savePage = useCallback(
    (p: number) => {
      setPage(p);
      try {
        const all = readAll();
        all[bookId] = p;
        window.localStorage.setItem(KEY, JSON.stringify(all));
      } catch {
        /* ignore */
      }
    },
    [bookId]
  );

  return { page, savePage };
}
