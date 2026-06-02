export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
    crawl: 1.0,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1],
    sharp: [0.4, 0, 0.2, 1],
    snap: [0.2, 0.8, 0.2, 1],
    bounce: [0.34, 1.56, 0.64, 1],
    linear: [0, 0, 1, 1],
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  scale: {
    subtle: 0.98,
    press: 0.95,
    pop: 1.05,
  },
} as const;

export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 120, damping: 14 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 10 },
  instant: { type: "spring" as const, stiffness: 600, damping: 35 },
  release: {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
    restDelta: 0.001,
  },
} as const;

export const gsapEasings = {
  smooth: "power3.out",
  sharp: "power2.inOut",
  snappy: "power4.inOut",
  snappyOut: "power4.out",
  bounce: "back.out(1.5)",
  linear: "none",
  easeIn: "power2.in",
  easeOut: "power2.out",
} as const;

export type MotionTokens = typeof motionTokens;
export type Spring = (typeof springs)[keyof typeof springs];
export type GsapEasing = (typeof gsapEasings)[keyof typeof gsapEasings];
