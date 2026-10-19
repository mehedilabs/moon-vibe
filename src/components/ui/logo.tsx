import Link from "next/link";
import { cn } from "@/lib/cn";

export function MoonMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-6", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9 3.6a9.1 9.1 0 1 0 4 14.9A9.4 9.4 0 0 1 16.9 3.6Z"
        fill="currentColor"
      />
      <path
        d="M5.4 5.6c.5.9.7 1.9.7 2.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M2.9 10.6c.7.3 1.3.8 1.8 1.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({
  className,
  light = false,
  onNavigate,
}: {
  className?: string;
  light?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="Moon Vibe — home"
      className={cn(
        "group inline-flex items-center gap-2.5",
        light ? "text-ivory" : "text-charcoal",
        className,
      )}
    >
      <MoonMark className="size-5 transition-transform duration-500 group-hover:-rotate-12 sm:size-6" />
      <span className="font-serif text-[1.35rem] leading-none tracking-[0.24em] sm:text-2xl">
        MOON VIBE
      </span>
    </Link>
  );
}
