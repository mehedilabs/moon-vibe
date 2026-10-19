"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";
import { cn } from "@/lib/cn";
import type { ProductImage as ProductImageType } from "@/lib/products";

export function ProductGallery({
  images,
  productName,
}: {
  images: ProductImageType[];
  productName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
      <div className="flex gap-2 sm:flex-col">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1} of ${productName}`}
            aria-pressed={index === activeIndex}
            className={cn(
              "relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-beige ring-offset-2 ring-offset-ivory transition-opacity sm:w-20",
              index === activeIndex
                ? "ring-1 ring-charcoal"
                : "opacity-65 hover:opacity-100",
            )}
          >
            <ProductImage
              src={image.src}
              alt={image.alt}
              sizes="80px"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-beige sm:aspect-[3/4]">
        <ProductImage
          src={active.src}
          alt={active.alt}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
