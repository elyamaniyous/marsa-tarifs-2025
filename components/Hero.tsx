"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Sparkles, ArrowDown, ShieldCheck } from "lucide-react";
import { PORTS } from "@/data/ports";
import { MOROCCO_PATH, project } from "@/lib/geo";

const METRICS = [
  { label: "Ports opérés", value: "11" },
  { label: "Familles tarifaires", value: "420+" },
  { label: "Mise à jour", value: "2025" },
  { label: "Devise", value: "MAD HT" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40"
    >
      <motion.div
        style={{ y: reduce ? 0 : yBack }}
        className="absolute inset-0 -z-20"
        aria-hidden
      >
        <div className="absolute inset-0 gradient-brand" />
        <div className="absolute inset-0 opacity-[0.35] mix-blend-screen noise-layer" />
        <div className="absolute left-1/4 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[140px]" />
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] translate-x-1/3 rounded-full bg-brand-300/20 blur-[120px]" />
      </motion.div>

      <motion.svg
        style={{ y: reduce ? 0 : yFront }}
        className="absolute -bottom-px left-0 right-0 -z-10 w-full text-ivory-50"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#waveGrad)"
          d="M0 120 C 220 60 440 180 720 120 C 1000 60 1220 180 1440 100 L 1440 180 L 0 180 Z"
        />
      </motion.svg>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex max-w-7xl flex-col items-start gap-16 px-5 lg:flex-row lg:items-center lg:gap-12 lg:px-8"
      >
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-300" aria-hidden />
            Grille tarifaire publique · Janvier 2025
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-white text-balance md:text-7xl lg:text-[5.2rem]"
          >
            Chaque escale,
            <br />
            <span className="italic text-brand-200">un tarif limpide.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl text-pretty"
          >
            Simulez, comparez et téléchargez les tarifs publics 2025 des
            onze terminaux Marsa Maroc. Transparence totale, du conteneur
            à la tonne d'hydrocarbure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#simulateur"
              className="group inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-base font-semibold text-navy-900 shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-50"
            >
              Démarrer un simulateur
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </a>
            <a
              href="#ports"
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-white/15"
            >
              Explorer les 11 ports
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-5 text-xs text-white/70"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-300" aria-hidden />
              Tarifs officiels publiés par Marsa Maroc
            </div>
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden />
            <a
              href="https://www.marsamaroc.co.ma/fr/espace-client/tarification"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-white"
            >
              marsamaroc.co.ma
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md lg:w-[460px]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] p-6 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent" />
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-400/30 blur-3xl" aria-hidden />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  En un coup d'œil
                </p>
                <p className="mt-1 font-display text-xl text-white">
                  Réseau portuaire 2025
                </p>
              </div>
              <div className="rounded-full bg-brand-500/25 px-3 py-1 text-xs font-medium text-brand-200">
                Live
              </div>
            </div>

            <div className="mt-6 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4">
              <MiniMap />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              {METRICS.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="rounded-2xl bg-white/5 p-3"
                >
                  <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                    {m.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-white">
                    {m.value}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60"
        aria-hidden
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.25em]">Dérouler</span>
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function MiniMap() {
  const W = 100;
  const H = 125;
  const PADX = 5;
  const PADY = 4;
  const moroccoPath = MOROCCO_PATH(W, H, PADX, PADY);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label="Carte du réseau Marsa Maroc"
    >
      <defs>
        <filter id="mmGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d={moroccoPath} fill="#ffffff" fillOpacity="0.10" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="0.25" />

      {PORTS.map((port, i) => {
        const [x, y] = project(port.coords.lon, port.coords.lat, W, H, PADX, PADY);
        return (
          <g key={port.code} transform={`translate(${x}, ${y})`} filter="url(#mmGlow)">
            <Star size={1.8} fill="#007CBB">
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3s"
                begin={`${i * 0.15}s`}
                repeatCount="indefinite"
              />
            </Star>
          </g>
        );
      })}
    </svg>
  );
}

function Star({ size = 2, fill = "#007CBB", children }: { size?: number; fill?: string; children?: React.ReactNode }) {
  // 5-pointed star polygon, centered at (0,0), tip up
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? size : size * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    points.push(`${(r * Math.cos(a)).toFixed(3)},${(r * Math.sin(a)).toFixed(3)}`);
  }
  return (
    <polygon points={points.join(" ")} fill={fill}>
      {children}
    </polygon>
  );
}
