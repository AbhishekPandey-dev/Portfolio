"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
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

type NavbarProps = {
  wordmark?: string;
  links?: LinkItem[];
  socials?: Socials;
  cta?: CTA;
};

export function Navbar({
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
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = "primary-mobile-navigation";

  const githubIconRef = useRef<any>(null);
  const mailIconRef = useRef<any>(null);

  useEffect(() => {
    // Autoplay animation on load
    const triggerAnimations = () => {
      githubIconRef.current?.startAnimation();
      mailIconRef.current?.startAnimation();
    };

    // Trigger immediately
    triggerAnimations();

    // Loop trigger every 2000ms
    const interval = setInterval(triggerAnimations, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Framer Motion variant configs for premium entry cascades
  const menuVariants: any = {
    closed: {
      opacity: 0,
      scale: 0.95,
      y: -15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 24,
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: any = {
    closed: { opacity: 0, y: 15 },
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 pointer-events-none sm:top-4 lg:px-0">
      {/* Mobile & Tablet Header Pod with BubbleMenu */}
      <div className="lg:hidden w-full relative">
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
            hoverStyles: { bgColor: "#ED1C24", textColor: "#ffffff" }
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

      <nav
        aria-label="Primary"
        className="mx-auto hidden w-fit items-center gap-3 rounded-full bg-[#0a0a0aa0] px-4 py-1.5 border border-white/12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_12px_44px_rgba(0,0,0,0.65)] backdrop-blur-2xl text-white/90 pointer-events-auto lg:flex"
      >
        <Link
          href="/"
          className="text-base font-anton text-white tracking-wider transition-opacity duration-200 hover:opacity-70"
          data-cursor="hover"
        >
          {wordmark}
        </Link>

        <ul className="flex items-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <PillNavLink
                label={link.label}
                href={link.href}
                baseColor="#ED1C24"
                textColor="rgba(255,255,255,0.85)"
                hoverTextColor="#ffffff"
              />
            </li>
          ))}
        </ul>

        <div className="h-6 w-px bg-white/15" aria-hidden="true" />

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

        <a
          href={cta.href}
          className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-serif italic font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
          data-cursor="hover"
        >
          {cta.label}
        </a>
      </nav>
    </header>
  );
}
