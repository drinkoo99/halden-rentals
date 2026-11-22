import type { Metadata } from "next";
import { Bodoni_Moda, DM_Mono, Manrope, Space_Mono } from "next/font/google";
import { CatalogueProvider } from "@/components/catalogue/CatalogueProvider";
import { CookieConsent } from "@/components/site/CookieConsent";
import { OfflineBanner } from "@/components/states/OfflineBanner";
import { ICON_FONT_HREF } from "@/lib/icons";
import { resolveSiteUrl } from "@/lib/siteUrl";
import { getSiteCatalogue } from "@/server/catalogue/service";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(resolveSiteUrl()),
  openGraph: {
    type: "website",
    siteName: "HALDEN",
    images: [{ url: "/images/hero-porsche-911-gallery.jpg", width: 3840, height: 2143, alt: "Porsche 911 Carrera in a modernist gallery" }],
  },
  title: {
    default: "HALDEN — The Gallery",
    template: "%s | HALDEN",
  },
  description:
    "A curated fleet of premium cars, ready in Europe’s best cities and airports.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // the catalogue (MongoDB, cached on the server) for every Client Component that lists cars, hubs or extras
  const catalogue = await getSiteCatalogue();
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${manrope.variable} ${dmMono.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Material Symbols — icon font used throughout the Stitch screens (not available in next/font), subset to the icons we use */}
        {/* display=block avoids icon ligature names flashing as text before the font loads */}
        <link
          rel="stylesheet"
          href={ICON_FONT_HREF}
        />
      </head>
      <body className="bg-ivory text-ink antialiased">
        <CatalogueProvider catalogue={catalogue}>{children}</CatalogueProvider>
        <OfflineBanner />
        <CookieConsent />
      </body>
    </html>
  );
}
