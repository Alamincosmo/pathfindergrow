const D =
  "M40 500 C 40 440 140 440 140 370 C 140 300 230 290 230 220 C 230 150 200 120 220 60";

export default function PathGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 540"
      className={className}
      role="img"
      aria-label="A line rising through three stations: Found, Chosen, Grow"
    >
      <path d={D} fill="none" stroke="rgba(13,27,22,0.18)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round" />
      <path
        d={D}
        pathLength={1}
        fill="none"
        stroke="#0B4A38"
        strokeWidth="4"
        strokeLinecap="round"
        className="path-draw"
      />

      <g className="station" style={{ "--d": "650ms" } as React.CSSProperties}>
        <circle cx="140" cy="370" r="11" fill="#F4F0E6" stroke="#0B4A38" strokeWidth="3" />
        <text x="162" y="376" className="fill-ink" style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 500, letterSpacing: "0.06em" }}>
          FOUND
        </text>
      </g>

      <g className="station" style={{ "--d": "950ms" } as React.CSSProperties}>
        <circle cx="230" cy="220" r="11" fill="#F4F0E6" stroke="#0B4A38" strokeWidth="3" />
        <text x="208" y="226" textAnchor="end" className="fill-ink" style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 500, letterSpacing: "0.06em" }}>
          CHOSEN
        </text>
      </g>

      <g className="station" style={{ "--d": "1250ms" } as React.CSSProperties}>
        <circle cx="220" cy="60" r="16" fill="#23AB82" stroke="#0B4A38" strokeWidth="3" />
        <text x="246" y="66" className="fill-forest" style={{ fontFamily: "var(--font-mono)", fontSize: 18, fontWeight: 500, letterSpacing: "0.06em" }}>
          GROW
        </text>
      </g>
    </svg>
  );
}
