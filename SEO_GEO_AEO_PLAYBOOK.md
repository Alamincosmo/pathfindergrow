# PathFinder Grow: SEO · AEO · GEO Playbook

হালনাগাদ: ১৩ নভেম্বর ২০২৬। November 2026 Core Update চলছে (শুরু ১০ নভেম্বর, শেষ হতে ~২ সপ্তাহ)।

এই ডকুমেন্টে আছে সার্চ ইঞ্জিন আর AI কীভাবে কাজ করে, সাইটে কী করা হয়েছে, কী বাকি আছে এবং কোন কাজগুলো **কখনো করা যাবে না**।

---

## ১. মূল নীতি (এক লাইনে)

> Google, Bing, ChatGPT, Gemini, Perplexity আর Claude, সবাই শেষ পর্যন্ত একই প্রশ্নের উত্তর খোঁজে: **"এই কোম্পানি কে, কী করে, আর এটা যে সত্যি, তার প্রমাণ অন্য কোথায় আছে?"**
> যত জায়গায় **একই তথ্য একই ভাষায়** পাওয়া যাবে, Google তত উপরে র‍্যাঙ্ক করবে আর AI তত আত্মবিশ্বাসী হয়ে উত্তরে নাম বলবে।

মে ২০২৬-এ Google তাদের প্রথম অফিসিয়াল AI search গাইডে বলেছে, AI Overviews আর AI Mode সাধারণ Search-এর **একই ranking আর retrieval সিস্টেম** ব্যবহার করে। তাই AEO আর GEO আলাদা কোনো জাদু না; ভালো SEO-র উপর দাঁড়ানো বাড়তি স্তর।

---

## ২. প্রতিটা প্ল্যাটফর্ম কীভাবে কাজ করে

| প্ল্যাটফর্ম | কোথা থেকে তথ্য নেয় | কোন crawler | আমাদের করণীয় |
|---|---|---|---|
| **Google Search, AI Overviews, AI Mode, Gemini-র সার্চ** | Google-এর নিজস্ব ইনডেক্স | `Googlebot` (`Google-Extended` শুধু Gemini-র ট্রেনিং নিয়ন্ত্রণ করে, AI Overview-তে দেখানো না দেখানো নিয়ন্ত্রণ করে না) | Search Console, sitemap, structured data, E-E-A-T |
| **Bing, Microsoft Copilot** | Bing ইনডেক্স | `Bingbot` | Bing Webmaster Tools, **IndexNow** |
| **ChatGPT search** | নিজস্ব সার্চ ইনডেক্স (`OAI-SearchBot`) আর ব্যবহারকারীর অনুরোধে লাইভ পেজ পড়া (`ChatGPT-User`), সাথে সার্চ পার্টনারের ডেটা | `OAI-SearchBot`, `ChatGPT-User`; ট্রেনিংয়ের জন্য `GPTBot` | Bing-এ ইনডেক্স থাকা, crawler ব্লক না করা |
| **Perplexity** | নিজস্ব লাইভ ইনডেক্স; সবসময় সোর্স দেখায়, নতুন তথ্য বেশি পছন্দ করে | `PerplexityBot`, `Perplexity-User` | পেজে তারিখ আর আপডেট রাখা, নির্দিষ্ট পরিসংখ্যান দেওয়া |
| **Claude** | ওয়েব সার্চ আর ব্যবহারকারীর অনুরোধে পেজ পড়া | `Claude-SearchBot`, `Claude-User`; ট্রেনিংয়ের জন্য `ClaudeBot` | crawler খোলা রাখা, পরিষ্কার HTML |
| **Apple (Siri, Spotlight, Safari)** | Applebot ইনডেক্স | `Applebot`; ট্রেনিং opt-out-এর জন্য `Applebot-Extended` | crawler খোলা রাখা, Apple Business Connect |

**গুরুত্বপূর্ণ পার্থক্য:** Semrush-এর ২০২৬ সালের ডেটা অনুযায়ী মাত্র ~১১% ডোমেইন ChatGPT আর Perplexity দুটোতেই cite হয়। তাই একটা প্ল্যাটফর্মে কাজ করলে বাকিগুলোতে আপনাআপনি ফল আসে না। Google আর Bing দুটোতেই ইনডেক্স হওয়া বাধ্যতামূলক।

---

## ৩. সাইটে যা করা হয়েছে (কোডে)

| কাজ | ফাইল |
|---|---|
| ব্র্যান্ডের নাম দিয়ে শুরু হওয়া title, প্রমাণসহ description, title template | `src/app/layout.tsx` |
| **Favicon সেট** (সার্চ রেজাল্টের বাম পাশের ছবি): `favicon.ico` (16/32/48), `icon.svg`, `icon-96.png`, `icon-192.png`, `icon-512.png`; লোগো ভেক্টরে নতুন করে আঁকা, পটভূমি স্বচ্ছ | `public/` |
| **Apple** (iPhone/iPad home screen): `apple-touch-icon.png` 180×180। পটভূমি হালকা রঙের, কারণ iOS স্বচ্ছ অংশ কালো দেখায় | `public/` |
| **Android/PWA**: manifest-এ 192, 512 আর maskable 512 আইকন | `src/app/manifest.ts` |
| Entity graph: Organization, WebSite (site name-এর জন্য), দুই founder-এর Person, OfferCatalog, FAQPage; সবগুলো `@id` দিয়ে যুক্ত | `src/lib/jsonld.ts` |
| Founder প্রোফাইল পেজ, ProfilePage আর Breadcrumb schema সহ | `/team/robin`, `/team/siyam` |
| Sitemap-এ ৩টা URL, নির্দিষ্ট lastModified তারিখ | `src/app/sitemap.ts` |
| Robots: সব সার্চ আর AI crawler-কে স্পষ্টভাবে অনুমতি | `src/app/robots.ts` |
| এক বাক্যের entity definition, যা সব জায়গায় একই থাকবে | `AGENCY_INFO.definition` |
| "Digital growth studio" আর "Dhaka" সরিয়ে "Business growth company" | Hero, Footer, Logo, OG image |
| নতুন সার্ভিস: Ads, ad video, competitor analysis, US/UK কোম্পানি খোলা, roadmap, graphic design | `PILLARS` |
| FAQ: প্রতিটা উত্তর ৪০-৬০ শব্দে, প্রথম বাক্যেই সরাসরি উত্তর | `FAQ_ITEMS` |

### Favicon-এর নিয়ম (Google Search Central)
- আকৃতি বর্গাকার; ন্যূনতম 8×8, তবে **48×48-এর বড়** হওয়া উচিত। আগের "48-এর গুণিতক হতে হবে" নিয়মটা Google তুলে দিয়েছে।
- **হোমপেজে** `<link rel="icon">` থাকতে হবে, আর URL স্থায়ী রাখতে হবে (বারবার বদলাবেন না)।
- Googlebot আর Googlebot-Image যেন ফাইলটা পড়তে পারে (robots-এ ব্লক করা যাবে না)।
- ব্র্যান্ডকে ঠিকভাবে উপস্থাপন করতে হবে। আপত্তিকর বা বিভ্রান্তিকর আইকন দিলে Google নিজের ডিফল্ট আইকন দেখাবে।
- সার্চে দেখাতে **কয়েক দিন থেকে কয়েক সপ্তাহ** লাগে। দ্রুত করতে Search Console-এ হোমপেজের URL Inspection খুলে Request Indexing চাপুন।

### Site name (রেজাল্টে লিংকের উপরে যে নাম দেখায়)
হোমপেজের `WebSite` schema-তে `name: "PathFinder Grow"` আর `alternateName: ["PathfinderGrow", ...]` দেওয়া আছে। সাথে `og:site_name`, `<title>` আর H1-এর কাছের টেক্সট সব জায়গায় একই নাম ব্যবহার করা হয়েছে।

---

## ৪. লেখার নিয়ম (AEO + GEO)

1. **শুরুতেই উত্তর:** প্রতিটা সেকশনের প্রথম ১-২ বাক্যে (৪০-৬০ শব্দে) সরাসরি উত্তর, তারপর বিস্তারিত।
2. **প্রশ্নের মতো heading** লিখুন, যেমন "Who is Robin?", "What does PathFinder Grow do?"। মানুষ যেভাবে AI-কে প্রশ্ন করে, ঠিক সেভাবে।
3. **নির্দিষ্ট সংখ্যা আর নাম:** "3M+ registered users on Audiofrica" লিখুন, "millions of users" না। Princeton GEO গবেষণায় (KDD 2024) পরিসংখ্যান, quote আর citation যোগ করে AI-তে দৃশ্যমানতা সবচেয়ে বেশি বেড়েছে।
4. **একটা পেজে একটা টপিক।** প্রতিটা সার্ভিস আর প্রতিটা কেস স্টাডির জন্য আলাদা পেজ।
5. **তারিখ আর লেখকের নাম** দিন। Perplexity নতুন কনটেন্ট পছন্দ করে।
6. **টেবিল আর তালিকা** ব্যবহার করুন, কারণ AI এগুলো সহজে তুলে নেয়।
7. **গুরুত্বপূর্ণ কনটেন্ট HTML-এ রাখুন।** অনেক AI crawler JavaScript চালায় না। এই সাইট Next.js server rendering ব্যবহার করে, তাই ঠিক আছে। শুধু client-side animation-এর ভিতরে টেক্সট লুকিয়ে রাখবেন না।
8. **Superlative এড়িয়ে চলুন:** "best", "leading", "one of the world's top" নিজের সাইটে লিখলে কোনো লাভ হয় না। AI এসব উপেক্ষা করে, আর পড়ে মানুষের মনে সন্দেহ জাগে। "Best" শব্দটা **অন্যরা** বললে কাজ করে (Awwwards, Clutch, রিভিউ, আর্টিকেল)।

---

## ৫. যা কখনো করা যাবে না (Google Spam Policies 2024-2026 আর বিশেষজ্ঞদের সম্মিলিত পরামর্শ)

| নিষিদ্ধ কাজ | পরিণতি |
|---|---|
| AI দিয়ে শত শত পাতলা পেজ বানানো (scaled content abuse) | আগস্ট আর সেপ্টেম্বর ২০২৬-এর spam update-এ এই কারণেই বহু সাইট ধসে গেছে। মে ২০২৬ থেকে এই নীতি AI Overviews আর AI Mode-এও প্রযোজ্য |
| লিংক কেনা, PBN, লিংক এক্সচেঞ্জ | Link spam policy-র লঙ্ঘন, manual action |
| নকল রিভিউ, নকল ব্র্যান্ড mention, Reddit-এ বট দিয়ে পোস্ট | Google-এর মে ২০২৬-এর গাইডে স্পষ্টভাবে নিষেধ; Reddit অ্যাকাউন্ট ব্যান হবে |
| নিজের Organization schema-তে `AggregateRating` বা `Review` বসানো | Self-serving review। Google উপেক্ষা করে, আর spam ধরা পড়তে পারে। রিভিউ রাখার জায়গা Google Business Profile, Clutch, Fiverr আর Trustpilot |
| Schema-তে এমন তথ্য দেওয়া যা পেজে দেখা যায় না | Structured data policy-র লঙ্ঘন |
| Cloaking, লুকানো টেক্সট, keyword stuffing | মৌলিক spam; GEO-তেও উল্টো ফল দেয় |
| অন্যের বড় ডোমেইনে নিজের কনটেন্ট বসানো (parasite SEO) | Site reputation abuse |
| AI crawler ব্লক করা | ওই AI কখনো আপনাকে cite করতে পারবে না |
| `llms.txt`-কে অগ্রাধিকার দেওয়া | Ahrefs-এর ডেটায় এই ফাইল আছে এমন ৯৭% ডোমেইনে AI crawler কোনো অনুরোধই পাঠায়নি; Google বলেছে এটা লাগবে না। তাই এই সাইটে রাখা হয়নি |
| AI-এর জন্য কনটেন্ট কৃত্রিমভাবে টুকরো করা বা আলাদা সংস্করণ বানানো | Google এটাকে অপ্রয়োজনীয় বলেছে |
| Core update চলাকালীন (২৪ নভেম্বর পর্যন্ত) বড় পরিবর্তন করা | কোন পরিবর্তনের প্রভাব কী হলো, তা মাপা যাবে না |
| Sitemap-এ সবসময় "আজকের তারিখ" দেওয়া | Google lastModified বিশ্বাস করা বন্ধ করে দেয় |

---

## ৬. লঞ্চ চেকলিস্ট ("PathFinder Grow" সার্চে দ্রুত #১-এ আসার জন্য)

ব্র্যান্ডের নাম ইউনিক হলে সাধারণত কয়েক দিন থেকে দুই সপ্তাহের মধ্যে #১ আসে। "Pathfinder Communication" বা "Pathfinder Coaching"-এর সাথে নামের মিল আছে, তাই নাম সবসময় **"PathFinder Grow"** লিখতে হবে, আর পাশে "business growth company" শব্দ রাখতে হবে।

### দিন ০ (ডিপ্লয়ের দিন)
- [ ] `hello@pathfindergrow.com` ইমেইল বানানো, তারপর `AGENCY_INFO.contact.email` বদলে দেওয়া (এখন অন্য ডোমেইনের ইমেইল আছে, যা বিশ্বাসযোগ্যতা কমায়)
- [ ] Production-এ ডিপ্লয় করা, তারপর `https://pathfindergrow.com/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` আর `/favicon.ico` খুলে চেক করা
- [ ] [Schema Markup Validator](https://validator.schema.org/) আর [Rich Results Test](https://search.google.com/test/rich-results)-এ হোমপেজ আর `/team/robin` টেস্ট করা

### দিন ১
- [ ] **Google Search Console**-এ Domain property যোগ করে DNS দিয়ে verify করা (Spaceship-এ TXT record), sitemap জমা দেওয়া, তারপর `/`, `/team/robin` আর `/team/siyam`-এর জন্য **Request Indexing**
- [ ] **Bing Webmaster Tools**-এ "Import from Google Search Console" করা, তারপর **IndexNow** চালু করা। এতে Bing, Copilot আর ChatGPT search দ্রুত খবর পায়
- [ ] Google Analytics 4 বা Vercel Analytics-এ AI referral আলাদা করে দেখা (chatgpt.com, perplexity.ai, gemini.google.com, claude.ai)

### দিন ১-৪ (entity তৈরি)
প্রতিটা প্রোফাইলে `AGENCY_INFO.definition` বাক্যটা **হুবহু** বসাবেন, তারপর প্রোফাইলের URL `AGENCY_INFO.sameAs`-এ যোগ করবেন।
- [ ] LinkedIn Company Page
- [ ] Facebook Page
- [ ] Google Business Profile (service-area business হিসেবে করা যায়, তাতে ঠিকানা দেখাতে হয় না)
- [ ] Clutch.co আর GoodFirms প্রোফাইল (এজেন্সি র‍্যাঙ্কিং লিস্টে AI এগুলো থেকেই তথ্য নেয়)
- [ ] Crunchbase
- [ ] X (Twitter), Instagram, YouTube (ad video পোর্টফোলিওর জন্য)
- [ ] Robin আর Siyam-এর LinkedIn-এ "CEO at PathFinder Grow" আর "CTO at PathFinder Grow" পদবি, কোম্পানি পেজের সাথে লিংক করা। তারপর সব প্রোফাইল URL `TEAM_MEMBERS[].sameAs`-এ যোগ করা

### সপ্তাহ ১-৪ (প্রমাণ জোগাড়)
- [ ] পুরনো ক্লায়েন্টদের অনুরোধ করা যেন তারা Google Business Profile আর Clutch-এ রিভিউ দেন (৫-১০টা আসল রিভিউ)
- [ ] ক্লায়েন্টদের অনুমতি নিয়ে তাদের সাইটের ফুটারে "Designed & grown by PathFinder Grow" লিংক দেওয়া (Doctors Hero, PatientCare, Kajer Hut, Oushud)
- [ ] প্রতিটা বড় প্রজেক্টের জন্য আলাদা কেস স্টাডি পেজ `/work/[slug]`: সমস্যা, সমাধান, ফলাফল, সংখ্যা
- [ ] প্রতিটা সার্ভিসের জন্য আলাদা পেজ `/services/[slug]`

---

## ৭. ব্যক্তিগত ব্র্যান্ডিং

### Robin, "best interactive website developer"
নিজের সাইটে "best" লিখলে র‍্যাঙ্ক হয় না। এই সার্চে Google দেখায় Awwwards, তালিকাভিত্তিক আর্টিকেল আর Reddit। তাই কাজ হলো **সেই জায়গাগুলোতে নাম পৌঁছানো**:
1. সাইট আর সেরা ইন্টারঅ্যাক্টিভ প্রজেক্টগুলো **Awwwards, CSS Design Awards আর The FWA**-তে জমা দেওয়া। Honorable Mention বা Site of the Day পাওয়া বিশ্বের সবচেয়ে শক্তিশালী তৃতীয় পক্ষের প্রমাণ।
2. CodePen বা GitHub-এ GSAP আর scroll animation-এর ডেমো রাখা।
3. Codrops, dev.to বা Medium-এ টিউটোরিয়াল লেখা, যেমন "How we built the scroll story on pathfindergrow.com"।
4. ধাপে ধাপে লক্ষ্য রাখা: আগে "Robin interactive web developer" আর "interactive website developer Bangladesh", তারপর আন্তর্জাতিক কীওয়ার্ড।

### Siyam, "best backend developer"
1. Fiverr প্রোফাইলের লিংক, LinkedIn আর GitHub `sameAs`-এ যোগ করা।
2. টেকনিক্যাল লেখা: "How we built a clinic platform for 24+ clinics" বা "99.9% uptime pipelines for UK startups"।
3. Stack Overflow-এ উত্তর দেওয়া আর GitHub-এ ওপেন সোর্স কাজ রাখা।

---

## ৮. মাপার পদ্ধতি (প্রতি মাসে)
- Search Console: "PathFinder Grow" কীওয়ার্ডে position আর impressions; ২৪ নভেম্বরের পর এক সপ্তাহ অপেক্ষা করে আগের সপ্তাহের সাথে তুলনা
- ChatGPT, Gemini, Perplexity আর Claude-কে একই প্রশ্নগুলো করা: "What is PathFinder Grow?", "Who is Robin from PathFinder Grow?", "Best business growth company for startups". উত্তর আর cite হওয়া সোর্স স্প্রেডশিটে লিখে রাখা
- AI referral traffic Analytics-এ ট্র্যাক করা

---

## সূত্র
- Google Search Status Dashboard: November 2026 core update: https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc
- Search Engine Journal: November 2026 Core Update: https://www.searchenginejournal.com/google-november-2026-core-update/596614/
- Google Search Central: Favicon in search: https://developers.google.com/search/docs/appearance/favicon-in-search
- Google Search Central: Site names: https://developers.google.com/search/docs/appearance/site-names
- Google AI search guide coverage: https://www.thekeyword.co/news/google-ai-search-optimization-guide
- Princeton GEO (KDD 2024) summary: https://en.wikipedia.org/wiki/Generative_engine_optimization
- llms.txt data (Ahrefs/PPC Land): https://ppc.land/llms-txt-adoption-rises-8-8x-but-97-of-files-get-zero-ai-requests/
- Spam updates 2026 case studies: https://gsqi.com/marketing-blog/august-2026-google-spam-update-case-studies/
- AI crawler user agents: https://imvasa.dev/guides/ai-crawler-robots-txt-guide
