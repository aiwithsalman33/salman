import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import { bootScript } from "@/lib/boot";
import "./globals.css";

// Archivo with its width axis: expanded for display type, normal width for body text.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  ...(site.url ? { metadataBase: new URL(site.url), alternates: { canonical: "/" } } : {}),
  title: site.seo.title,
  description: site.seo.description,
  applicationName: site.brand,
  openGraph: {
    type: "website",
    siteName: site.brand,
    title: site.seo.title,
    description: site.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#080b10",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-boot is set by the inline script before hydration, hence suppressHydrationWarning.
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
