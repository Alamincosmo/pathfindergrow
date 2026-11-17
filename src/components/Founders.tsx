"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { TEAM_MEMBERS, type TeamMember } from "@/data/growthStudioData";
import { CtaButton } from "@/components/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { KineticIntro } from "@/components/motion/KineticIntro";
import { MaskedText } from "@/components/motion/MaskedText";
import { useScrub } from "@/components/motion/useScrub";
import { ease, lerp, seg } from "@/lib/anim";

/* Each portrait swings in from depth as you scroll: tilted back and turned to the side,
   it settles flat in the middle of the screen, then leans away again as it leaves. */
function FounderRow({ m, flip }: { m: TeamMember; flip: boolean }) {
  const photo = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const tag = useRef<HTMLDivElement>(null);
  const side = flip ? -1 : 1;

  const apply = useCallback(
    (p: number) => {
      const k = ease(seg(p, 0, 0.5));
      const out = ease(seg(p, 0.72, 1));
      if (photo.current) {
        photo.current.style.transform = `translate3d(0, ${lerp(70, 0, k) - out * 36}px, ${lerp(-260, 0, k)}px) rotateY(${
          side * (lerp(30, 0, k) - out * 9)
        }deg) rotateX(${lerp(16, 0, k) + out * 6}deg) scale(${lerp(0.84, 1, k)})`;
        photo.current.style.opacity = String(seg(p, 0, 0.18) * (1 - out * 0.5));
      }
      if (glow.current) glow.current.style.transform = `translate3d(${side * (p - 0.5) * -70}px, ${(p - 0.5) * 60}px, 0)`;
      if (tag.current) {
        const t = ease(seg(p, 0.35, 0.6));
        tag.current.style.opacity = String(t);
        tag.current.style.transform = `translate3d(${(1 - t) * side * 30}px, 0, 0)`;
      }
    },
    [side]
  );
  const ref = useScrub<HTMLElement>(apply, "top 88%", "bottom 30%");

  return (
    <article ref={ref} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={`relative lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
        <div
          ref={glow}
          aria-hidden="true"
          className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(35,171,130,0.28),transparent)]"
        />
        <div className="relative [perspective:1200px]">
          <div
            ref={photo}
            className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[1.75rem] bg-paper-2 shadow-[0_50px_80px_-34px_rgba(11,74,56,0.55)] will-change-transform lg:mx-0"
            style={{ transformStyle: "preserve-3d", opacity: 0, marginInline: flip ? "auto 0" : "0 auto" }}
          >
            <Image
              src={m.image}
              alt={`${m.name}, co-founder of PathFinder Grow`}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07110E]/55 to-transparent" />
          </div>
          <div
            ref={tag}
            className={`absolute bottom-5 ${flip ? "right-4 sm:right-6" : "left-4 sm:left-6"} rounded-full bg-card/95 px-4 py-2 font-display text-[1.0625rem] font-bold tracking-[-0.02em] shadow-[0_12px_30px_-12px_rgba(7,17,14,0.5)]`}
            style={{ opacity: 0 }}
          >
            {m.name}
          </div>
        </div>
      </div>

      <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <p className="t-label text-emerald-ink">{m.role}</p>
        <MaskedText
          text={m.name}
          className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-extrabold leading-none tracking-[-0.045em]"
        />
        <Reveal delay={120}>
          <p className="mt-5 max-w-xl text-[1.0625rem] text-muted">{m.bio}</p>
          <ul className="mt-6 max-w-xl space-y-3">
            {m.facts.map((f) => (
              <li key={f} className="flex gap-3">
                <Check className="mt-1 size-4 shrink-0 text-emerald-ink" strokeWidth={2.5} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <a
            href={`/team/${m.slug}`}
            className="link-underline mt-6 inline-flex font-medium text-emerald-ink"
          >
            Full profile and experience of {m.name}
          </a>
        </Reveal>
      </div>
    </article>
  );
}

export default function Founders() {
  return (
    <section id="founders" className="bg-paper">
      <KineticIntro
        eyebrow="Who you work with"
        title="Two founders. *No hand-offs.*"
        story="The people you talk to are the people building your project. You get direct access to both founders, from the first call to launch day, with nobody passing your brief along."
        chips={["Direct access to both founders", "The people who talk are the people who build"]}
        variant="camera"
      />

      <div className="container-x pb-20 pt-6 lg:pb-32">
        <div className="space-y-24 lg:space-y-36">
          {TEAM_MEMBERS.map((m, i) => (
            <FounderRow key={m.name} m={m} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-16 lg:mt-24">
          <CtaButton location="founders">Talk to the founders</CtaButton>
        </div>
      </div>
    </section>
  );
}
