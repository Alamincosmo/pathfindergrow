"use client";

import { useCallback, useEffect, useRef } from "react";
import { Check, Plus, Search, X } from "lucide-react";
import { CtaButton } from "@/components/TrackedLink";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { KineticIntro } from "@/components/motion/KineticIntro";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { ease, lerp, seg } from "@/lib/anim";

const QUESTION = "best clinic software for e-prescriptions in Bangladesh";

const STEPS = [
  { t: "Climb on Google", d: "SEO moves you from the bottom of page one to #1." },
  { t: "Switch to AI", d: "The same buyer asks an assistant." },
  { t: "Get named", d: "Clear, structured facts make you the cited source." },
];

/* Illustrative results. Only "yourbusiness.com" is meant to be the reader's own site. */
const RESULTS = [
  { site: "option-a.com", path: "› listings", title: "Clinic software: a general listing", line: "A general list of software vendors." },
  { site: "option-b.com", path: "› directory", title: "Hospital software directory", line: "Old directory page. Limited details." },
  { site: "option-c.com", path: "› blog", title: "Top 10 clinic tools (blog post)", line: "Features listed, no pricing shown." },
  { site: "option-d.com", path: "› forum", title: "Which clinic software do you use?", line: "Forum thread with mixed answers." },
  {
    site: "yourbusiness.com",
    path: "",
    title: "E-prescriptions, queue and records in one system",
    line: "Clear features. Prices published.",
    ours: true,
  },
];
const ROW_H = 60;

const SOURCES = [
  { site: "yourbusiness.com", title: "E-prescriptions, queue and records", cited: true },
  { site: "option-b.com", title: "Hospital software directory" },
  { site: "option-c.com", title: "Top 10 clinic tools" },
];

/* The AI Mode answer, revealed word by word. [text, bold] */
const ANSWER: [string, boolean][] = [
  ["For", false], ["e-prescriptions", false], ["in", false], ["Bangladesh,", false],
  ["yourbusiness.com", true], ["is", false], ["the", false], ["clearest", false], ["match.", false],
  ["It", false], ["lists", false], ["e-prescriptions,", false], ["a", false], ["live", false], ["queue", false],
  ["and", false], ["patient", false], ["records,", false], ["and", false], ["it", false], ["publishes", false],
  ["its", false], ["prices,", false], ["so", false], ["the", false], ["facts", false], ["are", false],
  ["easy", false], ["to", false], ["verify.", false],
];

const GOOGLE = [
  ["G", "#4285f4"],
  ["o", "#ea4335"],
  ["o", "#fbbc05"],
  ["g", "#4285f4"],
  ["l", "#34a853"],
  ["e", "#ea4335"],
] as const;

function Sparkle({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ai-star" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4285f4" />
          <stop offset="0.55" stopColor="#9b72cb" />
          <stop offset="1" stopColor="#d96570" />
        </linearGradient>
      </defs>
      <path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z" fill="url(#ai-star)" />
    </svg>
  );
}

function Mic() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" fill="#4285f4" />
      <path d="M17 11a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11z" fill="#34a853" />
      <path d="M7 11H5c0 .7.12 1.37.34 2L7 12.5z" fill="#fbbc05" />
      <path d="M17 11h2c0 .7-.12 1.37-.34 2L17 12.5z" fill="#ea4335" />
    </svg>
  );
}

function Lens() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path d="M4 8V6a2 2 0 0 1 2-2h2" fill="none" stroke="#ea4335" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" fill="none" stroke="#fbbc05" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2" fill="none" stroke="#34a853" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 20H6a2 2 0 0 1-2-2v-2" fill="none" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" fill="#4285f4" />
    </svg>
  );
}

const Favicon = ({ letter, ours }: { letter: string; ours?: boolean }) => (
  <span
    className={`grid size-[18px] shrink-0 place-items-center rounded-full text-[10px] font-bold uppercase ${
      ours ? "bg-lime text-ink" : "bg-[#e8eaed] text-[#5f6368]"
    }`}
  >
    {letter}
  </span>
);

type Pt = [number, number];
type Targets = { w: number; h: number; input: Pt; btn: Pt; ai: Pt };

/* Position of an element's center in the window's own (untilted) coordinates. */
function centerIn(win: HTMLElement, el: HTMLElement | null): Pt {
  if (!el) return [0, 0];
  let x = 0;
  let y = 0;
  let e: HTMLElement | null = el;
  while (e && e !== win) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent as HTMLElement | null;
  }
  return [x + el.offsetWidth / 2, y + el.offsetHeight / 2];
}

export default function GeoStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const winRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const resRefs = useRef<(HTMLLIElement | null)[]>([]);
  const rankRef = useRef<HTMLSpanElement>(null);
  const tabAiRef = useRef<HTMLSpanElement>(null);
  const tabAllRef = useRef<HTMLSpanElement>(null);
  const thinkRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const citeRef = useRef<HTMLSpanElement>(null);
  const askRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const drumOn = useRef(false);
  const size = useRef<Targets>({ w: 1, h: 1, input: [0, 0], btn: [0, 0], ai: [0, 0] });

  const CLICKS = [0.1, 0.36, 0.72];

  const cursorAt = (p: number): Pt => {
    const { w, h, input, btn, ai } = size.current;
    const path: [number, number, number][] = [
      [0, w * 0.9, h * 0.96],
      [0.1, input[0] - 40, input[1]],
      [0.3, input[0] - 40, input[1]],
      [0.36, btn[0], btn[1]],
      [0.5, btn[0], btn[1]],
      [0.62, w * 0.5, h * 0.7],
      [0.66, w * 0.5, h * 0.7],
      [0.72, ai[0], ai[1]],
      [0.88, ai[0], ai[1]],
      [0.96, w * 0.58, h * 0.62],
    ];
    for (let i = 0; i < path.length - 1; i++) {
      const [p0, x0, y0] = path[i];
      const [p1, x1, y1] = path[i + 1];
      if (p <= p1) {
        const t = ease(seg(p, p0, p1));
        return [lerp(x0, x1, t), lerp(y0, y1, t)];
      }
    }
    const last = path[path.length - 1];
    return [last[1], last[2]];
  };

  const apply = useCallback((p: number) => {
    const { w, h } = size.current;

    const [cx, cy] = cursorAt(p);
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      cursorRef.current.style.opacity = w > 1 ? "1" : "0";
    }
    if (rippleRef.current) {
      let k = 0;
      for (const c of CLICKS) if (p >= c && p < c + 0.06) k = seg(p, c, c + 0.06);
      rippleRef.current.style.opacity = k ? String(1 - k) : "0";
      rippleRef.current.style.transform = `scale(${0.4 + k * 1.6})`;
    }
    const typed = Math.round(seg(p, 0.12, 0.3) * QUESTION.length);
    if (typedRef.current) typedRef.current.textContent = QUESTION.slice(0, typed);
    if (clearRef.current) clearRef.current.style.opacity = typed > 0 ? "1" : "0";

    /* SEO phase: results appear, ours climbs from #5 to #1 */
    const listIn = ease(seg(p, 0.38, 0.45));
    const listOut = ease(seg(p, 0.74, 0.8));
    const climb = ease(seg(p, 0.46, 0.62));
    if (listRef.current) {
      listRef.current.style.opacity = String(listIn * (1 - listOut));
    }
    resRefs.current.forEach((el, i) => {
      if (!el) return;
      const ours = i === RESULTS.length - 1;
      const idx = ours ? lerp(RESULTS.length - 1, 0, climb) : lerp(i, i + 1, climb);
      const lift = ours ? Math.sin(climb * Math.PI) : 0;
      el.style.transform = `translate3d(0, ${idx * ROW_H}px, 0) scale(${1 + lift * 0.03})`;
      el.style.zIndex = ours ? "2" : "1";
      el.dataset.hot = ours && p > 0.45 ? "true" : "false";
      el.style.boxShadow = ours
        ? `0 ${2 + lift * 6}px ${4 + lift * 8}px rgba(11,74,56,${0.12 + lift * 0.1}), 0 ${10 + lift * 24}px ${20 + lift * 32}px rgba(11,74,56,${0.14 + lift * 0.14})`
        : "";
    });
    if (rankRef.current) {
      rankRef.current.textContent = `#${Math.max(1, Math.round(lerp(5, 1, climb)))}`;
    }

    /* Switch to the AI Mode tab */
    const ai = p >= 0.72;
    if (tabAiRef.current) tabAiRef.current.dataset.on = String(ai);
    if (tabAllRef.current) tabAllRef.current.dataset.on = String(!ai);

    const think = seg(p, 0.76, 0.8) * (1 - seg(p, 0.82, 0.86));
    if (thinkRef.current) thinkRef.current.style.opacity = String(think);
    const ans = ease(seg(p, 0.82, 0.86));
    if (answerRef.current) {
      answerRef.current.style.opacity = String(ans);
      answerRef.current.style.transform = `translate3d(0, ${(1 - ans) * 18}px, 0)`;
    }
    wordRefs.current.forEach((el, i) => {
      if (!el) return;
      const a = 0.84 + (i / ANSWER.length) * 0.1;
      el.style.opacity = String(0.08 + 0.92 * ease(seg(p, a, a + 0.03)));
    });
    rowRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = ease(seg(p, 0.86 + i * 0.03, 0.93 + i * 0.03));
      el.style.opacity = String(t);
      el.style.transform = `translate3d(${(1 - t) * 18}px, 0, 0)`;
      if (i === 0) el.dataset.cited = p > 0.95 ? "true" : "false";
    });
    if (citeRef.current) {
      const t = ease(seg(p, 0.95, 0.98));
      citeRef.current.style.opacity = String(t);
      citeRef.current.style.transform = `scale(${0.7 + t * 0.3})`;
    }
    if (askRef.current) askRef.current.style.opacity = String(ease(seg(p, 0.84, 0.9)));

    /* Steps ride a vertical drum: each one rises into the centre, holds while its scene plays,
       then rolls up and away over the curve. f = which step is in the centre (0..2). */
    const keys: [number, number][] = [[0, 0], [0.4, 0], [0.52, 1], [0.78, 1], [0.9, 2], [1, 2]];
    let f = 2;
    for (let i = 0; i < keys.length - 1; i++) {
      if (p <= keys[i + 1][0]) {
        f = lerp(keys[i][1], keys[i + 1][1], ease(seg(p, keys[i][0], keys[i + 1][0])));
        break;
      }
    }
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      if (!drumOn.current) {
        el.style.transform = "";
        el.style.opacity = "";
        return;
      }
      const d = i - f;
      const a = Math.abs(d);
      el.style.opacity = String(Math.max(0.1, 1 - a * 0.62));
      el.style.transform = `translate3d(0, -50%, 0) translate3d(0, ${d * 128}px, ${-a * 110}px) rotateX(${-d * 34}deg) scale(${1 - a * 0.08})`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const win = winRef.current;
    if (!wrap || !win) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let dead = false;
    let trigger: { kill: () => void } | undefined;

    const measure = () => {
      size.current = {
        w: win.offsetWidth || 1,
        h: win.offsetHeight || 1,
        input: centerIn(win, inputRef.current),
        btn: centerIn(win, btnRef.current),
        ai: centerIn(win, tabAiRef.current),
      };
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(win);

    const setup = async () => {
      trigger?.kill();
      trigger = undefined;
      if (prefersReducedMotion() || !mq.matches) {
        drumOn.current = false;
        apply(1);
        return;
      }
      const { ScrollTrigger } = await loadGsap();
      if (dead) return;
      drumOn.current = true;
      apply(0);
      trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => apply(self.progress),
      });
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      dead = true;
      trigger?.kill();
      ro.disconnect();
      mq.removeEventListener("change", setup);
    };
  }, [apply]);

  const tabCls =
    "relative whitespace-nowrap pb-2.5 pt-1 text-[13px] text-[#5f6368] transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:scale-x-0 after:rounded-t-full after:bg-[#1a73e8] after:transition-transform after:duration-300 data-[on=true]:text-[#1a73e8] data-[on=true]:after:scale-x-100";

  return (
    <section id="geo" className="on-dark relative isolate overflow-clip bg-night-2 text-paper">
      <ParallaxLayer speed={0.06} className="absolute -inset-y-[8%] inset-x-0 -z-10">
        <div className="dot-field absolute inset-0" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.14} className="absolute -inset-y-[10%] inset-x-0 -z-10">
        <div className="absolute left-1/2 top-1/3 size-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(35,171,130,0.3),transparent)]" />
      </ParallaxLayer>

      <KineticIntro
        eyebrow="Search is changing"
        title="Rank on Google. *Get named by AI.*"
        story="Your buyers now search on Google and ask AI assistants. We lift you to the top of the results, then structure your facts so the assistant names you as the source. Scroll on to watch it happen."
        chips={["SEO for Google", "GEO for AI answers", "Structured data"]}
        variant="wipe"
      />

      <div ref={wrapRef} className="relative lg:h-[330vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <div className="container-x grid w-full gap-8 pb-12 pt-4 lg:grid-cols-12 lg:items-center lg:pb-0 lg:pt-16">
            <ol className="relative min-w-0 space-y-8 [perspective:900px] lg:col-span-4 lg:h-[26rem] lg:space-y-0">
              {STEPS.map((s, i) => (
                <li
                  key={s.t}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="will-change-transform lg:absolute lg:inset-x-0 lg:top-1/2"
                >
                  <span className="t-label text-emerald-ink">0{i + 1}</span>
                  <span className="mt-2 block font-display text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.04em]">
                    {s.t}
                  </span>
                  <span className="mt-2 block max-w-xs text-muted">{s.d}</span>
                </li>
              ))}
            </ol>

            <div className="min-w-0 lg:col-span-8 [perspective:1400px]">
              {/* A Google results page in its dark theme. Illustration only. */}
              <div
                ref={winRef}
                className="relative mx-auto w-full max-w-[600px] overflow-hidden rounded-2xl bg-[#ffffff] font-[Arial,Helvetica,sans-serif] text-[#202124] shadow-[0_2px_6px_rgba(7,17,14,0.08),0_34px_70px_-24px_rgba(11,74,56,0.4)] ring-1 ring-[#07110E]/10 lg:[transform:rotateY(-6deg)_rotateX(3deg)]"
              >
                {/* Logo + search box */}
                <div className="flex items-center gap-3 px-4 pt-4 sm:gap-5">
                  <span className="select-none text-[22px] font-medium tracking-[-0.04em] sm:text-[26px]" aria-label="Google-style search">
                    {GOOGLE.map(([c, col], i) => (
                      <span key={i} style={{ color: col }}>
                        {c}
                      </span>
                    ))}
                  </span>
                  <div
                    ref={inputRef}
                    className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full bg-[#ffffff] pl-4 pr-2 shadow-[0_1px_6px_rgba(32,33,36,0.28)] ring-1 ring-[#dfe1e5]"
                  >
                    <span className="min-w-0 flex-1 truncate text-[14px] sm:text-[15px]">
                      <span ref={typedRef}>{QUESTION}</span>
                      <span className="ml-px inline-block h-[18px] w-px translate-y-[3px] animate-pulse bg-[#202124]" />
                    </span>
                    <span ref={clearRef} className="text-[#5f6368]">
                      <X className="size-[18px]" strokeWidth={2} />
                    </span>
                    <span className="hidden h-6 w-px bg-[#dadce0] sm:block" />
                    <span className="hidden sm:block">
                      <Mic />
                    </span>
                    <span className="hidden sm:block">
                      <Lens />
                    </span>
                    <span ref={btnRef} className="grid size-8 place-items-center rounded-full text-[#4285f4]">
                      <Search className="size-[18px]" strokeWidth={2.4} />
                    </span>
                  </div>
                </div>

                {/* Tabs: AI Mode first, then All, like Google */}
                <div className="mt-3 flex gap-5 overflow-x-auto border-b border-[#dadce0] px-4 sm:gap-6">
                  <span ref={tabAiRef} data-on="false" className={`${tabCls} inline-flex items-center gap-1.5`}>
                    <Sparkle className="size-3.5" />
                    AI Mode
                  </span>
                  <span ref={tabAllRef} data-on="true" className={tabCls}>
                    All
                  </span>
                  {["Images", "Videos", "News", "Shopping"].map((t) => (
                    <span key={t} data-on="false" className={`${tabCls} hidden sm:inline`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="relative h-[25rem] px-4 pt-3 sm:h-[19.25rem]">
                  {/* Classic results */}
                  <ul ref={listRef} className="absolute inset-x-4 top-3" style={{ opacity: 0 }}>
                    {RESULTS.map((r, i) => (
                      <li
                        key={r.site}
                        ref={(el) => {
                          resRefs.current[i] = el;
                        }}
                        data-hot="false"
                        style={{ height: ROW_H - 6, transform: `translate3d(0, ${i * ROW_H}px, 0)` }}
                        className="absolute inset-x-0 top-0 flex items-center gap-3 rounded-lg px-2 transition-colors data-[hot=true]:bg-[#eef7f2] data-[hot=true]:ring-1 data-[hot=true]:ring-emerald/70"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2 text-[12px] leading-none">
                            <Favicon letter={r.site[0]} ours={r.ours} />
                            <span className="truncate text-[#202124]">{r.site}</span>
                            <span className="truncate text-[#5f6368]">{r.path}</span>
                          </span>
                          <span className="mt-1 block truncate text-[15px] leading-tight text-[#1a0dab]">{r.title}</span>
                          <span className="block truncate text-[12px] text-[#5f6368]">{r.line}</span>
                        </span>
                        {r.ours && (
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-lime px-2 py-0.5 font-mono text-[11px] font-semibold text-ink">
                            <span ref={rankRef}>#5</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  {/* AI Mode: thinking, then answer with sources */}
                  <div
                    ref={thinkRef}
                    style={{ opacity: 0 }}
                    className="absolute inset-x-4 top-4 flex items-center gap-2 text-[13px] text-[#5f6368]"
                  >
                    <Sparkle className="size-4 animate-pulse" />
                    <span>Searching and reading sources</span>
                  </div>

                  <div
                    ref={answerRef}
                    className="absolute inset-x-4 top-3 flex flex-col gap-4 sm:flex-row sm:gap-5"
                    style={{ opacity: 0 }}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-2 text-[12px] font-medium text-[#4d5156]">
                        <Sparkle className="size-4" />
                        AI Mode
                      </p>
                      <p className="mt-2.5 text-[14px] leading-[1.65] text-[#202124]">
                        {ANSWER.map(([w, b], i) => (
                          <span key={i}>
                            <span
                              ref={(el) => {
                                wordRefs.current[i] = el;
                              }}
                              className={b ? "font-bold" : ""}
                            >
                              {w}
                            </span>{" "}
                          </span>
                        ))}
                        <span className="ml-0.5 inline-grid size-4 place-items-center rounded-full bg-[#e8eaed] align-middle text-[10px] text-[#1a0dab]">
                          1
                        </span>
                      </p>
                    </div>
                    <ol className="w-full shrink-0 space-y-2 sm:w-[42%]">
                      {SOURCES.map((s, i) => (
                        <li
                          key={s.site}
                          ref={(el) => {
                            rowRefs.current[i] = el;
                          }}
                          data-cited="false"
                          className="relative flex items-center gap-2.5 rounded-xl bg-[#f1f3f4] px-3 py-2.5 ring-1 ring-transparent transition-[box-shadow] duration-300 data-[cited=true]:ring-emerald data-[cited=true]:shadow-[0_0_0_4px_rgba(35,171,130,0.16)]"
                        >
                          <Favicon letter={s.site[0]} ours={s.cited} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[12px] text-[#4d5156]">{s.site}</span>
                            <span className="block truncate text-[13px] leading-tight text-[#1a0dab]">{s.title}</span>
                          </span>
                          {s.cited && (
                            <span
                              ref={citeRef}
                              style={{ opacity: 0 }}
                              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-lime px-2 py-0.5 text-[11px] font-semibold text-ink"
                            >
                              <Check className="size-3" strokeWidth={3} />
                              Cited
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* AI Mode follow-up box */}
                <div ref={askRef} className="px-4 pb-4" style={{ opacity: 0 }}>
                  <div className="flex h-10 items-center gap-3 rounded-full bg-[#f1f3f4] px-4 text-[13px] text-[#5f6368]">
                    <Plus className="size-4 text-[#4d5156]" strokeWidth={2} />
                    Ask anything
                    <span className="ml-auto">
                      <Mic />
                    </span>
                  </div>
                </div>

                {/* Ghost cursor lives inside the tilted window so it tilts with it */}
                <div
                  ref={cursorRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-0 z-10 will-change-transform"
                  style={{ transform: "translate3d(0,0,0)", opacity: 0 }}
                >
                  <span
                    ref={rippleRef}
                    className="absolute -left-4 -top-4 size-8 rounded-full border-2 border-emerald"
                    style={{ opacity: 0 }}
                  />
                  <svg width="24" height="24" viewBox="0 0 24 24" className="drop-shadow-[2px_4px_4px_rgba(7,17,14,0.35)]">
                    <path d="M3 2l7.5 19 2.7-8 8-2.8z" fill="#fff" stroke="#07110E" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-center text-sm text-muted-dark">
                Illustration in the style of a Google results page. Not a real result and not a client result.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-x pb-20 pt-10 lg:pb-28">
        <CtaButton variant="lime" location="geo">
          Check how AI sees my business
        </CtaButton>
      </div>
    </section>
  );
}
