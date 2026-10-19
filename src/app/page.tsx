import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProductGrid } from "@/components/product-grid";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPrice } from "@/lib/format";
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

const categoryLinks = [
  {
    href: "/women",
    label: "Women",
    count: products.filter((product) => product.category === "women").length,
  },
  {
    href: "/men",
    label: "Men",
    count: products.filter((product) => product.category === "men").length,
  },
  {
    href: "/shop?category=accessories",
    label: "Accessories",
    count: products.filter((product) => product.category === "accessories")
      .length,
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const newArrivals = getNewArrivals(4);
  const heroPiece = featured[0] ?? products[0];

  return (
    <>
      <section className="border-b border-charcoal/10">
        <div className="grid md:grid-cols-[1fr_0.96fr] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="order-2 flex items-center px-5 py-9 sm:px-8 sm:py-12 md:order-1 md:px-8 md:py-12 lg:px-12 lg:py-16 xl:pl-[max(3rem,calc((100vw-1440px)/2+3rem))]">
            <div className="w-full max-w-[34rem] animate-rise">
              <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-olive sm:text-[0.62rem] sm:tracking-[0.21em] lg:text-[0.65rem] lg:tracking-[0.24em]">
                New season
                <span aria-hidden="true" className="mx-1.5 text-charcoal/25">
                  ·
                </span>
                Women / Men / Accessories
              </p>

              <h1 className="mt-5 font-serif text-[clamp(2.75rem,5.8vw,5.2rem)] leading-[0.96] tracking-[-0.04em]">
                Discover your
                <span className="block">everyday style.</span>
              </h1>

              <p className="mt-5 max-w-[30rem] text-sm leading-7 text-charcoal/65 sm:mt-6 sm:text-[0.95rem] sm:leading-8">
                Shop the new-season edit of womenswear, menswear, and
                accessories. Warm neutrals, natural textures, and easy
                silhouettes for every day.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <Link
                  href="/shop"
                  className={buttonStyles({
                    size: "lg",
                    className: "w-full sm:w-auto",
                  })}
                >
                  Shop Collection
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/shop?sort=newest"
                  className="group inline-flex min-h-11 w-full items-center justify-center gap-2 text-sm font-medium text-charcoal underline decoration-charcoal/25 underline-offset-4 transition-colors hover:decoration-charcoal sm:w-auto sm:justify-start"
                >
                  New Arrivals
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <div className="mt-8 border-t border-charcoal/10 pt-5 sm:mt-10">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-charcoal/40">
                  Shop by category
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                  {categoryLinks.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className="group flex items-center gap-1.5 border-b border-transparent py-1.5 text-sm transition-colors hover:border-charcoal/20"
                    >
                      <span>{category.label}</span>
                      <span className="text-[0.58rem] tabular-nums tracking-[0.08em] text-charcoal/35 transition-colors group-hover:text-olive">
                        {String(category.count).padStart(2, "0")}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative order-1 h-[clamp(15rem,38svh,21rem)] overflow-hidden bg-beige md:order-2 md:h-auto md:min-h-[560px] lg:min-h-[660px] xl:min-h-[710px]">
            <Image
              src="/images/editorial/hero.jpg"
              alt="Woman in a deep green checked coat carrying a leather bag on a quiet city street"
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 56vw"
              className="object-cover object-[center_20%] sm:object-[center_22%] lg:object-[center_28%]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-charcoal/40 to-transparent" />

            <Link
              href={`/product/${heroPiece.slug}`}
              className="group absolute inset-x-4 bottom-4 flex items-center gap-3 border border-ivory/70 bg-ivory/95 p-3 shadow-[0_16px_40px_rgba(32,37,31,0.18)] backdrop-blur-md transition-colors hover:bg-ivory sm:bottom-6 sm:left-auto sm:right-6 sm:w-[19rem] sm:p-4"
            >
              <span className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden bg-beige sm:w-14">
                <Image
                  src={heroPiece.images[0].src}
                  alt={heroPiece.images[0].alt}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.55rem] font-medium uppercase tracking-[0.18em] text-olive">
                  Featured piece
                </span>
                <span className="mt-1 block truncate font-serif text-[0.95rem] leading-snug tracking-[-0.01em] sm:text-base">
                  {heroPiece.name}
                </span>
                <span className="mt-0.5 block text-xs tabular-nums text-charcoal/55">
                  {formatPrice(heroPiece.price)}
                </span>
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-charcoal/45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-charcoal"
                aria-hidden="true"
              />
            </Link>
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
