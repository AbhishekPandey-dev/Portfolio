'use client';

export default function ContactForm() {
  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-[#D40000]/60 focus:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-[#D40000] focus-visible:ring-offset-2 focus-visible:ring-offset-black placeholder:text-white/30";

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-white/70 mb-2 font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-white/70 mb-2 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-white/70 mb-2 font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClass + " resize-none"}
          placeholder="Tell me about your project..."
        />
      </div>
      <button
        type="submit"
        className="btn-sweep inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-[transform,background-color,box-shadow] duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Send message
      </button>
    </form>
  );
}
