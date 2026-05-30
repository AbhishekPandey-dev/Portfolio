'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { techIconsSVGs, techIconKeys } from '@/lib/tech-icons-data'

function getImageSize(w: number) {
  if (w < 480) return Math.min(w * 0.35, 160)
  if (w < 768) return Math.min(w * 0.3, 170)
  if (w < 1024) return Math.min(w * 0.18, 150)
  if (w < 1440) return Math.min(w * 0.1, 160)
  return 150
}

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLButtonElement>(null)
  const [copied, setCopied] = useState(false)
  const copiedTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('abhishek@pixelforge.in')
    setCopied(true)
    if (copiedTimeout.current) clearTimeout(copiedTimeout.current)
    copiedTimeout.current = setTimeout(() => setCopied(false), 2000)
  }, [])

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
      const wrapper = document.createElement('span')
      const key = techIconKeys[indexImg]
      wrapper.innerHTML = techIconsSVGs[key] || ''

      wrapper.draggable = false
      Object.assign(wrapper.style, {
        width: size + 'px',
        height: size + 'px',
        position: 'absolute',
        zIndex: '5',
        willChange: 'transform',
        pointerEvents: 'none',
      })

      const svgEl = wrapper.firstElementChild as HTMLElement
      if (svgEl) {
        Object.assign(svgEl.style, {
          width: '100%',
          height: '100%',
          display: 'block',
          filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.6))',
          borderRadius: '8px',
        })
        svgEl.setAttribute('width', '100%')
        svgEl.setAttribute('height', '100%')
      }

      rootEl.appendChild(wrapper)

      const vel = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const velNorm = Math.min(vel / 80, 2.5)
      const spreadX = (Math.random() - 0.5) * 60 * velNorm
      const spreadY = (Math.random() - 0.5) * 20 * velNorm
      const spin = (Math.random() - 0.5) * 50
      const bounce = 1.6 + (1 - y / H) * 2

      const tl = gsap.timeline({
        onComplete: () => {
          if (wrapper.parentNode === rootEl) rootEl.removeChild(wrapper)
          tl.kill()
        },
      })

      tl.fromTo(
        wrapper,
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
        wrapper,
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
        wrapper,
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

      tl.to(wrapper, {
        x: '+=' + (deltaX * 1.4 + spreadX * 0.6),
        rotation: spin + (Math.random() - 0.5) * 40,
        ease: 'power2.in',
        duration: 0.3,
      })

      tl.to(
        wrapper,
        {
          yPercent: 150,
          ease: 'back.in(' + bounce + ')',
          duration: 0.3,
        },
        '<',
      )

      indexImg = Math.floor(Math.random() * techIconKeys.length)
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
    if (bottomRef.current) {
      gsap.fromTo(
        bottomRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 0.8,
          delay: 1.2,
        },
      )
    }
  }, [])

  return (
    <footer
      ref={rootRef}
      className="relative min-h-screen w-full overflow-hidden select-none bg-black text-[#f1f1f1]"
    >
      <div className="footer-gradient-radial absolute inset-0 pointer-events-none" />

      <div className="footer-gradient-linear absolute bottom-0 left-0 right-0 h-64 pointer-events-none" />

      {/* CTA section */}
      <div
        ref={textRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-1 pointer-events-none text-center"
      >
        <span className="footer-gradient-text font-anton text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] uppercase">
          Ready to build
        </span>
        <span className="footer-gradient-text font-anton text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] uppercase -mt-1">
          something great?
        </span>
        <span className="text-white/45 text-xs md:text-sm mt-6 font-sans font-normal tracking-wide max-w-[28rem] leading-relaxed">
          I&apos;m always open to new projects and ideas
        </span>
        <Link
          href="/contact"
          className="pointer-events-auto group relative mt-10 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-9 py-3.5 text-[13px] font-semibold text-white/85 tracking-wide uppercase transition-all duration-500 hover:border-[#D40000]/70 hover:bg-[#D40000] hover:text-white hover:shadow-[0_0_40px_-8px_rgba(212,0,0,0.45)] active:scale-[0.96]"
        >
          <span className="relative z-10">Start a Project</span>
          <span className="relative z-10 text-lg transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5">
            →
          </span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#660000]/60 to-[#D40000]/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
      </div>

      {/* Bottom strip */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 md:px-12"
      >
        <div className="mx-auto max-w-6xl">
          {/* Top row: availability + email */}
          <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D40000] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D40000]" />
                </span>
                <span className="text-sm font-medium text-white/80">
                  Available for projects
                </span>
              </div>
              <span className="ml-[22px] text-xs text-white/35">
                Based in India &middot; Available worldwide
              </span>
            </div>

            <button
              ref={emailRef}
              onClick={copyEmail}
              className="group relative text-sm text-white/55 transition-colors duration-200 hover:text-white"
              aria-label="Copy email address"
            >
              <span className="relative">
                abhishek@pixelforge.in
                <span className="absolute -bottom-px left-0 right-0 h-px bg-[#D40000]/60 scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
              <span
                className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#D40000] px-2.5 py-1 text-[11px] font-medium text-white transition-all duration-300 ${
                  copied
                    ? 'pointer-events-auto opacity-100 translate-y-0'
                    : 'pointer-events-none opacity-0 translate-y-1'
                }`}
              >
                Copied!
              </span>
            </button>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 my-5 md:my-6">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
            <span className="inline-block text-white/15 text-sm animate-spin-slow select-none">
              ✦
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </div>

          {/* Bottom row: tech credit + back to top */}
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex flex-col items-center md:items-start gap-1">
              <div className="group/tech flex items-center gap-2 text-xs">
                {['Next.js', 'React', 'GSAP', 'Tailwind'].map((tech, i) => (
                  <span key={tech}>
                    <span
                      className="tech-item text-white/25 transition-colors duration-300 group-hover/tech:text-[#D40000]/70"
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      {tech}
                    </span>
                    {i < 3 && (
                      <span className="ml-2 text-white/[0.07]">&middot;</span>
                    )}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-white/20">
                &copy; {new Date().getFullYear()} Abhishek Pandey
              </span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-xs text-white/40 transition-colors duration-200 hover:text-white"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <span className="inline-block text-sm transition-transform duration-200 ease-out group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
