'use client'

// Client wrapper for the homepage sections.
// All GSAP sections need a client boundary.

import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false })
const AboutStrip = dynamic(() => import('@/components/sections/AboutStrip'), { ssr: false })
const StrategyCards = dynamic(() => import('@/components/sections/StrategyCards'), { ssr: false })
const ServicesOverview = dynamic(() => import('@/components/sections/ServicesOverview'), { ssr: false })
const CTABand = dynamic(() => import('@/components/sections/CTABand'), { ssr: false })
const Marquee = dynamic(() => import('@/components/Marquee'), { ssr: false })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false })

export default function HomePageClient() {
  return (
    <main id="main-content">
      <Hero />
      <AboutStrip />
      <StrategyCards />
      <ServicesOverview />
      <Marquee direction="left" />
      <CTABand />
      <Marquee direction="right" />
      <Footer />
    </main>
  )
}
