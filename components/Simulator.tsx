"use client";

import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import {
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Plus,
  Minus,
  ChevronDown,
  Check,
  Download,
  Ship,
} from "lucide-react";
import { PORTS } from "@/data/ports";
import { TARIFFS, type TariffEntry } from "@/data/tariffs";
import { cn, formatMAD } from "@/lib/cn";
import type { ExportData } from "@/lib/exports";
import { FileSpreadsheet, FileText, FileType2 } from "lucide-react";

interface LineItem {
  id: string;
  tariffId: string;
  quantity: number;
}

export function Simulator() {
  const [portCode, setPortCode] = useState("casa-dtcr");
  const [direction, setDirection] = useState<"import" | "export" | "all">("import");
  const [openSelect, setOpenSelect] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [lines, setLines] = useState<LineItem[]>([
    { id: "l1", tariffId: "c40p-imp", quantity: 10 },
  ]);

  const port = PORTS.find((p) => p.code === portCode)!;

  const availableTariffs = useMemo(() => {
    return TARIFFS.filter(
      (t) =>
        t.ports.includes(portCode) &&
        (direction === "all" ||
          t.direction === undefined ||
          t.direction === direction ||
          t.direction === "both")
    );
  }, [portCode, direction]);

  const tariffMap = useMemo(
    () => new Map(TARIFFS.map((t) => [t.id, t])),
    []
  );

  const rows = lines.map((line) => {
    const tariff = tariffMap.get(line.tariffId);
    const total = tariff ? tariff.tarif * line.quantity : 0;
    return { line, tariff, total };
  });

  const grandTotal = rows.reduce((sum, r) => sum + r.total, 0);

  const addLine = () => {
    const firstAvailable = availableTariffs[0];
    if (!firstAvailable) return;
    setLines((l) => [
      ...l,
      {
        id: `l${Date.now()}`,
        tariffId: firstAvailable.id,
        quantity: 1,
      },
    ]);
  };

  const removeLine = (id: string) => {
    setLines((l) => (l.length > 1 ? l.filter((x) => x.id !== id) : l));
  };

  const updateLine = (id: string, patch: Partial<LineItem>) => {
    setLines((l) => l.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  };

  const exportData: ExportData = {
    portName: port.name,
    portCity: port.city,
    portRegion: port.region,
    grandTotal,
    lines: rows
      .filter((r) => r.tariff)
      .map((r) => ({
        label: r.tariff!.label,
        subcategory: r.tariff!.subcategory,
        direction: r.tariff!.direction,
        quantity: r.line.quantity,
        unit: r.tariff!.unit,
        unitPrice: r.tariff!.tarif,
        subtotal: r.total,
      })),
  };

  const requestQuote = () => {
    const lines = rows
      .filter((r) => r.tariff)
      .map(
        (r, i) =>
          `${i + 1}. ${r.tariff!.label} — ${r.line.quantity} ${r.tariff!.unit} × ${formatMAD(r.tariff!.tarif)} = ${formatMAD(r.total)} MAD`
      )
      .join("\n");
    const body = `Bonjour,

Je souhaite un devis officiel basé sur la simulation suivante :

Port : ${port.name}
${lines}

Total estimé HT : ${formatMAD(grandTotal)} MAD

Merci de revenir vers moi avec votre meilleure offre.

Cordialement,`;
    const subject = `Demande de devis — ${port.name} — ${formatMAD(grandTotal)} MAD HT`;
    window.location.href = `mailto:commercial@marsamaroc.co.ma?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="simulateur" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-navy-700 backdrop-blur">
            <Calculator className="h-3.5 w-3.5" aria-hidden /> Simulateur 2025
          </div>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-navy-900 md:text-5xl text-balance">
            Votre devis, <span className="italic text-brand-700">instantanément.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-700 md:text-lg">
            Additionnez plusieurs prestations, ajustez les quantités, et obtenez
            un total en dirhams hors taxes aligné sur la grille publique Marsa
            Maroc 2025.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-navy-900/10 bg-white/80 shadow-float backdrop-blur-xl"
        >
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-navy-900/5 bg-gradient-to-br from-navy-50 to-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
              {/* Port selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenSelect((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={openSelect}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl border border-navy-900/10 bg-white px-4 py-3 text-left shadow-soft transition-all hover:border-navy-900/20 hover:shadow-float md:w-[320px]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-900 text-white">
                    <Ship className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
                      Port sélectionné
                    </p>
                    <p className="truncate font-display text-base font-semibold text-navy-900">
                      {port.name}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-navy-400 transition-transform",
                      openSelect && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>

                <AnimatePresence>
                  {openSelect && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      role="listbox"
                      className="absolute z-30 mt-2 max-h-80 w-full min-w-[320px] overflow-auto rounded-2xl border border-navy-900/10 bg-white p-2 shadow-float"
                    >
                      {PORTS.map((p) => (
                        <li key={p.code}>
                          <button
                            type="button"
                            onClick={() => {
                              setPortCode(p.code);
                              setOpenSelect(false);
                              setLines([
                                {
                                  id: `l${Date.now()}`,
                                  tariffId:
                                    TARIFFS.find((t) => t.ports.includes(p.code))?.id ??
                                    "c40p-imp",
                                  quantity: 1,
                                },
                              ]);
                            }}
                            className={cn(
                              "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-navy-50",
                              p.code === portCode && "bg-navy-50"
                            )}
                          >
                            <div>
                              <p className="font-medium text-navy-900">{p.name}</p>
                              <p className="text-[11px] text-navy-500">{p.city} · {p.region}</p>
                            </div>
                            {p.code === portCode && (
                              <Check className="h-4 w-4 text-brand-600" aria-hidden />
                            )}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Direction toggle */}
              <div className="inline-flex rounded-2xl border border-navy-900/10 bg-white p-1 shadow-soft">
                {([
                  { v: "import", label: "Import", Icon: ArrowDownRight },
                  { v: "export", label: "Export", Icon: ArrowUpRight },
                  { v: "all", label: "Tous", Icon: Info },
                ] as const).map(({ v, label, Icon }) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDirection(v)}
                    className={cn(
                      "relative cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                      direction === v ? "text-white" : "text-navy-700 hover:text-navy-900"
                    )}
                  >
                    {direction === v && (
                      <motion.span
                        layoutId="dir-pill"
                        className="absolute inset-0 rounded-xl bg-navy-900"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative inline-flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={addLine}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-brand-400 hover:shadow-glow-brand"
            >
              <Plus className="h-4 w-4" aria-hidden />
              Ajouter une prestation
            </button>
          </div>

          {/* Lines */}
          <div className="divide-y divide-navy-900/5">
            <AnimatePresence initial={false}>
              {rows.map(({ line, tariff, total }) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <LineRow
                    line={line}
                    tariff={tariff}
                    availableTariffs={availableTariffs}
                    onUpdate={(patch) => updateLine(line.id, patch)}
                    onRemove={() => removeLine(line.id)}
                    canRemove={lines.length > 1}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Totals */}
          <div className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-brand-900 p-6 text-white md:p-8">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/30 blur-3xl" aria-hidden />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-brand-400/20 blur-3xl" aria-hidden />

            <div className="relative grid gap-6 md:grid-cols-3 md:items-end">
              <div className="md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">
                  Total estimé HT
                </p>
                <motion.p
                  key={grandTotal}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 font-display text-[2.75rem] font-semibold leading-none tracking-tight md:text-6xl"
                >
                  {formatMAD(grandTotal)} <span className="text-brand-300 text-2xl md:text-3xl">MAD</span>
                </motion.p>
                <p className="mt-3 max-w-md text-sm text-white/70">
                  Estimation indicative hors taxes, basée sur la grille publique 2025.
                  Un devis contractuel est établi par le service commercial.
                </p>
              </div>

              <div className="relative flex flex-col gap-2">
                <button
                  type="button"
                  onClick={requestQuote}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-glow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-400"
                >
                  Demander un devis officiel
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenExport((v) => !v)}
                  aria-haspopup="menu"
                  aria-expanded={openExport}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition-all hover:bg-white/10"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Exporter
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openExport && "rotate-180")} aria-hidden />
                </button>

                <AnimatePresence>
                  {openExport && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      role="menu"
                      className="absolute bottom-full right-0 z-30 mb-2 w-72 overflow-hidden rounded-2xl border border-white/10 bg-navy-950/95 p-2 shadow-float backdrop-blur-xl"
                    >
                      <button
                        type="button"
                        onClick={async () => {
                          const { exportXLSX } = await import("@/lib/exports");
                          exportXLSX(exportData);
                          setOpenExport(false);
                        }}
                        className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-left text-white transition-colors hover:bg-white/10"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                          <FileSpreadsheet className="h-4 w-4" aria-hidden />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">Excel (.xlsx)</p>
                          <p className="mt-0.5 text-xs text-white/60">Fichier bien formaté, prêt à consolider</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          const { exportCSV } = await import("@/lib/exports");
                          exportCSV(exportData);
                          setOpenExport(false);
                        }}
                        className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-left text-white transition-colors hover:bg-white/10"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/25 text-brand-200">
                          <FileText className="h-4 w-4" aria-hidden />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">CSV (.csv)</p>
                          <p className="mt-0.5 text-xs text-white/60">UTF-8 avec BOM, séparateur ; pour Excel FR</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          const { exportPDF } = await import("@/lib/exports");
                          await exportPDF(exportData);
                          setOpenExport(false);
                        }}
                        className="flex w-full cursor-pointer items-start gap-3 rounded-xl px-3 py-3 text-left text-white transition-colors hover:bg-white/10"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/20 text-rose-300">
                          <FileType2 className="h-4 w-4" aria-hidden />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">PDF brandé (.pdf)</p>
                          <p className="mt-0.5 text-xs text-white/60">Mise en page Marsa Maroc officielle</p>
                        </div>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface LineRowProps {
  line: LineItem;
  tariff?: TariffEntry;
  availableTariffs: TariffEntry[];
  onUpdate: (patch: Partial<LineItem>) => void;
  onRemove: () => void;
  canRemove: boolean;
}

function LineRow({ line, tariff, availableTariffs, onUpdate, onRemove, canRemove }: LineRowProps) {
  const total = tariff ? tariff.tarif * line.quantity : 0;

  const grouped = useMemo(() => {
    const map = new Map<string, TariffEntry[]>();
    for (const t of availableTariffs) {
      const arr = map.get(t.subcategory) ?? [];
      arr.push(t);
      map.set(t.subcategory, arr);
    }
    return Array.from(map.entries());
  }, [availableTariffs]);

  return (
    <div className="grid gap-4 p-6 md:grid-cols-[1.5fr_0.8fr_0.8fr_auto] md:items-center md:gap-6 md:p-8">
      <div>
        <label className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
          Prestation
        </label>
        <div className="relative mt-1.5">
          <select
            value={line.tariffId}
            onChange={(e) => onUpdate({ tariffId: e.target.value })}
            className="w-full appearance-none cursor-pointer rounded-xl border border-navy-900/10 bg-white px-4 py-3 pr-10 text-sm font-medium text-navy-900 shadow-soft transition-colors hover:border-navy-900/25 focus:border-brand-500 focus:outline-none"
          >
            {grouped.map(([sub, items]) => (
              <optgroup key={sub} label={sub}>
                {items.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                    {t.direction && t.direction !== "both" ? ` · ${t.direction}` : ""}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" aria-hidden />
        </div>
      </div>

      <div>
        <label className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
          Quantité · {tariff?.unit ?? "U"}
        </label>
        <div className="mt-1.5 flex items-center rounded-xl border border-navy-900/10 bg-white shadow-soft">
          <button
            type="button"
            onClick={() => onUpdate({ quantity: Math.max(1, line.quantity - 1) })}
            className="cursor-pointer rounded-l-xl px-3 py-3 text-navy-600 hover:bg-navy-50"
            aria-label="Diminuer la quantité"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <input
            type="number"
            min={1}
            value={line.quantity}
            onChange={(e) =>
              onUpdate({ quantity: Math.max(1, Number(e.target.value) || 1) })
            }
            className="w-full border-0 bg-transparent text-center text-sm font-semibold text-navy-900 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => onUpdate({ quantity: line.quantity + 1 })}
            className="cursor-pointer rounded-r-xl px-3 py-3 text-navy-600 hover:bg-navy-50"
            aria-label="Augmenter la quantité"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div>
        <label className="text-[11px] font-medium uppercase tracking-wider text-navy-500">
          Sous-total
        </label>
        <p className="mt-1.5 font-display text-xl font-semibold text-navy-900 md:text-2xl">
          {formatMAD(total)}{" "}
          <span className="text-xs font-medium text-navy-500">MAD</span>
        </p>
        <p className="text-[11px] text-navy-500">
          {tariff ? `${formatMAD(tariff.tarif)} / ${tariff.unit}` : "—"}
        </p>
      </div>

      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        aria-label="Retirer cette ligne"
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center self-end rounded-xl border border-navy-900/10 bg-white text-navy-500 transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-40 md:self-center"
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
