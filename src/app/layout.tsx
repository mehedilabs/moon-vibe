import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["400", "500"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Moon Vibe — Quiet fashion, considered",
    template: "%s — Moon Vibe",
  },
  description:
    "Moon Vibe is a front-end fashion storefront demo: a considered edit of modern clothing and accessories, presented in a calm, editorial style.",
  applicationName: "Moon Vibe",
  authors: [{ name: "Mehedi Hasan", url: "https://github.com/mehedilabs" }],
  openGraph: {
    title: "Moon Vibe — Quiet fashion, considered",
    description:
      "A front-end fashion storefront demo with a curated edit of modern clothing and accessories.",
    type: "website",
    siteName: "Moon Vibe",
  },
  twitter: {
    card: "summary",
    title: "Moon Vibe — Quiet fashion, considered",
    description:
      "A front-end fashion storefront demo with a curated edit of modern clothing and accessories.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
