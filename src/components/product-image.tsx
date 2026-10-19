"use client";

import Image from "next/image";
import { useState } from "react";
import { MoonMark } from "@/components/ui/logo";
import { cn } from "@/lib/cn";

export function ProductImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-beige px-4 text-center text-charcoal/45"
      >
        <MoonMark className="size-8" />
        <span className="text-[0.6rem] uppercase tracking-[0.2em]">
          Moon Vibe
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailedSrc(src)}
      className={cn("object-cover", className)}
    />
  );
}
