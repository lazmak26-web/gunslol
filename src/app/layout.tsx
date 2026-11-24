import type { Metadata } from "next";
import { Anton, Permanent_Marker, Space_Grotesk } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const marker = Permanent_Marker({ variable: "--font-marker", subsets: ["latin"], weight: "400" });
const body = Space_Grotesk({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Almero Store — Streetwear pour enfants",
  description: "Almero Store, le streetwear des mini boss : tees, hoodies, vestes et parkas pour enfants de 2 à 14 ans.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${anton.variable} ${marker.variable} ${body.variable} antialiased`}>{children}</body>
    </html>
  );
}
