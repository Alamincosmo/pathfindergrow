"use client";

import React from "react";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  return (
    <footer className="border-t border-slate-900/8 bg-[#F1F5F4] py-14 text-[#475569] text-[13px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-slate-900/8">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="sm" showTagline={true} />

            <p className="text-[13px] text-[#475569] leading-[1.65] max-w-sm">
              We engineer high-converting 3D web platforms, Generative Engine Optimization (GEO), high-ticket brand identities, and resilient automated cloud systems that multiply enterprise revenue.
            </p>

            <div className="flex items-center gap-2 text-[12.5px] text-[#64748B] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#23AB82] shrink-0" />
              <span>{AGENCY_INFO.contact.location}</span>
            </div>
          </div>

          {/* Col 3: Growth Pillars */}
          <div className="space-y-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0F172A]">
              Growth Pillars
            </div>
            <ul className="space-y-2 text-[13px] text-[#475569]">
              <li><a href="#services" className="hover:text-[#158060] transition-colors">3D Interactive Web Platforms</a></li>
              <li><a href="#geo" className="hover:text-[#158060] transition-colors">Generative Engine Optimization</a></li>
              <li><a href="#services" className="hover:text-[#158060] transition-colors">Brand Identity & Vector Logos</a></li>
              <li><a href="#services" className="hover:text-[#158060] transition-colors">Cloud & CRM Automation</a></li>
              <li><a href="#services" className="hover:text-[#158060] transition-colors">Cross-Platform Flutter Apps</a></li>
            </ul>
          </div>

          {/* Col 4: Proof & Playbook */}
          <div className="space-y-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0F172A]">
              Track Record
            </div>
            <ul className="space-y-2 text-[13px] text-[#475569]">
              <li><a href="#work" className="hover:text-[#158060] transition-colors">Doctors Hero (#1 in 4 Days)</a></li>
              <li><a href="#work" className="hover:text-[#158060] transition-colors">Modern Mediks (24+ Clinics)</a></li>
              <li><a href="#work" className="hover:text-[#158060] transition-colors">Pathfinder Peko (10k+ Learners)</a></li>
              <li><a href="#team" className="hover:text-[#158060] transition-colors">Meet Co-Founders Siyam & Robin</a></li>
              <li><a href="#pricing" className="hover:text-[#158060] transition-colors">Sprint Pricing & Guarantees</a></li>
            </ul>
          </div>

          {/* Col 5: Direct Fast-Track Contact */}
          <div className="space-y-3">
            <div className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#0F172A]">
              Direct Contact
            </div>
            <div className="space-y-2.5">
              <a
                href={AGENCY_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#158060] hover:text-[#0F172A] font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#23AB82]" />
                <span>WhatsApp: {AGENCY_INFO.contact.whatsapp}</span>
              </a>

              <a
                href={AGENCY_INFO.contact.emailLink}
                className="flex items-center gap-2 text-[#475569] hover:text-[#0F172A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0B78B8]" />
                <span>{AGENCY_INFO.contact.email}</span>
              </a>
            </div>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#23AB82]/10 text-[#158060] text-[11px] font-medium border border-[#23AB82]/25">
                <span className="size-1.5 rounded-full bg-[#23AB82] animate-pulse" />
                Open for Client Sprints
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#64748B]">
          <div>© {new Date().getFullYear()} Pathfinder Grow. All rights reserved.</div>
          <div className="flex items-center gap-1">
            <span>Engineered with tactile precision by</span>
            <span className="text-[#0F172A] font-semibold">Siyam & Robin</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
