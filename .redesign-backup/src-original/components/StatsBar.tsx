"use client";

import React from "react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function StatsBar() {
  return (
    <section className="relative py-10 sm:py-12 border-y border-slate-900/8 bg-[#F1F5F4]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {AGENCY_INFO.stats.map((stat, idx) => (
            <StaggerItem key={idx} className="flex flex-col items-center text-center">
              <span
                className={`font-display text-[24px] sm:text-[28px] font-bold tracking-[-0.025em] tabular-nums ${
                  idx % 2 === 0 ? "text-[#0F172A]" : "text-[#158060]"
                }`}
              >
                {stat.value}
              </span>
              <span className="text-[12px] sm:text-[12.5px] font-medium text-[#64748B] mt-1 leading-snug">
                {stat.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
