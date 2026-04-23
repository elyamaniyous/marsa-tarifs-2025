"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { MapPin, TrendingUp, ChevronRight, Ship } from "lucide-react";
import { PORTS, SPECIALTY_LABEL, type PortSpecialty } from "@/data/ports";
import { MOROCCO_PATH, project } from "@/lib/geo";
import { cn } from "@/lib/cn";

const FILTERS: { key: PortSpecialty | "all"; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "conteneur", label: "Conteneurs" },
  { key: "vrac", label: "Vracs" },
  { key: "hydrocarbure", label: "Hydrocarbures" },
  { key: "peche", label: "Pêche" },
  { key: "polyvalent", label: "Polyvalent" },
];

export function PortsMap() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [hovered, setHovered] = useState<string | null>(null);

  const filteredPorts = useMemo(
    () =>
      PORTS.filter((p) =>
        filter === "all" ? true : p.specialties.includes(filter)
      ),
    [filter]
  );

  const activePort = hovered
    ? PORTS.find((p) => p.code === hovered) ?? null
    : null;

  return (
    <section id="ports" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 backdrop-blur"
            >
              <Ship className="h-3.5 w-3.5" aria-hidden /> Réseau national · 11 terminaux
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 font-display text-4xl font-semibold tracking-tight text-navy-900 md:text-5xl text-balance"
            >
              Le Royaume en ★,
              <br />
              <span className="italic text-brand-600">chaque escale en un clic.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-navy-700 text-pretty md:text-lg"
            >
              De Nador à Dakhla, chaque terminal a son caractère : containers,
              vracs, hydrocarbures ou produits frais de la mer. Sélectionnez
              pour consulter la grille tarifaire détaillée.
            </motion.p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  filter === f.key
                    ? "border-navy-900 bg-navy-900 text-white shadow-soft"
                    : "border-navy-900/10 bg-white/60 text-navy-800 hover:border-navy-900/25 hover:bg-white"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Map — style officiel Marsa Maroc */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-8 shadow-float"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-navy-500">
                  Réseau Marsa Maroc
                </p>
                <p className="mt-0.5 font-display text-lg font-semibold text-navy-900">
                  Onze terminaux, un pavillon
                </p>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-navy-600">
                <span className="inline-flex items-center gap-1.5">
                  <StarInline /> Ports
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-brand-600" /> Atlantique
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-navy-700" /> Méditerranée
                </span>
              </div>
            </div>

            <MoroccoMap
              hovered={hovered}
              filter={filter}
              onHover={setHovered}
            />

            <AnimatePresence mode="wait">
              {activePort && (
                <motion.div
                  key={activePort.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 rounded-2xl border border-brand-200 bg-brand-50/60 p-4 text-navy-900"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-lg font-semibold">{activePort.name}</p>
                      <p className="text-xs text-navy-600">{activePort.tagline}</p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/10 px-3 py-1 text-[11px] text-brand-700">
                      <TrendingUp className="h-3 w-3" />
                      {activePort.volume}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Port list */}
          <div className="grid gap-3">
            {filteredPorts.map((port, i) => (
              <motion.a
                key={port.code}
                href={`#port-${port.code}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                onMouseEnter={() => setHovered(port.code)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border bg-white/80 p-4 shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-float",
                  hovered === port.code
                    ? "border-brand-500/60 ring-2 ring-brand-500/20"
                    : "border-navy-900/10"
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 text-white shadow-soft">
                  <MapPin className="h-5 w-5" aria-hidden />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="font-display text-lg font-semibold text-navy-900">
                      {port.name}
                    </p>
                    <span className="text-xs text-navy-500">{port.region}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-navy-700">{port.highlight}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {port.specialties.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-navy-50 px-2 py-0.5 text-[11px] font-medium text-navy-700"
                      >
                        {SPECIALTY_LABEL[s]}
                      </span>
                    ))}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-navy-400 transition-transform group-hover:translate-x-1" aria-hidden />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StarInline() {
  return (
    <svg width="12" height="12" viewBox="-2.4 -2.4 4.8 4.8" aria-hidden>
      <polygon points={starPoints(1.9, 0.85)} fill="#007CBB" />
    </svg>
  );
}

function starPoints(outer: number, inner: number) {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push(`${(r * Math.cos(a)).toFixed(3)},${(r * Math.sin(a)).toFixed(3)}`);
  }
  return points.join(" ");
}

interface MapProps {
  hovered: string | null;
  filter: PortSpecialty | "all";
  onHover: (code: string | null) => void;
}

function MoroccoMap({ hovered, filter, onHover }: MapProps) {
  const W = 100;
  const H = 130;
  const PADX = 4;
  const PADY = 4;
  const moroccoPath = MOROCCO_PATH(W, H, PADX, PADY);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-[440px] w-full md:h-[540px]"
      role="img"
      aria-label="Carte du Maroc — ports Marsa Maroc"
    >
      <defs>
        <linearGradient id="mapBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#213656" />
          <stop offset="100%" stopColor="#1a3768" />
        </linearGradient>
        <filter id="starGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Silhouette unifiée Maroc (Sahara inclus, aucune couture) */}
      <path
        d={moroccoPath}
        fill="url(#mapBody)"
        stroke="#ffffff"
        strokeOpacity="0.35"
        strokeWidth="0.3"
        strokeLinejoin="round"
      />

      {PORTS.map((port) => {
        const [x, y] = project(port.coords.lon, port.coords.lat, W, H, PADX, PADY);
        const isFiltered = filter === "all" || port.specialties.includes(filter);
        const isHovered = hovered === port.code;
        const fill = port.region === "Méditerranée" ? "#3dacdf" : "#007CBB";
        const scale = isHovered ? 1.6 : isFiltered ? 1.0 : 0.6;
        return (
          <g
            key={port.code}
            transform={`translate(${x}, ${y})`}
            onMouseEnter={() => onHover(port.code)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(port.code)}
            onBlur={() => onHover(null)}
            tabIndex={0}
            className="cursor-pointer focus:outline-none"
            style={{ transition: "transform 0.3s ease" }}
          >
            <title>{port.name}</title>
            {/* Pulse halo when filtered/hovered */}
            {isFiltered && (
              <circle r="3.6" fill={fill} fillOpacity="0" stroke={fill} strokeOpacity="0.6" strokeWidth="0.25">
                <animate attributeName="r" values="2.2;4.2;2.2" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
              </circle>
            )}
            <g transform={`scale(${scale})`} filter="url(#starGlow)" style={{ transition: "transform 0.3s ease" }}>
              <polygon
                points={starPoints(2.0, 0.9)}
                fill={fill}
                fillOpacity={isFiltered ? 1 : 0.35}
              />
              <polygon
                points={starPoints(1.0, 0.45)}
                fill="#ffffff"
                fillOpacity={isFiltered ? 0.85 : 0.35}
              />
            </g>

            {/* Label on hover */}
            {isHovered && (
              <g transform="translate(3, -1)">
                <rect x="0" y="-2.5" rx="1.2" ry="1.2" width={port.name.length * 1.55} height="4.6" fill="#0f2043" />
                <text x="1.3" y="0.9" fontSize="2.8" fill="#ffffff" fontFamily="Inter, sans-serif" fontWeight="600">
                  {port.name}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}
