import type {Metadata} from 'next';
import './globals.css'; // Global styles

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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
