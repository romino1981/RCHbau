import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { GOOGLE_PROFILE, company } from "@/lib/content";
import { pageHead } from "@/lib/seo";

const rows: [string, string, "text" | "phone" | "email" | "web"][] = [
  ["Obchodné označenie", company.name, "text"],
  ["Prevádzkovateľ", company.operator, "text"],
  ["Právna forma", company.legalForm, "text"],
  ["IČO", company.ico, "text"],
  ["Živnostenský register", company.tradeRegister, "text"],
  ["Predmet podnikania", company.trade, "text"],
  ["Sídlo", `${company.street}, ${company.postal} ${company.city}`, "text"],
  ["Telefón", company.phoneDisplay, "phone"],
  ["E-mail", company.email, "email"],
  ["Web", company.website, "web"],
  ["Pôsobenie", company.area, "text"],
];

export const Route = createFileRoute("/informacie")({
  head: () =>
    pageHead(
      "Údaje firmy | RCHbau",
      "Identifikačné údaje RCHbau. Prevádzkovateľ Roman Chamaj, IČO 44356846, adresa podľa registra Hosťovce 97.",
      "/informacie",
    ),
  component: InfoPage,
});

function InfoPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="Údaje"
        title="Údaje firmy."
        lead="Roman Chamaj, živnostník. Sídlo Hosťovce 97, IČO 44356846."
      />
      <section className="mx-auto max-w-3xl px-4 py-8 sm:py-14">
        <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-card">
          {rows.map(([label, value, kind]) => (
            <div key={label} className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-4">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="font-semibold">
                {kind === "phone" ? (
                  <a href={company.phoneHref}>{value}</a>
                ) : kind === "email" ? (
                  <a href={`mailto:${value}`}>{value}</a>
                ) : kind === "web" ? (
                  <a href={company.website}>{value}</a>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">
          <a href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-deep">
            Otvoriť profil RCHbau
          </a>
        </p>
      </section>
    </SiteShell>
  );
}
