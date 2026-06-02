"use client";

import { motion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";

const PARAGRAPHS = [
  "I'm Abhishek Pandey — a Full Stack Web Developer, UI/UX Designer, and Shopify & WordPress Engineer with 2.5+ years of experience building scalable, high-performance digital solutions.",
  "I specialize in crafting seamless user experiences that bridge design and technology. From custom Shopify stores to complex full-stack applications, I bring ideas to life with clean code and thoughtful design.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="font-anton text-red text-4xl md:text-7xl tracking-tight mb-8 text-balance"
        >
          ABOUT
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
          className="space-y-6 text-white/70 text-lg leading-relaxed"
        >
          {PARAGRAPHS.map((text, i) => (
            <motion.p
              key={i}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
                },
              }}
            >
              {text}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
