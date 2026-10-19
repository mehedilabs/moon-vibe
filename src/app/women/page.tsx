import type { Metadata } from "next";
import { CategoryHero, CategoryProducts } from "@/components/category-hero";
import { ProductGrid } from "@/components/product-grid";
import { getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Women",
  description:
    "The Moon Vibe womenswear edit: quiet tailoring, fluid dresses, and layers in a warm neutral palette.",
};

export default function WomenPage() {
  const items = getProductsByCategory("women");

  return (
    <>
      <CategoryHero
        eyebrow="The womenswear edit"
        title="Softness, with a point of view."
        description="Fluid dresses, considered tailoring, and layers that move easily from morning to evening. The pieces are quiet, but never plain."
        image="/images/editorial/collection-women.jpg"
        imageAlt="Woman in a pale blue trench coat in a city square"
        meta={`${items.length} pieces in the women's edit`}
      />
      <CategoryProducts
        title="Women's pieces"
        description="A focused edit of dresses, tailoring, and everyday layers. Use the shop filters to refine by collection, price, or search."
      >
        <ProductGrid products={items} priorityCount={2} />
      </CategoryProducts>
    </>
  );
}
