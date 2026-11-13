"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Check, MessageCircle, Search } from "lucide-react";
import { LogoMark } from "@/components/BrandLogo";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export function Mini({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-live={live}
      aria-hidden="true"
      className="mini relative h-[190px] overflow-hidden rounded-xl bg-stage"
    >
      <div className="absolute inset-0 opacity-60 [background:radial-gradient(60%_80%_at_50%_0%,rgba(53,224,161,0.16),transparent)]" />
      <div className="relative size-full">{children}</div>
    </div>
  );
}

export function FoundGraphic() {
  return (
    <div className="p-5">
      <div className="flex h-9 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 font-mono text-[0.8125rem] text-muted-dark">
        <Search className="size-4 text-mint" />
        best clinic software
        <span className="ml-0.5 inline-block h-4 w-px bg-mint" style={{ animation: "caret 1s steps(1) infinite" }} />
      </div>
      <div className="relative mt-4 h-[102px]">
        <div
          className="absolute inset-x-0 top-0 flex h-[30px] items-center gap-3 rounded-lg border border-mint/60 bg-mint/10 px-3"
          style={{ animation: `climb 5.5s ${EASE} infinite` }}
        >
          <span className="size-2 rounded-full bg-mint" />
          <span className="h-2 w-2/5 rounded bg-white/55" />
        </div>
        <div
          className="absolute inset-x-0 top-[34px] flex h-[30px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3"
          style={{ animation: `sink 5.5s ${EASE} infinite` }}
        >
          <span className="size-2 rounded-full bg-white/30" />
          <span className="h-2 w-1/2 rounded bg-white/25" />
        </div>
        <div
          className="absolute inset-x-0 top-[68px] flex h-[30px] items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3"
          style={{ animation: `sink 5.5s ${EASE} infinite` }}
        >
          <span className="size-2 rounded-full bg-white/30" />
          <span className="h-2 w-3/5 rounded bg-white/25" />
        </div>
      </div>
    </div>
  );
}

export function ChosenGraphic() {
  return (
    <div className="relative grid size-full place-items-center">
      <svg viewBox="0 0 120 120" className="absolute h-36 w-36">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="none"
          stroke="#35E0A1"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          transform="rotate(-90 60 60)"
          style={{ animation: "draw-loop 6s ease-in-out infinite" }}
        />
      </svg>
      <LogoMark className="relative h-20 w-auto" />
      <span
        className="absolute left-6 top-5 font-display text-3xl font-extrabold text-paper"
        style={{ animation: "pop-loop 6s ease-out infinite", transformOrigin: "left center" }}
      >
        Aa
      </span>
      <div className="absolute bottom-5 right-6 flex gap-2">
        {["#23AB82", "#4BB3F0", "#C8F43A"].map((c, i) => (
          <span
            key={c}
            className="size-5 rounded-full"
            style={{ background: c, animation: "pop-loop 6s ease-out infinite", animationDelay: `${i * 0.25}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ConvertGraphic() {
  return (
    <div className="p-5">
      <div className="h-[150px] rounded-lg border border-white/15 bg-white/5">
        <div className="flex h-6 items-center gap-1.5 border-b border-white/10 px-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2 rounded-full bg-white/25" />
          ))}
        </div>
        <div className="p-4">
          <div className="h-3 w-3/5 rounded bg-white/45" />
          <div className="mt-2 h-2 w-4/5 rounded bg-white/15" />
          <div className="relative mt-5 inline-block">
            <div
              className="rounded-full bg-lime px-4 py-2 text-[0.8125rem] font-bold text-ink"
              style={{ animation: "press 5s infinite" }}
            >
              Book now
            </div>
            <span
              className="absolute -right-3 -top-3 grid size-6 place-items-center rounded-full bg-mint text-ink"
              style={{ animation: "badge 5s infinite" }}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <svg
              viewBox="0 0 24 24"
              className="absolute left-1/2 top-1/2 size-6"
              style={{ animation: `cursor-move 5s ${EASE} infinite` }}
            >
              <path d="M5 3l14 7-6 2-2 6z" fill="#fff" stroke="#050D0A" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GrowGraphic() {
  const nodes = [
    { label: "Lead", Icon: MessageCircle },
    { label: "Reply", Icon: Bot },
    { label: "Booked", Icon: Check },
  ];
  return (
    <div className="grid size-full place-items-center px-8">
      <div className="relative w-full">
        <div className="absolute left-[9%] right-[9%] top-6 h-px bg-white/20">
          <span
            className="absolute -top-[4px] size-2.5 rounded-full bg-mint shadow-[0_0_14px_rgba(53,224,161,0.9)]"
            style={{ animation: `travel 4s ${EASE} infinite` }}
          />
        </div>
        <div className="relative flex justify-between">
          {nodes.map(({ label, Icon }) => (
            <div key={label} className="flex flex-col items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl border border-white/15 bg-night-3 text-mint">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="t-label text-[0.8125rem] text-muted-dark">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
