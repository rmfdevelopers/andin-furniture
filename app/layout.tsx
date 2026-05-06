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
  title: "Andin Furniture | The Art of Bespoke Living",
  description: "Exquisite, custom-made luxury furniture crafted with the precision of a scientist and the soul of an artist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}