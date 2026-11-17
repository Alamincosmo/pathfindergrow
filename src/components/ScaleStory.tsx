"use client";

import { useEffect, useRef } from "react";
import { KineticIntro } from "@/components/motion/KineticIntro";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

/* ---------- Africa dot map, generated once from a simplified outline ---------- */
const OUTLINE: [number, number][] = [
  [30, 8], [45, 6], [60, 8], [72, 11], [80, 14], [88, 17], [92, 16], [90, 24], [94, 32], [100, 40],
  [98, 50], [88, 58], [84, 66], [80, 78], [74, 88], [66, 96], [58, 100], [50, 102], [42, 96],
  [38, 84], [36, 72], [34, 62], [28, 58], [18, 56], [12, 52], [8, 44], [6, 36], [10, 28], [14, 20], [22, 14],
];

function inside(x: number, y: number) {
  let c = false;
  for (let i = 0, j = OUTLINE.length - 1; i < OUTLINE.length; j = i++) {
    const [xi, yi] = OUTLINE[i];
    const [xj, yj] = OUTLINE[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

const DOTS: [number, number][] = [];
for (let y = 6; y <= 104; y += 3.4) {
  for (let x = 4; x <= 102; x += 3.4) {
    if (inside(x, y)) DOTS.push([x, y]);
  }
}
/* One path per layer instead of ~1,000 <circle> nodes: far fewer DOM nodes to style and paint. */
const DOTS_D = DOTS.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0.01`).join("");
const ORIGIN = { x: 11, y: 44 }; // west coast: the ripple starts here

/* ---------- Counter ---------- */
function Count({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n: number) => Math.round(n).toLocaleString("en-US") + suffix;
    if (prefersReducedMotion()) {
      el.textContent = fmt(to);
      return;
    }
    el.textContent = fmt(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / dur);
          el.textContent = fmt(to * (1 - Math.pow(1 - t, 3)));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, suffix]);
  return <span ref={ref}>{to.toLocaleString("en-US") + suffix}</span>;
}

/* Elevation shadows, light from top-left: offset grows with height. */
const E2 = "shadow-[0_2px_6px_rgba(7,17,14,0.05),0_24px_48px_-24px_rgba(11,74,56,0.32)]";
const E3 = "shadow-[0_2px_6px_rgba(7,17,14,0.06),0_34px_70px_-30px_rgba(11,74,56,0.4)]";

const CLINIC_NODES = Array.from({ length: 14 }, (_, i) => {
  const a = (i / 14) * Math.PI * 2;
  const r = i % 2 ? 62 : 44;
  return { x: 80 + Math.cos(a) * r, y: 70 + Math.sin(a) * r * 0.8, d: (i * 0.23).toFixed(2) };
});

const LEARNERS = Array.from({ length: 28 }, (_, i) => ({
  x: 8 + ((i * 37) % 84),
  y: 10 + ((i * 53) % 70),
  d: ((i * 0.31) % 3).toFixed(2),
  s: 3 + (i % 3),
}));

export default function ScaleStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  /* Scroll reveals the bright map from the origin outward. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const set = (p: number) => {
      map.style.clipPath = `circle(${p * 135}% at ${ORIGIN.x}% ${ORIGIN.y}%)`;
    };
    if (prefersReducedMotion()) {
      set(1);
      return;
    }
    set(0);
    let dead = false;
    let trigger: { kill: () => void } | undefined;
    loadGsap().then(({ ScrollTrigger }) => {
      if (dead || !mapRef.current) return;
      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "top 15%",
        scrub: 0.6,
        onUpdate: (self) => set(self.progress),
      });
    });
    return () => {
      dead = true;
      trigger?.kill();
    };
  }, []);

  /* Pause loops until in view. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      el.dataset.live = e.isIntersecting ? "true" : "false";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Pointer parallax: tilt the whole stage a few degrees (fine pointers only). */
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const s = stageRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    s.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (stageRef.current) stageRef.current.style.transform = "";
  };

  return (
    <section
      ref={sectionRef}
      id="scale"
      data-live="false"
      aria-label="Platforms we have built"
      className="scale-scene on-dark relative isolate overflow-clip border-y border-white/10 bg-night-2 text-paper"
    >
      <div className="dot-field absolute inset-0 -z-10 opacity-60" />
      <KineticIntro
        eyebrow="Built to carry real traffic"
        title="Platforms that *real people use.*"
        story="This is our proof. Below are platforms we built and run, shown with the user numbers their own admin panels report. You get a team that has already carried real traffic, not just a portfolio of mock-ups."
        chips={["Music and radio", "Clinic software", "Messenger", "Learning"]}
        variant="rise"
      />
      <div className="container-x pb-16 pt-4 lg:pb-28">
        <div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="[perspective:1400px]"
        >
          <div
            ref={stageRef}
            className="grid gap-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:gap-5 lg:grid-cols-12 lg:gap-6 lg:[transform-style:preserve-3d]"
          >
            {/* ---------- Audiofrica ---------- */}
            <article
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-night-3 p-4 sm:rounded-3xl sm:p-7 lg:col-span-7 lg:[transform:translateZ(0px)] ${E3}`}
            >
              <p className="t-label text-mint">Audiofrica · music and radio for Africa</p>
              <div className="mt-4 grid items-center gap-5 sm:mt-6 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="font-display text-[clamp(2rem,9vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-mint">
                    <Count to={3000000} />
                  </p>
                  <p className="mt-2 text-muted-dark">users across the platform</p>
                  <p className="mt-4 font-display text-[clamp(1.5rem,6vw,2.25rem)] font-extrabold leading-none tracking-[-0.03em]">
                    <Count to={30} suffix="M+" />
                  </p>
                  <p className="mt-2 text-muted-dark">songs in the catalog</p>

                  <div className="eq mt-5 flex h-8 sm:mt-7 sm:h-10 items-end gap-1.5" aria-hidden="true">
                    {Array.from({ length: 18 }, (_, i) => (
                      <span
                        key={i}
                        className="eq-bar w-1.5 rounded-full bg-mint/80"
                        style={{ animationDelay: `${(i * 0.13) % 1.1}s`, height: "100%" }}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-[220px] sm:max-w-[300px]" aria-hidden="true">
                  <svg viewBox="0 0 108 108" className="absolute inset-0 size-full">
                    <path d={DOTS_D} stroke="rgba(14,107,80,0.2)" strokeWidth="1.9" strokeLinecap="round" fill="none" />
                  </svg>
                  <div ref={mapRef} className="absolute inset-0" style={{ clipPath: "circle(135% at 11% 44%)" }}>
                    <svg viewBox="0 0 108 108" className="size-full">
                      <path d={DOTS_D} stroke="#23AB82" strokeWidth="2.3" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                  <span
                    className="map-ping absolute size-4 rounded-full border-2 border-emerald"
                    style={{ left: `${(ORIGIN.x / 108) * 100}%`, top: `${(ORIGIN.y / 108) * 100}%` }}
                  />
                </div>
              </div>
              <p className="mt-4 text-[0.8125rem] text-muted-dark sm:mt-6 sm:text-sm">
                User total from the platform&apos;s own admin database (Nov 2026). Song count as stated on audiofrica.com. Map is illustrative.
              </p>
            </article>

            <div className="grid gap-6 lg:col-span-5">
              {/* ---------- Doctors Hero ---------- */}
              <article
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-night-3 p-4 sm:rounded-3xl sm:p-6 lg:[transform:translateZ(36px)] ${E2}`}
              >
                <p className="t-label text-sky">Doctors Hero · clinic software</p>
                <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4">
                  <div>
                    <p className="font-display text-[clamp(1.875rem,8vw,3rem)] font-extrabold leading-none tracking-[-0.04em]">
                      <Count to={500} />
                    </p>
                    <p className="mt-1 text-muted-dark">clinics</p>
                    <p className="mt-4 font-display text-[clamp(1.375rem,5vw,1.75rem)] font-extrabold leading-none tracking-[-0.03em]">
                      <Count to={50000} />
                    </p>
                    <p className="mt-1 text-muted-dark">patients served</p>
                  </div>
                  <svg viewBox="0 0 160 140" className="w-[104px] sm:w-[150px]" aria-hidden="true">
                    {CLINIC_NODES.map((n, i) => (
                      <line
                        key={`l${i}`}
                        x1="80"
                        y1="70"
                        x2={n.x}
                        y2={n.y}
                        stroke="rgba(75,179,240,0.4)"
                        strokeWidth="1"
                        strokeDasharray="3 4"
                        className="net-line"
                      />
                    ))}
                    {CLINIC_NODES.map((n, i) => (
                      <circle
                        key={`n${i}`}
                        cx={n.x}
                        cy={n.y}
                        r="3.4"
                        fill="#4BB3F0"
                        className="net-node"
                        style={{ animationDelay: `${n.d}s` }}
                      />
                    ))}
                    <circle cx="80" cy="70" r="9" fill="#FFFFFF" stroke="#4BB3F0" strokeWidth="2" />
                    <path d="M80 65v10M75 70h10" stroke="#4BB3F0" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="mt-3 text-[0.8125rem] text-muted-dark sm:mt-4 sm:text-sm">Figures as published on doctorshero.com. Our role: SEO and GEO.</p>
              </article>
            </div>
            {/* ---------- Supfrica ---------- */}
            <article
              className={`relative overflow-hidden rounded-2xl border border-white/10 bg-night-3 p-4 sm:rounded-3xl sm:p-6 lg:col-span-6 lg:[transform:translateZ(30px)] ${E2}`}
            >
              <p className="t-label text-mint">Supfrica · messenger and super-app</p>
              <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-4">
                <div>
                  <p className="font-display text-[clamp(1.875rem,8vw,3rem)] font-extrabold leading-none tracking-[-0.04em] text-mint">
                    <Count to={300000} />
                  </p>
                  <p className="mt-1 text-muted-dark">downloads (Play Store and direct APK)</p>
                  <p className="mt-4 font-display text-[clamp(1.375rem,5vw,1.75rem)] font-extrabold leading-none tracking-[-0.03em]">
                    <Count to={40000} />
                  </p>
                  <p className="mt-1 text-muted-dark">active users</p>
                </div>
                <div className="chat w-[104px] space-y-1.5 sm:w-[150px] sm:space-y-2" aria-hidden="true">
                  <span className="chat-b block h-5 sm:h-7 w-[70%] rounded-2xl rounded-bl-sm bg-white/10" />
                  <span className="chat-b block h-5 sm:h-7 w-[85%] translate-x-3 rounded-2xl rounded-br-sm bg-mint/80" style={{ animationDelay: "0.5s" }} />
                  <span className="chat-b block h-5 sm:h-7 w-[60%] rounded-2xl rounded-bl-sm bg-white/10" style={{ animationDelay: "1s" }} />
                  <span className="chat-b block h-5 sm:h-7 w-[75%] translate-x-3 rounded-2xl rounded-br-sm bg-mint/80" style={{ animationDelay: "1.5s" }} />
                </div>
              </div>
              <p className="mt-3 text-[0.8125rem] text-muted-dark sm:mt-4 sm:text-sm">Download and active-user totals from the platform&apos;s own admin data (Nov 2026).</p>
            </article>
            {/* ---------- Peko ---------- */}
              <article
                className={`relative overflow-hidden rounded-2xl border border-white/10 bg-night-3 p-4 sm:rounded-3xl sm:p-6 lg:col-span-6 lg:[transform:translateZ(54px)] ${E2}`}
              >
                <p className="t-label text-emerald-ink">PathFinder Peko · gamified learning app</p>
                <div className="relative mt-3 h-[96px] sm:mt-4 sm:h-[120px]" aria-hidden="true">
                  {LEARNERS.map((l, i) => (
                    <span
                      key={i}
                      className="learner absolute rounded-full bg-lime/80"
                      style={{ left: `${l.x}%`, top: `${l.y}%`, width: l.s, height: l.s, animationDelay: `${l.d}s` }}
                    />
                  ))}
                  <p className="absolute right-0 top-0 font-display text-[clamp(1.875rem,8vw,3rem)] font-extrabold leading-none tracking-[-0.04em]">
                    <Count to={5} />
                  </p>
                  <p className="absolute bottom-0 right-0 text-muted-dark">subjects, Class 9-10</p>
                </div>
              </article>
          </div>
        </div>
      </div>
    </section>
  );
}
