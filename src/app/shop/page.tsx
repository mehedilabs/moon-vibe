import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser, ShopSkeleton } from "@/components/shop-browser";
import { Container } from "@/components/ui/container";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the full Moon Vibe edit: womenswear, menswear, and accessories with filtering, search, and sorting.",
};

export default function ShopPage() {
  return (
    <>
      <section className="border-b border-charcoal/10">
        <Container className="py-12 sm:py-16 lg:py-20">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
            The full edit
          </p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-serif text-[clamp(2.7rem,6vw,4.6rem)] leading-[0.98] tracking-[-0.035em]">
              The collection
            </h1>
            <p className="max-w-sm pb-1 text-sm leading-7 text-charcoal/60">
              {products.length} considered pieces. Filter by category or
              collection, search by name, and sort the edit your way.
            </p>
          </div>
        </Container>
      </section>

      <Suspense fallback={<ShopSkeleton />}>
        <ShopBrowser />
      </Suspense>
    </>
  );
}
