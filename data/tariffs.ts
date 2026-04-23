/**
 * Marsa Maroc 2025 — Tarifs Publics Complets
 * Source : 11 PDFs officiels (extracted/Tarifs_2025_*.pdf)
 * Toutes les valeurs en MAD HT.
 *
 * Couverture : manutention (conteneurs, rouliers, véhicules, vracs solides/liquides,
 * hydrocarbures, pêche, animaux, colis lourds, bois, sidérurgie, sacheries, big bags,
 * munitions, divers), magasinage, prestations navires (lamanage, nettoiement,
 * passerelles, saisissage, acheminement), location engins, pesage, dépotage.
 */

export type Unit =
  | "U"
  | "T"
  | "m3"
  | "Shift"
  | "Heure"
  | "Jour"
  | "Opération"
  | "ml"
  | "Passager"
  | "Nuit"
  | "Tête/Jour"
  | "Amarre"
  | "Main"
  | "M2/mois"
  | "Mètre linéaire/mois";

export interface TariffEntry {
  id: string;
  ports: string[];
  category: "manutention" | "magasinage" | "prestation_navire" | "location" | "prestation_marchandise";
  subcategory: string;
  label: string;
  unit: Unit;
  direction?: "import" | "export" | "both";
  tarif: number;
  tarifBord?: number;
  tarifTerre?: number;
  conditions?: string;
}

export const ALL_PORTS = [
  "casa-dtcr",
  "casa-dtp",
  "casa-tc3",
  "jorf",
  "safi",
  "agadir",
  "agadir-sma",
  "mohammedia",
  "nador",
  "laayoune",
  "dakhla",
];

export const CONTAINER_PORTS = ["casa-dtcr", "casa-tc3", "agadir", "agadir-sma", "nador", "laayoune", "dakhla"];
export const DTP_LIKE = ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune", "mohammedia"];

export const TARIFFS: TariffEntry[] = [
  /* ══════════════════════════════════════════════════════════════════════
     SECTION 1 — MANUTENTION CONTENEURS (harmonisés 2025)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "c20p-imp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 20' Plein", direction: "import", unit: "U", tarif: 1421.13 },
  { id: "c40p-imp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 40' Plein", direction: "import", unit: "U", tarif: 2249.6 },
  { id: "c20v-imp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 20' Vide", direction: "import", unit: "U", tarif: 749.83 },
  { id: "c40v-imp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 40' Vide", direction: "import", unit: "U", tarif: 1049.8 },
  { id: "c20p-exp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 20' Plein", direction: "export", unit: "U", tarif: 1271.14 },
  { id: "c40p-exp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 40' Plein", direction: "export", unit: "U", tarif: 2021.09 },
  { id: "c20v-exp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 20' Vide", direction: "export", unit: "U", tarif: 749.83 },
  { id: "c40v-exp", ports: CONTAINER_PORTS, category: "manutention", subcategory: "Conteneurs", label: "Conteneur 40' Vide", direction: "export", unit: "U", tarif: 1049.8 },
  { id: "c45p-imp", ports: ["casa-tc3"], category: "manutention", subcategory: "Conteneurs", label: "Conteneur 45' Plein", direction: "import", unit: "U", tarif: 2530.8 },
  { id: "c45p-exp", ports: ["casa-tc3"], category: "manutention", subcategory: "Conteneurs", label: "Conteneur 45' Plein", direction: "export", unit: "U", tarif: 2273.72 },
  { id: "c45v-imp", ports: ["casa-tc3"], category: "manutention", subcategory: "Conteneurs", label: "Conteneur 45' Vide", direction: "import", unit: "U", tarif: 1181.03 },
  { id: "c45v-exp", ports: ["casa-tc3"], category: "manutention", subcategory: "Conteneurs", label: "Conteneur 45' Vide", direction: "export", unit: "U", tarif: 1181.03 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 2 — ROULIERS & ENSEMBLES ROUTIERS
     ══════════════════════════════════════════════════════════════════════ */
  { id: "ens-pl-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers pleins", direction: "import", unit: "U", tarif: 2410.22 },
  { id: "semi-pl-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques pleines", direction: "import", unit: "U", tarif: 2570.97 },
  { id: "ens-vi-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers vides", direction: "import", unit: "U", tarif: 942.6 },
  { id: "semi-vi-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques vides", direction: "import", unit: "U", tarif: 739.19 },
  { id: "ens-frais", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers pleins (Produits frais de la mer)", direction: "export", unit: "U", tarif: 1339.03 },
  { id: "ens-autres", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers pleins (Autres marchandises)", direction: "export", unit: "U", tarif: 1874.68 },
  { id: "semi-frais", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques pleines (Produits frais de la mer)", direction: "export", unit: "U", tarif: 1499.77 },
  { id: "semi-autres", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques pleines (Autres marchandises)", direction: "export", unit: "U", tarif: 2035.31 },
  { id: "ens-vi-exp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers vides", direction: "export", unit: "U", tarif: 827.99 },
  { id: "semi-vi-exp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques vides", direction: "export", unit: "U", tarif: 681.23 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 3 — VÉHICULES & ENGINS (par poids)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "veh-15", ports: ["casa-dtcr", "casa-dtp"], category: "manutention", subcategory: "Véhicules", label: "Véhicule ≤ 1,5 T", direction: "both", unit: "U", tarif: 371.33 },
  { id: "veh-3", ports: ["casa-dtcr", "casa-dtp"], category: "manutention", subcategory: "Véhicules", label: "Véhicule 1,5 – 3 T", direction: "both", unit: "U", tarif: 614.18 },
  { id: "veh-5", ports: ["casa-dtcr", "casa-dtp"], category: "manutention", subcategory: "Véhicules", label: "Véhicule 3 – 5 T", direction: "both", unit: "U", tarif: 699.87 },
  { id: "veh-10", ports: ["casa-dtcr", "casa-dtp"], category: "manutention", subcategory: "Véhicules", label: "Véhicule 5 – 10 T", direction: "both", unit: "U", tarif: 1428.3 },
  { id: "veh-plus10", ports: ["casa-dtcr", "casa-dtp"], category: "manutention", subcategory: "Véhicules", label: "Véhicule > 10 T", direction: "both", unit: "U", tarif: 2092.44 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 4 — VRACS SOLIDES IMPORT
     ══════════════════════════════════════════════════════════════════════ */
  { id: "charbon-coke", ports: ["casa-dtp", "mohammedia"], category: "manutention", subcategory: "Vracs solides", label: "Charbon & coke en vrac", direction: "import", unit: "T", tarif: 46.25, tarifBord: 11.59, tarifTerre: 34.66 },
  { id: "soufre", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "mohammedia"], category: "manutention", subcategory: "Vracs solides", label: "Soufre en vrac", direction: "import", unit: "T", tarif: 39.44 },
  { id: "soufre-dtp", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Soufre en vrac (tarif DTP)", direction: "import", unit: "T", tarif: 58.56, tarifBord: 26.77, tarifTerre: 31.79 },
  { id: "bauxite", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Bauxite en vrac", direction: "import", unit: "T", tarif: 39.56, tarifBord: 10.88, tarifTerre: 28.68 },
  { id: "feldspath", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Feldspath en vrac", direction: "import", unit: "T", tarif: 31.19, tarifBord: 16.37, tarifTerre: 14.82 },
  { id: "cereales", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "mohammedia", "laayoune", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Céréales quai en vrac", direction: "import", unit: "T", tarif: 52.11, tarifBord: 16.85, tarifTerre: 35.26 },
  { id: "cereales-nador", ports: ["nador"], category: "manutention", subcategory: "Vracs solides", label: "Céréales quai en vrac (tarif Nador)", direction: "import", unit: "T", tarif: 29.28 },
  { id: "feverole", ports: ["nador"], category: "manutention", subcategory: "Vracs solides", label: "Féverole en vrac", direction: "import", unit: "T", tarif: 29.28 },
  { id: "sucre", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Sucre brut en vrac", direction: "import", unit: "T", tarif: 54.62, tarifBord: 10.04, tarifTerre: 44.58 },
  { id: "sulfate-imp", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Sulfate en vrac", direction: "import", unit: "T", tarif: 54.74, tarifBord: 27.25, tarifTerre: 27.49 },
  { id: "uree", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Urée en vrac", direction: "import", unit: "T", tarif: 57.37, tarifBord: 27.49, tarifTerre: 29.88 },
  { id: "sable-imp", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Sable en vrac", direction: "import", unit: "T", tarif: 53.66, tarifBord: 27.49, tarifTerre: 26.17 },
  { id: "alumine", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Alumine Hydrate en vrac", direction: "import", unit: "T", tarif: 53.66 },
  { id: "verre-vrac", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Verre en vrac", direction: "import", unit: "T", tarif: 53.66 },
  { id: "tourteaux", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Tourteaux en vrac", direction: "import", unit: "T", tarif: 55.93, tarifBord: 27.49, tarifTerre: 28.44 },
  { id: "tournesol", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Tournesol en vrac", direction: "import", unit: "T", tarif: 56.65, tarifBord: 22.59, tarifTerre: 34.06 },
  { id: "oleagineux", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Autres grains oléagineuses en vrac", direction: "import", unit: "T", tarif: 50.67, tarifBord: 17.33, tarifTerre: 33.34 },
  { id: "son-ble", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Son de blé en vrac", direction: "import", unit: "T", tarif: 66.21, tarifBord: 27.49, tarifTerre: 38.72 },
  { id: "aliments-betail", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Autres aliments de bétail en vrac", direction: "import", unit: "T", tarif: 60.0, tarifBord: 27.49, tarifTerre: 32.51 },
  { id: "potasse", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Potasse en vrac", direction: "import", unit: "T", tarif: 64.54, tarifBord: 27.49, tarifTerre: 37.05 },
  { id: "ammonitrate", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Ammonitrate en vrac", direction: "import", unit: "T", tarif: 59.64, tarifBord: 27.49, tarifTerre: 32.15 },
  { id: "chamotte", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Chamotte argile en vrac", direction: "import", unit: "T", tarif: 51.99, tarifBord: 25.81, tarifTerre: 26.17 },
  { id: "autres-engrais", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Autres engrais en vrac", direction: "import", unit: "T", tarif: 55.22, tarifBord: 27.49, tarifTerre: 27.73 },
  { id: "petcoke-jorf", ports: ["jorf"], category: "manutention", subcategory: "Vracs solides", label: "Coke de pétrole en vrac (Jorf)", direction: "import", unit: "T", tarif: 53.99, tarifBord: 40.08, tarifTerre: 13.91 },
  { id: "charbon-jorf", ports: ["jorf"], category: "manutention", subcategory: "Vracs solides", label: "Charbon en vrac (Jorf)", direction: "import", unit: "T", tarif: 53.55, tarifBord: 39.64, tarifTerre: 13.91 },
  { id: "petcoke-safi", ports: ["safi"], category: "manutention", subcategory: "Vracs solides", label: "Petcoke en vrac", direction: "import", unit: "T", tarif: 49.56 },
  { id: "bentonite-safi-imp", ports: ["safi"], category: "manutention", subcategory: "Vracs solides", label: "Bentonite en vrac", direction: "import", unit: "T", tarif: 42.13 },
  { id: "coke-petrole-agadir", ports: ["agadir", "agadir-sma"], category: "manutention", subcategory: "Vracs solides", label: "Coke de pétrole en vrac (Agadir)", direction: "import", unit: "T", tarif: 49.08, tarifBord: 11.03, tarifTerre: 27.01 },
  { id: "charbon-agadir", ports: ["agadir", "agadir-sma"], category: "manutention", subcategory: "Vracs solides", label: "Charbon en vrac (Agadir)", direction: "import", unit: "T", tarif: 38.93, tarifBord: 7.61, tarifTerre: 23.71 },
  { id: "gypse", ports: ["laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Gypse concassé en vrac", direction: "import", unit: "T", tarif: 41.71 },
  { id: "concentre-plomb", ports: ["nador"], category: "manutention", subcategory: "Vracs solides", label: "Concentré de plomb en vrac", direction: "import", unit: "T", tarif: 26.71 },
  { id: "clinker-imp", ports: ["laayoune", "nador", "dakhla"], category: "manutention", subcategory: "Vracs solides", label: "Clinker en vrac", direction: "import", unit: "T", tarif: 29.28 },
  { id: "clinker-imp-laayoune", ports: ["laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Clinker en vrac (Laâyoune)", direction: "import", unit: "T", tarif: 41.71 },
  { id: "ciment-imp", ports: ["nador", "dakhla"], category: "manutention", subcategory: "Vracs solides", label: "Ciment en vrac", direction: "import", unit: "T", tarif: 29.28 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 5 — VRACS SOLIDES EXPORT
     ══════════════════════════════════════════════════════════════════════ */
  { id: "fluorine", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma"], category: "manutention", subcategory: "Vracs solides", label: "Fluorine en vrac", direction: "export", unit: "T", tarif: 27.25, tarifBord: 5.38, tarifTerre: 21.87 },
  { id: "barytine", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Barytine / célestine en vrac", direction: "export", unit: "T", tarif: 21.39, tarifBord: 6.69, tarifTerre: 14.7 },
  { id: "zinc", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma"], category: "manutention", subcategory: "Vracs solides", label: "Zinc en vrac", direction: "export", unit: "T", tarif: 35.97, tarifBord: 7.29, tarifTerre: 28.68 },
  { id: "fer-exp", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Minerais de fer en vrac", direction: "export", unit: "T", tarif: 35.73, tarifBord: 6.45, tarifTerre: 29.28 },
  { id: "plomb-exp", ports: ["nador"], category: "manutention", subcategory: "Vracs solides", label: "Minerais de plomb en vrac", direction: "export", unit: "T", tarif: 35.73 },
  { id: "clinker-exp", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Clinker en vrac", direction: "export", unit: "T", tarif: 21.99, tarifBord: 6.45, tarifTerre: 15.54 },
  { id: "ferraille", ports: ["casa-dtp", "jorf", "safi", "agadir", "agadir-sma", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Ferraille en vrac", direction: "export", unit: "T", tarif: 91.07, tarifBord: 52.59, tarifTerre: 38.48 },
  { id: "kharoub", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Vracs kharoub en vrac", direction: "export", unit: "T", tarif: 63.94, tarifBord: 35.38, tarifTerre: 28.56 },
  { id: "sable-exp", ports: ["laayoune", "dakhla"], category: "manutention", subcategory: "Vracs solides", label: "Sable en vrac", direction: "export", unit: "T", tarif: 29.28 },
  { id: "bentonite-exp", ports: ["nador", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Bentonite en vrac", direction: "export", unit: "T", tarif: 42.13 },
  { id: "baryte-nador-exp", ports: ["nador"], category: "manutention", subcategory: "Vracs solides", label: "Barytine en vrac (Nador)", direction: "export", unit: "T", tarif: 21.39 },

  /* Package Engrais OCP (export) - tarifs dégressifs volume */
  { id: "ocp-a", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Package Engrais OCP — 0 à 500 KT", direction: "export", unit: "T", tarif: 68.67, conditions: "0 – 500 KT" },
  { id: "ocp-b", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Package Engrais OCP — 500 KT à 1 MT", direction: "export", unit: "T", tarif: 63.46, conditions: "500 KT – 1 MT" },
  { id: "ocp-c", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Package Engrais OCP — 1 à 1,5 MT", direction: "export", unit: "T", tarif: 58.26, conditions: "1 MT – 1,5 MT" },
  { id: "ocp-d", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Package Engrais OCP — > 1,5 MT", direction: "export", unit: "T", tarif: 53.06, conditions: "> 1,5 MT" },
  { id: "ocp-pesage", ports: ["casa-dtp", "jorf", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Package Engrais OCP — pesage", direction: "export", unit: "T", tarif: 3.12 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 6 — VRACS LIQUIDES
     ══════════════════════════════════════════════════════════════════════ */
  { id: "huiles", ports: ["casa-dtp", "jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Huiles végétales", direction: "both", unit: "T", tarif: 16.01, tarifBord: 11.35, tarifTerre: 4.66 },
  { id: "ciment-blanc", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs liquides", label: "Ciment blanc", direction: "both", unit: "T", tarif: 9.8, tarifTerre: 9.8 },
  { id: "suif", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs liquides", label: "Suif", direction: "both", unit: "T", tarif: 32.15, tarifBord: 12.43, tarifTerre: 19.72 },
  { id: "acide-phos-a", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide phosphorique — < 500 KT", direction: "both", unit: "T", tarif: 12.38, conditions: "< 500 KT" },
  { id: "acide-phos-b", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide phosphorique — 500 KT à 1 MT", direction: "both", unit: "T", tarif: 11.24, conditions: "500 KT – 1 MT" },
  { id: "acide-phos-c", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide phosphorique — 1 à 1,5 MT", direction: "both", unit: "T", tarif: 10.1, conditions: "1 MT – 1,5 MT" },
  { id: "acide-phos-d", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide phosphorique — > 1,5 MT", direction: "both", unit: "T", tarif: 8.96, conditions: "> 1,5 MT" },
  { id: "acide-sulfu", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide sulfurique", direction: "both", unit: "T", tarif: 12.5, tarifBord: 8.89, tarifTerre: 3.61 },
  { id: "ammoniac", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Ammoniac", direction: "both", unit: "T", tarif: 12.5, tarifBord: 8.89, tarifTerre: 3.61 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 7 — HYDROCARBURES (Mohammedia)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "essence-a", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — < 5 000 T", direction: "both", unit: "T", tarif: 10.69, tarifBord: 7.08, tarifTerre: 3.61, conditions: "< 5 000 T" },
  { id: "essence-b", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — 5 001 à 10 000 T", direction: "both", unit: "T", tarif: 10.29, tarifBord: 6.68, tarifTerre: 3.61, conditions: "5 001 – 10 000 T" },
  { id: "essence-c", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — 10 001 à 20 000 T", direction: "both", unit: "T", tarif: 9.89, tarifBord: 6.28, tarifTerre: 3.61, conditions: "10 001 – 20 000 T" },
  { id: "essence-d", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — 20 001 à 30 000 T", direction: "both", unit: "T", tarif: 9.5, tarifBord: 5.89, tarifTerre: 3.61, conditions: "20 001 – 30 000 T" },
  { id: "essence-e", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — > 30 000 T", direction: "both", unit: "T", tarif: 9.1, tarifBord: 5.49, tarifTerre: 3.61, conditions: "> 30 000 T" },
  { id: "gasoil-a", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Gas-oil — < 5 000 T", direction: "both", unit: "T", tarif: 10.69, conditions: "< 5 000 T" },
  { id: "gasoil-b", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Gas-oil — 5 001 à 10 000 T", direction: "both", unit: "T", tarif: 10.29, conditions: "5 001 – 10 000 T" },
  { id: "gasoil-c", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Gas-oil — 10 001 à 20 000 T", direction: "both", unit: "T", tarif: 9.89, conditions: "10 001 – 20 000 T" },
  { id: "gasoil-d", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Gas-oil — 20 001 à 30 000 T", direction: "both", unit: "T", tarif: 9.5, conditions: "20 001 – 30 000 T" },
  { id: "gasoil-e", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Gas-oil — > 30 000 T", direction: "both", unit: "T", tarif: 9.1, conditions: "> 30 000 T" },
  { id: "fuel", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Fuel-oil (toutes tranches)", direction: "both", unit: "T", tarif: 8.25, tarifBord: 4.64, tarifTerre: 3.61 },
  { id: "brut", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Pétrole brut", direction: "both", unit: "T", tarif: 4.64, tarifBord: 4.64 },
  { id: "gpl", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "GPL (toutes tranches)", direction: "both", unit: "T", tarif: 9.9 },
  { id: "bitume", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Bitume (toutes tranches)", direction: "both", unit: "T", tarif: 19.8 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 8 — PRODUITS DE PÊCHE
     ══════════════════════════════════════════════════════════════════════ */
  { id: "pelagique-deb", ports: ["laayoune", "dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Débarquement poisson pélagique", direction: "import", unit: "T", tarif: 31.42 },
  { id: "hauturier-imp", ports: ["laayoune", "dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Produits de pêche hauturière", direction: "import", unit: "T", tarif: 131.38 },
  { id: "divers-peche-imp", ports: ["dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Divers produits de pêche", direction: "import", unit: "T", tarif: 131.38 },
  { id: "pelagique-exp", ports: ["dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Embarquement poisson pélagique", direction: "export", unit: "T", tarif: 31.42 },
  { id: "hauturier-exp", ports: ["dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Produits de pêche hauturière", direction: "export", unit: "T", tarif: 131.38 },
  { id: "divers-peche-exp", ports: ["dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Divers produits de pêche", direction: "export", unit: "T", tarif: 131.38 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 9 — ANIMAUX VIVANTS
     ══════════════════════════════════════════════════════════════════════ */
  { id: "bovins", ports: ["casa-dtp"], category: "manutention", subcategory: "Animaux vivants", label: "Équidés, bovins, camelidés", direction: "both", unit: "U", tarif: 144.01, tarifBord: 72.54, tarifTerre: 71.47 },
  { id: "ovins", ports: ["casa-dtp"], category: "manutention", subcategory: "Animaux vivants", label: "Porcins, ovins, caprins, canins", direction: "both", unit: "U", tarif: 103.98, tarifBord: 68.24, tarifTerre: 35.73 },
  { id: "ovins-except", ports: ["casa-dtp"], category: "manutention", subcategory: "Animaux vivants", label: "Ovins (tarif exceptionnel)", direction: "both", unit: "U", tarif: 50.0 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 10 — MARCHANDISES CONVENTIONNELLES IMPORT — BOIS ET DÉRIVÉS (DTP)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "bois-nel", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Bois — fardeaux non élingués", direction: "import", unit: "m3", tarif: 88.44, tarifBord: 59.4, tarifTerre: 29.04 },
  { id: "bois-el", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Bois — fardeaux pré-élingués", direction: "import", unit: "m3", tarif: 65.02, tarifBord: 35.97, tarifTerre: 29.04 },
  { id: "rouleaux-pap-nel", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Rouleaux papier — non élingués", direction: "import", unit: "T", tarif: 135.17, tarifBord: 98.0, tarifTerre: 37.17 },
  { id: "rouleaux-pap-el", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Rouleaux papier — pré-élingués", direction: "import", unit: "T", tarif: 119.51, tarifBord: 82.46, tarifTerre: 37.05 },
  { id: "grumettes", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Grumettes", direction: "import", unit: "T", tarif: 60.0, tarifBord: 29.28, tarifTerre: 30.71 },
  { id: "rondins", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Rondins", direction: "import", unit: "T", tarif: 128.48, tarifBord: 80.07, tarifTerre: 48.4 },
  { id: "poteaux-tel-imp", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Poteaux télégraphiques en fardeaux", direction: "import", unit: "T", tarif: 104.1, tarifBord: 66.93, tarifTerre: 37.17 },
  { id: "grumes-peu", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Grumes de peupliers", direction: "import", unit: "T", tarif: 119.39, tarifBord: 82.34, tarifTerre: 37.05 },
  { id: "poteaux-mines-f", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Poteaux de mines (fardeaux)", direction: "import", unit: "T", tarif: 99.08, tarifBord: 66.09, tarifTerre: 32.99 },
  { id: "poteaux-mines-v", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Poteaux de mines (vrac)", direction: "import", unit: "T", tarif: 152.62, tarifBord: 97.64, tarifTerre: 54.98 },
  { id: "panneaux-fib", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Panneaux de fibres, isorèle, particules", direction: "import", unit: "T", tarif: 105.65, tarifBord: 68.48, tarifTerre: 37.17 },
  { id: "contreplaque", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Contreplaqué en fardeaux, pâte à papier", direction: "import", unit: "T", tarif: 99.55, tarifBord: 64.54, tarifTerre: 35.02 },
  { id: "pulpe-duvet", ports: ["casa-dtp"], category: "manutention", subcategory: "Bois & dérivés", label: "Pulpe de duvet (rouleaux)", direction: "import", unit: "T", tarif: 119.92, tarifBord: 84.9, tarifTerre: 35.02 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 11 — PRODUITS SIDÉRURGIQUES IMPORT (DTP)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "fer-fdx", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Fer en fardeaux, rouleaux fil machine", direction: "import", unit: "T", tarif: 100.15, tarifBord: 51.99, tarifTerre: 48.16 },
  { id: "toles-fdx", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Tôles en fardeaux", direction: "import", unit: "T", tarif: 79.83, tarifBord: 44.22, tarifTerre: 35.61 },
  { id: "bobine-10-imp", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Bobine tôles — ≤ 10 T", direction: "import", unit: "T", tarif: 84.62, tarifBord: 36.33, tarifTerre: 48.28 },
  { id: "bobine-plus-imp", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Bobine tôles — > 10 T", direction: "import", unit: "T", tarif: 168.16, tarifBord: 32.51, tarifTerre: 135.65 },
  { id: "billettes-v", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Billettes (vrac)", direction: "import", unit: "T", tarif: 117.6, tarifBord: 51.27, tarifTerre: 66.33 },
  { id: "billettes-f", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Billettes (fardeaux)", direction: "import", unit: "T", tarif: 96.57, tarifBord: 47.92, tarifTerre: 48.64 },
  { id: "fer-beton", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Fer à béton en fardeaux", direction: "import", unit: "T", tarif: 101.83, tarifBord: 53.66, tarifTerre: 48.16 },
  { id: "rail-18", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Rail < 18 m, essieux, appareil d'aiguillage", direction: "import", unit: "T", tarif: 116.17, tarifBord: 67.88, tarifTerre: 48.28 },
  { id: "rail-plus", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Rail ≥ 18 mètres", direction: "import", unit: "T", tarif: 149.03, tarifBord: 111.98, tarifTerre: 37.05 },
  { id: "divers-fer", ports: ["casa-dtp"], category: "manutention", subcategory: "Produits sidérurgiques", label: "Divers fer", direction: "import", unit: "T", tarif: 100.16, tarifBord: 51.99, tarifTerre: 48.17 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 12 — SACHERIES & PALETTES IMPORT (DTP)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "engrais-sac", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Engrais en sac", direction: "import", unit: "T", tarif: 130.39, tarifBord: 83.18, tarifTerre: 47.21 },
  { id: "ciment-sac", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Ciment en sac pré-élingués ou palettisés", direction: "import", unit: "T", tarif: 101.23, tarifBord: 60.95, tarifTerre: 40.28 },
  { id: "aliments-sac", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Aliments de bétail en sac", direction: "import", unit: "T", tarif: 122.5, tarifBord: 82.58, tarifTerre: 39.92 },
  { id: "divers-sac", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Divers sacherie", direction: "import", unit: "T", tarif: 161.1, tarifBord: 83.3, tarifTerre: 77.8 },
  { id: "sulfate-pal", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Sulfate en palettes", direction: "import", unit: "T", tarif: 113.06, tarifBord: 67.52, tarifTerre: 45.53 },
  { id: "pomme-sem", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Pomme de terre de semence en palettes", direction: "import", unit: "T", tarif: 115.09, tarifBord: 67.52, tarifTerre: 47.57 },
  { id: "ciment-pal", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Ciment en palettes", direction: "import", unit: "T", tarif: 109.0, tarifBord: 68.84, tarifTerre: 40.16 },
  { id: "carbonate-pal", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Carbonate sodium en palettes", direction: "import", unit: "T", tarif: 107.32, tarifBord: 66.93, tarifTerre: 40.4 },
  { id: "palettes-div", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Palettes diverses", direction: "import", unit: "T", tarif: 113.3, tarifBord: 67.41, tarifTerre: 45.89 },
  { id: "verre-caisse", ports: ["casa-dtp"], category: "manutention", subcategory: "Sacheries", label: "Verre en caisse", direction: "import", unit: "T", tarif: 139.74 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 13 — BIG BAGS IMPORT (DTP) — 2 modes : sortie directe vs entrée au port
     ══════════════════════════════════════════════════════════════════════ */
  { id: "bb-sodium-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Sodium en BB — sortie directe", direction: "import", unit: "T", tarif: 115.81, tarifBord: 74.82, tarifTerre: 40.99 },
  { id: "bb-sodium-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Sodium en BB — entrée au port", direction: "import", unit: "T", tarif: 109.83, tarifBord: 68.84, tarifTerre: 40.99 },
  { id: "bb-argile-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Argile en BB — sortie directe", direction: "import", unit: "T", tarif: 115.33, tarifBord: 76.25, tarifTerre: 39.08 },
  { id: "bb-argile-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Argile en BB — entrée au port", direction: "import", unit: "T", tarif: 107.8, tarifBord: 68.84, tarifTerre: 38.96 },
  { id: "bb-engrais-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Engrais en BB — sortie directe", direction: "import", unit: "T", tarif: 130.39, tarifBord: 77.44, tarifTerre: 52.94 },
  { id: "bb-engrais-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Engrais en BB — entrée au port", direction: "import", unit: "T", tarif: 123.22, tarifBord: 70.27, tarifTerre: 52.94 },
  { id: "bb-carb-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Carbonate de sodium en BB — sortie directe", direction: "import", unit: "T", tarif: 118.92, tarifBord: 77.09, tarifTerre: 41.83 },
  { id: "bb-carb-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Carbonate de sodium en BB — entrée au port", direction: "import", unit: "T", tarif: 110.79, tarifBord: 68.96, tarifTerre: 41.83 },
  { id: "bb-phos-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Phosphate en BB — sortie directe", direction: "import", unit: "T", tarif: 104.34, tarifBord: 75.05, tarifTerre: 29.28 },
  { id: "bb-phos-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Phosphate en BB — entrée au port", direction: "import", unit: "T", tarif: 96.81, tarifBord: 67.52, tarifTerre: 29.28 },
  { id: "bb-baryte-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Baryte en BB ou sacs palettisés — sortie directe", direction: "import", unit: "T", tarif: 97.52, tarifBord: 74.7, tarifTerre: 22.83 },
  { id: "bb-baryte-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Baryte en BB ou sacs palettisés — entrée au port", direction: "import", unit: "T", tarif: 89.52, tarifBord: 66.69, tarifTerre: 22.83 },
  { id: "bb-clinker-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Clinker en BB — sortie directe", direction: "import", unit: "T", tarif: 117.24, tarifBord: 76.85, tarifTerre: 40.4 },
  { id: "bb-clinker-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Clinker en BB — entrée au port", direction: "import", unit: "T", tarif: 109.24, tarifBord: 68.84, tarifTerre: 40.4 },
  { id: "bb-autres-sd", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Autres big bags — sortie directe", direction: "import", unit: "T", tarif: 133.62, tarifBord: 78.64, tarifTerre: 54.98 },
  { id: "bb-autres-ep", ports: ["casa-dtp"], category: "manutention", subcategory: "Big Bags", label: "Autres big bags — entrée au port", direction: "import", unit: "T", tarif: 125.49, tarifBord: 70.51, tarifTerre: 54.98 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 14 — CONVENTIONNELS EXPORT (DTP)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "agrumes", ports: ["casa-dtp", "agadir", "agadir-sma"], category: "manutention", subcategory: "Conventionnels export", label: "Agrumes et primeurs", direction: "export", unit: "T", tarif: 103.74, tarifBord: 66.57, tarifTerre: 37.17 },
  { id: "contreplaque-exp", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Contreplaqué en fardeaux, pâte à papier", direction: "export", unit: "T", tarif: 105.53, tarifBord: 68.36, tarifTerre: 37.17 },
  { id: "farines-sac", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Farines en sac", direction: "export", unit: "T", tarif: 163.37, tarifBord: 126.21, tarifTerre: 37.17 },
  { id: "bobine-10-exp", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Bobine tôles — ≤ 10 T", direction: "export", unit: "T", tarif: 88.2, tarifBord: 34.18, tarifTerre: 54.02 },
  { id: "bobine-plus-exp", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Bobine tôles — > 10 T", direction: "export", unit: "T", tarif: 178.31, tarifBord: 36.93, tarifTerre: 141.38 },
  { id: "divers-fer-exp", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Divers fers (Maghreb Steel)", direction: "export", unit: "T", tarif: 100.15 },
  { id: "poteaux-tel-exp", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Poteaux télégraphiques en fardeaux", direction: "export", unit: "T", tarif: 111.51, tarifBord: 74.22, tarifTerre: 37.29 },
  { id: "marbre", ports: ["casa-dtp"], category: "manutention", subcategory: "Conventionnels export", label: "Marbre", direction: "export", unit: "T", tarif: 118.32, tarifBord: 84.14, tarifTerre: 34.18 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 15 — MUNITIONS & DIVERS (DTP)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "munitions", ports: ["casa-dtp"], category: "manutention", subcategory: "Munitions", label: "Munitions", direction: "both", unit: "T", tarif: 246.2, tarifBord: 183.33, tarifTerre: 62.86 },
  { id: "pneus-dech", ports: ["casa-dtp"], category: "manutention", subcategory: "Divers", label: "Pneus déchiquetés", direction: "both", unit: "T", tarif: 91.55, tarifBord: 45.42, tarifTerre: 46.13 },
  { id: "touret", ports: ["casa-dtp"], category: "manutention", subcategory: "Divers", label: "Touret en vrac", direction: "both", unit: "T", tarif: 195.17, tarifBord: 120.95, tarifTerre: 74.22 },
  { id: "lingots-zinc", ports: ["casa-dtp"], category: "manutention", subcategory: "Divers", label: "Lingots de zinc", direction: "both", unit: "T", tarif: 125.49, tarifBord: 45.65, tarifTerre: 79.83 },
  { id: "divers-dtp", ports: ["casa-dtp"], category: "manutention", subcategory: "Divers", label: "Divers", direction: "both", unit: "T", tarif: 155.49, tarifBord: 118.44, tarifTerre: 37.05 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 16 — COLIS LOURDS (DTCR)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "colis-manu", ports: ["casa-dtcr"], category: "manutention", subcategory: "Colis lourds", label: "Manutention colis lourds", direction: "both", unit: "T", tarif: 339.28, tarifBord: 245.12, tarifTerre: 94.17 },
  { id: "colis-grut-55-op", ports: ["casa-dtcr", "casa-tc3"], category: "manutention", subcategory: "Colis lourds", label: "Grutage forfait 20 < T ≤ 55 (opération)", direction: "both", unit: "Opération", tarif: 2599.53 },
  { id: "colis-grut-55-t", ports: ["casa-dtcr", "casa-tc3"], category: "manutention", subcategory: "Colis lourds", label: "Grutage forfait 20 < T ≤ 55 (tonne manipulée)", direction: "both", unit: "T", tarif: 198.51 },
  { id: "colis-grut-55plus-op", ports: ["casa-dtcr", "casa-tc3"], category: "manutention", subcategory: "Colis lourds", label: "Grutage forfait T > 55 (opération)", direction: "both", unit: "Opération", tarif: 4124.88 },
  { id: "colis-grut-55plus-t", ports: ["casa-dtcr", "casa-tc3"], category: "manutention", subcategory: "Colis lourds", label: "Grutage forfait T > 55 (tonne manipulée)", direction: "both", unit: "T", tarif: 329.98 },
  { id: "plat-pont", ports: ["casa-dtcr"], category: "manutention", subcategory: "Colis lourds", label: "Marchandises à plat pont navires rouliers", direction: "both", unit: "T", tarif: 28.44 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 17 — MANIPULATION CONTENEURS (DTCR + TC3)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "tc-tp-20", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "TC 20' sur terre plein", unit: "U", tarif: 114.25 },
  { id: "tc-tp-40", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "TC 35'/40' sur terre plein", unit: "U", tarif: 164.21 },
  { id: "tc-nm-sp-20", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "TC non manifesté sans passage quai — 20'", unit: "U", tarif: 1392.57 },
  { id: "tc-nm-sp-40", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "TC non manifesté sans passage quai — 35'/40'", unit: "U", tarif: 1963.96 },
  { id: "tc-nm-ap-20", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "TC non manifesté avec passage quai — 20'", unit: "U", tarif: 1871.1 },
  { id: "tc-nm-ap-40", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "TC non manifesté avec passage quai — 35'/40'", unit: "U", tarif: 2570.97 },
  { id: "tc-trans-20", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "Transfert TC 20' entre terminaux", unit: "U", tarif: 999.85 },
  { id: "tc-trans-40", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "Transfert TC 40' entre terminaux", unit: "U", tarif: 1142.67 },
  { id: "tc-vide-exp", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "Déchargement TC vides export — zones dédiées", unit: "U", tarif: 43.74 },
  { id: "tc-wagons", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Manipulation TC", label: "Acheminement conteneurs vides vers wagons", unit: "U", tarif: 220.82 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 18 — DÉPOTAGE / EMPOTAGE
     ══════════════════════════════════════════════════════════════════════ */
  { id: "depotage-tc-manu", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Dépotage/Empotage", label: "Conteneurs — par le manutentionnaire", unit: "U", tarif: 1071.2 },
  { id: "depotage-tc-user", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Dépotage/Empotage", label: "Conteneurs — par l'usager", unit: "U", tarif: 264.24 },
  { id: "depotage-rem-manu", ports: ["casa-dtcr"], category: "prestation_marchandise", subcategory: "Dépotage/Empotage", label: "Remorques/Camions TIR — par le manutentionnaire", unit: "U", tarif: 999.85 },
  { id: "depotage-rem-user", ports: ["casa-dtcr"], category: "prestation_marchandise", subcategory: "Dépotage/Empotage", label: "Remorques/Camions TIR — par l'usager", unit: "U", tarif: 192.77 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 19 — PESAGE
     ══════════════════════════════════════════════════════════════════════ */
  { id: "pesage-auto", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Autres marchandises", unit: "T", tarif: 5.65 },
  { id: "pesage-min", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Minimum de perception", unit: "T", tarif: 28.56 },
  { id: "pesage-detail", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Détail de pesée (sur demande)", unit: "T", tarif: 28.56 },
  { id: "pesage-minerais", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Minerais en vrac (coke, charbon inclus)", unit: "T", tarif: 2.23 },
  { id: "pesage-agrumes", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Agrumes et primeurs", unit: "T", tarif: 2.89 },
  { id: "pesage-cereales", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Céréales vrac ou sacs (blé, orge, maïs)", unit: "T", tarif: 2.89 },
  { id: "pesage-billettes", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Billettes de fer en fardeaux", unit: "T", tarif: 2.89 },
  { id: "pesage-celestine", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Célestine, calamine", unit: "T", tarif: 2.89 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 20 — LOCATION MATÉRIEL (au shift)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "mat-remorque-25", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Remorque 2,5 T", unit: "Shift", tarif: 96.45 },
  { id: "mat-remorque-9", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Remorque 6 à 9 T", unit: "Shift", tarif: 288.5 },
  { id: "mat-remorque-25t", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Remorque 10 à 25 T", unit: "Shift", tarif: 477.1 },
  { id: "mat-remorque-tc", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Remorques TC entreposage colis lourds", unit: "Shift", tarif: 825.6 },
  { id: "colis-25t-lourd", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Colis lourds poids > 25 T", unit: "T", tarif: 785.56 },
  { id: "spreader", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Spreader à conteneurs mécaniques", unit: "Shift", tarif: 192.77 },
  { id: "cadre-primeurs", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Cadre à primeurs", unit: "Shift", tarif: 58.56 },
  { id: "elingue", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Élingue, patte à quatre, patte à fût, filet", unit: "Shift", tarif: 39.32 },
  { id: "palette", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Palette", unit: "Shift", tarif: 30.0 },
  { id: "plateau", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Plateau, disque à palanquées", unit: "Shift", tarif: 39.32 },
  { id: "bache", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Bâche", unit: "Shift", tarif: 14.94 },
  { id: "col-cygne", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Col de cygne", unit: "Shift", tarif: 225.64 },
  { id: "barrieres", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Barrières", unit: "Shift", tarif: 44.94 },
  { id: "app-camions", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Appareil pour débarquement des camions", unit: "Shift", tarif: 552.03 },
  { id: "app-voitures", ports: ["casa-dtcr"], category: "location", subcategory: "Matériel divers", label: "Appareil pour débarquement des voitures", unit: "Shift", tarif: 276.43 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 21 — ENGINS COLIS LOURDS (forfait mise à disposition)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "grue-20-25-f", ports: ["casa-dtcr"], category: "location", subcategory: "Engins colis lourds", label: "Grue ≤ 20 T et ≤ 25 T (forfait)", unit: "Opération", tarif: 7141.23 },
  { id: "grue-25plus-f", ports: ["casa-dtcr"], category: "location", subcategory: "Engins colis lourds", label: "Grue > 25 T (forfait)", unit: "Opération", tarif: 21424.42 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 22 — LOCATION ENGINS À L'HEURE
     ══════════════════════════════════════════════════════════════════════ */
  { id: "grue-34", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile portuaire 3/4 T", unit: "Heure", tarif: 832.65 },
  { id: "grue-parc", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue de parc à conteneurs vides", unit: "Heure", tarif: 1199.79 },
  { id: "grue-6", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile portuaire 6 T", unit: "Heure", tarif: 1349.78 },
  { id: "grue-30", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile 30 T", unit: "Heure", tarif: 2475.24 },
  { id: "grue-45", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile 45 T", unit: "Heure", tarif: 5249.02 },
  { id: "grue-100", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile 100 T", unit: "Heure", tarif: 5998.85 },
  { id: "chariot-10m", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot élévateur < 10 T", unit: "Heure", tarif: 375.63 },
  { id: "chariot-10", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot élévateur 10 T", unit: "Heure", tarif: 675.61 },
  { id: "chariot-30", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot élévateur 11–30 T", unit: "Heure", tarif: 899.1 },
  { id: "chariot-30plus", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot élévateur > 30 T", unit: "Heure", tarif: 1125.46 },
  { id: "chariot-cavalier", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot cavalier", unit: "Heure", tarif: 1499.65 },
  { id: "tracteur-s", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Tracteur", unit: "Heure", tarif: 375.63 },
  { id: "tracteur-sellette", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Tracteur à sellette", unit: "Heure", tarif: 832.65 },
  { id: "camion-benne", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Camion benne", unit: "Heure", tarif: 832.65 },
  { id: "camion-coffre", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Camion porte-coffre", unit: "Heure", tarif: 832.65 },
  { id: "camion-nacelle", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Camion nacelle", unit: "Heure", tarif: 899.82 },
  { id: "vedette", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Vedette pélican", unit: "Heure", tarif: 1799.63 },
  { id: "porte-char", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs & camions", label: "Porte-char 40 tonnes", unit: "Heure", tarif: 749.83 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 23 — MOYENS HUMAINS & NETTOIEMENT
     ══════════════════════════════════════════════════════════════════════ */
  { id: "agent-shift", ports: ["casa-dtcr"], category: "prestation_marchandise", subcategory: "Moyens humains", label: "Agent (mise à disposition)", unit: "Shift", tarif: 321.37 },
  { id: "nettoiement-tp", ports: ["casa-dtcr"], category: "prestation_marchandise", subcategory: "Nettoiement", label: "Nettoiement terres pleins, magasins, hangars", unit: "Opération", tarif: 714.09 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 24 — MAGASINAGE CONTENEURS (harmonisés)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "mag-20-pl-5", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 20' plein — ≤ 5 jours", unit: "Jour", tarif: 35.73 },
  { id: "mag-20-pl-15", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 20' plein — 5 à 15 jours", unit: "Jour", tarif: 71.47 },
  { id: "mag-20-pl-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 20' plein — > 15 jours", unit: "Jour", tarif: 285.64 },
  { id: "mag-40-pl-5", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 35'/40' plein — ≤ 5 jours", unit: "Jour", tarif: 71.47 },
  { id: "mag-40-pl-15", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 35'/40' plein — 5 à 15 jours", unit: "Jour", tarif: 142.94 },
  { id: "mag-40-pl-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 35'/40' plein — > 15 jours", unit: "Jour", tarif: 571.27 },
  { id: "mag-20-vi-8", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 20' vide — ≤ 8 jours", unit: "Jour", tarif: 28.56 },
  { id: "mag-20-vi-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 20' vide — > 8 jours", unit: "Jour", tarif: 48.52 },
  { id: "mag-40-vi-8", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 35'/40' vide — ≤ 8 jours", unit: "Jour", tarif: 42.91 },
  { id: "mag-40-vi-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 35'/40' vide — > 8 jours", unit: "Jour", tarif: 72.78 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 25 — MAGASINAGE VÉHICULES ROUTIERS (RORO/Car Ferries)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "mag-rem-2", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Remorque plein — ≤ 2 jours", unit: "Jour", tarif: 142.82 },
  { id: "mag-rem-5", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Remorque plein — 3 à 5 jours", unit: "Jour", tarif: 171.38 },
  { id: "mag-rem-plus", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Remorque plein — > 5 jours", unit: "Jour", tarif: 342.76 },
  { id: "mag-ens-2", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Ensemble routier plein — ≤ 2 jours", unit: "Jour", tarif: 171.38 },
  { id: "mag-ens-5", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Ensemble routier plein — 3 à 5 jours", unit: "Jour", tarif: 214.29 },
  { id: "mag-ens-plus", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Ensemble routier plein — > 5 jours", unit: "Jour", tarif: 428.45 },
  { id: "mag-vr-vide", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Rouliers", label: "Véhicule routier vide", unit: "Jour", tarif: 428.45 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 26 — MAGASINAGE VÉHICULES SUR ROUES
     ══════════════════════════════════════════════════════════════════════ */
  { id: "mag-veh-5000", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Véhicules", label: "Véhicules P ≤ 5 000 kg", unit: "Jour", tarif: 52.47 },
  { id: "mag-veh-5000plus", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Véhicules", label: "Véhicules P > 5 000 kg", unit: "Jour", tarif: 68.96 },
  { id: "mag-dedouanement", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Dédouanement", label: "Dépotage total/partiel — droit de stationnement", unit: "Jour", tarif: 285.64 },
  { id: "mag-dedoua-sans", ports: ["casa-dtcr"], category: "magasinage", subcategory: "Dédouanement", label: "Dédouanement sans dépotage", unit: "Jour", tarif: 285.64 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 27 — MAGASINAGE DTP (formules)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "mag-anim", ports: ["casa-dtp"], category: "magasinage", subcategory: "Animaux vivants", label: "Animaux vivants", unit: "Tête/Jour", tarif: 18.52 },
  { id: "mag-dff-ch", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Magasin DFF", label: "Chargement/déchargement sur camions au magasin DFF", unit: "T", tarif: 51.25 },
  { id: "mag-dff-mv", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Magasin DFF", label: "Mouvement marchandise dépotée au magasin DFF", unit: "T", tarif: 51.25 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 28 — OCCUPATION PARCELLE & LOCOTRACTEUR (DTP)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "occupation-parc", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Occupation parcelle", label: "Occupation de parcelle par minerais", unit: "M2/mois", tarif: 9.08 },
  { id: "mur-cloture", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Occupation parcelle", label: "Location d'élément de mur de clôture", unit: "Mètre linéaire/mois", tarif: 40.04 },
  { id: "locotracteur", ports: ["casa-dtp"], category: "location", subcategory: "Locotracteur", label: "Location locotracteur terminal minéralier", unit: "T", tarif: 3.94 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 29 — ASSISTANCE PASSAGERS
     ══════════════════════════════════════════════════════════════════════ */
  { id: "passagers", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Passagers", label: "Assistance aux passagers", unit: "Passager", tarif: 9.44 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 30 — LAMANAGE (amarrage/désamarrage/déhalage)
     ══════════════════════════════════════════════════════════════════════ */
  { id: "amarrage-min", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Lamanage", label: "Amarrage & désamarrage — minimum de perception", unit: "Opération", tarif: 757.0 },
  { id: "amarrage-120", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Lamanage", label: "Amarrage & désamarrage — navire ≤ 120 m", unit: "ml", tarif: 8.96 },
  { id: "amarrage-120plus", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Lamanage", label: "Amarrage & désamarrage — navire > 120 m", unit: "ml", tarif: 10.4 },
  { id: "dehalage-min", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Lamanage", label: "Déhalage — minimum de perception", unit: "Opération", tarif: 511.28 },
  { id: "dehalage-120", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Lamanage", label: "Déhalage — navire ≤ 120 m", unit: "ml", tarif: 5.98 },
  { id: "dehalage-120plus", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Lamanage", label: "Déhalage — navire > 120 m", unit: "ml", tarif: 7.41 },
  { id: "amarres-fixes-e", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Envoi d'amarres sur ouvrages fixes/terre — entrée", unit: "Amarre", tarif: 106.37 },
  { id: "amarres-fixes-s", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Envoi d'amarres sur ouvrages fixes/terre — sortie", unit: "Amarre", tarif: 57.13 },
  { id: "amarres-fixes-d", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Envoi d'amarres sur ouvrages fixes/terre — déhalage", unit: "Amarre", tarif: 160.63 },
  { id: "amarres-coffres-e", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Envoi d'amarres sur coffres — entrée", unit: "Amarre", tarif: 167.8 },
  { id: "amarres-coffres-s", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Envoi d'amarres sur coffres — sortie", unit: "Amarre", tarif: 99.32 },
  { id: "amarres-coffres-d", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Envoi d'amarres sur coffres — déhalage", unit: "Amarre", tarif: 187.87 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 31 — NETTOIEMENT QUAI
     ══════════════════════════════════════════════════════════════════════ */
  { id: "nettoiement-quai", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Nettoiement", label: "Nettoiement quai par camion ou benne et par opération", unit: "Opération", tarif: 714.09 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 32 — PASSERELLES MOBILES
     ══════════════════════════════════════════════════════════════════════ */
  { id: "passerelle-coupe", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Passerelles", label: "Passerelles de coupé", unit: "Opération", tarif: 571.27 },
  { id: "taintene", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Passerelles", label: "Taintène", unit: "Opération", tarif: 285.64 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 33 — AUTRES PRESTATIONS NAVIRES
     ══════════════════════════════════════════════════════════════════════ */
  { id: "saisissage", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Saisissage", label: "Saisissage et désaisissage par navires", unit: "Main", tarif: 8569.7 },
  { id: "panneaux-cales", ports: ["casa-dtcr", "casa-dtp", "casa-tc3"], category: "prestation_navire", subcategory: "Manutention navire", label: "Ouverture/fermeture panneaux de cales ou faux ponts", unit: "Opération", tarif: 675.61 },
  { id: "package-prefab", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Manutention navire", label: "Package traitement modules préfabriqués export", unit: "U", tarif: 6758.69 },
  { id: "gerbage-baryte", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Manutention navire", label: "Gerbage sous palan baryte vrac export", unit: "T", tarif: 4.87 },

  /* ══════════════════════════════════════════════════════════════════════
     SECTION 34 — NAVIRE NON DÉCOMMANDÉ
     ══════════════════════════════════════════════════════════════════════ */
  { id: "navire-ndc-tc", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_navire", subcategory: "Navire non décommandé", label: "TC, vracs solides et marchandises diverses", unit: "Heure", tarif: 3465.88 },
  { id: "navire-ndc-liq", ports: ["casa-dtcr"], category: "prestation_navire", subcategory: "Navire non décommandé", label: "Vracs liquides ou solides par pompage", unit: "Heure", tarif: 932.2 },
  { id: "navire-nuit", ports: ["casa-dtcr"], category: "prestation_marchandise", subcategory: "Autres", label: "Véhicules/engins transport non passible magasinage", unit: "Nuit", tarif: 285.64 },
];

export function getTariffsByPort(portCode: string) {
  return TARIFFS.filter((t) => t.ports.includes(portCode));
}

export function getTariffsByCategory(category: TariffEntry["category"]) {
  return TARIFFS.filter((t) => t.category === category);
}

export function getSubcategories(portCode: string, category?: TariffEntry["category"]) {
  const list = category
    ? TARIFFS.filter((t) => t.ports.includes(portCode) && t.category === category)
    : TARIFFS.filter((t) => t.ports.includes(portCode));
  return Array.from(new Set(list.map((t) => t.subcategory)));
}
