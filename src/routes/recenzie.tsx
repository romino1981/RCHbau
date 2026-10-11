import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { GOOGLE_PROFILE, company } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/recenzie")({
  head: () =>
    pageHead(
      "Recenzie | RCHbau",
      "Recenzie RCHbau sú na Google profile. Odtiaľ sa dajú pozrieť hodnotenia aj napísať nová recenzia.",
      "/recenzie",
    ),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="Google"
        title="Recenzie píšete priamo na Google."
        lead="Web je prepojený s firemným profilom RCHbau. Odtiaľ sa dostanete k existujúcim hodnoteniam aj k formuláru na novú recenziu."
      />
      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:gap-6 sm:py-14 lg:grid-cols-2">
        <article className="rounded-card border border-line bg-card p-6">
          <h2 className="text-2xl">Napísať recenziu</h2>
          <p className="mt-3 text-muted">
            Otvorí sa Google profil {company.name}. V profile zvoľte napísanie recenzie. Hodnotenie sa
            zobrazí na Google a pomôže ďalším firmám aj domácnostiam.
          </p>
          <a
            href={GOOGLE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-gold px-5 py-3 font-bold text-ink"
          >
            Napísať recenziu na Google
          </a>
        </article>
        <article className="rounded-card border border-line bg-card p-6">
          <h2 className="text-2xl">Pozrieť profil</h2>
          <p className="mt-3 text-muted">
            Na profile sú fotky, služby a už pridané recenzie. Neukladáme ich kópiu na web, aby ostali
            aktuálne tam, kde ich ľudia hľadajú.
          </p>
          <a
            href={GOOGLE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 font-bold text-paper"
          >
            Otvoriť Google profil
          </a>
        </article>
      </section>
    </SiteShell>
  );
}
