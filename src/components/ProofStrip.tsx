import { ArrowUpRight } from "lucide-react";
import { PROOF_ITEMS } from "@/data/growthStudioData";
import { TrackedLink } from "@/components/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";

export default function ProofStrip() {
  return (
    <section aria-label="Proof" className="on-dark border-y border-white/10 bg-night-2 text-paper">
      <div className="container-x py-10 md:py-14">
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {PROOF_ITEMS.map((p, i) => (
            <li key={p.client} className="min-w-[80%] snap-start md:min-w-0">
              <Reveal delay={i * 90} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-night-3 p-6">
                  <p className="t-label text-mint">{p.client}</p>
                  <p className="mt-3 font-display text-[1.5rem] font-bold leading-[1.15] tracking-[-0.025em]">
                    {p.fact}
                  </p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] text-muted-dark">
                    <span>Our role: {p.role}</span>
                    {p.href && (
                      <TrackedLink
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        event="live_project_click"
                        eventProps={{ project: p.client, location: "proof" }}
                        className="link-underline inline-flex items-center gap-1 font-medium text-mint"
                      >
                        Visit
                        <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                      </TrackedLink>
                    )}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
