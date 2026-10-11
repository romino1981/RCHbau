import { Link } from "@tanstack/react-router";
import { company } from "@/lib/content";

export function ContactForm() {
  return (
    <section id="kontakt" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:gap-8 sm:py-16 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-deep">Telefón</p>
          <h2 className="mt-2 text-3xl sm:text-4xl">Najskôr zavolajte.</h2>
          <p className="mt-4 text-muted">
            Na telefóne povieme, či sa do toho pustíme a kedy vieme prísť. Ak chcete presnejšiu ponuku,
            pošlite dopyt s mestom, rozmerom a stavom priestoru.
          </p>
          <a
            href={company.phoneHref}
            className="mt-6 inline-flex rounded-full bg-gold px-5 py-3 text-lg font-bold text-ink"
          >
            Zavolať {company.phoneDisplay}
          </a>
          <dl className="mt-8 grid gap-4">
            <div>
              <dt className="text-sm text-muted">Telefón</dt>
              <dd>
                <a className="text-lg font-semibold" href={company.phoneHref}>
                  {company.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">E-mail</dt>
              <dd>
                <a className="text-lg font-semibold" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Odkiaľ</dt>
              <dd className="text-lg font-semibold">Zlaté Moravce</dd>
            </div>
          </dl>
        </div>
        <form
          className="grid gap-3 rounded-card border border-line bg-card p-5 shadow-sm"
          action="https://api.web3forms.com/submit"
          method="POST"
        >
          <h2 className="text-xl">Presnejší dopyt</h2>
          <p className="text-sm text-muted">Keď nestačí telefonát, napíšte rozsah. Ozveme sa s ponukou.</p>
          <input type="hidden" name="access_key" value={company.formKey} />
          <input type="hidden" name="subject" value="Nový dopyt z webu RCHbau" />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required autoComplete="name" placeholder="Meno alebo firma" className="field" />
            <input name="phone" required type="tel" autoComplete="tel" placeholder="Telefón" className="field" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="email" required type="email" autoComplete="email" placeholder="E-mail" className="field" />
            <select name="service" required defaultValue="" className="field">
              <option value="" disabled>
                Služba
              </option>
              <option>Sadrokartónové práce</option>
              <option>Kazetové a panelové stropy</option>
              <option>Akustické panely</option>
              <option>Tmelenie, brúsenie a maľovanie</option>
              <option>Iné</option>
            </select>
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Mesto, rozsah, rozmery, termín a stav priestoru…"
            className="field"
          />
          <button type="submit" className="rounded-full bg-ink px-5 py-3 font-bold text-paper">
            Odoslať dopyt
          </button>
          <p className="text-xs text-muted">
            Odoslaním sa údaje spracujú len kvôli odpovedi na dopyt.{" "}
            <Link to="/ochrana-udajov" className="font-semibold text-gold-deep">
              Ako údaje spracúvam
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
