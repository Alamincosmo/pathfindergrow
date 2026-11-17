export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="280 150 464 680"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="512" cy="249" r="88" fill="#23AB82" />
      <polyline points="316,611 512,415 707,611" fill="none" stroke="#4BB3F0" strokeWidth="75" />
      <polyline points="322,776 512,588 702,776" fill="none" stroke="#4BB3F0" strokeWidth="75" />
    </svg>
  );
}

export default function BrandLogo({
  tone = "light",
  showTagline = false,
  href = "#",
}: {
  tone?: "light" | "dark";
  showTagline?: boolean;
  href?: string;
}) {
  const dark = tone === "dark";
  return (
    <a
      href={href}
      aria-label="PathFinder Grow home"
      className="inline-flex items-center gap-3"
    >
      <LogoMark className="h-9 w-auto" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.375rem] font-semibold tracking-[-0.02em] ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          PathFinder{" "}
          <span className={dark ? "text-emerald" : "text-emerald-ink"}>Grow</span>
        </span>
        {showTagline && (
          <span
            className={`t-label mt-1.5 ${dark ? "text-muted-dark" : "text-muted"}`}
          >
            Business growth company
          </span>
        )}
      </span>
    </a>
  );
}
