import { ArrowDown, ArrowUpRight } from "lucide-react";
import { CtaButton, TrackedLink } from "@/components/TrackedLink";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import HubGraphic from "@/components/HubGraphic";
import SplitLine from "@/components/SplitLine";
import { PROOF_ITEMS } from "@/data/growthStudioData";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  const live = PROOF_ITEMS.filter((p) => p.href);

  return (
    <section
      id="hero"
      className="on-dark relative isolate overflow-hidden bg-stage pb-20 pt-28 text-paper md:pb-28 md:pt-36"
    >
      <ParallaxLayer speed={0.06} className="absolute -inset-y-[10%] inset-x-0 -z-10">
        <div className="tech-grid absolute inset-0" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.14} className="absolute -inset-y-[12%] inset-x-0 -z-10">
        <div className="aurora -left-[10%] top-[6%] size-[60vw] max-w-[760px] bg-[radial-gradient(closest-side,rgba(53,224,161,0.3),transparent)]" />
        <div
          className="aurora right-[-8%] top-[32%] size-[50vw] max-w-[640px] bg-[radial-gradient(closest-side,rgba(75,179,240,0.24),transparent)]"
          style={{ animationDelay: "-6s" }}
        />
      </ParallaxLayer>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p
            className="fade-up inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 t-label text-muted-dark"
            style={d(0)}
          >
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-70" />
              <span className="relative size-2 rounded-full bg-mint" />
            </span>
            PathFinder Grow · Business growth company
          </p>

          <h1 className="t-display-xl mt-7" aria-label="Get found. Get chosen. Grow.">
            <SplitLine text="Get found." base={0} />
            <SplitLine text="Get chosen." base={260} />
            <SplitLine text="Grow." base={540} className="grad-text" />
          </h1>

          <p className="t-lead fade-up mt-8 max-w-xl text-muted-dark" style={d(200)}>
            We build platforms used by more than 3 million people, and we grow businesses in every
            direction: planning, websites and apps, ads, branding, SEO and AI search.
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-x-7 gap-y-4" style={d(300)}>
            <CtaButton variant="lime" location="hero">
              Get your free growth audit
            </CtaButton>
            <a href="#work" className="link-underline inline-flex items-center gap-2 font-medium text-paper">
              See live work
              <ArrowDown className="size-4" strokeWidth={1.75} />
            </a>
          </div>

          <p className="fade-up mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9375rem]" style={d(400)}>
            <span className="t-label text-muted-dark">Live work</span>
            {live.map((p) => (
              <TrackedLink
                key={p.client}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                event="live_project_click"
                eventProps={{ project: p.client, location: "hero" }}
                className="link-underline inline-flex items-center gap-1 font-medium text-mint"
              >
                {p.client}
                <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
              </TrackedLink>
            ))}
          </p>
        </div>

        <div className="fade-up lg:col-span-5" style={d(350)}>
          <ParallaxLayer speed={0.05}>
            <HubGraphic className="mx-auto max-w-[360px] lg:max-w-[520px]" />
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}
