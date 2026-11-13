import Image from "next/image";
import { Check } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/growthStudioData";
import { CtaButton } from "@/components/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/Eyebrow";

export default function Founders() {
  return (
    <section id="founders" className="section-y bg-paper">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow className="text-emerald-ink">Who you work with</Eyebrow>
          <h2 className="t-display-l mt-4">
            Two founders. <strong>No hand-offs.</strong>
          </h2>
          <p className="t-lead mt-6 max-w-2xl text-muted">
            The people you talk to are the people building your project.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
          {TEAM_MEMBERS.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <article>
                <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line-strong bg-paper-2 sm:aspect-[16/10]">
                  <Image
                    src={m.image}
                    alt={`${m.name}, co-founder of Pathfinder Grow`}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none tracking-[-0.03em]">
                  {m.name}
                </h3>
                <p className="t-label mt-3 text-emerald-ink">{m.role}</p>
                <p className="mt-4 text-muted">{m.bio}</p>
                <ul className="mt-5 space-y-3">
                  {m.facts.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <CtaButton location="founders">Talk to the founders</CtaButton>
        </div>
      </div>
    </section>
  );
}
