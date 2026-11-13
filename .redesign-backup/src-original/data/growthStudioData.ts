export interface TeamMember {
  name: string;
  role: string;
  badge: string;
  experience: string;
  bio: string;
  image: string;
  skills: string[];
  achievements: string[];
  specialty: string;
}

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  roiImpact: string;
  deliverables: string[];
  techTags: string[];
  iconName: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  tagline: string;
  category: string;
  metrics: string;
  image: string;
  description: string;
  impactBullets: string[];
  liveUrl?: string;
  tech: string[];
}

export interface GrowthFrameworkStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  timeframe: string;
}

export const AGENCY_INFO = {
  name: "Pathfinder Grow",
  tagline: "We Don't Just Build Websites. We Engineer High-Yield Growth Engines.",
  mission: "We partner with ambitious founders, healthcare leaders, and modern businesses to turn digital presence into a dominant market monopoly through conversion-engineered 3D web platforms, Generative Engine Optimization (GEO), high-ticket branding, and automated cloud systems.",
  contact: {
    whatsapp: "01342132792",
    whatsappLink: "https://wa.me/8801342132792?text=Hello%20Pathfinder%20Grow!%20We%20want%20to%20scale%20our%20business%20growth.",
    email: "pch.cosmo1@gmail.com",
    emailLink: "mailto:pch.cosmo1@gmail.com?subject=Strategic%20Growth%20Inquiry%20-%20Pathfinder%20Grow",
    location: "Global Remote Studio • Dhaka / UK / Worldwide",
  },
  stats: [
    { label: "Active Users Powered", value: "10,000+" },
    { label: "Clinics & Startups Scaled", value: "24+" },
    { label: "Google Top 1 & AI Citation Time", value: "4 Days" },
    { label: "Average Page Load Speed", value: "<1.0s" },
    { label: "Global Projects Delivered", value: "50+" },
    { label: "System Uptime & Stability", value: "99.98%" },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Md. Siyam",
    role: "Co-Founder & Principal System Architect",
    badge: "Enterprise Architect & Automation Lead",
    experience: "6+ Years Engineering Experience",
    bio: "Full-stack developer and system architect who coded his first microcontroller at age 11. Engineered resilient distributed systems for UK enterprises (Techfrica LLC, House of Change) and architected Modern Mediks Clinic OS powering 24+ healthcare facilities. Merges deep backend rigor with pragmatic business scaling.",
    image: "/team/siyam.png",
    skills: [
      "Next.js / React 19",
      "Node.js & TypeScript",
      "Python, Celery & FastAPI",
      "PostgreSQL & Redis Caching",
      "AWS ECS, Docker & Linux",
      "Healthcare SaaS & HIPAA Compliance",
    ],
    achievements: [
      "Digitized prescription workflows across 24+ clinics with 10k+ patient records",
      "Designed distributed microservices for UK startups with <100ms latency",
      "Maintained 100% on-time delivery across 50+ global client projects",
    ],
    specialty: "High-concurrency cloud systems, automation pipelines, and rock-solid database architectures that scale smoothly as traffic explodes.",
  },
  {
    name: "Robin",
    role: "Co-Founder & Lead Product & GEO Technologist",
    badge: "3D Motion & AI Search Specialist",
    experience: "5+ Years Digital Growth & Frontend",
    bio: "Pioneer in Generative Engine Optimization (GEO) and high-touch interactive web experiences. Master of Next.js 16/15, GSAP 3D motion choreography, and tactile user interfaces. Architected Doctors Hero (achieving #1 Google ranking and primary AI model recommendation within 4 days) and Pathfinder Peko (10k+ learners with real-time multiplayer 1v1 battle engine).",
    image: "/team/robin.webp",
    skills: [
      "Next.js 16/15 App Router",
      "GEO (Generative Engine Optimization)",
      "SGE & Semantic AI Search",
      "GSAP 3D & Framer Motion",
      "Tailwind CSS v4 & Tactile Design",
      "Flutter & Dart Cross-Platform Mobile",
    ],
    achievements: [
      "Ranked Doctors Hero to #1 on Google & recommended by ChatGPT/Gemini in 96 hours",
      "Engineered real-time 1v1 battle platform for 10k+ learners with <50ms sync",
      "Built high-converting 3D tactile web applications that load in under 1 second",
    ],
    specialty: "Crafting captivating, story-driven 3D web interfaces combined with cutting-edge GEO so AI chatbots and search engines cite your brand first.",
  },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "pillar-web",
    number: "01",
    title: "High-Conversion 3D Interactive Web Platforms",
    shortDesc: "Sub-second speed, custom 3D tactile interactions, zero boring templates.",
    fullDesc: "We don't build generic brochure websites that visitors bounce from. We engineer interactive, story-driven web platforms using Next.js 16, Tailwind CSS, GSAP 3D, and Framer Motion. Every animation is calibrated to guide the eye toward conversion, reducing bounce rates and turning passive traffic into qualified inbound inquiries.",
    roiImpact: "Transforms your website from a passive expense into an active 24/7 sales engine with sub-1s load times and 3x higher visitor retention.",
    deliverables: [
      "Custom Next.js 16 App Router frontend with sub-second page loads",
      "GSAP 3D perspective shifts, tactile micro-interactions & kinetic motion",
      "Mobile-first responsive engineering tested across all viewport sizes",
      "Integrated frictionless booking, lead capture, and payment gateways",
      "Flawless Core Web Vitals score (95+ on Google PageSpeed Insights)",
    ],
    techTags: ["Next.js 16", "React 19", "GSAP 3D", "Framer Motion", "Tailwind CSS"],
    iconName: "Globe",
  },
  {
    id: "pillar-geo",
    number: "02",
    title: "Generative Engine Optimization (GEO) & Semantic SEO",
    shortDesc: "Get ranked on Google and cited as the #1 authority in ChatGPT, Gemini & Perplexity.",
    fullDesc: "Traditional SEO is no longer enough in 2026. High-ticket buyers are asking ChatGPT, Claude, and Gemini for direct vendor recommendations. We architect your digital entity graph, schema markup, and authoritative knowledge citations so AI models cite your business as the premier market choice — just like we did with Doctors Hero in only 4 days.",
    roiImpact: "Positions your business as the default recommendation when modern clients ask AI tools for help in your industry.",
    deliverables: [
      "Comprehensive AI Entity Modeling & Knowledge Graph structuring",
      "Generative Search Engine (GEO / SGE) semantic architecture",
      "High-intent keyword dominance for organic Google search",
      "Structured JSON-LD schema for AI LLM crawler indexing",
      "Continuous prompt ranking tracking across ChatGPT, Gemini & Claude",
    ],
    techTags: ["GEO", "AI Overviews", "SGE", "Semantic Schema", "JSON-LD"],
    iconName: "Sparkles",
  },
  {
    id: "pillar-brand",
    number: "03",
    title: "Strategic Brand Identity & High-Ticket Visuals",
    shortDesc: "World-class logo, typography & visual systems that command premium pricing.",
    fullDesc: "Perception dictates price. If your brand looks like a generic freelancer built it, clients negotiate down. We craft distinctive, category-defining visual identities — from mathematical vector logos and bespoke typography to 3D iconography and conversion-focused marketing collateral — establishing immediate credibility and market prestige.",
    roiImpact: "Eliminates price resistance by making your brand look 10x more established, credible, and trustworthy than competitors.",
    deliverables: [
      "Mathematical vector logo design & brand mark creation",
      "Comprehensive Brand Style Guide (Typography, Palette, Spatial Rules)",
      "High-resolution 3D visual assets, mockups, and marketing graphics",
      "Social media kit, pitch deck template, and business collateral",
      "Figma design system ready for developer handoff and multi-channel scale",
    ],
    techTags: ["Figma", "Vector Graphics", "Brand Identity", "Design Systems", "3D Renders"],
    iconName: "Palette",
  },
  {
    id: "pillar-automation",
    number: "04",
    title: "Intelligent Business Automation & Cloud Architecture",
    shortDesc: "Automate repetitive operations, sync data across tools, and eliminate human bottlenecks.",
    fullDesc: "Scaling a business without automation leads to burnout and dropped leads. We engineer custom background workflows, AI diagnostic tools, and resilient cloud architectures (AWS ECS, Docker, Redis, PostgreSQL) that automate patient queues, CRM updates, instant WhatsApp follow-ups, and subscription management.",
    roiImpact: "Saves 20-40 hours of manual operational labor each week and prevents costly human errors in client fulfillment.",
    deliverables: [
      "Custom API webhooks, Zapier/Make automations & Python worker scripts",
      "Enterprise database design with Redis caching for ultra-low latency",
      "Automated lead capture, email dispatch, and instant WhatsApp alerts",
      "HIPAA/GDPR-compliant cloud infrastructure on AWS or Vercel",
      "24/7 automated monitoring, self-healing cron jobs, and error telemetry",
    ],
    techTags: ["Python", "FastAPI", "Redis", "Docker", "AWS", "PostgreSQL"],
    iconName: "Cpu",
  },
  {
    id: "pillar-mobile",
    number: "05",
    title: "Cross-Platform Mobile App Engineering",
    shortDesc: "Silky 60fps native iOS & Android applications built with Flutter & Dart.",
    fullDesc: "Put your business directly in your customer's pocket. We build high-performance mobile applications with Flutter and Dart, ensuring a single maintainable codebase with 60fps butter-smooth native rendering, offline-first SQLite/Hive caching, and instant push notification loops that maximize user lifetime value.",
    roiImpact: "Builds deep customer loyalty and recurring transactions with effortless on-the-go accessibility.",
    deliverables: [
      "Cross-platform compilation for iOS App Store and Android Google Play",
      "Offline-first local caching and sub-50ms Supabase/Firebase sync",
      "Biometric authentication (FaceID / Fingerprint) & secure token storage",
      "Interactive real-time in-app notifications and background tasks",
      "End-to-end app store review submission and deployment support",
    ],
    techTags: ["Flutter", "Dart", "Firebase", "Supabase", "iOS", "Android"],
    iconName: "Smartphone",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "doctors-hero",
    client: "Doctors Hero",
    tagline: "Modern SEO & AI Model Dominance",
    category: "GEO & Search Dominance",
    metrics: "#1 on Google in 4 Days • AI Recommended",
    image: "/images/work/03.png",
    description: "Architected a groundbreaking Generative Engine Optimization (GEO) footprint for Doctors Hero, rocketing the platform to the top of Google organic rankings within 96 hours and making it the primary cited recommendation in ChatGPT and Gemini AI search queries.",
    impactBullets: [
      "Ranked #1 on Google for high-intent search keywords in 4 days",
      "Cited as primary trusted authority by ChatGPT, Gemini, and Claude AI overviews",
      "Massive surge in organic patient bookings without paying for Google Ads",
    ],
    liveUrl: "https://doctorshero.com/",
    tech: ["GEO", "SGE", "Semantic Schema", "Next.js", "Tailwind CSS"],
  },
  {
    id: "modern-mediks",
    client: "Modern Mediks",
    tagline: "HealthTech Clinic Operating System",
    category: "Healthcare SaaS & Enterprise Backend",
    metrics: "24+ Clinics • 10k+ Patients • 99.98% Uptime",
    image: "/images/work/01.png",
    description: "Designed and engineered an end-to-end Clinic Operating System featuring sub-second electronic health records sync, automated digital prescription generation, real-time patient queue triage, and full HIPAA-grade data compliance.",
    impactBullets: [
      "Currently deployed across 24+ medical clinics in Bangladesh",
      "Over 10,000+ patient prescriptions and medical histories digitized",
      "Reduced patient wait times by 45% through automated queuing algorithms",
    ],
    liveUrl: "#",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Docker"],
  },
  {
    id: "pathfinder-peko",
    client: "Pathfinder Peko",
    tagline: "Gamified EdTech & Realtime 1v1 Battle Arena",
    category: "Full-Stack Web & Multiplayer Systems",
    metrics: "10,000+ Learners • <50ms Realtime Sync",
    image: "/images/work/gallery-1.png",
    description: "A full-scale gamified educational platform featuring real-time multiplayer 1v1 quiz battles, offline-first PWA caching, and Duolingo-style 3D gamification aesthetics built to sustain 10,000+ concurrent active learners.",
    impactBullets: [
      "Sub-50ms real-time state synchronization via Supabase Realtime broadcast",
      "Over 10,000 active students engaging in daily competitive learning streaks",
      "Zero server downtime during massive peak board exam traffic spikes",
    ],
    liveUrl: "https://pathfinderpeko.com",
    tech: ["Next.js 16", "React 19", "Tailwind CSS", "Supabase", "PWA"],
  },
  {
    id: "techfrica-llc",
    client: "Techfrica LLC",
    tagline: "Enterprise Cloud Automation & Microservices",
    category: "Cloud Systems & Microservices",
    metrics: "<100ms Latency • Multi-Tenant ECS",
    image: "/images/work/02.png",
    description: "Engineered a distributed enterprise automation suite and high-throughput event streaming platform for a UK technology firm, slashing operational latency to sub-100ms across high-concurrency multi-tenant workloads.",
    impactBullets: [
      "Built resilient microservices architecture running on AWS ECS and Docker",
      "Integrated Redis caching layer eliminating database bottlenecks",
      "Automated critical financial reporting and client invoicing pipelines",
    ],
    liveUrl: "#",
    tech: ["Docker", "AWS ECS", "Redis", "FastAPI", "Python"],
  },
  {
    id: "patientcare-saas",
    client: "PatientCare 3D",
    tagline: "Interactive 3D SaaS Platform",
    category: "Interactive 3D Web",
    metrics: "<1s Load Time • 60fps Motion",
    image: "/images/work/gallery-2.png",
    description: "An ultra-modern SaaS product showcase featuring 3D tactile interaction choreography, smooth scroll transitions, and zero template clunkiness, achieving sub-second initial load times across all mobile and desktop devices.",
    impactBullets: [
      "Sub-second initial paint with zero layout shift (CLS: 0.00)",
      "Interactive 3D product previews increasing demo booking rates by 240%",
      "Fully responsive touch gestures optimized for iOS and Android web browsers",
    ],
    liveUrl: "https://patient-care-orcin.vercel.app/",
    tech: ["Next.js", "GSAP 3D", "Tailwind CSS", "Framer Motion"],
  },
];

export const GROWTH_FRAMEWORK: GrowthFrameworkStep[] = [
  {
    step: "01",
    title: "The Growth Audit & Friction Triage",
    subtitle: "Identify Where Revenue is Leaking",
    description: "We analyze your current digital presence, traffic sources, bounce points, and search presence. We pinpoint why visitors aren't converting, how competitors are outranking you, and where manual tasks are bleeding time.",
    deliverable: "Custom 360° Growth Audit & Friction Tear-Down Report",
    timeframe: "Days 1–3",
  },
  {
    step: "02",
    title: "Tactical Architecture & 3D Prototyping",
    subtitle: "Engineer the Unfair Advantage",
    description: "We architect the high-converting wireframes, 3D interaction models, brand identity upgrades, and GEO semantic schemas. You get direct access to both founders with zero junior-developer middlemen.",
    deliverable: "Interactive Figma Prototypes & System Architecture Plan",
    timeframe: "Days 4–7",
  },
  {
    step: "03",
    title: "High-Velocity Build & Cloud Deployment",
    subtitle: "Production-Grade Engineering",
    description: "We build the platform using Next.js, Tailwind CSS, and resilient backend systems. We inject structured schema for AI models, calibrate 60fps tactile animations, and test across 20+ mobile and desktop device profiles.",
    deliverable: "Live Production Deployment with Sub-1s Load Time",
    timeframe: "Days 8–18",
  },
  {
    step: "04",
    title: "GEO Indexing & Revenue Scaling",
    subtitle: "Market Monopoly Activation",
    description: "We trigger search engine crawls, seed entity authority signals across LLM training datasets, activate automated lead alerts to your phone, and establish tracking so you watch leads turn into paying customers.",
    deliverable: "AI Overviews Citation, Top Rankings & Operational Automation",
    timeframe: "Ongoing Scaling",
  },
];

export const PRICING_TIERS = [
  {
    name: "Growth Catalyst",
    badge: "Most Popular for Rapid Scaling",
    price: "$490 - $1,200",
    bdtPrice: "৳55,000 - ৳1,35,000",
    turnaround: "7 - 14 Days Delivery",
    target: "Ideal for growing businesses, clinics, and ambitious startups looking to overhaul their brand and 3x inbound conversions.",
    features: [
      "Custom 3D Interactive Web Platform (Next.js & Tailwind)",
      "Sub-second page speeds with 60fps tactile animations",
      "Full Brand Identity & Vector Logo Design Package",
      "Modern SEO & Generative Engine Optimization (GEO) setup",
      "Google Search Console & LLM entity graph indexing",
      "Automated lead capture & WhatsApp notification routing",
      "Direct communication with co-founders (Siyam & Robin)",
      "30 Days of post-launch priority support & monitoring",
    ],
    ctaText: "Claim Your Growth Sprint",
    highlight: true,
  },
  {
    name: "Enterprise Growth Engine",
    badge: "Full-Funnel Market Monopoly",
    price: "$1,500 - $3,500+",
    bdtPrice: "৳1,70,000 - ৳4,00,000+",
    turnaround: "3 - 5 Weeks Delivery",
    target: "Designed for established companies, healthcare networks, and SaaS platforms requiring custom cloud backends, mobile apps, and deep automation.",
    features: [
      "Everything in Growth Catalyst, PLUS:",
      "Custom Full-Stack Web App / SaaS Operating System",
      "Cross-Platform Mobile App (Flutter & Dart for iOS/Android)",
      "Resilient Cloud Infrastructure (Docker, AWS ECS, PostgreSQL, Redis)",
      "Advanced AI diagnostic tools & custom LLM workflow integrations",
      "Zero-latency real-time data sync & high-concurrency scaling",
      "HIPAA/GDPR compliance & enterprise data security architecture",
      "90 Days of dedicated architectural scaling & SLA support",
    ],
    ctaText: "Schedule Executive Briefing",
    highlight: false,
  },
];

export const ENTREPRENEUR_HACKS = [
  {
    rule: "The 3-Second Speed Moat",
    quote: "Amazon found every 100ms of latency costs 1% in sales. If your site takes 4s to load, you've lost 50% of buyers before they read your first headline.",
    solution: "We engineer Next.js architectures with sub-1s load times and 0 layout shifts.",
  },
  {
    rule: "GEO Over Standard SEO",
    quote: "In 2026, 40%+ of high-ticket B2B search queries are answered directly by AI chatbots. If ChatGPT doesn't recommend your company, you don't exist.",
    solution: "We build semantic entity structures so AI models cite you as the premier choice.",
  },
  {
    rule: "Perception Equals Pricing Power",
    quote: "Commodity businesses compete on price. Category leaders with distinctive visual identity and 3D tactile polish command 5x-10x higher margins effortlessly.",
    solution: "We design custom brand systems and tactile 3D interactions that build instant authority.",
  },
  {
    rule: "Speed to Lead Automation",
    quote: "A lead contacted within 5 minutes is 21x more likely to convert into a sale than one contacted after 30 minutes.",
    solution: "We wire autonomous webhook pipelines that drop instant WhatsApp & email alerts right into your hands.",
  },
];
