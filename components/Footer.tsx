"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Mail, Phone, Download, ArrowUpRight } from "lucide-react";

const PORT_LINKS = [
  { port: "Casablanca DTCR", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20_DTCR%20_%20Port%20de%20Casablanca_0.pdf" },
  { port: "Casablanca DTP", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20_DTP%20_%20Port%20de%20Casablanca__0.pdf" },
  { port: "Casablanca TC3", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202024%20par%20Prestation%20_TC3%20_%20Port%20de%20Casablanca.pdf" },
  { port: "Jorf Lasfar", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20au%20Port%20de%20Jorf%20Lasfar_0.pdf" },
  { port: "Safi", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20au%20Port%20%20de%20Safi_0.pdf" },
  { port: "Agadir", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Public%202025%20par%20Prestation%20au%20port%20d%27Agadir_0.pdf" },
  { port: "Agadir SMA", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20au%20Terminal%20Quai%20Nord%20d%27Agadir%20_%20SMA_.pdf" },
  { port: "Mohammedia", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20au%20Port%20de%20Mohammedia_0.pdf" },
  { port: "Laâyoune", href: "https://www.marsamaroc.co.ma/sites/default/files/2025-01/Tarifs%20Publics%202025%20par%20Prestation%20au%20Port%20de%20La%C3%A2youne_0.pdf" },
];

export function Footer() {
  return (
    <>
      {/* Final CTA */}
      <section id="aide" className="relative py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative isolate overflow-hidden rounded-[2rem] border border-navy-900/10 bg-gradient-to-br from-navy-900 via-navy-800 to-brand-900 p-10 shadow-float md:p-16"
          >
            <div className="absolute -left-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
            <div className="absolute -right-20 -bottom-32 h-80 w-80 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />

            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                  Assistance commerciale
                </div>
                <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white md:text-5xl text-balance">
                  Besoin d'un devis contractuel ?
                  <br />
                  <span className="italic text-ivory-200">Parlons escale.</span>
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                  L'équipe commerciale Marsa Maroc construit votre offre sur mesure,
                  volumes, délais d'entreposage et prestations spéciales incluses.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="mailto:commercial@marsamaroc.co.ma"
                    className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-500 px-6 py-3.5 text-sm font-medium text-white shadow-glow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-400"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    Écrire au service commercial
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                  <a
                    href="tel:+212522238585"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/15"
                  >
                    <Phone className="h-4 w-4" aria-hidden />
                    +212 5 22 23 85 85
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  Grilles PDF officielles
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {PORT_LINKS.map((link) => (
                    <a
                      key={link.port}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex cursor-pointer items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2.5 text-[13px] text-white/90 transition-all hover:bg-white/10"
                    >
                      <span className="truncate">{link.port}</span>
                      <Download className="h-3.5 w-3.5 shrink-0 text-white/60 transition-colors group-hover:text-white" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-navy-900/10 bg-navy-50/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
          <div>
            <Image
              src="/marsa-logo.png"
              alt="Marsa Maroc"
              width={170}
              height={44}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm text-navy-700">
              Interface non-officielle de navigation tarifaire. Les valeurs publiées
              proviennent de la grille 2025 de Marsa Maroc. Devise : MAD hors taxes.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
              Produit
            </p>
            <ul className="space-y-2 text-sm text-navy-800">
              <li><a href="#ports" className="hover:text-brand-700">Réseau portuaire</a></li>
              <li><a href="#simulateur" className="hover:text-brand-700">Simulateur</a></li>
              <li><a href="#comparer" className="hover:text-brand-700">Comparateur</a></li>
              <li><a href="#tarifs" className="hover:text-brand-700">Catalogue tarifaire</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-navy-500">
              Ressources
            </p>
            <ul className="space-y-2 text-sm text-navy-800">
              <li>
                <a href="https://www.marsamaroc.co.ma/fr/espace-client/tarification" target="_blank" rel="noreferrer" className="hover:text-brand-700">
                  Espace client Marsa Maroc
                </a>
              </li>
              <li>
                <a href="mailto:commercial@marsamaroc.co.ma" className="hover:text-brand-700">
                  commercial@marsamaroc.co.ma
                </a>
              </li>
              <li>
                <a href="tel:+212522238585" className="hover:text-brand-700">
                  +212 5 22 23 85 85
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-navy-900/10 py-5">
          <p className="mx-auto max-w-7xl px-5 text-xs text-navy-500 lg:px-8">
            © {new Date().getFullYear()} Prototype UI — Tarifs Publics 2025 extraits de marsamaroc.co.ma.
            Toute facturation contractuelle relève du service commercial Marsa Maroc.
          </p>
        </div>
      </footer>
    </>
  );
}
