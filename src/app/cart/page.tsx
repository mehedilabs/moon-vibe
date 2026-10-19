"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { CartLineItem } from "@/components/cart-line-item";
import { useStore } from "@/components/providers/store-provider";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/lib/products";

export default function CartPage() {
  const { hydrated, cart, cartCount } = useStore();

  const items = cart.flatMap((line) => {
    const product = getProductById(line.productId);
    return product ? [{ line, product }] : [];
  });

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.line.quantity,
    0,
  );

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
            Your selection
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1] tracking-[-0.03em]">
            Shopping bag
          </h1>
        </div>
        <p className="pb-1 text-xs uppercase tracking-[0.14em] text-charcoal/45">
          {cartCount} {cartCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="mt-9 sm:mt-12">
        {!hydrated ? (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex gap-4">
                  <div className="aspect-[3/4] w-24 animate-pulse bg-beige/70" />
                  <div className="flex-1 space-y-3 pt-2">
                    <div className="h-4 w-2/3 animate-pulse bg-beige/70" />
                    <div className="h-3 w-1/3 animate-pulse bg-beige/70" />
                    <div className="h-8 w-24 animate-pulse bg-beige/70" />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-56 animate-pulse bg-beige/50" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState
            icon={<ShoppingBag className="size-5" aria-hidden="true" />}
            title="Your bag is empty"
            description="Add a piece from the collection to see it here. Your bag is saved locally in this browser — but this is a demo, so no order is ever placed."
            action={{ href: "/shop", label: "Continue shopping" }}
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
                {items.map(({ line, product }) => (
                  <CartLineItem
                    key={`${line.productId}-${line.size ?? "one-size"}`}
                    line={line}
                    product={product}
                  />
                ))}
              </ul>
              <Link
                href="/shop"
                className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-charcoal/60 transition-colors hover:text-charcoal"
              >
                ← Continue shopping
              </Link>
            </div>

            <aside className="h-fit border border-charcoal/10 bg-white/40 p-5 sm:p-6 lg:sticky lg:top-28">
              <h2 className="font-serif text-2xl">Order summary</h2>
              <div className="mt-5 space-y-3 border-b border-charcoal/10 pb-5 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-charcoal/60">
                    Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"})
                  </span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-charcoal/60">Delivery</span>
                  <span className="text-xs text-charcoal/45">
                    Calculated at checkout
                  </span>
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium uppercase tracking-[0.12em]">
                  Demo total
                </span>
                <span className="text-xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <Link
                href="/checkout"
                className={buttonStyles({ className: "mt-6 w-full", size: "lg" })}
              >
                Continue to demo checkout
              </Link>
              <p className="mt-4 text-[0.68rem] leading-5 text-charcoal/45">
                This is a demonstration storefront. No payment is processed, no
                order is placed, and no data is sent to a server.
              </p>
            </aside>
          </div>
        )}
      </div>
    </Container>
  );
}
