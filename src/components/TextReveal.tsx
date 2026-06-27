"use client";

import { useRef, Children, ReactNode, isValidElement, Fragment, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
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

    useGSAP(
        () => {
            // If the timeline already ran or nodes don't exist, don't re-initialize
            if (!containerRef.current) return;

            const trigger = triggerRef
                ? (typeof triggerRef === "string"
                    ? (containerRef.current.closest(triggerRef) || triggerRef)
                    : triggerRef.current)
                : containerRef.current;

            const nodes = gsap.utils.toArray(".reveal-node, .tech-pill", containerRef.current) as HTMLElement[];

            const tl = gsap.timeline({
                delay: delay,
                scrollTrigger: {
                    trigger: trigger,
                    start: triggerStart,
                    toggleActions: "play none none none",
                    once: true,
                    invalidateOnRefresh: false,
                }
            });

            nodes.forEach((node, i) => {
                const isTechPill = node.classList.contains("tech-pill");
                if (isTechPill) {
                    tl.fromTo(node,
                        { scale: 0, opacity: 0, rotate: -10 },
                        { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: "back.inOut" },
                        i * stagger
                    );
                } else {
                    tl.fromTo(node,
                        { y: "200%" },
                        { y: "0%", duration: duration, ease: ease },
                        i * stagger
                    );
                }
            });
        },
        // REMOVED 'children' from dependencies. 
        // This stops GSAP from re-running the animation loop if React re-renders the DOM nodes on scroll.
        { scope: containerRef, dependencies: [duration, delay, ease, stagger, triggerStart, triggerRef] }
    );

    // Memoize node rendering so React doesn't recreate DOM structures unnecessarily during scrolls
    const renderedNodes = useMemo(() => {
        return Children.map(children, (child) => {
            if (typeof child === "string" || typeof child === "number") {
                const textStr = child.toString();
                const lines = textStr.split("\n");

                return lines.map((line, lineIndex) => {
                    const words = line.split(" ").filter((word) => word.length > 0);

                    return (
                        <Fragment key={`line-${lineIndex}`}>
                            {words.map((word, wordIndex) => {
                                if (byLetter) {
                                    const letters = Array.from(word);
                                    return (
                                        /* Word wrapper: no overflow-hidden so nothing clips the word as a whole */
                                        <span
                                            key={`word-${lineIndex}-${wordIndex}`}
                                            className="inline-block whitespace-nowrap mr-[0.25em]"
                                        >
                                            {letters.map((letter, letterIndex) => (
                                                /* Per-letter clip container: overflow-hidden + generous padding
                                                   so descenders (g, j, p, y) are never cut off */
                                                <span
                                                    key={`letter-${lineIndex}-${wordIndex}-${letterIndex}`}
                                                    className="inline-block overflow-hidden align-bottom"
                                                    style={{ paddingBottom: "0.2em", marginBottom: "-0.2em", paddingLeft: "0.05em", paddingRight: "0.05em", marginLeft: "-0.05em", marginRight: "-0.05em" }}
                                                >
                                                    <span
                                                        className="reveal-node inline-block will-change-transform"
                                                        style={{ transform: "translateY(200%)" }}
                                                    >
                                                        {letter}
                                                    </span>
                                                </span>
                                            ))}
                                        </span>
                                    );
                                }
                                return (
                                    <span
                                        key={`word-${lineIndex}-${wordIndex}`}
                                        className="relative inline-block overflow-hidden mr-[0.25em] pb-[0.1em]"
                                    >
                                        <span className="reveal-node inline-block will-change-transform" style={{ transform: "translateY(200%)" }}>
                                            {word}
                                        </span>
                                    </span>
                                );
                            })}
                            {lineIndex < lines.length - 1 && <span className="w-full block" aria-hidden="true" />}
                        </Fragment>
                    );
                });
            }

            if (isValidElement(child) && child.type === "br") {
                return <span className="w-full block" aria-hidden="true" />;
            }

            if (isValidElement(child)) {
                // @ts-ignore
                const hasNoReveal = typeof child.props?.className === 'string' && child.props.className.includes("no-reveal");

                if (hasNoReveal) {
                    return child;
                }

                return (
                    <span className="relative inline-block overflow-hidden mr-[0.25em] align-middle pb-[0.1em]">
                        <span className="reveal-node inline-block will-change-transform">
                            {child}
                        </span>
                    </span>
                );
            }

            return null;
        });
    }, [children, byLetter]);

    return (
        <p ref={containerRef} className={`flex flex-wrap items-end ${className}`}>
            {renderedNodes}
        </p>
    );
}
