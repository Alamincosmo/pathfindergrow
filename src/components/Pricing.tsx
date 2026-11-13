"use client";

import { useState } from "react";
import { Check, Plus, ShieldCheck } from "lucide-react";
import { GUARANTEE, PRICING_TIERS } from "@/data/growthStudioData";
import { CtaButton } from "@/components/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";

export default function Pricing() {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <section id="pricing" className="section-y bg-paper-2">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-emerald-ink">Pricing</Eyebrow>
          <h2 className="t-display-l mt-4">
            Flat-fee sprints. <strong>No surprises.</strong>
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-muted">
            The first growth audit is free and without obligation. Prices depend on scope; we
            confirm the exact number in writing before any work starts.
          </p>

          <div
            role="group"
            aria-label="Currency"
            className="mt-8 inline-flex rounded-full border border-line-strong p-1"
          >
            {(["USD", "BDT"] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={currency === c}
                onClick={() => setCurrency(c)}
                className={`min-h-10 rounded-full px-5 text-[0.9375rem] font-medium transition-colors ${
                  currency === c ? "bg-forest text-paper" : "text-ink"
                }`}
              >
                {c === "USD" ? "USD ($)" : "BDT (৳)"}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {PRICING_TIERS.map((t, i) => {
            const isOpen = !!expanded[t.name];
            return (
              <Reveal key={t.name} delay={i * 100}>
                <article
                  className={`rounded-md p-6 sm:p-9 ${
                    t.featured
                      ? "border-2 border-forest bg-card shadow-[0_24px_60px_-28px_rgba(11,74,56,0.45)]"
                      : "border border-line-strong"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="t-label text-emerald-ink">{t.badge}</p>
                    <p className="t-label text-muted">{t.turnaround}</p>
                  </div>
                  <h3 className="t-title mt-4">{t.name}</h3>

                  <p className="mt-6">
                    <span className="t-label block text-muted">From</span>
                    <span className="mt-2 block font-display text-[clamp(3rem,6vw,4.5rem)] font-extrabold leading-none tracking-[-0.045em]">
                      {currency === "USD" ? t.from : t.fromBdt}
                    </span>
                  </p>
                  <p className="mt-2 text-[0.9375rem] text-muted">
                    {currency === "USD" ? t.upTo : t.upToBdt}
                  </p>

                  <p className="mt-6">{t.target}</p>

                  <ul className="mt-6 space-y-3">
                    {t.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`included-${i}`}
                    onClick={() => setExpanded((s) => ({ ...s, [t.name]: !s[t.name] }))}
                    className="mt-6 flex min-h-11 items-center gap-2 font-medium text-forest"
                  >
                    <Plus
                      className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      strokeWidth={2}
                    />
                    What is included
                  </button>
                  <div id={`included-${i}`} className="acc-panel" data-open={isOpen} inert={!isOpen}>
                    <div>
                      <ul className="space-y-2 pb-2 pt-2 text-[0.9375rem] text-muted">
                        {t.features.map((f) => (
                          <li key={f} className="flex gap-3">
                            <span aria-hidden="true">·</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <CtaButton location={`pricing-${t.featured ? "sprint" : "enterprise"}`}>
                      {t.cta}
                    </CtaButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12 flex max-w-3xl items-start gap-4 border-t border-[var(--line)] pt-8">
          <ShieldCheck className="mt-1 size-6 shrink-0 text-forest" strokeWidth={1.5} />
          <div>
            <p className="t-label text-emerald-ink">Our promise</p>
            <p className="mt-2 text-lg">{GUARANTEE}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
