"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type OverlayVariant = "left" | "right" | "center";

export function Overlay({
  open,
  onClose,
  title,
  children,
  variant = "right",
  className,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: OverlayVariant;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      className="fixed inset-0 z-50 size-full max-h-none max-w-none overflow-hidden bg-transparent p-0"
    >
      <div
        className={cn(
          "flex h-dvh w-full",
          variant === "center"
            ? "items-center justify-center p-4"
            : variant === "right"
              ? "justify-end"
              : "justify-start",
        )}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        <div
          className={cn(
            "flex min-h-0 flex-col bg-ivory text-charcoal",
            variant === "right" &&
              "sheet-panel-right h-full w-full max-w-[28rem] border-l border-charcoal/10",
            variant === "left" &&
              "sheet-panel-left h-full w-full max-w-[24rem] border-r border-charcoal/10",
            variant === "center" &&
              "dialog-panel max-h-full w-full max-w-[40rem] overflow-hidden border border-charcoal/10",
            className,
          )}
        >
          <div className="flex shrink-0 items-center justify-between gap-6 border-b border-charcoal/10 px-5 py-4 sm:px-6">
            <h2
              id={titleId}
              className="font-serif text-xl tracking-[-0.01em] sm:text-2xl"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="-mr-1 inline-flex size-10 items-center justify-center rounded-full transition-colors hover:bg-charcoal/6"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </dialog>
  );
}
