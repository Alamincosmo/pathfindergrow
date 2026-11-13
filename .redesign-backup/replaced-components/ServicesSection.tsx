"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Sparkles,
  Palette,
  Cpu,
  Smartphone,
  ArrowRight,
  TrendingUp,
  Zap,
  Check,
} from "lucide-react";
import { SERVICE_PILLARS, AGENCY_INFO } from "@/data/growthStudioData";
import { FadeUp, APPLE_EASE } from "@/components/MotionPrimitives";

export default function ServicesSection() {
  const [activePillar, setActivePillar] = useState(SERVICE_PILLARS[0].id);

  const getPillarIcon = (name: string, isActive: boolean) => {
    const cls = isActive ? "w-4 h-4 text-[#158060]" : "w-4 h-4 text-[#64748B]";
    switch (name) {
      case "Globe":
        return <Globe className={cls} />;
      case "Sparkles":
        return <Sparkles className={cls} />;
      case "Palette":
        return <Palette className={cls} />;
      case "Cpu":
        return <Cpu className={cls} />;
      case "Smartphone":
        return <Smartphone className={cls} />;
      default:
        return <Zap className={cls} />;
    }
  };

  const selectedService =
    SERVICE_PILLARS.find((p) => p.id === activePillar) || SERVICE_PILLARS[0];

  return (
    <section id="services" className="py-20 sm:py-28 relative overflow-hidden bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#158060] mb-3.5">
            <span>Our 5 Growth Pillars</span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
            Engineered to Turn Digital Attention into{" "}
            <span className="text-[#158060]">Predictable Revenue</span>
          </h2>

          <p className="text-[15px] text-[#475569] mt-3.5 leading-[1.65]">
            Most agencies sell disconnected pieces — a designer makes a logo, a coder makes a slow page, and an SEO seller builds links. We unite everything into one cohesive growth system.
          </p>
        </FadeUp>

        {/* Framer Motion Shared-Layout Pillar Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SERVICE_PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillar;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillar(pillar.id)}
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold transition-colors cursor-pointer ${
                  isActive ? "text-[#0F172A]" : "text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePillarPill"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-white border border-[#23AB82]/35 shadow-[0_4px_14px_-4px_rgba(35,171,130,0.18)]"
                  />
                )}
                {!isActive && (
                  <span className="absolute inset-0 rounded-full bg-[#F1F5F4] border border-slate-900/6" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {getPillarIcon(pillar.iconName, isActive)}
                  <span>
                    {pillar.title.split(" ")[0]} {pillar.title.split(" ")[1]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Detailed Showcase Card */}
        <div className="rounded-3xl bg-white border border-slate-900/8 p-6 sm:p-9 lg:p-11 shadow-[0_14px_40px_-16px_rgba(15,23,42,0.08)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#4BB3F0]/8 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: APPLE_EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start relative z-10"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[26px] font-bold text-[#23AB82]/45 tabular-nums">
                    {selectedService.number}
                  </span>
                  <span className="h-4 w-[1px] bg-slate-900/12" />
                  <span className="text-[11.5px] uppercase tracking-[0.06em] text-[#0B78B8] font-semibold">
                    Core Scaling Capability
                  </span>
                </div>

                <h3 className="font-display text-[22px] sm:text-[26px] font-bold text-[#0F172A] tracking-[-0.02em] leading-[1.25]">
                  {selectedService.title}
                </h3>

                <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-[1.68]">
                  {selectedService.fullDesc}
                </p>

                {/* ROI Impact Callout */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F4FBFB] border border-[#23AB82]/25">
                  <div className="flex items-start gap-3">
                    <div className="size-8 rounded-xl bg-[#23AB82]/15 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="w-4 h-4 text-[#158060]" />
                    </div>
                    <div>
                      <h4 className="text-[11.5px] font-semibold uppercase tracking-[0.05em] text-[#158060] mb-1">
                        Direct Financial Impact
                      </h4>
                      <p className="text-[13.5px] font-medium text-[#0F172A] leading-[1.5]">
                        {selectedService.roiImpact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div>
                  <div className="text-[11.5px] font-semibold uppercase tracking-[0.05em] text-[#64748B] mb-2">
                    Production Stack
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techTags.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-[#F1F5F4] border border-slate-900/8 text-[12px] font-medium text-[#334155]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Deliverables Checklist */}
              <div className="lg:col-span-5 rounded-2xl bg-[#F8FAF9] border border-slate-900/8 p-6 space-y-5">
                <div>
                  <h4 className="font-display text-[16px] font-semibold text-[#0F172A] mb-1">
                    Sprint Deliverables
                  </h4>
                  <p className="text-[12.5px] text-[#64748B]">
                    Engineered to production standards with zero shortcuts.
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="size-5 rounded-full bg-[#23AB82]/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#158060]" />
                      </div>
                      <span className="text-[13.5px] font-normal text-[#334155] leading-[1.5]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <a
                    href={AGENCY_INFO.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-growth-primary w-full text-center"
                  >
                    <span>Build This Pillar for My Business</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
