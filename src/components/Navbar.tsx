"use client";

import { useGSAP } from "@gsap/react";
import { MenuIcon, X } from "lucide-react"; // Swapped to X for open state visual indicator
import { useRef, useState, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeToggle } from "@/app/page";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar({ heroRef }: { heroRef: RefObject<HTMLElement | null> }) {
    const navbarRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    // Single useGSAP hook manages all initial settings and interaction setups securely
    useGSAP(() => {
        if (!navbarRef.current) return;

        const heroEl = document.querySelector("#hero");
        if (!heroEl) return;

        const navElement = navbarRef.current.querySelector(".nav");
        if (!navElement) return;

        // 1. ScrollTrigger reveal for the menu button (which is the collapsed .nav panel)
        gsap.fromTo(navElement,
            {
                opacity: 0,
                y: -20,
                pointerEvents: "none"
            },
            {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
                duration: 0.6,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: heroEl,
                    start: "top -80px",
                    toggleActions: "play none none reverse",
                    onLeaveBack: () => {
                        // Automatically close the menu when scrolling back up to the hero
                        gsap.to(navElement, {
                            clipPath: "circle(20px at calc(100% - 36px) 36px)",
                            duration: 0.6,
                            ease: "power3.inOut"
                        });
                        gsap.to(".nav-item", {
                            opacity: 0,
                            y: 10,
                            duration: 0.2,
                            overwrite: "auto"
                        });
                        setMenuOpen(false);
                    }
                },
            }
        );

    }, { scope: navbarRef });

    // 2. The trigger function handles both state and the animations safely
    const { contextSafe } = useGSAP({ scope: navbarRef });

    const toggleMenu = contextSafe(() => {
        const nextState = !menuOpen;
        setMenuOpen(nextState);

        const navElement = navbarRef.current?.querySelector(".nav");
        if (!navElement) return;

        if (nextState) {
            // Open animation: Smooth, symmetric clipPath expansion
            gsap.to(navElement, {
                clipPath: "circle(150% at calc(100% - 36px) 36px)",
                duration: 1.1,
                ease: "power4.inOut"
            });
            gsap.fromTo(".nav-item",
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "back.out", delay: 0.65, overwrite: "auto" }
            );
            gsap.fromTo(".nav-contact-link",
                { opacity: 0, filter: "blur(5px)", delay: 0.85, stagger: 0.09, },
                { opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.09, ease: "power3.out", delay: 0.85, overwrite: "auto" }
            )
        } else {
            // Close animation: snaps shut smoothly
            gsap.to(navElement, {
                clipPath: "circle(20px at calc(100% - 36px) 36px)",
                duration: 0.8,
                ease: "power4.inOut"
            });
            gsap.to(".nav-item", {
                opacity: 0,
                y: 10,
                duration: 0.2,
                delay: 0.2,
                overwrite: "auto"
            });
            gsap.to(".nav-contact-link", {
                opacity: 0,
                filter: "blur(5px)",
                duration: 0.6,
                stagger: 0.08,
                ease: "power3.out",
                overwrite: "auto"
            })
        }
    });

    return (
        <nav ref={navbarRef} className="fixed top-0 left-0 w-full z-50 p-4 bg-transparent">
            {/* 
              Tailwind Layout Container: Permanently mounted with initial clip-path mask
              and visibility hidden. Starts collapsed as a button at top-right.
            */}
            <div
                className="nav pointer-events-none fixed md:top-6 top-1 md:right-6 md:left-auto left-4 right-4 bg-[#121214]/90 border border-zinc-800/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col text-xl font-medium text-zinc-200 md:min-w-[240px]"
                style={{ clipPath: "circle(20px at calc(100% - 36px) 36px)" }}
            >
                {/* Toggle Button inside the container */}
                <div
                    onClick={toggleMenu}
                    className="nav-trigger w-10 h-10 flex items-center justify-center bg-zinc-800/40 hover:bg-zinc-700/50 rounded-full cursor-pointer absolute top-4 right-4 z-50 transition-colors pointer-events-auto"
                >
                    {menuOpen ? <X size={20} /> : <MenuIcon size={20} />}
                </div>


                <ThemeToggle />

                {/* Content links container */}
                <div className="flex flex-col gap-10 mt-8">
                    <div className="flex flex-col gap-2">
                        {["Work", "About", "Contact"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={toggleMenu}
                                className="nav-item cursor-pointer hover:text-white transition-colors font-inter tracking-tight"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="flex gap-2 justify-end mt-2">
                        {[{ name: "GitHub", link: "https://github.com/sohamparanjape12" }, { name: "Mail", link: "mailto:sohamparanjape1204@gmail.com" }, { name: "Linkedin", link: "www.linkedin.com/in/soham-paranjape-8b2473374" }].map((item) => (
                            <a key={item.name} href={item.link} className="nav-contact-link hover:text-white text-dim transition-colors cursor-pointer font-mona-sans tracking-tight text-sm lowercase">{item.name}</a>
                        ))}
                    </div>
                </div>
            </div>
        </nav >
    );
}
