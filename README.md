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

- **Animated Hero** — Full-screen hero with gooey text morphing and click spark effects
- **Pill Navigation** — Desktop nav with fluid circular hover effect (GSAP)
- **Bubble Menu** — Full-screen mobile overlay with staggered entrance, focus trapping, and scroll lock
- **Dynamic Island Nav** — Expanding/collapsing nav bar with spring animations; auto-expands on subpages
- **Particle Footer** — Tech icons burst on mouse move with GSAP physics animation
- **Separate Routes** — About, Work, Services, Process, and Contact as individual pages
- **Responsive** — Desktop pill nav + mobile bubble menu
- **Accessible** — `prefers-reduced-motion`, focus trapping, ESC to close, semantic ARIA

## Project Structure

```
my-portfolio/
├── app/                          # Next.js App Router (6 routes)
│   ├── about/page.tsx
│   ├── work/page.tsx
│   ├── services/page.tsx
│   ├── process/page.tsx
│   ├── contact/page.tsx
│   ├── globals.css               # Global Tailwind + pill nav styles
│   ├── layout.tsx                # Root layout (Navbar + content + Footer)
│   └── page.tsx                  # Home page (hero section)
├── components/
│   ├── Navbar.tsx                # Main navigation (expanding dynamic island)
│   ├── Footer.tsx                # Footer with particle effect + links
│   └── ui/                       # Reusable UI components
│       ├── BubbleMenu.tsx        # Full-screen mobile menu overlay
│       ├── ClickSpark.tsx        # Canvas click spark effect
│       ├── GooeyText.tsx         # SVG-filter text morphing
│       └── PillNavLink.tsx       # GSAP-animated pill nav link
├── lib/
│   └── utils.ts                  # cn() — clsx + tailwind-merge
├── types/
│   └── kokomi.d.ts               # TypeScript declarations for kokomi.js
├── public/assets/tech_icons/     # 28 PNG tech logos for footer particle effect
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
