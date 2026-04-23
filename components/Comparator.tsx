"use client";

import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { GitCompareArrows, ChevronDown, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { PORTS } from "@/data/ports";
import { TARIFFS } from "@/data/tariffs";
import { cn, formatMAD } from "@/lib/cn";

const BENCHMARK_TARIFFS = [
  { id: "c20p-imp", label: "Conteneur 20' Plein · Import" },
  { id: "c40p-imp", label: "Conteneur 40' Plein · Import" },
  { id: "c20p-exp", label: "Conteneur 20' Plein · Export" },
  { id: "c40p-exp", label: "Conteneur 40' Plein · Export" },
  { id: "sucre", label: "Sucre brut en vrac · Import" },
  { id: "uree", label: "Urée en vrac · Import" },
  { id: "cereales", label: "Céréales quai en vrac · Import" },
  { id: "ferraille", label: "Ferraille en vrac · Export" },
  { id: "mag-40-pl-5", label: "Magasinage 40' plein · ≤ 5 j" },
];

export function Comparator() {
  const [portA, setPortA] = useState<string | null>("casa-dtcr");
  const [portB, setPortB] = useState<string | null>("agadir");
  const [portC, setPortC] = useState<string | null>("nador");
  const [tariffId, setTariffId] = useState("c40p-imp");

  const tariff = useMemo(() => TARIFFS.find((t) => t.id === tariffId), [tariffId]);
  const selectedPorts = [portA, portB, portC].filter(Boolean) as string[];

  const results = selectedPorts.map((code) => {
    const port = PORTS.find((p) => p.code === code);
    const available = tariff?.ports.includes(code);
    const value = available ? tariff?.tarif : null;
    return { port, value, available };
  });

  const validValues = results
    .map((r) => r.value)
    .filter((v): v is number => typeof v === "number");
  const min = validValues.length ? Math.min(...validValues) : 0;
  const max = validValues.length ? Math.max(...validValues) : 0;

  return (
    <section id="comparer" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 backdrop-blur">
              <GitCompareArrows className="h-3.5 w-3.5" aria-hidden /> Comparateur
            </div>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-navy-900 md:text-5xl text-balance">
              Trois ports, <span className="italic text-brand-700">un verdict.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-700 md:text-lg">
              Placez côte à côte jusqu'à trois terminaux et identifiez
              instantanément l'option la plus économique sur la prestation
              de votre choix.
            </p>
          </div>

          <div className="relative min-w-[280px]">
            <label className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-navy-500">
              Prestation comparée
            </label>
            <div className="relative">
              <select
                value={tariffId}
                onChange={(e) => setTariffId(e.target.value)}
                className="w-full cursor-pointer appearance-none rounded-2xl border border-navy-900/10 bg-white px-4 py-3 pr-10 text-sm font-medium text-navy-900 shadow-soft"
              >
                {BENCHMARK_TARIFFS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" aria-hidden />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => {
            const value = [portA, portB, portC][i];
            const setValue = [setPortA, setPortB, setPortC][i];
            const result = results[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow-soft backdrop-blur-xl transition-all",
                  result?.value === min && min !== max
                    ? "border-gold-400/70 ring-2 ring-gold-300/30"
                    : result?.value === max && min !== max
                      ? "border-navy-900/15"
                      : "border-navy-900/10"
                )}
              >
                {result?.value === min && min !== max && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gold-400 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-navy-950">
                    <TrendingDown className="h-3 w-3" /> Plus compétitif
                  </div>
                )}
                {result?.value === max && min !== max && (
                  <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-navy-900/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white">
                    <TrendingUp className="h-3 w-3" /> + cher
                  </div>
                )}

                <div className="relative">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
                    Port {String.fromCharCode(65 + i)}
                  </label>
                  <div className="relative mt-1.5">
                    <select
                      value={value ?? ""}
                      onChange={(e) => setValue(e.target.value || null)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-navy-900/10 bg-white px-3 py-2.5 pr-9 text-sm font-medium text-navy-900 shadow-soft"
                    >
                      {i === 2 && <option value="">— aucun —</option>}
                      {PORTS.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" aria-hidden />
                  </div>

                  <div className="mt-6">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
                      Tarif 2025 {tariff?.unit ? `· ${tariff.unit}` : ""}
                    </p>
                    <motion.p
                      key={`${i}-${result?.value}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 font-display text-4xl font-semibold text-navy-900 md:text-5xl"
                    >
                      {result?.available ? (
                        <>
                          {formatMAD(result.value)}
                          <span className="ml-1 text-base font-medium text-navy-500">MAD</span>
                        </>
                      ) : (
                        <span className="text-navy-300">—</span>
                      )}
                    </motion.p>
                    {!result?.available && (
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-navy-500">
                        <Minus className="h-3 w-3" /> Non applicable à ce port
                      </p>
                    )}
                  </div>

                  {result?.port && (
                    <div className="mt-5 rounded-2xl bg-navy-50/60 p-4">
                      <p className="text-xs text-navy-600">{result.port.highlight}</p>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-navy-500">
                        <span>{result.port.region}</span>
                        <span>{result.port.volume}</span>
                      </div>
                    </div>
                  )}

                  {/* Relative bar */}
                  {result?.available && min !== max && validValues.length > 1 && (
                    <div className="mt-4">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-900/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{
                            width: `${((result.value! - min) / (max - min)) * 100}%`,
                          }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className={cn(
                            "h-full rounded-full",
                            result.value === min
                              ? "bg-gold-400"
                              : result.value === max
                                ? "bg-navy-700"
                                : "bg-brand-500"
                          )}
                        />
                      </div>
                      <p className="mt-2 text-[11px] text-navy-500">
                        Écart vs. minimum :{" "}
                        <span className="font-semibold text-navy-800">
                          +{formatMAD(result.value! - min)} MAD
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {validValues.length > 1 && min !== max && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-brand-300/40 bg-brand-50/50 px-5 py-4 text-sm text-brand-900"
          >
            <TrendingDown className="h-4 w-4 text-brand-700" aria-hidden />
            <span>
              Économie potentielle entre le plus compétitif et le plus onéreux :
              <strong className="ml-1 font-semibold">
                {formatMAD(max - min)} MAD / unité
              </strong>{" "}
              (soit {(((max - min) / max) * 100).toFixed(1)}%).
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}
