import type { Metadata } from 'next'
import ContactHero from '@/components/sections/ContactHero'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: "Let's Talk — Abhishek Pandey | PixelForge.in",
  description: 'Get in touch for new projects, collaborations, or inquiries.',
  openGraph: {
    title: "Let's Talk — Abhishek Pandey",
    description: 'Get in touch for new projects, collaborations, or inquiries.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Let's Talk — Abhishek Pandey",
    description: 'Get in touch for new projects, collaborations, or inquiries.',
  },
}

export default function ContactPage() {
  return (
    <div
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="contact-layout"
    >
      <div 
        style={{ 
          maxWidth: '1440px', 
          margin: '0 auto', 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
        className="contact-container"
      >
        <ContactHero />
        
        {/* Desktop Divider */}
        <div 
          aria-hidden="true"
          style={{ width: '1px', backgroundColor: 'var(--color-border)' }}
          className="contact-divider"
        />
        
        <ContactForm />
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .contact-container {
            flex-direction: row !important;
          }
          .contact-divider {
            display: block !important;
          }
        }
        @media (max-width: 1023px) {
          .contact-divider {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
