"use client";

import { useEffect } from "react";
import type Lenis from "lenis";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (!prefersReducedMotion()) {
      Promise.all([loadGsap(), import("lenis")]).then(([{ gsap, ScrollTrigger }, { default: LenisCtor }]) => {
        if (cancelled) return;
        lenis = new LenisCtor({ autoRaf: false, duration: 1.1, smoothWheel: true });
        window.__lenis = lenis;
        lenis.on("scroll", (e) => {
          ScrollTrigger.update();
          window.dispatchEvent(new CustomEvent("lenis-scroll", { detail: e.velocity }));
        });
        tick = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      });
    }

    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href") ?? "";
      if (hash === "#") {
        event.preventDefault();
        if (window.__lenis) window.__lenis.scrollTo(0);
        else window.scrollTo({ top: 0 });
        return;
      }
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      event.preventDefault();
      if (window.__lenis) window.__lenis.scrollTo(target, { offset: -72 });
      else target.scrollIntoView();
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelled = true;
      document.removeEventListener("click", onClick);
      if (tick) {
        const t = tick;
        loadGsap().then(({ gsap }) => gsap.ticker.remove(t));
      }
      lenis?.destroy();
      delete window.__lenis;
    };
  }, []);

  return <>{children}</>;
}
