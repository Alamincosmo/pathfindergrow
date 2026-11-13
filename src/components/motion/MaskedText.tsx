"use client";

import { useEffect, useRef } from "react";

/**
 * Words rise out of a mask with a slight 3D tilt and clear from blur, once, when the text
 * scrolls into view. Same family of motion as KineticIntro, for headings that scroll normally.
 */
export function MaskedText({
  text,
  as = "h3",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("mt-in");
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("mt-in");
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`mt ${className}`}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      {text.split(/\s+/).map((w, i) => (
        <span key={i}>
          <span className="mt-word">
            <span className="mt-inner" style={{ "--i": i } as React.CSSProperties}>
              {w}
            </span>
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}
