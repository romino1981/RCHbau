import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { ZoomGallery } from "@/components/zoom-photo";
import { gallery, company } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  head: () =>
    pageHead(
      "Portfólio | RCHbau",
      "Fotky realizácií RCHbau a odkaz na väčšie portfólio na Google Disku. Sadrokartón, kazetové stropy a akustika.",
      "/portfolio",
    ),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="Portfólio"
        title="Realizácie, nie rendery."
        lead="Fotky z prác: sadrokartón, kazetové stropy, akustické panely a príprava na osvetlenie."
      />
      <div className="mx-auto flex max-w-6xl justify-end px-4 pt-6">
        <a
          href={company.drive}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gold px-4 py-2.5 text-sm font-bold text-ink"
        >
          Portfólio na Google Disku
        </a>
      </div>
      <ZoomGallery
        photos={gallery}
        showCaption
        className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 py-8 sm:gap-4 sm:py-14 lg:grid-cols-3"
        itemClassName="overflow-hidden rounded-2xl border border-line bg-card sm:rounded-card"
        imgClassName="aspect-[4/3] w-full object-cover"
      />
    </SiteShell>
  );
}
