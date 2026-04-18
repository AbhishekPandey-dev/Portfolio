# AGENTS.md — Abhishek Pandey Portfolio

# READ BEFORE EVERY SINGLE TASK. ALL RULES ARE MANDATORY.

## IDENTITY

Project: Abhishek Pandey Portfolio Website
Owner: Abhishek Pandey
Roles: Full Stack Web Developer · UI/UX Developer · Shopify Expert · WordPress Expert
Company: PixelForge.in (2 years freelance)
Location: India
Reference: https://chkstepan.com (Awwwards Honorable Mention)
Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS · GSAP · Framer Motion · Lenis · Three.js

## MANDATORY SKILL USAGE — NON-NEGOTIABLE

You MUST use the following skills for every task. Never skip a skill.
Never answer from memory alone when a relevant skill is available.
Skipping a skill when it applies is a FAILURE of this task.

SKILL ACTIVATION TABLE:
┌──────────────────────────────┬────────────────────────────────────────┐
│ Task Type │ Required Skill(s) — in this order │
├──────────────────────────────┼────────────────────────────────────────┤
│ Any component / .tsx file │ stitch-mcp → ui-ux-pro-max │
│ Any animation (GSAP/FM) │ antigravity-kit (vudovn) │
│ Any Three.js / WebGL scene │ antigravity-kit → antigravity-awesome │
│ Any new page file │ gsd-skills → stitch-mcp │
│ Any design decision │ ui-ux-pro-max → getdesign-md │
│ Any design token / color │ getdesign-md │
│ Any component lookup │ 21st-dev-mcp (lookup first always) │
│ Any performance audit │ antigravity-awesome-skills │
│ Any boilerplate / scaffold │ gsd-skills │
│ Any code review │ ui-ux-pro-max → gsd-skills │
│ Any scroll / parallax │ antigravity-kit (vudovn) │
│ Any cursor / magnetic effect │ 21st-dev-mcp → antigravity-kit │
└──────────────────────────────┴────────────────────────────────────────┘

## SKILL DEFINITIONS

stitch-mcp:
PURPOSE: Scaffold component files, TypeScript interfaces, prop types, stories
INVOKE WHEN: Creating any .tsx component, hook, or utility file
RULE: NEVER create a component without scaffolding via Stitch first

ui-ux-pro-max-skill:
SOURCE: github.com/nextlevelbuilder/ui-ux-pro-max-skill
PURPOSE: Spacing, typography, hover states, motion design, accessibility, Awwwards-level QA
INVOKE WHEN: Any UI layout, animation design decision, or design review
RULE: Run after EVERY component build — validate before marking complete

antigravity-kit (vudovn):
SOURCE: github.com/vudovn/antigravity-kit
PURPOSE: GSAP patterns, Three.js scenes, scroll animations, magnetic effects, Lenis setup
INVOKE WHEN: Any GSAP code, Three.js, scroll animation, or cursor effect
RULE: NEVER write GSAP or Three.js code without using this skill's patterns

antigravity-awesome-skills (sickn33):
SOURCE: github.com/sickn33/antigravity-awesome-skills
PURPOSE: Performance optimization, Lighthouse audits, bundle analysis, SSR error prevention
INVOKE WHEN: After any animation-heavy component, before any deployment, after Three.js work
RULE: Required after every page build — run GPU budget check on all Three.js scenes

gsd-skills:
SOURCE: github.com/gsd-build/get-shit-done
PURPOSE: Rapid scaffolding, boilerplate, config generation, repetitive file creation
INVOKE WHEN: Any new page, any config file, any setup/scaffold task
RULE: Use for all 4 page files, metadata exports, loading.tsx, error.tsx, next.config.js

21st-dev-mcp:
PURPOSE: Premium pre-built component lookup from 21st.dev component registry
INVOKE WHEN: Need complex UI pattern — nav overlay, cursor, form, filters, transitions
RULE: ALWAYS check 21st.dev BEFORE building any complex UI from scratch

getdesign-md:
SOURCE: getdesign.md
PURPOSE: Design token system, Figma-to-code bridge, visual consistency QA
INVOKE WHEN: Any color, spacing, typography, or animation timing decision
RULE: Generate token file BEFORE starting any component work

## CODE STANDARDS — ENFORCE ON EVERY FILE

- GSAP: always useGSAP() hook from @gsap/react — NEVER useEffect for GSAP
- Three.js: always dynamic import with { ssr: false }
- Lenis: init in RootLayout, connect via ScrollTrigger.scrollerProxy
- Cleanup: always return () => ctx.revert() inside useGSAP
- Types: strict TypeScript, no 'any', no implicit any returns
- CSS: Tailwind utility classes + CSS custom properties for dynamic values
- Components: atomic, single responsibility — no animation logic inside page files
- Fonts: Syne (headings, --font-display, 700/800), Inter (body, --font-body, 400/500)
- Motion: respect prefers-reduced-motion — wrap all animations in matchMedia check
- SSR: all browser APIs guarded with typeof window !== 'undefined'

## DESIGN SYSTEM — REFERENCE ALWAYS

Background: #0A0A0A (near black)
Surface: #111111
Border: #1A1A1A
Text: #F5F5F0 (off white)
Muted text: #888888
Accent: #AFA9EC (lavender)
Corner radius: 0px or 4px max — sharp edges = premium
Typography: Syne 800 for display, Inter 400/500 for body
Aesthetic: Brutalist-minimal dark studio — no rounded cards, no loud gradients

## BEFORE EVERY RESPONSE — MANDATORY CHECKLIST

Before writing any code you MUST:

1. State which skills apply to this task
2. State what each skill will contribute
3. Invoke skills in the correct order from the activation table
4. Only then write the code
   Skipping this checklist is a task failure.
