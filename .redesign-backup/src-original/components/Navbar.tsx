"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AGENCY_INFO } from "@/data/growthStudioData";
import BrandLogo from "@/components/BrandLogo";
import { APPLE_EASE } from "@/components/MotionPrimitives";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Growth Pillars", href: "#services" },
    { name: "GEO Advantage", href: "#geo" },
    { name: "Case Studies", href: "#work" },
    { name: "Founders", href: "#team" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <motion.header
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: APPLE_EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8FAF9]/88 backdrop-blur-xl border-b border-slate-900/8 py-3 shadow-[0_4px_24px_-12px_rgba(15,23,42,0.08)]"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <BrandLogo size="md" showTagline={true} />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13.5px] font-medium text-[#475569] hover:text-[#0F172A] transition-colors relative py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#23AB82] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Availability Pill & CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#23AB82]/8 border border-[#23AB82]/25 text-[11.5px] font-medium text-[#158060]">
              <span className="size-1.5 rounded-full bg-[#23AB82] animate-pulse" />
              <span>2 Sprint Slots Open</span>
            </div>

            <a
              href={AGENCY_INFO.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-growth-primary min-h-9 py-2 px-4 text-[13px]"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk to Founders</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-slate-900/10 text-[#0F172A] shadow-xs hover:bg-[#F1F5F4] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: APPLE_EASE }}
            className="lg:hidden overflow-hidden bg-[#F8FAF9]/98 backdrop-blur-xl border-b border-slate-900/10 shadow-lg"
          >
            <div className="px-5 py-5 space-y-4">
              <div className="flex flex-col space-y-2.5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[15px] font-medium text-[#334155] hover:text-[#158060] transition-colors py-1"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-900/8 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#23AB82]/10 border border-[#23AB82]/25 text-[12px] font-medium text-[#158060] w-fit">
                  <span className="size-1.5 rounded-full bg-[#23AB82] animate-pulse" />
                  <span>Available for 2 Client Sprints</span>
                </div>

                <a
                  href={AGENCY_INFO.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-growth-primary w-full text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss Project on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
