'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Menu, X } from 'lucide-react';
import { GithubIcon, MailIcon } from '@animateicons/react/lucide';

interface MenuItem {
  label: string;
  href: string;
  rotation?: number;
  hoverStyles?: {
    bgColor: string;
    textColor: string;
  };
}

interface Socials {
  github?: string;
  email?: string;
}

interface BubbleMenuProps {
  logo?: React.ReactNode;
  items: MenuItem[];
  socials?: Socials;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

export default function BubbleMenu({
  logo,
  items,
  socials,
  menuBg = 'rgba(10, 10, 10, 0.45)',
  menuContentColor = '#ffffff',
  useFixedPosition = true,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.4,
  staggerDelay = 0.08,
}: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const githubIconRef = useRef<any>(null);
  const mailIconRef = useRef<any>(null);

  const close = useCallback(() => setIsOpen(false), []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Autoplay loop for animated icons when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const triggerAnimations = () => {
      githubIconRef.current?.startAnimation();
      mailIconRef.current?.startAnimation();
    };
    triggerAnimations();
    const interval = setInterval(triggerAnimations, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Lock scroll when open and preserve layout by accounting for scrollbar width.
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Keep tab navigation inside the open mobile menu.
  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const menu = menuRef.current;
    if (!menu) return;
    const focusableEls = menu.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];
    firstFocusable?.focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };
    window.addEventListener('keydown', handleTab);
    return () => {
      window.removeEventListener('keydown', handleTab);
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  const premiumEase = [0.22, 1, 0.36, 1] as const;
  const exitEase = [0.4, 0, 1, 1] as const;
  const itemEase = [0.2, 0.8, 0.2, 1] as const;

  const iconVariants = {
    initial: { rotate: -90, opacity: 0, scale: 0.65 },
    animate: { rotate: 0, opacity: 1, scale: 1 },
    exit: { rotate: 90, opacity: 0, scale: 0.65 },
  };

  return (
    <div className={`w-full ${useFixedPosition ? 'pointer-events-none' : ''}`} id="bubble-menu-root">
      {/* Header Bar */}
      <motion.div
        className="flex min-h-14 w-full items-center justify-between gap-3 overflow-hidden rounded-full border border-white/10 px-4 py-2.5 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.16),0_16px_44px_rgba(0,0,0,0.42)] backdrop-blur-2xl pointer-events-auto"
        animate={{
          borderColor: isOpen ? 'rgba(228,54,54,0.45)' : 'rgba(255,255,255,0.12)',
          boxShadow: isOpen
            ? 'inset 0 1px 1px rgba(255,255,255,0.18), 0 18px 56px rgba(228,54,54,0.18), 0 16px 44px rgba(0,0,0,0.5)'
            : 'inset 0 1px 1px rgba(255,255,255,0.16), 0 16px 44px rgba(0,0,0,0.42)',
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: premiumEase }}
        style={{
          background:
            menuBg ||
            'linear-gradient(135deg, rgba(10,10,10,0.84), rgba(16,16,16,0.68))',
        }}
      >
        <div id="bubble-menu-logo" className="flex min-w-0 items-center">
          {logo}
        </div>

        <motion.button
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-bubble-overlay"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          id="bubble-menu-toggle"
          className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.16)] transition-colors duration-200 hover:bg-white/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          animate={{ rotate: isOpen && !shouldReduceMotion ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        >
          <motion.span
            className="absolute inset-1 rounded-full bg-[#E43636]"
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.72 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: premiumEase }}
            aria-hidden="true"
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'menu'}
              className="relative z-10"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: premiumEase }}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-bubble-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: isOpen ? premiumEase : exitEase }}
            onClick={close}
            className="fixed inset-0 z-40 flex items-start justify-center overflow-y-auto px-3 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+5.25rem)] pointer-events-auto"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.58), rgba(0,0,0,0.9) 46%, rgba(0,0,0,0.96))',
              backdropFilter: 'blur(18px) saturate(120%)',
              WebkitBackdropFilter: 'blur(18px) saturate(120%)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10, scale: shouldReduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.985 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.34, ease: premiumEase }}
              className="relative z-10 flex w-full max-w-[25rem] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/88 p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_24px_80px_rgba(0,0,0,0.72)] backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 border-b border-white/[0.08] pb-3">
                <button
                  type="button"
                  onClick={close}
                  className="group flex h-12 w-full items-center justify-between rounded-full border border-white/10 bg-white/[0.055] px-4 text-sm font-semibold text-white/88 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-colors duration-200 hover:border-[#E43636]/50 hover:bg-[#E43636]/16 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 active:bg-white/[0.1]"
                  aria-label="Close mobile navigation"
                >
                  <span className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    <span>Back</span>
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#E43636] shadow-[0_0_18px_rgba(228,54,54,0.8)]" />
                </button>
              </div>

              {/* Items Staggered Container */}
              <nav className="flex w-full flex-col gap-2" aria-label="Mobile Navigation">
                {items.map((item, index) => {
                  const rotationDeg = item.rotation || 0;
                  const delay = shouldReduceMotion ? 0 : index * Math.min(staggerDelay || 0.06, 0.06);
                  const accentColor = item.hoverStyles?.bgColor || '#E43636';

                  return (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 16,
                        scale: shouldReduceMotion ? 1 : 0.96,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : 8,
                        scale: shouldReduceMotion ? 1 : 0.98,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : animationDuration,
                        ease: itemEase,
                        delay,
                      }}
                      className="w-full"
                    >
                      <motion.a
                        href={item.href}
                        onClick={close}
                        style={
                          {
                            '--mobile-item-accent': accentColor,
                            color: menuContentColor,
                          } as React.CSSProperties
                        }
                        className="group relative flex min-h-16 w-full items-center justify-between overflow-hidden rounded-[1.45rem] border border-white/[0.08] bg-white/[0.055] px-5 text-left text-[clamp(1.05rem,4.6vw,1.35rem)] font-bold tracking-wide shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] outline-none transition-colors duration-200 hover:border-[var(--mobile-item-accent)]/60 hover:bg-white/[0.08] focus-visible:border-[var(--mobile-item-accent)] focus-visible:ring-2 focus-visible:ring-[var(--mobile-item-accent)]/45 active:bg-white/[0.1]"
                        id={`mobile-nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                        whileTap={{ scale: shouldReduceMotion ? 1 : 0.985 }}
                        whileHover={{
                          y: shouldReduceMotion ? 0 : -1,
                          rotate: shouldReduceMotion ? 0 : rotationDeg * 0.08,
                        }}
                      >
                        <span
                          style={{
                            background:
                              'linear-gradient(90deg, var(--mobile-item-accent), rgba(228,54,54,0))',
                          }}
                          className="absolute inset-y-0 left-0 w-1 opacity-80 transition-all duration-300 group-hover:w-full group-hover:opacity-100 group-focus-visible:w-full group-focus-visible:opacity-100"
                          aria-hidden="true"
                        />
                        <span className="relative z-10 flex items-baseline gap-3 font-sans capitalize">
                          <span className="text-xs font-semibold text-white/38">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <motion.span
                          className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/82 transition-colors duration-200 group-hover:border-white/25 group-hover:bg-white/16 group-hover:text-white group-focus-visible:border-white/25 group-focus-visible:bg-white/16"
                          animate={{ x: isOpen ? 0 : -4, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: premiumEase, delay: delay + 0.06 }}
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.span>
                      </motion.a>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Socials */}
              <AnimatePresence>
                {(socials?.github || socials?.email) && (
                  <motion.div
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.28,
                      ease: premiumEase,
                      delay: shouldReduceMotion ? 0 : items.length * Math.min(staggerDelay || 0.06, 0.06) + 0.08,
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-3 border-t border-white/[0.08] pt-3"
                    id="mobile-menu-socials"
                  >
                    {socials.github && (
                      <motion.a
                        href={socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: shouldReduceMotion ? 1 : 1.06, y: shouldReduceMotion ? 0 : -1 }}
                        whileTap={{ scale: shouldReduceMotion ? 1 : 0.94 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-colors duration-200 hover:border-[#E43636]/50 hover:bg-[#E43636]/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                        aria-label="GitHub Profile"
                      >
                        <GithubIcon ref={githubIconRef} size={20} color="#ffffff" />
                      </motion.a>
                    )}
                    {socials.email && (
                      <motion.a
                        href={socials.email}
                        whileHover={{ scale: shouldReduceMotion ? 1 : 1.06, y: shouldReduceMotion ? 0 : -1 }}
                        whileTap={{ scale: shouldReduceMotion ? 1 : 0.94 }}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-colors duration-200 hover:border-[#E43636]/50 hover:bg-[#E43636]/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                        aria-label="Send Email"
                      >
                        <MailIcon ref={mailIconRef} size={20} color="#ffffff" />
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
