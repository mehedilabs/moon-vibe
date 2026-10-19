"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { CartLineItem } from "@/components/cart-line-item";
import { useStore } from "@/components/providers/store-provider";
import { buttonStyles } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";

export function CartSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, cartCount } = useStore();

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
              <CartLineItem
                key={`${line.productId}-${line.size ?? "one-size"}`}
                line={line}
                product={product}
                onNavigate={onClose}
              />
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
