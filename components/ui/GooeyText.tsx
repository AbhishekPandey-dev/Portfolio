"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(containerRef, { amount: 0.25 });

  React.useEffect(() => {
    if (reducedMotion) return;
    if (!isInView) return;
    if (texts.length < 2) return;
    if (!text1Ref.current || !text2Ref.current) return;

    let rafId = 0;
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    t1.textContent = texts[textIndex % texts.length];
    t2.textContent = texts[(textIndex + 1) % texts.length];

    const setMorph = (fraction: number) => {
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

      const inv = 1 - fraction;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      t2.style.filter = "";
      t2.style.opacity = "100%";
      t1.style.filter = "";
      t1.style.opacity = "0%";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const tick = () => {
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          t1.textContent = texts[textIndex % texts.length];
          t2.textContent = texts[(textIndex + 1) % texts.length];
        }
        doMorph();
      } else {
        doCooldown();
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [texts, morphTime, cooldownTime, reducedMotion, isInView]);

  if (reducedMotion && texts[0]) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex min-h-[1.5em] items-center justify-center",
          className
        )}
      >
        <span
          className={cn(
            "inline-block select-none text-center font-bold leading-[1.1]",
            "text-[clamp(1.75rem,8vw,3.75rem)] md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        >
          {texts[0]}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min-h-[1.5em] overflow-hidden",
        className
      )}
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center font-bold leading-[1.1]",
            "text-[clamp(1.75rem,8vw,3.75rem)] md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center font-bold leading-[1.1]",
            "text-[clamp(1.75rem,8vw,3.75rem)] md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
