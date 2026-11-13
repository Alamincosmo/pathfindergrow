import { AGENCY_INFO, FAQ_ITEMS, PILLARS } from "@/data/growthStudioData";

export function buildJsonLd() {
  const url = AGENCY_INFO.url;
  const orgId = `${url}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: AGENCY_INFO.name,
        url,
        logo: `${url}/logo.webp`,
        email: AGENCY_INFO.contact.email,
        description:
          "Founder-led digital growth studio offering SEO and AI-search visibility, brand identity, websites and automation.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        founder: [
          { "@type": "Person", name: "Md. Siyam" },
          { "@type": "Person", name: "Robin" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: AGENCY_INFO.name,
        publisher: { "@id": orgId },
        inLanguage: "en",
      },
      ...PILLARS.map((p) => ({
        "@type": "Service",
        name: p.stage,
        serviceType: p.stage,
        description: p.promise,
        provider: { "@id": orgId },
        areaServed: "Worldwide",
      })),
      {
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}
