import type { Metadata } from "next";
import { Geist, Geist_Mono, Italianno } from "next/font/google";
import "./globals.css";

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
  title: "The Beauty Vault | Premium Beauty & Wellness Services in Nairobi",
  description: "Experience luxury beauty services in Nairobi. From premium lash extensions by Lashes by Shazz, exquisite wigs and hair accessories by Shasha Hair, to advanced aesthetic treatments by Revive Aesthetics. Your destination for beauty excellence.",
  keywords: "beauty salon Nairobi, lash extensions Kenya, premium wigs Nairobi, aesthetic treatments Kenya, Lashes by Shazz, Shasha Hair Wigs, Revive Aesthetics, beauty services Nairobi",
  authors: [{ name: "The Beauty Vault" }],
  openGraph: {
    title: "The Beauty Vault | Premium Beauty & Wellness Services",
    description: "Experience luxury beauty services in Nairobi. Lash extensions, premium wigs, and advanced aesthetic treatments.",
    type: "website",
    locale: "en_KE",
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
        {children}
      </body>
    </html>
  );
}
