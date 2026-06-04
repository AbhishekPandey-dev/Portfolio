# Abhishek Pandey — Portfolio

> Full-stack portfolio for **Abhishek Pandey** (Full Stack Web Developer, UI/UX Designer, Shopify & WordPress Engineer). Built with Next.js 16, React 19, Tailwind CSS 4, GSAP 3, and Motion 12.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [All Pages & Routes](#3-all-pages--routes)
4. [Component Inventory & Patterns](#4-component-inventory--patterns)
5. [Design System & Theming](#5-design-system--theming)
6. [Animation System](#6-animation-system)
7. [Layout & Responsive Design](#7-layout--responsive-design)
8. [Navigation & User Flows](#8-navigation--user-flows)
9. [Accessibility Audit (WCAG 2.2 AA)](#9-accessibility-audit-wcag-22-aa)
10. [Performance & Optimization](#10-performance--optimization)
11. [Assets & Media](#11-assets--media)
12. [Environment & Config](#12-environment--config)
13. [Developer Onboarding](#13-developer-onboarding)
14. [Known Issues & TODOs](#14-known-issues--todos)

---

## 1. Project Overview

**Purpose:** A professional portfolio site showcasing Abhishek's technical skills, design services, work process, and contact information. Functions as an interactive résumé and lead-generation tool for clients and recruiters.

**Target audience:** Prospective clients (business owners, startups, agencies), recruiters, and technical collaborators.

**Live URL:** Not configured. No `.env` or deployment URL found in the codebase. `next.config.ts` uses `output: 'standalone'` (containerized deployment is the intent).

**Status:** In development. The Work page shows placeholder cards, the ContactForm has no backend, and the hero video poster file is missing.

**AI-assistance notes:** This README targets an AI agent that needs to understand the full codebase to implement changes (particularly responsive design fixes). All statements are confirmed against source files — no assumptions or guesses.

---

## 2. Tech Stack & Architecture

### Technology Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js 16.0.4 | App Router, React 19, Turbopack (default dev bundler) |
| **React** | 19.2.1 | Server & Client components |
| **Language** | TypeScript 5.9+ | `strict: true`, `moduleResolution: "bundler"` |
| **Styling** | Tailwind CSS 4.1.11 | Via `@tailwindcss/postcss`, PostCSS pipeline |
| **Animation** | GSAP 3.15.0 + Motion 12.23.24 | Dual-animation architecture (see [§6](#6-animation-system)) |
| **Icons** | lucide-react 0.553.0, @animateicons/react 0.3.3, 40 inline SVGs | |
| **Utilities** | clsx + tailwind-merge (via `cn()` helper) | |
| **Linting** | ESLint 9 + `eslint-config-next` | |
| **Bundling (dev)** | Turbopack (Next.js 16 default) | No `--turbo` flag needed |

### Architecture Overview

```
Request → next.config.ts → app/layout.tsx (root layout)
                              ├── Dynamic imports: Footer, ClickSpark, GSAPRegistry, transitions
                              ├── <ClickSpark> wrap
                              │    └── <TransitionProvider> wrap
                              │         └── {children} (page content)
                              ├── <Navbar /> (every page)
                              └── <Footer /> (every page)
                                   └── Subpage layouts (metadata only)
```

### Entry Points

| File | Role |
|---|---|
| `next.config.ts` | Framework config — standalone output, picsum remote images |
| `app/layout.tsx` | Root layout — font loading, global wrappers, metadata |
| `app/globals.css` | Tailwind 4 theme tokens, custom CSS, resets |
| `postcss.config.mjs` | PostCSS with Tailwind plugin |

### Key Decisions & Rationale

1. **Dual-animation architecture (GSAP + Motion):** Motion handles declarative React animations (entrances, staggers). GSAP handles imperative timeline-driven effects (page transitions, particle bursts, pill nav hover circles, GooeyText morphing). This separation avoids fighting either library's paradigm.

2. **Dynamic imports for heavy components:** Footer (GSAP particle burst), ClickSpark (canvas), GSAPRegistry (GSAP bonus plugins), and transitions (GSAP timelines) are all lazy-loaded via `next/dynamic` with `ssr: false`. This keeps the initial bundle lean.

3. **Dynamic island navbar:** The Navbar collapses to a wordmark-only pill on the home page hero section. This was chosen over a persistent full-width nav to maximize the hero's visual impact.

4. **No state management library:** The app uses only local `useState`, `useReducer`, and `useRef`. There's no cross-page shared state, so a library like Zustand or Redux would be over-engineering.

5. **GSAP bonus plugins:** SplitText and DrawSVGPlugin are registered client-side only in `lib/gsap-registry.tsx`. These require a GSAP membership license for commercial use.

### Turbopack (Next.js 16 Default)

- Next.js 16 uses Turbopack as the default development bundler. The `dev` script (`next dev`) runs Turbopack automatically — no `--turbo` flag required.
- **No known Turbopack issues** in this project: no CSS modules (`*.module.css`), no custom Webpack loaders, no `next.config` `webpack` override.
- All Tailwind CSS 4 features work with Turbopack.

### Folder Structure

```
my-portfolio/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout — fonts, Navbar, Footer, ClickSpark, transitions
│   ├── page.tsx                      # Home / hero page
│   ├── not-found.tsx                 # Custom 404
│   ├── error.tsx                     # Error boundary (client component)
│   ├── loading.tsx                   # Suspense loading spinner
│   ├── globals.css                   # Tailwind 4 @theme + custom CSS
│   ├── about/
│   │   ├── layout.tsx                # About metadata
│   │   └── page.tsx                  # About content
│   ├── work/
│   │   ├── layout.tsx                # Work metadata
│   │   └── page.tsx                  # Work/portfolio cards
│   ├── services/
│   │   ├── layout.tsx                # Services metadata
│   │   └── page.tsx                  # Services grid
│   ├── process/
│   │   ├── layout.tsx                # Process metadata
│   │   └── page.tsx                  # Process timeline
│   └── contact/
│       ├── layout.tsx                # Contact metadata
│       └── page.tsx                  # Contact form
├── components/
│   ├── Navbar.tsx                    # Dynamic island navigation
│   ├── Footer.tsx                    # Full-viewport particle footer
│   └── ui/
│       ├── GooeyText.tsx             # SVG-filter text morphing
│       ├── PillNavLink.tsx           # GSAP-animated pill nav link
│       ├── BubbleMenu.tsx            # Full-screen mobile menu
│       ├── ContactForm.tsx           # Static contact form (no backend)
│       ├── ClickSpark.tsx            # Canvas click spark effect
│       ├── transition-provider.tsx   # GSAP page transition orchestrator
│       ├── transition1.tsx           # SVG spiral overlay
│       └── transition2.tsx           # Clip-path overlay
├── hooks/
│   └── use-reduced-motion.tsx        # Reduced-motion + low-end-device detection
├── lib/
│   ├── utils.ts                      # cn() helper
│   ├── motion-tokens.ts              # Centralized animation tokens
│   ├── gsap-registry.tsx             # GSAP bonus plugin registration
│   └── tech-icons-data.ts            # 40 inline SVG tech brand icons
└── public/
    └── assets/
        ├── background.mp4            # Hero background video
        └── background.webm           # WebM fallback
```

### Architecture Flow (Request Lifecycle)

```
1. Browser requests page
2. Next.js matches route in app/ directory
3. Root layout (app/layout.tsx) renders:
   a. <html>/<body> with font classes
   b. <ClickSpark> (canvas overlay)
   c. <TransitionProvider> (GSAP interceptor)
   d. <Navbar /> (server-rendered, hydrates client-side)
   e. Page content from matched route
   f. Dynamic imports load: Footer, ClickSpark client effect, GSAPRegistry
4. Client hydration:
   a. GSAPRegistry registers DrawSVGPlugin + SplitText
   b. Navbar useReducer + IntersectionObserver activate
   c. Footer GSAP particle burst binds mouse events
5. Internal navigation (within TransitionProvider):
   a. Intercepted by TransitionProvider (nav/header/footer clicks)
   b. GSAP plays leave animation (t1 or t2)
   c. router.push() fires
   d. GSAP plays enter animation
```

### Conventions

| Convention | Pattern | Example |
|---|---|---|
| **Component files** | PascalCase `.tsx` | `Navbar.tsx`, `GooeyText.tsx` |
| **Page files** | `page.tsx` in route dir | `app/about/page.tsx` |
| **Layout files** | `layout.tsx` in route dir | `app/about/layout.tsx` |
| **Hooks** | `use-` prefix, kebab | `use-reduced-motion.tsx` |
| **Libraries** | `lib/` — kebab-case | `tech-icons-data.ts`, `motion-tokens.ts` |
| **UI sub-components** | `components/ui/` | Shared presentational components |
| **Utilities** | PascalCase fn names | `cn()` in `utils.ts` |
| **CSS** | Tailwind utility classes + custom `@theme` in `globals.css` | No CSS-in-JS, no CSS modules |
| **Imports** | Path alias `@/` | `@/components/Navbar` |
| **Dynamic imports** | Used for client-only, heavy, or GSAP-reliant components | Footer, ClickSpark, transitions, GSAPRegistry |
| **React Server Components (RSC)** | All page.tsx files are RSC by default | Motion `motion` components are imported as client boundaries |

---

## 3. All Pages & Routes

| Route | File | Title (`<title>`) | Description | Layout |
|---|---|---|---|---|
| `/` | `app/page.tsx` | "Abhishek Pandey" | Hero with video bg, morphing roles, CTAs | Root only |
| `/about` | `app/about/page.tsx` | "About — Abhishek Pandey" | Bio paragraphs with staggered entrance | Root + about layout |
| `/work` | `app/work/page.tsx` | "Work — Abhishek Pandey" | 3 placeholder project cards in responsive grid | Root + work layout |
| `/services` | `app/services/page.tsx` | "Services — Abhishek Pandey" | 4 service cards (Full Stack, Shopify, WordPress, UI/UX) | Root + services layout |
| `/process` | `app/process/page.tsx` | "Process — Abhishek Pandey" | 6-step numbered timeline (Discovery → Support) | Root + process layout |
| `/contact` | `app/contact/page.tsx` | "Contact — Abhishek Pandey" | ContactForm component (no backend) | Root + contact layout |
| `404` | `app/not-found.tsx` | "404 — Page Not Found" | "Page not found" + "Back to home" | Root only |
| Error | `app/error.tsx` | "Error" | Error digest, "Try again", "Go home" | Root only |
| Loading | `app/loading.tsx` | (from parent) | Red spinner + "Loading…" | Root only |

### Page-level Details

**Home (`/`):**
- Full-viewport hero with autoplay/muted/loop background video
- `<h1>`: "ABHISHEK PANDEY" — `text-[clamp(3.5rem,18vw,16rem)]` via Motion entrance animation
- `<GooeyText>`: Cycles through "A Full Stack Developer", "A UI/UX Designer", "A Shopify Expert", "A WordPress Engineer"
- Bio paragraph: "a Man with a plan… bringing your vision to life"
- CTAs: "Get In Touch" (→ `/contact`), "View Projects" (→ `/work`)
- Animated scroll-down indicator (bouncing pill with `<span>` and motion)

**About (`/about`):**
- Anton-font "ABOUT" heading (`md:text-7xl`)
- Two paragraphs describing Abhishek's background and approach
- Staggered entrance from Motion `motion` elements

**Work (`/work`):**
- Anton-font "WORK" heading
- 3 cards in grid: `grid gap-8 md:grid-cols-2 lg:grid-cols-3`
- Each card: `aspect-[4/3]` placeholder (no image), "Project N" title, generic description
- **Placeholder content — no real portfolio items**

**Services (`/services`):**
- Anton-font "SERVICES" heading
- 4 cards in `grid gap-6 md:grid-cols-2`
- Services: Full Stack Development, Shopify Development, WordPress Engineering, UI/UX Design
- Each card has a title, short description, and a red arrow "Learn More" link

**Process (`/process`):**
- Anton-font "PROCESS" heading
- 6 steps with `pl-8 border-l-2 border-red-600` timeline accent
- Steps: Discovery → Strategy → Design → Development → Launch → Support

**Contact (`/contact`):**
- Anton-font "CONTACT" heading, subtitle "Got a project in mind?"
- `ContactForm` component (visual only — no backend)
- Static background, no Mapbox or address widget

**Custom 404 (`/not-found`):**
- Links back to homepage via `<Link>`.

**Error boundary (`/error.tsx`):**
- Client component (`"use client"`), receives `{ error, reset }`
- Shows error digest if available, "Try again" runs `reset()`, "Go home" link.

**Loading (`/loading.tsx`):**
- Centered spinner: `rounded-full border-2 border-red-600 border-t-transparent animate-spin`.

---

## 4. Component Inventory & Patterns

### Component Patterns Used

| Pattern | Components | Description |
|---|---|---|
| **Compound (implicit)** | `Navbar` → `PillNavLink`, `BubbleMenu` | Navbar composes specialized sub-components |
| **Wrapper** | `ClickSpark`, `TransitionProvider` | Canvas/context wrappers around children |
| **Render delegation** | `BubbleMenu` | Accepts `items`, `socials` as props for customization |
| **Controlled (useReducer)** | `Navbar` | State machine for collapsed/expanded/scrolled states |
| **Imperative animation** | `Footer`, `GooeyText`, `PillNavLink`, `transition-provider` | GSAP timelines controlled via refs |
| **Declarative animation** | All page.tsx files | Motion `motion` components for entrance/stagger |
| **Custom hook** | `use-reduced-motion` | Encapsulated motion config logic |
| **Dynamic import** | Footer, ClickSpark, GSAPRegistry, transitions | `next/dynamic` with `ssr: false` |

### Detailed Component Inventory

#### `Navbar` (`components/Navbar.tsx`)
- **Role:** Primary navigation. Dynamic island: collapsed pill on home page hero, expands on scroll or subpages.
- **State machine (useReducer):** `'collapsed'` (hero only, wordmark visible) → `'scrolled'` (links visible) → `'subpage'` (always expanded).
- **Desktop (`lg:flex`):** Pill-shaped container. `IntersectionObserver` on hero sentinel div detects when hero is scrolled past.
- **Mobile (`lg:hidden`):** `BubbleMenu` overlay with hamburger toggle.
- **Props:** `wordmark`, `links[]`, `socials`, `cta` — all with defaults.
- **Accessibility:** `aria-label="Main navigation"` on nav, `aria-labels` on social links, `aria-expanded` on mobile toggle.
- **Dependencies:** lucide-react (Menu, X), @animateicons/react (GithubIcon, MailIcon).

#### `Footer` (`components/Footer.tsx`)
- **Role:** Full-viewport footer with interactive GSAP particle burst and CTAs.
- **Particle burst:** On mouse/touch move within the footer area, GSAP animates randomly selected SVG tech icons from `tech-icons-data.ts` flying upward. `getImageSize()` adapts icon size to viewport (desktop: 60px, tablet: 50px, mobile: 40px).
- **Sections:** CTA block ("Ready to build something great?" + "Start a Project" button), bottom strip (availability badge with ping dot, email copy button, tech credit, copyright, "Back to top").
- **Email copy:** Uses `navigator.clipboard.writeText("abhishek@pixelforge.in")` with success toast (div insertion) and error fallback (window.open mailto).
- **Dynamic import:** Loaded via `next/dynamic` with `ssr: false` — GSAP plugin registration dependency.
- **Accessibility:** `aria-label` on email button, back-to-top button, interactive particle effect (not keyboard accessible — visual only).

#### `GooeyText` (`components/ui/GooeyText.tsx`)
- **Role:** Rotating role labels on the Hero with gooey SVG filter morphing.
- **Mechanism:** Two text elements with `feColorMatrix` threshold SVG filter for the gooey effect. `requestAnimationFrame` loop manages morph/cooldown cycles. Pauses when out-of-view (`IntersectionObserver` via `useInView`).
- **Reduced motion:** Renders first text only, no animation loop.
- **Props:** `texts`, `morphTime`, `cooldownTime`, `className`, `textClassName`.

#### `PillNavLink` (`components/ui/PillNavLink.tsx`)
- **Role:** Individual nav link with GSAP hover circle animation.
- **Mechanism:** On hover, a circle (color from `baseColor`, default `#D40000`) scales up from the bottom behind the label. On hover end, it scales back. Label swap: current slides up while hover label slides in from below.
- **GSAP:** Uses `gsap.timeline()` with `power3.easeOut`. Recalculates dimensions on resize via ResizeObserver.
- **Props:** `label`, `href`, `className`, `baseColor`, `pillBgColor`, `textColor`, `hoverTextColor`, `ease`.

#### `BubbleMenu` (`components/ui/BubbleMenu.tsx`)
- **Role:** Full-screen mobile navigation overlay.
- **Features:** Animated hamburger ↔ X toggle, staggered nav items with numbered labels, rotation offsets, gradient hover accents, arrow-up-right icon, social links (GitHub, Email), focus trapping (Tab cycle), scroll lock with padding compensation, Escape to close.
- **Props:** `logo`, `items[]` (label, href, rotation, hoverStyles), `socials`, `menuBg`, `menuContentColor`, animation config.
- **Accessibility:** Focus trapping implemented, `aria-label` on toggle, Escape key closes menu, scroll lock prevents background scroll.

#### `ContactForm` (`components/ui/ContactForm.tsx`)
- **Role:** Visual-only contact form.
- **Fields:** Name, Email, Message with Tailwind-styled inputs.
- **Submit behavior:** `e.preventDefault()` only — no action, no validation, no API call.
- **Accessibility:** Missing explicit `<label>` elements (uses placeholder as visual label only), no `aria-describedby` for error messages (none exist), no `required` or validation attributes.

#### `ClickSpark` (`components/ui/ClickSpark.tsx`)
- **Role:** Decorative canvas spark effect on every click.
- **Mechanism:** HTML5 Canvas overlay that spawns radial lines from click position, fading out.
- **Reduced motion:** Disabled when `prefers-reduced-motion` is active.
- **Props:** `sparkColor`, `sparkSize`, `sparkRadius`, `sparkCount`, `duration`, `easing`, `extraScale`.
- **Used:** Wraps entire page content in root layout.

#### Transition System (`components/ui/transition-provider.tsx`, `transition1.tsx`, `transition2.tsx`)
- **Role:** GSAP-powered page-to-page transition orchestration. See [§6 — Animation System](#6-animation-system) for full detail.
- **Mechanism:** Intercepts `<a>` clicks within `<nav>`, `<header>`, `<footer>` via delegated `onClick`. Plays leaving animation → `router.push()` → plays entering animation.
- **State machine:** `'idle'` → `'setup'` → `'leaving'` → `'entering'` → `'idle'`.
- **Transition types:**
  - **T1 (transition1.tsx):** SVG spiral path drawn via GSAP DrawSVGPlugin. Used for `/about`, `/services`, `/contact`.
  - **T2 (transition2.tsx):** Clip-path overlay expanding from center, with destination title shown via SplitText. Used for `/`, `/work`, `/process`.
  - **Fallback:** If `prefers-reduced-motion` or route not in `OVERLAY_TEXT` map, falls back to direct `router.push()`.
- **Route→title mapping:** Defined in transition-provider.tsx as `OVERLAY_TEXT` object.

### Performance Patterns

| Pattern | Where | Benefit |
|---|---|---|
| **Dynamic imports** | Footer, ClickSpark, GSAPRegistry, transitions | Reduces initial bundle by deferring GSAP + Canvas heavy code |
| **`useMemo` / `useCallback`** | Navbar, BubbleMenu | Prevents unnecessary re-renders on animation config objects |
| **`IntersectionObserver`** | Navbar (hero scroll), GooeyText (in-view pause) | Avoids JS animation ticking when off-screen |
| **`ResizeObserver`** | PillNavLink | Recalculates hover dimensions without forced reflow |
| **Centralized animation tokens** | `lib/motion-tokens.ts` | Single source of truth for all animation constants |
| **Reduced-motion hook** | `hooks/use-reduced-motion.tsx` | System-wide motion on/off toggle via one import |
| **No re-render chain** | All components | No global state — nav state is isolated, pages are independent |

### State Management

- **No global state library.** The app's architecture doesn't need one.
- **Navbar state:** `useReducer` with 3 states (`collapsed`, `scrolled`, `subpage`). Action: `SET_VIEW`.
- **Transition state:** `TransitionPhase` with 4 states managed by `TransitionProvider`.
- **Local `useState`:** Animation toggles, reduced-motion flags, GooeyText loop control.
- **`useRef`:** GSAP timeline references, DOM element refs, animation frame IDs.

---

## 5. Design System & Theming

### Design Direction
- **Aesthetic:** Dark theme with high contrast, bold typography, red accent (`#D40000`). Minimalist, space-maximizing layout.
- **Target audience fit:** Appropriate for a developer/designer portfolio — bold, technical, visually distinctive. The red accent conveys energy and confidence.
- **Distinctive choices:** Dynamic island navbar (unique for a portfolio), full-screen footer with interactive particle burst, SVG gooey filter text morphing, GSAP page transitions.

### Color System (`globals.css` → `@theme`)

| Token | Value | Usage | WCAG Contrast (on bg #0a0a0a) |
|---|---|---|---|
| `--color-red` | `#D40000` | Accent, hover states, borders | 4.5:1 on #fff text (AA) |
| `--color-blood-red` | `#8B0000` | Hover dark accent | — |
| `--color-light-gray` | `#808080` | Secondary text, subtitles | 7:1 on #0a0a0a (AAA) |
| `--color-white` | `#EFEEE8` | Primary text (warm off-white) | 17.2:1 on #0a0a0a (AAA) |
| Background | `#0a0a0a` | Page background | — |
| Card bg | `#141414` | Card/container background | — |
| Card border | `#262626` | Card borders | — |

- **Note:** Contrast values are visual estimates from hex values. Actual ratio depends on rendered font weight and size.
- **No dark/light mode toggle** — dark-only theme.

### Typography

| Font | Usage | Weights | CSS Variable |
|---|---|---|---|
| **Anton** | All major headings (H1, section titles) | 400 | `--font-anton` |
| **Poppins** | Body text, paragraphs, descriptions | 400, 500, 600, 700 | `--font-sans` |
| **B612** | Loaded but **unused** | 400, 700 | `--font-b612` |

- **Headings:** Anton, uppercase, large sizes (`text-[clamp(3.5rem,18vw,16rem)]` on hero, `md:text-7xl` on subpages).
- **Body:** Poppins, smaller sizes (`text-sm`, `text-base`).
- **Font sizing pattern:** Responsive via `clamp()` for key text, Tailwind breakpoint classes for rest.
- **B612:** Declared and loaded but never applied in any component. Possibly intended for code snippets or monospace-style elements.

### Spacing & Layout Tokens
- **Max widths:** `max-w-6xl` (general content), `max-w-4xl` (home bio), `max-w-2xl` (About text).
- **Padding:** `px-6 md:px-12`, subpages use `px-6 md:px-12 lg:px-[50px]`.
- **Gap:** `gap-6` (services), `gap-8` (work grid), `gap-12` (sections).
- **No Tailwind spacing overrides** in the `@theme` — default Tailwind 4 spacing scale.

### Animation Tokens (`lib/motion-tokens.ts`)

Centralized animation constants:

```ts
// Motion durations
const MOTION_DURATIONS = { fast: 0.3, normal: 0.5, slow: 0.8, slower: 1.2 }

// Easings
const MOTION_EASINGS = [...]
const MOTION_SPRINGS = { stiff: ..., gentle: ..., bouncy: ... }

// GSAP easings
const GSAP_EASINGS = { default: "power3.out", ... }
```

This module provides a single import path for all animation timing. Components should reference these tokens rather than hardcoding values.

### Design Consistency Evaluation

| Aspect | Status |
|---|---|
| **Heading hierarchy** | Consistent — Anton for all major headings, Poppins for body |
| **Spacing rhythm** | Inconsistent — pages use different top padding, no unified section spacing scale |
| **Color usage** | Consistent — red accent, dark bg, white text throughout |
| **Button styles** | Inconsistent — Hero uses a primary/secondary pair with opposing fills; Services uses arrow links; ContactForm uses a different button style |
| **Card patterns** | Consistent border (`border border-white/10`), border radius, padding across Work and Services |
| **Animation patterns** | Consistent entrance animation (Motion, 0.5s, stagger) across all pages |
| **B612 font** | Loaded but zero references — inconsistency or planned feature |

---

## 6. Animation System

The portfolio uses a **dual-animation architecture** — Motion for declarative React animations and GSAP for imperative timeline-driven effects.

### Motion (Declarative)

Used for page-level entrance animations:

- **Entrance via `motion`:** All page files wrap content in `<motion.div>` with `initial → animate → transition`.
- **Stagger patterns:** `staggerChildren: 0.1` with `variants` objects.
- **Common variant:** fade-up from 40px with 0.5s ease.

### GSAP (Imperative)

Used for four distinct effects:

| Effect | Component | GSAP Features | Complexity |
|---|---|---|---|
| **Page transitions** | `transition-provider.tsx` | Timelines, DrawSVGPlugin, SplitText, clip-path | High |
| **Particle burst** | `Footer.tsx` | `gsap.to()`, staggered batch, random positions | Medium |
| **Hover circle** | `PillNavLink.tsx` | `gsap.timeline()`, scale transform | Low |
| **Text morphing** | `GooeyText.tsx` | `requestAnimationFrame` (not GSAP, but grouped here) | Medium |

### GSAP Plugin Registration

`lib/gsap-registry.tsx` registers bonus plugins:
- `DrawSVGPlugin` — for transition1.tsx spiral draw
- `SplitText` — for transition2.tsx destination title split

These are GSAP Club GreenSock membership plugins (commercial license required).

### Transition Provider (`transition-provider.tsx`)

The most architecturally significant animation component:

```
User clicks <a> in nav/header/footer
  → TransitionProvider intercepts (event delegation)
  → Sets phase to 'leaving'
  → GSAP plays exit animation (t1 or t2 based on route)
  → On complete: router.push()
  → Next.js renders new page
  → Sets phase to 'entering'
  → GSAP plays enter animation (reverse of exit)
  → Sets phase to 'idle'
```

**Route mapping:**
- T1 (SVG spiral): `/about`, `/services`, `/contact`
- T2 (Clip-path overlay): `/`, `/work`, `/process`

**Reduced motion:** Checks `prefers-reduced-motion` → skips animation, direct push.

---

## 7. Layout & Responsive Design

### Layout System
- **CSS Grid:** Work page (`md:grid-cols-2 lg:grid-cols-3`), Services page (`md:grid-cols-2`)
- **Flexbox:** Navbar, Footer, mobile menu, form fields
- **Percentage-based:** Hero layout: 50/50 split between name + role area and bio + CTAs
- **Tailwind classes:** `min-h-screen` (hero, footer), `max-w-4xl/6xl/2xl` (content containers)

### Breakpoint Usage

| Breakpoint | Where | What changes |
|---|---|---|
| **None (mobile-first)** | All pages | Single-column grid, stacked layout, BubbleMenu nav |
| **`md`** | Home, About, Work, Services, Contact, Navbar, Footer | Grid columns, horizontal form, desktop nav, larger text |
| **`lg`** | Work (3-col), Navbar (pill nav), page padding | More columns, wider containers |
| **Custom `@media (max-width: 768px)`** | `globals.css` transitions | Smaller overlay font size |

### Responsive Behavior by Page

| Page | Mobile | `md`+ | `lg`+ |
|---|---|---|---|
| **Home** | Full-width, stacked. Name uses clamp. GooeyText may overflow. | `whitespace-nowrap` on name, 50/50 split. | Same as md |
| **About** | Single column, `max-w-4xl` | `md:px-12`, `md:text-7xl` | — |
| **Work** | 1 column grid | 2 columns | 3 columns |
| **Services** | 1 column grid | 2 columns | Same as md |
| **Process** | Single-column timeline | Same | Same |
| **Contact** | Single-column form | 2-column name/email row | Same |
| **Navbar** | BubbleMenu overlay | — | Pill nav visible |
| **Footer** | Stacked bottom strip | Horizontal bottom strip | Full-width |

### Responsive Issues (Detected)

1. **No `sm:` breakpoint overrides exist.** All responsive logic starts at `md:` (768px). On screens 480–768px, content may appear too stretched or sparse.

2. **Home hero below 480px:** The 50/50 CSS split (`w-1/2`) for bio + role label may be too narrow. GooeyText has `whitespace-nowrap` that could overflow.

3. **Footer particle overlap:** Absolutely positioned tech icons may overlap CTA text on very small screens. The burst origin is the mouse position, but default positions aren't bounded to the particle container.

4. **Services/Work card spacing:** Cards use fixed `p-8` with border patterns. `p-8` (32px) on mobile viewports (< 480px) leaves little room for content.

5. **Process page:** No responsive behavior at all — single static timeline. On mobile < 360px, the left border + padding may crowd the text.

6. **Footer email copy toast:** The success toast is inserted as a regular `<div>` with `position: fixed` and no responsive positioning logic.

---

## 8. Navigation & User Flows

### Navigation Structure

- **Desktop (`lg:flex`):** Pill-shaped dynamic island navbar. Collapsed on hero (wordmark only), expands via click or scroll. Links: About, Work, Services, Process, Contact + GitHub, Mail, "Let's Talk" CTA.
- **Mobile (`lg:hidden`):** BubbleMenu overlay with hamburger toggle. Full-screen with staggered items, socials, focus trapping.
- **Footer:** "Start a Project" → `/contact`. "Back to top" smooth-scrolls to `<html>`.

### User Flows

```
1. Discovery:  Home (hero) → scroll → read bio → "View Projects" → /work
2. Conversion: Home → "Get In Touch" / "Start a Project" → /contact → (submit fails, no backend)
3. Information: Any page → Navbar → About / Services / Process
4. Navigation:  Internal link → TransitionProvider intercepts → GSAP animation → router.push()
```

### Inter-page Transition Details

| Destination Route | Transition Type | Visual |
|---|---|---|
| `/about`, `/services`, `/contact` | T1 — SVG spiral | Spiral path draws from center outward |
| `/`, `/work`, `/process` | T2 — Clip-path overlay | Center-expanding circle reveals destination title |

### Scroll Behavior
- **"Back to top":** `document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })`
- **BubbleMenu open:** Scroll lock via `overflow: hidden` on body, with scrollbar-width compensation.
- **Navbar collapse:** `IntersectionObserver` triggers expand when hero (sentinel div) exits viewport.

---

## 9. Accessibility Audit (WCAG 2.2 AA)

### What Passes

| Criteria | Status | Evidence |
|---|---|---|
| **1.1.1 Non-text Content** | Pass | Video has `aria-hidden="true"` (decorative) |
| **2.1.1 Keyboard** | Partial pass | Navbar links are keyboard-focusable. BubbleMenu has focus trapping + Escape. PillNavLink hover animation has no keyboard equivalent. |
| **2.3.3 Animation from Interactions** | Pass | `prefers-reduced-motion` disables all GSAP and Motion animations |
| **2.4.4 Link Purpose (In Context)** | Pass | All links have descriptive text (`aria-label` on icon-only links) |
| **2.4.7 Focus Visible** | Pass | `focus-visible:` ring styles present on all interactive elements |
| **2.5.3 Label in Name** | Pass | Accessible names match visible text |
| **4.1.2 Name, Role, Value** | Pass | All interactive elements have appropriate ARIA roles |

### What Has Issues

| Criteria | Issue | File | Severity |
|---|---|---|---|
| **1.1.1 Non-text Content** | Hero video references `poster="/assets/background-poster.webp"` — file missing, browser shows broken image | `app/page.tsx` | Medium |
| **1.3.1 Info and Relationships** | ContactForm inputs use `placeholder` as the only label — no `<label>` elements or `aria-label` | `ContactForm.tsx` | High |
| **1.4.3 Contrast (Minimum)** | Red `#D40000` on dark `#0a0a0a` (used for some text elements) may fail contrast at small sizes — needs testing | `globals.css` | Medium |
| **2.4.6 Headings and Labels** | No `<h2>`–`<h6>` hierarchy within pages — only `<h1>` headings | All page files | Medium |
| **2.4.10 Section Headings** | Not applicable (single-page sections lack headings) | — | Info |
| **2.5.8 Target Size (Minimum)** | PillNavLink hover circle targets are limited to text bounds on mobile | `PillNavLink.tsx` | Low |
| **4.1.3 Status Messages** | ContactForm has no success/failure feedback | `ContactForm.tsx` | High |

### Full Audit Checklist

| WCAG SC | Description | Verdict | Notes |
|---|---|---|---|
| 1.1.1 | Non-text content | ⚠️ Partial | Video poster missing |
| 1.3.1 | Info and relationships | ❌ Fail | Form inputs lack `<label>` |
| 1.4.1 | Use of color | ✅ Pass | Red accent is not the only differentiator |
| 1.4.3 | Contrast (minimum) | ⚠️ Caution | Red on dark may fail at small sizes |
| 1.4.4 | Resize text | ✅ Pass | Uses `clamp()` and responsive units |
| 1.4.10 | Reflow | ⚠️ Partial | No `sm:` breakpoints; may break below 480px |
| 1.4.11 | Non-text contrast | ⚠️ Partial | Card borders `#262626` on `#141414` — 1.5:1 (fails) |
| 2.1.1 | Keyboard | ⚠️ Partial | PillNavLink hover not keyboard-triggered |
| 2.1.2 | No keyboard trap | ✅ Pass | BubbleMenu has Escape + close button |
| 2.3.3 | Animation from interactions | ✅ Pass | Reduced motion disabled |
| 2.4.4 | Link purpose | ✅ Pass | Descriptive labels |
| 2.4.7 | Focus visible | ✅ Pass | `focus-visible:` rings |
| 2.4.11 | Focus not obscured | ✅ Pass | No sticky overlays |
| 2.5.3 | Label in name | ✅ Pass | |
| 2.5.8 | Target size (mobile) | ⚠️ Partial | Pill nav targets may be small |
| 3.2.1 | On focus | ✅ Pass | No focus-triggered actions |
| 3.3.1 | Error identification | ❌ Fail | ContactForm has no validation |
| 3.3.2 | Labels or instructions | ❌ Fail | ContactForm uses placeholder-only labels |
| 4.1.2 | Name, role, value | ✅ Pass | |
| 4.1.3 | Status messages | ❌ Fail | No form feedback |

### Scrollbar Visibility
- `scrollbar-width: none` in `globals.css` hides the scrollbar globally.
- **Impact:** Users who rely on scrollbar visibility for spatial orientation may find navigation disorienting.
- **Recommendation:** Apply scrollbar hiding only to specific containers, or add visible scroll indicators.

### Focus Styles
- All interactive elements use `focus-visible:` with `ring-2 ring-red-600` or similar.
- BubbleMenu implements custom focus trapping with `tabIndex` cycling.
- **No skip navigation link** — users must Tab through the entire navbar to reach main content.

---

## 10. Performance & Optimization

### Bundle Optimization

| Strategy | Implementation | Impact |
|---|---|---|
| **Dynamic imports** | Footer, ClickSpark, GSAPRegistry, transitions via `next/dynamic` | Keeps initial JS lean — GSAP-heavy code deferred |
| **No CSS-in-JS** | Tailwind utility classes only | Zero runtime CSS injection |
| **No global state** | Local `useState`/`useReducer` only | No unnecessary re-render cascades |
| **Image optimization** | `next.config.ts` allows `picsum.photos` (unused) | — |

### Build Configuration

- **`output: 'standalone'`:** Enables `docker build` without Node_modules on the server. See [Next.js standalone output docs](https://nextjs.org/docs/app/api-reference/next-config-js/output).
- **`sharp`:** Listed as `devDependency` (required by Next.js for production image optimization).
- **No `generateStaticParams()`:** All pages are dynamic by default (no static generation). This is appropriate for a portfolio with no dynamic routes.
- **No `generateMetadata()`:** Each subpage layout calls `metadata` export directly — no dynamic metadata generation needed.

### Caching & Data

- **No data fetching:** All content is static JSX. No API calls, no database queries, no ISR/SSR data.
- **No `fetch()` calls** anywhere in the codebase.
- **No caching strategy needed** — all content is bundle-based.

---

## 11. Assets & Media

### Fonts (Google Fonts via `next/font/google`)

- **Anton** (400): CSS variable `--font-anton`, applied to all major headings
- **Poppins** (400, 500, 600, 700): CSS variable `--font-sans`, body text
- **B612** (400, 700): CSS variable `--font-b612`, **not used anywhere**

### Icons

| Source | Where Used | Count |
|---|---|---|
| **lucide-react** | BubbleMenu (Menu, X, ArrowLeft, ArrowUpRight) | 4 icons |
| **@animateicons/react** | Navbar + BubbleMenu (GithubIcon, MailIcon) | 2 icons |
| **Inline SVGs** `tech-icons-data.ts` | Footer particle burst | 40 tech brand icons |

### Video

- `public/assets/background.mp4` — MP4 format (H.264)
- `public/assets/background.webm` — WebM format (VP9/AV1, better compression)
- Both autoplay, muted, loop, playsinline
- `poster="/assets/background-poster.webp"` — **file does not exist** (broken image on slow connections)

### Images

- **No static images** in the project. Work page cards have placeholder `aspect-[4/3]` divs.
- `next.config.ts` allows `picsum.photos` as a remote image source (not used).

---

## 12. Environment & Config

### Environment Variables

**None defined.** No `.env.local`, `.env.example`, or any `.env` file. `.gitignore` excludes `.env*` but includes an exception for `.env.example` (which doesn't exist either).

### Configuration Files

| File | Key Settings |
|---|---|
| `next.config.ts` | `reactStrictMode: true`, `typescript.ignoreBuildErrors: false`, `images.remotePatterns: [{ hostname: 'picsum.photos' }]`, `output: 'standalone'` |
| `tsconfig.json` | `strict: true`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `@/* → ./*` |
| `postcss.config.mjs` | `@tailwindcss/postcss` plugin only |
| `package.json` | Scripts: `dev`, `build`, `start`, `lint`. Dependencies: next 16.0.4, react 19.2.1, tailwindcss 4.1.11, motion 12.23.24, gsap 3.15.0, lucide-react 0.553.0 |

### Scripts

| Command | Script |
|---|---|
| `npm run dev` | `next dev` (Turbopack default) |
| `npm run build` | `next build` |
| `npm start` | `next start` (production server) |
| `npm run lint` | `next lint` |

---

## 13. Developer Onboarding

### Getting Started

```bash
git clone <repo>
cd my-portfolio
npm install
npm run dev    # Next.js 16 dev server with Turbopack
```

Requirements:
- Node.js 18+ (Next.js 16 requires 18.17+)
- npm 9+

### Development Workflow

1. **Dev server:** `npm run dev` — fast refresh via Turbopack.
2. **Build:** `npm run build` — standalone output for Docker.
3. **Lint:** `npm run lint` — ESLint via `eslint-config-next`.
4. **No tests** — no test runner is configured.

### Key Files for New Contributors

| For this | Start here |
|---|---|
| Understanding the architecture | `app/layout.tsx` (root layout + dynamic imports) |
| Adding a page | Create `app/{route}/page.tsx` + optional `layout.tsx` |
| Adding a component | Create in `components/` or `components/ui/` |
| Adding an animation | Extend `lib/motion-tokens.ts`, use `motion` or GSAP |
| Changing the theme | Edit `app/globals.css` `@theme` block |
| Adding a transition type | Extend `transition-provider.tsx` route mapping + create overlay component |

### Convention Quick Reference

- **Naming:** PascalCase for components, kebab-case for utility files
- **Imports:** Use `@/` alias for project root
- **TypeScript:** `strict: true`, explicit types for all props
- **Animations:** Import tokens from `@/lib/motion-tokens`, prefer Motion for entrances, GSAP for timelines
- **Responsive:** Mobile-first, use `md:` as the primary breakpoint, add `sm:` for sub-768px if needed
- **Accessibility:** Add `aria-label` on icon-only elements, test with reduced motion

### Commands Reference

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build with standalone output
npm start         # Production server
npm run lint      # ESLint check
```

---

## 14. Known Issues & TODOs

### 🚨 Placeholder / Incomplete Content

| Issue | File(s) | Severity | Impact |
|---|---|---|---|
| **Work page cards are placeholders** | `app/work/page.tsx` | High | Portfolio has no real content |
| **ContactForm has no backend** | `components/ui/ContactForm.tsx` | High | Form doesn't send anything |
| **Hero video poster missing** | `public/assets/` | Medium | Broken image on slow connections |

### 🐛 Bugs

| Bug | File | Description |
|---|---|---|
| **Missing poster image** | `app/page.tsx` | `poster="/assets/background-poster.webp"` — file doesn't exist |
| **No form validation** | `ContactForm.tsx` | Form submits with `e.preventDefault()` only; no feedback to user |

### 🎨 Design & UX

| Issue | Priority | Recommendation |
|---|---|---|
| B612 font loaded but unused | Low | Remove or add intended usage |
| Missing `sm:` breakpoint overrides (480–768px gap) | Medium | Add Tailwind `sm:` responsive variants |
| No skip navigation link | Medium | Add visually-hidden "Skip to content" link |
| ContactForm missing `<label>` elements | High | Add `<label>` or `aria-label` to each input |
| Scrollbar hidden globally | Low | Use container-level scrollbar hiding |
| Inconsistent button styles across pages | Low | Unify button variants (filled, outline, arrow) |
| Card borders `#262626` on `#141414` — contrast 1.5:1 | Low | Lighten border color |
| Footer particle burst not keyboard accessible | Low | Always decorative; document as known limitation |

### 🏗️ Architecture / Build

| Issue | Priority | Notes |
|---|---|---|
| No API routes directory | — | By design (static portfolio) |
| No middleware | — | By design (no auth, redirects, or i18n needed) |
| No tests configured | Medium | No Jest, Playwright, or Vitest setup |
| No `.env.example` | Low | Should document expected env vars (none currently) |

### 📝 State of Each Page

| Page | Content State | Animation State | Responsive State | Accessibility State |
|---|---|---|---|---|
| **Home** | Complete | Complete | ⚠️ Narrow screens | ⚠️ Missing poster |
| **About** | Complete | Complete | ✅ OK | ⚠️ No heading hierarchy |
| **Work** | ❌ Placeholder | Complete | ✅ OK | ⚠️ No heading hierarchy |
| **Services** | Complete | Complete | ✅ OK | ⚠️ Card border contrast |
| **Process** | Complete | Complete | ⚠️ No responsive behavior | ⚠️ No heading hierarchy |
| **Contact** | ⚠️ Form only | Complete | ✅ OK | ❌ Missing labels, validation |
| **404** | Complete | N/A | ✅ OK | ✅ OK |
| **Error** | Complete | N/A | ✅ OK | ✅ OK |

---

*README regenerated from full codebase analysis. All statements confirmed against source files. Last updated: 2026-06-04.*
