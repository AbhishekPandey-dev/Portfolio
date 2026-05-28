"use client";

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
        <h1 className="font-anton text-red text-5xl md:text-7xl tracking-tight mb-12">
          SERVICES
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:border-[#ED1C24]/30"
            >
              <h2 className="font-semibold text-white text-xl mb-3">
                {service.title}
              </h2>
              <p className="text-white/50 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
