"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Moves its content vertically against the scroll while the parent is in view.
 * speed 0.1 = the layer travels about 10% of its own height either way.
 * Half strength on small screens; off with prefers-reduced-motion.
 */
export function ParallaxLayer({
  children,
  speed = 0.1,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let dead = false;
    let mm: { revert: () => void } | undefined;

    loadGsap().then(({ gsap }) => {
      const el = ref.current;
      if (dead || !el) return;
      const media = gsap.matchMedia();
      media.add({ desktop: "(min-width: 768px)" }, (context) => {
        const conditions = (context as unknown as { conditions?: { desktop?: boolean } }).conditions;
        const amp = (conditions?.desktop ? 1 : 0.5) * speed * 100;
        gsap.fromTo(
          el,
          { yPercent: -amp },
          {
            yPercent: amp,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
      mm = media;
    });

    return () => {
      dead = true;
      mm?.revert();
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
