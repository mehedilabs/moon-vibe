import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product-grid";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { collections, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Three considered edits from Moon Vibe: Quiet Hours, City Tailoring, and Weekend Ease.",
};

const collectionImages: Record<string, { alt: string; image: string }> = {
  "quiet-hours": {
    image: "/images/collections/quiet-hours.jpg",
    alt: "A rail of soft neutral shirts in a bright studio",
  },
  "city-tailoring": {
    image: "/images/collections/city-tailoring.jpg",
    alt: "Man in a dark tailored suit in soft city light",
  },
  "weekend-ease": {
    image: "/images/collections/weekend-ease.jpg",
    alt: "Flat lay of leather boots, trousers, a watch, and a white tee",
  },
};

export default function CollectionsPage() {
  return (
    <>
      <section className="border-b border-charcoal/10">
        <Container className="py-14 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
              The collections
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.9rem,7vw,5.4rem)] leading-[0.98] tracking-[-0.035em]">
              Three ways to wear the season.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/65 sm:text-[0.95rem]">
              Each edit begins with a different kind of day — a slow morning, a
              long meeting, a weekend with nowhere to be. The pieces are
              designed to move between them.
            </p>
          </div>
        </Container>
      </section>

      <div className="divide-y divide-charcoal/10">
        {collections.map((collection, index) => {
          const items = products.filter(
            (product) => product.collection === collection.slug,
          );
          const image = collectionImages[collection.slug];
          const reversed = index % 2 === 1;

          return (
            <section key={collection.slug}>
              <Container className="py-14 sm:py-16 lg:py-20">
                <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <div
                    className={`relative min-h-[330px] overflow-hidden bg-beige sm:min-h-[420px] lg:min-h-[500px] ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={image.image}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={`max-w-xl ${reversed ? "lg:order-1" : ""}`}
                  >
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-olive">
                      Edit 0{index + 1} — {items.length} pieces
                    </p>
                    <h2 className="mt-4 font-serif text-3xl leading-[1.05] tracking-[-0.025em] sm:text-4xl lg:text-5xl">
                      {collection.name}
                    </h2>
                    <p className="mt-2 font-serif text-lg italic text-charcoal/55">
                      {collection.tagline}
                    </p>
                    <p className="mt-5 text-sm leading-7 text-charcoal/65">
                      {collection.description}
                    </p>
                    <div className="mt-7">
                      <Link
                        href={`/shop?collection=${collection.slug}`}
                        className={buttonStyles({ size: "lg" })}
                      >
                        Shop {collection.name}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>

                <ProductGrid
                  products={items.slice(0, 4)}
                  className="mt-10 sm:mt-12"
                />
              </Container>
            </section>
          );
        })}
      </div>

      <section className="border-t border-charcoal/10 bg-beige/35">
        <Container className="py-14 text-center sm:py-16">
          <h2 className="font-serif text-3xl tracking-[-0.02em] sm:text-4xl">
            See the whole edit.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-charcoal/60">
            Browse every piece, filter by category, or search for something
            specific.
          </p>
          <Link href="/shop" className={buttonStyles({ className: "mt-7", size: "lg" })}>
            Shop all pieces
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Container>
      </section>
    </>
  );
}
