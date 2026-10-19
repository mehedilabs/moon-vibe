"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { useStore } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SizeSelector } from "@/components/ui/size-selector";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { categoryLabels, type Product } from "@/lib/products";
import { useState } from "react";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | undefined>();
  const wishlisted = isWishlisted(product.id);
  const hasSizes = Boolean(product.sizes?.length);

  function handleQuickAdd() {
    if (!hasSizes) {
      addToCart(product);
      return;
    }
    setQuickAddOpen(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (hasSizes && !size) {
      setError("Please choose a size before adding this piece.");
      return;
    }
    addToCart(product, { size, quantity });
    setQuickAddOpen(false);
    setQuantity(1);
    setError(undefined);
  }

  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-beige">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <ProductImage
            src={product.images[0].src}
            alt={product.images[0].alt}
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
          />
        </Link>

        {product.isNewArrival ? (
          <span className="absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-charcoal">
            New
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={wishlisted}
          className="absolute right-2.5 top-2.5 z-10 inline-flex size-11 items-center justify-center rounded-full bg-ivory/90 text-charcoal backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <Heart
            className={cn("size-[18px]", wishlisted && "fill-charcoal")}
            aria-hidden="true"
          />
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          aria-label={
            hasSizes
              ? `Choose a size for ${product.name}`
              : `Add ${product.name} to bag`
          }
          className="absolute bottom-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-full bg-ivory/92 text-charcoal shadow-sm backdrop-blur-sm transition-colors hover:bg-ivory"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 min-w-0">
        <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-charcoal/45">
          {categoryLabels[product.category]}
        </p>
        <h3 className="mt-1.5 font-serif text-[1.05rem] leading-snug tracking-[-0.01em] sm:text-lg">
          <Link
            href={`/product/${product.slug}`}
            className="line-clamp-2 underline-offset-4 hover:underline"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm tabular-nums text-charcoal/85">
          {formatPrice(product.price)}
        </p>
      </div>

      <Overlay
        open={quickAddOpen}
        onClose={() => setQuickAddOpen(false)}
        title="Quick add"
        variant="center"
      >
        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
            <div className="relative hidden aspect-[3/4] overflow-hidden bg-beige sm:block">
              <ProductImage
                src={product.images[0].src}
                alt={product.images[0].alt}
                sizes="136px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-olive">
                {categoryLabels[product.category]}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-tight">
                {product.name}
              </h3>
              <p className="mt-2 text-sm text-charcoal/60">{product.color}</p>
              <p className="mt-3 text-base tabular-nums">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-6">
            {product.sizes?.length ? (
              <SizeSelector
                sizes={product.sizes}
                value={size}
                onChange={(nextSize) => {
                  setSize(nextSize);
                  setError(undefined);
                }}
                error={error}
              />
            ) : null}

            <div className="flex items-center justify-between gap-4 border-t border-charcoal/10 pt-5">
              <span className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-charcoal/65">
                Quantity
              </span>
              <QuantityStepper value={quantity} onChange={setQuantity} />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Add to bag
            </Button>
            <p className="text-center text-[0.65rem] leading-5 text-charcoal/45">
              Demo storefront — nothing is purchased.
            </p>
          </div>
        </form>
      </Overlay>
    </article>
  );
}
