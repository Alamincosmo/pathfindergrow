"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { FAN_PROJECTS, MORE_WORK, type CaseStudy } from "@/data/growthStudioData";
import { TrackedLink } from "@/components/TrackedLink";
import { KineticIntro } from "@/components/motion/KineticIntro";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

const FLOWS: Record<NonNullable<CaseStudy["diagram"]>, string[]> = {
  clinic: ["Patient queue", "Digital prescription", "Health records"],
  cloud: ["Event sources", "FastAPI services on AWS ECS", "Redis cache"],
};

function Flow({ kind }: { kind: NonNullable<CaseStudy["diagram"]> }) {
  const steps = FLOWS[kind];
  return (
    <div className="rounded-xl border border-white/10 bg-night-3 p-4">
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {steps.map((s, i) => (
          <Fragment key={s}>
            <li className="flex-1 rounded-lg border border-white/15 bg-stage px-3 py-3 text-center text-[0.9375rem] font-medium">
              {s}
            </li>
            {i < steps.length - 1 && (
              <ArrowRight className="mx-auto size-5 shrink-0 rotate-90 text-mint sm:rotate-0" aria-hidden="true" />
            )}
          </Fragment>
        ))}
      </ol>
      <p className="t-label mt-4 text-muted-dark">System diagram, not a screenshot</p>
    </div>
  );
}

function Detail({ p }: { p: CaseStudy }) {
  return (
    <div>
      <p className="t-label text-mint">{p.role ? `Our role: ${p.role}` : "Client project"}</p>
      <h3 className="mt-2 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold leading-none tracking-[-0.035em]">
        {p.client}
      </h3>
      <p className="mt-3 text-muted-dark">{p.summary}</p>
      {p.fact && <p className="mt-4 border-l-2 border-mint pl-4 font-medium">{p.fact}</p>}
      {p.stack && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-white/20 px-3 py-1 font-mono text-[0.8125rem]">
              {s}
            </li>
          ))}
        </ul>
      )}
      {p.href && (
        <TrackedLink
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          event="live_project_click"
          eventProps={{ project: p.client, location: "work" }}
          className="link-underline mt-5 inline-flex items-center gap-1.5 font-medium text-mint"
        >
          Visit live site
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </TrackedLink>
      )}
      {p.caseStudy && (
        <a href={p.caseStudy} className="link-underline mt-5 ml-5 inline-flex items-center gap-1.5 font-medium text-mint">
          Read the case study
          <ArrowRight className="size-4" strokeWidth={1.75} />
        </a>
      )}
    </div>
  );
}

export default function Work() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(3);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    let dead = false;
    let ctx: { revert: () => void } | undefined;

    const setup = async () => {
      ctx?.revert();
      ctx = undefined;
      wrap.dataset.mode = "list";
      if (prefersReducedMotion() || !mq.matches) return;
      const { gsap } = await loadGsap();
      if (dead) return;
      wrap.dataset.mode = "fan";
      ctx = gsap.context(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
        const n = cards.length;
        const mid = (n - 1) / 2;
        const cardW = () =>
          Math.round(Math.min(250, window.innerWidth * 0.17, window.innerHeight * 0.28));
        const spacing = () => Math.min(168, (window.innerWidth - cardW() - 160) / (n - 1));
        wrap.style.setProperty("--cw", `${cardW()}px`);

        /* Cards start hidden below the screen, rise as the section arrives, then fan out. */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top 62%",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.fromTo(
          cards,
          { x: 0, y: () => window.innerHeight * 0.8, rotation: 0, scale: 0.8, autoAlpha: 0 },
          { y: 0, scale: 0.94, autoAlpha: 1, duration: 0.34, stagger: 0.02, ease: "power3.out" },
          0
        )
          .to(
            cards,
            {
              x: (i: number) => (i - mid) * spacing(),
              y: (i: number) => Math.pow(i - mid, 2) * 4,
              rotation: (i: number) => (i - mid) * 4,
              scale: 1,
              duration: 0.42,
              ease: "power2.inOut",
              stagger: { each: 0.01, from: "center" },
            },
            0.36
          )
          .fromTo(
            detailRef.current,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" },
            0.66
          );
      }, wrap);
    };

    setup();
    mq.addEventListener("change", setup);
    return () => {
      dead = true;
      ctx?.revert();
      mq.removeEventListener("change", setup);
    };
  }, []);

  const mid = (FAN_PROJECTS.length - 1) / 2;
  const current = FAN_PROJECTS[active];

  return (
    <section id="work" className="on-dark relative isolate bg-stage text-paper">
      <div className="dot-field pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <KineticIntro
        eyebrow="Selected work"
        title="Work you can *open and check.*"
        story="Real projects with live links. Open any card and judge the work yourself. Each one says what our role was, so you can see what we built, what we ranked and what we designed."
        chips={["Live sites", "Our role stated", "Nothing staged"]}
        variant="type"
      />

      <div ref={wrapRef} data-mode="list" className="fan-wrap">
        <div className="fan-sticky">
          <div className="fan-area">
            <div className="fan-row flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-6 md:px-8">
              {FAN_PROJECTS.map((p, i) => (
                <a
                  key={p.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  style={{ zIndex: i === active ? 50 : Math.round(FAN_PROJECTS.length - Math.abs(i - mid)) }}
                  className={`fan-card group block w-[72%] max-w-[320px] shrink-0 snap-center sm:w-[44%] md:w-[30%] ${
                    i === active ? "is-active" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-xl border border-white/12 bg-night-3 shadow-[0_24px_48px_-22px_rgba(11,74,56,0.5)] transition-transform duration-300 group-hover:-translate-y-2 group-focus-visible:-translate-y-2 [.is-active_&]:-translate-y-2">
                    <div className="relative aspect-[16/10] overflow-hidden bg-night-3">
                      {p.image ? (
                        <Image
                          src={p.image.src}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 250px, 70vw"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(80%_80%_at_50%_0%,rgba(53,224,161,0.2),transparent)] p-4 text-center">
                          <span className="font-display text-2xl font-extrabold tracking-[-0.04em]">{p.client}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3.5">
                      <p className="font-display text-base font-bold leading-tight tracking-[-0.02em]">{p.client}</p>
                      <p className="mt-0.5 truncate text-[0.8125rem] text-muted-dark">{p.category}</p>
                      <p className="fan-summary mt-2 text-[0.875rem] text-muted-dark">{p.summary}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div ref={detailRef} className="fan-detail container-x pb-6 lg:pb-0">
            <div className="max-w-2xl border-t border-white/10 pt-4" aria-live="polite">
              <Detail p={current} />
            </div>
          </div>
        </div>
      </div>

      <div className="container-x pb-20 pt-10 lg:pb-28">
        <button
          type="button"
          aria-expanded={more}
          aria-controls="more-work"
          onClick={() => setMore((v) => !v)}
          className="flex min-h-12 items-center gap-3 font-medium"
        >
          <Plus className={`size-5 transition-transform duration-300 ${more ? "rotate-45" : ""}`} strokeWidth={1.5} />
          More work ({MORE_WORK.length})
        </button>
        <div id="more-work" className="acc-panel" data-open={more} inert={!more}>
          <div>
            <div className="grid gap-12 pt-8 lg:grid-cols-3">
              {MORE_WORK.map((p) => (
                <article key={p.id}>
                  {p.diagram && (
                    <div className="mb-6">
                      <Flow kind={p.diagram} />
                    </div>
                  )}
                  <Detail p={p} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
