import { Mail } from "lucide-react";

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
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4"
              >
                <path d="M12 0C5.37 0 0 5.375 0 12c0 5.312 3.438 9.812 8.205 11.387.6.113.82-.263.82-.582 0-.287-.01-1.05-.015-2.06-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.756-1.334-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.47-2.382 1.235-3.222-.125-.305-.535-1.53.115-3.185 0 0 1.005-.322 3.295 1.23.96-.267 1.985-.4 3.005-.405 1.02.005 2.045.138 3.005.405 2.285-1.552 3.29-1.23 3.29-1.23.65 1.655.24 2.88.115 3.185.77.84 1.235 1.915 1.235 3.222 0 4.61-2.805 5.62-5.475 5.92.43.37.815 1.1.815 2.22 0 1.605-.015 2.9-.015 3.295 0 .325.215.705.825.585C20.565 21.81 24 17.31 24 12c0-6.625-5.375-12-12-12Z" />
              </svg>
            </a>
          ) : null}

          {socials?.email ? (
            <a
              href={socials.email}
              aria-label="Send email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              data-cursor="hover"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
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
