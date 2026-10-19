"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useDeferredValue, useState } from "react";
import { ProductImage } from "@/components/product-image";
import { buttonStyles } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { formatPrice } from "@/lib/format";
import { filterAndSortProducts } from "@/lib/products";

const suggestions = [
  { href: "/shop?category=women", label: "Women" },
  { href: "/shop?category=men", label: "Men" },
  { href: "/shop?category=accessories", label: "Accessories" },
  { href: "/shop?sort=newest", label: "New arrivals" },
];

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const router = useRouter();
  const results = deferredQuery.trim()
    ? filterAndSortProducts({ query: deferredQuery }).slice(0, 5)
    : [];

  function handleClose() {
    setQuery("");
    onClose();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    handleClose();
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <Overlay
      open={open}
      onClose={handleClose}
      title="Search Moon Vibe"
      variant="center"
    >
      <div className="p-5 sm:p-6">
        <form onSubmit={handleSubmit} role="search">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <div className="flex items-center gap-3 border border-charcoal/20 bg-white/55 px-4 focus-within:border-charcoal">
            <Search className="size-4 shrink-0 text-charcoal/45" aria-hidden="true" />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, colour, or category"
              autoFocus
              autoComplete="off"
              className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-charcoal/40"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-charcoal/50 hover:bg-charcoal/6 hover:text-charcoal"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </form>

        {query.trim() ? (
          <div className="mt-6">
            {results.length > 0 ? (
              <>
                <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/45">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                <ul className="space-y-1">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 p-2 transition-colors hover:bg-charcoal/4"
                      >
                        <span className="relative aspect-[3/4] w-12 shrink-0 overflow-hidden bg-beige">
                          <ProductImage
                            src={product.images[0].src}
                            alt={product.images[0].alt}
                            sizes="48px"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-serif text-base">
                            {product.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-charcoal/50">
                            {product.color}
                          </span>
                        </span>
                        <span className="shrink-0 text-sm tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/shop?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleClose}
                  className="mt-5 inline-flex text-xs font-medium uppercase tracking-[0.16em] underline decoration-charcoal/30 underline-offset-4 hover:decoration-charcoal"
                >
                  View all results
                </Link>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="font-serif text-xl">No pieces found</p>
                <p className="mt-2 text-sm text-charcoal/55">
                  Try a different name, colour, or category.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-7">
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-charcoal/45">
              Browse the edit
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestions.map((suggestion) => (
                <Link
                  key={suggestion.href}
                  href={suggestion.href}
                  onClick={handleClose}
                  className={buttonStyles({
                    variant: "outline",
                    size: "sm",
                  })}
                >
                  {suggestion.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Overlay>
  );
}
