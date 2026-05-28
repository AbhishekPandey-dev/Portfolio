'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { GithubIcon, MailIcon } from '@animateicons/react/lucide'

const images = [
  '/assets/tech_icons/ANGULAR.png',
  '/assets/tech_icons/BOOTSTRAP.png',
  '/assets/tech_icons/FIREBASE.png',
  '/assets/tech_icons/GIT.png',
  '/assets/tech_icons/GITHUB.png',
  '/assets/tech_icons/HTML5.png',
  '/assets/tech_icons/JAVA.png',
  '/assets/tech_icons/JAVASCRIPT.png',
  '/assets/tech_icons/JQUERY.png',
  '/assets/tech_icons/MONGO DB.png',
]

function getImageSize(w: number) {
  if (w < 480) return Math.min(w * 0.35, 160)
  if (w < 768) return Math.min(w * 0.3, 170)
  if (w < 1024) return Math.min(w * 0.18, 150)
  if (w < 1440) return Math.min(w * 0.1, 160)
  return 150
}

const FOOTER_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const githubIconRef = useRef<any>(null)
  const mailIconRef = useRef<any>(null)

  useEffect(() => {
    const rootEl = rootRef.current!
    if (!rootEl) return

    let incr = 0
    let oldIncrX = 0
    let oldIncrY = 0
    let firstMove = true
    let indexImg = 0

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const isCoarse = window.matchMedia('(hover: none)').matches
    const resetDist = window.innerWidth / (isCoarse ? 5 : 10)

    function getViewport() {
      return { W: window.innerWidth, H: window.innerHeight }
    }

    const clampX = () => gsap.utils.clamp(0, window.innerWidth)
    const clampY = () => gsap.utils.clamp(0, window.innerHeight)

    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          ease: 'power4.out',
          duration: 1.2,
          delay: 0.5,
        },
      )
    }

    function applyMove(clientX: number, clientY: number) {
      const cx = clampX()
      const cy = clampY()
      const valX = cx(clientX)
      const valY = cy(clientY)

      if (firstMove) {
        firstMove = false
        oldIncrX = valX
        oldIncrY = valY
        return
      }

      incr += Math.abs(valX - oldIncrX) + Math.abs(valY - oldIncrY)

      if (incr > resetDist) {
        incr = 0
        createMedia(
          valX,
          valY - rootEl.getBoundingClientRect().top,
          valX - oldIncrX,
          valY - oldIncrY,
        )
      }

      oldIncrX = valX
      oldIncrY = valY
    }

    const handleMouseMove = (e: MouseEvent) => applyMove(e.clientX, e.clientY)

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches?.[0]) return
      applyMove(e.touches[0].clientX, e.touches[0].clientY)
    }

    function createMedia(x: number, y: number, deltaX: number, deltaY: number) {
      const { H } = getViewport()
      if (y > H - 200) return

      const size = getImageSize(window.innerWidth)
      const image = document.createElement('img')

      image.src = images[indexImg]
      image.alt = 'tech icon'
      image.draggable = false
      Object.assign(image.style, {
        width: size + 'px',
        height: size + 'px',
        position: 'absolute',
        objectFit: 'contain',
        borderRadius: '16px',
        zIndex: '5',
        willChange: 'transform',
        pointerEvents: 'none',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      })

      rootEl.appendChild(image)

      const vel = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const velNorm = Math.min(vel / 80, 2.5)
      const spreadX = (Math.random() - 0.5) * 60 * velNorm
      const spreadY = (Math.random() - 0.5) * 20 * velNorm
      const spin = (Math.random() - 0.5) * 50
      const bounce = 1.6 + (1 - y / H) * 2

      const tl = gsap.timeline({
        onComplete: () => {
          if (image.parentNode === rootEl) rootEl.removeChild(image)
          tl.kill()
        },
      })

      tl.fromTo(
        image,
        {
          xPercent: -50 + spreadX,
          yPercent: -50 + spreadY,
          scale: 0.2 + Math.random() * 0.4,
          rotation: spin,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          ease: 'elastic.out(1.1, 0.5)',
          duration: 0.55,
        },
      )

      tl.fromTo(
        image,
        { x },
        {
          x: '+=' + (deltaX * 2 + spreadX),
          rotation: 0,
          ease: 'power2.out',
          duration: 0.45,
        },
        '<',
      )

      tl.fromTo(
        image,
        { y },
        {
          y: '+=' + (H - y + 120),
          scale: 0.85,
          yPercent: -95,
          ease: 'back.in(1.3)',
          duration: 0.45,
        },
        '<',
      )

      tl.to(image, {
        x: '+=' + (deltaX * 1.4 + spreadX * 0.6),
        rotation: spin + (Math.random() - 0.5) * 40,
        ease: 'power2.in',
        duration: 0.3,
      })

      tl.to(
        image,
        {
          yPercent: 150,
          ease: 'back.in(' + bounce + ')',
          duration: 0.3,
        },
        '<',
      )

      indexImg = (indexImg + 1) % images.length
    }

    rootEl.addEventListener('mousemove', handleMouseMove)
    rootEl.addEventListener('touchstart', handleTouchMove, { passive: true } as AddEventListenerOptions)
    rootEl.addEventListener('touchmove', handleTouchMove, { passive: true } as AddEventListenerOptions)

    return () => {
      rootEl.removeEventListener('mousemove', handleMouseMove)
      rootEl.removeEventListener('touchstart', handleTouchMove)
      rootEl.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    githubIconRef.current?.startAnimation()
    mailIconRef.current?.startAnimation()
    const interval = setInterval(() => {
      githubIconRef.current?.startAnimation()
      mailIconRef.current?.startAnimation()
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden select-none"
      style={{ background: '#000', color: '#f1f1f1' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          zIndex: 3,
          background: 'linear-gradient(to top, #000 20%, transparent)',
        }}
      />

      {/* Particle call to action */}
      <p
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-1 pointer-events-none"
        style={{
          fontSize: 'clamp(28px, 5.5vw, 72px)',
          textAlign: 'center',
          letterSpacing: '-0.03em',
          fontFamily: 'var(--font-poppins), sans-serif',
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        <span
          style={{
            display: 'block',
            width: 'max-content',
            maxWidth: '90vw',
            background: 'linear-gradient(135deg, #fff 40%, #888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Move your mouse
        </span>
        <span
          className="font-b612"
          style={{
            display: 'block',
            width: 'max-content',
            color: '#D3CDCB',
            fontWeight: 400,
            fontSize: '0.45em',
            marginTop: '0.6em',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          or drag
        </span>
      </p>

      {/* Standard footer content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/AbhishekPandey-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition-colors duration-200 hover:border-[#ED1C24]/50 hover:bg-[#ED1C24]/16 hover:text-white"
              >
                <GithubIcon ref={githubIconRef} size={18} color="currentColor" />
              </a>
              <a
                href="mailto:abhishek@pixelforge.in"
                aria-label="Send email"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition-colors duration-200 hover:border-[#ED1C24]/50 hover:bg-[#ED1C24]/16 hover:text-white"
              >
                <MailIcon ref={mailIconRef} size={18} color="currentColor" />
              </a>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-white/30 md:text-left">
            &copy; {new Date().getFullYear()} Abhishek Pandey. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
