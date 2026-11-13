import { AGENCY_INFO, FAQ_ITEMS, PILLARS, TEAM_MEMBERS, type TeamMember } from "@/data/growthStudioData";

/*
 * One connected entity graph. Every node has a stable @id so Google, Bing and AI crawlers
 * see a single company with two named founders, not loose facts.
 * Rules followed (Google structured data guidelines):
 * - Only mark up facts that are visible on the page.
 * - No self-serving AggregateRating/Review on our own Organization: Google ignores it and it
 *   can count as spam. Ratings belong on Google Business Profile, Clutch, Fiverr, etc.
 */

const url = AGENCY_INFO.url;
export const ORG_ID = `${url}/#organization`;
export const WEBSITE_ID = `${url}/#website`;
export const personId = (m: TeamMember) => `${url}/team/${m.slug}#person`;
export const personUrl = (m: TeamMember) => `${url}/team/${m.slug}`;

export function personNode(m: TeamMember) {
  return {
    "@type": "Person",
    "@id": personId(m),
    name: m.name,
    url: personUrl(m),
    image: `${url}${m.image}`,
    jobTitle: m.jobTitle,
    description: m.summary,
    worksFor: { "@id": ORG_ID },
    knowsAbout: m.knowsAbout,
    ...(m.sameAs.length ? { sameAs: m.sameAs } : {}),
  };
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: AGENCY_INFO.name,
    alternateName: AGENCY_INFO.alternateNames,
    url,
    logo: {
      "@type": "ImageObject",
      "@id": `${url}/#logo`,
      url: `${url}/icon-512.png`,
      width: 512,
      height: 512,
      caption: AGENCY_INFO.name,
    },
    image: { "@id": `${url}/#logo` },
    description: `${AGENCY_INFO.definition} ${AGENCY_INFO.proof}`,
    slogan: AGENCY_INFO.slogan,
    email: AGENCY_INFO.contact.email,
    areaServed: "Worldwide",
    knowsAbout: [
      "Business growth strategy",
      "Web development",
      "Interactive websites",
      "Mobile app development",
      "Search engine optimization",
      "Generative engine optimization",
      "Answer engine optimization",
      "Digital advertising",
      "Brand identity and logo design",
      "Backend systems and cloud infrastructure",
      "Business automation",
    ],
    founder: TEAM_MEMBERS.map((m) => ({ "@id": personId(m) })),
    employee: TEAM_MEMBERS.map((m) => ({ "@id": personId(m) })),
    ...(AGENCY_INFO.sameAs.length ? { sameAs: AGENCY_INFO.sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business growth services",
      itemListElement: PILLARS.map((p) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: p.stage,
          description: `${p.promise} Includes: ${p.services.join("; ")}.`,
          provider: { "@id": ORG_ID },
          areaServed: "Worldwide",
        },
      })),
    },
  };
}

/** WebSite node: this is what Google uses for the site name shown above each result. */
function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url,
    name: AGENCY_INFO.name,
    alternateName: AGENCY_INFO.alternateNames,
    description: AGENCY_INFO.definition,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      websiteNode(),
      ...TEAM_MEMBERS.map(personNode),
      {
        "@type": "FAQPage",
        "@id": `${url}/#faq`,
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/** ProfilePage graph for /team/[slug]: Google's recommended markup for a person's profile. */
export function buildProfileJsonLd(m: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${personUrl(m)}#profile`,
        url: personUrl(m),
        name: `${m.name}, ${m.jobTitle} at ${AGENCY_INFO.name}`,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": personId(m) },
        inLanguage: "en",
      },
      personNode(m),
      { "@type": "Organization", "@id": ORG_ID, name: AGENCY_INFO.name, url },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: AGENCY_INFO.name, item: url },
          { "@type": "ListItem", position: 2, name: m.name, item: personUrl(m) },
        ],
      },
    ],
  };
}

export const toJsonLdString = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
