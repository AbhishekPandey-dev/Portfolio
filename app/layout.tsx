import type { Metadata } from 'next';
import { Anton, Poppins, B612 } from 'next/font/google';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import './globals.css';

const Footer = dynamic(() => import('@/components/Footer'));
const ClickSpark = dynamic(() => import('@/components/ui/ClickSpark'));
const GSAPRegistry = dynamic(() => import('@/lib/gsap-registry'));
const TransitionProvider = dynamic(() => import('@/components/ui/transition-provider'));
const Transition1 = dynamic(() => import('@/components/ui/transition1'));
const Transition2 = dynamic(() => import('@/components/ui/transition2'));

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
        <GSAPRegistry />
        <Navbar />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <TransitionProvider>
            {children}
          </TransitionProvider>
        </ClickSpark>
        <Footer />
        <Transition1 />
        <Transition2 />
      </body>
    </html>
  );
}
