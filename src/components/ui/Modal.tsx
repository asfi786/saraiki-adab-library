"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-ajrak-indigo-dark animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-nastaliq text-2xl leading-nastaliq text-ajrak-crimson dark:text-ajrak-gold">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className={cn(
              "rounded-full p-2 text-ajrak-iron/60 hover:bg-black/5",
              "dark:text-ajrak-ecru/70 dark:hover:bg-white/10"
            )}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
