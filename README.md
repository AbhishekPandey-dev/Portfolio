# Abhishek Pandey — Portfolio

Personal portfolio website for **Abhishek Pandey**, a Full Stack Web Developer, UI/UX Designer, and Shopify & WordPress Engineer with 2.5 years of experience.

Built with **Next.js 15** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS 4**.

## Tech Stack

| Category | Libraries |
|---|---|
| **Framework** | Next.js 15, React 19 |
| **Styling** | Tailwind CSS 4 (PostCSS), `clsx` + `tailwind-merge` |
| **Animation** | GSAP 3, Motion (Framer Motion) 12 |
| **3D / WebGL** | Three.js, kokomi.js, @react-three/fiber, @shadergradient/react |
| **Icons** | lucide-react, @animateicons/react |
| **Language** | TypeScript 5 (strict) |

## Features

- **Animated Hero** — Full-screen 3D shader gradient background (red/black) with GSAP + Motion animations
- **Pill Navigation** — Desktop nav with fluid circular hover effect (GSAP)
- **Bubble Menu** — Full-screen mobile overlay with staggered entrance, focus trapping, and scroll lock
- **Click Spark** — Radial spark lines burst on click via Canvas API
- **3D Ring Gallery** — 28 tech stack icons arranged in rotating concentric rings (Three.js/kokomi.js) with custom fragment shader post-processing (RGB shift, grain, vignette, circular wipe)
- **Snap Scrolling** — Vertical snap sections
- **Responsive** — Desktop pill nav + mobile bubble menu
- **Accessible** — `prefers-reduced-motion`, focus trapping, ESC to close, semantic ARIA

## Project Structure

```
my-portfolio/
├── app/                          # Next.js App Router
│   ├── globals.css               # Global Tailwind + pill nav styles
│   ├── layout.tsx                # Root layout (metadata, HTML shell)
│   └── page.tsx                  # Home page (hero + footer sections)
├── components/                   # React components
│   ├── Navbar.tsx                # Desktop + mobile navigation
│   ├── PillNavLink.tsx           # GSAP-animated pill nav link
│   ├── bubble-menu.tsx           # Full-screen mobile menu overlay
│   ├── ClickSpark.tsx            # Canvas click spark effect
│   ├── Footer.tsx                # Footer wrapping RingGallery
│   └── RingGallery/              # 3D tech stack ring visualization
│       ├── index.tsx             # Dynamic wrapper (ssr: false)
│       └── RingGalleryInner.tsx  # Three.js/kokomi.js implementation
├── hooks/
│   └── use-mobile.ts             # Mobile breakpoint detection
├── lib/
│   └── utils.ts                  # cn() — clsx + tailwind-merge
├── types/
│   └── kokomi.d.ts               # TypeScript declarations for kokomi.js
├── public/assets/tech_icons/     # 28 PNG tech logos for RingGallery
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Planned Sections

The navbar references **About**, **Work**, **Services**, **Process**, and **Contact** sections — these are planned but not yet implemented.
