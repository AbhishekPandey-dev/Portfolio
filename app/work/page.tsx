"use client";

import { motion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="font-anton text-red text-4xl md:text-7xl tracking-tight mb-12 text-balance"
        >
          WORK
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth },
                },
              }}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={springs.snappy}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#D40000]/40 hover:bg-white/[0.06]"
            >
              <div className="mb-4 aspect-[4/3] rounded-xl bg-white/5" />
              <h3 className="font-semibold text-white text-lg mb-2">Project {i}</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Description of the project and the technologies used to build it.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
