"use client";

import { Heart } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { useStore } from "@/components/providers/store-provider";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { products } from "@/lib/products";

export default function WishlistPage() {
  const { hydrated, wishlist } = useStore();
  const saved = wishlist.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });

  return (
    <Container className="py-12 sm:py-16 lg:py-20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
            Saved for later
          </p>
          <h1 className="mt-3 font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1] tracking-[-0.03em]">
            Wishlist
          </h1>
        </div>
        <p className="pb-1 text-xs uppercase tracking-[0.14em] text-charcoal/45">
          {saved.length} {saved.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="mt-9 sm:mt-12">
        {!hydrated ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-[3/4] animate-pulse bg-beige/70" />
                <div className="mt-4 h-4 w-3/4 animate-pulse bg-beige/70" />
                <div className="mt-2 h-3 w-1/3 animate-pulse bg-beige/70" />
              </div>
            ))}
          </div>
        ) : saved.length === 0 ? (
          <EmptyState
            icon={<Heart className="size-5" aria-hidden="true" />}
            title="Nothing saved yet"
            description="Tap the heart on any piece to keep it here. Your wishlist is stored locally in this browser."
            action={{ href: "/shop", label: "Explore the collection" }}
          />
        ) : (
          <>
            <p className="mb-7 max-w-xl text-sm leading-7 text-charcoal/55">
              Saved locally in this browser. Add a piece to your bag whenever
              you are ready — nothing here is sent anywhere.
            </p>
            <ProductGrid products={saved} priorityCount={2} />
          </>
        )}
      </div>
    </Container>
  );
}
