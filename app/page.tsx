import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsBand } from "@/components/StatsBand";
import { Marquee } from "@/components/Marquee";
import { PortsMap } from "@/components/PortsMap";
import { Simulator } from "@/components/Simulator";
import { Comparator } from "@/components/Comparator";
import { Catalog } from "@/components/Catalog";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>
      <Navbar />
      <Hero />
      <StatsBand />
      <Marquee />
      <PortsMap />
      <Simulator />
      <Comparator />
      <Catalog />
      <Footer />
    </main>
  );
}
