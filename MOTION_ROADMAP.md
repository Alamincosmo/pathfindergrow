# Motion Roadmap v1 — "Story by scroll" (13 Nov 2026)

Status: roadmap and master prompt written first, then built in batches. Batch 1 = scenes marked **[B1]**.

## 1. Evidence used

**Founder proof (screenshots, 13 Nov):** Google AI Mode summary of Audiofrica, citing its official Facebook page: **700,000+ registered users**, **200,000+ artists, podcasters and poets**. Old Android build ~17,000+ downloads (not used). The earlier "3 to 4 million" and "20 to 30 million" figures are **not** supported by this proof and are not on the site. Note: the source is an AI summary of a Facebook page. Open the Facebook page once and confirm the numbers before launch.

**doctorshero.com (read 13 Nov, own words, 4 pages):** "500+ Clinics", "50k+ Patients Served", "50+ features", "30-day free trial", prices "from ৳10 a month", AI-assisted prescriptions with drug-interaction checks, smart scheduling (auto serial numbers, SMS reminders, public booking pages), AI assistant, patient portal, offline desktop app (Windows and macOS), mobile app, analytics. States prescriptions follow BM&DC guidelines. Company: Modern Mediks Ltd.
- Conflicts to settle: (1) our data says "24+ clinics" for Modern Mediks, the site says "500+". (2) the site shows "0.9% uptime" and "0K+" counters that look like unrendered animations, and a "14-day" vs "30-day" trial. (3) the site claims HIPAA; we do not repeat compliance claims for clients.
- **Used in B1:** 500+ clinics, 50k+ patients (client's own published figures, shown as "Doctors Hero says"). Not used: uptime, HIPAA, trial length.

**patientcare.com.bd (read 13 Nov):** hero "See a doctor without the waiting room", "From search to serial number in under two minutes", flow: search doctor, patient details, live queue slot, serial number by SMS, "pay at the clinic, never before". Dashboard: prescriptions, appointment history, lab reports, family members. No user counts published. Cities and specialties listed.

**Motion and dev guidance** (secondary sources; numbers are starting points, tested in-browser, not copied blindly):
[web.dev easing](https://web.dev/articles/choosing-the-right-easing) · [web.dev animation performance](https://web.dev/articles/animations-guide) · [Material duration and easing](https://m1.material.io/motion/duration-easing.html) · [GSAP ScrollTrigger docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
Takeaways: ease-out in, ease-in out, never linear for UI; 200–500 ms for UI moves, 800–1200 ms only for playful overshoot; animate only transform and opacity; `will-change` only while animating; pin sparingly; scrub with a small smoothing value; kill off-screen work; honour reduced motion.

## 2. Motion spec (our design system for motion)

| Token | Value | Why |
|---|---|---|
| UI move | 0.45 s, `power3.out` | enters decelerate |
| Exit | 0.3 s, `power2.in` | leaves accelerate |
| Playful pop | 0.9 s, `back.out(1.6)` | only for badges and "success" moments |
| Stagger | 0.06–0.1 s | reads as one gesture, not a list |
| Follow-through | shadow animates 0.05 s after its card | shadow lags the object, feels physical |
| Scrub smoothing | `scrub: 0.6` | removes jitter without lag |
| Light source | top-left, fixed everywhere | consistent shadow direction |
| Elevation 1 / 2 / 3 | two-layer shadows: tight `0 2px 4px` + soft `0 12px 24px` / `0 24px 48px` / `0 40px 80px`, alpha 0.18–0.35 on dark | blur and offset grow with height |
| 3D | `perspective: 1200px`, tilt max 10–14° on X/Y, depth by `translateZ` 0 / 30 / 60 px | small angles read as premium, large as gimmick |
| Max pinned scenes | 3, desktop only | cost and scroll fatigue |
| Looping animation | runs only while in view | CPU budget |

Rules for every scene: one headline, one line of support, one visual. Numbers count up and carry their source. No fake results: illustrations are labelled as illustrations.

## 3. Master prompt (used to drive the build)

> **Role.** You are a senior SaaS motion designer and front-end engineer (4+ years, After Effects background) working inside an existing Next.js 15 / React 19 / Tailwind 4 site that already ships GSAP 3.15 (all plugins free), Lenis and lucide-react.
> **Goal.** Turn each text section into a scroll-driven visual story that shows what the text says, so a visitor understands it with little reading. One recurring character: a mint light-dot, "the pathfinder".
> **Per scene, deliver:** (1) the one sentence the scene must make true in the viewer's head, (2) storyboard of 3–5 beats with scroll ranges, (3) shapes and icons used (inline SVG), (4) timings, easings, shadow and depth values from the motion spec, (5) mobile fallback, (6) reduced-motion final state.
> **Constraints.** Transform and opacity only; no blur filters on large layers; loops pause off-screen; GSAP plugins are lazy-loaded; no new heavy libraries; claims only from the evidence table; illustrations labelled; keep Lighthouse mobile from regressing (baseline Performance 60, LCP 3.7 s).
> **Process.** Roadmap first, then build, then typecheck, build, and look at it in the browser at 375 / 768 / 1440 px. Report what was and was not verified.

## 4. Scene roadmap

| # | Scene (replaces) | The sentence it must make true | Beats | Depth / motion | Status |
|---|---|---|---|---|---|
| S1 | **Search story** (GeoStage) | "Ask an AI, and the clear source gets named." | cursor glides to search box → types the question → results list builds → AI answer card slides up with 3 sources → yours gets a lime ring and a "cited" badge | browser window card, perspective tilt 8°, elevation 3; ghost cursor with click ripple | **[B1]** |
| S2 | **Scale story** (ProofStrip, new section) | "Our platforms already carry real people." | Audiofrica dot-map of Africa lights up city by city + equalizer + 700K+ / 200K+ counters → Doctors Hero clinic network ignites, 500+ / 50k+ → Peko learners swarm, 10,000+ | 3 floating glass cards on 3 depth layers, parallax by pointer; counters tick (0.9–1.4 s) | **[B1]** |
| S3 | Journey statement (StatementBand) | "Search brings, brand convinces, site converts, automation keeps." | one pinned scene, icon morphs 🔍→✦→▭→⚙ with the sentence | MorphSVG shape morph + icon swap, no pin | **built (B2)** |
| S4 | Chosen scene (GrowthCards 02) | "Your brand looks established at first glance." | scattered shapes fly in and lock into a logo, swatches and type specimen drop in | scrub assemble, confetti converges, swatches drop with overshoot | **built (B2)** |
| S5 | Convert scene (GrowthCards 03) | "Your site turns visits into leads." | wireframe → blocks fall into place → cursor clicks CTA → "new lead" toast | stagger drop, cursor click, toast pop | **built (B2)** |
| S6 | Grow scene (GrowthCards 04) | "Leads and follow-ups run themselves." | node graph, pulse travels lead → WhatsApp → CRM | line draw (dashoffset) + pulse along polyline | **built (B2)** |
| S7 | GrowthCards text cut | less reading | bullets → icon chips, details on tap | bullets became chips; text cut to title + chips | **built (B2)** |
| S8 | Process as a road | "Two weeks from audit to live." | dot travels the road, four milestones light | winding road, dot follows scroll, milestone icons light up | **built (B3)** |
| S9 | Start form finale | "The journey ends with you." | dot lands on the button | light-dot flies in on a curve and lands on the send button, which pulses | **built (B3)** |

## 5. Images that may need a transparent PNG/SVG (asked for in the brief)

None needed for B1: all graphics are drawn in SVG. Optional later: transparent cut-outs of the two founders (for a parallax intro), and a transparent phone mockup of Audiofrica's real app screen. Send as PNG or WebP with alpha, 1600 px wide max.

---

## Update 13 Nov (evening): founder data, color audit

**Numbers now used (founder has the admin panel and database for these):**
- Audiofrica: **3,000,000+ users** (owner's admin database, Nov 2026). Public pages show far less (App Store 6 ratings; trackers estimate tiny installs), so keep an admin-panel screenshot or analytics export on file. Also "30M+ songs" (audiofrica.com's own text).
- Supfrica (assumed = "SuperAfrica"; superafrica.com is a parked domain, confirm): **300,000+ downloads** (Play Store 50k + direct APK) and **40,000+ active users**, from the owner's admin data. Public tracker estimate says 75K+ installs, so same advice: keep proof.
- Doctors Hero: 500+ clinics, 50k+ patients, as published on doctorshero.com.

**Extra facts found on the other Work sites (not yet on our page):** Kajer Hut: 6 service types, "292+ orders", "1,863+ experts", "23+ clients" (odd mix, check). Manga Ocean BD: 6 categories, "1500+ products sold last month", free shipping over ৳3000, 7-day return, bKash/Nagad/Rocket. Immersed In: 5.0 on Google, 22 reviews, 8 UK regions. French Learners Club: 2 weekly Zoom sessions, plans from $49/month ("4 weeks" and "six weeks" both appear on the site, do not repeat). Oushud: medicine index from public DGDA listings. PatientCare: search to serial number "in under two minutes", pay at clinic.

**Color audit:** palette is sound: primary = night/forest surfaces and emerald (matches the logo), secondary = mint glow and the logo's sky blue (gradient emphasis, second items in graphics only), accent = lime (buttons and "cited/#1" moments only), roughly 60/30/10. The problem was rhythm, not hue: dark, dark, dark, LIGHT, dark, dark, LIGHT x4, dark. Fixed: Growth cards moved to dark, so the page is six dark sections, one curved "curtain" switch to a single light zone (Process, Founders, Pricing, FAQ, all one paper tone), and one curved switch back to the dark finale.
