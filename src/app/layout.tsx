import type { Metadata, Viewport } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'
import GlobalShell from '@/components/GlobalShell'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500'],
  display: 'swap',
  preload: true,
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'Abhishek Pandey - Full Stack Developer & UI/UX Expert',
    template: '%s | Abhishek Pandey',
  },
  description:
    'Full Stack Web Developer, UI/UX Designer, Shopify & WordPress Expert. Building fast, beautiful digital products through PixelForge.in from India.',
  keywords: [
    'Full Stack Developer',
    'UI/UX Developer',
    'Shopify Expert',
    'WordPress Expert',
    'PixelForge',
    'Next.js Developer India',
    'GSAP Animation',
    'React Developer',
    'Frontend Developer India',
    'Web Designer',
  ],
  authors: [{ name: 'Abhishek Pandey', url: 'https://pixelforge.in' }],
  creator: 'Abhishek Pandey',
  publisher: 'PixelForge.in',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Abhishek Pandey - Full Stack Developer & UI/UX Expert',
    description:
      'Full Stack Web Developer, UI/UX Designer, Shopify & WordPress Expert. Building fast, beautiful digital products through PixelForge.in from India.',
    siteName: 'Abhishek Pandey',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Pandey - Full Stack Developer & UI/UX Expert',
    description:
      'Full Stack Web Developer, UI/UX Designer, Shopify & WordPress Expert.',
    creator: '@abhishekpandey',
  },
}

export const viewport: Viewport = {
  themeColor: 'var(--color-bg)',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  )
}
