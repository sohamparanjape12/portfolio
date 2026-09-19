"use client";

import { useRef, Children, ReactNode, isValidElement, Fragment, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: string;
    triggerStart?: string;
    triggerRef?: React.RefObject<HTMLElement | null> | string;
    byLetter?: boolean;
}

export default function TextReveal({
    children,
    className = "",
    duration = 0.8,
    delay = 0,
    stagger = 0.03,
    ease = "power3.out",
    triggerRef,
    triggerStart = "top 85%",
    byLetter = false,
}: TextRevealProps) {
    const containerRef = useRef<HTMLParagraphElement>(null);

    // SplitText collapses whitespace, so preserve explicit "\n" breaks up-front
    // as full-width flex breaks (same visual as the previous manual splitter).
    const content = useMemo(() => {
        return Children.map(children, (child, childIndex) => {
            if (typeof child === "string" || typeof child === "number") {
                const segments = child.toString().split("\n");
                return (
                    <Fragment key={`text-${childIndex}`}>
                        {segments.map((segment, segIndex) => (
                            <Fragment key={`seg-${segIndex}`}>
                                {segIndex > 0 && (
                                    <span className="reveal-break block w-full" aria-hidden="true" />
                                )}
                                {segment}
                            </Fragment>
                        ))}
                    </Fragment>
                );
            }

            if (isValidElement(child) && child.type === "br") {
                return <span key={`br-${childIndex}`} className="reveal-break block w-full" aria-hidden="true" />;
            }

            return <Fragment key={`child-${childIndex}`}>{child}</Fragment>;
        });
    }, [children]);

    useGSAP(
        () => {
            const el = containerRef.current;
            if (!el) return;

            const trigger = triggerRef
                ? (typeof triggerRef === "string"
                    ? (el.closest(triggerRef) || triggerRef)
                    : triggerRef.current)
                : el;
            if (!trigger) return;

            // Only split what we animate (words, or words+chars for byLetter).
            // tag "span" keeps the markup inline; display is enforced below since
            // transforms don't apply to plain inline elements.
            const split = SplitText.create(el, {
                type: byLetter ? "words,chars" : "words",
                mask: byLetter ? "chars" : "words",
                tag: "span",
                wordsClass: "reveal-word",
                ...(byLetter ? { charsClass: "reveal-char" } : {}),
                // Pills / explicitly opted-out nodes animate (or stay) as whole units.
                ignore: ".tech-pill, .no-reveal, .reveal-break",
            });

            // SplitText drags an ignored element into the neighbouring word
            // when no space separates them (e.g. last pill + "."). Pull pills
            // back out so they always keep their own pop animation.
            el.querySelectorAll(".reveal-word .tech-pill, .reveal-char .tech-pill").forEach((pill) => {
                const mask = pill.closest(".reveal-word-mask, .reveal-char-mask");
                if (mask && mask.parentNode === el) {
                    mask.parentNode.insertBefore(pill, mask);
                } else {
                    const word = pill.closest(".reveal-word, .reveal-char");
                    word?.parentNode?.insertBefore(pill, word);
                }
            });

            const targets = (byLetter ? split.chars : split.words) as HTMLElement[] | undefined;
            const masks = (split.masks ?? []) as HTMLElement[];
            const pills = gsap.utils.toArray(".tech-pill", el) as HTMLElement[];

            // Inline spans can't be transformed — blockify split + mask nodes.
            gsap.set([...(targets ?? []), ...masks], { display: "inline-block" });
            if (byLetter && split.words) {
                // Keep a word's chars glued together (same as old whitespace-nowrap wrapper).
                const words = split.words as HTMLElement[];
                gsap.set(words, { whiteSpace: "nowrap" });
                // Flex drops real space text nodes, so restore inter-word gaps here.
                gsap.set(words, { marginRight: "0.25em" });
            }
            if (masks.length) {
                // Breathing room inside the clip masks: vertical for descenders
                // (g/j/p/y), horizontal so tight tracking doesn't slice the
                // right edge of glyphs. Negative margins keep layout identical.
                // Word-level masks are the flex items, so their right margin
                // doubles as the inter-word space (0.25em space minus the
                // 0.08em padding compensation).
                gsap.set(masks, {
                    paddingBottom: "0.22em",
                    marginBottom: "-0.22em",
                    paddingLeft: "0.08em",
                    paddingRight: "0.08em",
                    marginLeft: "-0.08em",
                    marginRight: byLetter ? "-0.08em" : "0.17em",
                    verticalAlign: "bottom",
                });
            }
            if (targets?.length) {
                // Parked with yPercent so the slide-up travels relative to each
                // glyph's own height. 150 (not 120) so the tops fully clear the
                // mask's 0.22em bottom padding even at tight leading (e.g. the
                // hero's 0.77) — otherwise glyph tops peek before animating.
                gsap.set(targets, { yPercent: 150, willChange: "transform" });
            }
            if (pills.length) {
                gsap.set(pills, { scale: 0, opacity: 0, rotate: -10 });
            }
            // Non-text units (e.g. the GDG logo) that SplitText leaves
            // untouched — they rise with the same yPercent motion instead.
            const riseUnits = gsap.utils.toArray(".reveal-rise", el) as HTMLElement[];
            if (riseUnits.length) {
                gsap.set(riseUnits, { yPercent: 150, willChange: "transform" });
            }

            const tl = gsap.timeline({
                delay: delay,
                scrollTrigger: {
                    trigger: trigger,
                    start: triggerStart,
                    toggleActions: "play none none none",
                    once: true,
                    invalidateOnRefresh: false,
                },
            });

            if (targets?.length) {
                // clearProps per-target (not bulk onComplete) so each word
                // sharpens as it lands instead of the whole para popping at once.
                tl.to(targets, { yPercent: 0, duration: duration, ease: ease, stagger: stagger, clearProps: "transform,willChange" }, 0);
            }
            if (pills.length) {
                if (targets?.length) {
                    // Each pill pops when the text around it reveals, keeping
                    // its own scale/rotate animation.
                    pills.forEach((pill) => {
                        const before = targets.filter(
                            (t) => (t.compareDocumentPosition(pill) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
                        ).length;
                        tl.to(
                            pill,
                            { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: "back.inOut", clearProps: "transform,willChange" },
                            before * stagger
                        );
                    });
                } else {
                    tl.to(
                        pills,
                        { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: "back.inOut", stagger: stagger, clearProps: "transform,willChange" },
                        0
                    );
                }
            }
            if (riseUnits.length) {
                if (targets?.length) {
                    // Slot each unit into the stagger order by DOM position so
                    // it rises together with the words around it.
                    riseUnits.forEach((unit) => {
                        const before = targets.filter(
                            (t) => (t.compareDocumentPosition(unit) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0
                        ).length;
                        tl.to(unit, { yPercent: 0, duration: duration, ease: ease, clearProps: "transform,willChange" }, before * stagger);
                    });
                } else {
                    tl.to(riseUnits, { yPercent: 0, duration: duration, ease: ease, stagger: stagger, clearProps: "transform,willChange" }, 0);
                }
            }

            return () => {
                tl.scrollTrigger?.kill();
                tl.kill();
                split.revert();
            };
        },
        // NOTE: `children` intentionally excluded — same as before. Re-splitting on
        // every React re-render would restart ScrollTrigger animations on scroll.
        { scope: containerRef, dependencies: [duration, delay, ease, stagger, triggerStart, triggerRef, byLetter] }
    );

    return (
        <p ref={containerRef} className={`flex flex-wrap items-center ${className}`}>
            {content}
        </p>
    );
}
