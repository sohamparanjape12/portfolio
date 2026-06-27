import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F0E8] flex flex-col items-center justify-center p-6 text-center">
      <h1
        className="text-6xl font-black mb-4 tracking-tight"
        style={{ fontFamily: "var(--font-satoshi), system-ui, sans-serif" }}
      >
        404
      </h1>
      <p
        className="text-[#92908B] mb-8 max-w-md leading-relaxed"
        style={{ fontFamily: "var(--font-overused-grotesk), system-ui, sans-serif" }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] px-6 py-3 border border-[rgba(245,240,232,0.08)] text-[#92908B] hover:text-[#F5F0E8] hover:border-[rgba(245,240,232,0.2)] transition-all"
        style={{ fontFamily: "var(--font-overused-grotesk), system-ui, sans-serif" }}
      >
        Return Home
      </Link>
    </main>
  );
}
