export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 rounded-full border-2 border-white/15 border-t-[#D40000] animate-spin"
          aria-hidden="true"
        />
        <p className="text-sm text-white/60 tracking-wide">Loading…</p>
      </div>
    </div>
  );
}
