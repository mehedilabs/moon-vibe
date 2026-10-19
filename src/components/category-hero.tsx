import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export function CategoryHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  meta: string;
}) {
  return (
    <section className="border-b border-charcoal/10">
      <div className="grid lg:grid-cols-2">
        <div className="flex items-center px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[540px] lg:px-12 lg:py-20">
          <div className="max-w-lg">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.24em] text-olive">
              {eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(2.8rem,6vw,4.8rem)] leading-[0.98] tracking-[-0.035em]">
              {title}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-charcoal/65 sm:text-[0.95rem]">
              {description}
            </p>
            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-2 border-b border-charcoal/25 pb-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:border-charcoal"
            >
              Browse the full shop
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
            <p className="mt-10 text-[0.65rem] uppercase tracking-[0.16em] text-charcoal/40">
              {meta}
            </p>
          </div>
        </div>
        <div className="relative min-h-[360px] sm:min-h-[440px] lg:min-h-[540px]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_28%]"
          />
        </div>
      </div>
    </section>
  );
}

export function CategoryProducts({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-xl">
          <h2 className="font-serif text-2xl tracking-[-0.015em] sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-charcoal/60">
            {description}
          </p>
        </div>
        <div className="mt-8 sm:mt-10">{children}</div>
      </Container>
    </section>
  );
}
