export const siteConfig = {
  name: "Moon Vibe",
  description:
    "A front-end fashion storefront demo built with Next.js, React, and Tailwind CSS.",
  githubProfile: "https://github.com/mehedilabs",
  githubRepository: "https://github.com/mehedilabs/moon-vibe",
  author: "Mehedi Hasan",
};

export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/collections", label: "Collections" },
];

export const footerNavigation = {
  shop: [
    { href: "/shop", label: "All pieces" },
    { href: "/women", label: "Women" },
    { href: "/men", label: "Men" },
    { href: "/shop?category=accessories", label: "Accessories" },
  ],
  explore: [
    { href: "/collections", label: "Collections" },
    { href: "/shop?sort=newest", label: "New arrivals" },
    { href: "/wishlist", label: "Wishlist" },
    { href: "/cart", label: "Shopping bag" },
  ],
  account: [
    { href: "/account", label: "Your account" },
    { href: "/login", label: "Sign in" },
    { href: "/signup", label: "Create account" },
  ],
};
