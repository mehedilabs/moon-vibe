# Moon Vibe Fashion

[🛍️ **Visit Moon Vibe Fashion — Live Demo ↗**](https://moon-vibe-fashion.vercel.app/)

A front-end fashion storefront demo built with Next.js, React, TypeScript, and Tailwind CSS. Moon Vibe is a calm, editorial shop for a curated edit of clothing and accessories: warm ivory surfaces, charcoal type, olive accents, and quiet typography.

> **This is a demonstration project.** There is no backend, database, real authentication, payment integration, or order processing. Cart, wishlist, and demo profile data live only in your browser.

## Features

- **Editorial homepage** with hero, collection discovery, featured pieces, brand story, new arrivals, and newsletter UI.
- **Curated catalogue** of 16 products across women, men, and accessories, organised into three collections.
- **Working catalogue filters** for category, collection, and text search, plus sorting by featured, price, and newness. Filter state is reflected in the URL.
- **Product pages** with image galleries, size selection, quantity controls, add-to-cart, wishlist toggle, details, and related pieces.
- **Cart drawer and cart page** with quantity updates, removal, totals, and local persistence.
- **Wishlist page** with local persistence across visits.
- **Demo account flows** for sign-up, sign-in, profile editing, and sign-out. Passwords are validated in the browser and immediately discarded — only a display name, email, and optional avatar URL are saved locally.
- **Demo checkout** with browser-side validation and a confirmation state. No payment details are collected, no order is placed, and no data leaves the browser.
- **Responsive navigation** with a mobile menu, search overlay, live cart count, and wishlist count.
- **Local photography** served from `public/images` through `next/image`, so the storefront works without third-party image requests.
- **Accessibility basics** including a skip link, semantic landmarks, labelled form fields, error announcements, keyboard-friendly native dialogs, visible focus styles, and reduced-motion support.

## Tech stack

| Layer     | Choice                             |
| --------- | ---------------------------------- |
| Framework | Next.js 16.4.2 (App Router)        |
| UI        | React 19.3                         |
| Language  | TypeScript 5                       |
| Styling   | Tailwind CSS 4                     |
| Icons     | lucide-react                       |
| Linting   | ESLint 9 with `eslint-config-next` |

The project uses Next.js Cache Components and partial prefetching. Product routes are generated from the local product catalogue; no server data source is required.

## Getting started

Requirements: **Node.js 20.9 or newer** and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables, API keys, or external services are needed.

## Scripts

| Command             | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Start the development server with Turbopack        |
| `npm run build`     | Create a production build                          |
| `npm start`         | Serve the production build                         |
| `npm run lint`      | Run ESLint                                         |
| `npm run typecheck` | Run the TypeScript compiler without emitting files |

## Routes

| Route               | Description                                      |
| ------------------- | ------------------------------------------------ |
| `/`                 | Homepage and editorial sections                  |
| `/shop`             | Full catalogue with search, filters, and sorting |
| `/women`, `/men`    | Category edits                                   |
| `/collections`      | Collection index                                 |
| `/product/[slug]`   | Product detail pages                             |
| `/cart`             | Shopping bag                                     |
| `/wishlist`         | Saved pieces                                     |
| `/checkout`         | Demo checkout and confirmation                   |
| `/login`, `/signup` | Local demo account forms                         |
| `/account`          | Demo profile and session details                 |

Useful catalogue examples:

- `/shop?category=women`
- `/shop?collection=quiet-hours`
- `/shop?q=coat`
- `/shop?sort=price-asc`

## Project structure

```text
src/
  app/                     App Router pages and global styles
    product/[slug]/        Static product detail route
    cart/ wishlist/        Saved shopping state pages
    checkout/              Demo checkout
    login/ signup/ account/ Demo account pages
  components/
    providers/             Cart, wishlist, and demo session state
    ui/                    Shared buttons, dialogs, inputs, and layout primitives
    ...                    Storefront sections and interactive features
  lib/
    products.ts            Products, collections, and catalogue helpers
    format.ts              BDT price formatting
    site.ts                Navigation, author, and site metadata
public/
  images/                  Locally bundled editorial and product photography
```

## Product data and local state

The catalogue is defined in `src/lib/products.ts`. Each product has a stable ID, slug, category, collection, price in BDT, description, materials, sizes, and one or more local images. Add or edit products there and the catalogue, product route, search, and related-product logic stay in sync.

State is managed by `src/components/providers/store-provider.tsx` and persisted under these localStorage keys:

| Key                        | Contents                                     |
| -------------------------- | -------------------------------------------- |
| `moonvibe.cart.v1`         | Product IDs, selected sizes, and quantities  |
| `moonvibe.wishlist.v1`     | Saved product IDs                            |
| `moonvibe.demo-profile.v1` | Display name, email, and optional avatar URL |
| `moonvibe.demo-session.v1` | The email identifying the local demo session |

Clearing site data resets the demo. Passwords are never written to storage.

## Design tokens

| Token    | Value     | Use                                   |
| -------- | --------- | ------------------------------------- |
| Ivory    | `#F7F5F0` | Page background                       |
| Charcoal | `#20251F` | Primary text and dark surfaces        |
| Olive    | `#66745A` | Accents, focus rings, and status text |
| Beige    | `#E7DFD2` | Soft surfaces and image placeholders  |

Typography: **Playfair Display** for display headings, **Inter** for interface and body copy, and **Hind Siliguri** for the Bangla brand line.

## Responsiveness and accessibility

Layouts are designed to remain usable from 360 px upward, with a single-column mobile flow, a two-column tablet layout, and wider desktop compositions. The implementation was checked in a real browser at 360, 390, 768, 1024, and 1280 px widths, including horizontal-overflow checks on the main routes.

Interactive overlays use the native `<dialog>` element, which provides focus containment and Escape-to-close behaviour. Form errors use `role="alert"` and `aria-describedby`, and motion is reduced when the user requests it.

## Limitations

- Demo authentication accepts any valid-looking email and a six-character password. It does not verify identity.
- Local state is limited to the current browser and device.
- Checkout validates form fields but does not calculate tax, shipping, or discounts, and it does not create an order.
- Product availability is static; there is no inventory service.
- The newsletter form demonstrates interaction only and does not send email.
- Photography is bundled locally for this demo. Review the original image licences before any commercial use.

## Author

Built by [Mehedi Hasan](https://www.linkedin.com/in/mehedilabs) .
