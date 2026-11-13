"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { track } from "@/lib/track";

type EventProps = Record<string, string | number | boolean | null>;

export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...rest
}: React.ComponentProps<"a"> & {
  event?: string;
  eventProps?: EventProps;
}) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        if (event) track(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}

function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    let xTo: ((v: number) => void) | undefined;
    let yTo: ((v: number) => void) | undefined;
    let dead = false;

    const onEnter = async () => {
      if (xTo) return;
      const { gsap } = await loadGsap();
      if (dead) return;
      xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
    };
    const onMove = (e: PointerEvent) => {
      if (!xTo || !yTo) return;
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo?.(0);
      yTo?.(0);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      dead = true;
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, strength]);
}

export function CtaButton({
  location,
  children,
  variant = "primary",
  compact = false,
  className = "",
}: {
  location: string;
  children: React.ReactNode;
  variant?: "primary" | "lime";
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref, 0.28);

  return (
    <TrackedLink
      ref={ref}
      href={AGENCY_INFO.contact.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      event="whatsapp_click"
      eventProps={{ location }}
      className={`${variant === "lime" ? "btn-lime" : "btn-primary"} ${
        compact ? "btn-compact" : ""
      } ${className}`}
    >
      <span>{children}</span>
      <span className="btn-chip" aria-hidden="true">
        <ArrowUpRight className="size-4" strokeWidth={1.75} />
      </span>
    </TrackedLink>
  );
}
