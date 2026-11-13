export const AGENCY_INFO = {
  name: "Pathfinder Grow",
  url: "https://pathfindergrow.com",
  tagline: "Get found. Get chosen. Grow.",
  contact: {
    whatsapp: "01342132792",
    whatsappLink:
      "https://wa.me/8801342132792?text=Hello%20Pathfinder%20Grow!%20We%20want%20to%20scale%20our%20business%20growth.",
    email: "almamun@pathfinderpko.com",
    emailLink:
      "mailto:almamun@pathfinderpko.com?subject=Growth%20Inquiry%20-%20Pathfinder%20Grow",
    location: "Dhaka, Bangladesh · remote worldwide",
  },
};

export interface ProofItem {
  client: string;
  fact: string;
  role: string;
  href?: string;
}

export const PROOF_ITEMS: ProofItem[] = [
  {
    client: "Doctors Hero",
    fact: "#1 on Google for its target searches within two weeks",
    role: "SEO and GEO",
    href: "https://doctorshero.com/",
  },
  {
    client: "Modern Mediks",
    fact: "Clinic operating system used by 24+ clinics",
    role: "System design and engineering",
  },
  {
    client: "Pathfinder Peko",
    fact: "Learning platform with 10,000+ learners",
    role: "Product engineering",
  },
];

export interface Pillar {
  id: string;
  number: string;
  stage: string;
  title: string;
  promise: string;
  services: string[];
}

export const PILLARS: Pillar[] = [
  {
    id: "found",
    number: "01",
    stage: "Get found",
    title: "People find you on Google and in AI answers",
    promise:
      "Buyers search on Google and ask AI assistants for recommendations. We make your business easy for both to understand, trust and show.",
    services: [
      "SEO and high-intent keyword work for Google",
      "Generative Engine Optimization (GEO) for ChatGPT, Gemini and Perplexity",
      "Structured data (JSON-LD) and entity modeling",
      "Ongoing checks of the questions buyers ask AI assistants",
    ],
  },
  {
    id: "chosen",
    number: "02",
    stage: "Get chosen",
    title: "Your brand makes people trust you at first glance",
    promise:
      "Perception sets price. A clear, distinctive identity makes you look as established as you are, so buyers negotiate less and decide faster.",
    services: [
      "Logo and brand mark design",
      "Brand style guide: type, color and spacing rules",
      "Social media kit, pitch-deck template and business collateral",
      "Figma design system ready for developers",
    ],
  },
  {
    id: "convert",
    number: "03",
    stage: "Turn visits into customers",
    title: "Your website sells while you sleep",
    promise:
      "A fast, mobile-first site where every section answers a buyer question and every animation guides the eye to the next step.",
    services: [
      "Custom websites and landing pages on Next.js",
      "UX and UI design with motion that guides, not decorates",
      "Booking, lead capture and payment integrations",
      "Web apps and cross-platform mobile apps (Flutter)",
    ],
  },
  {
    id: "grow",
    number: "04",
    stage: "Grow without extra staff",
    title: "Leads and follow-ups run themselves",
    promise:
      "Growth breaks when everything depends on manual work. We automate the repeat tasks so leads are answered and data stays in sync.",
    services: [
      "Instant WhatsApp and email alerts for new leads",
      "CRM updates, webhooks and Zapier or Make automations",
      "Backend systems, databases and caching",
      "Cloud setup on AWS or Vercel with monitoring",
    ],
  },
];

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  role?: string;
  summary: string;
  fact?: string;
  href?: string;
  image?: { src: string; alt: string };
  stack?: string[];
  diagram?: "clinic" | "cloud";
}

export const FAN_PROJECTS: CaseStudy[] = [
  {
    id: "kajerhut",
    client: "Kajer Hut",
    category: "Home services marketplace",
    summary: "A platform that connects people with expert home-service providers.",
    href: "https://kajerhut.com/",
    image: { src: "/work/kajerhut.webp", alt: "Kajer Hut homepage" },
  },
  {
    id: "immersedin",
    client: "Immersed In",
    category: "Event experience hire, UK",
    summary:
      "Photo booths, magic mirrors, 360 video and holography hire for weddings and corporate events across the UK.",
    href: "https://immersedin.co.uk/",
    image: { src: "/work/immersedin.webp", alt: "Immersed In homepage" },
  },
  {
    id: "doctors-hero",
    client: "Doctors Hero",
    category: "Healthcare management platform",
    role: "SEO and GEO",
    summary:
      "A platform for appointments, patient records and prescriptions. We structured its search presence so Google and AI assistants can understand and surface it.",
    fact: "#1 on Google for its target searches within two weeks",
    href: "https://doctorshero.com/",
    image: { src: "/work/doctors-hero.webp", alt: "Doctors Hero homepage" },
  },
  {
    id: "audiofrica",
    client: "Audiofrica",
    category: "Music and radio streaming",
    role: "Platform engineering",
    summary:
      "A music and radio app for African music: streaming, offline downloads, radio and an artist store.",
    href: "https://audiofrica.com/",
    image: { src: "/work/audiofrica.webp", alt: "Audiofrica homepage" },
  },
  {
    id: "patientcare",
    client: "Patientcare.com.bd",
    category: "Patient portal, Bangladesh",
    role: "UI and UX design",
    summary:
      "A patient portal for booking doctor appointments online and managing health records and prescriptions.",
    href: "https://patientcare.com.bd/",
    image: { src: "/work/patientcare.webp", alt: "Patientcare.com.bd homepage" },
  },
  {
    id: "oushud",
    client: "Oushud",
    category: "Medicine website, Bangladesh",
    summary: "A website listing medicines available in Bangladesh.",
    href: "https://oushud.com/",
  },
  {
    id: "mangaoceanbd",
    client: "Manga Ocean BD",
    category: "Anime and manga book shop",
    summary: "An online shop for manga and anime books.",
    href: "https://mangaoceanbd.com/",
    image: { src: "/work/mangaoceanbd.webp", alt: "Manga Ocean BD homepage" },
  },
  {
    id: "frenchlearnersclub",
    client: "French Learners Club",
    category: "Online French learning",
    summary: "A website for people who want to learn to speak French.",
    href: "https://frenchlearnersclub.com/",
    image: { src: "/work/frenchlearnersclub.webp", alt: "French Learners Club homepage" },
  },
];

export const MORE_WORK: CaseStudy[] = [
  {
    id: "modern-mediks",
    client: "Modern Mediks",
    category: "Clinic operating system",
    role: "System design and engineering",
    summary:
      "An end-to-end clinic operating system: electronic health records, digital prescriptions and a real-time patient queue.",
    fact: "Used by 24+ clinics",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets", "Docker"],
    diagram: "clinic",
  },
  {
    id: "techfrica",
    client: "Techfrica LLC",
    category: "Cloud automation and microservices",
    role: "Cloud automation and microservices",
    summary:
      "A distributed automation and event-streaming platform for a UK technology firm, built as microservices on AWS ECS with a Redis caching layer.",
    stack: ["Docker", "AWS ECS", "Redis", "FastAPI", "Python"],
    diagram: "cloud",
  },
  {
    id: "pathfinder-peko",
    client: "Pathfinder Peko",
    category: "Learning platform",
    role: "Product engineering",
    summary:
      "A gamified learning platform with real-time 1v1 quiz battles and an offline-first progressive web app.",
    fact: "10,000+ learners",
    stack: ["Next.js", "Supabase Realtime", "PWA"],
  },
];
export interface Step {
  step: string;
  title: string;
  description: string;
  deliverable: string;
  timeframe: string;
}

export const PROCESS_STEPS: Step[] = [
  {
    step: "01",
    title: "Audit",
    description:
      "We review your site, search presence and manual processes to find where customers are lost and where competitors outrank you.",
    deliverable: "A 360° growth audit report",
    timeframe: "First 3 days",
  },
  {
    step: "02",
    title: "Plan and prototype",
    description:
      "Wireframes, brand direction and the structured-data plan. You work directly with both founders, with no junior hand-off.",
    deliverable: "A clickable Figma prototype and a system plan",
    timeframe: "Days 4 to 7",
  },
  {
    step: "03",
    title: "Build and launch",
    description:
      "We build the site and any backend you need, add the structured data AI assistants read, and test across phone and desktop sizes.",
    deliverable: "A live, production website",
    timeframe: "Rest of the sprint",
  },
  {
    step: "04",
    title: "Grow",
    description:
      "We submit the site for indexing, set up lead alerts to your phone and tracking, so you can watch leads turn into customers.",
    deliverable: "Search visibility work, tracking and automation",
    timeframe: "Ongoing",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  facts: string[];
  image: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Md. Siyam",
    role: "Co-founder · Systems, backend and automation",
    bio: "Full-stack developer and systems architect. Wrote the first microcontroller code at age 11.",
    facts: [
      "Designed Modern Mediks, a clinic operating system used by 24+ clinics",
      "Built distributed systems for UK companies including Techfrica LLC and House of Change",
      "Works across Next.js, Node.js, Python, PostgreSQL, Redis and AWS",
    ],
    image: "/team/siyam.png",
  },
  {
    name: "Robin",
    role: "Co-founder · Product, frontend, motion and search visibility",
    bio: "Specialist in interactive web interfaces and Generative Engine Optimization.",
    facts: [
      "Built Pathfinder Peko, a learning platform with real-time 1v1 quiz battles",
      "Builds story-driven interfaces with Next.js, GSAP and Framer Motion",
      "Also builds cross-platform mobile apps with Flutter and Dart",
    ],
    image: "/team/robin.webp",
  },
];

export interface PricingTier {
  name: string;
  badge: string;
  from: string;
  upTo: string;
  fromBdt: string;
  upToBdt: string;
  turnaround: string;
  target: string;
  highlights: string[];
  features: string[];
  cta: string;
  featured: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Growth Catalyst",
    badge: "Most popular",
    from: "$490",
    upTo: "up to $1,200 depending on scope",
    fromBdt: "৳55,000",
    upToBdt: "up to ৳1,35,000 depending on scope",
    turnaround: "7 to 14 days",
    target:
      "For growing businesses, clinics and startups that want to overhaul their brand and win more inbound customers.",
    highlights: [
      "A fast custom website on Next.js",
      "Brand identity and vector logo",
      "SEO and GEO setup",
      "Lead capture with WhatsApp alerts",
      "Direct access to both founders",
    ],
    features: [
      "Custom website on Next.js and Tailwind, fast and mobile-first",
      "Smooth animations that guide visitors toward your call to action",
      "Full brand identity and vector logo package",
      "SEO and Generative Engine Optimization (GEO) setup",
      "Google Search Console and structured data (entity graph) setup",
      "Automated lead capture and WhatsApp notification routing",
      "Direct communication with co-founders (Siyam and Robin)",
      "30 days of post-launch priority support and monitoring",
    ],
    cta: "Start a growth sprint",
    featured: true,
  },
  {
    name: "Enterprise Growth Engine",
    badge: "Full funnel",
    from: "$1,500",
    upTo: "up to $3,500 and more depending on scope",
    fromBdt: "৳1,70,000",
    upToBdt: "up to ৳4,00,000 and more depending on scope",
    turnaround: "3 to 5 weeks",
    target:
      "For established companies, healthcare networks and SaaS platforms that need custom backends, mobile apps and deep automation.",
    highlights: [
      "Everything in Growth Catalyst",
      "Custom web app or SaaS system",
      "Cross-platform mobile app",
      "Cloud backend and automation",
      "90 days of scaling support",
    ],
    features: [
      "Everything in Growth Catalyst, plus:",
      "Custom full-stack web app or SaaS system",
      "Cross-platform mobile app (Flutter and Dart for iOS and Android)",
      "Cloud infrastructure (Docker, AWS ECS, PostgreSQL, Redis)",
      "AI diagnostic tools and custom LLM workflow integrations",
      "Real-time data sync built to scale with traffic",
      "Security-minded architecture and data protection practices",
      "90 days of dedicated scaling and support",
    ],
    cta: "Book an executive briefing",
    featured: false,
  },
];

export const GUARANTEE =
  "If what we deliver is not what we agreed in writing, or has major mistakes we cannot fix, you get a full refund.";

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What does Pathfinder Grow do?",
    a: "Pathfinder Grow is a digital growth studio run by founders Md. Siyam and Robin. We help businesses get more customers online: SEO and AI-search visibility so people find you, brand identity and fast websites so they choose you, and automation so leads and follow-ups run without extra staff.",
  },
  {
    q: "What is Generative Engine Optimization (GEO)?",
    a: "GEO means structuring your website and online presence so AI assistants such as ChatGPT, Gemini and Perplexity can understand and recommend your business. It builds on SEO with clear structured data, direct answers to buyer questions, and consistent facts about your company across the web.",
  },
  {
    q: "How long does a project take?",
    a: "A growth sprint takes 7 to 14 days from kickoff to launch, starting with a 3-day audit. Larger builds with custom backends, mobile apps or automation take 3 to 5 weeks. After launch we continue with search visibility and automation work.",
  },
  {
    q: "How much does it cost?",
    a: "Growth sprints start at $490 (৳55,000) and go up to about $1,200 depending on scope. Larger builds start at $1,500 and range up to $3,500 and more. The first growth audit is free and without obligation.",
  },
  {
    q: "Who will work on my project?",
    a: "You work directly with the two founders. Md. Siyam leads systems, backend and automation. Robin leads product, frontend, motion and search visibility. There are no account managers in between, so the people you talk to are the people building your project.",
  },
  {
    q: "Do you work with clinics and healthcare?",
    a: "Yes. Healthcare is our strongest track record, including Modern Mediks, a clinic operating system, and the SEO and GEO work for Doctors Hero. We also work with startups and growing businesses in other industries.",
  },
  {
    q: "What if I am not happy with the result?",
    a: GUARANTEE,
  },
];
