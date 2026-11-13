# Pathfinder Grow — Design Brief v2 (Phase 1)

Status: v2.1, founder answers received (12 Nov 2026), waiting for the go-ahead to start Phase 2. No source file was changed in Phase 1.
Prepared: 12 Nov 2026 on Opus 5.5. The earlier v1 brief is kept at `.redesign-backup/DESIGN_BRIEF-v1-sonnet.md` for comparison.
Evidence: every component and the data file read in full; live measurements at 375, 768 and 1440 px; every case-study image opened; console checked; contrast calculated with a script (WCAG 2.x formula).

---

## v3 direction change (13 Nov 2026) — overrides sections C, D (type and color) and G (motion)

**Founder feedback:** the serif type is mostly unattractive; the "minimal, classic, luxury" feel is not wanted. This is a tech and business-growth company. They want a tech/SaaS look with much more motion: parallax, text animation, SaaS-style motion graphics (icons, boxes, backgrounds), and a project reveal where cards rise from the bottom like a fanned hand of cards, spreading along an arc ("sunrise"). More packages are allowed if needed. (The serif and the paper look were my choice in v2; they are removed.)

**New direction: "Growth Engine".**
- **Rhythm:** dark hero and showcase sections (hero, proof, GEO scene, work, start form, footer) alternating with light sections (growth cards, process, founders, pricing, FAQ) for readability.
- **Type:** display Bricolage Grotesque 800, tight tracking, gradient emphasis words (no italics, no serif); text Instrument Sans; labels and numbers IBM Plex Mono. Minimum 13 px.
- **Color tokens:** night `#050D0A`, night-2 `#0A1914`, night-3 `#10241D`; snow `#F5F8F6`, snow-2 `#E9F0EC`; ink `#07110E`; brand emerald `#23AB82`, mint glow `#35E0A1`, sky `#4BB3F0`; lime `#C8F43A` for primary CTAs. Gradient emerald → sky for emphasis. Contrast (calculated): text on night 18.14, muted-dark on night 9.01, mint on night 11.54, sky on night 8.43, lime on night 15.40, ink on lime 15.02, ink on snow 17.93, muted-light on snow 7.49, emerald-ink `#0E6B50` on snow 6.07. Never `#23AB82` as text on light backgrounds (2.72).
- **Packages:** none added. GSAP 3.15.1 already ships SplitText, ScrambleText, DrawSVG, MotionPath, Flip and Observer.

**Motion catalog (what a SaaS motion designer would use, and where):**

| Effect | Where | How |
|---|---|---|
| Per-letter headline reveal | Hero h1 | letters split in the server markup, CSS stagger (no JS, so the headline still paints early) |
| Aurora and moving grid background | Hero, GEO, Start | big radial gradients with slow transform drift (no blur filters), parallax layers |
| Hub-and-spoke motion graphic | Hero | center logo mark linked to four icon boxes (Search, Brand, Web, Automation); data pulses travel along the lines (SVG `animateMotion`), orbit ring, pointer parallax per box depth |
| Word-by-word scroll highlight | Statement band | words brighten with scroll (GSAP scrub) |
| Scrolling capability marquee | Between sections | CSS marquee, speed and skew react to scroll velocity (Lenis) |
| Animated icon boxes | Growth cards | four looping mini motion graphics (rank bars, brand swatches, a clicking cursor, a workflow with a pulse), playing only while in view |
| Spotlight and border-beam cards | Cards, pricing | cursor-following radial highlight, animated gradient border |
| **Card fan (the "UNO" arc)** | Work | pinned scene: project cards start stacked below the screen, rise and spread along an arc with rotation (desktop); horizontal snap carousel on phones |
| Scramble-decode labels | Section eyebrows | GSAP ScrambleText on entry |
| Magnetic buttons | CTAs | GSAP `quickTo` pull toward the pointer |
| Scroll progress beam | Top of page, Process | scaleX / scaleY scrub |
| Typed AI answer | GEO scene | kept |

**Guardrails (the last build already scored Performance 57 on a slow CPU, so this is a real risk):** transform and opacity only; no CSS blur filters on large layers; every looping animation paused until its section is in view (IntersectionObserver); pointer effects off on touch; heavy scenes degrade on phones; reduced motion renders final states. The new look is measured again with Lighthouse and reported, not assumed.

**Honesty of motion graphics:** the hero graphic is abstract (a system, not a dashboard), shows no metrics, and no simulated results.

**New projects (13 Nov):** Kajer Hut (home-services marketplace), Patientcare.com.bd (patient portal; this is the real domain, replacing the `vercel.app` link), Oushud.com (medicine listing in Bangladesh), Audiofrica (African music and radio streaming), French Learners Club, Manga Ocean BD (anime and manga shop), Immersed In (UK immersive event hire), Smart Projukti. Roles for these were not given, so cards say "Client project" with the category taken from each site's own description. `smartprojukti.com` and `pathfinderpeko.com` timed out on 13 Nov and are not linked until they respond.

**Audiofrica, what could and could not be verified:** the site (audiofrica.com) describes a web music and radio app for African music: streaming, offline downloads, radio, an artist store, playlists. Its bank details name "Techfrica LLC Sierra Leone", so it appears to be a Techfrica product. **No page shows user numbers.** The App Store listing calls it "Africa's #1 Music Platform" and the Google Play listing "Sierra Leone's #1 Music Streaming Platform", which are the owner's own marketing lines, not independent rankings. So "3 to 4 million users", "one of Africa's top platforms" and "number 1 in Freetown" are **not published** until there is an analytics export or screenshot.

---

## Founder decisions (12 Nov 2026) — these override anything below that disagrees

| # | Decision | What it means for the build |
|---|---|---|
| 1 | Analytics: **Vercel Web Analytics** | `@vercel/analytics` is an approved new dependency (installed in step 0). Per Vercel's current docs (checked 12 Nov 2026), page views work on every plan but **custom events are a Pro-plan feature**. All CTA and form events go through one `track()` helper, so they start counting as soon as the team is on Pro. Session recordings are not covered by Vercel. Need to know the Vercel plan (K.1). |
| 2 | No real screenshots can be supplied | Alternative decided, see "Work imagery without supplied screenshots" below. |
| 3 | All 5 projects are client work. Doctors Hero: founder did **SEO and GEO**. PatientCare 3D: founder did the **design**. | Each project card states "Our role". Claims outside the role are dropped (see below). |
| 4 | Ads and viral ads are **out for now** | Removed from services, hero subline, FAQ and positioning. The Get chosen pillar is brand identity and visual kit only. |
| 5 | Doctors Hero timing: the founder did it in about 4 days but we publish the safer **"within 7 to 14 days"** | Public wording: "Reached #1 on Google for its target searches within two weeks". Keep a Search Console screenshot on file in case a buyer asks (not blocking). |
| 6 | 3D: founder asked for a plain explanation | Default chosen: **depth effects, no real 3D (no WebGL, no new library)**. The word "3D" leaves the copy; "interactive" stays. Explained in plain words in the chat. |
| 7 | Guarantee: **yes**, full refund if the delivered work is not what the client wanted or has very big mistakes | Draft wording below. The old "3x to 5x ROI" refund and "on time or free" promises are deleted. Three terms to settle before launch (not blocking the build): what "what was agreed" refers to (proposal in writing), time window after delivery, and whether "full" means the deposit or everything paid. |
| 8 | Pricing: "change it if you think so" | **Numbers stay.** I do not know your costs or the Bangladesh market, so a wrong guess costs revenue. Presentation changes: "From $490", and the tiers are reframed so the entry price reads as a focused start, not as the whole offer. |
| 9 | Email: `almamun@pathfinderpko.com` for now | **Confirm the spelling first:** the Peko site is `pathfinderpeko.com`, so `pko` may be a typo. A wrong domain loses leads. Not written into code until confirmed. |
| 10 | Headline approved: **"Get found. Get chosen. Grow."** | Final for the hero. |
| 11 | No Bangla version | Drop Bangla font fallback and locale routing. `lang="en"` only. |

**Draft guarantee wording (founder terms, my phrasing):** "Our promise: if what we deliver is not what we agreed in writing, or has major mistakes we cannot fix, you get a full refund."

**Role-based wording per project (replaces the old case texts where they claim more than the role):**
- Doctors Hero: role SEO and GEO. Drop the Next.js and Tailwind tags and "architected the platform" unless the founder also built the site (K.2). Keep the ranking claim in the approved wording above.
- PatientCare 3D: role UI and UX design. Drop "sub-second load", "CLS 0.00" and "+240% demo bookings" (engineering and business results outside a design role). Its link is a `vercel.app` address; use the client's real domain if one exists.
- Modern Mediks, Pathfinder Peko, Techfrica: roles as already described in `growthStudioData.ts`; no changes beyond the claims policy below.

**Claims policy defaults (applies to B.3 unless you object):** agency-wide figures (50+ projects, 100% on-time, 99.98% uptime, "10,000+ users powered") are removed. Figures scoped to one project stay only on that project's card and are labeled as founder-supplied: 24+ clinics and 10,000+ patient records (Modern Mediks), 10,000+ learners (Peko, without the words "active" or "concurrent"). Percent improvements (-45%, +240%, 3x) are removed. HIPAA/GDPR wording becomes "built with security best practices". "Reply in under 15 minutes" and "2 sprint slots open" are removed unless you confirm they are true. Footer location becomes "Dhaka, Bangladesh · remote worldwide". Version numbers become just "Next.js".

### Work imagery without supplied screenshots

The five images in `public/images/work/` are template mockups and never appear again. Three ways to show real work, in order of preference:
1. **Capture the live client sites myself, locally.** Tested today: Microsoft Edge (already installed) in headless mode took 2880×1800 screenshots of `doctorshero.com` and `patient-care-orcin.vercel.app`; `pathfinderpeko.com` is live (it answered on a retry, slower than the others). No new dependency and no third-party service. Done in step 5 for each live site: hero view plus one scroll position, checked for cookie banners, chat widgets and video frames. **Needs your OK because these are client sites.**
2. **Projects with no public site (Modern Mediks, Techfrica): an honest system diagram** drawn in SVG from facts already in the data (for Techfrica: Docker, AWS ECS, Redis, FastAPI, Python; for Modern Mediks: patient queue, prescriptions, records). It shows engineering instead of pretending to be a UI screenshot. A real screenshot replaces it whenever the client allows.
3. **A typographic card** (client name, role, what we did, one checked fact, live link) when neither of the above fits.
Not recommended: third-party screenshot services (they receive your client URLs and add a dependency) and live iframes (slow, and many sites block them).

---

## 0. The five things that matter most

1. **Every case-study image is a third-party template mockup, not our work.** `01.png` shows "PRIME VISION" (a Webflow template, its footer reads "Designed by Webestica, Powered by Webflow"), `02.png` shows "PLUTO", `03.png` shows "VOXO". `gallery-1/2.png` are more PRIME VISION screens. They are labeled Doctors Hero, Modern Mediks, Pathfinder Peko, Techfrica and PatientCare 3D. A buyer who clicks through to doctorshero.com sees a different site, and the template author may own those images. This is the single biggest trust and legal risk on the site, bigger than any design issue. Fix: real screenshots only (approach decided, see "Work imagery without supplied screenshots" above).
2. **There is no analytics or tracking at all**, so nobody can tell what converts today or whether the redesign helps. Measurement must come before or together with the redesign.
3. **Many headline claims cannot be proven from the repo** (#1 in 4 days, AI citations, uptime, percentages, HIPAA). They appear many times. Section B.3 lists all 17 with safe wording.
4. **The site sells "3D, interactive, GEO" but shows none of it**: no 3D, no scroll storytelling, no JSON-LD, no OG image, no canonical, no sitemap or robots. The site is its own most important case study, and right now it argues against us.
5. **Cognitive overload:** 22,289 px on mobile (about 27 screens), 10 WhatsApp CTAs, 106 text nodes under 12 px, 11 sections built from the same template.

---

## A. Positioning

**Promise (one sentence a shop owner understands):** We help businesses get more customers online: people find you on Google and AI assistants, choose you because your brand and website look trustworthy, and you keep up because the busywork is automated. Built by two founders who do the work themselves.

**Audience:** owners and marketing decision-makers of small and mid-size businesses, with clinics and healthcare as the strongest proof vertical. Mostly on phones, often from Bangladesh, some from the UK and abroad.

**Organizing idea:** *Found → Chosen → Grow.* It turns a long service list into a simple story a buyer can remember, and it maps directly to the four service pillars (section E). It is the backbone for the hero, the services and the motion.

**Three buyer objections and the answer on the page**

| Objection | Where and how the page answers it |
|---|---|
| "Agencies sell pretty things, not results." | Proof right under the hero: live projects you can open, real screenshots, one checked number per project. Nothing we cannot prove. |
| "Two people can't do brand, web, SEO and backend, and they'll disappear after payment." | The Found → Chosen → Grow system makes the breadth feel like one process. Named founders with real work. A process with dates. |
| "What does it cost, what's the risk?" | Prices in the open ("from"), a free audit with a concrete deliverable, no promises the founders have not approved. |

---

## B. Audit findings

### B.1 Measurements

| Metric | 375 px | 768 px | 1440 px |
|---|---|---|---|
| Page height | 22,289 px | 15,810 px | 11,345 px |
| Hero primary CTA bottom edge vs viewport | about 792 of 812 (at the fold) | 663 of 1024 | 684 of 900 |
| h1 size | 32 px | 42 px | 48 px |
| Text nodes under 12 px | 106 | 106 | 106 |
| Horizontal overflow | none | none | none |

Whole page: 1 h1, 8 h2, 22 h3; 10 WhatsApp links; 6 form labels not tied to inputs; 0 JSON-LD blocks; no `og:image`; no canonical; no analytics script; `scroll-behavior: smooth` set in CSS while Lenis also runs. Console: no errors or hydration warnings, but 7 next/image warnings ("fill but missing sizes") on the team and work images. `siyam.png` is 526 KB at source.

### B.2 Problems ranked by conversion impact

**Strategy and message**
1. Fake work imagery (see 0.1). Critical.
2. Unprovable claims repeated in many places (B.3). The repetition of "#1 in 4 days" across 6+ places makes the evidence look thin.
3. The offer is incomplete and unbalanced. Ad design, viral short-form ads, graphics and social design appear nowhere. A Flutter mobile pillar takes a full slot instead.
4. The site claims "3D" and "interactive" but shows neither.
5. For each project it is unclear whether it was client work or something the founders own. Pathfinder Peko shares our brand name. Presenting your own product as a client result undermines trust when discovered.

**Cognitive load**
1. Hero holds about 11 elements: two pills, headline, paragraph, three stat tiles, CTA, secondary button, copy-number button, trust line, and the dashboard card with its own 8 sub-elements.
2. Nav has 6 links plus an availability pill plus the CTA.
3. Ten CTAs with ten different labels.
4. Every case card has a category, metrics pill, description, 3 bullets and a tag row. Founder cards have a bio, a specialty box, 3 milestones and 6 skill tags.
5. The contact form has 6 fields and asks for budget before any conversation.
6. 106 text nodes below 12 px.

**Visual design**
1. Inter plus Plus Jakarta Sans, off-white, emerald and sky: tidy but the default "SaaS template" look.
2. Eleven sections share one template (pill badge, centered h2, paragraph, card grid). No change of pace, nothing memorable.
3. The h1 is timid (32 to 48 px) for a premium position.
4. Pillar tabs are built from `title.split(" ")` and read "High-Conversion 3D", "Generative Engine", "Strategic Brand"…
5. At 375 px the animated underline on the wrapped hero phrase shows as a stray teal dash on the left.
6. `BrandLogo` relies on `mix-blend-multiply`; it will break on any dark section.

**Motion and performance**
1. GSAP is installed but unused. `SmoothScroll.tsx` runs its own `requestAnimationFrame` loop, which will conflict with ScrollTrigger later.
2. CSS smooth scroll plus Lenis doubles the smoothing. Anchor links have no `scroll-margin-top` under a fixed navbar.
3. Every reveal is the same `FadeUp`, which reads as scattered motion with no signature moment.
4. The hero headline waits for Framer Motion (JS) before it fades in, so the main headline paints later than it needs to. CSS keyframes would avoid that.
5. Images with `fill` have no `sizes`, so phones may download images that are too large.

**Accessibility, current palette (calculated)**

| Pair | Ratio | Needed | Result |
|---|---|---|---|
| White on primary button, top `#25B388` | 2.66 | 4.5 | fail |
| White on primary button, bottom `#1B9570` | 3.76 | 4.5 | fail |
| Placeholder `#94A3B8` on input | 2.45 | 4.5 | fail |
| Muted `#64748B` on `#F1F5F4` bands | 4.33 | 4.5 | fail |
| `#23AB82` as text on white | 2.91 | 4.5 | fail |
| `#158060` on `#F8FAF9` | 4.67 | 4.5 | pass |

Also: labels not tied to inputs, the mobile menu has no Escape key or focus handling, and contact uses `type="text"`.

### B.3 Claims inventory

Rule: nothing below ships as written without evidence. The "safe wording" column ships until the founders provide proof.

| # | Claim now | Where | Evidence needed | Safe wording |
|---|---|---|---|---|
| 1 | "#1 on Google in 4 days / 96 hours" | hero, stats, GEO, case, footer, bios | keyword, country, date, Search Console screenshot | "Reached #1 on Google for its target searches within two weeks" (founder-approved wording, decision 5) |
| 2 | "Cited as primary by ChatGPT, Gemini, Claude" | hero card, GEO, case | dated screenshots of exact prompts and answers | "Appears in AI answers for '[prompt]' (checked [date])", only with captures |
| 3 | AI quote in the hero card naming Doctors Hero and Modern Mediks | Hero | it is our own text | label "Illustration" or replace with a real capture |
| 4 | "99 Performance", "0.8s Speed Index", "100% GEO Ready" | hero card | Lighthouse on a named URL and date; "GEO Ready" is not measurable | drop "GEO Ready"; show measured scores with URL and date |
| 5 | "< 0.9s", "< 1.0s average load", "sub-second" | hero, stats, services | measurements on client sites | "Built for speed" |
| 6 | "24+ clinics", "10,000+ patient records" | hero, stats, case, bios | confirmation and permission to name the client | keep only if confirmed |
| 7 | "10,000+ active users" vs "10,000+ concurrent learners" | stats, case | the data contradicts itself; active and concurrent are different metrics | one defined metric |
| 8 | "99.98% uptime" | stats, case | uptime monitor history | remove |
| 9 | "50+ projects", "100% on-time" | stats, bio | project list | confirm |
| 10 | "-45% wait times", "+240% demo bookings", "3x retention", "20-40 h saved/week" | cases, services | client data | remove, or present as a target clearly labeled as such |
| 11 | "HIPAA/GDPR compliant", "HIPAA-grade" | services, pricing, case | compliance is a legal status | "Built with security best practices" |
| 12 | "85% invisible to AI", "95% of sites fail", "40%+ of B2B queries answered by AI", "Amazon 100 ms = 1%" | GEO, Playbook | primary source for each | delete, or cite the primary source |
| 13 | "21x more likely if contacted in 5 minutes" | Playbook | primary study | delete or cite |
| 14 | "Refund if we can't generate 3-5x ROI", "on time or we work free" | pricing, process | a legal and financial decision | replace with the founder-approved refund wording (decision 7); delete the ROI and "on time or free" versions |
| 15 | "2 sprint slots open", "reply < 15 minutes" | nav, footer, contact | must be true today | remove if not true |
| 16 | "Next.js 16" | hero, bios, services, tags | the site runs 15.5.29 | "Next.js" |
| 17 | "Dhaka / UK / Worldwide" | footer | is there a UK presence? | state only what is true |
| 18 | Case-study images | Work section | real screenshots | remove the template images entirely |

### B.4 Assets in `public/` (keep, but never present as ours)
Only `logo.webp`, `team/*` and `images/work/*` are referenced by the code. Everything else (`images/client/*.svg`, `award/*`, `avatar/*`, `blog/*`, `marquee/*`, `timeline/*`, `video/video-transcode.mp4`, `assets/ai-nexus-3d.jpg`, `photo.webp`, the WhatsApp screenshot) appears to be template leftovers. Per the constraints nothing is deleted. Rule for Phase 2: never use template client logos, awards or avatars as if they were ours. The ChatGPT, Gemini, Claude and Google logos may only be used descriptively ("we optimize for these assistants"), never in a way that suggests partnership or endorsement.

### B.5 Other findings
- The contact email is a Gmail address; a domain email builds trust.
- The Web3Forms access key in `AuditContactForm.tsx` is designed to be public, but restrict it to your domain in the Web3Forms dashboard and add a honeypot field.
- Two case studies have `liveUrl: "#"`, so they cannot be checked.
- For international buyers, WhatsApp to a Bangladeshi number is the only fast channel. An email or booking link next to it lowers friction (founder decision).

---

## C. Three design directions

### Direction A: "Control Room" (dark-first, cinematic tech)
- **Mood:** a live mission-control screen for your growth. Night, glow, precision.
- **Type:** Bricolage Grotesque (display, 200 to 800) with Instrument Sans text and IBM Plex Mono data.
- **Palette:** near-black `#06120E`, emerald `#23AB82`, sky `#4BB3F0` for data, lime `#C8F43A` accent.
- **Hero sketch:** a full-bleed dark canvas, huge "Get found. Get chosen. Grow." at weight 800 on the left, a live-looking terminal panel on the right where a search query types itself and our client rises in the results.
- **Why it loses:** dark plus neon is the most common agency look right now, so it is not distinctive. Clinic owners read it as cold, it is hard to read on a phone in daylight, and the fake-terminal idea pushes us back toward simulated proof.

### Direction B: "Signal on Paper" (editorial light, one dark chapter) — CHOSEN
- **Mood:** a respected business journal that happens to be run by engineers. Calm authority, then one cinematic moment.
- **Type:** Newsreader (display serif, weights 200 to 800, optical sizes) with Instrument Sans text and IBM Plex Mono for labels and numbers.
- **Palette:** warm paper `#F4F0E6`, ink `#0D1B16`, forest `#0B4A38` dominant, one lime `#C8F43A` accent used only on dark, emerald and sky from the logo for graphics.
- **Hero sketch:** paper with faint grain and a hairline grid. Left: "Get found." in light 200 serif, "Get chosen." in light 200, "Grow." in heavy 800 italic forest. Right (desktop) or below the CTAs (mobile): one hand-drawn-feeling path line, echoing the logo's upward chevron, that draws itself through three labeled stations: Found, Chosen, Grow.
- **Why it wins:** the right mix for this audience (trust for clinics, sophistication for bigger buyers), clearly different from SaaS-template and dark-neon agency sites, and the cheapest to keep fast on a mid-range phone (mostly CSS, no glow effects). The single dark GEO chapter delivers the "wow" without making the whole site dark.

### Direction C: "Bright Product" (light SaaS, polished current look)
- **Mood:** friendly product-company site, rounded and airy.
- **Type:** keeps Plus Jakarta Sans and swaps Inter for Instrument Sans.
- **Palette:** current off-white, emerald and sky, with stronger shadows.
- **Hero sketch:** centered headline, two buttons, a floating product-dashboard mockup with gradient blobs behind.
- **Why it loses:** this is the "on distribution" default the brief must leave behind. Polishing it does not create a "we must hire them" reaction, and the dashboard mockup is the same simulated proof we are removing.

---

## D. Design system (Direction B)

### D.1 Typography (chosen before coding, as required)
- **Display: Newsreader.** A serious editorial serif with a full weight range (200 to 800) and optical sizes, so we get the extreme contrast the guidance asks for (200 vs 800, not 400 vs 600). I prefer it to Fraunces because Fraunces' soft, wonky details read playful, and because Fraunces sits on Anthropic's own short list of "distinctive" picks, which makes it a likely AI-convergence choice. Fallback to test: Fraunces.
- **Text: Instrument Sans.** Clean and readable, but not Inter. It has a width axis for tight labels.
- **Labels and numbers: IBM Plex Mono** with tabular figures for prices, dates and stats. The "engineer" signal.
- **Not allowed:** Inter, Roboto, Arial, Open Sans, Lato, system fonts, Space Grotesk.
- **Loading:** `next/font/google`, `display: swap`, subset `latin`, only the weights used (Newsreader 200, 800 and 800 italic; Instrument Sans 400, 500 and 600; Plex Mono 500). Add a Bangla face (Hind Siliguri or Noto Serif Bengali) only when Bangla pages exist.
- **Step-1 check:** render the hero with Newsreader and with Fraunces at 375 and 1440 px, and pick before building more.

| Token | Size | Weight | Use |
|---|---|---|---|
| display-xl | `clamp(3rem, 11vw, 8rem)` | 200, with the key word 800 italic | hero h1 |
| display-l | `clamp(2.25rem, 6vw, 4.5rem)` | 200 / 800 contrast | section h2 |
| title | `clamp(1.375rem, 2.6vw, 2rem)` | 600 (text face) | pillar and card titles |
| lead | 1.1875rem / lh 1.55 | 400 | lead paragraphs |
| body | 1.0625rem mobile, 1rem desktop / lh 1.65 | 400 | default |
| label | 0.8125rem mono, uppercase, tracking 0.08em | 500 | eyebrows, data |
| floor | 13 px | | nothing smaller (106 nodes today) |

Measure 45 to 75 characters. Hero display to body ratio about 7x on desktop, 3x on mobile.

### D.2 Color tokens, usage and contrast

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F4F0E6` | main background, about 60% of surface |
| `--paper-2` | `#EAE4D3` | alternate bands |
| `--card` | `#FFFFFF` | inputs and the featured pricing card only |
| `--ink` | `#0D1B16` | text |
| `--muted` | `#46564E` | secondary text |
| `--line` | `rgba(13,27,22,0.12)` | decorative hairlines only |
| `--line-strong` | `#6E7C75` | input and control borders (UI needs 3:1) |
| `--placeholder` | `#6B7A72` | placeholder text |
| `--forest` | `#0B4A38` | dominant brand color, primary button, links |
| `--emerald` | `#23AB82` | logo color; graphics and accents on dark only |
| `--emerald-ink` | `#0E6B50` | emerald as text on paper |
| `--sky` | `#4BB3F0` | logo secondary; data on dark only |
| `--stage` | `#07201A` | the one dark chapter |
| `--muted-dark` | `#A3BDB1` | secondary text on stage |
| `--lime` | `#C8F43A` | the one sharp accent: CTA on dark, small signal marks |

Usage: paper 60%, ink and forest 25%, stage 10%, emerald, sky and lime 5% together.

| Foreground on background | Ratio | Needed | Use |
|---|---|---|---|
| ink on paper | 15.57 | 4.5 | body |
| muted on paper | 6.83 | 4.5 | secondary |
| muted on paper-2 | 6.12 | 4.5 | secondary on bands |
| forest on paper | 9.00 | 4.5 | links, headings |
| forest on paper-2 | 8.06 | 4.5 | links on bands |
| paper on forest | 9.00 | 4.5 | primary button text |
| emerald-ink on paper | 5.70 | 4.5 | emerald-family text |
| ink on lime | 13.88 | 4.5 | lime button text |
| lime on stage | 13.37 | 3.0 | accent on dark |
| lime on forest | 8.02 | 3.0 | arrow chip on primary button |
| paper on stage | 15.00 | 4.5 | body on dark |
| muted-dark on stage | 8.51 | 4.5 | secondary on dark |
| emerald on stage | 5.87 | 4.5 | accent text on dark |
| sky on stage | 7.32 | 4.5 | data on dark |
| line-strong on paper | 3.84 | 3.0 (UI) | input borders |
| line-strong on white | 4.37 | 3.0 (UI) | input borders on cards |
| placeholder on white | 4.51 | 4.5 | placeholders |
| emerald on paper | 2.56 | — | **never as text** |
| lime on paper | 1.12 | — | **never on paper** |
| decorative line on paper | 1.28 | — | **never for input borders** |

Re-run the contrast script after any hex change, and check text on gradients and images at their weakest point.

### D.3 Spacing, radius, elevation
- 4 px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144.
- Section padding `clamp(72px, 10vw, 144px)`. Container 1280 px. Gutters 16 px on mobile, 32 px on desktop. 12-column grid on desktop, 4 on mobile.
- Radius: 6 px for panels and inputs; 999 px only for buttons and tiny chips. This ends "pills everywhere".
- Elevation: near-flat. Hairlines separate; one soft shadow only for the featured pricing card.

### D.4 Components
- **Primary button:** forest background, paper text, minimum 48 px tall, 999 px radius, a lime circular arrow chip on the right that moves 4 px on hover. On stage: lime background, ink text.
- **Secondary action:** a text link with an underline that draws on hover. Never two filled buttons side by side.
- **Focus:** 3 px outline (forest on light, lime on dark), 2 px offset, always visible with the keyboard.
- **Content blocks:** no card boxes by default; a hairline top rule, a mono label, a title, body. A filled card only where an object must stand out (featured price, form).
- **Accordion (services, FAQ, more work):** full-width rows, a 48 px tap target, one row open at a time, `+` rotating to `×`. It uses `<button aria-expanded>`, and the content stays in the DOM for search engines.
- **Touch targets:** at least 44 px everywhere.

### D.5 Backgrounds, imagery, icons
- Paper with a static SVG grain at 4 to 5% opacity (one small tile, no animation).
- Hero: a 12-column hairline grid fading toward the edges.
- Stage: deep green, one static radial emerald glow, a fine dot field.
- Imagery: real screenshots only, shown in a simple browser frame drawn in CSS (no stock device mockups). Founder photos in consistent warm grading.
- Icons: Lucide, stroke 1.5, about 8 on the whole page, only where an icon carries meaning.
- Logo: add a light-on-dark variant and remove `mix-blend-multiply`.

---

## E. Page architecture

Targets: mobile page at most **12,000 px** (from 22,289), tablet at most 9,500 px, desktop at most 8,500 px.

| # | Section | Buyer question | Chunks | Actions | Mobile layout |
|---|---|---|---|---|---|
| 1 | Navbar | How do I start? | 4 links + CTA | 1 | logo + menu button; a compact CTA chip appears after the hero |
| 2 | Hero | What do you do, for whom, why believe you? | headline, subline, proof line | 1 + 1 link | single column, CTA fully visible at 375×812 |
| 3 | Proof | Is this real? | 2 to 3 live projects | 0 to 1 | horizontal scroll-snap row of real screenshots |
| 4 | Growth system (services) | What exactly will you do for me? | 4 pillars | 0 (expand) | the path line runs down the left edge with 4 stations; accordion rows |
| 5 | GEO stage (dark) | Why do AI answers matter, and can you get me into them? | 3 scenes | 1 | stacked scenes, no pinning |
| 6 | Work | Have you done this for someone like me? | 3 featured + "more work" | 1 link each | one project per screen, image first |
| 7 | How we work | What happens after I say yes? | 4 steps with dates | 0 | vertical timeline |
| 8 | Founders | Who will I actually talk to? | 2 people × 3 facts | 1 | two stacked blocks, photo, 3 facts, no skill-tag walls |
| 9 | Pricing | What will it cost? | 2 tiers × 5 bullets + "what's included" | 1 per tier | featured tier first |
| 10 | FAQ | Remaining doubts (also feeds Google and AI answers) | 6 questions | 0 | accordion |
| 11 | Start | How do I begin? | 3 fields | 1 (+ WhatsApp alternative) | single column |
| 12 | Footer | Where is everything? | 3 groups | 0 | compact |

**Removed:** `EntrepreneurPlaybook` (unsourced statistics), `StatsBar` (becomes Proof), case filter pills, skill-tag walls, repeated per-section CTAs (keep CTAs only at hero, GEO stage, pricing and the Start section).

**Services as four pillars, ordered by the Found → Chosen → Grow story:**

| Pillar | Promise to the buyer | Services inside (progressive disclosure) |
|---|---|---|
| 1. Get found | People find you on Google and in AI answers | SEO, GEO (AI visibility), local search, structured data |
| 2. Get chosen | Your brand makes people trust you | Logo and identity, brand style guide, social and graphic kit, pitch-deck template (ad design and viral ads are out of scope for now) |
| 3. Turn visits into customers | Your website sells while you sleep | Websites and landing pages, UX/UI, web apps, mobile apps |
| 4. Grow without extra staff | Leads and follow-ups run themselves | Automation, CRM and WhatsApp follow-up, backend and cloud |

Existing data in `growthStudioData.ts` is regrouped into these pillars, not deleted. Ad design and viral ads are dropped for now (decision 4).

---

## F. Hero spec

### F.1 Headline candidates (no invented numbers)

| Angle | Headline |
|---|---|
| Outcome | "More customers from the internet, without hiring a marketing team." |
| **Mechanism (recommended)** | **"Get found. Get chosen. Grow."** |
| Contrast | "Not a prettier website. A business that's easier to find and easier to buy from." |
| Specificity | "The team behind clinic software used across Bangladesh, now growing businesses like yours." (needs claim 6 verified) |
| Founder-led trust | "Two founders. Your brand, website and AI search, built by the people you talk to." |

**Why the mechanism headline:** it is short enough for huge display type, easy to remember, names what the visitor wants (customers finding and choosing them), and it teaches our service model in three words, which is useful learning load rather than clutter. It sets up the whole page structure.
**Trade-off:** the h1 has no service keywords. To compensate, the subline, the `<title>`, the meta description and the first answer block carry the descriptive keywords. If you prefer a keyword-rich h1, use the outcome headline.

**Subline (22 words):** "Search and AI visibility so customers find you. A trusted brand and a fast website so they choose you. Built by two founders."

**Eyebrow (mono label):** "Digital growth studio · for clinics and growing businesses"

### F.2 Elements
- **Primary CTA:** "Get your free growth audit" (WhatsApp, as today, using `AGENCY_INFO`).
- **Secondary:** text link "See live work ↓".
- **Proof line:** only things a visitor can check: "See it live: doctorshero.com ↗ · pathfinderpeko.com ↗" (Modern Mediks is added when it has a public link or approved screenshot). If a project is founder-owned, the label says "our product".
- **Visual:** the Path graphic, an SVG line echoing the logo chevron that draws through three stations labeled Found, Chosen, Grow. It is decoration with meaning, built in pure SVG and CSS (no image, no layout shift).
- **Removed from hero:** both pills, the three stat tiles, the copy-number button, the dashboard card and its simulated AI quote, the "Next.js 16" badge, the trust line (it moves next to the Start form).

### F.3 Layout
- **Mobile 375×812:** stacked: eyebrow, h1 (3 short lines at about 48 px), subline, CTA, link, proof line. CTA bottom at or above 680 px. The path graphic sits under the proof line, horizontally, beginning just below the fold.
- **Tablet 768:** same stack, h1 at about 80 px, path graphic beside the subline.
- **Desktop 1440:** 12 columns. Text in columns 1 to 7 (h1 at about 128 px), path graphic in columns 8 to 12, vertical, stations aligned with the three headline lines. Everything visible within 900 px of height.

### F.4 Entrance sequence (CSS keyframes, so the headline paints without waiting for JS)

| Time | Beat |
|---|---|
| 0 ms | paper, grain and grid visible; h1 is real text in the HTML |
| 60 ms | "Get found." rises from a clip mask (700 ms) |
| 180 ms | "Get chosen." |
| 300 ms | "Grow." (the heavy italic word, 800 ms, slight overshoot) |
| 520 ms | subline fades up 16 px (600 ms) |
| 680 ms | CTA and link fade up |
| 820 ms | proof line fades in |
| 300 to 1500 ms | path stroke draws (`stroke-dashoffset`) |
| 600, 900, 1200 ms | stations Found, Chosen, Grow appear as the line reaches each |

Easing `cubic-bezier(0.16, 1, 0.3, 1)` (the existing `APPLE_EASE`). Total about 1.6 s. Under `prefers-reduced-motion` everything renders in its final state with no movement. Start states use `transform` only, never `opacity: 0` on the h1 text, so the largest text paints at once.

---

## G. Motion plan

**Principle:** motion explains Found → Chosen → Grow. There are two storytelling scenes; everything else gets one simple reveal.

| Where | What | Engine | Small screens / touch |
|---|---|---|---|
| Hero | the entrance above | CSS | same |
| **Scene 1: Growth system** | the hero's path continues down the services section. As you scroll, the line reaches each pillar station, which lights up and opens its summary. Desktop: section pinned for about 250vh with scrub | GSAP ScrollTrigger | no pin: the line fills as each station enters; tapping opens the accordion |
| **Scene 2: GEO stage (dark)** | three beats: a buyer types a question into an AI assistant, an answer builds, the cited source is highlighted. Labeled "Illustration" unless it uses real captures. Desktop: pinned about 300vh | GSAP ScrollTrigger | stacked beats, each with one reveal |
| How we work | a vertical line fills as the 4 steps pass | GSAP (scrub, no pin) | same, lighter |
| Work | image clip reveal and a 6% parallax | GSAP, transform only | reveal only |
| Accordions, menu, hover, toggles | state animations | Framer Motion | same |
| Everything else | single fade-up | Framer Motion (`FadeUp`) | same |

**Wiring rules**
- GSAP owns scroll timelines; Framer Motion owns component state. Never both on one element.
- `SmoothScroll` is rewritten: `new Lenis({ autoRaf: false })`, `gsap.ticker.add(t => lenis.raf(t * 1000))`, `gsap.ticker.lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`. Remove `scroll-behavior: smooth` from CSS. Anchor clicks use `lenis.scrollTo(id, { offset: -80 })`, with `scroll-margin-top` as a fallback.
- Leave touch scrolling native (Lenis default). Set `ScrollTrigger.config({ ignoreMobileResize: true })` so the mobile address bar does not cause jumps.
- `lenis.stop()` while the mobile menu is open, `lenis.start()` on close; the menu closes on Escape and returns focus to its button.
- `gsap.matchMedia()`: reduced motion means final states, no Lenis and no scrub; `(min-width: 1024px)` enables pins; at most 2 pinned sections on the page.
- Load GSAP with a dynamic import inside the scene components, so it is not in the critical path for the hero.
- Only `transform` and `opacity`. `will-change` only while animating. Kill every ScrollTrigger on unmount. Animation must not shift layout.
- No WebGL and no video in v1. A later "ad reel" in Work, if desired, is a lazy-loaded video with a poster image.

**The "3D" question:** a light sense of depth is possible without WebGL (CSS perspective on the Work screenshots, layered parallax in the GEO stage). That supports a softened "interactive" claim. A real 3D scene is a separate decision (J.6).

---

## H. GEO and SEO plan

Today `src/app` contains only `layout.tsx`, `page.tsx` and `globals.css`: no metadata base, canonical, OG image, robots, sitemap or JSON-LD.

1. **Metadata:** `metadataBase`, title "Pathfinder Grow — Digital Growth Studio: SEO, AI Search, Brand & Websites", a description that states services and audience, canonical, Open Graph and Twitter image via a generated `opengraph-image`.
2. **Crawl:** `robots.ts` allows search engines and the major AI assistant crawlers; `sitemap.ts`. Whether to block any specific bot is a founder decision.
3. **JSON-LD (validate each with Google's Rich Results Test and the Schema.org validator):** `Organization` (founders as `Person`, logo, real `sameAs` only), `WebSite`, a `Service` per pillar, and `FAQPage` only for the FAQ actually shown. Never review or rating markup without real visible reviews.
4. **Semantics:** one h1, logical h2 and h3, landmarks, descriptive link text, meaningful `alt`.
5. **Answer blocks:** draft answers below use only facts already in `growthStudioData.ts`; items marked `TODO(verify)` need confirmation.

| Question (h2 or FAQ) | Draft answer (40 to 60 words) |
|---|---|
| What does Pathfinder Grow do? | Pathfinder Grow is a digital growth studio run by founders Md. Siyam and Robin. We help businesses get more customers online: SEO and AI-search visibility so people find you, brand identity and fast websites so they choose you, and automation so leads and follow-ups run without extra staff. |
| What is Generative Engine Optimization (GEO)? | GEO means structuring your website and online presence so AI assistants such as ChatGPT, Gemini and Perplexity can understand and recommend your business. It builds on SEO with clear structured data, direct answers to buyer questions, and consistent facts about your company across the web. |
| How long does a project take? | A typical growth sprint runs about 18 days: a 3-day audit, a 4-day plan and prototype, then build and launch. Larger projects with custom backends or mobile apps take 3 to 5 weeks. After launch we continue with search visibility and automation work. |
| How much does it cost? | Growth sprints start at $490 to $1,200 (৳55,000 to ৳1,35,000), with delivery in 7 to 14 days. Larger builds with custom backends, mobile apps or automation range from $1,500 to $3,500 and more. The first growth audit is free and without obligation. |
| Who will work on my project? | You work directly with the two founders. Md. Siyam leads system architecture, backend and automation. Robin leads product, frontend, motion and search visibility. There are no account managers in between, so the people you talk to are the people building your project. |
| Do you work with clinics and healthcare? | Yes. Healthcare is our strongest track record, including Modern Mediks, a clinic operating system, and Doctors Hero, a doctors platform. `TODO(verify)`: client count, links and permission to name each. We also work with startups and growing businesses in other industries. |

6. **llms.txt:** optional. It is a community proposal with no evidence that major AI engines rely on it, so only add it if it takes under 15 minutes.
7. **Later (Phase 3):** separate pages per case study and per pillar give search engines and AI assistants more specific pages to cite than one long page.
8. **Monitoring:** a fixed list of 10 buyer prompts, checked monthly on ChatGPT, Gemini, Perplexity and Claude, logged with date and screenshot. Only logged results may appear on the site.

---

## I. Measurement and testing plan

**Measurement decision (founder, 12 Nov): Vercel Web Analytics** with the `@vercel/analytics` package. Custom events need Vercel's Pro plan per its current docs, so K.1 asks which plan the team is on. The tests below depend on it.

Vercel Web Analytics shows page views, referrers and (on Pro) custom events, but not session recordings. If you later want recordings, Microsoft Clarity is a free script-tag option (it uses cookies, so UK and EU visitors need a consent banner). Not part of Phase 2 unless you ask.

Events: `whatsapp_click` (with location: hero, geo, pricing, start), `form_submit_success`, `form_error`, `live_project_click`, `faq_open`, scroll depth at 50% and 90%.

**Low-traffic reality:** an agency site rarely gets enough traffic for statistically meaningful A/B tests. Use before/after comparisons over 4 weeks, session recordings, and quick 5-second tests with 5 target users ("What does this company do? Who is it for?").

| Principle | How it is applied | How to test it | Metric |
|---|---|---|---|
| Hick's law | one primary CTA per viewport; nav 6 → 4; CTAs 10 → 4 | before/after | hero WhatsApp click rate |
| Chunking (max 4 per group) | 5 pillars → 4; 5 cases → 3 + "more" | recordings, accordion opens | % reaching Work and Pricing |
| One idea per screen | page height 22,289 → ≤12,000 px on mobile | scroll depth | % reaching the Start form |
| Germane vs extraneous load | Found → Chosen → Grow replaces the feature list | 5-second test | % who can name 2 services |
| Specific, checkable proof | live links and real screenshots instead of claims | click tracking | live-project click rate, form submits |
| Form friction | 6 fields → 3 | funnel | form start → submit % |
| Readability | 13 px floor, contrast pass | recordings (zooming, rage clicks) | rage and dead clicks on mobile |
| Orchestrated motion | 2 scenes instead of many reveals | Web Vitals; scroll completion through each scene | INP < 200 ms, % completing the GEO scene |

---

## J. Implementation order (mirrored in `PROGRESS.md`)

Every step ends with: `npx tsc --noEmit`, `npm run lint` (no new errors), screenshots at 375, 768 and 1440 px compared to this brief, console free of errors and hydration warnings, a reduced-motion check. Components are copied to `.redesign-backup/` before rewrites.

0. Measurement (if approved): analytics and events.
1. Fonts and tokens: font test, tokens in `globals.css`, remove Inter and Jakarta, re-run the contrast script.
2. Motion foundation: new `SmoothScroll`, anchors, remove CSS smooth scroll, reduced motion.
3. Navbar, logo variants, buttons, focus styles, mobile menu (Escape, focus, Lenis stop/start).
4. Hero: copy, CSS entrance, Path graphic, fold check at 375×812.
5. Proof: real screenshots only; the template images are removed from the page (files stay in `public/`).
6. Growth system (Scene 1) with the regrouped 4 pillars.
7. GEO stage (Scene 2).
8. Work: 3 featured projects plus "more work".
9. How we work.
10. Founders, Pricing, FAQ.
11. Start form: 3 fields, labels tied to inputs, honeypot, success and error states.
12. SEO and GEO layer: metadata, OG image, robots, sitemap, JSON-LD, validated.
13. Full QA: `npm run build`, Lighthouse mobile (Performance, Accessibility, SEO, LCP, CLS), all six widths (360, 375, 768, 1024, 1440, 1920), keyboard pass, reduced motion, a list of anything not verified.

---

## K. Risks and open questions (founder decisions)

Resolved on 12 Nov 2026: analytics tool, project ownership, creative offer, 3D direction, guarantee principle, pricing, headline, Bangla (see "Founder decisions" at the top). Still open:

1. **Vercel plan:** Hobby or Pro? Custom events (CTA and form tracking) need Pro per Vercel's docs; on Hobby we still get page views. Not blocking the build.
2. **Permission to screenshot the live client sites** (Doctors Hero, Pathfinder Peko, PatientCare 3D) with the local Edge method. Also: did you build the Doctors Hero website, or only its SEO and GEO? (It decides whether Next.js and tech tags may appear on that card.) And does PatientCare 3D have a real client domain besides the `vercel.app` address?
3. **Email spelling:** is it `pathfinderpko.com` or `pathfinderpeko.com`? Blocking only for the contact step (11), not before.
4. **Guarantee terms:** what "agreed" refers to, the time window after delivery, and whether "full refund" means the deposit or everything paid. Must be settled before launch, not before the build.
5. **Claims defaults** (in the Founder decisions section): object only if something there is wrong. In particular, the AI-assistant citation claim for Doctors Hero stays off the site until there is a dated capture of the prompt and answer.

**Not verified in Phase 1:** Lighthouse and real-device performance (dev server numbers are not representative; measured in step 13), Lenis' reduced-motion behavior in the installed version, and the exact legal status of the template images (treat them as not ours).
