import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductGrid } from "@/components/product-grid";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getFeaturedProducts,
  getNewArrivals,
  products,
} from "@/lib/products";

const collectionTiles = [
  {
    href: "/women",
    label: "Women",
    note: "Soft tailoring, fluid dresses",
    image: "/images/editorial/collection-women.jpg",
    alt: "Woman in a pale blue trench coat in a city square",
    className:
      "col-span-2 h-[360px] sm:h-[420px] md:col-span-5 md:h-[520px]",
  },
  {
    href: "/men",
    label: "Men",
    note: "Quiet structure, everyday layers",
    image: "/images/editorial/collection-men.jpg",
    alt: "Man in a dark jacket sitting in a sunlit architectural space",
    className: "col-span-1 h-[280px] md:col-span-4 md:h-[520px]",
  },
  {
    href: "/shop?category=accessories",
    label: "Accessories",
    note: "The finishing details",
    image: "/images/editorial/collection-accessories.jpg",
    alt: "Apricot woven leather tote bag",
    className: "col-span-1 h-[280px] md:col-span-3 md:h-[520px]",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);

  return (
    <>
      <section className="border-b border-charcoal/10">
        <div className="grid lg:grid-cols-[1.02fr_1fr]">
          <div className="flex items-center px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[680px] lg:px-12 lg:py-24 xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
            <div className="max-w-xl animate-rise">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
                Autumn / Winter 2026 — the demo edit
              </p>
              <h1 className="mt-6 font-serif text-[clamp(2.9rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.035em]">
                Dressed in quiet confidence.
              </h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-charcoal/65 sm:text-[0.95rem] sm:leading-8">
                A considered wardrobe of modern silhouettes, warm neutrals, and
                pieces that stay with you. Welcome to Moon Vibe.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href="/shop" className={buttonStyles({ size: "lg" })}>
                  Explore the collection
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/shop?sort=newest"
                  className={buttonStyles({
                    variant: "outline",
                    size: "lg",
                  })}
                >
                  Shop new arrivals
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-charcoal/10 pt-5 text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/45">
                <span>{products.length} considered pieces</span>
                <span aria-hidden="true" className="hidden h-3 w-px bg-charcoal/15 sm:block" />
                <span>Front-end demo</span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[680px]">
            <Image
              src="/images/editorial/hero.jpg"
              alt="Woman in a deep green checked coat on a quiet city street"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_28%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal/50 to-transparent" />
            <p className="absolute bottom-5 left-5 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-ivory/85 sm:bottom-7 sm:left-8">
              The Quiet Hours edit — look 01
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-charcoal/10 bg-beige/45">
        <Container className="grid gap-8 py-9 sm:grid-cols-3 sm:gap-6 sm:py-10">
          {[
            {
              title: "A slower wardrobe",
              copy: "Fewer, better pieces chosen to work together.",
            },
            {
              title: "Natural texture",
              copy: "Wool, cotton, silk, and leather in a warm palette.",
            },
            {
              title: "Everyday ease",
              copy: "Relaxed tailoring and clean lines for real days.",
            },
          ].map((value, index) => (
            <div key={value.title} className="flex gap-4">
              <span className="mt-0.5 text-[0.6rem] tabular-nums tracking-[0.16em] text-olive">
                0{index + 1}
              </span>
              <div>
                <h2 className="font-serif text-lg">{value.title}</h2>
                <p className="mt-1.5 text-xs leading-6 text-charcoal/60">
                  {value.copy}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Explore"
            title="Shop by mood"
            action={{ href: "/collections", label: "View all collections" }}
          />
          <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-11 sm:gap-4 md:grid-cols-12">
            {collectionTiles.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className={`group relative overflow-hidden bg-beige ${tile.className}`}
              >
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-charcoal/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-ivory sm:p-6">
                  <div>
                    <p className="font-serif text-xl tracking-[-0.01em] sm:text-2xl">
                      {tile.label}
                    </p>
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.15em] text-ivory/65 sm:text-[0.68rem]">
                      {tile.note}
                    </p>
                  </div>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-ivory/40 transition-colors group-hover:bg-ivory group-hover:text-charcoal">
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-charcoal/10 bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Featured pieces"
            title="The pieces we keep coming back to."
            action={{ href: "/shop", label: "Shop all" }}
          />
          <ProductGrid
            products={featured}
            className="mt-9 sm:mt-11"
            priorityCount={2}
          />
        </Container>
      </section>

      <section className="relative overflow-hidden">
        <div className="relative min-h-[500px] sm:min-h-[560px]">
          <Image
            src="/images/editorial/banner.jpg"
            alt="Woman in striped trousers against a deep green wall"
            fill
            sizes="100vw"
            className="object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-charcoal/45" />
          <Container className="relative flex min-h-[500px] items-end py-12 sm:min-h-[560px] sm:py-16">
            <div className="max-w-xl text-ivory">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-ivory/70">
                The edit — no. 01
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
                The art of getting dressed.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-ivory/75">
                Strong lines, quiet colour, and one piece that does the talking.
                Discover the season&apos;s most considered layers.
              </p>
              <Link
                href="/shop?collection=weekend-ease"
                className={buttonStyles({
                  variant: "light",
                  size: "lg",
                  className: "mt-7",
                })}
              >
                Discover Weekend Ease
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden bg-beige sm:aspect-[5/4]">
            <Image
              src="/images/editorial/brand.jpg"
              alt="A considered rail of neutral knitwear and soft jackets"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-xl">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
              Our point of view
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-[1.08] tracking-[-0.02em] sm:text-4xl lg:text-[2.9rem]">
              Clothes for the life you actually live.
            </h2>
            <p className="mt-5 text-sm leading-7 text-charcoal/65">
              Moon Vibe began with a simple idea: a wardrobe should feel calm.
              That means fewer pieces, chosen with care — a coat that works over
              everything, a dress that needs no effort, a bag that gets better
              with use.
            </p>
            <p className="mt-4 text-sm leading-7 text-charcoal/65">
              Our edit favours natural texture, a warm neutral palette, and
              silhouettes that leave room to move. Nothing loud. Nothing
              disposable. Just the pieces you reach for.
            </p>
            <p className="mt-6 font-bangla text-lg text-olive">
              শান্ত রুচি, আধুনিক ছোঁয়া
            </p>
            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-charcoal/40">
              Quiet taste, a modern touch
            </p>
            <Link
              href="/collections"
              className="mt-7 inline-flex items-center gap-2 border-b border-charcoal/25 pb-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-charcoal"
            >
              Read the collections
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <p className="mt-7 text-[0.65rem] leading-5 text-charcoal/40">
              Moon Vibe is a fictional label created for this front-end
              portfolio demo. The photography is sourced from Unsplash.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-charcoal/10 bg-beige/35 py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            eyebrow="Just in"
            title="New arrivals"
            action={{ href: "/shop?sort=newest", label: "View the full edit" }}
          />
          <ProductGrid products={newArrivals} className="mt-9 sm:mt-11" />
        </Container>
      </section>

      <section>
        <Container className="grid gap-8 py-14 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-20 lg:py-20">
          <div className="max-w-lg">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
              Stay in the loop
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-[1.08] tracking-[-0.02em] sm:text-4xl">
              A quiet note, now and then.
            </h2>
            <p className="mt-4 text-sm leading-7 text-charcoal/60">
              A demo of a newsletter signup, built to show the interaction
              without pretending to collect real addresses.
            </p>
          </div>
          <NewsletterForm />
        </Container>
      </section>
    </>
  );
}
