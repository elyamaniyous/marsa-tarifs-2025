"use client";

import Image from "next/image";
import { PORTS } from "@/data/ports";
import { MOROCCO_PATH, project } from "@/lib/geo";
import type { PortSpecialty } from "@/data/ports";
import { cn } from "@/lib/cn";

/**
 * Carte reproduisant l'esthétique de la carte officielle Marsa Maroc :
 * - Fond clair dégradé ivory + pattern de points
 * - Silhouette Maroc+Sahara en bleu navy dégradé avec halo bleu cyan
 * - Lignes de régions suggérées en blanc
 * - Étoiles bleu brand pour les Ports
 * - Cercles bleu brand pour les Filiales (villes avec siège)
 * - Légende card + logo Marsa Maroc en bas
 */

interface Props {
  hovered: string | null;
  filter: PortSpecialty | "all";
  onHover: (code: string | null) => void;
  showLogo?: boolean;
}

// Villes où Marsa Maroc a une filiale/agence (en plus des ports)
const FILIALES: { lon: number; lat: number; name: string }[] = [
  { lon: -7.59, lat: 33.58, name: "Casablanca · Siège" },
  { lon: -9.58, lat: 30.42, name: "Agadir · Agence" },
  { lon: -8.0, lat: 31.63, name: "Marrakech · Agence" },
];

// Lignes de région schématiques (quelques traits décoratifs blancs)
// Approximent les frontières régionales telles qu'affichées sur la carte officielle.
const REGION_LINES: [[number, number], [number, number]][] = [
  // Séparation Tanger-Tétouan / Oriental
  [[-3.5, 35.5], [-3.5, 34.2]],
  // Oriental / Fès-Meknès
  [[-3.2, 34.2], [-5.0, 33.5]],
  // Fès-Meknès / Rabat
  [[-5.0, 33.5], [-6.3, 34.3]],
  // Rabat / Casablanca-Settat
  [[-6.5, 33.9], [-7.3, 33.4]],
  // Casablanca-Settat / Marrakech-Safi
  [[-9.0, 32.3], [-7.4, 33.0]],
  // Marrakech-Safi / Béni Mellal-Khénifra
  [[-7.4, 33.0], [-5.4, 32.8]],
  // Marrakech-Safi / Souss-Massa
  [[-9.6, 30.5], [-7.8, 31.1]],
  // Souss-Massa / Drâa-Tafilalet
  [[-7.8, 31.1], [-4.0, 32.0]],
  // Souss-Massa / Guelmim
  [[-10.5, 29.3], [-8.0, 29.8]],
  // Guelmim / Laâyoune (entrée Sahara)
  [[-11.5, 28.3], [-10.5, 28.0]],
  // Laâyoune / Dakhla
  [[-14.0, 25.5], [-12.0, 25.5]],
];

export function MarsaMap({ hovered, filter, onHover, showLogo = true }: Props) {
  const W = 100;
  const H = 140;
  const PADX = 14;
  const PADY = 6;
  const moroccoPath = MOROCCO_PATH(W, H, PADX, PADY);

  return (
    <div className="relative isolate h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white via-ivory-50 to-brand-50/40">
      {/* Dots pattern décoratif en haut-gauche */}
      <svg className="pointer-events-none absolute left-4 top-4 h-24 w-24 text-brand-600/40" aria-hidden>
        <defs>
          <pattern id="dotgrid" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Swooshes arc-en-ciel très discrets en bas */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-brand-300/30"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M -20 80 Q 120 40 420 90" fill="none" stroke="currentColor" strokeWidth="0.6" />
        <path d="M -20 92 Q 160 50 420 100" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      {/* Main SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative z-10 h-full w-full"
        role="img"
        aria-label="Carte du Maroc — réseau Marsa Maroc"
      >
        <defs>
          <linearGradient id="mapBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a4880" />
            <stop offset="55%" stopColor="#1a3768" />
            <stop offset="100%" stopColor="#112853" />
          </linearGradient>
          <filter id="mapGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="starGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="starRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3dacdf" />
            <stop offset="100%" stopColor="#007CBB" />
          </radialGradient>
        </defs>

        {/* Silhouette Maroc+Sahara avec halo cyan */}
        <g filter="url(#mapGlow)">
          <path
            d={moroccoPath}
            fill="url(#mapBody)"
            stroke="#3dacdf"
            strokeOpacity="0.6"
            strokeWidth="0.3"
            strokeLinejoin="round"
          />
        </g>

        {/* Overlay plus net pour le contour */}
        <path
          d={moroccoPath}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.35"
          strokeWidth="0.25"
          strokeLinejoin="round"
        />

        {/* Lignes de régions suggérées */}
        <g stroke="#ffffff" strokeOpacity="0.42" strokeWidth="0.18" fill="none" strokeLinecap="round">
          {REGION_LINES.map(([a, b], i) => {
            const [x1, y1] = project(a[0], a[1], W, H, PADX, PADY);
            const [x2, y2] = project(b[0], b[1], W, H, PADX, PADY);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>

        {/* Filiales (cercles) */}
        {FILIALES.map((f, i) => {
          const [x, y] = project(f.lon, f.lat, W, H, PADX, PADY);
          return (
            <g key={`fil-${i}`} filter="url(#starGlow)">
              <title>{f.name}</title>
              <circle cx={x} cy={y} r="1.6" fill="url(#starRadial)" />
              <circle cx={x} cy={y} r="0.7" fill="#ffffff" />
            </g>
          );
        })}

        {/* Ports (étoiles) */}
        {PORTS.map((port) => {
          const [x, y] = project(port.coords.lon, port.coords.lat, W, H, PADX, PADY);
          const isFiltered = filter === "all" || port.specialties.includes(filter);
          const isHovered = hovered === port.code;
          const scale = isHovered ? 1.55 : isFiltered ? 1.0 : 0.55;
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
              {isFiltered && (
                <circle
                  r="3.4"
                  fill="none"
                  stroke="#007CBB"
                  strokeOpacity="0.45"
                  strokeWidth="0.2"
                >
                  <animate attributeName="r" values="2.1;4.2;2.1" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
                </circle>
              )}
              <g transform={`scale(${scale})`} filter="url(#starGlow)">
                <polygon
                  points={starPoints(2.0, 0.88)}
                  fill="url(#starRadial)"
                  fillOpacity={isFiltered ? 1 : 0.4}
                />
                <polygon points={starPoints(1.0, 0.44)} fill="#ffffff" fillOpacity="0.9" />
              </g>
              {isHovered && (
                <g transform="translate(3.2, -0.8)">
                  <rect
                    x="0"
                    y="-2.5"
                    rx="1.2"
                    ry="1.2"
                    width={port.name.length * 1.48}
                    height="4.4"
                    fill="#0f2043"
                  />
                  <text
                    x="1.3"
                    y="0.8"
                    fontSize="2.6"
                    fill="#ffffff"
                    fontFamily="Inter, sans-serif"
                    fontWeight="600"
                  >
                    {port.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Légende card */}
      <div
        className={cn(
          "absolute right-4 top-4 rounded-2xl border border-white/50 bg-white/90 px-4 py-3 text-xs shadow-soft backdrop-blur",
          "md:right-6 md:top-6"
        )}
      >
        <div className="flex items-center gap-2">
          <StarSwatch />
          <span className="font-semibold text-navy-900">Ports</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <CircleSwatch />
          <span className="font-semibold text-navy-900">Filiales</span>
        </div>
      </div>

      {/* Logo Marsa Maroc en bas, comme sur la carte de référence */}
      {showLogo && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex flex-col items-center gap-2">
          <div className="h-[2px] w-24 bg-navy-900/15" aria-hidden />
          <Image
            src="/marsa-logo.png"
            alt="Marsa Maroc"
            width={170}
            height={44}
            className="h-9 w-auto opacity-90"
          />
        </div>
      )}
    </div>
  );
}

function StarSwatch() {
  return (
    <svg width="16" height="16" viewBox="-2.4 -2.4 4.8 4.8" aria-hidden>
      <polygon points={starPoints(1.9, 0.85)} fill="#007CBB" />
    </svg>
  );
}

function CircleSwatch() {
  return (
    <svg width="14" height="14" viewBox="-1.5 -1.5 3 3" aria-hidden>
      <circle cx="0" cy="0" r="1.2" fill="#007CBB" />
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
