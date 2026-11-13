# Pathfinder Grow — Design Brief (Phase 1)

Status: draft for founder approval. No source files were changed to produce this. Audit date: 12 Nov 2026, dev server on Next.js 15.5.29.
Evidence used: every component read in full, plus live measurements and screenshots at 375, 768 and 1440 px, plus a contrast calculation.

---

## A. Positioning

**One-sentence promise (proposed):** One hands-on founder team that grows your business online: brand, creative, website, search and AI visibility, built and shipped by the people you meet.

**Audience:** Owners and marketing decision-makers of small and mid-size businesses (clinics and healthcare are the strongest proof vertical), usually on a phone, deciding in seconds whether we look serious.

**Three buyer objections and how the page answers each**

| Objection | Answer on the page |
|---|---|
| "Another agency that sells nice visuals but no results." | Proof first: named live projects (clickable), one defensible number each, an audit-first start. Claims we cannot prove are removed (see B.3). |
| "Can two people really do brand, ads, web, SEO and backend? Will they disappear?" | One connected growth system (4 pillars, not 12 items), named founders with real work, a dated 4-step process, a visible start price. |
| "What does it cost and what is the risk?" | "From" pricing in the open, free audit with no obligation, no hard guarantees unless the founders approve exact wording. |

---

## B. Audit findings

### B.1 Measured facts (live site)

| Metric | Mobile 375 | Tablet 768 | Desktop 1440 |
|---|---|---|---|
| Page height | 22,289 px (about 27 screens) | not measured | 11,345 px |
| Horizontal overflow | none | none seen | none |
| h1 / h2 / h3 | 1 / 8 / 22 | | |
| Text nodes under 12 px | 106 | | |
| WhatsApp CTA links on the page | 10 | | |
| `<label>`s with no `htmlFor`/wrapping input | 6 (contact form) | | |
| Fonts loaded | Inter 400/500/600, Plus Jakarta Sans 600/700 | | |
| CSS `scroll-behavior` | `smooth` (conflicts with Lenis) | | |
| Largest mobile sections | Case studies 4,484 px, Founders 2,723 px, Pricing 2,420 px | | |

### B.2 Problems, ranked by conversion impact

**1. Strategy and message**
1. Hero tries to say everything: two pills, headline, paragraph, 3 stat tiles, 3 controls, a trust line and a dashboard card. At 375 px the primary CTA sits at the very bottom edge of the first screen (about y=792 of 812).
2. We sell "3D interactive web platforms", but this site has no 3D and no interactive storytelling. A buyer who scrolls sees a standard card layout, so the claim is contradicted by the evidence. Either reposition to "interactive, story-driven" and show it, or drop "3D".
3. Services data covers logo and brand collateral, web, GEO, automation and Flutter apps. **Ad design, viral ad creative, graphics and social design are not on the site at all**, although they are part of the offer. The "mobile app" pillar is over-weighted relative to what you described.
4. The same proof (#1 in 4 days) is repeated in at least six places (hero tile, stats bar, GEO section, case study, footer, founder bios). Repetition reads as a thin evidence base.
5. All 11 sections share one template (pill badge, centered h2, paragraph, card grid). There is no change of pace, so attention drops and nothing feels "signature".

**2. Cognitive load**
1. Nav has 6 links plus an availability pill plus a CTA (Hick's law: too many equal-weight choices).
2. Every section ends with its own WhatsApp CTA with different wording, 10 in total.
3. Case studies show 5 cards with filter pills for 5 items, each with a description, 3 bullets and a tag row.
4. Founder cards carry bio, specialty, 3 milestones and 6 skill tags each, which is far beyond what a visitor reads.
5. Contact form asks 6 fields including budget before any conversation.
6. 106 text nodes below 12 px (labels, tags, captions) are hard to read on a phone.

**3. Visual design**
1. Inter plus Plus Jakarta Sans, off-white with emerald/sky: clean but it is the default "SaaS template" look, and Inter is the first font Anthropic's own guidance tells designers to avoid.
2. Pills and rounded cards everywhere, so no hierarchy of scale. Hero h1 is only 32 / 42 / 48 px, timid for a premium positioning.
3. Pillar tab labels are generated from `title.split(" ")` and read "High-Conversion 3D", "Generative Engine", "Strategic Brand", "Intelligent Business", "Cross-Platform Mobile": clipped and unclear.
4. On 375 px the hero underline element for the wrapped phrase renders as a stray teal dash at the left edge of line 3.
5. `BrandLogo` uses `mix-blend-multiply` on a light tile, so it will break on dark backgrounds. A dark-mode logo variant is needed for any dark section.
6. Dummy filename in `public/`: `WhatsApp Image 2026-11-11 at 10.35.14 PM.webp` (spaces, not referenced by any component I read). Rename or remove after confirming.

**4. Motion and performance**
1. `gsap` and `lenis` are installed but GSAP is not used anywhere. `SmoothScroll.tsx` runs its own `requestAnimationFrame` loop, so a future ScrollTrigger would fight it.
2. `html { scroll-behavior: smooth }` plus Lenis: double smoothing and unreliable anchor jumps. Anchors use plain `href="#id"` with a fixed navbar and no `scroll-margin-top`.
3. Every reveal is the same `FadeUp`/`StaggerItem`: scattered micro-motion, no orchestrated moment.
4. The entrance of the hero depends on JS (Framer Motion), which delays the first meaningful paint of the headline. A CSS entrance would not.
5. No `robots`, `sitemap`, `metadataBase`, Open Graph image, or JSON-LD exists in `src/app` (only `layout.tsx`, `page.tsx`, `globals.css`). For a company that sells GEO this is the strongest credibility gap.

**5. Accessibility (measured contrast on the current palette)**

| Pair | Ratio | Result |
|---|---|---|
| White text on primary button gradient, top `#25B388` | 2.66 | fail (needs 4.5, 14 px semibold) |
| White text on primary button gradient, bottom `#1B9570` | 3.76 | fail |
| Placeholder `#94A3B8` on input | 2.45 | fail |
| Muted `#64748B` on `#F1F5F4` surfaces | 4.33 | fail (4.54 on `#F8FAF9` passes narrowly) |
| `#23AB82` as text on white | 2.91 | fail as text (fine as graphic) |
| `#158060` on `#F8FAF9` | 4.67 | pass |
| `#0F172A` on `#F8FAF9` | 17.03 | pass |

Also: form labels not linked to inputs, form uses `type="text"` for contact, mobile menu has no focus management or Escape handling.

### B.3 Claims inventory (every claim needs proof or safer wording)

Rule for Phase 2: nothing on this list ships as written unless the founders give evidence. `TODO(verify)` means the founders must supply the proof; the "safe wording" is what ships meanwhile.

| # | Claim as it appears now | Where | Proof needed | Safe wording until verified |
|---|---|---|---|---|
| 1 | "#1 on Google in 4 days" / "96 hours" / "high-intent keywords" | hero, stats, GEO, case study, footer, founder bios | keyword, location, date, Search Console screenshot | "Live work: doctorshero.com" with a link, no rank claim |
| 2 | "Cited as primary by ChatGPT, Gemini, Claude" | hero card, GEO, case study | dated screenshot of the exact prompt and answer (AI answers change) | "Appears in AI answers for [prompt], checked [date]" only if captured |
| 3 | Hero card quote showing an AI recommending Doctors Hero and Modern Mediks | Hero.tsx | it is written by us, so it is an illustration, not a citation | label it "Illustration" or replace with a real screenshot |
| 4 | "99 Performance, 0.8s Speed Index, 100% GEO Ready" | hero card | Lighthouse/PageSpeed run on a named URL | drop "100% GEO Ready" (not measurable); show a measured score with date and URL |
| 5 | "< 0.9s page load", "Average load <1.0s", "sub-second" | hero, stats, many | measured on real client pages | "fast by design" until measured |
| 6 | "24+ clinics", "10,000+ patients/prescriptions" | hero, stats, case study, bios | client count and consent to name | keep only if the founders confirm numbers |
| 7 | "10,000+ active users" / "10,000+ concurrent learners" | stats, case study | Peko analytics; "active" and "concurrent" are different numbers and the data contradicts itself | pick one metric and define it |
| 8 | "99.98% uptime" | stats, case study | uptime monitor history | remove until backed by a monitor |
| 9 | "50+ projects delivered", "100% on-time" | stats, bio | project list | confirm |
| 10 | "-45% wait times", "+240% demo bookings", "3x visitor retention", "saves 20-40 hours/week" | case studies, services | client data or case write-up | remove or turn into a clearly labeled target |
| 11 | "HIPAA/GDPR-compliant", "HIPAA-grade" | services, pricing, case study | compliance is a legal status, not a style | "built with security best practices" |
| 12 | "85% invisible to AI", "95% of websites fail", "40%+ of B2B queries answered by AI in 2026", "Amazon: 100 ms = 1% sales" | GEO, Playbook | primary source for each | delete, or cite the primary source with link |
| 13 | "Lead contacted in 5 min is 21x more likely to convert" | Playbook | primary study | delete or cite |
| 14 | "Refund if we cannot generate 3x-5x return", "Guaranteed on-time or we work free" | pricing, process | a legal and financial decision, not a copy decision | remove until founders approve exact terms |
| 15 | "2 sprint slots open", "response < 15 minutes" | navbar, footer, contact | must be true today | remove if not true |
| 16 | "Next.js 16" | hero pill, bios, services, tags | the site runs 15.5.29 | write "Next.js" without a version |
| 17 | "Dhaka / UK / Worldwide" | footer | office or entity in UK? | state only what is true |

### B.4 Other findings worth acting on
- Contact email is a Gmail address. A domain email on the agency's own domain builds trust.
- Web3Forms access key is hard-coded in `AuditContactForm.tsx`. These keys are designed to be public, but restrict it by domain in the Web3Forms dashboard and add a spam honeypot.
- `liveUrl: "#"` for Modern Mediks and Techfrica means two of five case studies cannot be checked. Add a link, a public case page, or a screenshot with permission.
- Entrepreneur Playbook has no `id`, so it cannot be linked.

---

## C. Design directions

### Direction A: "Deep Signal" (dark-first, cinematic)
Near-black green-ink background, neon-lime and emerald accents. Type: Bricolage Grotesque display, Geist text, JetBrains Mono labels.
- Pros: strong "tech engine" feel, scroll scenes look dramatic.
- Cons: dark plus neon is the most common agency look right now; clinic owners read it as cold; harsh in daylight on phones; dark-mode palette discipline cost is high.
- Verdict: rejected as the whole-site look.

### Direction B: "Signal on Paper" (editorial light, one dark chapter) — CHOSEN
Warm paper background, deep forest and ink as the dominant colors, one sharp lime accent, hairline rules instead of card shadows, huge high-contrast serif display. One dark "stage" section (the GEO scene) provides a cinematic moment.
- Why: feels like a trusted advisor (right for clinics and owners), distinctive against SaaS-template sites, and big editorial type works well with scroll storytelling. It keeps the logo's emerald and sky as brand DNA but makes them rarer and more deliberate.
- Risk: can look like a law firm. Mitigation: real motion (path-drawing hero, scroll scenes), mono data labels, and the dark stage.

### Direction C: "Light Lab" (current look, polished)
Keep Inter/Jakarta and the off-white plus emerald, improve spacing.
- Verdict: rejected. It stays on the generic "on distribution" path and does not create a "we must hire them" reaction.

**Why B beats A and C:** it is the only option that raises perceived price and trust at the same time, and it is the cheapest to keep fast on a mid-range phone (no heavy dark glow, static grain, mostly CSS).

---

## D. Design system (Direction B)

### D.1 Typography
Pick after a 15-minute test in Phase 2 step 1 (render the hero at 375 and 1440 px with each option and choose; the test is part of the checklist). Defaults:
- **Display:** Fraunces (variable, optical size axis, weights 100-900, so weight extremes are available). Fallback candidates to test: Instrument Serif, Bricolage Grotesque.
- **Text:** Instrument Sans (variable, clean, not Inter).
- **Labels and numbers:** JetBrains Mono, tabular numerals for stats.
- Not allowed: Inter, Roboto, Arial, Open Sans, Lato, system fonts, Space Grotesk.
- Load with `next/font/google`, `display: swap`, subset `latin`; add `Hind Siliguri` as a later Bangla fallback only if Bangla pages are added.

Type scale (fluid, large jumps on purpose):

| Token | Size | Weight | Use |
|---|---|---|---|
| display-xl | `clamp(2.75rem, 9vw, 7rem)` | 300 with one word at 800 italic | hero h1 |
| display-l | `clamp(2.25rem, 6vw, 4.5rem)` | 300 / 700 contrast | section h2 |
| title | `clamp(1.5rem, 3vw, 2.25rem)` | 600 | card and pillar titles |
| body-l | 1.1875rem (19 px), line-height 1.6 | 400 | lead paragraphs |
| body | 1.0625rem (17 px) mobile / 1rem desktop, lh 1.65 | 400 | default |
| label | 0.8125rem (13 px), mono, uppercase, tracking 0.08em | 500 | eyebrows, data |
| minimum | 13 px | | nothing smaller than 13 px (currently 106 nodes under 12 px) |

Measure 45-75 characters. Hero h1 to body size ratio about 5x.

### D.2 Color tokens (all CSS variables) and contrast

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F4F0E6` | main background (about 60% of surface) |
| `--paper-2` | `#EAE4D3` | alternate bands, subtle panels |
| `--ink` | `#0D1B16` | text, dark UI |
| `--muted` | `#46564E` | secondary text |
| `--forest` | `#0B4A38` | dominant brand color, primary button, headings accent |
| `--emerald` | `#23AB82` | brand DNA from the logo; graphics and on-dark accents only |
| `--emerald-ink` | `#0E6B50` | emerald when used as text on paper |
| `--sky` | `#4BB3F0` | logo secondary; data highlights on dark only |
| `--stage` | `#07201A` | the one dark chapter background |
| `--lime` | `#C8F43A` | the single sharp accent: primary CTA on dark, tiny signal marks |
| `--muted-dark` | `#A3BDB1` | secondary text on stage |

Usage ratio: paper 60%, ink and forest 25%, stage 10%, emerald/sky/lime 5% combined.

Contrast (WCAG 2.x, calculated):

| Foreground on background | Ratio | Use |
|---|---|---|
| ink on paper | 15.57 | body |
| muted on paper | 6.83 | secondary |
| muted on paper-2 | 6.12 | secondary on bands |
| forest on paper | 9.00 | links and headings |
| paper on forest | 9.00 | primary button on light sections |
| emerald-ink on paper | 5.70 | emerald text on paper |
| ink on lime | 13.88 | lime buttons |
| lime on stage | 13.37 | accent on dark |
| paper on stage | 15.00 | body on dark |
| muted-dark on stage | 8.51 | secondary on dark |
| emerald on stage | 5.87 | accent on dark |
| sky on stage | 7.32 | data on dark |
| emerald on paper | 2.56 | **never as text**, graphics only |
| lime on paper | 1.12 | **never on paper** |

Rule: lime appears only on `--stage` and `--forest`, or as a tiny non-text mark. Re-verify with the same script after any hex change, and test text over any gradient or image at its lowest-contrast point.

### D.3 Spacing, radius, elevation
- 4 px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144.
- Section padding `clamp(72px, 10vw, 144px)`. Container max 1280 px, gutter 16 px mobile / 32 px desktop.
- Radius: 6 px for panels and inputs, 999 px only for buttons and tiny chips. Removes the "pills everywhere" feel.
- Elevation: almost flat. 1 px hairline borders `rgba(13,27,22,0.12)`; one soft shadow reserved for the pricing highlight. No stacked card shadows.

### D.4 Buttons and cards
- **Primary:** forest background, paper text, 48 px min height, 999 px radius, a small lime arrow chip that slides 4 px on hover. On `--stage`: lime background, ink text.
- **Secondary:** text link with an underline that draws on hover (no filled second button next to the primary).
- **Focus:** 3 px `--forest` outline (light sections) / `--lime` (dark), 2 px offset, always visible.
- **Cards:** no background fill by default, hairline top rule plus content; filled only for the featured pricing tier. Hover: border to forest and 2 px lift, 180 ms.
- Touch targets at least 44 px.

### D.5 Backgrounds and iconography
- Paper with a static SVG grain at 4-5% opacity (one small tiled image, no animation, no blend modes that force repaint).
- Hero: a faint 12-column hairline grid fading to the edges.
- Stage: deep green with one radial emerald glow and a fine dot map; the glow is a static gradient.
- Lucide icons stay, stroke 1.5, used only where they carry meaning (about 8 on the whole page, down from dozens).
- Logo: add a light-on-dark version and remove `mix-blend-multiply` from the header tile.

---

## E. Page architecture

Target mobile page height: **at or below 12,000 px** (from 22,289 px), and desktop at or below 8,500 px.

| # | Section | Buyer question it answers | Chunks | Actions | Mobile layout |
|---|---|---|---|---|---|
| 1 | Navbar | Where am I, how do I start | 4 links max + 1 CTA | 1 primary | logo, menu button, sticky CTA chip after hero |
| 2 | Hero | What do you do, for whom, why believe you | headline, subline, proof line | 1 primary + 1 text link | single column, CTA fully above the fold at 375x812 |
| 3 | Proof strip | Is this real | 3 items max (named live projects, one verified number) | 0 | horizontal scroll-snap row |
| 4 | Services: "one growth system" | What exactly will you do for me | 4 pillars | 0 (expand to see sub-services) | stacked accordion, one open at a time |
| 5 | GEO stage (dark) | Why does AI visibility matter and how do you do it | 3 scenes (ask, answer, cite) | 1 | stacked scenes, no pinning |
| 6 | Work | Can you do it for someone like me | 3 featured projects, 2 more behind "see all" | 1 link per project | one project per screen, image first |
| 7 | Process | What happens after I say yes | 4 steps with dates | 0 | vertical timeline |
| 8 | Founders | Who will I actually work with | 2 people, 3 facts each | 1 | two stacked cards, skills removed |
| 9 | Pricing | What does it cost | 2 tiers, 5 bullets each + "what's included" expander | 1 per tier | stacked, featured tier first |
| 10 | FAQ | Last objections (also feeds search and AI answers) | 6 questions | 0 | accordion |
| 11 | Contact | How do I start | 3 fields | 1 (WhatsApp is the alternative) | single column |
| 12 | Footer | Where is everything | 3 link groups | 0 | collapsed |

Deleted or merged: `EntrepreneurPlaybook` (unsourced statistics), `StatsBar` (becomes the proof strip), case-study filter pills (5 items do not need them), skill tag walls, repeated section CTAs.

Cognitive load budget (rules for every section): one idea per screen on mobile, at most 4 chunks per visual group, one primary action visible, nothing under 13 px, whitespace instead of dividers where possible.

---

## F. Hero spec

### F.1 Headline candidates (no unverified numbers)
1. **Outcome:** "We turn your online presence into your best salesperson."
2. **Mechanism (recommended):** "Grow your business online. One team, from brand to AI search."
3. **Contrast:** "Not a prettier website. A business that is easier to buy from."
4. **Specificity:** "The growth team behind clinic software and a doctors platform people actually find." (needs claim 1 verified)
5. **Founder-led:** "Two founders. Every logo, line of code and search result, personally yours."

**Recommendation:** #2 as the h1 because it states what we do, names the breadth, and works for search and AI answers. Keep #5's idea as the subline's proof (founder-led).

Subline (18 words): "Brand, creative, website, search and AI visibility, built by two founders who ship the work themselves, not juniors."

Display treatment: "Grow" in weight 800, "your business" in weight 300 italic, "online." in weight 800. Words must stay in the HTML as real text.

### F.2 Elements and layout
- **Eyebrow (mono label):** "Digital growth studio, Dhaka" (keep only true locations).
- **Primary CTA:** "Get your free growth audit" (WhatsApp, as now). **Secondary:** text link "See live work".
- **Proof element:** one line of clickable named projects: "Live work: Doctors Hero · Modern Mediks · Pathfinder Peko". Verifiable by clicking, so no unverified number needed. Replace with a measured number later.
- **Visual:** replace the dashboard card with the **Path graphic**: an SVG line (echoing the logo's upward chevron) that draws itself through five labeled nodes (Brand, Creative, Web, Search and AI, Automation). Desktop: right column, about 5/12 width. Mobile: a compact horizontal version under the CTAs, below the fold is acceptable because the CTA is above it.
- **Mobile fold target (375x812):** eyebrow, h1 (max 5 lines at about 44 px), subline, primary CTA, all above 700 px.
- Removed from hero: both pills, the three stat tiles, the copy-number button, the dashboard card, the "Next.js 16" badge.

### F.3 Entrance sequence (CSS keyframes, no JS, so the headline paints immediately)

| Time (ms) | Beat |
|---|---|
| 0 | paper, grain and grid visible; h1 text is already in the DOM and painted (no opacity-0 start for LCP) |
| 80 | h1 line 1 clip-reveal up (700 ms) |
| 200 | h1 line 2 |
| 320 | h1 line 3 |
| 520 | subline fade-up 16 px (600 ms) |
| 680 | CTA group fade-up |
| 820 | proof line fade |
| 300-1500 | path stroke draws via `stroke-dashoffset` |
| 900 + 90 per node | node dots pop with 90 ms stagger |

Easing `cubic-bezier(0.16, 1, 0.3, 1)` (already `APPLE_EASE` in the code). Total under 1.7 s. With `prefers-reduced-motion` everything renders in its final state.

---

## G. Motion plan

**Principle:** one orchestrated moment per screen, not scattered micro-effects. GSAP is loaded only for below-the-fold scenes, so it is not in the critical path (dynamic import).

| Where | What | Library | Mobile |
|---|---|---|---|
| Hero | entrance sequence above | CSS | same |
| Hero to Services handoff | the Path graphic's line continues and lights the first pillar as the user scrolls | GSAP ScrollTrigger (scrub) | simple reveal, no scrub |
| **Scene 1: GEO stage** | pinned scene on desktop: a prompt types, the answer assembles, the cited source highlights. Labeled "Illustration" unless it uses a real capture | GSAP ScrollTrigger (pin + scrub), about 300vh | stacked, no pin, one reveal per scene |
| **Scene 2: Process** | vertical line fills as the 4 steps pass; step cards sharpen | GSAP ScrollTrigger (scrub), no pin | native vertical timeline |
| Work | image mask reveal and slight parallax per project | GSAP, `transform` only | plain image reveal |
| Everything else | simple fade/slide reveals | Framer Motion (existing `FadeUp`) | same |

Rules:
- GSAP owns scroll-driven timelines; Framer Motion owns component state (accordions, menu, hover, tabs). Never both on one element.
- Lenis: `autoRaf: false`, `lenis.raf(time * 1000)` inside `gsap.ticker.add`, `gsap.ticker.lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`. Remove `scroll-behavior: smooth` from CSS. Anchor clicks use `lenis.scrollTo(target, { offset: -80 })`, plus `scroll-margin-top` as fallback.
- Animate only `transform` and `opacity`. At most 2 pinned sections. `will-change` only while animating. Kill all ScrollTriggers on unmount.
- `gsap.matchMedia()` gates: `(prefers-reduced-motion: reduce)` gives final states and no Lenis; `(min-width: 1024px)` enables pins; below that, no scrub on anything heavy.
- No WebGL and no video in v1. If the brand later wants a "viral ad reel", add one lazy-loaded, poster-first video block in the Work section only.
- Performance guardrails: 60 fps target on a mid-range phone profile; if a scene drops below that in testing, it degrades to a simple reveal on touch devices.

---

## H. GEO and SEO plan

Current state: none of the following exist (`src/app` has only `layout.tsx`, `page.tsx`, `globals.css`).

1. **Metadata:** add `metadataBase`, per-page title and description, canonical, Open Graph and Twitter image (generated `opengraph-image`), `lang="en"`.
2. **Crawl rules:** `robots.ts` that allows search and major AI crawlers, and `sitemap.ts`. Whether to block specific bots is a founder decision.
3. **Answer blocks:** each content section opens with a question heading and a 40-60 word direct answer, then detail. Planned questions: "What does a digital growth agency do?", "What is Generative Engine Optimization?", "How long does a website plus SEO sprint take?", "How much does it cost?", "Who will work on my project?", "Do you work with clinics and healthcare?".
4. **JSON-LD (validate every block with Google's Rich Results Test or Schema.org validator):**
   - `Organization` (name, url, logo, founders as `Person`, only real `sameAs` links)
   - `WebSite`
   - `Service` entries for the 4 pillars
   - `FAQPage` only for questions actually shown on the page
   - Never add review/rating markup without real, visible reviews.
5. **Semantics:** one h1, logical h2/h3, landmarks, descriptive link text, meaningful `alt`.
6. **llms.txt:** optional. It is a community proposal and I found no evidence major AI engines rely on it, so only add it if it takes under 15 minutes.
7. **Later (not in Phase 2):** real `/work/doctors-hero` case pages and per-service pages give AI engines and Google more to cite than one long page. Treat as Phase 3.
8. **Measurement:** after launch, re-run a fixed list of prompts monthly on ChatGPT, Gemini, Perplexity and Claude and log which pages get cited. Do not publish ranking claims without these logs.

---

## I. Implementation order

Each step ends with the verification listed. The checklist is mirrored in `PROGRESS.md`.

1. Fonts and tokens: font test, `globals.css` tokens, remove Inter/Jakarta, contrast script re-run. Verify: type check, screenshots at 375 and 1440.
2. Motion foundation: rewrite `SmoothScroll` (Lenis on GSAP ticker, reduced-motion, anchor handling), remove CSS smooth scroll. Verify: scroll test, console clean, reduced-motion test.
3. Navbar, logo (dark variant), global buttons and focus styles.
4. Hero (copy, CSS entrance, Path graphic, mobile fold check).
5. Proof strip (replaces StatsBar) using only verified items.
6. Services (4 pillars, accordion, add creative/ads/graphics sub-services).
7. GEO stage (scene 1).
8. Work (3 featured plus see-all).
9. Process (scene 2).
10. Founders, Pricing, FAQ.
11. Contact form (3 fields, labels, honeypot, states).
12. SEO/GEO layer: metadata, robots, sitemap, JSON-LD, OG image.
13. QA: `npx tsc --noEmit`, `npm run lint`, `npm run build`, Lighthouse mobile, contrast re-check, screenshots at all widths, reduced-motion.

---

## J. Risks and open questions for the founders (decisions needed)

1. **Proof:** can you supply, for claim 1, the keyword, date and Search Console screenshot? And for claim 2, dated screenshots of the AI answers? Without them the page loses its strongest claim.
2. **Numbers:** confirm or remove claims 4-10 in B.3 (clinics, users, uptime, projects, percentages).
3. **Guarantees:** do you want any refund or on-time guarantee? If yes, give exact wording and conditions. Default is to remove.
4. **Creative services:** confirm the offer for ad design, viral ads and graphics, and whether you have portfolio samples (without samples the site cannot credibly show them).
5. **Links:** real social profiles and a domain email for `sameAs` and contact; the link or screenshot for Modern Mediks and Techfrica.
6. **3D:** do you want an actual lightweight 3D-feel element (CSS/SVG depth, no WebGL) to match the "3D" claim, or should we drop "3D" from the copy?
7. **Dark chapter:** are you comfortable with exactly one dark section (GEO stage)? It is a deliberate contrast, not a full dark theme.
8. **Next.js version:** claims say 16 and the site runs 15.5. Fix the copy only (recommended), or plan a deliberate upgrade as a separate task.
9. **Pricing:** keep USD plus BDT toggle? The audience seems international plus Bangladesh, and the toggle is useful if kept simple.
10. **Bangla:** is a Bangla version planned? It affects fonts and URL structure now.

Not verified in this phase: Lighthouse scores (run in step 13), real-device performance, the exact behavior of Lenis with `prefers-reduced-motion` in the installed version, and one desktop screenshot that came out blank mid-scroll during a scripted jump (likely a smooth-scroll timing artifact, not confirmed).
