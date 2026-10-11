import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro, SiteShell } from "@/components/site-shell";
import { company } from "@/lib/content";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/ochrana-udajov")({
  head: () =>
    pageHead(
      "Ochrana osobných údajov | RCHbau",
      "Ako RCHbau spracúva osobné údaje z kontaktného formulára a komunikácie. Prevádzkovateľ Roman Chamaj.",
      "/ochrana-udajov",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteShell>
      <PageIntro
        kicker="Ochrana údajov"
        title="Ako spracúvam osobné údaje."
        lead="Údaje z formulára a komunikácie slúžia len na odpoveď a dohodu o práci."
      />
      <section className="mx-auto grid max-w-3xl gap-6 px-4 py-8 text-sm leading-relaxed sm:py-14">
        <p>
          Prevádzkovateľ: {company.operator}, {company.legalForm.toLowerCase()}, IČO {company.ico}. Miesto
          podnikania {company.street}, {company.postal} {company.city}. Kontakt {company.email},{" "}
          {company.phoneDisplay}. Obchodné označenie {company.name}.
        </p>
        <p>
          Z formulára beriem meno, telefón, e-mail, zvolenú službu a text dopytu. Pri telefonáte alebo
          e-maile spracúvam to, čo mi sami pošlete, vrátane fotiek priestoru.
        </p>
        <p>
          Údaje používam na odpoveď, cenovú ponuku a realizáciu dohodnutej práce. Právny základ je
          vybavenie vašej žiadosti pred uzavretím zmluvy a následne plnenie zmluvy. Údaje nepredávam a
          nepoužívam ich na reklamu iných firiem.
        </p>
        <p>
          Formulár odosiela služba Web3Forms, ktorá dopyt doručí na {company.email}. Údaje držím len tak
          dlho, ako treba na vybavenie dopytu, účtovníctvo alebo preukázanie dohody.
        </p>
        <p>
          Máte právo na prístup, opravu, obmedzenie, námietku a vymazanie, ak na ďalšie spracúvanie nie je
          zákonný dôvod. Napíšte na {company.email}. Sťažnosť môžete podať aj Úradu na ochranu osobných
          údajov SR.
        </p>
        <p>
          <Link to="/kontakt" className="font-semibold text-gold-deep">
            Kontakt
          </Link>
        </p>
      </section>
    </SiteShell>
  );
}
