import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ProductGallery } from "@/components/product-gallery";
import { ProductGrid } from "@/components/product-grid";
import { ProductPurchase } from "@/components/product-purchase";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPrice } from "@/lib/format";
import {
  categoryLabels,
  collections,
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Piece not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const collection = collections.find(
    (item) => item.slug === product.collection,
  );
  const related = getRelatedProducts(product, 4);

  return (
    <>
      <Container className="py-5 sm:py-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.12em] text-charcoal/45">
            <li>
              <Link href="/" className="transition-colors hover:text-charcoal">
                Home
              </Link>
            </li>
            <ChevronRight className="size-3" aria-hidden="true" />
            <li>
              <Link href="/shop" className="transition-colors hover:text-charcoal">
                Shop
              </Link>
            </li>
            <ChevronRight className="size-3" aria-hidden="true" />
            <li className="min-w-0 truncate text-charcoal/70" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      <section className="border-y border-charcoal/10 bg-white/35">
        <Container className="grid gap-10 py-8 sm:py-10 lg:grid-cols-[1.08fr_1fr] lg:gap-16 lg:py-14">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="max-w-xl lg:py-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-charcoal/45">
              <Link
                href={`/shop?category=${product.category}`}
                className="text-olive transition-colors hover:text-charcoal"
              >
                {categoryLabels[product.category]}
              </Link>
              <span aria-hidden="true" className="h-3 w-px bg-charcoal/15" />
              <Link
                href={`/shop?collection=${product.collection}`}
                className="transition-colors hover:text-charcoal"
              >
                {collection?.name ?? "The edit"}
              </Link>
            </div>

            <h1 className="mt-4 font-serif text-[clamp(2.1rem,4.5vw,3.4rem)] leading-[1.02] tracking-[-0.03em]">
              {product.name}
            </h1>
            <p className="mt-3 text-lg tabular-nums">
              {formatPrice(product.price)}
            </p>
            <p className="mt-5 text-sm leading-7 text-charcoal/65">
              {product.description}
            </p>

            <ProductPurchase product={product} />

            <div className="mt-8 border-t border-charcoal/10">
              <details className="group border-b border-charcoal/10">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-medium">
                  Details &amp; care
                  <span className="text-lg leading-none text-charcoal/40 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-5">
                  <ul className="space-y-2 text-sm leading-6 text-charcoal/65">
                    {product.details.map((detail) => (
                      <li key={detail} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-olive" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-6 text-charcoal/50">
                    Composition: {product.material}. Colour: {product.color}.
                  </p>
                </div>
              </details>

              <details className="group border-b border-charcoal/10">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-medium">
                  Demo information
                  <span className="text-lg leading-none text-charcoal/40 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="pb-5 text-sm leading-7 text-charcoal/65">
                  <p>
                    This is a front-end demonstration storefront. Product data
                    is curated locally, and cart, wishlist, and account details
                    are stored only in your browser.
                  </p>
                  <p className="mt-2">
                    No payment is processed, no order is placed, and no data is
                    sent to a server.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="py-14 sm:py-16 lg:py-20">
          <Container>
            <SectionHeading
              eyebrow="You may also like"
              title="More from the edit"
              action={{ href: "/shop", label: "Shop all" }}
            />
            <ProductGrid products={related} className="mt-8 sm:mt-10" />
          </Container>
        </section>
      ) : null}
    </>
  );
}
