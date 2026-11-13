"use client";

import { useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import { prefersReducedMotion } from "@/lib/gsap";

const ITEMS = ["SEO", "AI visibility", "Brand identity", "Websites", "Automation"];

function Row({ keyPrefix }: { keyPrefix: string }) {
  return (
    <>
      {ITEMS.map((t, i) => (
        <span key={keyPrefix + t} className="flex items-center gap-8 pr-8">
          <span
            className={`font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em] ${
              i % 2 ? "outline-text" : "text-paper"
            }`}
          >
            {t}
          </span>
          <Sparkles className="size-8 shrink-0 text-mint" />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const onScroll = (e: Event) => {
      const v = (e as CustomEvent<number>).detail ?? 0;
      el.style.setProperty("--skew", String(Math.max(-6, Math.min(6, -v * 0.35))));
    };
    window.addEventListener("lenis-scroll", onScroll);
    return () => window.removeEventListener("lenis-scroll", onScroll);
  }, []);

  return (
    <div className="on-dark overflow-hidden border-y border-white/10 bg-night-2 py-8" aria-hidden="true">
      <div ref={ref} className="marquee-skew">
        <div className="marquee-track">
          <Row keyPrefix="a" />
          <Row keyPrefix="b" />
          <Row keyPrefix="c" />
          <Row keyPrefix="d" />
        </div>
      </div>
    </div>
  );
}
