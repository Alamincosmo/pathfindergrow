# Redesign Progress

Source of truth for scope: `DESIGN_BRIEF.md`. Update this file at the end of every step.
Status values: todo / doing / done / blocked.

## Phase 1: strategy
- [x] Audit components, data, live site at 375 / 768 / 1440 (done 12 Nov 2026)
- [x] DESIGN_BRIEF.md written
- [ ] Founder answers to brief section J (blocks the steps marked BLOCKED)

## Phase 2: build (start only after approval)
- [ ] 1. Fonts and tokens (font test first, then globals.css tokens, contrast re-run)
- [ ] 2. Motion foundation (SmoothScroll on GSAP ticker, reduced motion, anchors, remove CSS smooth scroll)
- [ ] 3. Navbar, logo dark variant, buttons, focus styles
- [ ] 4. Hero (copy, CSS entrance, Path graphic, CTA above fold at 375x812)
- [ ] 5. Proof strip (BLOCKED on founder proof for any number; ship named live links only otherwise)
- [ ] 6. Services (4 pillars, accordion, add creative / ads / graphics; BLOCKED on creative portfolio info for samples)
- [ ] 7. GEO stage scene (illustration unless real captures supplied)
- [ ] 8. Work (3 featured + see all; BLOCKED on links for Modern Mediks and Techfrica)
- [ ] 9. Process scene
- [ ] 10. Founders, Pricing, FAQ (BLOCKED on guarantee decision and verified bio facts)
- [ ] 11. Contact form (3 fields, labels, honeypot, states)
- [ ] 12. SEO / GEO layer (metadata, robots, sitemap, JSON-LD, OG image)
- [ ] 13. QA: tsc, lint, build, Lighthouse mobile, contrast, screenshots at 360/375/768/1024/1440/1920, reduced motion

## Next concrete step
Get founder answers to brief section J, then start step 1.

## Decisions made
- Direction B "Signal on Paper" chosen (light editorial, one dark GEO stage).
- Hero headline recommendation: "Grow your business online. One team, from brand to AI search." (to confirm)
- No unverified claim ships (brief section B.3).
- Mobile page height target: 12,000 px or less (currently 22,289 px).
- Backups of replaced components go to `.redesign-backup/` (folder is not a git repo).
