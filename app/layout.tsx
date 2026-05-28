import type { Metadata } from 'next';
import { Anton, Poppins, B612 } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const b612 = B612({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-b612',
});

export const metadata: Metadata = {
  title: 'Abhishek Pandey | Full Stack & Shopify Developer',
  description: 'Portfolio of Abhishek Pandey, a Full Stack Web Developer, UI/UX Designer, and Shopify & WordPress Engineer with 2.5 years of experience building scalable web solutions.',
  keywords: [
    'Abhishek Pandey',
    'Full Stack Developer',
    'Shopify Developer',
    'Shopify Engineer',
    'WordPress Developer',
    'UI/UX Developer',
    'Web Developer',
    'WordPress Engineer'
  ],
  authors: [{ name: 'Abhishek Pandey' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${poppins.variable} ${b612.variable} font-sans`} suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
