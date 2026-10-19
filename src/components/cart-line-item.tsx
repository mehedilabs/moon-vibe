"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { useStore } from "@/components/providers/store-provider";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/components/providers/store-provider";
import type { Product } from "@/lib/products";

export function CartLineItem({
  line,
  product,
  onNavigate,
}: {
  line: CartLine;
  product: Product;
  onNavigate?: () => void;
}) {
  const { updateQuantity, removeFromCart } = useStore();

  return (
    <li className="flex gap-4 py-5">
      <Link
        href={`/product/${product.slug}`}
        onClick={onNavigate}
        className="relative aspect-[3/4] w-[4.5rem] shrink-0 overflow-hidden bg-beige sm:w-24"
      >
        <ProductImage
          src={product.images[0].src}
          alt={product.images[0].alt}
          sizes="(max-width: 640px) 72px, 96px"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/product/${product.slug}`}
              onClick={onNavigate}
              className="block font-serif text-[0.98rem] leading-snug underline-offset-4 hover:underline sm:text-base"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-xs text-charcoal/55">
              {line.size ? `Size ${line.size} · ` : ""}
              {product.color}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(product.id, line.size)}
            aria-label={`Remove ${product.name} from bag`}
            className="-mr-2 -mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-charcoal/55 transition-colors hover:bg-charcoal/6 hover:text-charcoal"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <QuantityStepper
            compact
            value={line.quantity}
            onChange={(quantity) =>
              updateQuantity(product.id, line.size, quantity)
            }
            label={`Quantity for ${product.name}`}
          />
          <p className="text-sm tabular-nums">
            {formatPrice(product.price * line.quantity)}
          </p>
        </div>
      </div>
    </li>
  );
}
