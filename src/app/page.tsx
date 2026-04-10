"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ease = [0.23, 1, 0.32, 1] as const; // High-fidelity ease-out-expo
const slowEase = [0.32, 0.72, 0, 1] as const; // iOS-like drawer curve

const PROJECTS = [
  {
    id: "01",
    name: "CDCS Platform",
    desc: "Distributed computing system enabling students to offload ML training to idle lab machines.",
    tech: ["C", "Sockets", "Python", "PostgreSQL", "Next.js", "Node.js", "TailwindCSS"],
    year: "2026",
    img: "/cdcs.png"
  },
  {
    id: "02",
    name: "Devolution",
    desc: "Static event website for Google Developer Groups MITWPU's Devolution event.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    year: "2026",
    img: "/devolution.png"
  },
  {
    id: "03",
    name: "Paranjape Opticals",
    desc: "Static website for Paranjape Opticals with custom animations and smooth scrolling.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    year: "2025",
    img: "/po.png"
  },
  {
    id: "04",
    name: "LinkStack",
    desc: "Customizable link-in-bio platform with real-time auth and dynamic link storage.",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
    year: "2025",
    img: "/linkstack.png"
  }
];

const SKILLS = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Framer Motion"]
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "Supabase", "ConvexDB"]
  },
  {
    label: "Core",
    items: ["JavaScript", "HTML5", "CSS3", "Git"]
  },
];


// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest("a") || target.closest("button") || target.closest(".cursor-pointer");
      setHovered(!!isLink);
    };
    window.addEventListener("mouseover", checkHover);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  return (
    <>
      {/* Sharp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-foreground rounded-full pointer-events-none z-[101] hidden md:block"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 450, mass: 0.1 }}
      />
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-foreground/20 rounded-full pointer-events-none z-[100] hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.9 : hovered ? 1.5 : 1,
          opacity: hovered ? 1 : 0.5,
          borderColor: hovered ? "var(--color-accent)" : "rgba(var(--foreground), 0.2)",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 150, mass: 0.5 }}
      />
    </>
  );
};

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 border border-border transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center text-foreground"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// ─── TINY COMPONENTS ─────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, y = 16, scale = 0.95, className = "" }: { children: React.ReactNode; delay?: number; y?: number; scale?: number; className?: string }) => {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      onAnimationComplete={() => setIsFinished(true)}
      transition={{ duration: 0.6, ease, delay }}
      className={`${className} will-change-transform [backface-visibility:hidden]`}
      style={isFinished ? { opacity: 1, transform: "none", willChange: "auto" } : {}}
    >
      {children}
    </motion.div>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    whileHover={{ scale: 1.05, borderColor: "var(--color-accent)", color: "var(--foreground)" }}
    whileTap={{ scale: 0.96 }}
    className="inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-mono border border-border text-dim rounded-full select-none"
  >
    {children}
  </motion.span>
);

const Divider = () => <div className="w-full h-px bg-border" />;

// ─── PROJECT ROW ─────────────────────────────────────────────────────────────
const ProjectRow = ({ project, index, isOpen, onToggle }: {
  project: typeof PROJECTS[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <Reveal delay={index * 0.04}>
      <motion.div
        className="group cursor-pointer relative"
        onClick={onToggle}
        whileHover={{ x: 10, scale: 1.002 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.4, ease }}
      >
        <div className="flex items-center justify-between py-7 md:py-9 gap-6 relative z-10">
          {/* Left */}
          <div className="flex items-baseline gap-5 md:gap-8 min-w-0">
            <span className="font-mono text-[10px] text-foreground/30 shrink-0 tabular-nums">{project.id}</span>
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground/90 truncate group-hover:text-foreground transition-colors duration-300">
              {project.name}
            </h3>
          </div>
          {/* Right */}
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <span className="hidden md:block font-mono text-[10px] text-foreground/30">{project.year}</span>
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3, ease }}
              className="text-foreground/40 group-hover:text-foreground/70 transition-colors text-lg leading-none select-none"
            >
              +
            </motion.span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: slowEase }}
              className="overflow-hidden"
            >
              <div className="pb-12 pt-4 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pl-8 md:pl-16 pr-4">
                {/* Text Content */}
                <div className="md:col-span-5 flex flex-col justify-center">
                  <p className="text-dim text-sm md:text-base leading-relaxed mb-8 max-w-sm">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {project.tech.map((t, ti) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, scale: 0.9, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3, ease, delay: ti * 0.04 + 0.1 }}
                      >
                        <Tag>{t}</Tag>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Placeholder Image Container */}
                <div className="md:col-span-7">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.2 }}
                    className="aspect-[17/9] w-full bg-[#111] border border-1 dark:border-neutral-900 border-neutral-100 rounded-lg flex items-center justify-center relative overflow-hidden group/img"
                  >
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover object-top"
                    />
                    {/* Subtle grid pattern for placeholder feel */}
                    {
                      !project.img && (<>
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim group-hover/img:text-dim transition-colors duration-500 opacity-20 group-hover/img:opacity-40">
                          [ Project Preview ]
                        </span></>
                      )
                    }

                    {/* Softened gloss sweep */}
                    <motion.div
                      className="absolute inset-0 bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.08)_50%,transparent_70%)] pointer-events-none"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <Divider />
      </motion.div>
    </Reveal>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  // Accordion state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Nav scroll state
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-[100dvh] bg-background text-foreground selection:bg-accent selection:text-black antialiased cursor-none overflow-hidden">
      <Cursor />

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-md transition-all duration-500" : ""}`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <div className="w-8 md:block hidden" /> {/* Spacer */}
          <div className="flex items-center gap-6 md:gap-10">
            {["Work", "About", "Contact"].map(item => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -2, color: "var(--color-accent)" }}
                whileTap={{ scale: 0.96 }}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim transition-colors duration-200"
              >
                {item}
              </motion.a>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <motion.section
        id="hero"
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY }}
        className="min-h-[100dvh] max-w-5xl mx-auto px-6 md:px-10 flex flex-col justify-center pt-14 relative"
      >
        {/* Architectural Background Type (Geometric Outlines)
        <motion.div
          style={{ y: useTransform(scrollY, [0, 800], [0, 200]) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.8 }}
          className="absolute -top-[15%] -right-[75%] pointer-events-none select-none z-0"
        >
          <span
            className="text-[110vw] font-bold leading-none tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "1px var(--border)" }}
          >
            G
          </span>
        </motion.div>
        */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <p className="font-mono text-[10px] text-dim tracking-[0.2em] uppercase mb-8">
            Full-Stack Developer · Pune, IN
          </p>

          <div className="overflow-hidden pb-4 mb-6">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.2 }}
              className="text-[clamp(3rem,10vw,8rem)] font-[var(--font-geist-sans)] font-semibold tracking-[-0.04em] text-foreground"
              style={{ lineHeight: 0.84 }}
            >
              Soham<br />
              <span className="text-muted">Paranjape</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.8 }}
            className="flex flex-col gap-2 ml-0 md:ml-4"
          >
            <p className="text-dim text-base md:text-lg max-w-md leading-relaxed mb-12">
              Building real products, not just projects.<br /> CSE undergrad at MIT-WPU. I write code that looks as good as it runs.
            </p>

            <div className="flex items-center gap-6">
              <motion.a
                href="#work"
                whileHover={{ y: -2, color: "var(--color-accent)", borderColor: "var(--color-accent)" }}
                whileTap={{ scale: 0.97 }}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-foreground border-b border-border pb-0.5 transition-all duration-200"
              >
                View Work
              </motion.a>
              <motion.a
                href="mailto:sohamparanjape1204@gmail.com"
                whileHover={{ x: 3, color: "var(--color-accent)" }}
                whileTap={{ scale: 0.97 }}
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-dim transition-colors duration-200"
              >
                Get in touch ↗
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b dark:from-neutral-700 from-neutral-400/85 to-transparent mx-auto"
          />
        </motion.div>
      </motion.section>

      {/* ── WORK ──────────────────────────────────────────────────────────── */}
      <section id="work" className="max-w-5xl mx-auto px-6 md:px-10 py-32 md:py-48">
        <Reveal>
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-dim">Selected Work</h2>
            <span className="font-mono text-[10px] text-dim opacity-50">2025 – 2026</span>
          </div>
        </Reveal>

        <Divider />
        <div>
          {PROJECTS.map((p, i) => (
            <ProjectRow
              key={p.id}
              project={p}
              index={i}
              isOpen={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" className="max-w-5xl mx-auto px-6 md:px-10 py-32 md:py-48 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left col */}
          <div>
            <Reveal>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/40 mb-12">About</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-muted text-base leading-relaxed mb-6">
                First-year CS student at MIT World Peace University, Pune. I work across the full stack - Next.js, React, Node.js, and PostgreSQL, with a focus on shipping things that are both fast and considered.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-dim text-sm leading-relaxed">
                I'm a Tech Team Member at Google Developer Groups MITWPU.<br />
                I love riding my bike and exploring new places.
              </p>
            </Reveal>
          </div>

          {/* Right col — skills */}
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-dim mb-12">Stack</h2>
            </Reveal>
            {SKILLS.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 0.04}>
                <div className="flex gap-6">
                  <span className="font-mono text-[10px] text-dim uppercase tracking-[0.1em] w-20 shrink-0 pt-0.5">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, ii) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, ease, delay: ii * 0.03 + 0.1 }}
                      >
                        <Tag>{item}</Tag>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-5xl mx-auto px-6 md:px-10 py-32 md:py-48 border-t border-border">
        <Reveal>
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-dim mb-16">Contact</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.03em] text-foreground leading-[1.05] max-w-xl mb-16">
            Open to collaborations and interesting problems.
          </p>
        </Reveal>

        <div className="flex flex-col gap-0">
          {[
            { label: "Email", href: "mailto:sohamparanjape1204@gmail.com", display: "sohamparanjape1204@gmail.com" },
            { label: "LinkedIn", href: "https://linkedin.com/in/soham-paranjape-8b2473374", display: "linkedin.com/in/soham-paranjape" },
            { label: "GitHub", href: "https://github.com/sohamparanjape12", display: "github.com/sohamparanjape12" },
          ].map((link, i) => (
            <Reveal key={link.label} delay={i * 0.07}>
              <Divider />
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-6 relative"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.995 }}
                transition={{ duration: 0.3, ease }}
              >
                <div className="flex items-center gap-8 relative z-10">
                  <span className="font-mono text-[10px] text-dim uppercase tracking-[0.15em] w-16 shrink-0">{link.label}</span>
                  <span className="text-sm text-dim group-hover:text-foreground transition-colors duration-300">{link.display}</span>
                </div>
                <span className="text-dim group-hover:text-foreground transition-colors duration-300 relative z-10"><ArrowUpRight size={14} /></span>
              </motion.a>
            </Reveal>
          ))}
          <Divider />
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="max-w-5xl mx-auto px-6 md:px-10 py-10 flex items-center justify-between border-t border-border">
        <span className="font-mono text-[10px] text-dim tracking-[0.2em] uppercase">© 2026 Soham Paranjape</span>
        <span className="font-mono text-[10px] text-dim tracking-[0.2em] uppercase">Pune / IN</span>
      </footer>

    </main>
  );
}