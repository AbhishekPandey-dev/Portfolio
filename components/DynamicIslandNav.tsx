"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon, MailIcon } from "@animateicons/react/lucide";
import BubbleMenu from "./bubble-menu";
import PillNavLink from "./PillNavLink";

type LinkItem = {
  label: string;
  href: string;
};

type Socials = {
  github?: string;
  email?: string;
};

type CTA = {
  label: string;
  href: string;
};

type DynamicIslandNavProps = {
  wordmark?: string;
  links?: LinkItem[];
  socials?: Socials;
  cta?: CTA;
};

export function DynamicIslandNav({
  wordmark = "ABHISHEK",
  links = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  socials = {
    github: "https://github.com/AbhishekPandey-dev/",
    email: "mailto:abhishek@pixelforge.in",
  },
  cta = { label: "Let's talk", href: "#contact" },
}: DynamicIslandNavProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const githubIconRef = useRef<any>(null);
  const mailIconRef = useRef<any>(null);

  const isShowingFull = isExpanded || isPastHero;

  const close = useCallback(() => {
    if (!isPastHero) setIsExpanded(false);
  }, [isPastHero]);

  const toggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    const triggerAnimations = () => {
      githubIconRef.current?.startAnimation();
      mailIconRef.current?.startAnimation();
    };
    triggerAnimations();
    const interval = setInterval(triggerAnimations, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hero = document.querySelector("#hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroBottom = entry.boundingClientRect.bottom;
        const viewportHeight = window.innerHeight;
        const scrolledPast = heroBottom < viewportHeight * 0.4;
        setIsPastHero(scrolledPast);
        if (scrolledPast) {
          setIsExpanded(false);
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isExpanded || isPastHero) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, isPastHero, close]);

  useEffect(() => {
    if (!isExpanded || isPastHero) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        close();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded, isPastHero, close]);

  const navSpring = {
    type: "spring" as const,
    stiffness: 380,
    damping: 26,
    mass: 0.65,
  };

  const contentSlide = {
    hidden: { opacity: 0, x: -12, filter: "blur(2px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.22, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      x: -8,
      filter: "blur(1px)",
      transition: { duration: 0.12, ease: "easeIn" as const },
    },
  };

  const listVariants = {
    hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.04 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 400, damping: 24 },
    },
  };

  const socialsVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.08, duration: 0.18, ease: "easeOut" as const },
    },
    exit: { opacity: 0, x: -6, transition: { duration: 0.1 } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, scale: 0.92, x: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { delay: 0.12, type: "spring" as const, stiffness: 400, damping: 22 },
    },
    exit: { opacity: 0, scale: 0.95, x: -6, transition: { duration: 0.1 } },
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 pointer-events-none sm:top-4 lg:px-0">
      <div className="lg:hidden w-full relative pointer-events-auto">
        <BubbleMenu
          logo={
            <div className="flex items-center gap-2 select-none">
              <span className="text-base font-anton tracking-wider text-white">
                {wordmark}
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ED1C24] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ED1C24]"></span>
              </span>
            </div>
          }
          items={links.map((link, idx) => ({
            label: link.label.toLowerCase(),
            href: link.href,
            rotation: idx % 2 === 0 ? -6 : 6,
            hoverStyles: { bgColor: "#ED1C24", textColor: "#ffffff" },
          }))}
          socials={socials}
          menuBg="rgba(10, 10, 10, 0.45)"
          menuContentColor="#ffffff"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.4}
          staggerDelay={0.08}
        />
      </div>

      <div
        ref={navRef}
        className="hidden lg:flex pointer-events-auto justify-center"
      >
        <motion.nav
          aria-label="Primary"
          layout
          style={{ originX: 0.5, originY: 0.5 }}
          className="flex items-center rounded-full bg-[#0a0a0aa0] border border-white/12 backdrop-blur-2xl text-white/90 overflow-hidden"
          animate={{
            paddingLeft: isShowingFull ? "16px" : "28px",
            paddingRight: isShowingFull ? "16px" : "24px",
            paddingTop: isShowingFull ? "6px" : "10px",
            paddingBottom: isShowingFull ? "6px" : "10px",
            borderColor:
              isExpanded && !isPastHero
                ? "rgba(237,28,36,0.45)"
                : "rgba(255,255,255,0.12)",
            boxShadow:
              isExpanded && !isPastHero
                ? "inset 0 1px 1px rgba(255,255,255,0.18), 0 12px 44px rgba(237,28,36,0.12), 0 12px 44px rgba(0,0,0,0.65)"
                : "inset 0 1px 1px rgba(255,255,255,0.18), 0 12px 44px rgba(0,0,0,0.65)",
          }}
          transition={navSpring}
        >
          <div className="flex items-center">
            <span
              className="text-xl font-anton text-white tracking-wider shrink-0 cursor-default select-none"
              onClick={() => {
                if (!isShowingFull) toggle();
              }}
            >
              {wordmark}
            </span>

            <AnimatePresence mode="wait">
              {!isShowingFull ? (
                <motion.span
                  key="dot"
                  variants={contentSlide}
                  initial="visible"
                  animate="visible"
                  exit="exit"
                  className="relative flex h-2 w-2 ml-2 shrink-0"
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ED1C24] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ED1C24]" />
                </motion.span>
              ) : (
                <motion.div
                  key="content"
                  variants={contentSlide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex items-center"
                >
                  <div className="w-3 shrink-0" />

                  <motion.ul
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-center gap-2"
                  >
                    {links.map((link) => (
                      <motion.li
                        key={link.href}
                        variants={linkVariants}
                        className="shrink-0"
                      >
                        <PillNavLink
                          label={link.label}
                          href={link.href}
                          baseColor="#ED1C24"
                          textColor="rgba(255,255,255,0.85)"
                          hoverTextColor="#ffffff"
                        />
                      </motion.li>
                    ))}
                  </motion.ul>

                  <motion.div
                    variants={socialsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center gap-2 ml-3"
                  >
                    <div className="h-6 w-px bg-white/15 shrink-0" />
                    <div className="flex items-center gap-2">
                      {socials?.github ? (
                        <motion.a
                          whileHover={{ scale: 1.12, rotate: 6 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 450, damping: 25 }}
                          href={socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub profile"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-150 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                          data-cursor="hover"
                        >
                          <GithubIcon ref={githubIconRef} size={20} color="#ffffff" />
                        </motion.a>
                      ) : null}

                      {socials?.email ? (
                        <motion.a
                          whileHover={{ scale: 1.12, rotate: -6 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 450, damping: 25 }}
                          href={socials.email}
                          aria-label="Send email"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-150 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                          data-cursor="hover"
                        >
                          <MailIcon ref={mailIconRef} size={20} color="#ffffff" />
                        </motion.a>
                      ) : null}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={ctaVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="ml-3 shrink-0"
                  >
                    <a
                      href={cta.href}
                      className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-serif italic font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
                      data-cursor="hover"
                    >
                      {cta.label}
                    </a>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
