import type { Metadata } from "next";
import { CategoryHero, CategoryProducts } from "@/components/category-hero";
import { ProductGrid } from "@/components/product-grid";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Men",
  description:
    "The Moon Vibe menswear edit: relaxed tailoring, outerwear, and everyday essentials in a warm neutral palette.",
};

export default function MenPage() {
  const items = getProductsByCategory("men");

  return (
    <>
      <CategoryHero
        eyebrow="The menswear edit"
        title="Quiet structure. Easy days."
        description="Clean lines, soft shoulders, and layers built for real life. A wardrobe that feels considered without trying too hard."
        image="/images/editorial/collection-men.jpg"
        imageAlt="Man in a dark jacket sitting in a sunlit architectural space"
        meta={`${items.length} pieces in the men's edit`}
      />
      <CategoryProducts
        title="Men's pieces"
        description="Outerwear, tailoring, and everyday essentials. Use the shop filters to refine by collection, price, or search."
      >
        <ProductGrid products={items} priorityCount={2} />
      </CategoryProducts>
    </>
  );
}
