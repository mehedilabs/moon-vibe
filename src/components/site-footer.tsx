import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNavigation, siteConfig } from "@/lib/site";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <h2 className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-beige/55">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="text-sm text-ivory/75 transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-charcoal text-ivory">
      <Container className="py-14 sm:py-16">
        <div className="grid grid-cols-3 gap-x-3 gap-y-10 md:grid-cols-2 lg:grid-cols-[1.7fr_repeat(3,1fr)] lg:gap-12">
          <div className="col-span-3 max-w-sm md:col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-5 text-sm leading-7 text-ivory/65">
              A considered edit of modern clothing and accessories, built as a
              front-end portfolio project. Calm design, clear code, no real
              orders.
            </p>
            <a
              href={siteConfig.githubRepository}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 border-b border-ivory/25 pb-1 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ivory/85 transition-colors hover:border-ivory hover:text-ivory"
            >
              View source on GitHub
              <ArrowUpRight className="size-3" aria-hidden="true" />
            </a>
          </div>
          <FooterColumn title="Shop" links={footerNavigation.shop} />
          <FooterColumn title="Explore" links={footerNavigation.explore} />
          <FooterColumn title="Account" links={footerNavigation.account} />
        </div>

        <div className="mt-12 border-t border-ivory/15 pt-6">
          <p className="max-w-2xl text-[0.68rem] leading-5 text-ivory/45">
            Moon Vibe is a demonstration storefront. Product data, account
            access, cart, wishlist, and checkout are front-end only. No payments
            are processed and no customer or order data is sent to a server.
          </p>
          <div className="mt-5 flex flex-col justify-between gap-3 text-[0.65rem] uppercase tracking-[0.14em] text-ivory/40 sm:flex-row sm:items-center">
            <p>© {siteConfig.copyrightYear} Moon Vibe — demo project</p>
            <p>
              Built by{" "}
              <a
                href={siteConfig.githubProfile}
                target="_blank"
                rel="noreferrer"
                className="text-ivory/65 underline decoration-ivory/25 underline-offset-4 transition-colors hover:text-ivory"
              >
                {siteConfig.author}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
