"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Calculator, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";

const LINKS = [
  { href: "#ports", label: "Ports" },
  { href: "#simulateur", label: "Simulateur" },
  { href: "#comparer", label: "Comparateur" },
  { href: "#tarifs", label: "Catalogue" },
  { href: "#aide", label: "Assistance" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
  });

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => void (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-4 right-4 top-4 z-50 mx-auto max-w-[min(1280px,calc(100vw-2rem))] rounded-2xl border transition-all duration-300",
          scrolled
            ? "border-navy-900/10 bg-white/90 shadow-float backdrop-blur-xl"
            : "border-white/20 bg-white/70 backdrop-blur-md"
        )}
      >
        <nav className="flex h-16 items-center justify-between px-4 md:px-6">
          <a href="#top" className="flex items-center gap-3" aria-label="Marsa Maroc — Tarifs 2025">
            <Image
              src="/marsa-logo.png"
              alt="Marsa Maroc"
              width={140}
              height={36}
              priority
              className="h-9 w-auto"
            />
            <span className="hidden h-6 w-px bg-navy-900/15 md:block" aria-hidden />
            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-navy-700 md:inline">
              Tarifs 2025
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy-800 transition-colors hover:bg-navy-900/5 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#simulateur"
              className="hidden cursor-pointer items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-glow-brand md:inline-flex"
            >
              <Calculator className="h-4 w-4" aria-hidden />
              Simuler un devis
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-navy-900/10 bg-white/60 text-navy-900 md:hidden"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-4 top-24 z-40 rounded-2xl border border-navy-900/10 bg-white/95 p-5 shadow-float backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 font-medium text-navy-800 hover:bg-navy-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#simulateur"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-medium text-white"
            >
              <Calculator className="h-4 w-4" /> Simuler un devis
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
