import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  className,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 text-[0.68rem] font-medium uppercase tracking-[0.22em]",
              light ? "text-beige/70" : "text-olive",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h2
          className={cn(
            "font-serif text-3xl leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-[2.9rem]",
            light ? "text-ivory" : "text-charcoal",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-xl text-sm leading-7",
              light ? "text-ivory/70" : "text-charcoal/65",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className={cn(
            "group inline-flex shrink-0 items-center gap-2 border-b pb-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
            light
              ? "border-ivory/30 text-ivory hover:border-ivory"
              : "border-charcoal/25 text-charcoal hover:border-charcoal",
          )}
        >
          {action.label}
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      ) : null}
    </div>
  );
}
