# Redesign Progress

Scope: `DESIGN_BRIEF.md` (v3 direction section at the top overrides the v2 look). Originals: `.redesign-backup/` (`src-original/`, `replaced-components/`, v1 brief).

## State on 13 Nov 2026: design v3 "Growth Engine" built
- [x] Direction changed after founder feedback: serif and classic/luxury look removed; tech/SaaS look with heavy motion
- [x] Fonts: Bricolage Grotesque (display), Instrument Sans, IBM Plex Mono. Light/dark rhythm. New tokens, contrast calculated
- [x] Hero: per-letter CSS reveal, aurora and grid parallax, hub-and-spoke motion graphic with pointer parallax, magnetic CTA
- [x] Marquee band (speed and skew follow scroll velocity), word-by-word scroll highlight, scroll progress beam
- [x] Growth cards with 4 looping mini motion graphics (play only in view), spotlight hover
- [x] GEO scene (pinned, typed AI answer), Process timeline, Founders, Pricing, FAQ, Start form, Footer restyled
- [x] Work: card-fan arc (cards rise from below as a stack, then spread along an arc; phones get a swipe list)
- [x] 8 projects with real screenshots (7 images + Oushud text card), 3 more in "More work"
- [x] Fixed: Work fan overlapping its detail panel; GEO sticky scene; hero word spacing; scroll-word and card a11y issues; blur filters removed
- [x] Fixed: a mojibake bug I caused (UTF-8 read as ANSI by a PowerShell batch edit). Scanned all of `src`; none remain
- [x] `npx tsc --noEmit` clean, `npm run build` succeeds (first load JS 129 kB)

## Measured (Lighthouse mobile, local production build, slow-CPU machine without GPU)
Performance 60, Accessibility 100, Best Practices 96, SEO 100. FCP 1.8 s, LCP 3.7 s, TBT 1,590 ms, CLS 0.
LCP target (under 2.5 s) NOT met. Best Practices flag is the Vercel analytics script returning 404 on localhost (disappears on Vercel).
Blur filters were the biggest cost (Performance 51 to 60 after removing two). Untested next ideas: lighter shadows on the 8 fan cards, fewer simultaneous CSS animations, lazy-mount below-the-fold motion graphics.

## Open items
- Mobile page height 17,197 px (target 12,000 px).
- Not checked in a browser after v3: 360 / 768 / 1440 / 1920 px, keyboard pass, reduced-motion, Work list on a real phone, hover/tilt on touch.
- `pathfinderpeko.com` and `smartprojukti.com` timed out on 13 Nov; they are not linked. Smart Projukti is not on the page (no description, site down).
- Oushud screenshot stuck on its loading screen; card shows text only.
- Audiofrica: "3 to 4 million users", "top in Africa", "number 1 in Freetown" are NOT on the site (no public proof; store pages only show the owner's own "#1" lines). Needs an analytics export or screenshot.
- Roles for the 6 new projects were not given; cards say "Client project".
- `framer-motion` is installed but no longer imported (can be uninstalled).
- `npm run lint` cannot run (eslint not installed).
- Refund promise terms still to settle before launch.
