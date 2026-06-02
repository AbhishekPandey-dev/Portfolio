"use client";

import { motion } from "motion/react";
import ContactForm from "@/components/ui/ContactForm";
import { motionTokens } from "@/lib/motion-tokens";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: motionTokens.duration.slow, ease: motionTokens.easing.smooth }}
          className="font-anton text-red text-4xl md:text-7xl tracking-tight mb-8 text-balance"
        >
          CONTACT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth, delay: 0.15 }}
          className="text-white/50 text-lg mb-10"
        >
          Have a project in mind? Let&apos;s build something great together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth, delay: 0.25 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </main>
  );
}
