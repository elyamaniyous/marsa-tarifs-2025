"use client";

import { motion, useInView, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Ship, Warehouse, Globe2, ShieldCheck } from "lucide-react";

const STATS = [
  { value: 40, suffix: " M T", label: "Trafic annuel opéré", Icon: Ship, color: "tide" },
  { value: 11, suffix: "", label: "Terminaux au Maroc", Icon: Globe2, color: "copper" },
  { value: 2, suffix: " M+ EVP", label: "Capacité conteneurs", Icon: Warehouse, color: "tide" },
  { value: 100, suffix: "%", label: "Tarifs publics 2025", Icon: ShieldCheck, color: "copper" },
];

export function StatsBand() {
  return (
    <section className="relative -mt-10 py-14">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4 rounded-3xl border border-navy-900/10 bg-white/75 p-6 shadow-soft backdrop-blur-xl md:grid-cols-4 md:p-8"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-soft ${
                    s.color === "tide" ? "bg-brand-600" : "bg-brand-500"
                  }`}
                  aria-hidden
                >
                  <s.Icon className="h-4 w-4" />
                </span>
                <div className="flex items-baseline gap-1">
                  <Counter target={s.value} />
                  <span className="font-display text-xl font-medium text-navy-600 md:text-2xl">
                    {s.suffix}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-navy-700">
                {s.label}
              </p>
              {i < STATS.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-navy-900/10 md:block" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) spring.set(target);
  }, [inView, spring, target]);

  return (
    <motion.span
      ref={ref}
      className="font-display text-3xl font-semibold leading-none text-navy-900 md:text-4xl"
    >
      {display}
    </motion.span>
  );
}
