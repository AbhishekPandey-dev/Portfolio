"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { GooeyText } from "@/components/ui/GooeyText";
import { springs, motionTokens } from "@/lib/motion-tokens";

export default function Home() {
  const reduced = useReducedMotion();
  const prefersReduced = reduced === undefined ? false : reduced;
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <main
      className="relative min-h-[calc(100vh-10vh)] h-[calc(100dvh-10vh)] w-full overflow-hidden"
      id="home-main"
    >
      <section
        id="hero-section"
        aria-labelledby="hero-name"
        className="relative h-full w-full"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/background-poster.webp"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/background.mp4" type="video/mp4" />
          <source src="/assets/background.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col px-6 md:px-10 lg:px-[50px]">
          {/* ===== ITEM 1: Title banner (40% of hero height) ===== */}
          <div
            id="hero-container-item1"
            className="h-[40%] w-full"
          >
            <h1
              id="hero-name"
              className="h-full w-full font-anton text-red text-[clamp(3.5rem,18vw,16rem)] flex items-center justify-center gap-[15px] tracking-[-0.04em] leading-none select-none text-center text-balance whitespace-normal md:whitespace-nowrap"
            >
              <motion.span
                initial={hydrated ? { opacity: 0, x: prefersReduced ? 0 : -40 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: motionTokens.easing.smooth,
                }}
                className="inline-block"
              >
                ABHISHEK
              </motion.span>
              <motion.span
                initial={hydrated ? { opacity: 0, x: prefersReduced ? 0 : 40 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                  ease: motionTokens.easing.smooth,
                }}
                className="inline-block"
              >
                PANDEY
              </motion.span>
            </h1>
          </div>

          {/* ===== ITEM 2: Content row (50% of hero height) ===== */}
          <div
            id="hero-container-item2"
            className="h-[50%] w-full flex flex-row py-[5px] px-[10px]"
          >

            {/* ===== BOX 1: Bio + CTAs (50% width) ===== */}
            <div
              id="container-item2-box1"
              className="w-1/2 h-full flex flex-col gap-4 md:gap-6 pl-[20px]"
            >
              {/* Bio: 70% width × 40% height of box */}
              <motion.div
                initial={hydrated ? { opacity: 0, y: 15 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: motionTokens.easing.smooth,
                }}
                className="w-[70%] h-[50%] flex"
              >
                <p className="text-lg text-white/75 px-[10px] max-w-prose text-pretty">
                  I&apos;m a developer who thinks like a designer and a
                  designer who codes everything himself. I&apos;ve spent
                  years building websites, products, and stores that people
                  actually enjoy using. When I&apos;m not in front of a
                  screen, I&apos;m on my bike chasing long roads — same
                  restless energy, different medium.
                </p>
              </motion.div>

              {/* CTAs: 50% width × 20% height of box, in a row */}
              <motion.div
                initial={hydrated ? { opacity: 0, y: 15 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springs.snappy, delay: 0.7 }}
                className="w-1/2 h-[20%] flex flex-row items-center gap-[15px] py-[15px] px-[25px]"
              >
                <Link
                  href="/contact"
                  className="btn-sweep inline-flex items-center justify-center rounded-full bg-red text-white text-xs md:text-sm font-semibold uppercase tracking-wide transition-[transform,background-color,box-shadow] duration-200 ease-out hover:shadow-[0_0_35px_-8px_rgba(212,0,0,0.5)] hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap min-h-[44px] min-w-[100px] md:min-w-[120px]"
                  style={{ height: "40px", padding: "0 14px" }}
                >
                  Get In Touch
                </Link>

                <Link
                  href="/work"
                  className="btn-sweep inline-flex items-center justify-center rounded-full border border-white/20 text-white/80 text-xs md:text-sm font-semibold uppercase tracking-wide transition-[transform,background-color,border-color] duration-200 ease-out hover:bg-white/5 hover:border-white/40 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red focus-visible:ring-offset-2 focus-visible:ring-offset-black whitespace-nowrap min-h-[44px] min-w-[100px] md:min-w-[120px]"
                  style={{ height: "40px", padding: "0 14px" }}
                >
                  View Projects
                </Link>
              </motion.div>
            </div>

            {/* ===== BOX 2: Role label (50% width, right-aligned) ===== */}
            <div
              id="container-item2-box2"
              className="w-1/2 h-full flex justify-end items-start pr-[20px] pt-[20px]"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "clamp(300px, 42vw, 540px)",
                  height: "clamp(50px, 6vw, 70px)",
                }}
              >
                <GooeyText
                  texts={[
                    "Full stack developer",
                    "UI UX designer",
                    "Shopify & Wordpress expert",
                    "Creative developer",
                  ]}
                  morphTime={1}
                  cooldownTime={0.25}
                  className="!w-full !h-full !min-h-0 !overflow-visible"
                  textClassName="!text-[clamp(1.3rem,1.8vw,2rem)] !leading-[1.1] text-white font-bold whitespace-nowrap text-center px-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: showScrollHint ? 1 : 0 }}
          transition={{ duration: motionTokens.duration.normal }}
          aria-hidden="true"
        >
          <motion.span
            className="block text-white/50 text-lg"
            animate={prefersReduced ? { y: 0 } : { y: [0, 6, 0] }}
            transition={{
              duration: 2,
              repeat: prefersReduced || !showScrollHint ? 0 : Infinity,
              ease: motionTokens.easing.smooth,
            }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>
    </main>
  );
}
