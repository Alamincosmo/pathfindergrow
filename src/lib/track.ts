import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

export function track(name: string, props?: Props) {
  try {
    vercelTrack(name, props);
  } catch {
    /* analytics must never break the page */
  }
}
