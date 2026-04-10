import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F0E8] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-black mb-4 font-barlow tracking-tight">404</h1>
      <p className="text-neutral-500 mb-8 max-w-md font-sans">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-400 transition-all"
      >
        Return Home
      </Link>
    </main>
  );
}
