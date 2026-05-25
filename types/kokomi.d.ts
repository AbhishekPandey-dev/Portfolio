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
