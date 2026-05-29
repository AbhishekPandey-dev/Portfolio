export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black pt-28 pb-20 px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-anton text-red text-5xl md:text-7xl tracking-tight mb-12">
          WORK
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#ED1C24]/40 hover:bg-white/[0.06]"
            >
              <div className="mb-4 h-48 rounded-xl bg-white/5" />
              <h3 className="font-semibold text-white text-lg mb-2">
                Project {i}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Description of the project and the technologies used to build it.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
