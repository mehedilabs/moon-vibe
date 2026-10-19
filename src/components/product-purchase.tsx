"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { SizeSelector } from "@/components/ui/size-selector";
import { cn } from "@/lib/cn";
import type { Product } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [size, setSize] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | undefined>();
  const wishlisted = isWishlisted(product.id);
  const hasSizes = Boolean(product.sizes?.length);

  function handleAddToCart() {
    if (hasSizes && !size) {
      setError("Please choose a size before adding this piece to your bag.");
      return;
    }
    setError(undefined);
    addToCart(product, { size, quantity });
  }

  return (
    <div className="mt-8 border-t border-charcoal/10 pt-7">
      {hasSizes ? (
        <SizeSelector
          sizes={product.sizes ?? []}
          value={size}
          onChange={(nextSize) => {
            setSize(nextSize);
            setError(undefined);
          }}
          error={error}
        />
      ) : null}

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-charcoal/65">
            Quantity
          </p>
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            label={`Quantity for ${product.name}`}
          />
        </div>
        <p className="text-xs leading-5 text-charcoal/45">
          {product.material}
          <br />
          {product.color}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
        <Button
          size="lg"
          onClick={handleAddToCart}
          className="w-full flex-1 sm:w-auto"
        >
          Add to bag
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          className="w-full sm:w-auto"
        >
          <Heart
            className={cn("size-4", wishlisted && "fill-charcoal")}
            aria-hidden="true"
          />
          {wishlisted ? "Saved to wishlist" : "Add to wishlist"}
        </Button>
      </div>

      <p className="mt-4 text-[0.68rem] leading-5 text-charcoal/45">
        Demo storefront — adding an item saves it to your browser only. No order
        is placed and no payment is processed.
      </p>
    </div>
  );
}
