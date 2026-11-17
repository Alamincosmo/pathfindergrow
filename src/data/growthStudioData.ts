/*
 * ENTITY FACTS. These sentences are what Google, ChatGPT, Gemini, Perplexity and Claude quote
 * when someone asks "What is PathFinder Grow?". Keep them word-for-word identical on every
 * profile (LinkedIn, Facebook, Google Business Profile, Clutch, Crunchbase). Change them here
 * and on those profiles at the same time, never in only one place.
 */
export const AGENCY_INFO = {
  name: "PathFinder Grow",
  alternateNames: ["Pathfinder Grow", "PathFinderGrow", "PathfinderGrow"],
  url: "https://pathfindergrow.com",
  category: "Business growth company",
  tagline: "Get found. Get chosen. Grow.",
  slogan: "Grow your business toward its biggest goal.",
  /** One sentence, answer-first. Used in the hero, footer, schema and all external profiles. */
  definition:
    "PathFinder Grow is a business growth company that helps businesses grow in every direction, from planning and roadmaps to websites, apps, ads, branding, SEO and AI search visibility.",
  /** The proof sentence that follows the definition. Only numbers we can show. */
  proof:
    "Its founders have built and grown platforms used by more than 3 million people, including Audiofrica, Supfrica and Doctors Hero, and have helped 200+ businesses and platforms grow online.",
  /**
   * Official profiles of the company. Fill these in as soon as each profile exists:
   * every URL added here becomes a `sameAs` link that ties the entity together for Google and AI.
   */
  sameAs: ["https://www.youtube.com/@pathfinder_grow"] as string[],
  youtube: "https://www.youtube.com/@pathfinder_grow",
  contact: {
    whatsapp: "01342132792",
    whatsappLink:
      "https://wa.me/8801342132792?text=Hello%20PathFinder%20Grow!%20We%20want%20to%20scale%20our%20business%20growth.",
    email: "almamun@pathfinderpko.com",
    emailLink:
      "mailto:almamun@pathfinderpko.com?subject=Growth%20Inquiry%20-%20PathFinder%20Grow",
    location: "Working with businesses worldwide",
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
    client: "Audiofrica",
    fact: "Music and radio platform with 3M+ registered users across Africa",
    role: "Platform engineering",
    href: "https://audiofrica.com/",
  },
  {
    client: "Doctors Hero",
    fact: "#1 on Google for its target searches within two weeks",
    role: "SEO and GEO",
    href: "https://doctorshero.com/",
  },
  {
    client: "PatientCare.com.bd",
    fact: "Patient portal for booking doctors online",
    role: "UI and UX design",
    href: "https://patientcare.com.bd/",
  },
  {
    client: "Modern Mediks",
    fact: "Digital prescriptions for 24+ clinics and 10,000+ patient records",
    role: "System design and engineering",
  },
  {
    client: "PathFinder Peko",
    fact: "Gamified learning app for Class 9-10 students in Bangladesh",
    role: "Founder-built, with search and AI visibility by PathFinder Grow",
    href: "https://pathfinderpeko.com/",
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
      "Custom ad campaigns and ad videos for Google, Meta and YouTube",
      "Competitor analysis and ongoing checks of what buyers ask AI assistants",
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
      "Logo, brand mark and graphic design",
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
      "Business planning, growth roadmaps and help opening a company in the US or UK",
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
  /** Internal path of a full case study page on this site. */
  caseStudy?: string;
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
    client: "PathFinder Peko",
    category: "Gamified learning app, Bangladesh",
    role: "Founder-built product, search and AI visibility by PathFinder Grow",
    summary:
      "A gamified learning app for Class 9-10 students in Bangladesh: a building that levels up for every subject, a growing 3D character, real-time 1v1 quiz battles and a weekly leaderboard. Free to start, built by our founder and CEO, Robin.",
    href: "https://pathfinderpeko.com/",
    caseStudy: "/work/pathfinder-peko",
    stack: ["Next.js", "Supabase", "Firebase", "PWA"],
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

export interface Experience {
  title: string;
  org: string;
  period: string;
  summary: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  /** Short title shown on cards and used as schema.org jobTitle. */
  jobTitle: string;
  role: string;
  /** Answer-first summary (40 to 60 words) for the profile page and AI answers. */
  summary: string;
  bio: string;
  facts: string[];
  experience: Experience[];
  knowsAbout: string[];
  /** LinkedIn, GitHub, X, Awwwards, Fiverr... Every URL here becomes a `sameAs` link. */
  sameAs: string[];
  image: string;
  /** Question-and-answer blocks shown on the profile page (answer first, one fact per answer). */
  faq?: { q: string; a: string }[];
  /** Other companies this person runs, as Organization @id URLs (for schema `worksFor`). */
  alsoWorksFor?: string[];
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "robin",
    name: "Robin",
    jobTitle: "Founder and CEO",
    role: "Founder and CEO · PathFinder Grow and PathFinder Peko",
    summary:
      "Robin is the founder and CEO of PathFinder Grow, a business growth company, and of PathFinder Peko, a gamified learning app for Class 9-10 students in Bangladesh that Robin built almost single-handedly. Robin is also an interactive web developer who led SEO and GEO for Doctors Hero and designed PatientCare.com.bd.",
    bio: "Founder and CEO of two companies. Built PathFinder Peko himself, writes interactive, ultra-fast websites and leads search and AI visibility work.",
    alsoWorksFor: ["https://pathfinderpeko.com/#organization"],
    faq: [
      {
        q: "Who is the CEO of PathFinder Grow?",
        a: "Robin is the founder and CEO of PathFinder Grow, a business growth company. The CTO is Md. Siyam.",
      },
      {
        q: "Who is the CEO of PathFinder Peko?",
        a: "Robin is also the founder and CEO of PathFinder Peko, a gamified learning app for Class 9-10 students in Bangladesh. He built the app almost single-handedly, writing most of the code himself. PathFinder Peko and PathFinder Grow are two separate companies with the same founder.",
      },
      {
        q: "Which Robin is this?",
        a: "This is Robin, founder and CEO of PathFinder Grow and PathFinder Peko. He is not the DC Comics character Robin.",
      },
    ],
    facts: [
      "Founded and built PathFinder Peko, a gamified learning app for Class 9-10 students in Bangladesh, writing most of the code himself",
      "Led SEO and GEO for Doctors Hero, a healthcare platform used by 500+ clinics",
      "Designed the UI and UX of PatientCare.com.bd, a patient portal for booking doctors online",
      "Builds interactive, ultra-fast websites with Next.js, GSAP and Framer Motion",
      "Graphic and logo designer who also builds Flutter mobile apps",
    ],
    experience: [
      {
        title: "Founder and CEO",
        org: "PathFinder Grow",
        period: "Present",
        summary: "Leads strategy, interactive web development, design and search visibility for client businesses.",
      },
      {
        title: "Founder and CEO",
        org: "PathFinder Peko",
        period: "2025 to present",
        summary: "Built the gamified learning app for Class 9-10 students almost single-handedly and runs the company.",
      },
      {
        title: "SEO and GEO specialist",
        org: "Doctors Hero",
        period: "Client work",
        summary: "Structured the platform's search presence so Google and AI assistants understand and surface it.",
      },
      {
        title: "UI and UX designer",
        org: "PatientCare.com.bd",
        period: "Client work",
        summary: "Designed the patient portal for finding doctors, booking serials and keeping prescriptions in one place.",
      },
      {
        title: "Web developer and designer",
        org: "Independent",
        period: "2022 to present",
        summary: "Websites, graphic design and logo design for businesses and platforms.",
      },
    ],
    knowsAbout: [
      "Interactive web development",
      "Next.js",
      "React",
      "GSAP",
      "Framer Motion",
      "UI and UX design",
      "Graphic design",
      "Logo design",
      "Search engine optimization",
      "Generative engine optimization",
      "Flutter",
    ],
    sameAs: [],
    image: "/team/robin.webp",
  },
  {
    slug: "siyam",
    name: "Md. Siyam",
    jobTitle: "CTO and Backend Engineer",
    role: "CTO and co-founder · Backend and systems architect",
    summary:
      "Md. Siyam is the CTO and co-founder of PathFinder Grow and a backend engineer and systems architect. Siyam leads technology at Modern Mediks, which digitizes prescriptions for 24+ clinics, serves as IT Director at Techfrica LLC in the UK and is a Top-Rated developer on Fiverr with 50+ projects delivered.",
    bio: "Backend engineer and systems architect. Wrote the first microcontroller code at age 11.",
    facts: [
      "Technology Officer at Modern Mediks: digital prescriptions for 24+ clinics and 10,000+ patient records",
      "IT Director at Techfrica LLC, automating workflows for UK startups with 99.9% pipeline uptime",
      "Former Head Backend Developer at House of Change Limited",
      "Top-Rated on Fiverr with 50+ projects, 5-star ratings and a 100% on-time record",
    ],
    experience: [
      {
        title: "CTO and co-founder",
        org: "PathFinder Grow",
        period: "Present",
        summary: "Leads backend, cloud infrastructure and automation for every client platform.",
      },
      {
        title: "Technology Officer",
        org: "Modern Mediks",
        period: "May 2024 to present",
        summary:
          "Building the clinic management platform: digital prescriptions, patient records and clinical workflows for doctors across Bangladesh.",
      },
      {
        title: "IT Director",
        org: "Techfrica LLC",
        period: "September 2023 to present",
        summary:
          "Leads software development and IT strategy, automating enterprise workflows and building secure systems for UK-based startups. Fully remote.",
      },
      {
        title: "Web Designer and Developer (Top-Rated)",
        org: "Fiverr",
        period: "February 2023 to December 2025",
        summary: "Delivered 50+ custom web projects: landing pages, full-stack web apps and CMS architectures for clients worldwide.",
      },
      {
        title: "Head Backend Developer",
        org: "House of Change Limited",
        period: "2022 to August 2023",
        summary: "Led backend engineering: scalable server-side systems, secure database architecture and legacy modernization.",
      },
    ],
    knowsAbout: [
      "Backend engineering",
      "System architecture",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "Workflow automation",
      "Embedded systems",
    ],
    sameAs: [],
    image: "/team/siyam.png",
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
    q: "What does PathFinder Grow do?",
    a: "PathFinder Grow is a business growth company that helps businesses grow in every direction: planning and roadmaps, websites and apps, ads, branding, SEO and AI search visibility. Its founders have built and grown platforms used by more than 3 million people and have helped 200+ businesses grow online.",
  },
  {
    q: "Who is the CEO of PathFinder Grow?",
    a: "The founder and CEO of PathFinder Grow is Robin, who is also the founder and CEO of PathFinder Peko, a gamified learning app for students in Bangladesh. The CTO is Md. Siyam, a backend engineer and systems architect. Both work directly on every client project, so the people you talk to are the people building your growth.",
  },
  {
    q: "What is the relationship between PathFinder Grow and PathFinder Peko?",
    a: "They are two separate companies with the same founder and CEO, Robin. PathFinder Peko is a gamified learning app for Class 9-10 students in Bangladesh. PathFinder Grow is the business growth company that supports PathFinder Peko's website, search and AI visibility. You can read the full story in our PathFinder Peko case study.",
  },
  {
    q: "What platforms has PathFinder Grow worked on?",
    a: "The team has worked on Audiofrica, a music and radio platform with 3M+ registered users across Africa; Supfrica, a messenger and super-app with 300,000+ downloads; Doctors Hero, a healthcare platform used by 500+ clinics; PatientCare.com.bd; Modern Mediks; PathFinder Peko, a gamified learning app for Class 9-10 students; Kajer Hut and Oushud.",
  },
  {
    q: "Can you help me open a company in the US or UK?",
    a: "Yes. PathFinder Grow helps founders plan their expansion, build a growth roadmap and set up a company in the US or UK, then builds the website, brand, ads and search presence the new company needs to win its first customers.",
  },
  {
    q: "Do you create ads?",
    a: "Yes. We plan and build custom ad campaigns for Google, Meta and YouTube, including the ad videos and creatives, based on a competitor analysis of your market. Ads work best alongside SEO, so paid and organic search support each other.",
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
    a: "You work directly with the two founders. Robin, the CEO, leads strategy, interactive web development, design and search visibility. Md. Siyam, the CTO, leads backend systems, cloud infrastructure and automation. There are no account managers in between, so the people you talk to are the people building your project.",
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
