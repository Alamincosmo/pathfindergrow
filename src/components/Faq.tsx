"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/data/growthStudioData";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";
import { track } from "@/lib/track";

export default function Faq() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="faq" className="section-y bg-paper">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="text-emerald-ink">FAQ</Eyebrow>
          <h2 className="t-display-l mt-4">
            Questions we hear <strong>before we start.</strong>
          </h2>
        </Reveal>

        <div className="border-t border-[var(--line)] lg:col-span-7">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-[var(--line)]">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => {
                      setOpen(isOpen ? -1 : i);
                      if (!isOpen) track("faq_open", { question: f.q });
                    }}
                    className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="font-display text-[1.375rem] font-bold leading-tight tracking-[-0.025em]">
                      {f.q}
                    </span>
                    <Plus
                      className={`size-6 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className="acc-panel"
                  data-open={isOpen}
                  inert={!isOpen}
                >
                  <div>
                    <p className="max-w-2xl pb-6 text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
