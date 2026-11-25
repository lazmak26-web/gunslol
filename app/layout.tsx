import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400" });
const display = Anton({ variable: "--font-display", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Almero Store — Streetwear for mini bosses",
  description: "Kids streetwear, ages 2 to 14. Hoodies, tees, overshirts and jackets built for the playground.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Lets CSS hide reveal targets before GSAP runs, without hiding them when JS is off. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${serif.variable} ${display.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
