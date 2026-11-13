"use client";

import React from "react";
import {
  Sparkles,
  Bot,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function GeoAdvantage() {
  return (
    <section id="geo" className="py-20 sm:py-28 relative overflow-hidden bg-[#F1F5F4]/80 border-y border-slate-900/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4BB3F0]/12 border border-[#4BB3F0]/30 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#0B78B8] mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The 2026 Search Shift</span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
            Standard SEO is Fading.{" "}
            <span className="text-[#0B78B8]">Generative Engine Optimization</span>{" "}
            Wins AI Recommendations.
          </h2>

          <p className="text-[15px] text-[#475569] mt-3.5 leading-[1.65]">
            High-intent buyers ask ChatGPT, Gemini, Perplexity, and Claude for direct vendor recommendations. If AI models cannot verify your brand entity, your pipeline shrinks.
          </p>
        </FadeUp>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          {/* Traditional SEO */}
          <FadeUp className="lg:col-span-6 rounded-3xl bg-white border border-slate-900/8 p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-900/8">
                <div className="flex items-center gap-2.5">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <h3 className="font-display text-[17px] font-semibold text-[#0F172A]">
                    Traditional Agency SEO
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  85% Invisible to AI
                </span>
              </div>

              <p className="text-[14px] text-[#475569] leading-[1.65]">
                Legacy agencies stuff keywords onto slow WordPress templates and buy low-quality links. When buyers prompt an LLM assistant, your brand gets skipped because it lacks semantic entity validation.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#475569]">
                  <span className="size-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>Takes 6–12 months with unpredictable results</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#475569]">
                  <span className="size-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>Zero visibility inside ChatGPT, Gemini, and Claude overviews</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#475569]">
                  <span className="size-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>Slow page loads (&gt;3.5s) causing mobile bounce</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Pathfinder GEO Engine */}
          <FadeUp delay={0.08} className="lg:col-span-6 rounded-3xl bg-white border border-[#23AB82]/35 p-6 sm:p-8 flex flex-col justify-between space-y-5 shadow-[0_14px_36px_-14px_rgba(35,171,130,0.16)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-900/8">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#23AB82] shrink-0" />
                  <h3 className="font-display text-[17px] font-semibold text-[#0F172A]">
                    Pathfinder GEO Architecture
                  </h3>
                </div>
                <span className="text-[11px] font-semibold text-[#158060] bg-[#23AB82]/10 border border-[#23AB82]/25 px-2.5 py-0.5 rounded-full">
                  Proven #1 in 4 Days
                </span>
              </div>

              <p className="text-[14px] text-[#475569] leading-[1.65]">
                We model your digital footprint as an interconnected Knowledge Graph entity with structured JSON-LD markup, authoritative consensus signals, and sub-second HTML hydration.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#0F172A]">
                  <span className="size-1.5 rounded-full bg-[#23AB82] shrink-0" />
                  <span>
                    <strong className="font-semibold">Doctors Hero Proof:</strong> Ranked #1 on Google in 4 days
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#0F172A]">
                  <span className="size-1.5 rounded-full bg-[#23AB82] shrink-0" />
                  <span>Cited as primary vendor by ChatGPT &amp; Gemini answers</span>
                </div>
                <div className="flex items-center gap-2.5 text-[13.5px] text-[#0F172A]">
                  <span className="size-1.5 rounded-full bg-[#23AB82] shrink-0" />
                  <span>Sub-1s speed index keeping mobile buyers engaged</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* 3 Core Pillars */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StaggerItem className="surface-card p-6 space-y-3">
            <div className="size-10 rounded-xl bg-[#23AB82]/12 flex items-center justify-center text-[#158060]">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="font-display text-[16px] font-semibold text-[#0F172A]">
              1. Entity Graph Modeling
            </h4>
            <p className="text-[13.5px] text-[#475569] leading-[1.6]">
              We define your company, founders, and services in structured schema vocabularies so AI models recognize your brand as a verified authority.
            </p>
          </StaggerItem>

          <StaggerItem className="surface-card p-6 space-y-3">
            <div className="size-10 rounded-xl bg-[#4BB3F0]/15 flex items-center justify-center text-[#0B78B8]">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-display text-[16px] font-semibold text-[#0F172A]">
              2. Semantic Vector Indexing
            </h4>
            <p className="text-[13.5px] text-[#475569] leading-[1.6]">
              We calibrate your content for vector retrieval engines, matching the exact high-intent prompts buyers type into LLM chats.
            </p>
          </StaggerItem>

          <StaggerItem className="surface-card p-6 space-y-3">
            <div className="size-10 rounded-xl bg-[#23AB82]/12 flex items-center justify-center text-[#158060]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="font-display text-[16px] font-semibold text-[#0F172A]">
              3. Rapid Search Velocity
            </h4>
            <p className="text-[13.5px] text-[#475569] leading-[1.6]">
              Next.js App Router server rendering serves clean, hydration-ready HTML to Google and AI web crawlers within milliseconds.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href={AGENCY_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-growth-primary"
          >
            <Bot className="w-4 h-4" />
            <span>Make AI Models Recommend My Company</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
