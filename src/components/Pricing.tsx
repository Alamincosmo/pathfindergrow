"use client";

import { useRef, useState } from "react";
import { Check, Clock, Plus, ShieldCheck } from "lucide-react";
import { GUARANTEE, PRICING_TIERS } from "@/data/growthStudioData";
import { CtaButton } from "@/components/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { KineticIntro } from "@/components/motion/KineticIntro";

/*
 * Layout order follows how a buyer decides:
 *   1. who it is for (do I belong here?)  2. the price, anchored by the other tab
 *   3. the button right under the price   4. a reassurance line (risk reversal)
 *   5. what is included, as short checks, with detail one tap away.
 * Everything is one centred column so the eye never has to choose a side.
 */
export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [tab, setTab] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const touchX = useRef<number | null>(null);

  const go = (i: number) => {
    const next = Math.max(0, Math.min(PRICING_TIERS.length - 1, i));
    if (next === tab) return;
    setDir(next > tab ? 1 : -1);
    setTab(next);
  };

  const t = PRICING_TIERS[tab];
  const isOpen = !!expanded[t.name];

  return (
    <section id="pricing" className="border-t border-[var(--line)] bg-paper-2">
      <KineticIntro
        eyebrow="Pricing"
        title="Flat-fee sprints. *No surprises.*"
        story="The first growth audit is free and without obligation. Prices depend on scope, and we confirm the exact number in writing before any work starts. Pick the package that fits where your business is today."
        chips={["Free first audit", "Written quote first", "Flat fee, no surprises"]}
        variant="wipe"
      />

      <div className="container-x pb-20 lg:pb-32">
        <div className="mx-auto max-w-xl">
          <Reveal>
            <div
              role="tablist"
              aria-label="Packages"
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(tab + 1);
                if (e.key === "ArrowLeft") go(tab - 1);
              }}
              className="relative grid w-full grid-cols-2 rounded-full border border-line-strong bg-card p-1"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-1 left-1 rounded-full bg-forest shadow-[0_6px_16px_-6px_rgba(11,74,56,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: `calc((100% - 0.5rem) / ${PRICING_TIERS.length})`, transform: `translateX(${tab * 100}%)` }}
              />
              {PRICING_TIERS.map((p, i) => (
                <button
                  key={p.name}
                  id={`tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === i}
                  aria-controls="pricing-panel"
                  tabIndex={tab === i ? 0 : -1}
                  onClick={() => go(i)}
                  className={`relative z-10 min-h-12 rounded-full px-3 py-2 text-[0.875rem] font-semibold leading-tight transition-colors duration-300 sm:text-[0.9375rem] ${
                    tab === i ? "text-[#F5F8F6]" : "text-ink"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            <div role="group" aria-label="Currency" className="mt-4 flex items-center justify-center gap-1 text-[0.875rem]">
              <span className="mr-2 text-muted">Show prices in</span>
              {(["USD", "BDT"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={currency === c}
                  onClick={() => setCurrency(c)}
                  className={`min-h-10 rounded-full px-3.5 font-semibold transition-colors ${
                    currency === c ? "bg-ink text-[#F5F8F6]" : "text-ink hover:bg-ink/5"
                  }`}
                >
                  {c === "USD" ? "USD ($)" : "BDT (৳)"}
                </button>
              ))}
            </div>
          </Reveal>

          <div
            id="pricing-panel"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 56) go(tab + (dx < 0 ? 1 : -1));
            }}
            className="mt-6"
          >
            <article
              key={t.name}
              className={`${dir === 1 ? "tab-in-r" : "tab-in-l"} rounded-3xl bg-card px-6 pb-8 pt-9 text-center sm:px-10 ${
                t.featured
                  ? "border-2 border-forest shadow-[0_30px_70px_-30px_rgba(11,74,56,0.55)]"
                  : "border border-line-strong shadow-[0_30px_70px_-40px_rgba(7,17,14,0.45)]"
              }`}
            >
              <p className="t-label inline-block rounded-full bg-forest px-3.5 py-1 text-[#F5F8F6]">{t.badge}</p>
              <h3 className="t-title mt-5">{t.name}</h3>
              <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] text-muted">{t.target}</p>

              <div className="mt-7 border-t border-[var(--line)] pt-7">
                <p className="t-label text-muted">From</p>
                <p className="mt-1 font-display text-[clamp(3.25rem,10vw,4.75rem)] font-extrabold leading-none tracking-[-0.05em]">
                  {currency === "USD" ? t.from : t.fromBdt}
                </p>
                <p className="mx-auto mt-3 max-w-xs text-[0.875rem] text-muted">
                  {currency === "USD" ? t.upTo : t.upToBdt}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper-2 px-3.5 py-1.5 text-[0.875rem] font-semibold text-forest">
                  <Clock className="size-4" strokeWidth={2} />
                  Delivered in {t.turnaround}
                </p>
              </div>

              <div className="mt-7 flex flex-col items-center">
                <CtaButton location={`pricing-${t.featured ? "sprint" : "enterprise"}`}>{t.cta}</CtaButton>
                <p className="mt-3 text-[0.8125rem] text-muted">Free first audit. Exact price in writing before work starts.</p>
              </div>

              <div className="mt-8 border-t border-[var(--line)] pt-6 text-left">
                <p className="t-label text-emerald-ink">What you get</p>
                <ul className="mt-4 space-y-3">
                  {t.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2.5} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`included-${tab}`}
                  onClick={() => setExpanded((s) => ({ ...s, [t.name]: !s[t.name] }))}
                  className="mt-3 flex min-h-11 items-center gap-2 text-[0.9375rem] font-medium text-forest"
                >
                  <Plus className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} strokeWidth={2} />
                  Full list of what is included
                </button>
                <div id={`included-${tab}`} className="acc-panel" data-open={isOpen} inert={!isOpen}>
                  <div>
                    <ul className="space-y-2 pb-1 pt-1 text-[0.875rem] text-muted">
                      {t.features.map((f) => (
                        <li key={f} className="flex gap-3">
                          <span aria-hidden="true">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>

            <p className="mt-4 text-center text-[0.8125rem] text-muted sm:hidden">Swipe to compare packages</p>
          </div>

          <Reveal className="mt-10 flex items-start gap-4 text-left">
            <ShieldCheck className="mt-1 size-6 shrink-0 text-forest" strokeWidth={1.5} />
            <div>
              <p className="t-label text-emerald-ink">Our promise</p>
              <p className="mt-2 text-lg">{GUARANTEE}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
