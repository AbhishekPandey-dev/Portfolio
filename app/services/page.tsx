"use client";

import { motion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";

const SERVICES = [
  {
    title: "Full Stack Development",
    description: "End-to-end web applications using modern frameworks and scalable architectures.",
  },
  {
    title: "Shopify Development",
    description: "Custom Shopify stores, theme development, and app integrations tailored to your brand.",
  },
  {
    title: "WordPress Engineering",
    description: "Custom WordPress themes, plugins, and headless CMS solutions.",
  },
  {
    title: "UI/UX Design",
    description: "User-centered design from wireframes to polished interfaces that convert.",
  },
];

export default function ServicesPage() {
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
          SERVICES
        </motion.h1>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="grid gap-6 md:grid-cols-2"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
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
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#D40000]/30"
            >
              <h2 className="font-semibold text-white text-xl mb-3">{service.title}</h2>
              <p className="text-white/50 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
