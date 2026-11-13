"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

const SENTENCES = [
  "Search brings them.",
  "Brand convinces them.",
  "Your website converts them.",
  "Automation keeps them.",
];

export default function StatementBand() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>(".scroll-word");
    let dead = false;
    let tween: { kill: () => void; scrollTrigger?: { kill: () => void } } | undefined;
    loadGsap().then(({ gsap }) => {
      if (dead) return;
      tween = gsap.fromTo(
        words,
        { opacity: 0.55 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.14,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
    });
    return () => {
      dead = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    <section aria-label="What we do" className="on-dark relative isolate overflow-hidden bg-stage text-paper">
      <div className="container-x section-y">
        <p
          ref={ref}
          className="t-display-l max-w-5xl !leading-[1.08] !font-extrabold"
        >
          {SENTENCES.map((s, si) =>
            s.split(" ").map((w, wi) => (
              <span
                key={`${si}-${wi}`}
                className={`scroll-word inline-block pr-[0.28em] ${wi === 0 ? "text-mint" : ""}`}
              >
                {w}
              </span>
            ))
          )}
        </p>
      </div>
    </section>
  );
}
