'use client'

/**
 * src/components/sections/ContactForm.tsx
 * -----------------------------------------------------------------------
 * Form section using strictly React state with div handlers, no <form>.
 * Handles inline validation and staggered entry animations.
 */

import React, { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import FormField from '@/components/ui/FormField'
import MagneticButton from '@/components/ui/MagneticButton'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [message, setMessage] = useState('')
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    // Stagger in form fields on mount
    const fields = formRef.current?.querySelectorAll('.form-field-wrapper, .form-submit')
    if (fields?.length) {
      gsap.from(fields, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }
  }, { scope: containerRef })

  const handleValidateAndSubmit = () => {
    if (status === 'sending' || status === 'success') return

    const newErrors: Record<string, string> = {}

    if (!name || name.length < 2) {
      newErrors.name = 'Please provide a valid name (min 2 chars).'
    }
    
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      newErrors.email = 'Please provide a valid email address.'
    }

    if (!message || message.length < 20) {
      newErrors.message = 'Please provide more details (min 20 chars).'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus('error')
      return
    }

    // Passed validation
    setErrors({})
    setStatus('sending')

    // Simulate Fake API Network request
    setTimeout(() => {
      setStatus('success')
      
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      // Animate form out
      gsap.to(formRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        pointerEvents: 'none',
        onComplete: () => {
          if (formRef.current) formRef.current.style.display = 'none'
          
          // Animate success in
          if (successRef.current) {
            successRef.current.style.display = 'flex'
            gsap.fromTo(successRef.current, 
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
            )
          }
        }
      })
    }, 1500)
  }

  return (
    <div
      ref={containerRef}
      className="contact-form-side"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        minHeight: '600px', // Prevents layout shift
      }}
    >
      <div 
        ref={formRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          width: '100%',
          maxWidth: '560px',
        }}
      >
        <FormField 
          label="Name" 
          value={name} 
          onChange={(v) => { setName(v); if(errors.name) setErrors({...errors, name: ''}) }} 
          placeholder="John Doe"
          required
          error={errors.name}
        />

        <FormField 
          label="Email" 
          type="email"
          value={email} 
          onChange={(v) => { setEmail(v); if(errors.email) setErrors({...errors, email: ''}) }} 
          placeholder="hello@example.com"
          required
          error={errors.email}
        />

        <FormField 
          label="Project Type" 
          type="select"
          value={projectType} 
          onChange={setProjectType} 
          options={[
            'Website', 
            'Shopify Store', 
            'WordPress Site', 
            'UI/UX Design', 
            'Full Stack App', 
            'Other'
          ]}
        />

        <FormField 
          label="Tell me about your project" 
          type="textarea"
          value={message} 
          onChange={(v) => { setMessage(v); if(errors.message) setErrors({...errors, message: ''}) }} 
          placeholder="Briefly describe what you're looking to build..."
          rows={5}
          maxLength={500}
          required
          error={errors.message}
        />

        {/* Submit Actions */}
        <div style={{ marginTop: '16px' }} className="form-submit">
          <div onClick={handleValidateAndSubmit} style={{ width: '100%' }}>
            <MagneticButton 
              variant="fill" 
              style={{ 
                width: '100%', 
                opacity: status === 'sending' ? 0.7 : 1,
                cursor: status === 'sending' ? 'wait' : 'pointer'
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </MagneticButton>
          </div>
          
          <div style={{ minHeight: '24px', marginTop: '16px', textAlign: 'center' }}>
            {status === 'error' && (
              <span style={{ fontFamily: 'var(--font-body, Inter), sans-serif', fontSize: '13px', color: 'var(--color-error)' }}>
                Please fix the errors above before sending.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Success Block */}
      <div 
        ref={successRef}
        style={{
          display: 'none', // Initial invisible state, revealed by GSAP
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-display, Syne), sans-serif',
            fontSize: '24px',
            fontWeight: 600,
            color: 'var(--color-text)',
            marginBottom: '16px',
            letterSpacing: '-0.01em',
          }}
        >
          Message sent!
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body, Inter), sans-serif',
            fontSize: '16px',
            color: 'var(--color-muted)',
            lineHeight: 1.6,
          }}
        >
          Thanks for reaching out. I&apos;ll get back to you within 24 hours to discuss your project.
        </p>
      </div>

      <style>{`
        .contact-form-side {
          flex: 1; /* mobile */
          padding: 48px 24px 120px 24px;
        }
        @media (min-width: 1024px) {
          .contact-form-side {
            flex: 0 0 45%;
            padding: 160px 48px 120px 48px;
          }
        }
      `}</style>
    </div>
  )
}
