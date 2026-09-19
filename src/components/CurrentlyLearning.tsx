"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

// Edit this list — one centered line per entry.
const LEARNING = ["Next.js", "Rust", "GSAP", "Node.js"];

export default function CurrentlyLearning() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    (context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

      if (reduced) {
        gsap.set(root.querySelectorAll(".learning-line-inner"), { clearProps: "all" });
        return;
      }

      // Scroll reveal: SplitText chars per line with line-level masking.
      // Line-level masking avoids individual character mask boundaries that cause
      // trailing edge artifacts (the caret-like line at the end of words).
      const splits: SplitText[] = [];
      const rows = gsap.utils.toArray<HTMLElement>(".learning-row", root);

      rows.forEach((row) => {
        const line = row.querySelector<HTMLElement>(".learning-line");
        const target = row.querySelector<HTMLElement>(".learning-line-inner");
        if (!target || !line) return;

        const split = SplitText.create(target, {
          type: "chars",
          charsClass: "learning-char",
          tag: "span",
        });
        splits.push(split);

        const chars = split.chars ?? [];

        gsap.set(chars, { display: "inline-block", yPercent: 150, willChange: "transform" });
        gsap.set(line, {
          overflow: "hidden",
          paddingBottom: "0.3em",
          marginBottom: "-0.3em",
          paddingTop: "0.16em",
          marginTop: "-0.16em",
        });

        gsap.to(chars, {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.025,
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
            invalidateOnRefresh: false,
          },
          onComplete: () => {
            gsap.set(line, { clearProps: "overflow,paddingBottom,marginBottom,paddingTop,marginTop" });
          },
        });
      });

      if (!canHover) {
        return () => {
          splits.forEach((s) => s.revert());
        };
      }

      // Hover: contextSafe so handler tweens belong to the GSAP
      // context and die on unmount. Centered, so no lateral x —
      // a char wave + gentle scale + sibling dim.
      const dimSiblings = (active: HTMLElement, dimmed: boolean) => {
        rows.forEach((row) => {
          if (row === active) return;
          gsap.to(row, {
            opacity: dimmed ? 0.3 : 1,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      const onEnter = contextSafe!((row: HTMLElement) => {
        const chars = row.querySelectorAll(".learning-char");
        dimSiblings(row, true);
        gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .to(row, { scale: 1.03, duration: 0.5, ease: "power4.out" }, 0)
          .to(chars, { y: -8, duration: 0.22, ease: "power2.out", stagger: 0.018 }, 0)
          .to(chars, { y: 0, duration: 0.45, ease: "power3.out", stagger: 0.018 }, 0.22);
      });

      const onLeave = contextSafe!((row: HTMLElement) => {
        const chars = row.querySelectorAll(".learning-char");
        dimSiblings(row, false);
        gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .to(row, { scale: 1, duration: 0.5, ease: "power3.out" }, 0)
          .to(chars, { y: 0, duration: 0.3, ease: "power3.out", stagger: 0.008 }, 0);
      });

      const enterHandlers = new Map<HTMLElement, () => void>();
      const leaveHandlers = new Map<HTMLElement, () => void>();

      rows.forEach((row) => {
        const enter = () => onEnter?.(row);
        const leave = () => onLeave?.(row);
        enterHandlers.set(row, enter);
        leaveHandlers.set(row, leave);
        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);
      });

      return () => {
        rows.forEach((row) => {
          row.removeEventListener("mouseenter", enterHandlers.get(row)!);
          row.removeEventListener("mouseleave", leaveHandlers.get(row)!);
        });
        splits.forEach((s) => s.revert());
      };
    },
    { scope: rootRef }
  );

  return (
    <section
      id="learning"
      ref={rootRef}
      aria-label="what i'm learning"
      className="max-w-7xl mx-auto px-6 md:px-10 py-32 md:py-48 border-t border-border text-center"
    >
      <h2 className="font-overused-grotesk font-light text-[clamp(1rem,2vw,2rem)] tracking-[-0.04em] leading-none mb-12 md:mb-16">
        what i&apos;m learning
      </h2>

      <ul className="flex flex-col items-center">
        {LEARNING.map((name, i) => (
          <li
            key={name}
            className="learning-row relative cursor-pointer will-change-transform"
            // No-gap overlap immunity: rows stack with zero gap at 0.95
            // leading, so a descender (j in Next.js) paints into the next
            // row's top whitespace. Descending z-index puts earlier rows
            // on top, so tails render over empty space instead of under
            // the next line's glyphs. Zero layout change, leading untouched.
            style={{ zIndex: LEARNING.length - i }}
          >
            <span className="learning-line block">
              <span className="learning-line-inner block whitespace-nowrap font-overused-grotesk font-normal text-[clamp(3rem,9vw,7rem)] tracking-[-0.07em] leading-[0.95] will-change-transform">{name}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
