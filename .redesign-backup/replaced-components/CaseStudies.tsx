"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, CheckCircle2, Award } from "lucide-react";
import { CASE_STUDIES, AGENCY_INFO } from "@/data/growthStudioData";
import { FadeUp, APPLE_EASE } from "@/components/MotionPrimitives";

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { label: "All Work", id: "all" },
    { label: "GEO & AI Search", id: "geo" },
    { label: "HealthTech & SaaS", id: "saas" },
    { label: "Real-time & EdTech", id: "realtime" },
  ];

  const filteredProjects = CASE_STUDIES.filter((study) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "geo") return study.category.toLowerCase().includes("geo");
    if (activeFilter === "saas")
      return (
        study.category.toLowerCase().includes("saas") ||
        study.category.toLowerCase().includes("healthcare")
      );
    if (activeFilter === "realtime")
      return (
        study.category.toLowerCase().includes("realtime") ||
        study.category.toLowerCase().includes("full-stack")
      );
    return true;
  });

  return (
    <section id="work" className="py-20 sm:py-28 relative overflow-hidden bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#158060] mb-3.5">
              <Award className="w-3.5 h-3.5" />
              <span>Battle-Tested Proof</span>
            </div>

            <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
              Real Systems Scaled.{" "}
              <span className="text-[#158060]">Measurable Revenue Multiplied.</span>
            </h2>

            <p className="text-[14.5px] sm:text-[15px] text-[#475569] mt-3 leading-[1.65]">
              Production platforms and enterprise systems we have architected, deployed, and scaled for real organizations.
            </p>
          </div>

          {/* Framer Motion Sliding Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-full bg-[#F1F5F4] border border-slate-900/8 w-fit">
            {categories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveFilter(cat.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-colors cursor-pointer ${
                    isActive ? "text-[#0F172A]" : "text-[#64748B] hover:text-[#0F172A]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeWorkFilter"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-white border border-slate-900/8 shadow-2xs"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </FadeUp>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: APPLE_EASE }}
              whileHover={{ y: -4 }}
              className="group surface-card p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Visual Thumbnail */}
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-[#F4FBFB] border border-slate-900/6">
                  <Image
                    src={project.image}
                    alt={project.client}
                    fill
                    className="object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/92 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#0F172A] border border-slate-900/8 shadow-2xs">
                    {project.category}
                  </div>
                </div>

                {/* Metrics Pill */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/20 text-[11.5px] font-semibold text-[#158060]">
                  <Sparkles className="w-3 h-3 text-[#23AB82]" />
                  <span>{project.metrics}</span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="font-display text-[18px] font-bold text-[#0F172A] group-hover:text-[#158060] transition-colors flex items-center justify-between gap-2">
                    <span>{project.client}</span>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#64748B] hover:text-[#0F172A] p-1 rounded-lg hover:bg-[#F1F5F4] transition-colors"
                        aria-label={`View ${project.client} live project`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </h3>
                  <div className="text-[12.5px] font-medium text-[#64748B] mt-0.5">
                    {project.tagline}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13.5px] text-[#475569] leading-[1.6]">
                  {project.description}
                </p>

                {/* Key Impact Bullets */}
                <div className="space-y-2 pt-3 border-t border-slate-900/6">
                  {project.impactBullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#23AB82] shrink-0 mt-0.5" />
                      <span className="text-[12.5px] text-[#334155] leading-[1.45]">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tech Tags */}
              <div className="pt-4 mt-5 border-t border-slate-900/6 flex flex-wrap gap-1.5">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-full bg-[#F1F5F4] border border-slate-900/6 text-[11px] font-medium text-[#475569]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <FadeUp className="mt-14 rounded-3xl bg-gradient-to-r from-[#F4FBFB] via-white to-[#EFF9F6] border border-[#23AB82]/25 p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_32px_-14px_rgba(35,171,130,0.14)]">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-display text-[20px] sm:text-[22px] font-bold text-[#0F172A]">
              Want Similar Results Engineered for Your Brand?
            </h3>
            <p className="text-[14px] text-[#475569] max-w-xl leading-[1.6]">
              We audit your current bottlenecks, conversion friction, and AI search presence — then map out a concrete growth blueprint.
            </p>
          </div>

          <a
            href={AGENCY_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-growth-primary whitespace-nowrap shrink-0"
          >
            <span>Request Free Case Study Review</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
