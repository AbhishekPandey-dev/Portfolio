"use client";

import ClickSpark from "@/components/ui/ClickSpark";
import { GooeyText } from "@/components/ui/GooeyText";

export default function Home() {
  return (
    <main
      className="relative h-screen w-full bg-black overflow-hidden"
      id="home-main"
    >
      <section id="hero-section" className="relative h-screen w-full">
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
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
                  textClassName="text-off-white font-bold whitespace-nowrap text-[clamp(0.75rem,1.5vw,1.25rem)] md:text-[1.5rem] text-right"
                />
              </div>
            </div>
          </div>
        </ClickSpark>
      </section>
    </main>
  );
}
