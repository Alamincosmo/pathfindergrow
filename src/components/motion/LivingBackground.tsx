/**
 * Soft living background for pinned scenes. Pure CSS, no hooks:
 *  - two drifting wave layers along the bottom edge,
 *  - three floating shapes (ring, pill, diamond) on different depths,
 *  - everything reads CSS variables the parent updates: --p (scroll progress 0..1)
 *    and --mx / --my (pointer, -0.5..0.5), so the scene has real depth.
 * The parent sets data-live="false" on .lb to pause the loops while off screen.
 */
const WAVE =
  "M0 100 Q 150 20 300 100 T 600 100 T 900 100 T 1200 100 T 1500 100 T 1800 100 T 2100 100 T 2400 100 V200 H0Z";

export function LivingBackground() {
  return (
    <div className="lb" data-live="true" aria-hidden="true">
      <div className="lb-world">
        <div
          className="lb-orb -left-[10%] top-[8%] size-[60vmin]"
          style={{ background: "radial-gradient(closest-side, rgba(35,171,130,0.22), transparent)" }}
        />
        <div
          className="lb-orb -right-[8%] bottom-[10%] size-[52vmin]"
          style={{ background: "radial-gradient(closest-side, rgba(75,179,240,0.16), transparent)" }}
        />

        <div className="lb-shape right-[9%] top-[16%]" style={{ "--k": 46, "--s": -110, "--r": 60, "--z": "70px" } as React.CSSProperties}>
          <span style={{ "--fd": "7s" } as React.CSSProperties}>
            <svg width="92" height="92" viewBox="0 0 92 92" fill="none">
              <circle cx="46" cy="46" r="40" stroke="#23AB82" strokeOpacity="0.45" strokeWidth="3" />
              <circle cx="46" cy="46" r="22" stroke="#23AB82" strokeOpacity="0.2" strokeWidth="2" />
            </svg>
          </span>
        </div>
        <div className="lb-shape left-[7%] bottom-[24%]" style={{ "--k": -30, "--s": -70, "--r": -35, "--z": "30px" } as React.CSSProperties}>
          <span style={{ "--fd": "9s" } as React.CSSProperties}>
            <svg width="150" height="52" viewBox="0 0 150 52" fill="none">
              <rect x="1.5" y="1.5" width="147" height="49" rx="24.5" fill="#4BB3F0" fillOpacity="0.12" stroke="#4BB3F0" strokeOpacity="0.4" strokeWidth="2" />
            </svg>
          </span>
        </div>
        <div className="lb-shape right-[22%] bottom-[18%]" style={{ "--k": 64, "--s": -150, "--r": 90, "--z": "110px" } as React.CSSProperties}>
          <span style={{ "--fd": "6s" } as React.CSSProperties}>
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
              <rect x="10" y="10" width="38" height="38" rx="6" transform="rotate(45 29 29)" fill="#23AB82" fillOpacity="0.14" stroke="#23AB82" strokeOpacity="0.5" strokeWidth="2" />
            </svg>
          </span>
        </div>
      </div>

      <svg className="lb-wave" viewBox="0 0 2400 200" preserveAspectRatio="none">
        <path d={WAVE} fill="rgba(35,171,130,0.10)" />
      </svg>
      <svg className="lb-wave is-2" viewBox="0 0 2400 200" preserveAspectRatio="none">
        <path d={WAVE} fill="rgba(75,179,240,0.08)" />
      </svg>
    </div>
  );
}
