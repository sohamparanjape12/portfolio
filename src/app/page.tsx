"use client";

import Navbar from "@/components/Navbar";
import TextReveal from "@/components/TextReveal";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRef, useState, useEffect, Fragment } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const ease = [0.23, 1, 0.32, 1] as const; // High-fidelity ease-out-expo
const slowEase = [0.32, 0.72, 0, 1] as const; // iOS-like drawer curve

const PROJECTS = [
  {
    id: "01",
    name: "CDCS Platform",
    desc: "Distributed computing for students to offload computations to idle lab machines.",
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
    link: "https://www.devolution.in/",
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
        className="fixed top-0 left-0 w-1 h-1 bg-foreground rounded-full pointer-events-none z-[101] hidden md:block custom-cursor"
        animate={{
          x: position.x - 2,
          y: position.y - 2,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 800, mass: 0.05 }}
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
        }, "+0.4")
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
    <Reveal key={index} duration={0.8} ease="power3.out" delay={0.4 + index * 0.25} triggerStart="top 80%">
      <div
        ref={cardRef}
        onClick={() => {
          if (project.link) {
            window.open(project.link, "_blank")
          }
        }}
        className="group cursor-pointer relative rounded-2xl p-4 -mx-4 will-change-transform dark:bg-[rgba(18,18,20,0)] bg-[rgba(255,255,255,0)]"
      >
        {/* Always-visible: image */}
        <div className="w-full mb-4">
          <div className="aspect-[17/9] w-full bg-[#111111] rounded-xl flex items-center justify-center relative overflow-hidden">
            <Image
              src={project.img}
              alt={project.name}
              fill
              className="object-cover object-top hue-rotate-[-5deg] brightness-[77%] saturate-[80%] sepia-[20%] group-hover:filter-none transition-all duration-400 delay-450"
            />
          </div>
        </div>

        {/* Always-visible: name + desc */}
        <div className="flex items-start justify-between gap-4 pb-1">
          <h2 className="text-xl font-medium font-inter tracking-tight">{project.name}</h2>
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


// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);
  const aboutRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

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

    // Scrubbed timeline: one ScrollTrigger drives the whole sequence.
    // • fromVars = starting property values only (no duration/delay/ease here)
    // • scrub = no "once", no nested scrollTriggers, no ease (scroll IS the playhead)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 60%",
        end: "bottom 20%",
        scrub: 1.2,
      }
    });
    // Phase 1: scale up as section enters
    tl.fromTo(".about-image",
      { scale: 1.2 },
      { scale: 1.4, ease: "power4.out" }
    );
    // Phase 2: gentle parallax upward as section scrolls through
    tl.to(".about-image",
      { y: -20, ease: "none" }
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
              stagger={0.05}
              duration={1.2}
              ease="power3.out"
              className="block text-[clamp(4rem,10vw,6.5rem)] font-semibold text-foreground tracking-tighter leading-[0.77] font-inter"
              byLetter
            >
              Soham
            </TextReveal>

            {/* Paranjape — byLetter reveal, starts after Soham */}
            <TextReveal
              delay={0.38}
              stagger={0.04}
              duration={1.2}
              ease="power3.out"
              className="block text-[clamp(4rem,10vw,6.5rem)] font-normal text-foreground tracking-tighter leading-[0.95] font-inter"
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
              <h2 className="text-[clamp(2rem,4vw,2.8rem)] tracking-tighter md:mb-12" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontWeight: 600 }}>Hey!</h2>
            </Reveal>
            <TextReveal
              className="text-lg md:text-xl font-medium tracking-normal leading-normal font-inter "
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
            <div className="rounded-md aspect-[4/5] w-[80%] max-w-[320px] md:w-auto md:max-w-none md:h-[480px] relative overflow-hidden">
              <img src={"/sunrise.jpeg"} alt="About Image"
                className="about-image rounded-md object-cover absolute inset-0 w-full h-full"
                style={{ filter: "sepia(45%) saturate(65%) hue-rotate(5deg) brightness(77%)" }}
              />
            </div>
          </div>

          {/* Right col */}
          <div className="flex flex-col justify-end md:h-full h-auto md:col-span-2 md:mt-0">
            <TextReveal
              className="text-md md:text-md font-light tracking-normal leading-tight font-mona-sans"
              duration={0.9}
              stagger={0.06}
              delay={0.65}
              ease="power3.out"
              triggerRef="#about"
              triggerStart="top 50%"
            >
              {`I'm a Tech Member at\n`}
              <span className="inline-flex items-center justify-center">
                <Image
                  src="/gdg-logo.png"
                  alt="GDG Logo"
                  width={28}
                  height={28}
                  className="w-6 h-6 object-contain"
                />
              </span>
              Google Developer Groups MIT-WPU Pune. I work on full stack web applications using
              {
                ["Next.js", "Typescript", "TailwindCSS", "PostgreSQL", "Framer Motion", "Node.js", "GSAP"].map((tech, i) => (
                  <Fragment key={tech}>
                    <span className="inline-flex dark:bg-zinc-800 bg-zinc-200 dark:text-zinc-100 text-zinc-800 px-2.5 py-1 rounded-full text-sm font-medium my-0.5">
                      {tech}
                    </span>
                    <span>
                      {i < 6 && ", "}
                    </span>
                  </Fragment>
                ))
              }. Interested in learning new technologies and expanding my skillset.

            </TextReveal>


          </div>
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────────────────────────── */}
      <section id="work" className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48">
        <TextReveal delay={0.4} stagger={0.04} duration={1.2} ease="power3.out" className="text-[clamp(2rem,5vw,4rem)] tracking-tighter font-inter font-medium">
          Featured Projects
        </TextReveal>

        <div className="grid md:grid-cols-2 md:gap-12 gap-4 mt-12 md:mt-16">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
            />
          ))}
        </div>
      </section>



      {/* ── CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48 border-t border-border">

        <TextReveal delay={0.1} triggerStart="top 75%" stagger={0.08} className="text-[clamp(2rem,5vw,4rem)] font-medium text-foreground max-w-2xl mb-16 font-inter leading-[0.92] tracking-tighter">
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
        <span className="text-sm text-dim tracking-[0.08em] lowercase font-mona-sans">© 2026 Soham Paranjape</span>
        <span className="text-xs text-dim tracking-[0.08em] lowercase font-mona-sans" style={{ fontFamily: "var(--font-overused-grotesk), system-ui, sans-serif" }}>Pune / IN</span>
      </footer>

    </main>
  );
}