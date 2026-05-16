"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  GithubIcon,
  MailIcon,
  type GithubIconHandle,
  type MailIconHandle,
} from "@animateicons/react/lucide";

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
  wordmark = "Abhishek.",
  links = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  socials,
  cta = { label: "Contact", href: "#contact" },
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuId = "primary-mobile-navigation";
  const githubDesktopRef = useRef<GithubIconHandle>(null);
  const mailDesktopRef = useRef<MailIconHandle>(null);
  const githubMobileRef = useRef<GithubIconHandle>(null);
  const mailMobileRef = useRef<MailIconHandle>(null);

  useEffect(() => {
    githubDesktopRef.current?.startAnimation();
    mailDesktopRef.current?.startAnimation();
    githubMobileRef.current?.startAnimation();
    mailMobileRef.current?.startAnimation();

    const interval = window.setInterval(() => {
      githubDesktopRef.current?.startAnimation();
      mailDesktopRef.current?.startAnimation();
      githubMobileRef.current?.startAnimation();
      mailMobileRef.current?.startAnimation();
    }, 3000);

    return () => window.clearInterval(interval);
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

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 pointer-events-none sm:top-4 lg:px-0">
      <div className="mx-auto flex w-fit items-center justify-between gap-3 rounded-full bg-black/85 px-4 py-1.5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-white/90 pointer-events-auto lg:hidden">
        <Link
          href="/"
          className="text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-70"
          data-cursor="hover"
          onClick={() => setIsOpen(false)}
        >
          {wordmark}
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-controls={mobileMenuId}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_25px_rgba(255,255,255,0.12)] transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          data-cursor="hover"
        >
          <span className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id={mobileMenuId}
        aria-hidden={!isOpen}
        className={`absolute left-1/2 top-[4.75rem] z-40 -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/95 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.54)] backdrop-blur-2xl transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
      >
        <ul className="grid gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-2xl border border-transparent bg-white/5 px-4 py-3 text-base font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
          {socials?.github ? (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              data-cursor="hover"
            >
              <GithubIcon
                ref={githubMobileRef}
                size={24}
                duration={1}
                color="#ffffff"
                isAnimated
              />
            </a>
          ) : null}

          {socials?.email ? (
            <a
              href={socials.email}
              aria-label="Send email"
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              data-cursor="hover"
            >
              <MailIcon
                ref={mailMobileRef}
                size={24}
                duration={1}
                color="#ffffff"
                isAnimated
              />
            </a>
          ) : null}

          <a
            href={cta.href}
            onClick={() => setIsOpen(false)}
            className="ml-auto inline-flex min-h-[3rem] items-center justify-center rounded-2xl bg-white px-4 text-sm font-semibold text-black transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
            data-cursor="hover"
          >
            {cta.label}
          </a>
        </div>
      </div>

      <nav
        aria-label="Primary"
        className="mx-auto hidden w-fit items-center gap-3 rounded-full bg-black/85 px-4 py-1.5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-white/90 pointer-events-auto lg:flex"
      >
        <Link
          href="/"
          className="text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-70"
          data-cursor="hover"
        >
          {wordmark}
        </Link>

        <ul className="flex items-center gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex rounded-full px-3 py-1.5 text-sm text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="h-6 w-px bg-white/15" aria-hidden="true" />

        <div className="flex items-center gap-2">
          {socials?.github ? (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              data-cursor="hover"
            >
              <GithubIcon
                ref={githubDesktopRef}
                size={26}
                duration={1}
                color="#ffffff"
                isAnimated
              />
            </a>
          ) : null}

          {socials?.email ? (
            <a
              href={socials.email}
              aria-label="Send email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              data-cursor="hover"
            >
              <MailIcon
                ref={mailDesktopRef}
                size={26}
                duration={1}
                color="#ffffff"
                isAnimated
              />
            </a>
          ) : null}
        </div>

        <a
          href={cta.href}
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
          data-cursor="hover"
        >
          {cta.label}
        </a>
      </nav>
    </header>
  );
}
