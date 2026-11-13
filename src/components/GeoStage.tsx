"use client";

import { useCallback, useEffect, useRef } from "react";
import { CtaButton } from "@/components/TrackedLink";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";
import { FAQ_ITEMS } from "@/data/growthStudioData";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

const QUESTION = "Which clinic software should I use for e-prescriptions in Bangladesh?";

const ANSWERS = [
  {
    name: "Your Business",
    text: "E-prescriptions, appointments and patient records. Clear pricing and a documented feature list.",
  },
  { name: "Option B", text: "General hospital software. Limited public information." },
  { name: "Option C", text: "Pricing and feature details are not published." },
];

const STEPS = [
  { t: "A buyer asks", d: "People type a real question into an AI assistant instead of searching." },
  { t: "The assistant answers", d: "It builds an answer from sources it can read and verify." },
  {
    t: "A clear source is cited",
    d: "Structured data, direct answers and consistent facts make your business the easy one to cite.",
  },
];

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function GeoStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const answerRefs = useRef<(HTMLLIElement | null)[]>([]);
  const citeRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const apply = useCallback((p: number) => {
    if (typedRef.current) {
      const n = Math.round(clamp(p / 0.28, 0, 1) * QUESTION.length);
      typedRef.current.textContent = QUESTION.slice(0, n);
    }
    answerRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = clamp((p - 0.3 - i * 0.1) / 0.12, 0, 1);
      el.style.opacity = String(t);
      el.style.transform = `translateY(${(1 - t) * 14}px)`;
    });
    if (citeRef.current) {
      const t = clamp((p - 0.72) / 0.2, 0, 1);
      citeRef.current.style.opacity = String(t);
      citeRef.current.style.transform = `translateY(${(1 - t) * 10}px)`;
    }
    const first = answerRefs.current[0];
    if (first) first.dataset.cited = p > 0.78 ? "true" : "false";
    const starts = [0, 0.3, 0.72];
    stepRefs.current.forEach((el, i) => {
      if (el) el.dataset.on = String(p >= starts[i]);
    });
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let dead = false;
    let trigger: { kill: () => void } | undefined;

    const setup = async () => {
      trigger?.kill();
      trigger = undefined;
      if (prefersReducedMotion() || !mq.matches) {
        apply(1);
        return;
      }
      const { ScrollTrigger } = await loadGsap();
      if (dead) return;
      apply(0);
      trigger = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => apply(self.progress),
      });
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      dead = true;
      trigger?.kill();
      mq.removeEventListener("change", setup);
    };
  }, [apply]);

  return (
    <section id="geo" className="on-dark relative isolate overflow-clip bg-stage text-paper">
      <ParallaxLayer speed={0.06} className="absolute -inset-y-[8%] inset-x-0 -z-10">
        <div className="dot-field absolute inset-0" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.14} className="absolute -inset-y-[10%] inset-x-0 -z-10">
        <div className="absolute left-1/2 top-1/3 size-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(35,171,130,0.3),transparent)]" />
      </ParallaxLayer>

      <div className="container-x section-y pb-12 lg:pb-8">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-mint">Search is changing</Eyebrow>
          <h2 className="t-display-l mt-4">
            More buyers ask AI assistants for <strong>recommendations.</strong>{" "}
            Will yours name you?
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-muted-dark">{FAQ_ITEMS[1].a}</p>
        </Reveal>
      </div>

      <div ref={wrapRef} className="relative lg:h-[300vh]">
        <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center">
          <div className="container-x grid w-full gap-10 pb-12 lg:grid-cols-12 lg:items-center lg:pb-0 lg:pt-16">
            <ol className="space-y-6 lg:col-span-5">
              {STEPS.map((s, i) => (
                <li
                  key={s.t}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-on="true"
                  className="flex gap-5 opacity-40 transition-opacity duration-300 data-[on=true]:opacity-100"
                >
                  <span className="t-label pt-1 text-lime">0{i + 1}</span>
                  <span>
                    <span className="t-title block">{s.t}</span>
                    <span className="mt-2 block text-muted-dark">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="lg:col-span-7">
              <div className="rounded-md border border-[var(--line-dark)] bg-[#0B2B23] p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="t-label text-muted-dark">AI assistant</span>
                  <span className="t-label rounded-full border border-[var(--line-dark)] px-3 py-1 text-muted-dark">
                    Illustration
                  </span>
                </div>

                <div className="mt-6 rounded-md bg-stage px-4 py-3">
                  <p className="t-label text-muted-dark">Buyer asks</p>
                  <p className="mt-2 min-h-[3.5rem] text-lg">
                    <span ref={typedRef}>{QUESTION}</span>
                  </p>
                </div>

                <ol className="mt-5 space-y-3">
                  {ANSWERS.map((a, i) => (
                    <li
                      key={a.name}
                      ref={(el) => {
                        answerRefs.current[i] = el;
                      }}
                      data-cited={i === 0 ? "true" : "false"}
                      className="rounded-md border-l-4 border-transparent bg-stage/60 px-4 py-3 transition-colors duration-300 data-[cited=true]:border-lime data-[cited=true]:bg-stage"
                    >
                      <span className="font-medium">
                        {i + 1}. {a.name}
                      </span>
                      <span className="block text-muted-dark">{a.text}</span>
                    </li>
                  ))}
                </ol>

                <div ref={citeRef} className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="t-label rounded-full bg-lime px-3 py-1 text-ink">Cited source</span>
                  <span className="font-mono text-sm text-muted-dark">yourbusiness.com/e-prescriptions</span>
                </div>

                <p className="mt-6 text-sm text-muted-dark">
                  Illustration of how a clear, structured source can be cited. It is not a real AI
                  response and not a client result.
                </p>
              </div>
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
