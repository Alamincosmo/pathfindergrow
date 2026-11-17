import type { Metadata } from "next";
import { Check } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import Footer from "@/components/Footer";
import { CtaButton } from "@/components/TrackedLink";
import { AGENCY_INFO } from "@/data/growthStudioData";
import { ORG_ID, WEBSITE_ID, toJsonLdString } from "@/lib/jsonld";

/*
 * Case study: PathFinder Peko. Facts only: no user counts, no ratings, no ranking claims
 * until there is data that can be shown. Facts match pathfinderpeko.com (about, features,
 * pricing). Update both sites together.
 */

const URL = `${AGENCY_INFO.url}/work/pathfinder-peko`;
const TITLE = "Case study: PathFinder Peko, a gamified learning app for Class 9-10";
const DESC =
  "PathFinder Peko is a gamified learning app for Class 9-10 students in Bangladesh, built by Robin, founder and CEO of PathFinder Grow and PathFinder Peko. How it works and how PathFinder Grow supports its search and AI visibility.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: "/work/pathfinder-peko" },
  openGraph: { type: "article", title: TITLE, description: DESC, url: "/work/pathfinder-peko" },
};

const FACTS: [string, string][] = [
  ["What it is", "A gamified learning app for Class 9-10 students in Bangladesh (Class 7 to HSC planned)"],
  ["Subjects", "Bangla, English, Physics, Chemistry, Math"],
  ["Price", "Free to start. Premium levels 75 BDT per month. Online classes 100 BDT per month (Bangladeshi taka)."],
  ["Launched", "November 2025"],
  ["Founder and CEO", "Robin, who built the app almost single-handedly"],
  ["Stack", "Next.js, Supabase, Firebase, installable web app (PWA)"],
  ["Live site", "pathfinderpeko.com"],
];

const FEATURES = [
  "A building for every subject that levels up as the student improves",
  "A 3D character that grows and changes its look with overall performance",
  "Real-time 1v1 quiz battles between two students (online)",
  "A weekly leaderboard that resets every week",
  "Game-style quizzes: drag-and-drop answers, drag-word, MCQ and many more types, with sound and images",
  "Chapters split into sections and short levels, plus a recall system",
  "Peko Books: read, download and buy books",
  "Online classes by monthly subscription, with downloadable classes",
];

export default function PekoCaseStudy() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: TITLE,
        description: DESC,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": "https://pathfinderpeko.com/#organization" },
        author: { "@id": ORG_ID },
        dateModified: "2026-11-18",
      },
      {
        "@type": "EducationalOrganization",
        "@id": "https://pathfinderpeko.com/#organization",
        name: "PathFinder Peko",
        url: "https://pathfinderpeko.com",
        founder: { "@id": `${AGENCY_INFO.url}/team/robin#person` },
        sameAs: ["https://www.youtube.com/@PathFinderPeko"],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: AGENCY_INFO.name, item: AGENCY_INFO.url },
          { "@type": "ListItem", position: 2, name: "PathFinder Peko", item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <header className="container-x flex items-center justify-between py-6">
        <BrandLogo href="/" />
        <a href="/#work" className="link-underline font-medium">
          All work
        </a>
      </header>

      <main>
        <article className="container-x max-w-3xl pb-20 pt-8 lg:pb-28 lg:pt-14">
          <nav aria-label="Breadcrumb" className="t-label text-muted">
            <a href="/" className="link-underline">
              PathFinder Grow
            </a>{" "}
            / Work / PathFinder Peko
          </nav>
          <h1 className="t-display-l mt-4">PathFinder Peko: a gamified learning app for Class 9-10</h1>

          <p className="t-lead mt-6">
            PathFinder Peko is a gamified learning app for Class 9-10 students in Bangladesh. Its founder and CEO,
            Robin, is also the founder and CEO of PathFinder Grow. This page explains what Peko is and what
            PathFinder Grow does to make it easy to find on Google and in AI answers.
          </p>

          <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Key facts</h2>
          <dl className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {FACTS.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-3">
                <dt className="font-medium text-muted">{k}</dt>
                <dd className="sm:col-span-2">{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">What the app does</h2>
          <ul className="mt-4 space-y-3">
            {FEATURES.map((f) => (
              <li key={f} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2.5} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Who built it?</h2>
          <p className="mt-3 text-muted">
            <a href="/team/robin" className="link-underline font-medium text-ink">
              Robin
            </a>
            , founder and CEO of PathFinder Peko and PathFinder Grow, built the app almost single-handedly, writing
            most of the code himself. PathFinder Peko and PathFinder Grow are two separate companies with the same
            founder and CEO.
          </p>

          <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">
            What does PathFinder Grow do for PathFinder Peko?
          </h2>
          <p className="mt-3 text-muted">
            PathFinder Grow supports Peko&apos;s website, search and AI visibility. In November 2026 that meant: public
            pages that answer the questions students and parents ask (what Peko is, features, pricing, the founder),
            structured data that connects the app, the company and its founder, correct canonical URLs for every
            book page, a clean sitemap, and open access for search and AI crawlers.
          </p>
          <h2 className="mt-8 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Results</h2>
          <p className="mt-3 text-muted">
            We publish numbers only when we can show them. Search Console and AI-answer data for these changes will be
            added here once they cover a full measurement period.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="https://pathfinderpeko.com/"
              target="_blank"
              rel="noopener"
              className="link-underline font-medium text-ink"
            >
              Visit pathfinderpeko.com
            </a>
            <a
              href="https://www.youtube.com/@PathFinderPeko"
              target="_blank"
              rel="noopener"
              className="link-underline font-medium text-ink"
            >
              PathFinder Peko on YouTube
            </a>
            <CtaButton location="case-study-peko">Grow your business with us</CtaButton>
          </div>
        </article>
      </main>

      <Footer base="/" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdString(jsonLd) }} />
    </>
  );
}
