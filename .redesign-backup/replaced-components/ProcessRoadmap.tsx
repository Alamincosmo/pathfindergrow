"use client";

import React from "react";
import { Calendar, ShieldCheck, Sparkles } from "lucide-react";
import { GROWTH_FRAMEWORK } from "@/data/growthStudioData";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function ProcessRoadmap() {
  return (
    <section id="process" className="py-20 sm:py-28 relative overflow-hidden bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#158060] mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 18-Day Growth Sprint</span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
            From Friction to{" "}
            <span className="text-[#0B78B8]">Market Monopoly</span> in 4 Steps
          </h2>

          <p className="text-[15px] text-[#475569] mt-3.5 leading-[1.65]">
            Zero endless meetings. Zero bureaucratic agency delays. A structured 4-step sprint engineered to ship fast, rank high, and compound ROI.
          </p>
        </FadeUp>

        {/* 4 Steps Timeline Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {GROWTH_FRAMEWORK.map((item) => (
            <StaggerItem
              key={item.step}
              className="surface-card p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-display text-[26px] font-bold text-[#23AB82]/45 tabular-nums">
                    {item.step}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1F5F4] border border-slate-900/6 text-[11px] font-medium text-[#475569]">
                    <Calendar className="w-3 h-3 text-[#0B78B8]" />
                    <span>{item.timeframe}</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-[17px] font-bold text-[#0F172A] tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <div className="text-[12.5px] font-semibold text-[#158060] mt-0.5">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-[13.5px] text-[#475569] leading-[1.6]">
                  {item.description}
                </p>
              </div>

              {/* Deliverable Box */}
              <div className="mt-5 pt-4 border-t border-slate-900/6">
                <div className="text-[10.5px] uppercase font-semibold tracking-[0.06em] text-[#64748B] mb-1">
                  Tangible Deliverable
                </div>
                <div className="text-[12.5px] font-semibold text-[#0F172A] leading-snug">
                  {item.deliverable}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Commitment Banner */}
        <FadeUp className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-[13px] font-medium text-[#334155] bg-white px-5 py-2.5 rounded-full border border-slate-900/8 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#23AB82] shrink-0" />
            <span>Guaranteed on-time sprint execution or we work free until delivered.</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
