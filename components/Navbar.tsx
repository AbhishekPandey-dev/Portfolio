"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback, useReducer } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GithubIcon, MailIcon } from "@animateicons/react/lucide";
import BubbleMenu from "./ui/BubbleMenu";
import PillNavLink from "./ui/PillNavLink";
import { motionTokens, springs } from "@/lib/motion-tokens";

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

const DEFAULT_LINKS: LinkItem[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

type NavbarProps = {
  wordmark?: string;
  links?: LinkItem[];
  socials?: Socials;
  cta?: CTA;
};

  const smoothEase = motionTokens.easing.smooth;

export function Navbar({
  wordmark = "ABHISHEK",
  links = DEFAULT_LINKS,
  socials = {
    github: "https://github.com/AbhishekPandey-dev/",
    email: "mailto:abhishek@pixelforge.in",
  },
  cta = { label: "Let's talk", href: "/contact" },
}: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navRef = useRef<HTMLDivElement>(null);
  const githubIconRef = useRef<any>(null);
  const mailIconRef = useRef<any>(null);

  type NavState = { isExpanded: boolean; isPastHero: boolean };
  type NavAction =
    | { type: "TOGGLE_EXPANDED" }
    | { type: "SET_PAST_HERO"; value: boolean }
    | { type: "CLOSE_EXPANDED" }
    | { type: "RESET_FOR_ROUTE"; isHome: boolean };

  const navReducer = useCallback((state: NavState, action: NavAction): NavState => {
    switch (action.type) {
      case "TOGGLE_EXPANDED":
        return { ...state, isExpanded: !state.isExpanded };
      case "SET_PAST_HERO":
        return state.isPastHero === action.value ? state : { ...state, isPastHero: action.value };
      case "CLOSE_EXPANDED":
        return state.isExpanded ? { ...state, isExpanded: false } : state;
      case "RESET_FOR_ROUTE":
        return { isExpanded: !action.isHome, isPastHero: !action.isHome };
    }
  }, []);

  const [navState, dispatch] = useReducer(navReducer, { isExpanded: false, isPastHero: false });
  const { isExpanded, isPastHero } = navState;

  useEffect(() => {
    dispatch({ type: "RESET_FOR_ROUTE", isHome });
  }, [isHome]);

  const isShowingFull = isExpanded || isPastHero || !isHome;

  const close = useCallback(() => {
    if (!isPastHero && isHome) dispatch({ type: "CLOSE_EXPANDED" });
  }, [isPastHero, isHome]);

  const toggle = useCallback(() => {
    if (isHome) dispatch({ type: "TOGGLE_EXPANDED" });
  }, [isHome]);

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
    if (!isHome) return;
    const hero = document.querySelector("#hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const heroBottom = entry.boundingClientRect.bottom;
        const viewportHeight = window.innerHeight;
        const scrolledPast = heroBottom < viewportHeight * 0.4;
        dispatch({ type: "SET_PAST_HERO", value: scrolledPast });
        if (scrolledPast) {
          dispatch({ type: "CLOSE_EXPANDED" });
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!isExpanded || isPastHero || !isHome) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, isPastHero, close, isHome]);

  useEffect(() => {
    if (!isExpanded || isPastHero || !isHome) return;

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
  }, [isExpanded, isPastHero, close, isHome]);

  const morphSpring = springs.snappy;

  const listVariants = {
    hidden: { transition: { staggerChildren: 0.06, staggerDirection: -1 } },
    visible: { transition: { staggerChildren: 0.06 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: springs.snappy,
    },
  };

  const trailingVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.28, ease: smoothEase },
    },
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
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D40000] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D40000]"></span>
              </span>
            </div>
          }
          items={links.map((link, idx) => ({
            label: link.label.toLowerCase(),
            href: link.href,
            rotation: idx % 2 === 0 ? -6 : 6,
              hoverStyles: { bgColor: "#D40000", textColor: "#ffffff" },
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
          initial={{ y: -16, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            paddingLeft: isShowingFull ? 16 : 28,
            paddingRight: isShowingFull ? 16 : 24,
            paddingTop: isShowingFull ? 6 : 10,
            paddingBottom: isShowingFull ? 6 : 10,
            borderColor:
              isExpanded && !isPastHero
                ? "rgba(212,0,0,0.40)"
                : "rgba(255,255,255,0.12)",
            boxShadow:
              isExpanded && !isPastHero
                ? "inset 0 1px 1px rgba(255,255,255,0.18), 0 16px 48px rgba(212,0,0,0.10), 0 12px 44px rgba(0,0,0,0.65)"
                : "inset 0 1px 1px rgba(255,255,255,0.18), 0 12px 44px rgba(0,0,0,0.65)",
          }}
          transition={{
            y: { duration: 0.5, ease: motionTokens.easing.smooth, delay: 0.1 },
            opacity: { duration: 0.5, ease: motionTokens.easing.smooth, delay: 0.1 },
            paddingLeft: morphSpring,
            paddingRight: morphSpring,
            paddingTop: morphSpring,
            paddingBottom: morphSpring,
            borderColor: { duration: 0.4, ease: smoothEase },
            boxShadow: { duration: 0.4, ease: smoothEase },
          }}
          className="flex items-center rounded-full bg-[#0a0a0aa0] border border-white/12 backdrop-blur-2xl text-white/90 overflow-hidden"
        >
          <div className="flex items-center min-w-0">
            <Link
              href="/"
              className="text-xl font-anton text-white tracking-wider shrink-0 cursor-pointer select-none"
              onClick={(e) => {
                if (!isShowingFull) {
                  e.preventDefault();
                  toggle();
                }
              }}
            >
              {wordmark}
            </Link>

            <motion.span
              animate={{
                width: isShowingFull ? 0 : 16,
                opacity: isShowingFull ? 0 : 1,
                marginLeft: isShowingFull ? 0 : 8,
              }}
              transition={{
                width: { duration: 0.22, ease: smoothEase },
                opacity: { duration: 0.18, ease: smoothEase },
                marginLeft: { duration: 0.22, ease: smoothEase },
              }}
              className="overflow-hidden shrink-0 flex items-center justify-center"
              style={{ height: 16 }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <motion.span
                  animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: motionTokens.easing.smooth }}
                  className="absolute inline-flex h-full w-full rounded-full bg-[#D40000]"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D40000]" />
              </span>
            </motion.span>

            <motion.div
              animate={{
                maxWidth: isShowingFull ? 800 : 0,
                opacity: isShowingFull ? 1 : 0,
                x: isShowingFull ? 0 : -12,
              }}
              transition={{
                maxWidth: { duration: 0.35, ease: smoothEase },
                opacity: { duration: 0.25, ease: smoothEase },
                x: { duration: 0.35, ease: smoothEase },
              }}
              className="overflow-hidden flex items-center whitespace-nowrap"
            >
              <div className="w-3 shrink-0" />

              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate={isShowingFull ? "visible" : "hidden"}
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
                       baseColor="#D40000"
                      textColor="rgba(255,255,255,0.85)"
                      hoverTextColor="#ffffff"
                    />
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={trailingVariants}
                className="flex items-center gap-2 ml-3"
              >
                <div className="h-6 w-px bg-white/15 shrink-0" />
                <div className="flex items-center gap-2">
                  {socials?.github ? (
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={springs.snappy}
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub profile"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-150 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                    >
                      <GithubIcon ref={githubIconRef} size={20} color="#ffffff" />
                    </motion.a>
                  ) : null}

                  {socials?.email ? (
                    <motion.a
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      whileTap={{ scale: 0.95 }}
                      transition={springs.snappy}
                      href={socials.email}
                      aria-label="Send email"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-150 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                    >
                      <MailIcon ref={mailIconRef} size={20} color="#ffffff" />
                    </motion.a>
                  ) : null}
                </div>
              </motion.div>

              <motion.div
                variants={trailingVariants}
                className="ml-3 shrink-0"
              >
                <Link
                  href={cta.href}
                  className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-serif italic font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
                >
                  {cta.label}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
