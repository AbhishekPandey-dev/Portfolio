"use client";

import { useState } from "react";
import { useReducedMotion as motionUseReducedMotion } from "motion/react";

type SafeMotionOptions = {
  defaultY?: number;
  defaultX?: number;
  defaultOpacity?: number;
  defaultScale?: number;
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  const connection =
    (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
  if (connection?.saveData) return true;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof mem === "number" && mem <= 2) return true;
  return false;
}

export function useMotionConfig() {
  const reduced = motionUseReducedMotion();
  const [lowEnd] = useState(() =>
    typeof window === "undefined" ? false : isLowEndDevice()
  );
  return {
    shouldAnimate: !reduced,
    prefersReduced: reduced,
    isLowEnd: lowEnd,
  };
}

export function useSafeMotion(options: SafeMotionOptions = {}) {
  const { defaultY = 16, defaultX = 0, defaultOpacity = 0, defaultScale = 1 } =
    options;
  const reduced = motionUseReducedMotion();

  if (reduced) {
    return {
      initial: false,
      animate: undefined,
      exit: undefined,
      whileInView: undefined,
      whileHover: undefined,
      whileTap: undefined,
      transition: { duration: 0 },
      prefersReduced: true,
    };
  }

  return {
    initial: { opacity: defaultOpacity, y: defaultY, x: defaultX, scale: defaultScale },
    animate: { opacity: 1, y: 0, x: 0, scale: 1 },
    exit: { opacity: defaultOpacity, y: defaultY, x: defaultX, scale: defaultScale },
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    prefersReduced: false,
  };
}

export type SafeMotionReturn = ReturnType<typeof useSafeMotion>;
