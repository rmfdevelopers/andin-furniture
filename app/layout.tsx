import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading" 
});

const body = Inter({ 
  subsets: ["latin"],
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Andin Furniture | Bespoke Artistry for the Modern Connoisseur",
  description: "Led by visionary founder Inneh Samuel, Andin Furniture transforms raw materials into legacy pieces for Nigeria's most discerning homes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}