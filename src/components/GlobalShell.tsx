'use client'

// Global client shell - wraps all client-side global components.
// Separated from layout.tsx (Server Component) to allow ssr:false dynamic imports.

import dynamic from 'next/dynamic'
import LenisProvider from '@/components/LenisProvider'
import PageTransition from '@/components/PageTransition'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false })
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false })

export default function GlobalShell({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <CustomCursor />
      <Preloader />
      <Navbar />
      <PageTransition>{children}</PageTransition>
    </LenisProvider>
  )
}
