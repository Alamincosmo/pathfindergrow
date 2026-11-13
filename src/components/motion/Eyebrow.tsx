"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

export function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const [{ gsap }, { ScrambleTextPlugin }] = await Promise.all([
          loadGsap(),
          import("gsap/ScrambleTextPlugin"),
        ]);
        gsap.registerPlugin(ScrambleTextPlugin);
        gsap.to(el, {
          duration: 0.9,
          scrambleText: { text: children, chars: "01/<>_", speed: 0.7 },
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [children]);

  return (
    <p ref={ref} className={`t-label ${className}`}>
      {children}
    </p>
  );
}
