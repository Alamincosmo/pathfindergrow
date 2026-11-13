"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { FAQ_ITEMS, PILLARS } from "@/data/growthStudioData";
import { Reveal } from "@/components/motion/Reveal";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

const SHORT = ["Found", "Chosen", "Convert", "Grow"];

export default function GrowthSystem() {
  const [open, setOpen] = useState(0);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;
    if (prefersReducedMotion()) {
      fill.style.transform = "scaleY(1)";
      setActive(PILLARS.length - 1);
      return;
    }
    let dead = false;
    let trigger: { kill: () => void } | undefined;
    loadGsap().then(({ ScrollTrigger }) => {
      if (dead) return;
      trigger = ScrollTrigger.create({
        trigger: list,
        start: "top 65%",
        end: "bottom 65%",
        scrub: true,
        onUpdate: (self) => {
          fill.style.transform = `scaleY(${self.progress})`;
          setActive(Math.min(PILLARS.length - 1, Math.floor(self.progress * PILLARS.length)));
        },
      });
    });
    return () => {
      dead = true;
      trigger?.kill();
    };
  }, []);

  return (
    <section id="growth" className="section-y">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="t-label text-muted">How we grow your business</p>
          <h2 className="t-display-l mt-4">
            Four jobs, <strong>one team.</strong>
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-muted">{FAQ_ITEMS[0].a}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <div className="relative hidden lg:col-span-2 lg:block" aria-hidden="true">
            <div className="sticky top-32 h-[300px]">
              <div className="absolute bottom-0 left-[7px] top-0 w-px bg-[var(--line)]" />
              <div
                ref={fillRef}
                className="absolute bottom-0 left-[6px] top-0 w-[3px] origin-top bg-forest"
                style={{ transform: "scaleY(0)" }}
              />
              <ol className="relative flex h-full flex-col justify-between">
                {SHORT.map((label, i) => (
                  <li key={label} className="flex items-center gap-4">
                    <span
                      className={`size-4 rounded-full border-2 border-forest transition-colors duration-300 ${
                        i <= active ? "bg-forest" : "bg-paper"
                      }`}
                    />
                    <span
                      className={`t-label transition-colors duration-300 ${
                        i === active ? "text-ink" : "text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div ref={listRef} className="border-t border-[var(--line)] lg:col-span-10">
            {PILLARS.map((p, i) => {
              const isOpen = open === i;
              return (
                <div key={p.id} className="border-b border-[var(--line)]">
                  <h3>
                    <button
                      type="button"
                      id={`pillar-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`pillar-panel-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex min-h-[4.5rem] w-full items-center gap-4 py-5 text-left"
                    >
                      <span className="t-label w-8 shrink-0 text-muted">{p.number}</span>
                      <span className="flex-1">
                        <span className="t-label block text-emerald-ink">{p.stage}</span>
                        <span className="t-title mt-1 block">{p.title}</span>
                      </span>
                      <Plus
                        className={`size-6 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  </h3>
                  <div
                    id={`pillar-panel-${i}`}
                    role="region"
                    aria-labelledby={`pillar-btn-${i}`}
                    className="acc-panel"
                    data-open={isOpen}
                    inert={!isOpen}
                  >
                    <div>
                      <div className="pb-8 pl-12 pr-2">
                        <p className="max-w-2xl text-muted">{p.promise}</p>
                        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                          {p.services.map((s) => (
                            <li key={s} className="flex gap-3">
                              <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2} />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
