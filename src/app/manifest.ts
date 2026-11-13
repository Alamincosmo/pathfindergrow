import type { MetadataRoute } from "next";
import { AGENCY_INFO } from "@/data/growthStudioData";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AGENCY_INFO.name,
    short_name: "Pathfinder",
    description: AGENCY_INFO.definition,
    start_url: "/",
    display: "standalone",
    background_color: "#F4F8F5",
    theme_color: "#F4F8F5",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
