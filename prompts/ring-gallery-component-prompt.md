# 🔵 Ring Gallery 3D Component — AI Agent Build Prompt

> **Purpose:** Use this document as a complete, copy-paste prompt for any AI coding agent (Claude Code, Cursor, GitHub Copilot, Aider, etc.) to recreate the **Ring Gallery** — a Three.js-powered interactive 3D image gallery with rotating rings, scroll/drag control, RGB shift, grain, vignette post-processing, and a cinematic entrance animation.

---

## ⚡ QUICK START PROMPT (Copy this entire block)

```
Build me a self-contained, single-page web application called "Ring Gallery".
It is a 3D interactive image gallery built with Three.js via the kokomi.js wrapper library.
The full implementation details, code, and structure are provided below. Reproduce it exactly.
```

---

## 📁 Project File Structure

```
ring-gallery/
├── index.html       ← Main HTML shell + Tailwind CDN
├── style.css        ← Custom styles (body, canvas, animation)
└── main.js          ← All Three.js / kokomi.js logic (ES module, CDN imports)
```

> **No build step required.** All dependencies are loaded via CDN using ES module imports (`esm.sh`).

---

## 🧩 DEPENDENCIES (CDN — no npm install needed)

| Library | CDN URL | Purpose |
|---|---|---|
| kokomi.js | `https://esm.sh/kokomi.js` | Three.js scene/postprocessing wrapper |
| three | `https://esm.sh/three` | 3D rendering engine |
| gsap | `https://esm.sh/gsap` | Entrance animation timeline |
| Tailwind CSS | `https://cdn.tailwindcss.com` | Utility CSS for overlay UI |
| Google Fonts (Inter) | `https://fonts.googleapis.com/css2?family=Inter` | Typography |

---

## 📄 FILE 1 — `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ring Gallery</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
      rel="stylesheet"
    />

    <!-- Custom styles -->
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>

    <!-- Three.js canvas mount point -->
    <div id="sketch"></div>

    <!-- Loader overlay — shown on page load, fades out when assets ready -->
    <div class="fixed z-5 top-0 left-0 loader-screen w-screen h-screen transition-all duration-300 bg-white">
      <div class="absolute hv-center">
        <div class="loading text-3xl tracking-widest whitespace-no-wrap">
          <span style="--i: 0">L</span>
          <span style="--i: 1">O</span>
          <span style="--i: 2">A</span>
          <span style="--i: 3">D</span>
          <span style="--i: 4">I</span>
          <span style="--i: 5">N</span>
          <span style="--i: 6">G</span>
        </div>
      </div>
    </div>

    <!-- Hero text overlay — fades in after entrance animation -->
    <div class="hero-dom opacity-0">
      <div class="absolute hv-center">
        <div class="flex flex-col items-center space-y-2 whitespace-no-wrap">
          <div class="text-8xl text-white">RING</div>
          <div class="text-xl" style="color: #8a8a8a;">Just drag and scroll~</div>
        </div>
      </div>
    </div>

    <!-- JS entry point (ES module) -->
    <script type="module" src="main.js"></script>
  </body>
</html>
```

---

## 🎨 FILE 2 — `style.css`

```css
/* Reset & base */
body {
  margin: 0;
  overflow: hidden;
  background: black;
  font-family: "Inter", sans-serif;
}

/* Three.js canvas container — full viewport */
#sketch {
  width: 100vw;
  height: 100vh;
  background: black;
}

/* Tailwind helper: absolute centering utility used in HTML */
.hv-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Loading text animation — each letter blurs in sequence using CSS custom property --i */
.loading span {
  animation: blur 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
}

@keyframes blur {
  to {
    filter: blur(5px);
  }
}
```

---

## ⚙️ FILE 3 — `main.js`

```js
// ─── Imports (all via esm.sh CDN — no bundler needed) ─────────────────────────
import * as kokomi from "https://esm.sh/kokomi.js";
import * as THREE from "https://esm.sh/three";
import gsap from "https://esm.sh/gsap";

// ─── Post-Processing Fragment Shader ──────────────────────────────────────────
// Applied to the entire scene as a screen-space fullscreen quad effect.
// Combines: RGB chromatic aberration shift, film grain, vignette darkening,
// and a circular wipe transition (sdCircle SDF).
const fragmentShader = /* glsl */ `
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;

uniform sampler2D tDiffuse;    // The rendered scene texture (passed by kokomi CustomEffect)

varying vec2 vUv;              // UV coordinates of the screen quad (0.0 to 1.0)

// Per-effect intensity uniforms (controlled from JS)
uniform vec3 uBgColor;                // Background/vignette dark color
uniform float uRGBShiftIntensity;     // Chromatic aberration strength (~0.0025)
uniform float uGrainIntensity;        // Film grain noise strength (~0.025)
uniform float uVignetteIntensity;     // Edge darkening strength (~0.8)
uniform float uTransitionProgress;   // 0→1 drives the circular reveal wipe

// ── Pseudo-random noise (high-precision) ──────────────────────────────────────
highp float random(vec2 co) {
  highp float a = 12.9898;
  highp float b = 78.233;
  highp float c = 43758.5453;
  highp float dt = dot(co.xy, vec2(a, b));
  highp float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}

// ── Film grain ────────────────────────────────────────────────────────────────
// Adds animated random noise to RGB channels
vec3 grain(vec2 uv, vec3 col, float amount) {
  float noise = random(uv + iTime);
  col += (noise - 0.5) * amount;
  return col;
}

// ── RGB Chromatic Aberration Shift ────────────────────────────────────────────
// Samples R, G, B channels at slightly different UV offsets to simulate lens
// color fringing. Offset direction is randomised per frame.
vec4 RGBShift(sampler2D tex, vec2 uv, float amount) {
  vec2 rUv = uv;
  vec2 gUv = uv;
  vec2 bUv = uv;
  float noise = random(uv + iTime) * 0.5 + 0.5;
  vec2 offset = amount * vec2(cos(noise), sin(noise));
  rUv += offset;
  gUv += offset * 0.5;
  bUv += offset * 0.25;
  vec4 rTex = texture(tex, rUv);
  vec4 gTex = texture(tex, gUv);
  vec4 bTex = texture(tex, bUv);
  return vec4(rTex.r, gTex.g, bTex.b, gTex.a);
}

// ── Vignette ──────────────────────────────────────────────────────────────────
// Darkens edges of screen by lerping towards vigColor based on distance from center.
vec3 vignette(vec2 uv, vec3 col, vec3 vigColor, float amount) {
  vec2 p = uv - 0.5;
  float d = length(p);
  float mask = smoothstep(0.5, 0.3, d);
  mask = pow(mask, 0.6);
  float mixFactor = (1.0 - mask) * amount;
  col = mix(col, vigColor, mixFactor);
  return col;
}

// ── SDF: Signed Distance Field for a Circle ───────────────────────────────────
float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

// ── Circular Wipe Transition ──────────────────────────────────────────────────
// progress 0→1: white covers screen → circle expands to reveal full scene
vec3 transition(vec2 uv, vec3 col, float progress) {
  float ratio = iResolution.x / iResolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;                            // Correct aspect ratio for circle
  float d = sdCircle(p, progress * sqrt(2.2));  // Expand radius with progress
  float c = smoothstep(-0.2, 0.0, d);
  col = mix(vec3(1.0), col, 1.0 - c);     // White outside circle, scene inside
  return col;
}

// ── Main ──────────────────────────────────────────────────────────────────────
void main() {
  vec2 uv = vUv;
  vec4 tex = RGBShift(tDiffuse, uv, uRGBShiftIntensity);
  vec3 col = tex.xyz;
  col = grain(uv, col, uGrainIntensity);
  col = vignette(uv, col, uBgColor, uVignetteIntensity);
  col = transition(uv, col, uTransitionProgress);
  gl_FragColor = vec4(col, 1.0);
}
`;

// ─── Main Sketch Class ────────────────────────────────────────────────────────
class Sketch extends kokomi.Base {
  create() {

    // ── Config ─────────────────────────────────────────────────────────────────
    const config = {
      bgColor: "#0c0c0c"   // Near-black background for dark cinema feel
    };

    // ── Mutable animation parameters (driven by GSAP) ──────────────────────────
    const params = {
      transitionProgress: 0,   // Controls circular wipe shader uniform (0→1)
      enterProgress: 0,        // Controls Z-depth fly-in of all image cards (0→1)
      rotateSpeed: 15          // Ring rotation speed multiplier (high=fast on entry)
    };

    // ── Renderer & Camera Setup ────────────────────────────────────────────────
    this.renderer.setClearColor(new THREE.Color(config.bgColor), 1);
    this.camera.position.set(0, 0, 16);   // Camera sits 16 units back on Z axis

    // ── Utility Helpers ────────────────────────────────────────────────────────
    // Triangle number formula: sum of 1..n = n(n+1)/2
    const sumFormula = (n) => (n * (n + 1)) / 2;
    const isOdd = (n) => n % 2 === 1;

    // ── Asset Configuration ────────────────────────────────────────────────────
    const circleCount = 3;              // Number of concentric rings
    const circleImgCountUnit = 12;      // Images per "unit" (scales with ring index)
    // Total images: 12 * (1 + 2 + 3) = 72 images across 3 rings
    const circleImgTotalCount = circleImgCountUnit * sumFormula(circleCount);

    // Build asset manifest for kokomi AssetManager
    // Uses picsum.photos for placeholder images (320×400 portrait cards)
    const resourceList = [...Array(circleImgTotalCount).keys()].map((_, i) => ({
      name: `tex${i + 1}`,
      type: "texture",
      path: `https://picsum.photos/id/${i + 1}/320/400`
    }));

    // ── Asset Loading ──────────────────────────────────────────────────────────
    const am = new kokomi.AssetManager(this, resourceList);

    am.on("ready", () => {

      // Hide loader overlay by adding the 'hollow' class (triggers CSS transition)
      document.querySelector(".loader-screen")?.classList.add("hollow");

      const material = new THREE.MeshBasicMaterial();

      const r = 6.4;      // Base orbital radius (ring 1 = 6.4, ring 2 = 12.8, ring 3 = 19.2)
      const scale = 0.8;  // Global image card scale factor

      // ── Build Rings ──────────────────────────────────────────────────────────
      // Each ring i contains (i+1)*circleImgCountUnit images arranged in a circle.
      // Ring 0: 12 images, radius 6.4
      // Ring 1: 24 images, radius 12.8  ← rotates opposite direction
      // Ring 2: 36 images, radius 19.2
      const rings = [];
      const lines = [];  // Each "line" is a spoke Group that rotates, holding one image card

      for (let i = 0; i < circleCount; i++) {
        const c1 = sumFormula(i) * circleImgCountUnit;
        const c2 = sumFormula(i + 1) * circleImgCountUnit;
        const textures = Object.values(am.items).slice(c1, c2);

        const ring = new THREE.Group();
        this.scene.add(ring);
        rings.push(ring);

        textures.map((tex, j) => {
          // Each image lives inside a "line" Group at the ring center,
          // rotated around Z to place the image at angle (j / count * 2π)
          const line = new THREE.Group();
          ring.add(line);
          lines.push(line);

          // Scale image card proportionally to texture dimensions
          const imgScale = 0.005 * scale * (i * 0.36 + 1);  // Larger cards for outer rings
          const width = tex.image.width * imgScale;
          const height = tex.image.height * imgScale;
          const geometry = new THREE.PlaneGeometry(width, height);

          // Clone base material, assign texture
          const mat = material.clone();
          mat.map = tex;
          mat.needsUpdate = true;

          const mesh = new THREE.Mesh(geometry, mat);

          // Place card at radius r*(i+1) along X axis
          const r2 = r * (i + 1);
          const ratio = j / (c2 - c1);
          const angle = ratio * Math.PI * 2;

          mesh.position.x = r2;                  // Push card outward
          mesh.rotation.z = -Math.PI / 2;        // Face the card outward (perpendicular to spoke)
          line.rotation.z = angle;               // Rotate spoke to evenly distribute around circle
          line.add(mesh);

          return mesh;
        });
      }

      // ── Post-Processing: Custom Shader Pass ──────────────────────────────────
      // kokomi.CustomEffect wraps the fragment shader into a EffectComposer pass
      const ce = new kokomi.CustomEffect(this, {
        fragmentShader,
        uniforms: {
          uBgColor: { value: new THREE.Color(config.bgColor) },
          uRGBShiftIntensity: { value: 0.0025 },   // Subtle chromatic aberration
          uGrainIntensity: { value: 0.025 },        // Light film grain
          uVignetteIntensity: { value: 0.8 },       // Strong edge vignette
          uTransitionProgress: { value: 0 }         // Starts at 0 (white screen)
        }
      });
      ce.addExisting();
      this.ce = ce;

      // ── Scroll & Drag Interaction ────────────────────────────────────────────
      // kokomi.WheelScroller provides smoothed scroll delta (inertia)
      const wheelScroller = new kokomi.WheelScroller();
      wheelScroller.listenForScroll();

      // kokomi.DragDetecter converts pointer drag into scroll-equivalent deltas
      const dragDetecter = new kokomi.DragDetecter(this);
      dragDetecter.detectDrag();
      dragDetecter.on("drag", (delta) => {
        wheelScroller.scroll.target -= (delta.x || delta.y) * 2;
      });

      // ── Per-Frame Update Loop ────────────────────────────────────────────────
      this.update(() => {
        wheelScroller.syncScroll();

        // Rotate each ring; odd rings rotate opposite to even rings.
        // Scroll delta temporarily boosts rotation speed.
        rings.forEach((ring, i) => {
          ring.rotation.z +=
            0.0025 *
            (isOdd(i) ? -1 : 1) *
            (1 + wheelScroller.scroll.delta) *
            params.rotateSpeed;
        });

        // Fly-in: image cards start deep in Z (-100 offset) and lerp to Z=0
        // Scroll also pushes cards away (depth parallax on scroll)
        lines.forEach((line) => {
          line.position.z =
            -THREE.MathUtils.lerp(
              0,
              100,
              THREE.MathUtils.mapLinear(
                wheelScroller.scroll.delta,
                0,
                1000,
                0,
                1
              )
            ) + THREE.MathUtils.lerp(10, 0, params.enterProgress);
        });

        // Sync transition shader uniform
        this.ce.customPass.material.uniforms.uTransitionProgress.value =
          params.transitionProgress;
      });

      // ── Entrance Animation (GSAP Timeline) ──────────────────────────────────
      // Sequence:
      // 1. Circular wipe reveals the scene (white→transparent ring expands)
      // 2. Simultaneously: cards fly in from depth + rotation slows to normal
      // 3. Hero text overlay fades in
      const anime = () => {
        const t1 = gsap.timeline();

        t1
          // Step 1: expand circular wipe from 0 → 1 (1 second)
          .to(params, {
            transitionProgress: 1,
            duration: 1,
            ease: "power1.inOut"
          })
          // Step 2: fly-in + slowdown (overlaps by 1s with step 1)
          .fromTo(
            params,
            { enterProgress: 0, rotateSpeed: 10 },
            { enterProgress: 1, rotateSpeed: 1, duration: 1.5, ease: "power1.inOut" },
            "-=1"
          )
          // Step 3: fade in hero text (overlaps by 1s)
          .to(".hero-dom", { opacity: 1 }, "-=1");
      };

      anime();
    });
  }
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────
const sketch = new Sketch("#sketch");
sketch.create();
```

---

## 🧠 COMPONENT ARCHITECTURE — How It Works

### Scene Graph

```
THREE.Scene
└── Group (ring 0 — rotates CW)
│   ├── Group (line/spoke 0)  → Mesh (image card, r=6.4)
│   ├── Group (line/spoke 1)  → Mesh (image card, r=6.4)
│   └── ... (12 total)
├── Group (ring 1 — rotates CCW)
│   └── ... (24 total, r=12.8)
└── Group (ring 2 — rotates CW)
    └── ... (36 total, r=19.2)
```

### Post-Processing Pipeline

```
Rendered Scene → RGBShift → Grain → Vignette → Transition Wipe → Screen
```

### Interaction Flow

```
Mouse Wheel / Touch Drag
     ↓
WheelScroller (smoothed delta + target)
     ↓
Per-frame: rings.rotation.z   — speed boost on scroll
           lines.position.z   — depth parallax on scroll
```

### Entrance Timeline (GSAP)

```
t=0.0s  Circular wipe starts expanding (white → reveals scene)
t=0.5s  Cards begin flying in from Z=-10 → Z=0
t=0.5s  Rotation speed decelerates: 10x → 1x
t=1.0s  Hero text "RING" fades in
t=1.5s  All animations complete
```

---

## 🎛️ CUSTOMISATION REFERENCE

| Parameter | Location | Default | Effect |
|---|---|---|---|
| `circleCount` | `main.js` | `3` | Number of concentric rings |
| `circleImgCountUnit` | `main.js` | `12` | Images per ring unit (ring i has `(i+1)*12`) |
| `r` | `main.js` | `6.4` | Base orbital radius of ring 1 |
| `scale` | `main.js` | `0.8` | Global card scale factor |
| `config.bgColor` | `main.js` | `"#0c0c0c"` | Background + vignette color |
| `uRGBShiftIntensity` | `main.js` | `0.0025` | Chromatic aberration strength |
| `uGrainIntensity` | `main.js` | `0.025` | Film grain strength |
| `uVignetteIntensity` | `main.js` | `0.8` | Edge darkening strength |
| Image source | `main.js` (resourceList) | picsum.photos | Replace with your own image URLs |
| Camera Z position | `main.js` | `16` | Distance from rings — higher = zoomed out |

### Replacing Images

Change the `path` in `resourceList` to your own images:

```js
// Current (placeholder):
path: `https://picsum.photos/id/${i + 1}/320/400`

// Example — your own images array:
const myImages = ["./img/photo1.jpg", "./img/photo2.jpg", ...];
path: myImages[i % myImages.length]
```

Make sure you have at least `circleImgCountUnit * sumFormula(circleCount)` = **72 images** (or fewer with wrapping as shown above).

---

## 🤖 PROMPT FOR AI AGENT

Paste the following block directly into Claude Code, Cursor, or any AI coding agent:

---

```
Build a self-contained Three.js ring gallery web app. No build tools, no npm install — 
everything loaded via CDN using ES module imports from esm.sh.

Create three files: index.html, style.css, main.js.

== index.html ==
- Load Tailwind CSS via CDN script tag
- Load Inter font from Google Fonts
- Mount point: <div id="sketch"></div>
- Loader overlay: div.loader-screen (fixed, full screen, white bg, z-index 5)
  - Contains animated "LOADING" text using .loading span elements with CSS --i variables
  - Hidden when assets load by adding class "hollow" (handled in JS)
- Hero text overlay: div.hero-dom (opacity-0 initially, faded in by GSAP)
  - Contains large "RING" text (text-8xl, white) and subtitle "Just drag and scroll~"
- Load main.js as type="module"

== style.css ==
- body: margin 0, overflow hidden, background black, font Inter
- #sketch: width 100vw, height 100vh, background black
- .hv-center: absolute + transform translate(-50%, -50%) centering utility
- .loading span: animation "blur" at delay calc(var(--i)/5*1s), alternate infinite
- @keyframes blur: to { filter: blur(5px) }

== main.js ==
Import kokomi.js, three, gsap from esm.sh.

Write a GLSL fragment shader string (fragmentShader) with these uniforms:
  iTime, iResolution, iMouse, tDiffuse, uBgColor, uRGBShiftIntensity, 
  uGrainIntensity, uVignetteIntensity, uTransitionProgress
And these effects in order in main():
  1. RGBShift(): samples R/G/B at offset UVs (random angle from noise, scaled offsets)
  2. grain(): adds (noise-0.5)*amount to RGB
  3. vignette(): smoothstep mask from edges, mix col with uBgColor
  4. transition(): circular SDF wipe — sdCircle expands with uTransitionProgress, 
     mixes white outside circle into scene color

Create class Sketch extends kokomi.Base with create() method:
  - renderer setClearColor #0c0c0c
  - camera at (0,0,16)
  - params object: { transitionProgress:0, enterProgress:0, rotateSpeed:15 }
  - circleCount=3, circleImgCountUnit=12, total=circleImgCountUnit*sumFormula(circleCount)
  - resourceList: array of {name, type:"texture", path} loading from picsum.photos/id/N/320/400
  - Use kokomi.AssetManager to load all textures
  - On "ready":
    - Add class "hollow" to .loader-screen
    - For each ring i (0..circleCount-1):
      - Create THREE.Group "ring", add to scene, push to rings[]
      - Slice textures for this ring from am.items
      - For each texture j:
        - Create THREE.Group "line", add to ring, push to lines[]
        - PlaneGeometry: width/height = tex dimensions * 0.005 * 0.8 * (i*0.36+1)
        - MeshBasicMaterial with tex as map
        - mesh.position.x = 6.4*(i+1)
        - mesh.rotation.z = -PI/2
        - line.rotation.z = (j/count)*2*PI
        - line.add(mesh)
    - Create kokomi.CustomEffect with the fragmentShader and uniforms
    - kokomi.WheelScroller: listenForScroll()
    - kokomi.DragDetecter: detectDrag(), on "drag" subtract (delta.x||delta.y)*2 from scroll.target
    - this.update(() => {
        wheelScroller.syncScroll()
        rings: rotation.z += 0.0025 * (isOdd(i)?-1:1) * (1+scroll.delta) * params.rotateSpeed
        lines: position.z = -lerp(0,100,mapLinear(scroll.delta,0,1000,0,1)) + lerp(10,0,params.enterProgress)
        sync uTransitionProgress uniform
      })
    - GSAP timeline:
        t1.to(params, {transitionProgress:1, duration:1, ease:"power1.inOut"})
          .fromTo(params, {enterProgress:0,rotateSpeed:10}, {enterProgress:1,rotateSpeed:1, duration:1.5, ease:"power1.inOut"}, "-=1")
          .to(".hero-dom", {opacity:1}, "-=1")

Instantiate: new Sketch("#sketch").create()
```

---

## ✅ CHECKLIST FOR AI AGENTS

- [ ] `main.js` uses `type="module"` in script tag
- [ ] Fragment shader is a template literal tagged with `/* glsl */`
- [ ] `RGBShift` shifts R, G, B at separate UV offsets (full, half, quarter)
- [ ] `transition()` uses `sdCircle` SDF and `smoothstep(-0.2, 0.0, d)` for soft edge
- [ ] Rings alternate rotation direction via `isOdd(i) ? -1 : 1`
- [ ] Image cards scaled proportionally: `0.005 * scale * (i * 0.36 + 1)`
- [ ] `enterProgress` drives `lerp(10, 0, ...)` Z offset (cards fly in from depth)
- [ ] GSAP timeline overlaps steps with `"-=1"` position offset
- [ ] Loader hidden via `.classList.add("hollow")` not `.remove("loader-screen")`
- [ ] Post-processing added via `ce.addExisting()` after construction

---

*Generated for Ring Gallery component — Three.js + kokomi.js + GSAP*
