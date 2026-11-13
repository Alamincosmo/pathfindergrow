"use client";

import { Check } from "lucide-react";
import { FAQ_ITEMS, PILLARS } from "@/data/growthStudioData";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";
import { ChosenGraphic, ConvertGraphic, FoundGraphic, GrowGraphic, Mini } from "@/components/MiniGraphics";

const GRAPHICS = [FoundGraphic, ChosenGraphic, ConvertGraphic, GrowGraphic];

export default function GrowthCards() {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".spot");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--sx", `${e.clientX - r.left}px`);
    card.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };

  return (
    <section id="growth" className="section-y bg-paper">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-emerald-ink">How we grow your business</Eyebrow>
          <h2 className="t-display-l mt-4">
            Four jobs, <strong>one team.</strong>
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-muted">{FAQ_ITEMS[0].a}</p>
        </Reveal>

        <div onPointerMove={onMove} className="mt-14 grid gap-6 md:grid-cols-2">
          {PILLARS.map((p, i) => {
            const Graphic = GRAPHICS[i];
            return (
              <Reveal key={p.id} delay={(i % 2) * 90}>
                <article className="spot h-full rounded-2xl border border-[var(--line)] bg-card p-5 shadow-[0_20px_50px_-30px_rgba(7,17,14,0.35)] sm:p-6">
                  <Mini>
                    <Graphic />
                  </Mini>
                  <p className="t-label mt-6 text-emerald-ink">
                    {p.number} · {p.stage}
                  </p>
                  <h3 className="t-title mt-2">{p.title}</h3>
                  <p className="mt-3 text-muted">{p.promise}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-[var(--line)] pt-5">
                    {p.services.map((s) => (
                      <li key={s} className="flex gap-3 text-[0.9375rem]">
                        <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
