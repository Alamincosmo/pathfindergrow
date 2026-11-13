"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { CtaButton } from "@/components/TrackedLink";

const LINKS = [
  { name: "Growth", href: "#growth" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.__lenis?.start();
    };
  }, [open]);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-stage/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <BrandLogo tone="dark" />

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-[0.9375rem] font-medium text-paper/85 hover:text-paper"
            >
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CtaButton variant="lime" location="navbar" compact>
              Free audit
            </CtaButton>
          </div>
          <button
            ref={buttonRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-white/25 text-paper lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-white/10 bg-stage lg:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex flex-col py-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-b border-white/10 font-display text-2xl font-bold"
            >
              {l.name}
            </a>
          ))}
          <div className="pt-5">
            <CtaButton variant="lime" location="mobile-menu">
              Get your free growth audit
            </CtaButton>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const start = document.getElementById("start");
    if (!hero || !start || typeof IntersectionObserver === "undefined") return;
    let heroOut = false;
    let startIn = false;
    const update = () => setVisible(heroOut && !startIn);
    const heroIo = new IntersectionObserver(([e]) => {
      heroOut = !e.isIntersecting;
      update();
    });
    const startIo = new IntersectionObserver(([e]) => {
      startIn = e.isIntersecting;
      update();
    });
    heroIo.observe(hero);
    startIo.observe(start);
    return () => {
      heroIo.disconnect();
      startIo.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-3 z-40 flex justify-center px-4 transition-all duration-300 sm:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <CtaButton variant="lime" location="sticky-mobile" compact className="shadow-lg">
        Get your free growth audit
      </CtaButton>
    </div>
  );
}
