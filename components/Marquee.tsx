"use client";

import { Anchor } from "lucide-react";

const ITEMS = [
  "Tarifs Publics 2025",
  "Conteneurs harmonisés 6 ports",
  "Hydrocarbures Mohammedia",
  "Vracs solides Jorf Lasfar",
  "Produits de pêche Laâyoune & Dakhla",
  "Rouliers Casablanca",
  "Méditerranée · Nador",
  "11 terminaux · 1 grille unique",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-navy-900/10 bg-navy-900 py-4">
      <div className="animate-marquee flex min-w-max items-center gap-12 text-white/70">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-sm font-medium tracking-wide whitespace-nowrap">
            <Anchor className="h-3.5 w-3.5 text-brand-400" aria-hidden />
            <span>{item}</span>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-navy-900 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-navy-900 to-transparent" aria-hidden />
    </div>
  );
}
