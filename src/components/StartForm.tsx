"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { CtaButton, TrackedLink } from "@/components/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";
import { track } from "@/lib/track";

const ACCESS_KEY = "13a86ba8-052f-4aaa-91e6-6130bb542d21";

export default function StartForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("company_website")) {
      setStatus("success");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: data.get("name"),
          contact: data.get("contact"),
          message: data.get("message"),
          subject: `New growth audit request from ${data.get("name")}`,
          from_name: "Pathfinder Grow website",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        track("form_submit_success");
      } else {
        setStatus("error");
        setError(json.message || "Could not send your request. Please message us on WhatsApp.");
        track("form_error");
      }
    } catch {
      setStatus("error");
      setError("Network problem. Please message us on WhatsApp instead.");
      track("form_error");
    }
  }

  return (
    <section id="start" className="on-dark relative isolate overflow-hidden bg-stage text-paper section-y">
      <div className="aurora -right-[10%] top-[10%] -z-10 size-[60vw] max-w-[720px] bg-[radial-gradient(closest-side,rgba(53,224,161,0.22),transparent)]" />
      <div className="tech-grid absolute inset-0 -z-10 opacity-60" />

      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow className="text-mint">Start here</Eyebrow>
          <h2 className="t-display-l mt-4">
            Tell us what you want to <strong>grow.</strong>
          </h2>
          <p className="t-lead mt-6 text-muted-dark">
            Free audit, no obligation. You talk directly to the founders. We sign an NDA before
            reviewing sensitive work.
          </p>
          <div className="mt-8 flex flex-col items-start gap-5">
            <CtaButton variant="lime" location="start">
              Message us on WhatsApp
            </CtaButton>
            <TrackedLink
              href={AGENCY_INFO.contact.emailLink}
              event="email_click"
              eventProps={{ location: "start" }}
              className="link-underline inline-flex items-center gap-2 font-medium text-mint"
            >
              <Mail className="size-4" strokeWidth={1.75} />
              {AGENCY_INFO.contact.email}
            </TrackedLink>
          </div>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-night-3/80 p-6 sm:p-9">
            {status === "success" ? (
              <div role="status" className="py-8 text-center">
                <CheckCircle2 className="mx-auto size-10 text-mint" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-3xl font-bold">Request received</h3>
                <p className="mx-auto mt-3 max-w-md text-muted-dark">
                  Both founders have your message. We will reply on the contact you gave.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <h3 className="font-display text-2xl font-bold">Request a free growth audit</h3>

                <div>
                  <label htmlFor="name" className="mb-2 block text-[0.9375rem] font-medium">
                    Your name or business
                  </label>
                  <input id="name" name="name" type="text" required autoComplete="name" className="field" placeholder="e.g. City Clinic" />
                </div>

                <div>
                  <label htmlFor="contact" className="mb-2 block text-[0.9375rem] font-medium">
                    WhatsApp number or email
                  </label>
                  <input id="contact" name="contact" type="text" required inputMode="email" autoComplete="email" className="field" placeholder="e.g. 017xxxxxxxx or name@company.com" />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-[0.9375rem] font-medium">
                    What should we look at? <span className="text-muted-dark">(optional)</span>
                  </label>
                  <textarea id="message" name="message" rows={4} className="field resize-none" placeholder="Your website address, or what is holding your growth back" />
                </div>

                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px]"
                />

                <div aria-live="polite">
                  {status === "error" && (
                    <p className="flex items-start gap-2 rounded-lg border border-white/20 bg-stage px-3 py-3 text-[0.9375rem]">
                      <AlertCircle className="mt-0.5 size-4 shrink-0 text-lime" />
                      <span>{error}</span>
                    </p>
                  )}
                </div>

                <button type="submit" disabled={status === "loading"} className="btn-lime disabled:opacity-70">
                  <span>{status === "loading" ? "Sending..." : "Send my request"}</span>
                  <span className="btn-chip" aria-hidden="true">
                    {status === "loading" ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" strokeWidth={1.75} />}
                  </span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
