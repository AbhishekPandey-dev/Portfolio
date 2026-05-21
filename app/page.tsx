import { Navbar } from "@/src/components/portfolio/Navbar";
import { GradientBackground } from "@/src/components/portfolio/GradientBackground";
import { KnightModel } from "@/src/components/portfolio/KnightModel";

export default function Home() {
  return (
    <main className="relative min-h-[185vh] bg-transparent">
      <GradientBackground />
      <KnightModel />
      <Navbar
        wordmark="<ABHISHEK>"
        links={[
          { label: "About", href: "#about" },
          { label: "Work", href: "#work" },
          { label: "Process", href: "#process" },
          { label: "Contact", href: "#contact" },
        ]}
        socials={{
          github: "https://github.com/AbhishekPandey-dev",
          email: "mailto:hello@abhishekapandey.dev",
        }}
        cta={{ label: "Let's Talk", href: "#contact" }}
      />
    </main>
  );
}

