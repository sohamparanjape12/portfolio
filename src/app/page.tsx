"use client";

import Navbar from "@/components/Navbar";
import TextReveal from "@/components/TextReveal";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef, useState, useEffect, Fragment } from "react";
import CornerKit, { type SquircleConfig } from '@cornerkit/core';
import { HalftoneDots } from "@paper-design/shaders-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ease = [0.23, 1, 0.32, 1] as const; // High-fidelity ease-out-expo
const slowEase = [0.32, 0.72, 0, 1] as const; // iOS-like drawer curve

const PROJECTS = [
  {
    id: "01",
    name: "GDG MITWPU",
    desc: "The official website for Google Developer Groups MITWPU.",
    tech: ["Next.js", "GSAP", "TailwindCSS", "TypeScript"],
    year: "2026",
    link: "https://www.gdg-mitwpu.in/",
    img: "/gdg.png"
  },
  {
    id: "02",
    name: "Ridge",
    desc: "A desktop harness to run CLI coding agents in parallel across git worktrees. Supports Claude Code, Codex, OpenCode and more.",
    tech: ["Tauri", "Rust", "React", "TypeScript"],
    year: "2025",
    img: "/ridge.png"
  },
  {
    id: "03",
    name: "Arris Studio",
    desc: "Interactive website for Arris Studio, a concept studio.",
    tech: ["Next.js", "GSAP", "TailwindCSS"],
    year: "2026",
    link: "https://arrisstudio.vercel.app/",
    img: "/arris.png"
  },
  {
    id: "04",
    name: "CDCS Platform",
    desc: "Distributed computing for students to offload computations to idle lab machines.",
    tech: ["C", "Sockets", "Python", "PostgreSQL", "Next.js", "Node.js", "TailwindCSS"],
    year: "2026",
    img: "/cdcs.png"
  },
  {
    id: "05",
    name: "Paranjape Opticals",
    desc: "Static website for Paranjape Opticals with custom animations and smooth scrolling.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    year: "2025",
    link: "https://www.paranjapeopticals.com",
    img: "/po.png"
  },
  {
    id: "06",
    name: "Devolution",
    desc: "Static event website for Google Developer Groups MITWPU's Devolution event.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    year: "2026",
    link: "https://www.devolution.in/",
    img: "/devolution.png"
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
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const springConfigInner = { damping: 25, stiffness: 800, mass: 0.05 };
  const springConfigOuter = { damping: 28, stiffness: 350, mass: 0.2 };

  const springXInner = useSpring(mouseX, springConfigInner);
  const springYInner = useSpring(mouseY, springConfigInner);
  const springXOuter = useSpring(mouseX, springConfigOuter);
  const springYOuter = useSpring(mouseY, springConfigOuter);
  const [idle, setIdle] = useState(false);

  const xInner = useTransform(springXInner, (x) => x - 2);
  const yInner = useTransform(springYInner, (y) => y - 2);
  const xOuter = useTransform(springXOuter, (x) => x - 16);
  const yOuter = useTransform(springYOuter, (y) => y - 16);

  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;
    const armIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIdle(true), 1500);
    };
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIdle(false);
      armIdle();
    };
    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    armIdle();

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
      clearTimeout(idleTimer);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Sharp Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-foreground rounded-full pointer-events-none z-[101] hidden md:block custom-cursor"
        style={{
          x: xInner,
          y: yInner,
        }}
        animate={{
          scale: clicked ? 0.8 : 1,
          opacity: idle ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 800, mass: 0.05 }}
      />
      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-foreground/20 rounded-full pointer-events-none z-[100] hidden md:block"
        style={{
          x: xOuter,
          y: yOuter,
        }}
        animate={{
          scale: clicked ? 0.9 : hovered ? 1.5 : 1,
          opacity: idle ? 0 : hovered ? 1 : 0.5,
          borderColor: hovered ? "var(--color-accent)" : "rgba(var(--foreground), 0.2)",
        }}
        transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.2 }}
      />
    </>
  );
};

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full w-fit dark:bg-foreground/5 bg-background/10 hover:bg-foreground/10 border border-border transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center justify-center dark:text-foreground"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

// ─── TINY COMPONENTS ─────────────────────────────────────────────────────────
const Reveal = ({
  children,
  delay = 0,
  y = 8,
  scale = 0.99,
  ease = "power3.out",
  duration = 0.6,
  triggerStart = "top 85%",
  triggerRef,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  ease?: string;
  duration?: number;
  triggerStart?: string;
  triggerRef?: React.RefObject<HTMLElement | null> | string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const trigger = triggerRef
      ? (typeof triggerRef === "string"
        ? (containerRef.current.closest(triggerRef) || triggerRef)
        : triggerRef.current)
      : containerRef.current;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y, scale },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: trigger,
          start: triggerStart,
          once: true
        }
      }
    );
  }, { scope: containerRef, dependencies: [delay, y, scale, ease, duration, triggerStart, triggerRef] });

  return (
    <div
      ref={containerRef}
      className={`${className} will-change-transform [backface-visibility:hidden]`}
    >
      {children}
    </div>
  );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
  <motion.span
    whileHover={{ scale: 1.05, borderColor: "var(--color-accent)", color: "var(--foreground)" }}
    whileTap={{ scale: 0.96 }}
    className="inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase font-grotesk border border-border text-dim rounded-full select-none"
    style={{ fontFamily: "var(--font-overused-grotesk), system-ui, sans-serif" }}
  >
    {children}
  </motion.span>
);

const Divider = () => <div className="w-full h-px bg-border" />;

// ─── PROJECT ROW ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }: {
  project: typeof PROJECTS[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  useGSAP(() => {
    if (!cardRef.current || !detailsRef.current || !innerRef.current) return;

    const card = cardRef.current;
    const details = detailsRef.current;
    const inner = innerRef.current;

    // On touch/mobile devices (no hover support), keep details always visible
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    // Set initial state: details collapsed
    gsap.set(details, { height: 0, overflow: "hidden" });
    gsap.set(inner, { opacity: 0, y: 8 });

    let tl: gsap.core.Timeline | null = null;

    const onEnter = () => {
      if (tl) tl.kill();

      const currentHeight = details.offsetHeight;
      gsap.set(details, { height: "auto" });
      const targetHeight = details.offsetHeight;
      gsap.set(details, { height: currentHeight });

      tl = gsap.timeline()
        .to(card, {
          backgroundColor: theme === "dark" ? "rgba(18,18,20,0.8)" : "rgba(244,244,245,1)",
          duration: 0.48,
          ease: "power4.out",
        })
        .to(details, {
          height: targetHeight,
          duration: 0.8,
          ease: "power4.out",
        }, "<0.05")
        .to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.65");
    };

    const onLeave = () => {
      if (tl) tl.kill();

      tl = gsap.timeline()
        .to(inner, {
          opacity: 0,
          y: 6,
          duration: 0.18,
          ease: "power2.in",
        })
        .to(details, {
          height: 0,
          duration: 0.45,
          ease: "power3.out",
        }, "-=0.15")
        .to(card, {
          y: 0,
          backgroundColor: theme === "dark" ? "rgba(18,18,20,0)" : "rgba(255,255,255,0)",
          duration: 0.35,
          ease: "power3.out",
        }, "<");
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: cardRef, dependencies: [theme] });

  return (
    <Reveal key={index} duration={0.8} ease="power3.out" delay={0.1 + index * 0.25} triggerStart="top 80%">
      <div
        ref={cardRef}
        onClick={() => {
          if (project.link) {
            window.open(project.link, "_blank")
          }
        }}
        className="project-card group cursor-pointer relative p-4 -mx-4 will-change-transform dark:bg-[rgba(18,18,20,0)] bg-[rgba(255,255,255,0)]"
      >
        {/* Always-visible: image */}
        <div className="w-full mb-4">
          <div className="project-img aspect-[17/9] w-full bg-[#111111] flex items-center justify-center relative overflow-hidden">
            <Image
              src={project.img}
              alt={project.name}
              fill
              className="object-cover object-top dark:hue-rotate-[-5deg] brightness-[87%] saturate-[80%] dark:sepia-[10%] group-hover:filter-none transition-all duration-300 ease-out"
            />
          </div>
        </div>

        {/* Always-visible: name + desc */}
        <div className="flex items-start justify-between gap-4 pb-1">
          <h2 className="text-xl font-medium font-overused-grotesk tracking-tight">{project.name}</h2>
          {
            project.link && (
              <a href={project.link} target="_blank">
                <ArrowUpRight className="w-4 h-4 text-foreground/50 shrink-0 mt-1 mr-2" />
              </a>
            )
          }
        </div>

        {/* Hidden details: year + tech pills */}
        <div ref={detailsRef}>
          <div ref={innerRef}>
            <p className="text-sm text-foreground/70 font-mona-sans leading-tight mt-0.5">{project.desc}</p>
            <div className="flex items-center justify-between pt-3 pb-1 flex-wrap gap-2">
              <span className="text-xs font-mona-sans text-foreground/60">{project.year}</span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <Fragment key={i}>
                    <span className="inline-flex dark:bg-zinc-800 bg-zinc-200 text-zinc-600 dark:text-dim px-2.5 py-1 rounded-full text-sm font-medium my-0.5">{t}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};


// ─── PROJECT MINI CARD (compact horizontal-list variant) ───────────────────
const MiniProjectCard = ({ project, index }: {
  project: typeof PROJECTS[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const { theme } = useTheme();

  useGSAP(() => {
    if (!cardRef.current || !detailsRef.current || !innerRef.current) return;

    const card = cardRef.current;
    const details = detailsRef.current;
    const inner = innerRef.current;

    // On touch/mobile devices (no hover support), keep details always visible
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    // Set initial state: details collapsed
    gsap.set(details, { height: 0, overflow: "hidden" });
    gsap.set(inner, { opacity: 0, y: 8 });

    let tl: gsap.core.Timeline | null = null;

    const onEnter = () => {
      if (tl) tl.kill();

      const currentHeight = details.offsetHeight;
      gsap.set(details, { height: "auto" });
      const targetHeight = details.offsetHeight;
      gsap.set(details, { height: currentHeight });

      tl = gsap.timeline()
        .to(card, {
          backgroundColor: theme === "dark" ? "rgba(18,18,20,0.8)" : "rgba(244,244,245,1)",
          duration: 0.48,
          ease: "power4.out",
        })
        .to(details, {
          height: targetHeight,
          duration: 0.8,
          ease: "power4.out",
        }, "<0.05")
        .to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, "-=0.65");
    };

    const onLeave = () => {
      if (tl) tl.kill();

      tl = gsap.timeline()
        .to(inner, {
          opacity: 0,
          y: 6,
          duration: 0.18,
          ease: "power2.in",
        })
        .to(details, {
          height: 0,
          duration: 0.45,
          ease: "power3.out",
        }, "-=0.15")
        .to(card, {
          y: 0,
          backgroundColor: theme === "dark" ? "rgba(18,18,20,0)" : "rgba(255,255,255,0)",
          duration: 0.35,
          ease: "power3.out",
        }, "<");
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: cardRef, dependencies: [theme] });

  return (
    <Reveal key={index} duration={0.7} ease="power3.out" delay={0.05 + index * 0.08} triggerStart="top 90%">
      <div
        ref={cardRef}
        onClick={() => {
          if (project.link) {
            window.open(project.link, "_blank")
          }
        }}
        className="mini-project-card group cursor-pointer relative w-[240px] md:w-[280px] shrink-0 snap-start p-4 will-change-transform dark:bg-[rgba(18,18,20,0)] bg-[rgba(255,255,255,0)]"
      >
        {/* Always-visible: image */}
        <div className="w-full mb-3">
          <div className="mini-project-img aspect-[17/9] w-full bg-[#111111] flex items-center justify-center relative overflow-hidden">
            <Image
              src={project.img}
              alt={project.name}
              fill
              className="object-cover object-top dark:hue-rotate-[-5deg] brightness-[87%] saturate-[80%] dark:sepia-[10%] group-hover:filter-none transition-all duration-300 ease-out"
            />
          </div>
        </div>

        {/* Always-visible: name */}
        <div className="flex items-start justify-between gap-3 pb-1">
          <h2 className="text-base font-medium font-overused-grotesk tracking-tight">{project.name}</h2>
          {
            project.link && (
              <a href={project.link} target="_blank">
                <ArrowUpRight className="w-3.5 h-3.5 text-foreground/50 shrink-0 mt-1 mr-1" />
              </a>
            )
          }
        </div>

        {/* Hidden details: year + tech pills */}
        <div ref={detailsRef}>
          <div ref={innerRef}>
            <p className="text-xs text-foreground/60 font-mona-sans leading-snug mt-0.5 line-clamp-2">{project.desc}</p>
            <div className="flex items-center justify-end pt-2 pb-0.5 gap-2 flex-nowrap">
              <div className="flex items-center md:justify-end gap-1 flex-wrap">
                {project.tech.slice(0, 3).map((t, i) => (
                  <Fragment key={i}>
                    <span className="inline-flex shrink-0 whitespace-nowrap dark:bg-zinc-800 bg-zinc-200 text-zinc-600 dark:text-dim px-2 py-0.5 rounded-full text-[11px] font-medium">{t}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};


// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);
  const aboutRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme ?? theme) === "dark";

  // Accordion state
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Reduced motion
  const prefersReducedMotion = useReducedMotion();

  // Nav scroll state
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CornerKit squircle — client-only, applied after mount so no
  // <script> is injected during React render (React 19 forbids that).
  useEffect(() => {
    const ck = new CornerKit();
    const configAbt: SquircleConfig = { radius: 38, smoothing: 0.8 };
    const configPrj: SquircleConfig = { radius: 28, smoothing: 0.8 };
    const configPrjImg: SquircleConfig = { radius: 18, smoothing: 0.6 };
    const configMini: SquircleConfig = { radius: 20, smoothing: 0.8 };
    const configMiniImg: SquircleConfig = { radius: 12, smoothing: 0.6 };
    const configTechPill: SquircleConfig = { radius: 108, smoothing: 0.1 };

    ck.apply("#abt-img", configAbt);
    ck.applyAll(".project-card", configPrj);
    ck.applyAll(".project-img", configPrjImg);
    ck.applyAll(".mini-project-card", configMini);
    ck.applyAll(".mini-project-img", configMiniImg);
    ck.applyAll(".tech-pill", configTechPill);
    return () => {
      ck.remove("#abt-img");
      ck.destroy();
    };
  }, []);

  useGSAP(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.35,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "#about",
          start: "top 50%",
          once: true
        }
      }
    );

    // Scrubbed parallax: drift the whole framed portrait with scroll.
    // NOTE: no scale here — rescaling a WebGL canvas every scroll tick
    // forces resampling and makes the dots swim/blur. A plain y drift
    // keeps the halftone grid crisp.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 40%",
        end: "bottom 20%",
        scrub: 1.2,
      }
    });
    tl.fromTo("#abt-img",
      { y: 30 },
      { y: -30, ease: "none", duration: 1 }
    );
  }, { dependencies: [] });

  return (
    // CHANGE THIS LINE: Swap 'overflow-hidden' for 'overflow-x-hidden'
    <main className="min-h-[100dvh] bg-background text-foreground selection:bg-accent selection:text-black antialiased cursor-none overflow-x-hidden">
      <Cursor />


      <Navbar heroRef={heroRef} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[100dvh] max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pt-14"
      >
        {/* ── NAV ───────────────────────────────────────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className={`absolute top-0 left-0 right-0 z-50`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
            <div className="w-8 md:block hidden" /> {/* Spacer */}
            <div className="flex items-center gap-6 md:gap-10 justify-between w-full">
              {["Work", "About", "Contact"].map(item => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ color: "var(--color-foreground)", transition: { duration: 0.3, ease: "easeInOut" } }}
                  whileTap={{ scale: 0.96 }}
                  className="text-xs lowercase tracking-[0.1em] text-dim transition-colors duration-200"
                  style={{ fontFamily: "var(--font-mona-sans), system-ui, sans-serif" }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.nav>
        {/* Top-right metadata — desktop only.
            Diagonal composition: name anchors bottom-left, metadata sits top-right.
            Creates visual tension and fills the right void without adding prose. */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: [0.16, 1, 0.3, 1],
            delay: prefersReducedMotion ? 0 : 1.0,
          }}
          className="absolute top-20 right-6 md:right-10 hidden md:flex flex-col items-end gap-1"
        >
          <span
            className="text-sm text-dim tracking-[0.1em] lowercase"
            style={{ fontFamily: "var(--font-mona-sans), system-ui, sans-serif" }}
          >
            Full-stack Developer
          </span>
          <span
            className="text-xs text-dim tracking-[0.1em] lowercase"
            style={{ fontFamily: "var(--font-mona-sans), system-ui, sans-serif" }}
          >
            MIT&#8209;WPU | Pune
          </span>
        </motion.div>

        {/* Main content — lower-left anchor */}
        <motion.div
          className="pb-16 flex w-full md:flex-row flex-col gap-10"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          {/* ── Name block ── clipPath reveal on the element itself.
              No overflow:hidden container, so descenders (j, p, y, g) are
              never clipped regardless of lineHeight. The clip-path wipe +
              slight y drift replicates the GSAP line-reveal feel. */}
          <div className="">
            {/* Soham */}
            <TextReveal
              delay={0.1}
              stagger={0.02}
              duration={1.2}
              ease="power3.out"
              className="block text-[clamp(4rem,10vw,6.5rem)] font-medium text-foreground tracking-[-0.06em] leading-[0.77] font-overused-grotesk"
              byLetter
            >
              Soham
            </TextReveal>

            {/* Paranjape — byLetter reveal, starts after Soham */}
            <TextReveal
              delay={0.38}
              stagger={0.01}
              duration={1.2}
              ease="power3.out"
              className="block text-[clamp(4rem,10vw,6.5rem)] font-normal text-foreground tracking-[-0.07em] leading-[0.77] -mt-[0.02em] font-overused-grotesk"
              byLetter
            >
              Paranjape
            </TextReveal>
          </div>


          {/* ── CTAs ── */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.65,
              ease: [0.16, 1, 0.3, 1],
              delay: prefersReducedMotion ? 0 : 0.75,
            }}
            className="flex gap-6 justify-end pb-4 w-full items-end"
          >
            <motion.a
              href="#work"
              whileHover={{ y: -2, color: "var(--foreground)" }}
              whileTap={{ scale: 0.97 }}
              className="text-sm lowercase tracking-[0.1em] text-dim border-b border-border pb-0.5 transition-all duration-200"
              style={{ fontFamily: "var(--font-mona-sans), system-ui, sans-serif" }}
            >
              View Work
            </motion.a>
            <motion.a
              href="mailto:sohamparanjape1204@gmail.com"
              whileHover={{ x: 3, color: "var(--foreground)" }}
              whileTap={{ scale: 0.97 }}
              className="text-sm lowercase tracking-[0.1em] text-dim border-b border-transparent pb-0.5 transition-all duration-200"
              style={{ fontFamily: "var(--font-mona-sans), system-ui, sans-serif" }}
            >
              Get in touch ↗
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────────────── */}
      <section id="about" ref={aboutRef} className="min-h-[90vh] max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-12 md:h-[65vh] h-auto">

          {/* Left col */}
          <div className="flex flex-col justify-between md:h-full h-auto md:col-span-2 pt-0 md:pt-8 gap-8 md:gap-0">
            <Reveal triggerRef="#about" triggerStart="top 50%" delay={0}>
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] tracking-[-0.04em] md:mb-12" style={{ fontFamily: "var(--font-overused-grotesk), system-ui, sans-serif", fontWeight: 600 }}>Hey!</h2>
            </Reveal>
            <TextReveal
              className="text-lg md:text-xl font-medium tracking-normal leading-normal font-overused-grotesk"
              duration={0.8}
              stagger={0.06}
              ease="power4.out"
              triggerRef="#about"
              triggerStart="top 50%"
              delay={0.15}
            >
              I'm Soham, a second year CS student who loves building things, riding motorcycles and solving problems.
            </TextReveal>
          </div>

          <div ref={imgRef} className="md:col-span-3 flex items-center md:items-end justify-center w-full">
            <div
              id="abt-img"
              role="img"
              aria-label="Halftone portrait of Soham"
              className="rounded-md aspect-[4/5] w-[80%] max-w-[320px] md:w-[384px] md:max-w-none md:h-[480px] relative overflow-hidden bg-border/40"
            >
              <HalftoneDots
                className="about-image absolute inset-0 block h-full w-full"
                image="/prf-1.png"
                colorBack={"#dfddc8"}
                colorFront={"#191515"}
                originalColors={false}
                type="gooey"
                grid="hex"
                inverted={false}
                size={0.2}
                radius={1.15}
                contrast={0.38}
                grainMixer={0.18}
                grainOverlay={0.2}
                grainSize={0.45}
                scale={1.1}
                fit="cover"
                speed={0}
                frame={0}
              />
              {/* Soft blend into page background so the shader edge never looks cut off */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 50% 40%, transparent 55%, var(--background) 130%)",
                }}
              />
            </div>
          </div>

          {/* Right col */}
          <div className="flex flex-col justify-end md:h-full h-auto md:col-span-2 md:mt-0">
            <TextReveal
              className="text-[15px] md:text-base font-normal tracking-normal leading-normal font-mona-sans text-pretty"
              duration={0.9}
              stagger={0.06}
              delay={0.65}
              ease="power3.out"
              triggerRef="#about"
              triggerStart="top 50%"
            >
              {`I'm a Tech Member at\n`}
              <span className="inline-flex items-center justify-center overflow-hidden align-middle mr-0.5">
                <span className="reveal-rise inline-flex items-center justify-center">
                  <Image
                    src="/gdg-logo.png"
                    alt="GDG Logo"
                    width={28}
                    height={28}
                  />
                </span>
              </span>
              Google Developer Groups MIT-WPU Pune. I mostly build full-stack web apps with{" "}
              {
                ["Next.js", "Typescript", "TailwindCSS", "PostgreSQL", "Node.js", "GSAP"].flatMap((tech, i, arr) => [
                  <span key={tech} className={`tech-pill no-reveal inline-flex items-center self-center dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-800 px-2.5 py-1 text-sm font-medium leading-none align-middle my-0.5${i === 0 ? " ml-[0.08em]" : ""}`}>
                    {tech}
                  </span>,
                  i < arr.length - 1 ? <span key={`${tech}-comma`}>{", "}</span> : null
                ])
              }
              {", and am currently exploring "}
              <span className="tech-pill no-reveal inline-flex items-center self-center dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-800 px-2.5 py-1 text-sm font-medium leading-none align-middle my-0.5 mr-[0.25em]">
                Rust
              </span>
              {" on the side."}

            </TextReveal>


          </div>
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────────────────────────── */}
      <section id="work" className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48">
        <TextReveal delay={0.4} stagger={0.04} duration={1.2} ease="power3.out" className="text-[clamp(2rem,5vw,4rem)] tracking-[-0.04em] font-overused-grotesk font-medium">
          Featured Projects
        </TextReveal>

        <div className="grid md:grid-cols-2 md:gap-12 gap-4 mt-12 md:mt-16">
          {PROJECTS.slice(0, 4).map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
            />
          ))}
        </div>

        {PROJECTS.length > 4 && (
          <div className="mt-10 md:mt-14">
            <div className="flex gap-8 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none" style={{ scrollbarWidth: "none" }}>
              {PROJECTS.slice(4).map((p, i) => (
                <MiniProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48 border-t border-border">

        <TextReveal delay={0.1} triggerStart="top 75%" stagger={0.08} className="text-[clamp(3rem,5vw,4.2rem)] font-medium text-foreground max-w-2xl mb-16 font-overused-grotesk leading-[0.92] tracking-[-0.04em]">
          Open to collaborations and interesting problems.
        </TextReveal>

        <div className="flex flex-col gap-0 max-w-5xl">
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
                  <span className="text-sm md:text-md text-dim lowercase font-mona-sans font-normal tracking-[0.1em] w-16 shrink-0">{link.label}</span>
                  <span className="text-sm md:text-md text-dim group-hover:text-foreground font-mona-sans transition-colors duration-300">{link.display}</span>
                </div>
                <span className="text-dim group-hover:text-foreground transition-colors duration-300 relative z-10"><ArrowUpRight size={14} /></span>
              </motion.a>
            </Reveal>
          ))}
          <Divider />
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="max-w-full mx-auto px-6 md:px-10 py-10 flex items-center justify-between border-t border-border">
        <span className="text-sm text-dim tracking-[0.08em] font-overused-grotesk">© 2026 Soham Paranjape</span>
        <span className="text-xs text-dim tracking-[0.08em] font-overused-grotesk" style={{ fontFamily: "var(--font-overused-grotesk), system-ui, sans-serif" }}>Pune / IN</span>
      </footer>

    </main>
  );
}