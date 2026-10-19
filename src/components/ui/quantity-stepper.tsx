"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  label = "Quantity",
  compact = false,
  className,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center border border-charcoal/20",
        compact ? "h-9" : "h-11",
        className,
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className={cn(
          "inline-flex items-center justify-center transition-colors hover:bg-charcoal/6 disabled:opacity-35",
          compact ? "size-9" : "size-11",
        )}
      >
        <Minus className="size-3.5" aria-hidden="true" />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-8 text-center tabular-nums",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className={cn(
          "inline-flex items-center justify-center transition-colors hover:bg-charcoal/6 disabled:opacity-35",
          compact ? "size-9" : "size-11",
        )}
      >
        <Plus className="size-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
