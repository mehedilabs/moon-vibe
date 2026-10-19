"use client";

import Link from "next/link";
import { ArrowUpRight, Heart, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/components/providers/store-provider";
import { Overlay } from "@/components/ui/overlay";
import { primaryNavigation, siteConfig } from "@/lib/site";

export function MobileMenu({
  open,
  onClose,
  onOpenCart,
}: {
  open: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}) {
  const { account, cartCount, wishlistCount } = useStore();

  return (
    <Overlay open={open} onClose={onClose} title="Menu" variant="left">
      <nav aria-label="Mobile" className="flex h-full flex-col">
        <ul className="border-b border-charcoal/10 px-5 py-4 sm:px-6">
          {primaryNavigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block border-b border-charcoal/8 py-4 font-serif text-2xl tracking-[-0.01em] last:border-b-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="space-y-1 px-5 py-5 sm:px-6">
          <Link
            href="/account"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3 text-sm text-charcoal/75 hover:text-charcoal"
          >
            <User className="size-4" aria-hidden="true" />
            {account ? `Hello, ${account.name}` : "Account"}
          </Link>
          <Link
            href="/wishlist"
            onClick={onClose}
            className="flex min-h-11 items-center gap-3 text-sm text-charcoal/75 hover:text-charcoal"
          >
            <Heart className="size-4" aria-hidden="true" />
            Wishlist
            {wishlistCount > 0 ? (
              <span className="text-xs text-olive">({wishlistCount})</span>
            ) : null}
          </Link>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenCart();
            }}
            className="flex min-h-11 w-full items-center gap-3 text-sm text-charcoal/75 hover:text-charcoal"
          >
            <ShoppingBag className="size-4" aria-hidden="true" />
            Shopping bag
            {cartCount > 0 ? (
              <span className="text-xs text-olive">({cartCount})</span>
            ) : null}
          </button>
        </div>

        <div className="mt-auto border-t border-charcoal/10 px-5 py-5 sm:px-6">
          <p className="text-[0.68rem] leading-5 text-charcoal/45">
            Moon Vibe is a front-end portfolio demo. No real orders, payments,
            or accounts are processed.
          </p>
          <a
            href={siteConfig.githubRepository}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-charcoal underline decoration-charcoal/25 underline-offset-4"
          >
            View source on GitHub
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </a>
        </div>
      </nav>
    </Overlay>
  );
}
