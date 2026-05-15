import { Navbar } from "@/src/components/portfolio/Navbar";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Navbar
        wordmark="Abhishek."
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
        cta={{ label: "Contact", href: "#contact" }}
      />
    </main>
  );
}

