"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Award, CheckCircle2, MessageCircle } from "lucide-react";
import { TEAM_MEMBERS, AGENCY_INFO } from "@/data/growthStudioData";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/MotionPrimitives";

export default function FoundersTandem() {
  return (
    <section id="team" className="py-20 sm:py-28 relative overflow-hidden bg-[#F1F5F4]/80 border-y border-slate-900/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeUp className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#158060] mb-3.5">
            <Award className="w-3.5 h-3.5" />
            <span>The Mastermind Duo</span>
          </div>

          <h2 className="font-display text-[26px] sm:text-[34px] lg:text-[36px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
            Direct Access to Technical Co-Founders.{" "}
            <span className="text-[#158060]">Zero Junior Middlemen.</span>
          </h2>

          <p className="text-[15px] text-[#475569] mt-3.5 leading-[1.65]">
            Most agencies hand you off to inexperienced juniors after the sales call. At Pathfinder Grow, you build directly with veteran architects writing production code.
          </p>
        </FadeUp>

        {/* Founders Profiles Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <StaggerItem
              key={member.name}
              className="surface-card p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative size-24 sm:size-28 rounded-2xl overflow-hidden border border-slate-900/10 shadow-sm bg-[#F4FBFB] shrink-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4BB3F0]/12 text-[#0B78B8] text-[11px] font-semibold border border-[#4BB3F0]/25">
                      <Sparkles className="w-3 h-3" />
                      <span>{member.badge}</span>
                    </div>

                    <h3 className="font-display text-[21px] font-bold text-[#0F172A] tracking-[-0.015em]">
                      {member.name}
                    </h3>

                    <div className="text-[13.5px] font-medium text-[#475569]">
                      {member.role}
                    </div>

                    <div className="text-[12px] font-semibold text-[#158060]">
                      {member.experience}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-[14px] text-[#475569] leading-[1.65]">
                  {member.bio}
                </p>

                {/* Core Specialty Box */}
                <div className="p-4 rounded-2xl bg-[#F4FBFB] border border-slate-900/8">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748B] mb-1">
                    Leadership Focus
                  </div>
                  <p className="text-[13.5px] font-medium text-[#0F172A] leading-[1.5]">
                    {member.specialty}
                  </p>
                </div>

                {/* Key Achievements */}
                <div>
                  <div className="text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#64748B] mb-2.5">
                    Verified Milestones
                  </div>
                  <div className="space-y-2">
                    {member.achievements.map((ach, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#23AB82] shrink-0 mt-0.5" />
                        <span className="text-[13px] text-[#334155] leading-[1.45]">
                          {ach}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills Footer */}
              <div className="pt-5 mt-6 border-t border-slate-900/6 flex flex-wrap gap-1.5">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-full bg-[#F1F5F4] border border-slate-900/6 text-[11.5px] font-medium text-[#334155]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href={AGENCY_INFO.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-growth-primary"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect Directly with Siyam &amp; Robin</span>
          </a>
        </div>
      </div>
    </section>
  );
}
