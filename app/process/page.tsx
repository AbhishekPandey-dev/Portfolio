"use client";

import { motion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";

const STEPS = [
  { number: "01", title: "Discovery", description: "Understanding your goals, audience, and requirements." },
  { number: "02", title: "Strategy", description: "Planning the architecture, tech stack, and timeline." },
  { number: "03", title: "Design", description: "Crafting wireframes and high-fidelity mockups." },
  { number: "04", title: "Development", description: "Building with clean code and regular check-ins." },
  { number: "05", title: "Launch", description: "Deployment, testing, and going live." },
  { number: "06", title: "Support", description: "Ongoing maintenance and optimization." },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="font-anton text-red text-4xl md:text-7xl tracking-tight mb-12 text-balance"
        >
          PROCESS
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="space-y-8"
        >
          {STEPS.map((step) => (
            <motion.div
              key={step.number}
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
              className="group flex items-start gap-6 border-l-2 border-white/10 pl-6 hover:border-[#D40000]"
            >
              <span className="font-anton text-3xl text-red shrink-0">{step.number}</span>
              <div>
                <h2 className="font-semibold text-white text-xl mb-1">{step.title}</h2>
                <p className="text-white/50 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
