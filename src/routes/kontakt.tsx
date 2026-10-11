import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/kontakt")({
  head: () =>
    pageHead(
      "Kontakt | RCHbau",
      "Kontakt na RCHbau zo Zlatých Moraviec. Najrýchlejšie telefonicky, presnejší dopyt cez formulár.",
      "/kontakt",
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="Kontakt"
        title="Dohodneme sa po telefóne."
        lead="Najrýchlejšia je dohoda po telefóne. Dopyt posielajte, keď chcete presnejšiu cenovú ponuku."
      />
      <ContactForm />
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-2xl">Zlaté Moravce</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">Pôsobíme v Zlatých Moravciach a okolí.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <iframe
            title="Mapa Zlatých Moraviec"
            src="https://maps.google.com/maps?q=Zlat%C3%A9%20Moravce&ll=48.381,18.397&z=14&hl=sk&output=embed"
            className="h-72 w-full border-0 sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href="https://maps.google.com/?q=Zlat%C3%A9+Moravce&ll=48.381,18.397&z=14"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex text-sm font-bold text-gold-deep"
        >
          Otvoriť Zlaté Moravce v mapách
        </a>
      </section>
    </SiteShell>
  );
}
