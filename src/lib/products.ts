export type Category = "women" | "men" | "accessories";

export type CollectionSlug = "quiet-hours" | "city-tailoring" | "weekend-ease";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  collection: CollectionSlug;
  price: number;
  color: string;
  material: string;
  description: string;
  details: string[];
  sizes?: string[];
  images: ProductImage[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const categories: Array<{ value: Category; label: string }> = [
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "accessories", label: "Accessories" },
];

export const collections: Collection[] = [
  {
    slug: "quiet-hours",
    name: "Quiet Hours",
    tagline: "Soft structure for slower days.",
    description:
      "Considered layers, warm neutrals, and pieces that feel as good as they look. An edit for the moments between.",
    image: "/images/collections/quiet-hours.jpg",
    imageAlt: "A rail of softly coloured shirts and blouses in a calm studio",
  },
  {
    slug: "city-tailoring",
    name: "City Tailoring",
    tagline: "A sharper kind of ease.",
    description:
      "Clean lines and confident proportions for the working week, designed to move from morning meetings to late dinners.",
    image: "/images/collections/city-tailoring.jpg",
    imageAlt: "A man in a dark tailored suit standing in soft city light",
  },
  {
    slug: "weekend-ease",
    name: "Weekend Ease",
    tagline: "Everything you reach for first.",
    description:
      "Relaxed silhouettes, easy fabrics, and quiet colour. The pieces that make an ordinary day feel considered.",
    image: "/images/collections/weekend-ease.jpg",
    imageAlt: "A flat lay of leather boots, trousers, a watch, and a white tee",
  },
];

const apparelSizes = ["XS", "S", "M", "L", "XL"];
const menswearSizes = ["S", "M", "L", "XL", "XXL"];

export const products: Product[] = [
  {
    id: "mv-01",
    slug: "aurelia-wool-wrap-coat",
    name: "Aurelia Wool Wrap Coat",
    category: "women",
    collection: "quiet-hours",
    price: 18900,
    color: "Camel",
    material: "Wool-cashmere blend",
    description:
      "A softly structured wrap coat cut to fall below the knee. The belted waist and clean lapel keep the line quiet, while a warm camel tone carries it through the season.",
    details: [
      "Wrap silhouette with a self-tie belt",
      "Below-knee length",
      "Fully lined with two front pockets",
      "Designed for a relaxed, layered fit",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/aurelia-wool-wrap-coat.jpg",
        alt: "Camel wool wrap coat worn over black trousers",
      },
      {
        src: "/images/products/aurelia-wool-wrap-coat-detail.jpg",
        alt: "Close view of the Aurelia coat's lapel and belt",
      },
    ],
    isFeatured: true,
    isNewArrival: true,
  },
  {
    id: "mv-02",
    slug: "solene-silk-slip-dress",
    name: "Solene Silk Slip Dress",
    category: "women",
    collection: "quiet-hours",
    price: 12500,
    color: "Slate blue",
    material: "Sandwashed silk",
    description:
      "A bias-cut slip dress with a fluid drape and a softly gathered waist. Adjustable straps and a midi length make it an easy layer for warm evenings or a quiet dinner.",
    details: [
      "Bias-cut silhouette",
      "Adjustable straps",
      "Midi length",
      "Fully lined bodice",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/solene-silk-slip-dress.jpg",
        alt: "Slate blue silk slip dress worn by the sea",
      },
      {
        src: "/images/products/solene-silk-slip-dress-detail.jpg",
        alt: "Close view of the Solene dress's gathered waist",
      },
    ],
    isFeatured: true,
  },
  {
    id: "mv-03",
    slug: "mirabel-floral-midi-dress",
    name: "Mirabel Floral Midi Dress",
    category: "women",
    collection: "weekend-ease",
    price: 9800,
    color: "Ivory floral",
    material: "Linen-viscose blend",
    description:
      "A wrap-front midi dress scattered with a painterly floral print. The lightweight fabric and softly flared skirt are made for long lunches and unhurried afternoons.",
    details: [
      "Wrap-front bodice with a self-tie waist",
      "Midi length with a side slit",
      "Short flutter sleeves",
      "Unlined for a lighter feel",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/mirabel-floral-midi-dress.jpg",
        alt: "Ivory floral midi dress with a wrap front",
      },
      {
        src: "/images/products/mirabel-floral-midi-dress-detail.jpg",
        alt: "Close view of the Mirabel dress's floral print",
      },
    ],
  },
  {
    id: "mv-04",
    slug: "noa-tailored-trousers",
    name: "Noa Tailored Trousers",
    category: "women",
    collection: "city-tailoring",
    price: 6400,
    color: "Dusty rose",
    material: "Tencel twill",
    description:
      "High-waisted trousers with a tapered leg and a softly elasticated back. The front crease keeps them sharp enough for work, while the fabric stays comfortable all day.",
    details: [
      "High-rise, tapered leg",
      "Elasticated back waist",
      "Side seam pockets",
      "Cropped at the ankle",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/noa-tailored-trousers.jpg",
        alt: "Dusty rose high-waisted tailored trousers",
      },
      {
        src: "/images/products/noa-tailored-trousers-detail.jpg",
        alt: "Close view of the Noa trousers' pocket and waistband",
      },
    ],
    isNewArrival: true,
  },
  {
    id: "mv-05",
    slug: "lune-off-shoulder-dress",
    name: "Lune Off-Shoulder Dress",
    category: "women",
    collection: "weekend-ease",
    price: 8900,
    color: "Ivory",
    material: "Cotton poplin",
    description:
      "A breezy off-shoulder dress with a gathered neckline and a tiered skirt. Crisp cotton poplin gives it just enough shape for a summer afternoon or an evening outdoors.",
    details: [
      "Elasticated off-shoulder neckline",
      "Tiered midi skirt",
      "Side pockets",
      "Fully lined skirt",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/lune-off-shoulder-dress.jpg",
        alt: "Ivory off-shoulder dress worn on white steps",
      },
      {
        src: "/images/products/lune-off-shoulder-dress-detail.jpg",
        alt: "Close view of the Lune dress's gathered neckline",
      },
    ],
    isFeatured: true,
  },
  {
    id: "mv-06",
    slug: "vera-polka-dot-dress",
    name: "Vera Polka Dot Dress",
    category: "women",
    collection: "weekend-ease",
    price: 10200,
    color: "Ruby spot",
    material: "Crepe de chine",
    description:
      "A playful polka-dot dress with a softly ruffled hem and a flattering wrap waist. Light, fluid, and easy to dress up with heels or down with flat sandals.",
    details: [
      "Wrap-style waist with a tie",
      "Asymmetric ruffled hem",
      "Short sleeves",
      "Midi length",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/vera-polka-dot-dress.jpg",
        alt: "Ruby polka dot dress moving in a field",
      },
      {
        src: "/images/products/vera-polka-dot-dress-detail.jpg",
        alt: "Close view of the Vera dress's polka dot fabric",
      },
    ],
  },
  {
    id: "mv-07",
    slug: "atlas-leather-biker-jacket",
    name: "Atlas Leather Biker Jacket",
    category: "men",
    collection: "city-tailoring",
    price: 22500,
    color: "Espresso",
    material: "Lambskin leather",
    description:
      "A clean take on the classic biker jacket, cut with a slightly relaxed body and a neat stand collar. Soft lambskin gives it an easy drape from the first wear.",
    details: [
      "Asymmetric zip front",
      "Notched lapel with snap fastenings",
      "Two zipped front pockets",
      "Fully lined",
    ],
    sizes: menswearSizes,
    images: [
      {
        src: "/images/products/atlas-leather-biker-jacket.jpg",
        alt: "Espresso leather biker jacket worn over a blue shirt",
      },
      {
        src: "/images/products/atlas-leather-biker-jacket-detail.jpg",
        alt: "Close view of the Atlas jacket's collar and zip",
      },
    ],
    isFeatured: true,
  },
  {
    id: "mv-08",
    slug: "rowan-bomber-jacket",
    name: "Rowan Bomber Jacket",
    category: "men",
    collection: "weekend-ease",
    price: 11900,
    color: "Clay",
    material: "Recycled nylon",
    description:
      "A lightweight bomber with a soft, matte finish and a relaxed fit. Ribbed cuffs and a clean zip front make it the layer you keep by the door.",
    details: [
      "Relaxed fit with dropped shoulders",
      "Ribbed collar, cuffs, and hem",
      "Two welt pockets",
      "Water-resistant finish",
    ],
    sizes: menswearSizes,
    images: [
      {
        src: "/images/products/rowan-bomber-jacket.jpg",
        alt: "Clay-coloured bomber jacket held on a hanger",
      },
      {
        src: "/images/products/rowan-bomber-jacket-detail.jpg",
        alt: "Close view of the Rowan bomber's zip and pocket",
      },
    ],
    isNewArrival: true,
  },
  {
    id: "mv-09",
    slug: "essential-heavyweight-tee",
    name: "Essential Heavyweight Tee",
    category: "men",
    collection: "weekend-ease",
    price: 2800,
    color: "Optic white",
    material: "Organic cotton jersey",
    description:
      "A everyday tee with a little more weight and a clean, boxy shape. The dense cotton holds its form wash after wash and layers neatly under a jacket.",
    details: [
      "Regular fit with a straight hem",
      "Ribbed crew neck",
      "Heavyweight cotton jersey",
      "Pre-shrunk finish",
    ],
    sizes: menswearSizes,
    images: [
      {
        src: "/images/products/essential-heavyweight-tee.jpg",
        alt: "White heavyweight cotton T-shirt worn with dark trousers",
      },
      {
        src: "/images/products/essential-heavyweight-tee-detail.jpg",
        alt: "Close view of the Essential tee's neckline",
      },
    ],
  },
  {
    id: "mv-10",
    slug: "nocturne-tailored-suit",
    name: "Nocturne Tailored Suit",
    category: "men",
    collection: "city-tailoring",
    price: 26500,
    color: "Midnight navy",
    material: "Wool blend",
    description:
      "A two-piece suit with a soft shoulder and a slim, straight leg. Cut in a deep navy wool blend, it is formal enough for the occasion and easy enough for the day after.",
    details: [
      "Single-breasted jacket with two buttons",
      "Slim, straight-leg trousers",
      "Half-lined jacket",
      "Sold as a two-piece set",
    ],
    sizes: ["38", "40", "42", "44", "46"],
    images: [
      {
        src: "/images/products/nocturne-tailored-suit.jpg",
        alt: "Man wearing a midnight navy tailored suit",
      },
      {
        src: "/images/products/nocturne-tailored-suit-detail.jpg",
        alt: "Close view of the Nocturne suit's jacket and shirt",
      },
    ],
    isFeatured: true,
  },
  {
    id: "mv-11",
    slug: "halden-merino-hoodie",
    name: "Halden Merino Hoodie",
    category: "men",
    collection: "quiet-hours",
    price: 8600,
    color: "Heather grey",
    material: "Merino-cotton fleece",
    description:
      "A refined take on the everyday hoodie, made from a soft merino-cotton fleece. The clean lines and generous hood make it an easy layer for cool mornings.",
    details: [
      "Relaxed fit",
      "Double-layer hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
    ],
    sizes: menswearSizes,
    images: [
      {
        src: "/images/products/halden-merino-hoodie.jpg",
        alt: "Heather grey hoodie worn outdoors",
      },
      {
        src: "/images/products/halden-merino-hoodie-detail.jpg",
        alt: "Close view of the Halden hoodie's fabric and hood",
      },
    ],
  },
  {
    id: "mv-12",
    slug: "rive-leather-tote",
    name: "Rive Woven Leather Tote",
    category: "accessories",
    collection: "city-tailoring",
    price: 14500,
    color: "Apricot",
    material: "Woven leather",
    description:
      "A structured tote with a woven body and a smooth leather flap. Roomy enough for a laptop and a notebook, with a top handle that sits comfortably in the hand.",
    details: [
      "Woven leather body",
      "Smooth leather flap with a turn-lock closure",
      "Cotton twill lining",
      "Detachable shoulder strap",
    ],
    images: [
      {
        src: "/images/products/rive-leather-tote.jpg",
        alt: "Apricot woven leather tote bag",
      },
      {
        src: "/images/products/rive-leather-tote-detail.jpg",
        alt: "Close view of the Rive tote's woven texture",
      },
    ],
    isFeatured: true,
  },
  {
    id: "mv-13",
    slug: "sculpted-heel-sandals",
    name: "Sculpted Heel Sandals",
    category: "accessories",
    collection: "weekend-ease",
    price: 7900,
    color: "Botanical print",
    material: "Printed satin",
    description:
      "A sculptural heel with a pointed toe and a slim ankle strap. The botanical print makes them the quiet focal point of a simple outfit.",
    details: [
      "85 mm sculpted heel",
      "Pointed toe",
      "Adjustable ankle strap",
      "Padded leather insole",
    ],
    sizes: ["36", "37", "38", "39", "40", "41"],
    images: [
      {
        src: "/images/products/sculpted-heel-sandals.jpg",
        alt: "Botanical print heeled sandals on a blue background",
      },
      {
        src: "/images/products/sculpted-heel-sandals-detail.jpg",
        alt: "Close view of the sandal's printed heel",
      },
    ],
    isNewArrival: true,
  },
  {
    id: "mv-14",
    slug: "terra-low-top-sneakers",
    name: "Terra Low-Top Sneakers",
    category: "accessories",
    collection: "weekend-ease",
    price: 6800,
    color: "Multi",
    material: "Suede and mesh",
    description:
      "A low-top sneaker built from panels of suede and mesh in muted colour. The chunky sole adds comfort without making the silhouette feel heavy.",
    details: [
      "Low-top silhouette",
      "Suede and mesh upper",
      "Cushioned rubber sole",
      "Cotton laces",
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    images: [
      {
        src: "/images/products/terra-low-top-sneakers.jpg",
        alt: "Colourful low-top sneakers on a white plinth",
      },
      {
        src: "/images/products/terra-low-top-sneakers-detail.jpg",
        alt: "Close view of the Terra sneaker's panelled upper",
      },
    ],
    isFeatured: true,
  },
  {
    id: "mv-15",
    slug: "elowen-chambray-shirt",
    name: "Elowen Chambray Shirt",
    category: "women",
    collection: "quiet-hours",
    price: 4900,
    color: "Indigo chambray",
    material: "Cotton chambray",
    description:
      "A relaxed shirt in a soft indigo chambray, finished with a neat collar and a curved hem. Wear it buttoned, layered, or open over a simple tee.",
    details: [
      "Relaxed fit",
      "Mother-of-pearl buttons",
      "Curved hem",
      "Single chest pocket",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/elowen-chambray-shirt.jpg",
        alt: "Indigo chambray shirt hanging on a hanger",
      },
      {
        src: "/images/products/elowen-chambray-shirt-detail.jpg",
        alt: "Close view of the Elowen shirt's buttons and collar",
      },
    ],
  },
  {
    id: "mv-16",
    slug: "sera-wide-leg-trousers",
    name: "Sera Wide-Leg Trousers",
    category: "women",
    collection: "quiet-hours",
    price: 6900,
    color: "Charcoal stripe",
    material: "Viscose blend",
    description:
      "Fluid wide-leg trousers with a high waist and a clean front. The fine charcoal stripe adds a little rhythm to a simple top.",
    details: [
      "High-rise, wide leg",
      "Concealed side zip",
      "Pressed front crease",
      "Full length",
    ],
    sizes: apparelSizes,
    images: [
      {
        src: "/images/products/sera-wide-leg-trousers.jpg",
        alt: "Charcoal striped wide-leg trousers worn with a white top",
      },
      {
        src: "/images/products/sera-wide-leg-trousers-detail.jpg",
        alt: "Close view of the Sera trousers' striped fabric",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category);
}

export function getCollection(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((product) => product.isFeatured).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return products.filter((product) => product.isNewArrival).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (candidate) =>
        candidate.slug !== product.slug &&
        (candidate.collection === product.collection ||
          candidate.category === product.category),
    )
    .slice(0, limit);
}

export function filterAndSortProducts({
  query = "",
  category = "all",
  collection = "all",
  sort = "featured",
}: {
  query?: string;
  category?: Category | "all";
  collection?: CollectionSlug | "all";
  sort?: SortOption;
}): Product[] {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.color.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery);
    const matchesCategory =
      category === "all" || product.category === category;
    const matchesCollection =
      collection === "all" || product.collection === collection;

    return matchesQuery && matchesCategory && matchesCollection;
  });

  switch (sort) {
    case "price-asc":
      return [...filtered].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...filtered].sort((a, b) => b.price - a.price);
    case "newest":
      return [...filtered].sort(
        (a, b) => Number(Boolean(b.isNewArrival)) - Number(Boolean(a.isNewArrival)),
      );
    default:
      return [...filtered].sort(
        (a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)),
      );
  }
}
