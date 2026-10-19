"use client";

import { cn } from "@/lib/cn";

export function SizeSelector({
  sizes,
  value,
  onChange,
  error,
  legend = "Select a size",
}: {
  sizes: string[];
  value?: string;
  onChange: (size: string) => void;
  error?: string;
  legend?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-charcoal/65">
        {legend}
      </legend>
      <div className="flex flex-wrap gap-2" aria-describedby={error ? "size-error" : undefined}>
        {sizes.map((size) => {
          const selected = value === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={selected}
              className={cn(
                "inline-flex h-11 min-w-11 items-center justify-center border px-3 text-xs tracking-[0.08em] transition-colors",
                selected
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/20 bg-transparent text-charcoal hover:border-charcoal",
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
      {error ? (
        <p id="size-error" className="mt-3 text-xs text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
