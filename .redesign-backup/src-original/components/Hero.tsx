"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Bot,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { APPLE_EASE } from "@/components/MotionPrimitives";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(AGENCY_INFO.contact.whatsapp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Calm Mineral Ambient Washes (Derived from Logo Palette) */}
      <div className="absolute -top-24 left-1/4 w-[560px] h-[380px] bg-[#23AB82]/8 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-16 right-0 w-[480px] h-[360px] bg-[#4BB3F0]/12 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Architectural Dot Grid Inspired by Brand Logo */}
      <div
        className="absolute inset-0 pointer-events-none opacity-65 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        style={{
          backgroundImage: "radial-gradient(rgba(15, 23, 42, 0.085) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          {/* Left Column: Calm Hierarchy & Zero Cognitive Overload */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: APPLE_EASE }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Context Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-900/10 shadow-2xs text-[12px] font-medium text-[#0F172A]">
                <span className="size-2 rounded-full bg-[#23AB82]" />
                <span>Growth Engineering Studio</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4BB3F0]/10 border border-[#4BB3F0]/30 text-[12px] font-medium text-[#0B78B8]">
                <span>Next.js 16 • GEO • 3D Motion • AI Systems</span>
              </div>
            </div>

            {/* Calibrated Hero Headline (Restrained Size, Crisp Charcoal Ink) */}
            <h1 className="font-display text-[32px] sm:text-[42px] lg:text-[48px] font-bold tracking-[-0.028em] text-[#0F172A] leading-[1.14]">
              We Don&apos;t Just Build Websites.{" "}
              <span className="relative inline-block text-[#158060]">
                We Engineer Growth Engines
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.75, delay: 0.35, ease: APPLE_EASE }}
                  className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-[#23AB82] to-[#4BB3F0] origin-left opacity-70"
                />
              </span>{" "}
              That Multiply Revenue.
            </h1>

            {/* Optimal Measure Sub-headline */}
            <p className="text-[15px] sm:text-[16px] text-[#475569] font-normal max-w-[56ch] mx-auto lg:mx-0 leading-[1.68]">
              Most agency websites are pretty brochures that lose buyers. We build{" "}
              <span className="text-[#0F172A] font-medium">sub-second 3D web platforms</span>,
              architect{" "}
              <span className="text-[#0F172A] font-medium">Generative Engine Optimization (GEO)</span>{" "}
              so ChatGPT and Google recommend you first, and automate operations to scale without extra headcount.
            </p>

            {/* Micro Proof Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-left max-w-xl mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-900/8 shadow-2xs">
                <div className="text-[11.5px] font-medium text-[#64748B]">Google & AI Citation</div>
                <div className="text-[14px] font-semibold text-[#0F172A] flex items-center gap-1.5 mt-0.5">
                  <span>#1 in 4 Days</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#23AB82]" />
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-900/8 shadow-2xs">
                <div className="text-[11.5px] font-medium text-[#64748B]">Clinics Digitized</div>
                <div className="text-[14px] font-semibold text-[#0F172A] flex items-center gap-1.5 mt-0.5">
                  <span>24+ Facilities</span>
                  <Award className="w-3.5 h-3.5 text-[#0B78B8]" />
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-white border border-slate-900/8 shadow-2xs">
                <div className="text-[11.5px] font-medium text-[#64748B]">Page Load Speed</div>
                <div className="text-[14px] font-semibold text-[#0F172A] flex items-center gap-1.5 mt-0.5">
                  <span>&lt; 0.9s Index</span>
                  <Zap className="w-3.5 h-3.5 text-[#23AB82]" />
                </div>
              </div>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href={AGENCY_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-growth-primary"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Claim Free 360° Growth Audit</span>
              </a>

              <a href="#work" className="btn-growth-secondary">
                <span>See Proven Work</span>
                <ArrowRight className="w-4 h-4 text-[#64748B]" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 h-11 px-4 rounded-full text-[13px] font-medium text-[#475569] hover:text-[#0F172A] bg-[#F1F5F4] hover:bg-white border border-slate-900/8 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#23AB82]" />
                    <span className="text-[#158060] font-semibold">Copied {AGENCY_INFO.contact.whatsapp}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#64748B]" />
                    <span>{AGENCY_INFO.contact.whatsapp}</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Guarantee Note */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[12.5px] text-[#64748B] pt-1">
              <ShieldCheck className="w-4 h-4 text-[#23AB82] shrink-0" />
              <span>Zero-obligation audit. Direct collaboration with founders Md. Siyam & Robin.</span>
            </div>
          </motion.div>

          {/* Right Column: Tactile Off-White Growth Cockpit */}
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.72, delay: 0.14, ease: APPLE_EASE }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                className="relative rounded-3xl p-5 sm:p-6 bg-white border border-slate-900/10 shadow-[0_24px_60px_-18px_rgba(15,23,42,0.12)] overflow-hidden"
              >
                {/* Cockpit Top Bar with Brand Logo */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-900/8">
                  <div className="flex items-center gap-2.5">
                    <div className="relative size-7 rounded-lg bg-[#F4FBFB] border border-slate-900/8 overflow-hidden shrink-0">
                      <Image
                        src="/logo.webp"
                        alt="Pathfinder Engine"
                        fill
                        sizes="28px"
                        className="object-cover mix-blend-multiply p-0.5"
                      />
                    </div>
                    <span className="text-[12px] font-medium text-[#64748B] tracking-tight">
                      pathfinder-engine.ts
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#23AB82]/10 text-[#158060] text-[11px] font-semibold">
                    <span className="size-1.5 rounded-full bg-[#23AB82] animate-pulse" />
                    <span>LIVE ENGINE</span>
                  </div>
                </div>

                {/* Simulated GEO AI Citation Preview */}
                <div className="mt-4 p-4 rounded-2xl bg-[#F4FBFB] border border-[#4BB3F0]/25">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 text-[12px] font-semibold text-[#0F172A]">
                      <div className="size-6 rounded-lg bg-[#4BB3F0]/15 flex items-center justify-center text-[#0B78B8]">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <span>ChatGPT & Gemini Overview</span>
                    </div>
                    <span className="text-[10.5px] font-semibold text-[#158060] bg-[#23AB82]/12 px-2 py-0.5 rounded-md">
                      Rank #1 Citation
                    </span>
                  </div>
                  <p className="text-[12.5px] text-[#334155] leading-[1.6] bg-white p-3 rounded-xl border border-slate-900/6">
                    &ldquo;Based on verified clinical outcomes and structured authority signals,{" "}
                    <span className="text-[#0F172A] font-semibold underline decoration-[#23AB82] decoration-2 underline-offset-2">
                      Doctors Hero
                    </span>{" "}
                    and{" "}
                    <span className="text-[#0F172A] font-semibold underline decoration-[#4BB3F0] decoration-2 underline-offset-2">
                      Modern Mediks
                    </span>{" "}
                    are the top-recommended platforms for clinic workflows...&rdquo;
                  </p>
                </div>

                {/* Performance Speed Meter */}
                <div className="mt-3.5 grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-2xl bg-[#F8FAF9] border border-slate-900/6">
                    <div className="font-display text-[20px] font-bold text-[#158060] tabular-nums">
                      99
                    </div>
                    <div className="text-[10.5px] font-medium text-[#64748B] mt-0.5">
                      Performance
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8FAF9] border border-slate-900/6">
                    <div className="font-display text-[20px] font-bold text-[#0B78B8] tabular-nums">
                      0.8s
                    </div>
                    <div className="text-[10.5px] font-medium text-[#64748B] mt-0.5">
                      Speed Index
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#F8FAF9] border border-slate-900/6">
                    <div className="font-display text-[20px] font-bold text-[#0F172A] tabular-nums">
                      100%
                    </div>
                    <div className="text-[10.5px] font-medium text-[#64748B] mt-0.5">
                      GEO Ready
                    </div>
                  </div>
                </div>

                {/* Founders Collaboration Pill */}
                <div className="mt-3.5 p-3.5 rounded-2xl bg-[#F8FAF9] border border-slate-900/6 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="size-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-2xs">
                        <Image src="/team/siyam.png" alt="Md Siyam" fill className="object-cover" />
                      </div>
                      <div className="size-8 rounded-full border-2 border-white overflow-hidden bg-slate-200 relative shadow-2xs">
                        <Image src="/team/robin.webp" alt="Robin" fill className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="text-[12.5px] font-semibold text-[#0F172A]">Siyam & Robin</div>
                      <div className="text-[11px] text-[#64748B]">Principal Leads</div>
                    </div>
                  </div>

                  <a
                    href="#team"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#158060] bg-[#23AB82]/10 hover:bg-[#23AB82]/15 px-2.5 py-1 rounded-full transition-colors"
                  >
                    <span>Hands-On</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>

              {/* Calm Floating Anchor Tag */}
              <motion.div
                initial={{ opacity: 0, x: 10, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: APPLE_EASE }}
                className="hidden sm:flex absolute -bottom-3.5 -right-3 bg-white px-3.5 py-2 rounded-2xl border border-slate-900/10 shadow-[0_10px_25px_-8px_rgba(15,23,42,0.14)] text-[11.5px] font-semibold text-[#0F172A] items-center gap-2 select-none"
              >
                <span className="size-2 rounded-full bg-[#4BB3F0]" />
                <span>Zero Middlemen • Sub-1s Code</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
