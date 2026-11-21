import type { Metadata } from "next";
import { Bodoni_Moda, DM_Mono, Manrope, Space_Mono } from "next/font/google";
import { CookieConsent } from "@/components/site/CookieConsent";
import { OfflineBanner } from "@/components/states/OfflineBanner";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${manrope.variable} ${dmMono.variable} ${spaceMono.variable}`}
    >
      <head>
        {/* Material Symbols — icon font used throughout the Stitch screens (not available in next/font) */}
        {/* display=block avoids icon ligature names flashing as text before the font loads */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="bg-ivory text-ink antialiased">
        {children}
        <OfflineBanner />
        <CookieConsent />
      </body>
    </html>
  );
}
