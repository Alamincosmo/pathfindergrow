"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pencil, Rocket, Search, TrendingUp } from "lucide-react";
import { PROCESS_STEPS } from "@/data/growthStudioData";
import { Reveal } from "@/components/motion/Reveal";
import { KineticIntro } from "@/components/motion/KineticIntro";
import { useScrub } from "@/components/motion/useScrub";

const ICONS = [Search, Pencil, Rocket, TrendingUp];

type Geo = { W: number; H: number; ys: number[] };

/* The road winds: x depends on how far down we are. */
const xAt = (y: number, g: Geo) => g.W / 2 + Math.sin((y / g.H) * Math.PI * 4) * g.W * 0.3;

const firstSentence = (s: string) => {
  const i = s.indexOf(". ");
  return i > 0 ? s.slice(0, i + 1) : s;
};

export default function Process() {
  const colRef = useRef<HTMLDivElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geo | null>(null);
  const geoRef = useRef<Geo | null>(null);
  const lastP = useRef(0);

  const apply = useCallback((p: number) => {
    lastP.current = p;
    const g = geoRef.current;
    if (!g) return;
    const y = p * g.H;
    dotRef.current?.setAttribute("cx", String(xAt(y, g)));
    dotRef.current?.setAttribute("cy", String(y));
    progRef.current?.setAttribute("stroke-dashoffset", String(1 - p));
    nodeRefs.current.forEach((el, i) => {
      if (el) el.dataset.on = String(y >= g.ys[i] - 4);
    });
  }, []);

  const listRef = useScrub<HTMLOListElement>(apply, "top 70%", "bottom 70%");

  useEffect(() => {
    const list = listRef.current;
    const col = colRef.current;
    if (!list || !col) return;
    const measure = () => {
      const W = col.offsetWidth;
      const H = list.offsetHeight;
      const ys = [...list.querySelectorAll<HTMLElement>("[data-step]")].map((li) => li.offsetTop + 26);
      setGeo((g) => (g && g.W === W && g.H === H && g.ys.every((y, i) => y === ys[i]) ? g : { W, H, ys }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, [listRef]);

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
    <section id="process" className="on-dark relative bg-night-2 text-paper">
      <KineticIntro
        eyebrow="How we work"
        title="Launch in *weeks, not months.*"
        story="A growth sprint takes 7 to 14 days. Larger builds with custom backends, mobile apps or automation take 3 to 5 weeks. Here is the road, four steps, and what lands in your hands at the end of each."
        chips={PROCESS_STEPS.map((s) => s.title)}
        variant="rise"
      />
      <div className="container-x pb-20 pt-4 lg:pb-32">
        <ol ref={listRef} className="relative space-y-14">
          {/* The road, drawn from measured geometry */}
          <div ref={colRef} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-full w-14 lg:w-24">
            {geo && (
              <>
                <svg width={geo.W} height={geo.H} className="absolute inset-0 overflow-visible">
                  <path d={d} fill="none" stroke="rgba(11,74,56,0.1)" strokeWidth="9" strokeLinecap="round" />
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
                  <circle ref={dotRef} cx={xAt(0, geo)} cy="0" r="9" fill="#C8F43A" stroke="#07110E" strokeWidth="2.5" />
                </svg>
                {PROCESS_STEPS.map((s, i) => {
                  const Icon = ICONS[i];
                  return (
                    <span
                      key={s.step}
                      ref={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      data-on="false"
                      className="group absolute grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-mint/60 bg-night-3 text-mint shadow-[0_8px_18px_-8px_rgba(11,74,56,0.5)] transition-[transform,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] data-[on=true]:scale-110 data-[on=true]:border-mint data-[on=true]:bg-mint data-[on=true]:text-[#F5F8F6]"
                      style={{ left: xAt(geo.ys[i] ?? 0, geo), top: geo.ys[i] ?? 0 }}
                    >
                      <Icon className="size-[18px]" strokeWidth={2} />
                    </span>
                  );
                })}
              </>
            )}
          </div>

          {PROCESS_STEPS.map((s, i) => (
            <li
              key={s.step}
              data-step
              className="relative pl-[4.5rem] lg:grid lg:grid-cols-12 lg:gap-10 lg:pl-32"
            >
              <Reveal delay={i * 60} className="lg:col-span-4">
                <p className="t-label text-mint">
                  {s.step} · {s.timeframe}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-none tracking-[-0.03em]">
                  {s.title}
                </h3>
              </Reveal>
              <Reveal delay={i * 60 + 80} className="mt-3 lg:col-span-8 lg:mt-0">
                <p className="max-w-2xl text-muted-dark">{firstSentence(s.description)}</p>
                <p className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full border border-white/12 bg-night-3 px-4 py-2 text-[0.9375rem]">
                  <span className="t-label text-mint">You get</span>
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
