'use client';

export default function ContactForm() {
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm text-white/60 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-[#D40000]/50 focus:bg-white/[0.06]"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-white/60 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-[#D40000]/50 focus:bg-white/[0.06]"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-white/60 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition-colors duration-200 focus:border-[#D40000]/50 focus:bg-white/[0.06] resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
      >
        Send message
      </button>
    </form>
  );
}
