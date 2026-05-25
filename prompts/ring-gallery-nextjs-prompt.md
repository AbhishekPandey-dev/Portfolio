# 🔵 Ring Gallery — Next.js + TypeScript + Tailwind Prompt

> **Use this file** when your project is already a Next.js app with TypeScript and Tailwind configured.
> This is NOT the vanilla HTML/CSS/JS version — every adaptation for the Next.js environment is
> handled here. Hand this entire document to Claude Code, Cursor, or any AI agent.

---

## ⚠️ KEY DIFFERENCES FROM THE VANILLA VERSION

Before anything else, understand **why** the vanilla code cannot be dropped in as-is:

| Problem | Vanilla Version | Next.js Fix |
|---|---|---|
| `import` source | `esm.sh` CDN strings | npm packages installed locally |
| Canvas mount | `document.querySelector("#sketch")` at module root | `useRef<HTMLDivElement>` + `useEffect` |
| SSR crash | Code runs at build time on Node (no `window`, no `document`) | `dynamic(() => import(...), { ssr: false })` |
| Types | None (plain JS) | Full TypeScript types for Three.js, kokomi, GSAP |
| CSS | Global `style.css` | Tailwind classes + `globals.css` additions |
| CDN Tailwind | `<script src="cdn.tailwindcss.com">` | Already in your project — remove CDN tag |
| File placement | `index.html` + `main.js` | `components/RingGallery/` folder |

---

## 📦 STEP 1 — Install Dependencies

Run this in your Next.js project root:

```bash
npm install three gsap kokomi.js
npm install --save-dev @types/three
```

> **Note on kokomi.js types:** kokomi.js may not ship TypeScript declarations.
> If you get type errors, create `types/kokomi.d.ts` — the agent prompt below includes this.

---

## 📁 STEP 2 — File Structure to Create

```
your-nextjs-project/
├── components/
│   └── RingGallery/
│       ├── index.tsx              ← Default export, SSR-safe dynamic wrapper
│       ├── RingGalleryInner.tsx   ← Actual Three.js component (client only)
│       └── RingGallery.module.css ← Scoped styles (loader anim, canvas)
├── types/
│   └── kokomi.d.ts                ← Type shim if kokomi has no @types
└── app/ (or pages/)
    └── page.tsx                   ← Import and use <RingGallery /> here
```

---

## 🤖 FULL AGENT PROMPT — Paste this into Claude Code / Cursor

---

```
I am working in a Next.js 14+ project with TypeScript and Tailwind CSS already configured.

Create a RingGallery component that replicates the following Three.js ring gallery:
- 3 concentric rotating rings of image cards in 3D space
- Rings alternate rotation direction (odd rings CCW, even rings CW)
- Mouse wheel and touch drag controls (scroll = spin speed boost + depth parallax)
- Post-processing shader: RGB chromatic aberration, film grain, edge vignette
- Circular SDF wipe entrance transition (white screen → scene revealed)
- GSAP entrance timeline: wipe → cards fly in → hero text fades in

=== CRITICAL NEXT.JS RULES ===

1. The Three.js canvas component MUST be client-side only.
   Use dynamic import with ssr:false to wrap the inner component.
   Never access window, document, or the DOM at module scope.

2. All Three.js / kokomi / GSAP logic goes inside useEffect(() => { ... }, [])
   with a ref to the mount div. Clean up on unmount (destroy renderer, remove listeners).

3. Do NOT use CDN imports (no esm.sh URLs). Use npm packages:
   import * as THREE from 'three'
   import * as kokomi from 'kokomi.js'
   import gsap from 'gsap'

4. The component must be fully typed in TypeScript.
   If kokomi.js has no @types package, create types/kokomi.d.ts with minimal declarations.

5. CSS: use a CSS Module file for scoped styles. Do NOT add a CDN Tailwind script tag —
   it's already in the project. Use Tailwind classes for overlay UI (loader, hero text).

=== FILE 1: components/RingGallery/index.tsx ===

This is the SSR-safe public export. Use Next.js dynamic() to lazy-load the inner component:

```tsx
'use client'

import dynamic from 'next/dynamic'

const RingGalleryInner = dynamic(
  () => import('./RingGalleryInner'),
  {
    ssr: false,
    loading: () => (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white text-sm tracking-widest animate-pulse">LOADING</div>
      </div>
    ),
  }
)

export default function RingGallery() {
  return <RingGalleryInner />
}
```

=== FILE 2: components/RingGallery/RingGalleryInner.tsx ===

This is the actual Three.js component. Write it as a React functional component.
Mark it with 'use client' at the top. Structure:

```tsx
'use client'

import { useEffect, useRef } from 'react'
import styles from './RingGallery.module.css'

// Imports MUST be inside useEffect or at top level of the module
// (top-level is fine since this file is never imported server-side due to ssr:false)
import * as THREE from 'three'
import * as kokomi from 'kokomi.js'
import gsap from 'gsap'

// Fragment shader — identical GLSL to the original
const fragmentShader = `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform vec3 uBgColor;
uniform float uRGBShiftIntensity;
uniform float uGrainIntensity;
uniform float uVignetteIntensity;
uniform float uTransitionProgress;

highp float random(vec2 co) {
  highp float a = 12.9898;
  highp float b = 78.233;
  highp float c = 43758.5453;
  highp float dt = dot(co.xy, vec2(a, b));
  highp float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}

vec3 grain(vec2 uv, vec3 col, float amount) {
  float noise = random(uv + iTime);
  col += (noise - 0.5) * amount;
  return col;
}

vec4 RGBShift(sampler2D tex, vec2 uv, float amount) {
  vec2 rUv = uv; vec2 gUv = uv; vec2 bUv = uv;
  float noise = random(uv + iTime) * 0.5 + 0.5;
  vec2 offset = amount * vec2(cos(noise), sin(noise));
  rUv += offset; gUv += offset * 0.5; bUv += offset * 0.25;
  vec4 rTex = texture(tex, rUv);
  vec4 gTex = texture(tex, gUv);
  vec4 bTex = texture(tex, bUv);
  return vec4(rTex.r, gTex.g, bTex.b, gTex.a);
}

vec3 vignette(vec2 uv, vec3 col, vec3 vigColor, float amount) {
  vec2 p = uv - 0.5;
  float d = length(p);
  float mask = smoothstep(0.5, 0.3, d);
  mask = pow(mask, 0.6);
  float mixFactor = (1.0 - mask) * amount;
  col = mix(col, vigColor, mixFactor);
  return col;
}

float sdCircle(vec2 p, float r) { return length(p) - r; }

vec3 transition(vec2 uv, vec3 col, float progress) {
  float ratio = iResolution.x / iResolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;
  float d = sdCircle(p, progress * sqrt(2.2));
  float c = smoothstep(-0.2, 0.0, d);
  col = mix(vec3(1.0), col, 1.0 - c);
  return col;
}

void main() {
  vec2 uv = vUv;
  vec4 tex = RGBShift(tDiffuse, uv, uRGBShiftIntensity);
  vec3 col = tex.xyz;
  col = grain(uv, col, uGrainIntensity);
  col = vignette(uv, col, uBgColor, uVignetteIntensity);
  col = transition(uv, col, uTransitionProgress);
  gl_FragColor = vec4(col, 1.0);
}
`

export default function RingGalleryInner() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sketchRef = useRef<any>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // ── Prevent double-init in React StrictMode ───────────────────────────────
    if (sketchRef.current) return

    const BG_COLOR = '#0c0c0c'

    // ── Config & mutable params ───────────────────────────────────────────────
    const params = {
      transitionProgress: 0,
      enterProgress: 0,
      rotateSpeed: 15,
    }

    // ── Utility ───────────────────────────────────────────────────────────────
    const sumFormula = (n: number) => (n * (n + 1)) / 2
    const isOdd = (n: number) => n % 2 === 1

    // ── Sketch class ──────────────────────────────────────────────────────────
    class Sketch extends (kokomi as any).Base {
      create() {
        this.renderer.setClearColor(new THREE.Color(BG_COLOR), 1)
        this.camera.position.set(0, 0, 16)

        const circleCount = 3
        const circleImgCountUnit = 12
        const circleImgTotalCount = circleImgCountUnit * sumFormula(circleCount)

        const resourceList = [...Array(circleImgTotalCount).keys()].map((_, i) => ({
          name: `tex${i + 1}`,
          type: 'texture',
          path: `https://picsum.photos/id/${i + 1}/320/400`,
        }))

        const am = new (kokomi as any).AssetManager(this, resourceList)

        am.on('ready', () => {
          // Hide loader
          mountRef.current?.querySelector('[data-loader]')?.classList.add(styles.hollow)

          const material = new THREE.MeshBasicMaterial()
          const r = 6.4
          const scale = 0.8
          const rings: THREE.Group[] = []
          const lines: THREE.Group[] = []

          for (let i = 0; i < circleCount; i++) {
            const c1 = sumFormula(i) * circleImgCountUnit
            const c2 = sumFormula(i + 1) * circleImgCountUnit
            const textures = Object.values((am as any).items).slice(c1, c2) as THREE.Texture[]

            const ring = new THREE.Group()
            this.scene.add(ring)
            rings.push(ring)

            textures.forEach((tex, j) => {
              const line = new THREE.Group()
              ring.add(line)
              lines.push(line)

              const imgScale = 0.005 * scale * (i * 0.36 + 1)
              const width = tex.image.width * imgScale
              const height = tex.image.height * imgScale
              const geometry = new THREE.PlaneGeometry(width, height)
              const mat = material.clone()
              mat.map = tex
              mat.needsUpdate = true
              const mesh = new THREE.Mesh(geometry, mat)
              const r2 = r * (i + 1)
              const ratio = j / (c2 - c1)
              const angle = ratio * Math.PI * 2
              mesh.position.x = r2
              mesh.rotation.z = -Math.PI / 2
              line.rotation.z = angle
              line.add(mesh)
            })
          }

          const ce = new (kokomi as any).CustomEffect(this, {
            fragmentShader,
            uniforms: {
              uBgColor: { value: new THREE.Color(BG_COLOR) },
              uRGBShiftIntensity: { value: 0.0025 },
              uGrainIntensity: { value: 0.025 },
              uVignetteIntensity: { value: 0.8 },
              uTransitionProgress: { value: 0 },
            },
          })
          ce.addExisting()

          const wheelScroller = new (kokomi as any).WheelScroller()
          wheelScroller.listenForScroll()

          const dragDetecter = new (kokomi as any).DragDetecter(this)
          dragDetecter.detectDrag()
          dragDetecter.on('drag', (delta: { x: number; y: number }) => {
            wheelScroller.scroll.target -= (delta.x || delta.y) * 2
          })

          this.update(() => {
            wheelScroller.syncScroll()

            rings.forEach((ring, i) => {
              ring.rotation.z +=
                0.0025 *
                (isOdd(i) ? -1 : 1) *
                (1 + wheelScroller.scroll.delta) *
                params.rotateSpeed
            })

            lines.forEach((line) => {
              line.position.z =
                -THREE.MathUtils.lerp(
                  0,
                  100,
                  THREE.MathUtils.mapLinear(wheelScroller.scroll.delta, 0, 1000, 0, 1)
                ) + THREE.MathUtils.lerp(10, 0, params.enterProgress)
            })

            ce.customPass.material.uniforms.uTransitionProgress.value =
              params.transitionProgress
          })

          // GSAP entrance timeline
          const heroEl = mountRef.current?.querySelector('[data-hero]') as HTMLElement
          gsap
            .timeline()
            .to(params, { transitionProgress: 1, duration: 1, ease: 'power1.inOut' })
            .fromTo(
              params,
              { enterProgress: 0, rotateSpeed: 10 },
              { enterProgress: 1, rotateSpeed: 1, duration: 1.5, ease: 'power1.inOut' },
              '-=1'
            )
            .to(heroEl, { opacity: 1 }, '-=1')
        })
      }
    }

    // ── Mount sketch to the ref div ───────────────────────────────────────────
    const sketch = new Sketch(mountRef.current)
    sketch.create()
    sketchRef.current = sketch

    // ── Cleanup on unmount ────────────────────────────────────────────────────
    return () => {
      if (sketchRef.current) {
        // kokomi.Base exposes renderer; dispose it
        try {
          sketchRef.current.renderer?.dispose()
          sketchRef.current.renderer?.domElement?.remove()
        } catch (e) {
          // silently ignore cleanup errors
        }
        sketchRef.current = null
      }
    }
  }, [])

  return (
    <div ref={mountRef} className="relative w-screen h-screen overflow-hidden bg-black">

      {/* Three.js canvas mounts here automatically via kokomi */}

      {/* Loader overlay */}
      <div
        data-loader
        className={`${styles.loaderScreen} fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-300`}
      >
        <div className={styles.loading}>
          {'LOADING'.split('').map((char, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Hero text overlay */}
      <div
        data-hero
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2 select-none">
          <div className="text-8xl font-bold text-white tracking-widest">RING</div>
          <div className="text-xl" style={{ color: '#8a8a8a' }}>
            Just drag and scroll~
          </div>
        </div>
      </div>

    </div>
  )
}
```

=== FILE 3: components/RingGallery/RingGallery.module.css ===

```css
/* Loader: visible by default, hidden when .hollow is added via JS */
.loaderScreen {
  opacity: 1;
  pointer-events: all;
}

.loaderScreen.hollow {
  opacity: 0;
  pointer-events: none;
}

/* Animated loading text — each letter blurs using CSS custom property --i */
.loading {
  font-size: 1.875rem;  /* text-3xl */
  letter-spacing: 0.25em;
  display: flex;
  gap: 0.1em;
}

.loading span {
  animation: blurIn 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
}

@keyframes blurIn {
  to {
    filter: blur(5px);
  }
}
```

=== FILE 4: types/kokomi.d.ts (create this if kokomi has no TypeScript types) ===

```ts
declare module 'kokomi.js' {
  import * as THREE from 'three'

  export class Base {
    renderer: THREE.WebGLRenderer
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    constructor(el: HTMLElement | string)
    create(): void
    update(fn: () => void): void
  }

  export class AssetManager {
    items: Record<string, THREE.Texture>
    constructor(base: Base, list: Array<{ name: string; type: string; path: string }>)
    on(event: 'ready', cb: () => void): void
  }

  export class CustomEffect {
    customPass: {
      material: {
        uniforms: Record<string, { value: unknown }>
      }
    }
    constructor(base: Base, options: { fragmentShader: string; uniforms: Record<string, { value: unknown }> })
    addExisting(): void
  }

  export class WheelScroller {
    scroll: { target: number; current: number; delta: number }
    listenForScroll(): void
    syncScroll(): void
  }

  export class DragDetecter {
    constructor(base: Base)
    detectDrag(): void
    on(event: 'drag', cb: (delta: { x: number; y: number }) => void): void
  }
}
```

=== FILE 5: Usage in app/page.tsx or any page ===

```tsx
import RingGallery from '@/components/RingGallery'

export default function Home() {
  return (
    <main>
      <RingGallery />
    </main>
  )
}
```

=== IMPORTANT AGENT INSTRUCTIONS ===

1. The kokomi.Base constructor accepts EITHER a CSS selector string "#sketch" OR a direct
   HTMLElement reference. Pass mountRef.current directly — do NOT use document.getElementById.

2. Do NOT call sketch.create() or any Three.js code outside of useEffect.
   SSR will crash if you do. The ssr:false dynamic import is a safety net, not a free pass.

3. React StrictMode in Next.js runs useEffect twice in development. Guard against double-init
   using the sketchRef.current check shown above.

4. GSAP's .to(element, ...) call should target the actual DOM element via ref or
   data attribute querySelector — do NOT use CSS class selectors like '.hero-dom'
   because Next.js CSS Modules scope class names.

5. kokomi automatically appends its canvas to the element you pass it.
   Make sure mountRef.current exists (the null check) before constructing Sketch.

6. The cleanup function in useEffect MUST dispose the renderer to prevent GPU memory
   leaks and the "canvas already in use" WebGL error on hot reload.

7. If you see "kokomi is not a constructor" or similar errors, it means the import
   ran on the server. Verify ssr:false is set on the dynamic import.
```

---

## 🔍 COMMON ERRORS & FIXES

| Error | Cause | Fix |
|---|---|---|
| `window is not defined` | Three.js imported at module scope during SSR | Ensure `ssr: false` on dynamic import |
| `Cannot read properties of null (reading 'current')` | useEffect ran before mount | Add `if (!mountRef.current) return` guard |
| `WebGL context lost` | Sketch created twice (StrictMode) | Add `if (sketchRef.current) return` guard |
| `kokomi is not defined` | Import outside useEffect + SSR | Move import to top of client-only file with `ssr:false` |
| CSS class not applying | Using `.hero-dom` selector with CSS Modules | Switch to `data-hero` attribute + `querySelector('[data-hero]')` |
| `canvas already in use` | Old sketch not cleaned up on hot reload | Add renderer dispose in useEffect cleanup return |
| Types missing for kokomi | No `@types/kokomi` package | Create `types/kokomi.d.ts` as shown above |
| `gsap.to('.hero-dom')` not working | CSS Modules renames class | Target element via ref or `mountRef.current.querySelector('[data-hero]')` |

---

## ✅ AGENT CHECKLIST

- [ ] `components/RingGallery/index.tsx` uses `dynamic(..., { ssr: false })`
- [ ] `RingGalleryInner.tsx` has `'use client'` at top
- [ ] All Three.js code is inside `useEffect`
- [ ] `mountRef.current` null-check before `new Sketch(...)`
- [ ] `sketchRef.current` guard prevents double-init in StrictMode
- [ ] Cleanup returns `renderer.dispose()` + `domElement.remove()`
- [ ] GSAP targets DOM element via `querySelector('[data-hero]')`, not CSS class
- [ ] Loader hidden via CSS Module class `.hollow` not inline style toggle
- [ ] `types/kokomi.d.ts` created if `@types/kokomi` does not exist
- [ ] `npm install three gsap kokomi.js` + `npm install -D @types/three` done

---

*Ring Gallery — Next.js 14 + TypeScript + Tailwind adaptation*
