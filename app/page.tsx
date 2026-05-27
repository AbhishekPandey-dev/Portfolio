"use client";

import ClickSpark from "@/components/ClickSpark";
import Footer from "@/components/Footer";
import { DynamicIslandNav } from "@/components/DynamicIslandNav";

export default function Home() {
  return (
    <main
      className="relative h-screen w-screen min-h-screen bg-black overflow-x-hidden overflow-y-auto snap-y snap-mandatory scroll-smooth"
      id="home-main"
    >
      <section id="hero-section" className="relative h-screen w-full snap-start">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          {/* Premium Navigation Bar (Above background) */}
          <div className="relative z-10">
            <DynamicIslandNav />
          </div>
        </ClickSpark>
      </section>

      <section className="h-screen w-full snap-start">
        <Footer />
      </section>
    </main>
  );
}
