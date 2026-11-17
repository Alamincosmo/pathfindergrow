import type { MetadataRoute } from "next";
import { AGENCY_INFO, TEAM_MEMBERS } from "@/data/growthStudioData";

// Bump this date whenever page content really changes. A fake "always now" date teaches
// Google to ignore lastModified.
const CONTENT_UPDATED = new Date("2026-11-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: AGENCY_INFO.url, lastModified: CONTENT_UPDATED, changeFrequency: "monthly", priority: 1 },
    ...TEAM_MEMBERS.map((m) => ({
      url: `${AGENCY_INFO.url}/team/${m.slug}`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${AGENCY_INFO.url}/work/pathfinder-peko`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
