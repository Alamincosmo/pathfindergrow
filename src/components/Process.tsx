"use client";

import { useEffect, useRef } from "react";
import { PROCESS_STEPS } from "@/data/growthStudioData";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    if (prefersReducedMotion()) {
      fill.style.transform = "scaleY(1)";
      return;
    }
    let dead = false;
    let trigger: { kill: () => void } | undefined;
    loadGsap().then(({ ScrollTrigger }) => {
      if (dead) return;
      trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 70%",
        end: "bottom 70%",
        scrub: true,
        onUpdate: (self) => {
          fill.style.transform = `scaleY(${self.progress})`;
        },
      });
    });
    return () => {
      dead = true;
      trigger?.kill();
    };
  }, []);

  return (
    <section id="process" className="section-y bg-paper-2">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-emerald-ink">How we work</Eyebrow>
          <h2 className="t-display-l mt-4">
            Launch in <strong>weeks, not months.</strong>
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-muted">
            A growth sprint takes 7 to 14 days. Larger builds with custom backends, mobile apps or
            automation take 3 to 5 weeks.
          </p>
        </Reveal>

        <ol ref={listRef} className="relative mt-14 space-y-12">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-[var(--line)]" aria-hidden="true" />
          <div
            ref={fillRef}
            aria-hidden="true"
            className="absolute bottom-0 left-[14px] top-0 w-[3px] origin-top bg-forest"
            style={{ transform: "scaleY(0)" }}
          />
          {PROCESS_STEPS.map((s, i) => (
            <li key={s.step} className="relative pl-14 lg:grid lg:grid-cols-12 lg:gap-10 lg:pl-16">
              <span className="absolute left-0 top-1 grid size-8 place-items-center rounded-full border-2 border-forest bg-paper-2 font-mono text-[0.8125rem] font-medium">
                {s.step}
              </span>
              <Reveal delay={i * 60} className="lg:col-span-4">
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="t-label mt-3 text-emerald-ink">{s.timeframe}</p>
              </Reveal>
              <Reveal delay={i * 60 + 80} className="mt-4 lg:col-span-8 lg:mt-0">
                <p className="max-w-2xl text-muted">{s.description}</p>
                <p className="mt-4">
                  <span className="t-label text-muted">You get </span>
                  <span className="font-medium">{s.deliverable}</span>
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
