"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Drives `apply(progress 0..1)` from the scroll position of the returned ref's element.
 * No pinning: the element scrolls normally, progress runs while it crosses the viewport.
 * Reduced motion renders the final state.
 */
export function useScrub<T extends HTMLElement>(
  apply: (p: number) => void,
  start = "top 82%",
  end = "bottom 38%"
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      apply(1);
      return;
    }
    apply(0);
    let dead = false;
    let trigger: { kill: () => void } | undefined;
    loadGsap().then(({ ScrollTrigger }) => {
      if (dead) return;
      trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        scrub: 0.6,
        onUpdate: (self) => apply(self.progress),
      });
    });
    return () => {
      dead = true;
      trigger?.kill();
    };
  }, [apply, start, end]);
  return ref;
}
