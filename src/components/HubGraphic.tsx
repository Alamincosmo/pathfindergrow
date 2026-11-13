"use client";

import { useEffect, useRef } from "react";
import { Globe, Palette, Search, Zap } from "lucide-react";
import { LogoMark } from "@/components/BrandLogo";
import { prefersReducedMotion } from "@/lib/gsap";

const NODES = [
  { label: "Search", x: 22, y: 22, depth: 14, fd: "0s", Icon: Search, tone: "text-mint" },
  { label: "Brand", x: 78, y: 22, depth: 20, fd: "-1.5s", Icon: Palette, tone: "text-sky" },
  { label: "Website", x: 22, y: 78, depth: 18, fd: "-3s", Icon: Globe, tone: "text-sky" },
  { label: "Automation", x: 78, y: 78, depth: 12, fd: "-4.5s", Icon: Zap, tone: "text-emerald-ink" },
];

const PATHS = [
  "M50 50 Q 30 40 22 22",
  "M50 50 Q 70 40 78 22",
  "M50 50 Q 30 60 22 78",
  "M50 50 Q 70 60 78 78",
];

export default function HubGraphic({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      role="img"
      aria-label="One system: search, brand, website and automation connected around Pathfinder Grow"
      className={`relative aspect-square w-full ${className}`}
    >
      <div className="hub-spin absolute inset-[2%] rounded-full border border-dashed border-white/10" style={{ "--sd": "70s" } as React.CSSProperties} aria-hidden="true" />
      <div className="hub-spin absolute inset-[18%] rounded-full border border-dashed border-mint/20" style={{ "--sd": "46s", animationDirection: "reverse" } as React.CSSProperties} aria-hidden="true" />
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
        {PATHS.map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgba(242,247,244,0.2)" strokeWidth="0.4" strokeDasharray="1.6 1.6" vectorEffect="non-scaling-stroke" />
            <circle r="1.4" fill="#35E0A1">
              <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2">
        <span className="hub-ring absolute inset-0 rounded-[28%] border border-mint/60" />
        <span className="hub-ring absolute inset-0 rounded-[28%] border border-mint/40" style={{ "--rd": "1.6s" } as React.CSSProperties} />
        <div className="relative grid size-full place-items-center rounded-[28%] border border-white/10 bg-night-3 shadow-[0_0_60px_-10px_rgba(35,171,130,0.35)]">
          <LogoMark className="h-[58%] w-auto" />
        </div>
      </div>

      {NODES.map(({ label, x, y, depth, fd, Icon, tone }) => (
        <div
          key={label}
          className="absolute"
          style={
            {
              left: `${x}%`,
              top: `${y}%`,
              "--depth": depth,
              transform:
                "translate(calc(-50% + var(--mx, 0) * var(--depth) * 1px), calc(-50% + var(--my, 0) * var(--depth) * 1px))",
              transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            } as React.CSSProperties
          }
        >
          <div
            className="hub-float flex w-[5.5rem] flex-col items-center gap-2 rounded-2xl border border-white/10 bg-night-3/90 px-2 py-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] sm:w-28 sm:py-4"
            style={{ "--fd": fd } as React.CSSProperties}
          >
            <Icon className={`size-6 sm:size-7 ${tone}`} strokeWidth={1.6} />
            <span className="t-label text-[0.8125rem] text-paper">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
