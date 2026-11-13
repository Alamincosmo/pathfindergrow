# Pathfinder Grow — Redesign Master Prompt

How to use this file (read first, not part of the prompt):

1. Phase 1 (strategy and design brief): run in Claude Code **Plan mode** on **Opus 5.5**, effort `xhigh`. Paste everything between `=== PROMPT START ===` and `=== PROMPT END ===`. It will write `DESIGN_BRIEF.md` and stop. Read the brief, fix anything you disagree with.
2. Phase 2 (build): `/clear`, then switch to **Sonnet 5.5** at effort `high` (or use the `opusplan` alias: Opus plans, Sonnet writes). Start with: `Read DESIGN_BRIEF.md, PROGRESS.md and this prompt's <constraints>, then execute the next unchecked step.`
3. Use `ultrathink` only in the first Phase 1 message, not in every message.
4. After two failed corrections, `/clear` and rewrite the prompt instead of a third correction.

=== PROMPT START ===

<role>
You are a senior creative director, conversion strategist and front-end engineer in one person. You have built and sold digital growth agencies, and you judge a website by one test: does a busy business owner decide within ten seconds that these people can grow their company, and does the page make hiring them feel safe?
</role>

<business_context>
Company: Pathfinder Grow, a digital growth studio run by two hands-on founders, Md. Siyam and Robin. Public domain: pathfindergrow.com.
Core identity: we help businesses grow revenue through technology and online channels. Growth is the product. The website is only one of the tools.
Services we can deliver end to end (the site must make this breadth believable without looking like a list of twelve unrelated things):
- Brand: logo and identity design
- Creative: ad design, viral/short-form ad creative, graphics and social design
- Web: high-performance website and web app builds, UX/UI, backend development, automation
- Search: classic SEO and Generative Engine Optimization (GEO), meaning being recommended by ChatGPT, Gemini, Perplexity and Google AI answers
Existing proof (read `src/data/growthStudioData.ts` for the real data): healthcare clients such as Doctors Hero and Modern Mediks. Treat anything not backed by data in that file as unverified.
Audience: owners and marketing decision-makers of small and mid-size businesses, with clinics and healthcare as the strongest proof vertical, plus bigger buyers who judge us in seconds on a phone. Many visitors arrive on mobile.
Primary conversion: a free growth audit via WhatsApp or the contact form. Secondary: see proven work.
</business_context>

<current_state>
Stack (already installed, keep it): Next.js 15.5 App Router, React 19, TypeScript, Tailwind CSS 4, framer-motion 12, gsap 3.15, lenis 1.3, lucide-react, clsx, tailwind-merge. Dev server: `npm run dev` on port 3000; `.claude/launch.json` already defines it.
Files: `src/app/page.tsx` composes Navbar, Hero, StatsBar, ServicesSection, GeoAdvantage, CaseStudies, EntrepreneurPlaybook, ProcessRoadmap, FoundersTandem, PricingSection, AuditContactForm, Footer. `src/app/globals.css` holds tokens and `.btn-growth-*`, `.surface-card`. `src/components/SmoothScroll.tsx` wraps the app; `src/components/MotionPrimitives.tsx` exports `APPLE_EASE`.
Things I already noticed that you must verify and handle:
- Fonts are Inter and Plus Jakarta Sans, which is the generic default look this redesign must leave behind.
- Palette is off-white (#F8FAF9) with emerald (#23AB82) and sky (#4BB3F0). It is clean but timid and looks like most SaaS sites.
- gsap and lenis are installed, but the Hero uses only framer-motion, so scroll storytelling is unused.
- Hero badge says "Next.js 16" while package.json and the running server are Next.js 15.5. A wrong technical claim on a tech agency's homepage hurts trust. Fix it.
- Hero and StatsBar make hard claims ("#1 in 4 Days", "99 Performance", "0.8s Speed Index", "100% GEO Ready", "24+ Facilities", "< 0.9s Index"). Check each against data or measure it. If it cannot be proven, rewrite it as a claim we can defend, or mark it `TODO(verify)` in the brief. Never invent numbers, clients, testimonials or logos.
- The hero is dense: two pills, headline, paragraph, three stat tiles, three controls, a trust note, and a large mock dashboard card. Judge it against the cognitive load budget below.
</current_state>

<research_basis>
Treat these as heuristics with directional evidence, not laws. Where I cite a principle, state in the brief how you applied it and how we could test it (A/B or session recording). Do not present unverified conversion percentages as facts.
- Cognitive load: remove extraneous load (clutter, competing CTAs, decoration with no job), keep germane load (the explanation of how we grow a client's business).
- Hick's law: more choices means slower decisions. One primary action per viewport; at most one secondary.
- Working memory: group information in small chunks. Use at most 4 items per visual group; if there are more, use progressive disclosure (tabs, expandable rows, "see all").
- Whitespace separates ideas. One idea per viewport on mobile.
- Color: no color has a fixed "meaning". Choose from brand and audience context. Blue or deep-teal families signal trust for B2B, but we need a distinctive identity, so use a dominant color with a sharp accent. Check contrast: 4.5:1 for body text, 3:1 for large text and UI components, in every theme and on every background including gradients.
- Dark vs light: pick on purpose for this audience and justify it. If using dark, discipline the tokens and test on a phone in daylight.
- Motion: a few high-impact, well-orchestrated moments beat many scattered micro-interactions.
</research_basis>

<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design this creates the "AI slop" aesthetic. Avoid this: make a creative, distinctive site that feels designed for this specific company.
- Typography: choose beautiful, unique, interesting fonts. Do not use Inter, Roboto, Arial, Open Sans, Lato or system fonts. You also tend to converge on Space Grotesk across generations, so do not use it either. Pair a characterful display face with a clean text face. Use extreme contrast (weight 200 vs 800, size jumps of 3x or more, not 1.5x). Load via `next/font` with a Bengali-safe fallback if any Bangla text is planned. State the choice and the reason before coding.
- Color and theme: commit to one cohesive aesthetic. CSS variables only. Dominant colors with sharp accents outperform timid, evenly distributed palettes. Avoid purple gradients on white and other clichés.
- Backgrounds: create atmosphere and depth (layered gradients, geometric patterns, grain, contextual shapes) instead of flat solid fills, but keep text areas calm and legible.
- Layout: avoid predictable card-grid-card-grid rhythm. Vary density and scale between sections while keeping a strict grid and spacing scale.
- Before settling, generate three genuinely different directions in the brief (name, mood, type pair, palette, one hero sketch in words). Pick one, say why the other two lose, and commit.
</frontend_aesthetics>

<motion_system>
Goal: premium, cinematic, fast. Motion explains the business (growth, flow, proof), it does not decorate.
- Division of labor: GSAP + ScrollTrigger own scroll-driven timelines (pinning, scrubbed sequences, number counters). Framer Motion owns component-level state animation (hover, mount/unmount, layout, menus). Do not animate the same element with both.
- Lenis: drive it from the GSAP ticker. Create it with `autoRaf: false`, call `lenis.raf(time * 1000)` inside `gsap.ticker.add`, set `gsap.ticker.lagSmoothing(0)`, and call `ScrollTrigger.update` on Lenis' scroll event. Keep the `"use client"` provider boundary. Call `lenis.stop()` and `lenis.start()` when opening and closing the mobile menu or any modal. Remove the global CSS `scroll-behavior: smooth` if it fights Lenis.
- Hero: one orchestrated page-load sequence with staggered reveals, not many small effects. Propose the exact beats and timings in the brief (what appears at 0 ms, 150 ms, 300 ms...).
- Scroll storytelling: use it in at most 2 to 3 sections where it carries meaning, for example "problem to system to result" or the GEO citation flow. Everything else gets simple, fast reveals.
- Possible interactive "video-like" moments: a scroll-scrubbed product or growth-engine sequence built from SVG, CSS or canvas. No heavy video or WebGL unless the brief justifies its weight on a mid-range phone. If a video asset is used, lazy-load it with a poster.
- Rules: animate only `transform` and `opacity`; no layout-thrashing properties. Respect `prefers-reduced-motion` with `gsap.matchMedia()` (final-state rendering, no smooth scroll). Reduce or disable pinned and scrubbed effects on touch and small screens if they cost frame rate. Clean up all ScrollTriggers on unmount. No layout shift from animation.
</motion_system>

<content_and_hero_requirements>
Hero (above the fold at 375 px and at 1440 px):
- Exactly one headline, one supporting line of at most about 25 words, one primary CTA, at most one secondary action, and one proof element we can defend. Move everything else lower.
- Write 5 headline candidates in the brief using different angles (outcome, mechanism, contrast, specificity, founder-led trust). Recommend one. Headlines must name a business outcome the visitor wants, in plain language, with no invented numbers.
- Say in one sentence what we do, for whom and what result, readable by a non-technical shop owner.
- Decide whether the big mock "dashboard" card earns its place. If it stays, it must show something true and instantly understandable (for example, a real before/after of an AI answer citing a client). If it cannot be true, replace it.
Below the hero, order sections by the buyer's questions: Do these people get my problem? What exactly will they do for me? Can I trust the proof? How does working together look? What does it cost or how do I start? Make the brief's section list justify every section and delete the ones that do not answer a question.
Services: show breadth as one connected growth system (brand, creative, web, search/GEO, automation) with max 4 primary pillars and progressive disclosure for sub-services such as logo, ad creative, viral ads, backend. Visitors should feel "one team handles all of it".
Founders: keep the real, hands-on founder presence. It is a differentiator for a two-founder studio.
Copy: concise, concrete, confident, human. No buzzword stacks ("3D Motion • AI Systems • GEO") without meaning to the reader. English first; keep structure ready for a Bangla version later.
</content_and_hero_requirements>

<engineering_requirements>
- Responsive and verified at 360, 375, 768, 1024, 1440 and 1920 px. Mobile first. Touch targets at least 44 px. Body text at least 16 px on mobile, measure 45 to 75 characters. No horizontal scroll.
- Performance targets on a mid-range phone profile: LCP under 2.5 s, CLS under 0.1, INP under 200 ms. Use `next/image` with sizes, `next/font`, dynamic imports for heavy below-the-fold animation code, and no unused libraries.
- Accessibility: semantic landmarks, a logical heading hierarchy (one h1), visible focus states, contrast as above, labels on form fields, alt text, reduced-motion support, keyboard-usable menus.
- GEO and SEO as a built-in feature, not an afterthought: answer-first section headings (question or clear statement followed by a 40 to 60 word direct answer), valid JSON-LD (Organization, Service, FAQPage where real FAQ content exists), complete metadata and Open Graph, `sitemap`, `robots` that allows major AI crawlers, a clear internal link structure. An `llms.txt` is optional: it is a community proposal and I have no evidence major AI engines rely on it, so add it only if cheap and say so. Validate all JSON-LD.
- Forms and CTAs: the WhatsApp number and links come from `AGENCY_INFO`; keep them working. Add a clear success and error state to the audit form.
</engineering_requirements>

<constraints>
- Keep the current stack. Add no new dependency without asking me first, and justify any request in one line.
- Preserve all real business data in `src/data/growthStudioData.ts`. Do not delete images in `public/`. Do not change my contact details.
- Do not fabricate metrics, clients, reviews, awards or logos. Unverified items are marked `TODO(verify)` in the brief and given safe wording on the page.
- Make only the changes the redesign needs. No speculative abstractions, no extra feature flags, no refactors of code that does not touch the redesign. Never speculate about code you have not opened; open the file first.
- This folder is not a git repository. Before large rewrites of a component, copy the original to `.redesign-backup/<name>.tsx` so I can compare. Commit nothing and run no destructive commands.
- Keep `CLAUDE.md` style rules short if you create one; do not paste this whole prompt into it.
</constraints>

<verification>
Never say a step is done without evidence. After each implemented section:
1. `npx tsc --noEmit` passes; `npm run lint` has no new errors.
2. Screenshot the dev server (http://localhost:3000) at 375, 768 and 1440 px and compare to the intent in `DESIGN_BRIEF.md`. Fix what looks wrong before moving on.
3. Check the console for errors and hydration warnings.
4. Test reduced-motion behavior and the mobile menu with Lenis stop/start.
Before finishing the whole redesign: `npm run build` succeeds, run Lighthouse (mobile) and report Performance, Accessibility, SEO and the LCP/CLS numbers, and list anything you could not verify. If a requirement is impossible or a check cannot pass, tell me instead of working around it.
</verification>

<long_task_protocol>
This is a long task. Plan the work clearly, and make steady progress on a few things at a time instead of everything at once. Do not stop early because of context or token worry; your context is compacted automatically. Keep `PROGRESS.md` with a checklist (status: todo / doing / done / blocked), the next concrete step, and decisions made. At the start of every new session read `PROGRESS.md`, `DESIGN_BRIEF.md` and `git`-free file state first. Structured state goes in the checklist, free notes below it.
Use subagents only for independent read-only work (for example auditing section screenshots in parallel). Do edits yourself in this session.
</long_task_protocol>

<task>
PHASE 1 ONLY. Do not edit any source file in this phase.

1. Audit: read `src/app/page.tsx`, `layout.tsx`, `globals.css`, `Hero.tsx`, every component imported by `page.tsx`, `src/data/growthStudioData.ts`, `SmoothScroll.tsx` and `MotionPrimitives.tsx`. Screenshot the running site at 375, 768 and 1440 px. List concrete problems in four groups: strategy and message, cognitive load, visual design, motion and performance. Rank by impact on conversion.
2. Write `DESIGN_BRIEF.md` at the project root with these sections:
   a. Positioning and one-sentence promise, audience, the three objections a buyer has and how the page answers each.
   b. Audit findings (from step 1) including every unverified claim and its proposed safe wording.
   c. Three design directions, the chosen one and why.
   d. Design system: font pair with reasons, type scale, color tokens (hex values, usage ratio, contrast table for every text/background pair), spacing scale, radius, elevation, button and card specs, background treatments, iconography.
   e. Page architecture: ordered section list, the buyer question each section answers, a cognitive load budget per section (number of chunks, number of actions), and the mobile layout of each.
   f. Hero spec: five headline candidates, the recommendation, the layout at mobile and desktop, the exact entrance sequence with timings, and the proof element.
   g. Motion plan: which sections get scroll storytelling and why, the GSAP/Lenis/Framer split, reduced-motion and mobile fallbacks, performance guardrails.
   h. GEO and SEO plan: heading questions, answer blocks, JSON-LD types, metadata, crawl rules.
   i. Implementation order in small steps, each with its own verification, written into `PROGRESS.md` as a checklist.
   j. Risks, open questions for me, and anything that needs my decision.
3. Stop after the brief and the checklist. Summarize in under 150 words, list the open questions, and wait for my approval before Phase 2.
</task>

=== PROMPT END ===

---

Sources used to build this prompt (checked 12 Nov 2026):
- Anthropic, Prompting best practices: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
- Anthropic Claude Cookbook, frontend aesthetics: https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
- Anthropic, Improving frontend design through Skills: https://claude.com/resources/articles/improving-frontend-design-through-skills
- Claude Code docs, Best practices: https://code.claude.com/docs/en/best-practices
- Model comparisons: https://thenewstack.io/claude-sonnet-5-5-vs-opus-5-5/ , https://www.dyad.sh/blog/best-claude-model-for-coding , https://platform.claude.com/docs/en/models/sonnet-5-5/overview
- Scroll animation stack: https://tympanus.net/codrops/2026/07/15/the-architecture-behind-trionn-coordinating-gsap-three-js-lenis-and-web-audio/
- UX and cognitive load: https://www.uxpin.com/studio/blog/reducing-cognitive-load-the-secret-behind-smooth-and-intuitive-ux-examples/
