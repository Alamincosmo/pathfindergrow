import type { MetadataRoute } from "next";

/*
 * Everything is open on purpose. A crawler that is blocked can never cite us.
 * Search/answer bots (they decide whether we appear in AI answers):
 *   Googlebot (Search, AI Overviews, AI Mode) · Bingbot (Bing, Copilot, partner engines)
 *   OAI-SearchBot + ChatGPT-User (ChatGPT search) · PerplexityBot + Perplexity-User
 *   Claude-SearchBot + Claude-User (Claude) · Applebot (Siri, Spotlight) · DuckDuckBot
 * Training bots (GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, CCBot) are also allowed,
 * because being in model training data helps assistants know the brand without searching.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "DuckDuckBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://pathfindergrow.com/sitemap.xml",
    host: "https://pathfindergrow.com",
  };
}
