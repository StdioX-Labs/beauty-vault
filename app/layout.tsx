import type { Metadata } from "next";
import { Geist, Geist_Mono, Italianno } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Google Tag Manager container for the whole site.
const GTM_ID = "GTM-5M5XVFW4";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lashesbyshazz.com"),
  title: "The Beauty Vault | Premium Beauty & Wellness Services in Nairobi",
  description: "Experience luxury beauty services in Nairobi. From premium lash extensions by Lashes by Shazz, exquisite wigs and hair accessories by Shasha Hair, to advanced aesthetic treatments by Revive Aesthetics. Your destination for beauty excellence.",
  keywords: "beauty salon Nairobi, lash extensions Kenya, premium wigs Nairobi, aesthetic treatments Kenya, Lashes by Shazz, Shasha Hair Wigs, Revive Aesthetics, beauty services Nairobi",
  authors: [{ name: "The Beauty Vault" }],
  icons: {
    icon: [{ url: "/icons/lashesbyshazz-round.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/icons/lashesbyshazz-round.png",
    apple: "/icons/lashesbyshazz-round-apple.png",
  },
  openGraph: {
    title: "The Beauty Vault | Premium Beauty & Wellness Services",
    description: "Experience luxury beauty services in Nairobi. Lash extensions, premium wigs, and advanced aesthetic treatments.",
    type: "website",
    locale: "en_KE",
    images: [{ url: "/bg/home-hero.webp" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${italianno.variable} antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});`}
        </Script>
        <Script
          id="gtm"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
      </body>
    </html>
  );
}
