"use client";

import { GooeyText } from "@/components/ui/GooeyText";

export default function Home() {
  return (
    <main
      className="relative h-screen w-full bg-black overflow-hidden"
      id="home-main"
    >
      <section id="hero-section" className="relative h-screen w-full overflow-hidden">
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
        <div className="absolute inset-0 flex items-start justify-center pt-[12vh] md:pt-[8vh]">
          <div className="relative inline-block">
            <h1 className="font-anton text-red text-[clamp(5rem,22vw,18rem)] md:text-[clamp(8rem,15vw,20rem)] tracking-[-0.02em] leading-none text-center select-none">
              ABHISHEK PANDEY
            </h1>
            <div className="absolute -bottom-5 right-49 z-20">
              <GooeyText
                texts={["Full stack developer", "UI UX designer", "Shopify & Wordpress expert", "Creative developer"]}
                morphTime={1}
                cooldownTime={0.25}
                className="font-bold"
                textClassName="text-white font-bold whitespace-nowrap text-[clamp(0.75rem,1.5vw,1.25rem)] md:text-[1.5rem] text-right"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
