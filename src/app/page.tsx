import type { Metadata } from 'next'
import HomePageClient from '@/components/HomePageClient'

export const metadata: Metadata = {
  title: 'Abhishek Pandey - Full Stack Developer & UI/UX Designer | PixelForge.in',
  description:
    'Full Stack Developer, UI/UX Designer, Shopify Expert & WordPress Developer based in India. Building fast, beautiful web products at PixelForge.in.',
  keywords: [
    'Full Stack Developer India',
    'UI UX Designer',
    'Shopify Expert',
    'WordPress Developer',
    'Next.js Developer',
    'PixelForge',
    'Abhishek Pandey',
    'Web Developer India',
  ],
  openGraph: {
    title: 'Abhishek Pandey - Full Stack Developer & UI/UX Designer',
    description:
      'Building fast, beautiful web products. Full Stack, UI/UX, Shopify, WordPress - PixelForge.in',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Pandey - Full Stack Developer',
    description: 'Full Stack, UI/UX, Shopify, WordPress - PixelForge.in',
  },
}

export default function HomePage() {
  return <HomePageClient />
}
