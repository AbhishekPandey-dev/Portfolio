'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Route error boundary:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-anton text-5xl text-red mb-4">Something broke</h1>
        <p className="text-white/70 mb-8">
          A route failed to render. You can retry, or head back home.
        </p>
        {error.digest ? (
          <p className="text-xs text-white/40 mb-6 font-mono">
            ref: {error.digest}
          </p>
        ) : null}
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-[transform,background-color] duration-200 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/85 transition-[transform,background-color,border-color] duration-200 hover:bg-white/5 hover:border-white/40 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D40000] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
