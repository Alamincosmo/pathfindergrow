import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import Footer from "@/components/Footer";
import { CtaButton } from "@/components/TrackedLink";
import { AGENCY_INFO, TEAM_MEMBERS } from "@/data/growthStudioData";
import { buildProfileJsonLd, toJsonLdString } from "@/lib/jsonld";

/*
 * Founder profile pages. Built for answer engines: the H1 names the person, the first
 * paragraph answers "Who is X?" in under 60 words, then every claim is a concrete fact
 * (company, role, dates, numbers) that a crawler can match against LinkedIn and Fiverr.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return TEAM_MEMBERS.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const m = TEAM_MEMBERS.find((t) => t.slug === slug);
  if (!m) return {};
  const title = `${m.name}, ${m.jobTitle} at Pathfinder Grow`;
  const description = m.summary.length > 158 ? `${m.summary.slice(0, 155).trimEnd()}…` : m.summary;
  return {
    title: { absolute: `${title}` },
    description,
    alternates: { canonical: `/team/${m.slug}` },
    openGraph: {
      type: "profile",
      title,
      description,
      url: `/team/${m.slug}`,
      siteName: AGENCY_INFO.name,
      images: [{ url: m.image, alt: `${m.name}, ${m.jobTitle} at Pathfinder Grow` }],
    },
    twitter: { card: "summary", title, description },
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const m = TEAM_MEMBERS.find((t) => t.slug === slug);
  if (!m) notFound();
  const partner = TEAM_MEMBERS.find((t) => t.slug !== m.slug);

  return (
    <>
      <header className="container-x flex items-center justify-between py-6">
        <BrandLogo href="/" />
        <a href="/#founders" className="link-underline font-medium">
          All founders
        </a>
      </header>

      <main>
        <article className="container-x grid gap-12 pb-20 pt-8 lg:grid-cols-12 lg:pb-28 lg:pt-14">
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[1.75rem] bg-paper-2">
              <Image
                src={m.image}
                alt={`${m.name}, ${m.jobTitle} at Pathfinder Grow`}
                fill
                priority
                sizes="(min-width: 1024px) 360px, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:col-span-8">
            <nav aria-label="Breadcrumb" className="t-label text-muted">
              <a href="/" className="link-underline">
                Pathfinder Grow
              </a>{" "}
              / {m.name}
            </nav>
            <h1 className="t-display-l mt-4">{m.name}</h1>
            <p className="t-label mt-3 text-emerald-ink">{m.role}</p>

            <h2 className="mt-10 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Who is {m.name}?</h2>
            <p className="t-lead mt-3 max-w-2xl">{m.summary}</p>

            <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Key achievements</h2>
            <ul className="mt-4 max-w-2xl space-y-3">
              {m.facts.map((f) => (
                <li key={f} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2.5} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Experience</h2>
            <ol className="mt-4 max-w-2xl border-l border-[var(--line)]">
              {m.experience.map((e) => (
                <li key={`${e.org}-${e.title}`} className="relative pb-7 pl-6 last:pb-0">
                  <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-emerald-ink" aria-hidden="true" />
                  <h3 className="font-display text-[1.125rem] font-bold leading-snug">
                    {e.title} · {e.org}
                  </h3>
                  <p className="t-label mt-1 text-muted">{e.period}</p>
                  <p className="mt-2 text-muted">{e.summary}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Skills and tools</h2>
            <ul className="mt-4 flex max-w-2xl flex-wrap gap-2">
              {m.knowsAbout.map((k) => (
                <li key={k} className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[0.8125rem]">
                  {k}
                </li>
              ))}
            </ul>

            {m.sameAs.length > 0 && (
              <>
                <h2 className="mt-12 font-display text-[1.5rem] font-bold tracking-[-0.02em]">Find {m.name} online</h2>
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {m.sameAs.map((u) => (
                    <li key={u}>
                      <a href={u} rel="me noopener" target="_blank" className="link-underline font-medium">
                        {new URL(u).hostname.replace(/^www\./, "")}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
              <CtaButton location={`profile-${m.slug}`}>Talk to {m.name}</CtaButton>
              {partner && (
                <a href={`/team/${partner.slug}`} className="link-underline font-medium">
                  Meet {partner.name}, {partner.jobTitle}
                </a>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer base="/" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdString(buildProfileJsonLd(m)) }}
      />
    </>
  );
}
