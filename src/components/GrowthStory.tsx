"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, MousePointerClick, Palette, Search, Workflow } from "lucide-react";
import { PILLARS } from "@/data/growthStudioData";
import { KineticIntro } from "@/components/motion/KineticIntro";
import { MaskedText } from "@/components/motion/MaskedText";
import { Reveal } from "@/components/motion/Reveal";
import { useScrub } from "@/components/motion/useScrub";

const ICONS = [Search, Palette, MousePointerClick, Workflow];

const CHIPS = [
  ["SEO", "GEO for AI answers", "Structured data", "Weekly AI checks"],
  ["Logo and mark", "Style guide", "Social and deck kit", "Figma system"],
  ["Fast Next.js sites", "UX with motion", "Booking and payments", "Web and mobile apps"],
  ["WhatsApp alerts", "CRM sync", "Backend and cache", "Cloud and monitoring"],
];

type Geo = { W: number; H: number; ys: number[]; wide: boolean };

/* One winding path runs through the whole section. Wide screens: down the middle. Phones: down the left edge. */
const xAt = (y: number, g: Geo) =>
  g.wide ? g.W / 2 + Math.sin((y / g.H) * Math.PI * 3.4) * g.W * 0.06 : 22 + Math.sin((y / g.H) * Math.PI * 3.4) * 9;

export default function GrowthStory() {
  const listRef = useRef<HTMLOListElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);
  const geoRef = useRef<Geo | null>(null);
  const lastP = useRef(0);

  const apply = useCallback((p: number) => {
    lastP.current = p;
    const g = geoRef.current;
    if (!g) return;
    const y = p * g.H;
    dotRef.current?.setAttribute("transform", `translate(${xAt(y, g)} ${y})`);
    progRef.current?.setAttribute("stroke-dashoffset", String(1 - p));
    nodeRefs.current.forEach((el, i) => {
      if (el) el.dataset.on = String(y >= g.ys[i] - 6);
    });
    /* the big numerals drift against the scroll for depth */
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `translate3d(0, ${(p - g.ys[i] / g.H) * -140}px, 0)`;
    });
  }, []);

  const wrapRef = useScrub<HTMLDivElement>(apply, "top 70%", "bottom 60%");

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const W = list.offsetWidth;
      const H = list.offsetHeight;
      const ys = [...list.querySelectorAll<HTMLElement>("[data-step]")].map((li) => li.offsetTop + 34);
      const wide = window.innerWidth >= 1024;
      setGeo((g) =>
        g && g.W === W && g.H === H && g.wide === wide && g.ys.every((y, i) => y === ys[i]) ? g : { W, H, ys, wide }
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    geoRef.current = geo;
    apply(lastP.current);
  }, [geo, apply]);

  let d = "";
  if (geo) {
    const pts: string[] = [];
    for (let y = 0; y <= geo.H; y += 10) pts.push(`${xAt(y, geo).toFixed(1)} ${y}`);
    d = `M${pts.join(" L")}`;
  }

  return (
    <section id="growth" className="on-dark bg-stage text-paper">
      <KineticIntro
        eyebrow="How we grow your business"
        title="Four jobs, *one team.*"
        story="Growth is four jobs in a row: get found, look established, turn visits into leads, then follow up automatically. One team does all four, so nothing gets lost between agencies. Follow the path."
        chips={PILLARS.map((p) => p.stage)}
        variant="camera"
      />

      <div ref={wrapRef} className="container-x pb-20 pt-8 lg:pb-32">
        <ol ref={listRef} className="relative space-y-20 lg:space-y-32">
          {/* the path */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {geo && (
              <>
                <svg width={geo.W} height={geo.H} className="absolute inset-0 overflow-visible">
                  <path d={d} fill="none" stroke="rgba(11,74,56,0.1)" strokeWidth="10" strokeLinecap="round" />
                  <path d={d} fill="none" stroke="rgba(11,74,56,0.3)" strokeWidth="1.5" strokeDasharray="2 9" strokeLinecap="round" />
                  <path
                    ref={progRef}
                    d={d}
                    pathLength={1}
                    fill="none"
                    stroke="#23AB82"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    strokeDashoffset="1"
                  />
                  <g ref={dotRef} transform={`translate(${xAt(0, geo)} 0)`}>
                    <circle r="16" fill="rgba(200,244,58,0.35)" />
                    <circle r="8" fill="#C8F43A" stroke="#07110E" strokeWidth="2.5" />
                  </g>
                </svg>
                {PILLARS.map((p, i) => {
                  const Icon = ICONS[i];
                  return (
                    <span
                      key={p.id}
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      data-on="false"
                      className="absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-emerald/60 bg-paper-2 text-emerald-ink shadow-[0_8px_18px_-8px_rgba(11,74,56,0.5)] transition-[transform,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-[on=true]:scale-[1.18] data-[on=true]:border-forest data-[on=true]:bg-forest data-[on=true]:text-lime"
                      style={{ left: xAt(geo.ys[i] ?? 0, geo), top: geo.ys[i] ?? 0 }}
                    >
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                  );
                })}
              </>
            )}
          </div>

          {PILLARS.map((p, i) => {
            const right = i % 2 === 1;
            return (
              <li key={p.id} data-step className="relative pl-16 lg:grid lg:grid-cols-2 lg:pl-0">
                <div className={right ? "lg:col-start-2 lg:pl-24" : "lg:col-start-1 lg:pr-24"}>
                  <span
                    ref={(el) => {
                      numRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="outline-text block font-display text-[clamp(4.5rem,11vw,9rem)] font-extrabold leading-[0.8] tracking-[-0.06em] will-change-transform"
                  >
                    {p.number}
                  </span>
                  <p className="t-label mt-5 text-emerald-ink">{p.stage}</p>
                  <MaskedText
                    text={p.title}
                    className="mt-3 font-display text-[clamp(1.875rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.035em]"
                  />
                  <Reveal delay={150}>
                    <p className="mt-4 max-w-xl text-muted">{p.promise}</p>
                    <ul className="mt-5 grid max-w-xl grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {CHIPS[i].map((c) => (
                        <li key={c} className="flex items-center gap-2.5 font-medium">
                          <Check className="size-4 shrink-0 text-emerald-ink" strokeWidth={2.5} />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
