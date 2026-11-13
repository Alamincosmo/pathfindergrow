"use client";

import { useCallback, useEffect, useRef } from "react";
import { Globe, Search, Sparkles, Zap } from "lucide-react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { clamp, seg } from "@/lib/anim";

const SENTENCES = [
  "Search brings them.",
  "Brand convinces them.",
  "Your website converts them.",
  "Automation keeps them.",
];
const ICONS = [Search, Sparkles, Globe, Zap];

/* Four closed shapes in a 100x100 box; MorphSVG blends between them. */
const poly = (n: number, rOut: number, rIn?: number) => {
  const pts: string[] = [];
  const steps = rIn ? n * 2 : n;
  for (let i = 0; i < steps; i++) {
    const r = rIn ? (i % 2 ? rIn : rOut) : rOut;
    const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)} ${(50 + Math.sin(a) * r).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z`;
};
const SHAPES = [
  "M50 6 A44 44 0 1 1 49.99 6 Z", // circle
  poly(8, 47, 33), // 8-point star
  "M20 6 H80 Q94 6 94 20 V80 Q94 94 80 94 H20 Q6 94 6 80 V20 Q6 6 20 6 Z", // rounded square
  poly(6, 46), // hexagon
];

export default function StatementBand() {
  const blockRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<HTMLElement[]>([]);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tl = useRef<{ progress: (v: number) => unknown; kill: () => void } | null>(null);

  const apply = useCallback((p: number) => {
    const words = wordRefs.current;
    const n = words.length || 1;
    words.forEach((w, i) => {
      const t = seg(p, (i / n) * 0.92, (i / n) * 0.92 + 0.08);
      w.style.opacity = String(0.55 + t * 0.45);
    });
    iconRefs.current.forEach((el, i) => {
      if (el) el.style.opacity = String(clamp(1 - Math.abs(p * 4 - (i + 0.5)) * 2, 0, 1));
    });
    if (orbRef.current) orbRef.current.style.transform = `rotate(${p * 160}deg)`;
    tl.current?.progress(p);
  }, []);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    wordRefs.current = [...block.querySelectorAll<HTMLElement>(".scroll-word")];
    if (prefersReducedMotion()) {
      apply(1);
      return;
    }
    apply(0);
    let dead = false;
    let trigger: { kill: () => void } | undefined;
    (async () => {
      const [{ gsap, ScrollTrigger }, { MorphSVGPlugin }] = await Promise.all([
        loadGsap(),
        import("gsap/MorphSVGPlugin"),
      ]);
      if (dead || !pathRef.current) return;
      gsap.registerPlugin(MorphSVGPlugin);
      const t = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
      t.to(pathRef.current, { morphSVG: SHAPES[1], duration: 0.14 }, 0.18)
        .to(pathRef.current, { morphSVG: SHAPES[2], duration: 0.14 }, 0.43)
        .to(pathRef.current, { morphSVG: SHAPES[3], duration: 0.14 }, 0.68)
        .to({}, { duration: 0.001 }, 0.999);
      tl.current = t;
      trigger = ScrollTrigger.create({
        trigger: block,
        start: "top 65%",
        end: "bottom 55%",
        scrub: 0.6,
        onUpdate: (self) => apply(self.progress),
      });
    })();
    return () => {
      dead = true;
      trigger?.kill();
      tl.current?.kill();
      tl.current = null;
    };
  }, [apply]);

  return (
    <section aria-label="What we do" className="on-dark relative isolate overflow-hidden bg-stage text-paper">
      <div className="container-x section-y">
        <div ref={blockRef} className="grid items-center gap-10 lg:grid-cols-12">
          <p className="t-display-l !leading-[1.12] !font-extrabold lg:col-span-8 [&>span.sentence]:block [&>span.sentence]:py-[0.12em]">
            {SENTENCES.map((s, si) => (
              <span key={si} className="sentence">
                {s.split(" ").map((w, wi) => (
                  <span
                    key={`${si}-${wi}`}
                    className={`scroll-word inline-block pr-[0.28em] ${wi === 0 ? "text-mint" : ""}`}
                  >
                    {w}
                  </span>
                ))}
              </span>
            ))}
          </p>

          <div className="relative mx-auto aspect-square w-[min(60vw,280px)] lg:col-span-4 lg:w-full lg:max-w-[320px]" aria-hidden="true">
            <div className="absolute inset-[-12%] rounded-full [background:radial-gradient(closest-side,rgba(35,171,130,0.22),transparent)]" />
            <div ref={orbRef} className="absolute inset-0 will-change-transform">
              <svg viewBox="0 0 100 100" className="size-full drop-shadow-[0_14px_18px_rgba(11,74,56,0.3)]">
                <defs>
                  <linearGradient id="orb-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#35E0A1" />
                    <stop offset="1" stopColor="#23AB82" />
                  </linearGradient>
                </defs>
                <path ref={pathRef} d={SHAPES[0]} fill="url(#orb-g)" />
              </svg>
            </div>
            {ICONS.map((Icon, i) => (
              <span
                key={i}
                ref={(el) => {
                  iconRefs.current[i] = el;
                }}
                className="absolute inset-0 grid place-items-center text-ink"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <Icon className="size-[28%]" strokeWidth={1.75} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
