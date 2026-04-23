import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Marsa Maroc · Tarifs Publics 2025",
  description:
    "Explorez, simulez et comparez les tarifs portuaires 2025 de Marsa Maroc à travers 11 ports du Royaume.",
  metadataBase: new URL("https://marsamaroc.co.ma"),
  openGraph: {
    title: "Marsa Maroc · Tarifs Publics 2025",
    description: "Simulateur de tarifs portuaires — 11 ports, transparence totale, devis en 30 secondes.",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
