"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { CartSheet } from "@/components/cart-sheet";
import { MobileMenu } from "@/components/mobile-menu";
import { useStore } from "@/components/providers/store-provider";
import { SearchOverlay } from "@/components/search-overlay";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/cn";
import { primaryNavigation } from "@/lib/site";

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden="true"
      className="absolute -right-0.5 -top-0.5 flex size-[1.15rem] items-center justify-center rounded-full bg-olive text-[0.58rem] font-medium leading-none text-white"
    >
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const {
    account,
    cartCount,
    cartOpen,
    setCartOpen,
    wishlistCount,
  } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <div className="bg-charcoal px-4 py-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.16em] text-ivory/80">
        Fashion demo — no real orders or payments
      </div>

      <header className="sticky top-0 z-40 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <div className="flex items-center gap-2 lg:flex-1">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              className="-ml-2 inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-charcoal/6 lg:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
            <Logo />
          </div>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 lg:flex xl:gap-9"
          >
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-charcoal after:transition-transform after:duration-300 hover:text-charcoal hover:after:scale-x-100",
                  isActive(item.href) ? "text-charcoal" : "text-charcoal/65",
                  isActive(item.href) && "after:scale-x-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1 lg:flex-1 lg:justify-end">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              className="inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-charcoal/6"
            >
              <Search className="size-[19px]" aria-hidden="true" />
            </button>

            <Link
              href="/account"
              aria-label={account ? `Account for ${account.name}` : "Account"}
              className="relative hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-charcoal/6 lg:inline-flex"
            >
              <User className="size-[19px]" aria-hidden="true" />
              {account ? (
                <span className="absolute bottom-2 right-2 size-1.5 rounded-full bg-olive ring-2 ring-ivory" />
              ) : null}
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? ` (${wishlistCount} items)` : ""}`}
              className="relative hidden size-11 items-center justify-center rounded-full transition-colors hover:bg-charcoal/6 lg:inline-flex"
            >
              <Heart className="size-[19px]" aria-hidden="true" />
              <CountBadge count={wishlistCount} />
            </Link>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag${cartCount > 0 ? ` (${cartCount} items)` : ""}`}
              aria-haspopup="dialog"
              aria-expanded={cartOpen}
              className="relative inline-flex size-11 items-center justify-center rounded-full transition-colors hover:bg-charcoal/6"
            >
              <ShoppingBag className="size-[19px]" aria-hidden="true" />
              <CountBadge count={cartCount} />
            </button>
          </div>
        </Container>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenCart={() => setCartOpen(true)}
      />
      <CartSheet open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
