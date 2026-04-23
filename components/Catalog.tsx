"use client";

import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import {
  Package,
  Search,
  Warehouse,
  Ship,
  Truck,
  Droplet,
  Fish,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { PORTS } from "@/data/ports";
import { TARIFFS, type TariffEntry } from "@/data/tariffs";
import { cn, formatMAD } from "@/lib/cn";

const CATEGORIES = [
  { key: "manutention", label: "Manutention", Icon: Ship, color: "tide" },
  { key: "magasinage", label: "Magasinage", Icon: Warehouse, color: "abyss" },
  { key: "prestation_navire", label: "Prestations navire", Icon: Ship, color: "copper" },
  { key: "location", label: "Location engins", Icon: Wrench, color: "sand" },
  { key: "prestation_marchandise", label: "Marchandise", Icon: Package, color: "abyss" },
] as const;

const SUBCATEGORY_ICONS: Record<string, typeof Ship> = {
  Conteneurs: Package,
  Rouliers: Truck,
  Véhicules: Truck,
  "Vracs solides": Package,
  "Vracs liquides": Droplet,
  Hydrocarbures: Droplet,
  "Produits de pêche": Fish,
  "Animaux vivants": Ship,
  "Conteneurs pleins": Package,
  "Conteneurs vides": Package,
  Lamanage: Ship,
  "Grues mobiles": Wrench,
  Chariots: Wrench,
  Tracteurs: Wrench,
  Pesage: Package,
  "Dépotage/Empotage": Package,
  Passagers: Package,
};

export function Catalog() {
  const [portCode, setPortCode] = useState("casa-dtcr");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]["key"]>("manutention");
  const [search, setSearch] = useState("");

  const port = PORTS.find((p) => p.code === portCode)!;

  const filtered = useMemo(() => {
    const rough = TARIFFS.filter(
      (t) => t.ports.includes(portCode) && t.category === category
    );
    if (!search) return rough;
    const q = search.toLowerCase();
    return rough.filter(
      (t) =>
        t.label.toLowerCase().includes(q) ||
        t.subcategory.toLowerCase().includes(q)
    );
  }, [portCode, category, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, TariffEntry[]>();
    for (const t of filtered) {
      const arr = map.get(t.subcategory) ?? [];
      arr.push(t);
      map.set(t.subcategory, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <section id="tarifs" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 backdrop-blur">
            <Package className="h-3.5 w-3.5" aria-hidden /> Catalogue intégral
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-navy-900 md:text-5xl text-balance">
            Toutes les grilles, <span className="italic text-brand-700">au millimètre près.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-navy-700 md:text-lg">
            Feuilletez les tarifs détaillés par port et catégorie. Filtrez par
            mot-clé pour retrouver la prestation exacte en quelques frappes.
          </p>
        </motion.div>

        {/* Port selector tabs */}
        <div className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
          <div className="flex min-w-max gap-2 pb-4 md:flex-wrap">
            {PORTS.map((p) => (
              <button
                key={p.code}
                type="button"
                onClick={() => setPortCode(p.code)}
                className={cn(
                  "flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all",
                  portCode === p.code
                    ? "border-navy-900 bg-navy-900 text-white shadow-soft"
                    : "border-navy-900/10 bg-white/60 text-navy-800 hover:border-navy-900/25 hover:bg-white"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    p.region === "Méditerranée" ? "bg-brand-400" : "bg-brand-400"
                  )}
                  aria-hidden
                />
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-2 grid gap-4 rounded-2xl border border-navy-900/10 bg-white/80 p-4 shadow-soft backdrop-blur md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                onClick={() => setCategory(key)}
                className={cn(
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors",
                  category === key
                    ? "bg-navy-900 text-white"
                    : "text-navy-700 hover:bg-navy-50"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Chercher une prestation, un produit, un type de conteneur…"
              aria-label="Recherche de prestation"
              className="w-full rounded-xl border border-navy-900/10 bg-white px-4 py-2.5 pl-10 text-sm text-navy-900 placeholder:text-navy-400 focus:border-brand-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Port summary */}
        <div className="mt-6 grid gap-3 rounded-3xl border border-navy-900/10 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-6 text-white md:grid-cols-[1.2fr_auto_auto_auto] md:items-center md:gap-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
              Port actif
            </p>
            <p className="mt-1 font-display text-2xl font-semibold md:text-3xl">{port.name}</p>
            <p className="mt-1 text-sm text-white/70">{port.highlight}</p>
          </div>
          <Stat label="Région" value={port.region} />
          <Stat label="Volume" value={port.volume} />
          <Stat label="Prestations" value={String(TARIFFS.filter((t) => t.ports.includes(portCode)).length)} />
        </div>

        {/* Tariff grid */}
        <div className="mt-8 space-y-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${portCode}-${category}-${search}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
              {grouped.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-navy-900/15 bg-white/50 p-16 text-center">
                  <Search className="h-10 w-10 text-navy-300" aria-hidden />
                  <p className="mt-4 font-display text-xl text-navy-800">
                    Aucun tarif ne correspond à cette recherche.
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-navy-600">
                    Essayez un autre mot-clé ou retirez le filtre de catégorie
                    pour élargir votre exploration.
                  </p>
                </div>
              ) : (
                grouped.map(([sub, items]) => {
                  const SubIcon = SUBCATEGORY_ICONS[sub] ?? Package;
                  return (
                    <div key={sub}>
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white shadow-soft">
                          <SubIcon className="h-4 w-4" aria-hidden />
                        </div>
                        <div>
                          <p className="font-display text-lg font-semibold text-navy-900">
                            {sub}
                          </p>
                          <p className="text-xs text-navy-500">
                            {items.length} prestation{items.length > 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item, i) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.35, delay: i * 0.02 }}
                            className="group relative cursor-default overflow-hidden rounded-2xl border border-navy-900/10 bg-white/90 p-5 shadow-soft backdrop-blur transition-all hover:-translate-y-0.5 hover:border-navy-900/25 hover:shadow-float"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-medium leading-snug text-navy-900">
                                  {item.label}
                                </p>
                                {item.direction && item.direction !== "both" && (
                                  <span
                                    className={cn(
                                      "mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                                      item.direction === "import"
                                        ? "bg-brand-50 text-brand-700"
                                        : "bg-brand-50 text-brand-800"
                                    )}
                                  >
                                    {item.direction}
                                  </span>
                                )}
                              </div>
                              <ChevronRight className="h-4 w-4 shrink-0 text-navy-300 transition-transform group-hover:translate-x-0.5" aria-hidden />
                            </div>

                            <div className="mt-5 flex items-baseline gap-2">
                              <p className="font-display text-2xl font-semibold text-navy-900">
                                {formatMAD(item.tarif)}
                              </p>
                              <p className="text-xs font-medium text-navy-500">
                                MAD / {item.unit}
                              </p>
                            </div>

                            {(item.tarifBord !== undefined || item.tarifTerre !== undefined) && (
                              <div className="mt-3 flex gap-4 rounded-xl bg-navy-50/60 px-3 py-2 text-[11px] text-navy-600">
                                {item.tarifBord !== undefined && (
                                  <span>Bord <strong className="font-semibold text-navy-900">{formatMAD(item.tarifBord)}</strong></span>
                                )}
                                {item.tarifTerre !== undefined && (
                                  <span>Terre <strong className="font-semibold text-navy-900">{formatMAD(item.tarifTerre)}</strong></span>
                                )}
                              </div>
                            )}

                            {item.conditions && (
                              <p className="mt-3 text-[11px] italic text-navy-500">
                                {item.conditions}
                              </p>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold">{value}</p>
    </div>
  );
}
