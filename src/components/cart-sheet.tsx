"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { useStore } from "@/components/providers/store-provider";
import { buttonStyles } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";

export function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, cartCount, updateQuantity, removeFromCart } = useStore();

  const items = cart.flatMap((line) => {
    const product = getProductById(line.productId);
    return product ? [{ line, product }] : [];
  });

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.line.quantity,
    0,
  );

  return (
    <Overlay
      open={open}
      onClose={onClose}
      title={`Shopping bag${cartCount > 0 ? ` (${cartCount})` : ""}`}
      variant="right"
    >
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-beige/70">
            <ShoppingBag className="size-5" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl">Your bag is empty</h3>
          <p className="mt-3 max-w-xs text-sm leading-7 text-charcoal/60">
            Pieces you add will appear here. This is a demo storefront, so no
            order will ever be placed.
          </p>
          <Link
            href="/shop"
            onClick={onClose}
            className={buttonStyles({ className: "mt-7" })}
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex min-h-full flex-col">
          <ul className="flex-1 divide-y divide-charcoal/10 px-5 sm:px-6">
            {items.map(({ line, product }) => (
              <li
                key={`${line.productId}-${line.size ?? "one-size"}`}
                className="flex gap-4 py-5"
              >
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="relative aspect-[3/4] w-[4.5rem] shrink-0 overflow-hidden bg-beige"
                >
                  <ProductImage
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    sizes="72px"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="block truncate font-serif text-[0.95rem] leading-snug underline-offset-4 hover:underline"
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
                      onClick={() =>
                        removeFromCart(product.id, line.size)
                      }
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
            ))}
          </ul>

          <div className="sticky bottom-0 border-t border-charcoal/10 bg-ivory px-5 pb-6 pt-5 sm:px-6">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-[0.14em] text-charcoal/60">
                Subtotal
              </span>
              <span className="text-base tabular-nums">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="mt-2 text-[0.68rem] leading-5 text-charcoal/45">
              Demo checkout. No payment is processed and no order is placed.
            </p>
            <div className="mt-5 space-y-2.5">
              <Link
                href="/checkout"
                onClick={onClose}
                className={buttonStyles({ className: "w-full", size: "lg" })}
              >
                Continue to demo checkout
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className={buttonStyles({
                  variant: "outline",
                  className: "w-full",
                })}
              >
                View shopping bag
              </Link>
            </div>
          </div>
        </div>
      )}
    </Overlay>
  );
}
