import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { ZoomPhoto } from "@/components/zoom-photo";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/o-nas")({
  head: () =>
    pageHead(
      "O nás | RCHbau",
      "RCHbau je remeselná firma zo Zlatých Moraviec. Sadrokartón, stropy a akustika pre firmy aj domácnosti.",
      "/o-nas",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="O nás"
        title="Jedna partia na konštrukciu aj dokončenie."
        lead="RCHbau je remeselná firma zo Zlatých Moraviec. Sadrokartón, kazetové stropy, akustika a maľovanie riešime ako jeden celok, nie ako tri rozbité zákazky."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:py-14 lg:grid-cols-2">
        <ZoomPhoto
          src="/media/praca-sadrokarton-malovanie.jpg"
          alt="Realizácia sadrokartónu RCHbau"
          className="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-card"
        />
        <div className="grid gap-4">
          <article className="rounded-card border border-line bg-card p-5">
            <h2 className="text-2xl">Pre firmy</h2>
            <p className="mt-2 text-muted">
              Kancelárie, prevádzky a technické priestory. Kazetové stropy, akustika a podhľady s prípravou
              na svetlá.
            </p>
          </article>
          <article className="rounded-card border border-line bg-card p-5">
            <h2 className="text-2xl">Pre domácnosti</h2>
            <p className="mt-2 text-muted">
              Byty a rodinné domy. Priečky, znížené stropy, tmelenie a maľovanie po rekonštrukcii.
            </p>
          </article>
          <p className="text-sm text-muted">
            Firma zo Zlatých Moraviec.{" "}
            <Link to="/informacie" className="font-semibold text-gold-deep">
              Údaje firmy
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
