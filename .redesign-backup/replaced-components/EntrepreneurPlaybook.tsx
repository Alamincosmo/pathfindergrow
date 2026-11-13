"use client";

import React from "react";
import { Lightbulb, Zap, Bot, TrendingUp, Clock, BookOpen } from "lucide-react";
import { ENTREPRENEUR_HACKS } from "@/data/growthStudioData";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function EntrepreneurPlaybook() {
  const icons = [Zap, Bot, TrendingUp, Clock];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#F1F5F4]/75 border-y border-slate-900/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-amber-800 mb-3.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Entrepreneurial Playbook</span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
            Why 95% of Business Websites Fail —{" "}
            <span className="text-[#158060]">And the Principles We Use to Win</span>
          </h2>

          <p className="text-[15px] text-[#475569] mt-3.5 leading-[1.65]">
            We distill buyer psychology, clarity-first conversion architecture, and enterprise growth mechanics into our engineering standards.
          </p>
        </FadeUp>

        {/* 4 Core Laws Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENTREPRENEUR_HACKS.map((hack, idx) => {
            const Icon = icons[idx] || Lightbulb;
            return (
              <StaggerItem
                key={idx}
                className="surface-card p-6 sm:p-8 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="size-10 rounded-xl bg-[#4BB3F0]/12 flex items-center justify-center text-[#0B78B8]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#64748B]">
                      Law #{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-[19px] font-bold text-[#0F172A] tracking-[-0.015em]">
                    {hack.rule}
                  </h3>

                  <blockquote className="text-[14px] text-[#475569] italic border-l-2 border-[#4BB3F0]/55 pl-4 py-0.5 leading-[1.6]">
                    &ldquo;{hack.quote}&rdquo;
                  </blockquote>
                </div>

                <div className="p-4 rounded-2xl bg-[#F4FBFB] border border-[#23AB82]/20">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#158060] mb-1">
                    Pathfinder Grow Solution
                  </div>
                  <p className="text-[13.5px] font-medium text-[#0F172A] leading-[1.5]">
                    {hack.solution}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
