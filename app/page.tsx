"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import Link from "next/link";
import { GooeyText } from "@/components/ui/GooeyText";
import { springs, motionTokens } from "@/lib/motion-tokens";

export default function Home() {
  const reduced = useReducedMotion();
  const prefersReduced = reduced === undefined ? false : reduced;

  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        const chars = titleRef.current.children;
        if (chars.length) {
          gsap.set(chars, { y: 40, opacity: 0 });
          gsap.to(chars, {
            y: 0,
            opacity: 1,
            stagger: 0.03,
            duration: 0.8,
            ease: "power4.out",
          });
        }
      }

      if (bioRef.current) {
        gsap.set(bioRef.current, { y: 20, opacity: 0 });
        gsap.to(bioRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.5,
        });
      }
    });

    return () => ctx.revert();
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) return;

    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <main
      className="relative h-screen w-full bg-black overflow-hidden"
      id="home-main"
    >
      <section
        id="hero-section"
        className="relative h-screen w-full overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/background.mp4" type="video/mp4" />
          <source src="/assets/background.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex flex-col items-center pt-[8vh] md:pt-[6vh]">
          <div id="hero-container" className="relative flex h-full w-full flex-col justify-between">
            <div id="hero-container-item1" className="w-full">
              <h1
                ref={titleRef}
                className="font-anton text-red text-[clamp(4rem,18vw,12rem)] md:text-[clamp(8rem,14vw,18rem)] tracking-[-0.02em] leading-none text-center select-none px-4 text-balance"
              >
                {"ABHISHEK PANDEY".split("").map((char, i) => (
                  <span key={i} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
            </div>

            <div className="flex-1 min-h-0" />

            <div id="hero-container-item2" className="w-full pb-8 md:pb-12 px-6 md:px-12">
              <div className="mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 md:gap-12">
                  <div id="container-item2-box1" ref={bioRef} className="max-w-xs w-full md:w-auto">
                    <p className="text-sm md:text-base text-white/70 leading-relaxed">
                      Full-stack developer &amp; creative engineer. I build
                      performant digital experiences — from scalable backends to
                      pixel-perfect interfaces.
                    </p>
                  </div>

                  <div id="container-item2-box2" className="self-end md:self-auto w-full md:w-auto">
                    <GooeyText
                      texts={[
                        "Full stack developer",
                        "UI UX designer",
                        "Shopify & Wordpress expert",
                        "Creative developer",
                      ]}
                      morphTime={1}
                      cooldownTime={0.25}
                      className="font-bold w-full"
                      textClassName="text-white font-bold whitespace-nowrap text-[clamp(0.75rem,1.5vw,1.25rem)] md:text-[1.5rem] text-center md:text-right"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-8 md:mt-10">
                  <motion.div
                    initial={{ opacity: 0, y: motionTokens.distance.md }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springs.snappy, delay: 1.0 }}
                  >
                    <Link
                      href="/work"
                      className="group inline-flex items-center gap-3 rounded-full bg-[#D40000] px-8 py-3.5 text-[13px] font-semibold text-[#EFEEE8] tracking-wide uppercase transition-[transform,background-color,box-shadow] duration-200 ease-out hover:shadow-[0_0_35px_-8px_rgba(212,0,0,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Explore Work</span>
                      <span className="text-lg transition-transform duration-200 ease-out group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: motionTokens.distance.md }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springs.snappy, delay: 1.15 }}
                  >
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-3.5 text-[13px] font-semibold text-white/80 tracking-wide uppercase transition-[transform,background-color,border-color] duration-200 ease-out hover:bg-white/5 hover:border-white/40 hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <span>Contact</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
          initial={{ opacity: 1 }}
          animate={{ opacity: showScrollHint ? 1 : 0 }}
          transition={{ duration: motionTokens.duration.normal }}
        >
          <motion.span
            className="block text-white/30 text-lg"
            animate={
              prefersReduced ? { y: 0 } : { y: [0, 6, 0] }
            }
            transition={{
              duration: 2,
              repeat: showScrollHint ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            ↓
          </motion.span>
        </motion.div>
      </section>
    </main>
  );
}
