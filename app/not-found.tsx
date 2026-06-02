import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50 mb-3">
          404
        </p>
        <h1 className="font-anton text-5xl text-red mb-4">Page not found</h1>
        <p className="text-white/70 mb-8">
          The page you tried to reach doesn&apos;t exist (or it moved).
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-[transform,background-color] duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
