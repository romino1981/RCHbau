import { createFileRoute, Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { ZoomGallery } from "@/components/zoom-photo";
import { GOOGLE_PROFILE, company, faqs, gallery, services } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageHead(
      "RCHbau | Sadrokartón, stropy a akustika",
      "Sadrokartónové práce, kazetové a akustické stropy, tmelenie a maľovanie pre firmy aj domácnosti. Firma zo Zlatých Moraviec.",
      "/",
    ),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          name: "RCHbau",
          founder: "Roman Chamaj",
          url: "https://rchbau.sk/",
          telephone: "+421949183499",
          email: "info@rchbau.sk",
          image: "https://rchbau.sk/media/logo.png",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Hosťovce 97",
            postalCode: "951 91",
            addressLocality: "Zlaté Moravce",
            addressCountry: "SK",
          },
          areaServed: ["Zlaté Moravce", "Nitra", "Levice", "Vráble", "Slovakia"],
          sameAs: [GOOGLE_PROFILE, company.drive, company.website],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell>
      <section className="hero-wash">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:gap-10 sm:py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold sm:text-sm">
              Firmy aj domácnosti · Zlaté Moravce a okolie
            </p>
            <h1 className="mt-2 text-3xl leading-tight sm:mt-3 sm:text-5xl lg:text-6xl">
              Sadrokartón, stropy a akustika.
            </h1>
            <p className="mt-3 max-w-xl text-base text-paper/80 sm:mt-5 sm:text-lg">
              Sadrokartón, kazetové a akustické stropy, tmelenie a maľovanie. Pracujeme čisto, podľa
              reálneho stavu priestoru a s individuálnou cenou.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
              <Link to="/kontakt" className="rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-ink sm:px-5 sm:py-3 sm:text-base">
                Chcem ponuku
              </Link>
              <Link to="/portfolio" className="rounded-full border border-paper/30 px-4 py-2.5 text-sm font-bold sm:px-5 sm:py-3 sm:text-base">
                Pozrieť práce
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-4">
              {[
                ["Firmy aj byty", "kancelárie, prevádzky, domy"],
                ["Zlaté Moravce", "firma z Moraviec a okolia"],
                ["Cena", "podľa rozsahu a termínu"],
              ].map(([title, text]) => (
                <div key={title} className="border-t border-paper/20 pt-2">
                  <p className="text-sm font-semibold leading-tight">{title}</p>
                  <p className="mt-1 text-xs text-paper/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <ZoomGallery
            photos={gallery.slice(0, 4)}
            className="grid grid-cols-2 gap-2 sm:gap-3"
            imgClassName="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-card"
          />
        </div>
      </section>

      <section id="sluzby" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">Služby</p>
            <h2 className="mt-1 text-2xl sm:mt-2 sm:text-4xl">Čo vieme spraviť</h2>
          </div>
          <p className="max-w-md text-sm text-muted sm:text-base">
            Vyberte službu. Pri ponuke rozhoduje stav podkladu, rozmery, materiál a termín.
          </p>
        </div>
        <div className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              to="/sluzby/$slug"
              params={{ slug: service.slug }}
              className="group overflow-hidden rounded-2xl border border-line bg-card sm:rounded-card"
            >
              <img src={service.image} alt={service.alt} className="aspect-[16/10] w-full object-cover" />
              <div className="p-4 sm:p-5">
                <h3 className="text-xl sm:text-2xl">{service.title}</h3>
                <p className="mt-1 text-sm text-muted sm:mt-2">{service.short}</p>
                <p className="mt-3 text-sm font-bold text-gold-deep">Detail služby</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="hero-wash">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 py-8 sm:gap-8 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="flex items-center gap-1 text-gold">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <h2 className="mt-3 text-2xl sm:text-4xl">Recenzie sú na Google profile.</h2>
            <p className="mt-4 max-w-xl text-paper/80">
              Hodnotenia nechávame na Google, aby ich videli aj ľudia, ktorí web ešte nepoznajú. Po
              dokončenej práci môžete pridať vlastnú recenziu jedným klikom.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={GOOGLE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gold px-5 py-3 font-bold text-ink"
              >
                Napísať recenziu
              </a>
              <Link to="/recenzie" className="rounded-full border border-paper/30 px-5 py-3 font-bold">
                Ako to funguje
              </Link>
            </div>
          </div>
          <a
            href={GOOGLE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-card border border-paper/15 bg-ink-soft p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">Google Business Profile</p>
            <p className="mt-3 font-display text-3xl font-extrabold tracking-tight">RCHbau</p>
            <p className="mt-2 text-paper/75">Zlaté Moravce</p>
            <p className="mt-6 text-sm font-bold">Otvoriť profil a recenzie</p>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:py-16">
        <h2 className="text-3xl">Časté otázky</h2>
        <div className="mt-6 divide-y divide-line rounded-card border border-line bg-card">
          {faqs.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="cursor-pointer list-none font-semibold">{item.q}</summary>
              <p className="mt-2 text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
