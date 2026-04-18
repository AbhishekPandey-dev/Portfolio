import type { Metadata } from 'next'
import AboutHero from '@/components/sections/AboutHero'
import JourneyTimeline from '@/components/sections/JourneyTimeline'
import SkillsGrid from '@/components/sections/SkillsGrid'
import ValuesSection from '@/components/sections/ValuesSection'

export const metadata: Metadata = {
  title: 'About - Abhishek Pandey | PixelForge.in',
  description: 'Full Stack Web Developer & UI/UX Designer with 2 years of experience building performant websites and web applications.',
}

export default function AboutPage() {
  return (
    <main id="main-content" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100svh' }}>
      <AboutHero />
      <JourneyTimeline />
      <SkillsGrid />
      <ValuesSection />
    </main>
  )
}
