"use client";

import { useEffect, useRef } from "react";
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
  const githubIconRef = useRef<GithubIconHandle>(null);
  const mailIconRef = useRef<MailIconHandle>(null);

  useEffect(() => {
    githubIconRef.current?.startAnimation();
    mailIconRef.current?.startAnimation();

    const interval = window.setInterval(() => {
      githubIconRef.current?.startAnimation();
      mailIconRef.current?.startAnimation();
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
                ref={githubIconRef}
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
                ref={mailIconRef}
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
          className="inline-flex md:hidden items-center justify-center rounded-full p-2 text-white/85 transition-colors duration-200 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
          aria-label="Open mobile menu"
          data-cursor="hover"
        >
          <span className="flex h-4 w-4 flex-col justify-between">
            <span className="block h-0.5 w-full rounded-full bg-current" />
            <span className="block h-0.5 w-full rounded-full bg-current" />
            <span className="block h-0.5 w-full rounded-full bg-current" />
          </span>
        </button>
      </nav>
    </header>
  );
}
