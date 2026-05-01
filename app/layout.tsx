import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Image from "next/image";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Municipality of Conner — Official Website",
  description: "Official website of the Municipality of Conner, Apayao. Home of the Isnag people in the Cordillera Administrative Region.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable}`}
      >
        <Image
          src="/images/BETA TAG.png"
          alt="Beta"
          width={160}
          height={160}
          style={{ position: "fixed", top: -25, left: -25, zIndex: 9999, pointerEvents: "none" }}
          priority
        />
        {children}
      </body>
    </html>
  );
}
