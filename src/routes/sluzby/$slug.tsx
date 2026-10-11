import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { ZoomPhoto } from "@/components/zoom-photo";
import { services } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sluzby/$slug")({
  head: ({ params }) => {
    const service = services.find((item) => item.slug === params.slug);
    return pageHead(
      service ? `${service.title} | RCHbau` : "Služba | RCHbau",
      service?.lead ?? "Služby RCHbau zo Zlatých Moraviec.",
      service ? `/sluzby/${service.slug}` : "/sluzby/sadrokarton",
    );
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <SiteShell>
        <PageIntro kicker="Služba" title="Táto služba tu nie je." lead="Vyberte inú službu z úvodu." />
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <PageIntro kicker="Služba" title={service.title} lead={service.lead} />
      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:py-14 lg:grid-cols-2">
        <ZoomPhoto
          src={service.image}
          alt={service.alt}
          className="aspect-[4/3] w-full rounded-2xl object-cover sm:rounded-card"
        />
        <div>
          <ul className="grid gap-3">
            {service.points.map((point) => (
              <li key={point} className="rounded-2xl border border-line bg-card px-4 py-3 font-semibold">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/kontakt" className="rounded-full bg-ink px-5 py-3 font-bold text-paper">
              Chcem ponuku
            </Link>
            <Link to="/portfolio" className="rounded-full border border-line bg-card px-5 py-3 font-bold">
              Pozrieť práce
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
