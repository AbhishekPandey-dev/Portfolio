'use client'

import { useEffect, useRef } from 'react'
import styles from './RingGallery.module.css'

// Imports are safe at top-level here since this component is dynamic-loaded with ssr:false
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

type RingGalleryInnerProps = {
  className?: string
}

export default function RingGalleryInner({ className }: RingGalleryInnerProps) {
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

        const iconFiles = [
          "ANGULAR.png", "BOOTSTRAP.png", "FIREBASE.png", "GIT.png", "GITHUB.png",
          "HTML5.png", "JAVA.png", "JAVASCRIPT.png", "JQUERY.png", "MONGO DB.png",
          "NEST JS.png", "NODE JS.png", "NPM.png", "PHP.png", "PRETTIER.png",
          "PYTHON.png", "REACT.png", "REDIS.png", "REDUX.png", "RUBY.png",
          "SAAS.png", "SHOPIFY.png", "STACK OVERFLOW.png", "STRIPE.png", "TAILWIND.png",
          "TYPESCRIPT.png", "VUE JS.png", "WORDPRESS.png"
        ]

        for (let i = iconFiles.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [iconFiles[i], iconFiles[j]] = [iconFiles[j], iconFiles[i]];
        }

        const circleCount = 3
        const circleImgCountUnit = 9
        const circleImgTotalCount = circleImgCountUnit * sumFormula(circleCount)

        const resourceList = [...Array(circleImgTotalCount).keys()].map((_, i) => ({
          name: `tex${i + 1}`,
          type: 'texture',
          path: `/assets/tech_icons/${iconFiles[i % iconFiles.length]}`,
        }))

        const am = new (kokomi as any).AssetManager(this, resourceList)

          am.on('ready', () => {
          const material = new THREE.MeshBasicMaterial({ transparent: true })
          const r = 6.4
          const scale = 0.8
          const rings: THREE.Group[] = []
          const lines: THREE.Group[] = []

          for (let i = 0; i < circleCount; i++) {
            const c1 = sumFormula(i) * circleImgCountUnit
            const c2 = sumFormula(i + 1) * circleImgCountUnit
            
            const textures: THREE.Texture[] = []
            for (let k = c1; k < c2; k++) {
              textures.push((am as any).items[`tex${k + 1}`])
            }

            const ring = new THREE.Group()
            this.scene.add(ring)
            rings.push(ring)

            textures.forEach((tex, j) => {
              const line = new THREE.Group()
              ring.add(line)
              lines.push(line)

              const image = tex.image as { width: number; height: number }
              const maxDim = Math.max(image.width, image.height) || 1
              const normalizedScale = 3.5 / maxDim
              const imgScale = normalizedScale * scale * (i * 0.36 + 1)
              const width = image.width * imgScale
              const height = image.height * imgScale
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
    const sketch = new Sketch()
    sketch.create()
    sketchRef.current = sketch

    // ── Explicit Canvas Mounting Fix ──────────────────────────────────────────
    // In React/Next.js environment, we must append the canvas element directly
    // to the React-managed container ref to ensure it sits inside the DOM tree.
    if (sketch.renderer?.domElement && mountRef.current) {
      mountRef.current.appendChild(sketch.renderer.domElement)
    }

    // ── Cleanup on unmount ────────────────────────────────────────────────────
    return () => {
      if (sketchRef.current) {
        try {
          sketchRef.current.renderer?.domElement?.remove()
          sketchRef.current.renderer?.dispose()
        } catch (e) {
          // silently ignore cleanup errors
        }
        sketchRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`relative w-full overflow-hidden bg-[#0c0c0c] ${className ?? 'h-screen'}`}
    >

      {/* Three.js canvas mounts here automatically via appendChild above */}

      {/* Hero text overlay */}
      <div
        data-hero
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2 select-none text-center px-4">
          <div className="text-6xl md:text-8xl font-bold text-white tracking-widest drop-shadow-lg">RING</div>
          <div className="text-lg md:text-xl font-medium tracking-wide" style={{ color: '#8a8a8a' }}>
            Just drag and scroll~
          </div>
        </div>
      </div>

    </div>
  )
}
