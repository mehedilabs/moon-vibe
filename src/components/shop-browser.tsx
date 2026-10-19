"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";
import {
  categories,
  collections,
  filterAndSortProducts,
  products,
  type Category,
  type CollectionSlug,
  type SortOption,
} from "@/lib/products";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

const validCategories = new Set<string>(["women", "men", "accessories"]);
const validCollections = new Set<string>([
  "quiet-hours",
  "city-tailoring",
  "weekend-ease",
]);
const validSorts = new Set<string>([
  "featured",
  "newest",
  "price-asc",
  "price-desc",
]);

function parseCategory(value: string | null): Category | "all" {
  return value && validCategories.has(value) ? (value as Category) : "all";
}

function parseCollection(value: string | null): CollectionSlug | "all" {
  return value && validCollections.has(value)
    ? (value as CollectionSlug)
    : "all";
}

function parseSort(value: string | null): SortOption {
  return value && validSorts.has(value) ? (value as SortOption) : "featured";
}

export function ShopBrowser() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramsString = searchParams.toString();

  const category = parseCategory(searchParams.get("category"));
  const collection = parseCollection(searchParams.get("collection"));
  const sort = parseSort(searchParams.get("sort"));
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const lastQueryParam = useRef(urlQuery);

  // Keep the input in sync when the URL changes from elsewhere (for example the
  // header search or a link from the footer) without overwriting active typing.
  useEffect(() => {
    if (urlQuery === lastQueryParam.current) return;
    lastQueryParam.current = urlQuery;
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const trimmed = query.trim();
      if (trimmed === lastQueryParam.current) return;

      lastQueryParam.current = trimmed;
      const next = new URLSearchParams(paramsString);
      if (trimmed) {
        next.set("q", trimmed);
      } else {
        next.delete("q");
      }
      const nextString = next.toString();
      router.replace(nextString ? `/shop?${nextString}` : "/shop", {
        scroll: false,
      });
    }, 300);

    return () => window.clearTimeout(timeout);
  }, [query, paramsString, router]);

  const results = filterAndSortProducts({ query, category, collection, sort });
  const hasActiveFilters =
    query.trim().length > 0 ||
    category !== "all" ||
    collection !== "all" ||
    sort !== "featured";

  function updateParam(key: string, value: string | null) {
    const next = new URLSearchParams(paramsString);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const nextString = next.toString();
    router.replace(nextString ? `/shop?${nextString}` : "/shop", {
      scroll: false,
    });
  }

  function resetFilters() {
    lastQueryParam.current = "";
    setQuery("");
    router.replace("/shop", { scroll: false });
  }

  return (
    <>
      <div className="sticky top-16 z-30 border-b border-charcoal/10 bg-ivory/95 backdrop-blur-md lg:top-20">
        <Container className="py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs">
              <label htmlFor="shop-search" className="sr-only">
                Search products
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-charcoal/40"
                aria-hidden="true"
              />
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the collection"
                autoComplete="off"
                className="h-11 w-full border border-charcoal/15 bg-white/50 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-charcoal/35 focus:border-charcoal"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-1.5 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-charcoal/45 hover:bg-charcoal/6 hover:text-charcoal"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <label className="sr-only" htmlFor="collection-filter">
                Filter by collection
              </label>
              <select
                id="collection-filter"
                value={collection}
                onChange={(event) =>
                  updateParam(
                    "collection",
                    event.target.value === "all" ? null : event.target.value,
                  )
                }
                className="h-11 min-w-0 border border-charcoal/15 bg-white/50 px-3 text-xs text-charcoal outline-none focus:border-charcoal"
              >
                <option value="all">All collections</option>
                {collections.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>

              <label className="sr-only" htmlFor="sort-filter">
                Sort products
              </label>
              <select
                id="sort-filter"
                value={sort}
                onChange={(event) =>
                  updateParam(
                    "sort",
                    event.target.value === "featured"
                      ? null
                      : event.target.value,
                  )
                }
                className="h-11 min-w-0 border border-charcoal/15 bg-white/50 px-3 text-xs text-charcoal outline-none focus:border-charcoal"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="mr-1 hidden shrink-0 items-center gap-1.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-charcoal/40 sm:flex">
              <SlidersHorizontal className="size-3.5" aria-hidden="true" />
              Filter
            </span>
            <button
              type="button"
              onClick={() => updateParam("category", null)}
              aria-pressed={category === "all"}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
                category === "all"
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-charcoal/15 text-charcoal/65 hover:border-charcoal hover:text-charcoal",
              )}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => updateParam("category", item.value)}
                aria-pressed={category === item.value}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.12em] transition-colors",
                  category === item.value
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-charcoal/15 text-charcoal/65 hover:border-charcoal hover:text-charcoal",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-8 sm:py-10">
        <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-charcoal/50">
            {results.length} of {products.length} pieces
          </p>
          {hasActiveFilters ? (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear all filters
              <X className="size-3.5" aria-hidden="true" />
            </Button>
          ) : null}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} priorityCount={2} />
        ) : (
          <EmptyState
            icon={<Search className="size-5" aria-hidden="true" />}
            title="No pieces match that search"
            description="Try a different name, colour, or category — or clear the filters to see the whole edit."
            action={{ href: "/shop", label: "View all pieces" }}
          />
        )}
      </Container>
    </>
  );
}

export function ShopSkeleton() {
  return (
    <>
      <div className="border-b border-charcoal/10">
        <Container className="py-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:justify-between">
            <div className="h-11 w-full animate-pulse bg-beige/70 lg:w-72" />
            <div className="h-11 w-full animate-pulse bg-beige/70 lg:w-72" />
          </div>
        </Container>
      </div>
      <Container className="py-8 sm:py-10">
        <div className="h-4 w-28 animate-pulse bg-beige/70" />
        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[3/4] animate-pulse bg-beige/70" />
              <div className="mt-4 h-3 w-16 animate-pulse bg-beige/70" />
              <div className="mt-2 h-4 w-4/5 animate-pulse bg-beige/70" />
              <div className="mt-2 h-3 w-20 animate-pulse bg-beige/70" />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
