"use client";

import { useEffect, useRef } from "react";

/**
 * Locomotive Scroll v5 Provider
 *
 * LS v5 wraps Lenis internally. Options are passed via `lenisOptions`.
 * Emits native window scroll events — Framer Motion's useScroll() works
 * transparently without any bridging.
 */
export function LocomotiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const locomotiveRef = useRef<InstanceType<
    typeof import("locomotive-scroll").default
  > | null>(null);

  useEffect(() => {
    const init = async () => {
      const { default: LocomotiveScroll } = await import("locomotive-scroll");

      locomotiveRef.current = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,
          duration: 1.2,
          smoothWheel: true,
          // No smooth on touch — avoids input lag on mobile
        },
      });
    };

    init();

    return () => {
      locomotiveRef.current?.destroy();
      locomotiveRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
