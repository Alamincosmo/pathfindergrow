import BrandLogo from "@/components/BrandLogo";
import { AGENCY_INFO, PILLARS, PROOF_ITEMS } from "@/data/growthStudioData";

export default function Footer() {
  const live = PROOF_ITEMS.filter((p) => p.href);
  return (
    <footer className="on-dark border-t border-white/10 bg-stage text-paper">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo tone="dark" showTagline />
            <p className="mt-5 max-w-sm text-muted-dark">Founder-led digital growth studio.</p>
          </div>

          <nav aria-label="Footer services" className="md:col-span-2">
            <p className="t-label text-muted-dark">Services</p>
            <ul className="mt-4 space-y-2">
              {PILLARS.map((p) => (
                <li key={p.id}>
                  <a href="#growth" className="link-underline">
                    {p.stage}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer work" className="md:col-span-2">
            <p className="t-label text-muted-dark">Live work</p>
            <ul className="mt-4 space-y-2">
              {live.map((p) => (
                <li key={p.client}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-underline">
                    {p.client}
                  </a>
                </li>
              ))}
              <li>
                <a href="#work" className="link-underline">
                  All projects
                </a>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="t-label text-muted-dark">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={AGENCY_INFO.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="link-underline">
                  WhatsApp {AGENCY_INFO.contact.whatsapp}
                </a>
              </li>
              <li>
                <a href={AGENCY_INFO.contact.emailLink} className="link-underline">
                  {AGENCY_INFO.contact.email}
                </a>
              </li>
              <li className="text-muted-dark">{AGENCY_INFO.contact.location}</li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-[0.9375rem] text-muted-dark">
          © {new Date().getFullYear()} Pathfinder Grow
        </p>
      </div>
    </footer>
  );
}
