import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { site } from "@/data/site";
import { bootScript } from "@/lib/boot";
import "./globals.css";

// Poppins is the only typeface. It isn't a variable font, so each weight in use is listed:
// 400 body, 500 navigation and metadata, 600 buttons and project titles, 700 section headings, 800 hero.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
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
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
