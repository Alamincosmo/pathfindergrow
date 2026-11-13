"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, MessageCircle, ShieldCheck } from "lucide-react";
import { PRICING_TIERS, AGENCY_INFO } from "@/data/growthStudioData";
import { FadeUp } from "@/components/MotionPrimitives";

export default function PricingSection() {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");

  return (
    <section id="pricing" className="py-20 sm:py-28 relative overflow-hidden bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#158060] mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Sprint Investment</span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
            Predictable Pricing.{" "}
            <span className="text-[#158060]">Disproportionate ROI.</span>
          </h2>

          <p className="text-[15px] text-[#475569] mt-3.5 leading-[1.65]">
            No bloated hourly billing. No scope-creep surprises. Flat-fee sprints with direct founder accountability and measurable returns.
          </p>

          {/* Animated Currency Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#F1F5F4] border border-slate-900/8 mt-6">
            {(["USD", "BDT"] as const).map((curr) => {
              const active = currency === curr;
              return (
                <button
                  key={curr}
                  type="button"
                  onClick={() => setCurrency(curr)}
                  className={`relative px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
                    active ? "text-white" : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="currencySwitch"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-[#23AB82] shadow-xs"
                    />
                  )}
                  <span className="relative z-10">
                    {curr === "USD" ? "USD ($) Global" : "BDT (৳) Bangladesh"}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 max-w-5xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier, idx) => (
            <FadeUp
              key={tier.name}
              delay={idx * 0.08}
              className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between relative transition-shadow ${
                tier.highlight
                  ? "bg-white border-2 border-[#23AB82] shadow-[0_20px_50px_-16px_rgba(35,171,130,0.2)]"
                  : "bg-white border border-slate-900/10 shadow-[0_10px_28px_-12px_rgba(15,23,42,0.07)]"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#23AB82] text-white font-semibold text-[11px] uppercase tracking-[0.06em] py-1 px-3.5 rounded-full shadow-sm whitespace-nowrap">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-[21px] font-bold text-[#0F172A]">
                      {tier.name}
                    </h3>
                    <span className="text-[11.5px] font-semibold text-[#0B78B8] bg-[#4BB3F0]/12 px-2.5 py-1 rounded-full border border-[#4BB3F0]/25 whitespace-nowrap">
                      {tier.turnaround}
                    </span>
                  </div>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.03em] tabular-nums">
                      {currency === "USD" ? tier.price : tier.bdtPrice}
                    </span>
                  </div>

                  <p className="text-[13.5px] text-[#475569] mt-2 leading-[1.6]">
                    {tier.target}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-slate-900/8">
                  <div className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
                    Sprint Inclusions
                  </div>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5">
                      <div className="size-4.5 rounded-full bg-[#23AB82]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#158060]" />
                      </div>
                      <span className="text-[13.5px] text-[#334155] leading-[1.5]">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-7 mt-6 border-t border-slate-900/8">
                <a
                  href={AGENCY_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    tier.highlight
                      ? "btn-growth-primary w-full text-center"
                      : "btn-growth-secondary w-full text-center"
                  }
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{tier.ctaText}</span>
                </a>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Risk Reversal Callout */}
        <FadeUp className="max-w-3xl mx-auto mt-12 p-6 rounded-2xl bg-[#F4FBFB] border border-[#23AB82]/25 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-[#158060] font-semibold text-[14px]">
            <ShieldCheck className="w-4 h-4 text-[#23AB82]" />
            <span>The Pathfinder 100% Alignment Guarantee</span>
          </div>
          <p className="text-[13.5px] text-[#475569] leading-[1.6]">
            If during the initial 3-day Growth Audit we see we cannot realistically generate at least a 3x–5x return on your investment, we cancel the sprint and refund your deposit immediately.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
