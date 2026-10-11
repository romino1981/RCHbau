import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { GOOGLE_PROFILE, company, services } from "@/lib/content";

const links = [
  { to: "/#sluzby", label: "Služby", hash: true },
  { to: "/portfolio", label: "Portfólio" },
  { to: "/recenzie", label: "Recenzie" },
  { to: "/o-nas", label: "O nás" },
  { to: "/informacie", label: "Údaje" },
  { to: "/kontakt", label: "Kontakt" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen text-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-paper">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2.5">
          <Link to="/" className="flex items-center gap-2.5 pl-1" onClick={() => setOpen(false)}>
            <img
              src="/media/logo.png"
              alt=""
              className="h-10 w-10 rounded-full bg-ink object-contain ring-2 ring-gold"
            />
            <span className="font-display text-xl font-extrabold leading-none tracking-tight">
              RCH<span className="text-gold">bau</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Hlavná navigácia">
            {links.map((item) =>
              "hash" in item ? (
                <a
                  key={item.label}
                  href={item.to}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-paper/85 hover:bg-white/10 hover:text-paper"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="rounded-full px-3 py-2 text-sm font-semibold text-paper/85 hover:bg-white/10 hover:text-paper"
                  activeProps={{ className: "bg-gold text-ink hover:bg-gold hover:text-ink" }}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <a
            href={GOOGLE_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gold px-4 py-2 text-sm font-bold text-ink lg:inline-flex"
          >
            Napísať recenziu
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Zavrieť menu" : "Otvoriť menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          {open ? (
            <nav
              className="absolute top-[calc(100%+8px)] right-0 z-50 w-56 rounded-3xl border border-white/10 bg-ink p-2 shadow-lg lg:hidden"
              aria-label="Mobilná navigácia"
            >
              {links.map((item) =>
                "hash" in item ? (
                  <a
                    key={item.label}
                    href={item.to}
                    className="block rounded-2xl px-3 py-3 text-sm font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block rounded-2xl px-3 py-3 text-sm font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <a
                href={GOOGLE_PROFILE}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block rounded-2xl bg-gold px-3 py-3 text-center text-sm font-bold text-ink"
              >
                Napísať recenziu
              </a>
            </nav>
          ) : null}
        </div>
      </header>
      {children}
      <footer className="mt-4 border-t border-white/10 bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight">
              RCH<span className="text-gold">bau</span>
            </p>
            <p className="mt-2 text-sm text-paper/80">{company.operator}</p>
            <p className="text-sm text-paper/70">Firma zo Zlatých Moraviec</p>
            <p className="mt-3 text-sm">
              <a href={company.phoneHref}>{company.phoneDisplay}</a>
            </p>
            <p className="text-sm">
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Stránky</p>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><Link to="/">Úvod</Link></li>
              <li><Link to="/portfolio">Portfólio</Link></li>
              <li><Link to="/recenzie">Recenzie</Link></li>
              <li><Link to="/o-nas">O nás</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
              <li><Link to="/informacie">Údaje firmy</Link></li>
              <li><Link to="/ochrana-udajov">Ochrana osobných údajov</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gold">Služby</p>
            <ul className="mt-3 grid gap-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to="/sluzby/$slug" params={{ slug: service.slug }}>
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <a href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer">
                  Google profil
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({
  kicker,
  title,
  lead,
}: {
  kicker: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="hero-wash">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-wide text-gold sm:text-sm">{kicker}</p>
        <h1 className="mt-2 max-w-3xl text-3xl leading-tight sm:mt-3 sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base text-paper/80 sm:mt-4 sm:text-lg">{lead}</p>
      </div>
    </section>
  );
}
