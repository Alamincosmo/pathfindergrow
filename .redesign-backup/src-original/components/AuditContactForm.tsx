"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { FadeUp } from "@/components/MotionPrimitives";

const ACCESS_KEY = "13a86ba8-052f-4aaa-91e6-6130bb542d21";

export default function AuditContactForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    websiteUrl: "",
    contactMethod: "",
    goal: "3D Website & High Conversion",
    budget: "$490 - $1,200",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.businessName,
          website: formData.websiteUrl,
          contact: formData.contactMethod,
          goal: formData.goal,
          budget: formData.budget,
          message: formData.message,
          subject: `New Growth Audit Request from ${formData.businessName} (${formData.budget})`,
          from_name: "Pathfinder Grow Client Inbound",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit. Please message directly on WhatsApp.");
      }
    } catch (err) {
      console.error("Form error:", err);
      setStatus("error");
      setErrorMessage("Network connection issue. You can message directly on WhatsApp!");
    }
  };

  const inputClass =
    "w-full px-3.5 py-2.5 rounded-xl bg-[#F8FAF9] border border-slate-900/12 text-[#0F172A] placeholder:text-[#94A3B8] text-[14px] focus:bg-white focus:border-[#23AB82] focus:ring-3 focus:ring-[#23AB82]/12 focus:outline-none transition-all";

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden bg-[#F1F5F4]/80 border-t border-slate-900/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <FadeUp className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[#158060]">
              <Clock className="w-3.5 h-3.5" />
              <span>Speed to Lead (Under 15 Mins)</span>
            </div>

            <h2 className="font-display text-[26px] sm:text-[34px] font-bold tracking-[-0.024em] text-[#0F172A] leading-[1.2]">
              Let&apos;s Build Your{" "}
              <span className="text-[#158060]">Market Advantage</span>
            </h2>

            <p className="text-[14.5px] sm:text-[15px] text-[#475569] leading-[1.65]">
              Whether you need to replace a slow website, capture AI search recommendations with GEO, or engineer a custom cloud operating system — we are ready to sprint.
            </p>

            {/* Founder Direct Cards */}
            <div className="space-y-3 pt-1">
              <a
                href={AGENCY_INFO.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#23AB82]/30 hover:border-[#23AB82] shadow-2xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#23AB82]/12 flex items-center justify-center text-[#158060] group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#0F172A] group-hover:text-[#158060] transition-colors">
                      WhatsApp Founders Directly
                    </div>
                    <div className="text-[12px] text-[#64748B]">
                      Average response time: &lt; 15 minutes
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#23AB82] group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={AGENCY_INFO.contact.emailLink}
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-900/10 hover:border-[#4BB3F0]/50 shadow-2xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-[#4BB3F0]/14 flex items-center justify-center text-[#0B78B8]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#0F172A]">
                      Send RFP / Project Email
                    </div>
                    <div className="text-[12px] text-[#64748B]">
                      {AGENCY_INFO.contact.email}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#0F172A] transition-colors" />
              </a>
            </div>

            {/* Confidentiality Note */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/80 border border-slate-900/8 text-[12.5px] text-[#475569] leading-[1.55]">
              <ShieldCheck className="w-5 h-5 text-[#23AB82] shrink-0 mt-0.5" />
              <span>
                100% Confidential. We sign NDAs for proprietary enterprise workflows and HealthTech systems before reviewing sensitive IP.
              </span>
            </div>
          </FadeUp>

          {/* Right Column: Interactive Growth Audit Form */}
          <FadeUp
            delay={0.08}
            className="lg:col-span-7 rounded-3xl bg-white border border-slate-900/10 p-6 sm:p-9 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.1)]"
          >
            {status === "success" ? (
              <div className="text-center py-10 space-y-4">
                <div className="size-14 rounded-full bg-[#23AB82]/15 border border-[#23AB82]/30 flex items-center justify-center text-[#158060] mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-[22px] font-bold text-[#0F172A]">
                  Audit Request Dispatched
                </h3>
                <p className="text-[14px] text-[#475569] max-w-md mx-auto leading-[1.6]">
                  Both Siyam and Robin have received your brief. We will review your digital footprint and reply within hours.
                </p>
                <div className="pt-3">
                  <a
                    href={AGENCY_INFO.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-growth-primary"
                  >
                    <span>Ping on WhatsApp for Instant Confirmation</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="pb-1">
                  <h3 className="font-display text-[20px] font-bold text-[#0F172A] mb-1">
                    Request a Free 360° Growth Audit
                  </h3>
                  <p className="text-[13px] text-[#64748B]">
                    Tell us where your business stands today and where you want to scale.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#334155] mb-1.5">
                      Business or Project Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Modern Mediks / Apex SaaS"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#334155] mb-1.5">
                      Current Website URL (If Any)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://mycompany.com"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#334155] mb-1.5">
                      WhatsApp or Email Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 017xxxxxxxx or name@company.com"
                      value={formData.contactMethod}
                      onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#334155] mb-1.5">
                      Estimated Sprint Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className={inputClass}
                    >
                      <option value="$490 - $1,200">$490 - $1,200 (৳55k - ৳135k)</option>
                      <option value="$1,500 - $3,500">$1,500 - $3,500 (৳170k - ৳400k)</option>
                      <option value="$3,500+">$3,500+ (Enterprise Custom Scale)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#334155] mb-1.5">
                    Primary Scaling Goal
                  </label>
                  <select
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className={inputClass}
                  >
                    <option value="3D Website & High Conversion">
                      High-Conversion 3D Interactive Web Platform
                    </option>
                    <option value="GEO & Google AI Search Dominance">
                      Generative Engine Optimization (GEO) &amp; Google #1 Rank
                    </option>
                    <option value="Full Brand Identity & High-Ticket Polish">
                      Complete Brand Identity, Logo &amp; Visual Language
                    </option>
                    <option value="Custom System Automation / Clinic OS">
                      Custom Cloud Architecture, Clinic OS &amp; Workflow Automation
                    </option>
                    <option value="Cross-Platform Flutter Mobile App">
                      Cross-Platform Mobile App (iOS &amp; Android)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11.5px] font-semibold uppercase tracking-[0.04em] text-[#334155] mb-1.5">
                    What is your biggest current bottleneck? (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Visitors bounce from our site, competitors outrank us, or manual workflows slow our team down..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-[12.5px]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-growth-primary w-full py-3.5"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Growth Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Free 360° Growth Audit</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
