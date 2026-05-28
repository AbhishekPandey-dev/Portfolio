"use client";

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
        <h1 className="font-anton text-red text-5xl md:text-7xl tracking-tight mb-12">
          PROCESS
        </h1>
        <div className="space-y-8">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="group flex items-start gap-6 border-l-2 border-white/10 pl-6 transition-all duration-300 hover:border-[#ED1C24]"
            >
              <span className="font-anton text-3xl text-red shrink-0">
                {step.number}
              </span>
              <div>
                <h2 className="font-semibold text-white text-xl mb-1">
                  {step.title}
                </h2>
                <p className="text-white/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
