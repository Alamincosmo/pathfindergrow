"use client";

import { useCallback, useEffect, useRef } from "react";
import { useScrub } from "@/components/motion/useScrub";
import { LivingBackground } from "@/components/motion/LivingBackground";
import { ease, lerp, seg } from "@/lib/anim";

/**
 * Screen-lock intro for a section. The screen holds still (sticky) while the section's
 * name, headline and a short "what is this, what do you get" story play in with the scroll,
 * then the whole block floats up and dissolves and the real content scrolls in.
 *
 * Headline markup: wrap the hero words in *asterisks* (they get the green gradient).
 *
 * Variants (one per section so the page does not repeat itself):
 *  - rise:   masked words rise from below with a 3D tilt and clear from blur.
 *  - camera: words start big and soft, as if close to the lens, and settle into place.
 *  - wipe:   words are revealed left to right behind a moving edge.
 *  - type:   letter by letter, each letter lifting into place.
 */
export type KineticVariant = "rise" | "camera" | "wipe" | "type";

type Unit = { text: string; hero: boolean; word: number };

function parse(title: string, variant: KineticVariant) {
  const words = title.split("*").flatMap((part, i) =>
    part
      .split(/\s+/)
      .filter(Boolean)
      .map((text) => ({ text, hero: i % 2 === 1 }))
  );
  const units: Unit[] = [];
  words.forEach((w, wi) => {
    if (variant === "type") w.text.split("").forEach((c) => units.push({ text: c, hero: w.hero, word: wi }));
    else units.push({ text: w.text, hero: w.hero, word: wi });
  });
  return { words, units };
}

const blur = (px: number) => (px > 0.15 ? `blur(${px.toFixed(2)}px)` : "none");

export function KineticIntro({
  eyebrow,
  title,
  story,
  chips = [],
  variant = "rise",
  id,
}: {
  eyebrow: string;
  title: string;
  story: string;
  chips?: string[];
  variant?: KineticVariant;
  id?: string;
}) {
  const { words, units } = parse(title, variant);
  const storyWords = story.split(/\s+/).filter(Boolean);

  const stageRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLParagraphElement>(null);
  const rule = useRef<HTMLSpanElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLUListElement>(null);
  const uw = useRef<(HTMLSpanElement | null)[]>([]);
  const sw = useRef<(HTMLSpanElement | null)[]>([]);
  const cw = useRef<(HTMLLIElement | null)[]>([]);

  const apply = useCallback(
    (p: number) => {
      stageRef.current?.style.setProperty("--p", p.toFixed(4));

      /* 1. section name */
      const e = ease(seg(p, 0, 0.08));
      if (eyeRef.current) {
        eyeRef.current.style.opacity = String(e);
        eyeRef.current.style.transform = `translate3d(0, ${(1 - e) * 14}px, 0)`;
      }
      if (rule.current) rule.current.style.transform = `scaleX(${ease(seg(p, 0.02, 0.16))})`;

      /* 2. headline, one unit at a time */
      const N = units.length;
      const type = variant === "type";
      uw.current.forEach((el, i) => {
        if (!el) return;
        const a = 0.03 + (i / N) * (type ? 0.26 : 0.24);
        const t = seg(p, a, a + (type ? 0.07 : 0.15));
        const k = ease(t);
        if (variant === "rise") {
          el.style.opacity = String(k);
          el.style.transform = `perspective(900px) translate3d(0, ${120 * (1 - k)}%, 0) rotateX(${-25 * (1 - k)}deg)`;
          el.style.filter = blur(12 * (1 - k));
        } else if (variant === "camera") {
          el.style.opacity = String(seg(t, 0, 0.5));
          el.style.transform = `scale(${lerp(2.3, 1, k)})`;
          el.style.filter = blur(14 * (1 - k));
        } else if (variant === "wipe") {
          el.style.opacity = t > 0 ? "1" : "0";
          el.style.clipPath = `inset(-20% ${(100 * (1 - k)).toFixed(2)}% -20% 0)`;
          el.style.transform = `translate3d(${-26 * (1 - k)}px, 0, 0)`;
        } else {
          el.style.opacity = String(k);
          el.style.transform = `translate3d(0, ${0.5 * (1 - k)}em, 0)`;
          el.style.filter = blur(5 * (1 - k));
        }
      });

      /* 3. story + chips */
      const s = ease(seg(p, 0.3, 0.44));
      if (storyRef.current) {
        storyRef.current.style.opacity = String(s);
      }
      const M = storyWords.length;
      sw.current.forEach((el, i) => {
        if (!el) return;
        const a = 0.3 + (i / M) * 0.16;
        const t = ease(seg(p, a, a + 0.07));
        el.style.opacity = String(0.06 + 0.94 * t);
        el.style.transform = `translate3d(0, ${(1 - t) * 0.5}em, 0)`;
      });
      cw.current.forEach((el, i) => {
        if (!el) return;
        const a = 0.46 + i * 0.04;
        const t = ease(seg(p, a, a + 0.08));
        el.style.opacity = String(t);
        el.style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`;
      });

      /* 4. exit: the block floats up, shrinks a little, blurs and dissolves */
      const x = ease(seg(p, 0.8, 1));
      const hide = x >= 0.995 ? "hidden" : "visible";
      const exit = (el: HTMLElement | null, rise: number, scale: number, delay: number) => {
        if (!el) return;
        const k = Math.min(1, x * (1 + delay));
        el.style.transform = `translate3d(0, ${-rise * k}px, 0) scale(${1 - scale * k})`;
        el.style.opacity = String(Math.max(0, 1 - k * 1.2));
        el.style.filter = blur(k * 14);
        el.style.visibility = hide;
      };
      exit(headRef.current, 200, 0.14, 0);
      exit(storyRef.current, 130, 0.08, 0.1);
      exit(chipsRef.current, 90, 0.05, 0.2);
      if (eyeRef.current && x > 0) {
        eyeRef.current.style.opacity = String(Math.max(0, 1 - x * 1.6));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, story, variant]
  );

  const ref = useScrub<HTMLDivElement>(apply, "top top", "bottom bottom");

  /* Pointer depth (mouse only) and pause the loops while the stage is off screen. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const lb = stage.querySelector<HTMLElement>(".lb");
    const io = new IntersectionObserver(([en]) => {
      if (lb) lb.dataset.live = en.isIntersecting ? "true" : "false";
    });
    io.observe(stage);
    const onMove = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      const r = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", ((ev.clientX - r.left) / r.width - 0.5).toFixed(3));
      stage.style.setProperty("--my", ((ev.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    stage.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      stage.removeEventListener("pointermove", onMove);
    };
  }, []);

  let ui = -1;

  return (
    <div ref={ref} id={id} data-kl="init" className="kl relative h-[240svh] text-ink lg:h-[280svh]">
      <div ref={stageRef} className="sticky top-0 flex h-[100svh] items-center overflow-clip">
        <LivingBackground />

        <div className="container-x w-full pb-8 pt-20">
          <p ref={eyeRef} className="kw t-label flex items-center gap-3 text-emerald-ink">
            <span
              ref={rule}
              aria-hidden="true"
              className="block h-px w-10 origin-left bg-emerald-ink sm:w-16"
              style={{ transform: "scaleX(0)" }}
            />
            {eyebrow}
          </p>

          <div ref={headRef} className="mt-5 will-change-transform">
            <h2 className="max-w-5xl font-display text-[clamp(2.6rem,9vw,6.5rem)] font-extrabold leading-[1.04] tracking-[-0.045em]">
              {words.map((w, wi) => {
                const chars = variant === "type" ? units.filter((u) => u.word === wi) : [units[wi]];
                const inner = chars.map((u) => {
                  ui += 1;
                  const idx = ui;
                  return (
                    <span
                      key={idx}
                      ref={(el) => {
                        uw.current[idx] = el;
                      }}
                      className={`kw inline-block will-change-transform ${u.hero ? "grad-text" : ""} ${
                        variant === "rise" ? "origin-bottom" : "origin-left"
                      }`}
                    >
                      {u.text}
                    </span>
                  );
                });
                return (
                  <span key={wi}>
                    {variant === "rise" ? (
                      <span className="inline-block overflow-hidden pb-[0.16em] align-bottom -mb-[0.16em]">{inner}</span>
                    ) : (
                      <span className="inline-block whitespace-nowrap">{inner}</span>
                    )}{" "}
                  </span>
                );
              })}
            </h2>
          </div>

          <div ref={storyRef} className="kw mt-7 max-w-2xl lg:mt-9" style={{ opacity: 0 }}>
            <p className="text-[1.0625rem] leading-[1.6] text-muted sm:text-[1.1875rem]">
              {storyWords.map((w, i) => (
                <span key={i}>
                  <span
                    ref={(el) => {
                      sw.current[i] = el;
                    }}
                    className="kw inline-block"
                  >
                    {w}
                  </span>{" "}
                </span>
              ))}
            </p>
          </div>

          {chips.length > 0 && (
            <ul ref={chipsRef} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 lg:mt-9">
              {chips.map((c, i) => (
                <li
                  key={c}
                  ref={(el) => {
                    cw.current[i] = el;
                  }}
                  className="kw flex items-center gap-2 text-[0.9375rem] font-semibold text-forest"
                >
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald" />
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
