import type { Metadata } from 'next'
import ProjectsList from '@/components/sections/ProjectsList'

export const metadata: Metadata = {
  title: 'Projects - Abhishek Pandey | PixelForge.in',
  description: 'Selected case studies and recent projects in Web Development, UI/UX, Shopify, and WordPress.',
}

const PROJECTS = [
  { id: '01', title: 'PixelForge Agency Website', tags: ['Next.js','GSAP','Three.js'], year: '2024', category: 'react' },
  { id: '02', title: 'Fashion E-Commerce Store', tags: ['Shopify','Liquid','Custom Theme'], year: '2024', category: 'shopify' },
  { id: '03', title: 'Restaurant Ordering Platform', tags: ['WordPress','WooCommerce','ACF'], year: '2023', category: 'wordpress' },
  { id: '04', title: 'SaaS Analytics Dashboard', tags: ['React','TypeScript','Tailwind'], year: '2024', category: 'react' },
  { id: '05', title: 'Brand Identity & Web', tags: ['Figma','Next.js','Framer Motion'], year: '2023', category: 'uiux' },
  { id: '06', title: 'D2C Beauty Brand Store', tags: ['Shopify','Custom Sections','Metafields'], year: '2024', category: 'shopify' },
]

export default function ProjectsPage() {
  return (
    <main id="main-content" style={{ backgroundColor: 'var(--color-bg)', minHeight: '100svh' }}>
      <ProjectsList initialProjects={PROJECTS} />
    </main>
  )
}
