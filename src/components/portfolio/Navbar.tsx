"use client";

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

  return (
    <header className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-fit items-center gap-3 rounded-full bg-black/85 px-4 py-1.5 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md text-white/90 pointer-events-auto"
      >
        <a
          href="/"
          className="text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-70"
          data-cursor="hover"
        >
          {wordmark}
        </a>

        <ul className="hidden md:flex items-center gap-2">
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

        <div className="hidden md:block h-6 w-px bg-white/15" aria-hidden="true" />

        <div className="hidden md:flex items-center gap-2">
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
          className="hidden md:inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
          data-cursor="hover"
        >
          {cta.label}
        </a>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          className="inline-flex md:hidden items-center justify-center rounded-full p-2 text-white/85 transition-colors duration-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          data-cursor="hover"
        >
          <span className="relative h-4 w-4">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-full rounded-full bg-current transition-opacity duration-200 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-full rounded-full bg-current transition-transform duration-200 ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`absolute left-1/2 top-full z-30 mt-2 w-[min(90vw,22rem)] -translate-x-1/2 overflow-hidden rounded-3xl border border-white/10 bg-black/95 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-200 md:hidden ${
          isOpen ? "visible opacity-100 scale-100" : "invisible opacity-0 scale-95"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-full px-3 py-2 text-sm text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
                data-cursor="hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex items-center gap-2">
          {socials?.github ? (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
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
            className="ml-auto inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/70"
            data-cursor="hover"
          >
            {cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
