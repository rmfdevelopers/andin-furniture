import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const headingFont = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});
const bodyFont = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Andin Furniture | The Art of Bespoke Living',
  description: 'Premium high-end furniture production specializing in custom-made pieces.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}