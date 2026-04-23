/**
 * Marsa Maroc 2025 — Tarifs Publics (extraits)
 * Source: Synthese_Tarifs_Marsa_Maroc_2025.md
 * Toutes les valeurs en MAD HT.
 */

export type Unit = "U" | "T" | "m3" | "Shift" | "Heure" | "Jour" | "Opération" | "ml" | "Passager" | "Nuit" | "Tête/Jour";

export interface TariffEntry {
  id: string;
  ports: string[]; // port codes
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

export const CONTAINER_PORTS = ["casa-dtcr", "casa-tc3", "agadir", "nador", "laayoune", "dakhla"];

export const TARIFFS: TariffEntry[] = [
  // ===== MANUTENTION CONTENEURS — harmonisé tous ports =====
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

  // ===== ROULIERS =====
  { id: "ens-pl-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers pleins", direction: "import", unit: "U", tarif: 2410.22 },
  { id: "semi-pl-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques pleines", direction: "import", unit: "U", tarif: 2570.97 },
  { id: "ens-vi-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers vides", direction: "import", unit: "U", tarif: 942.6 },
  { id: "semi-vi-imp", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques vides", direction: "import", unit: "U", tarif: 739.19 },
  { id: "ens-frais", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers pleins (Produits frais de la mer)", direction: "export", unit: "U", tarif: 1339.03 },
  { id: "ens-autres", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Ensembles routiers pleins (Autres marchandises)", direction: "export", unit: "U", tarif: 1874.68 },
  { id: "semi-frais", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques pleines (Produits frais de la mer)", direction: "export", unit: "U", tarif: 1499.77 },
  { id: "semi-autres", ports: ["casa-dtcr", "casa-dtp", "nador"], category: "manutention", subcategory: "Rouliers", label: "Semi remorques pleines (Autres marchandises)", direction: "export", unit: "U", tarif: 2035.31 },

  // ===== VÉHICULES =====
  { id: "veh-15", ports: ["casa-dtcr"], category: "manutention", subcategory: "Véhicules", label: "Véhicule ≤ 1,5 T", direction: "both", unit: "U", tarif: 371.33 },
  { id: "veh-3", ports: ["casa-dtcr"], category: "manutention", subcategory: "Véhicules", label: "Véhicule 1,5 – 3 T", direction: "both", unit: "U", tarif: 614.18 },
  { id: "veh-5", ports: ["casa-dtcr"], category: "manutention", subcategory: "Véhicules", label: "Véhicule 3 – 5 T", direction: "both", unit: "U", tarif: 699.87 },
  { id: "veh-10", ports: ["casa-dtcr"], category: "manutention", subcategory: "Véhicules", label: "Véhicule 5 – 10 T", direction: "both", unit: "U", tarif: 1428.3 },
  { id: "veh-plus10", ports: ["casa-dtcr"], category: "manutention", subcategory: "Véhicules", label: "Véhicule > 10 T", direction: "both", unit: "U", tarif: 2092.44 },

  // ===== VRACS SOLIDES IMPORT (Casablanca DTP) =====
  { id: "charbon", ports: ["casa-dtp", "mohammedia"], category: "manutention", subcategory: "Vracs solides", label: "Charbon & coke en vrac", direction: "import", unit: "T", tarif: 46.25, tarifBord: 11.59, tarifTerre: 34.66 },
  { id: "soufre", ports: ["casa-dtp", "jorf", "safi", "agadir", "mohammedia"], category: "manutention", subcategory: "Vracs solides", label: "Soufre en vrac", direction: "import", unit: "T", tarif: 39.44 },
  { id: "bauxite", ports: ["casa-dtp"], category: "manutention", subcategory: "Vracs solides", label: "Bauxite en vrac", direction: "import", unit: "T", tarif: 39.56 },
  { id: "cereales", ports: ["casa-dtp", "jorf", "safi", "agadir", "mohammedia", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Céréales quai en vrac", direction: "import", unit: "T", tarif: 52.11 },
  { id: "sucre", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Sucre brut en vrac", direction: "import", unit: "T", tarif: 54.62 },
  { id: "uree", ports: ["casa-dtp", "jorf", "safi", "agadir", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Urée en vrac", direction: "import", unit: "T", tarif: 57.37 },
  { id: "ammonitrate", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Ammonitrate en vrac", direction: "import", unit: "T", tarif: 59.64 },
  { id: "potasse", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Potasse en vrac", direction: "import", unit: "T", tarif: 64.54 },
  { id: "tourteaux", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Tourteaux en vrac", direction: "import", unit: "T", tarif: 55.93 },
  { id: "petcoke-jorf", ports: ["jorf"], category: "manutention", subcategory: "Vracs solides", label: "Coke de pétrole en vrac", direction: "import", unit: "T", tarif: 53.99 },
  { id: "gypse", ports: ["laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Gypse concassé en vrac", direction: "import", unit: "T", tarif: 41.71 },
  { id: "clinker-imp", ports: ["laayoune", "nador", "dakhla"], category: "manutention", subcategory: "Vracs solides", label: "Clinker en vrac", direction: "import", unit: "T", tarif: 29.28 },
  { id: "ciment-imp", ports: ["nador", "dakhla"], category: "manutention", subcategory: "Vracs solides", label: "Ciment en vrac", direction: "import", unit: "T", tarif: 29.28 },

  // ===== VRACS SOLIDES EXPORT =====
  { id: "fluorine", ports: ["casa-dtp", "jorf", "safi", "agadir"], category: "manutention", subcategory: "Vracs solides", label: "Fluorine en vrac", direction: "export", unit: "T", tarif: 27.25, tarifBord: 5.38, tarifTerre: 21.87 },
  { id: "barytine", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Barytine / célestine en vrac", direction: "export", unit: "T", tarif: 21.39 },
  { id: "fer", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Minerais de fer en vrac", direction: "export", unit: "T", tarif: 35.73 },
  { id: "clinker-exp", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador"], category: "manutention", subcategory: "Vracs solides", label: "Clinker en vrac", direction: "export", unit: "T", tarif: 21.99 },
  { id: "ferraille", ports: ["casa-dtp", "jorf", "safi", "agadir", "nador", "laayoune"], category: "manutention", subcategory: "Vracs solides", label: "Ferraille en vrac", direction: "export", unit: "T", tarif: 91.07 },
  { id: "sable-exp", ports: ["laayoune", "dakhla"], category: "manutention", subcategory: "Vracs solides", label: "Sable en vrac", direction: "export", unit: "T", tarif: 29.28 },
  { id: "bentonite", ports: ["nador", "safi"], category: "manutention", subcategory: "Vracs solides", label: "Bentonite en vrac", direction: "export", unit: "T", tarif: 42.13 },
  { id: "zinc", ports: ["casa-dtp", "jorf", "safi", "agadir"], category: "manutention", subcategory: "Vracs solides", label: "Zinc en vrac", direction: "export", unit: "T", tarif: 35.97 },

  // ===== HYDROCARBURES MOHAMMEDIA =====
  { id: "essence-a", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — < 5 000 T", direction: "both", unit: "T", tarif: 10.69, conditions: "< 5 000 T" },
  { id: "essence-b", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — 5 001–10 000 T", direction: "both", unit: "T", tarif: 10.29, conditions: "5 001 – 10 000 T" },
  { id: "essence-c", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — 10 001–20 000 T", direction: "both", unit: "T", tarif: 9.89, conditions: "10 001 – 20 000 T" },
  { id: "essence-d", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — 20 001–30 000 T", direction: "both", unit: "T", tarif: 9.5, conditions: "20 001 – 30 000 T" },
  { id: "essence-e", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Essence/Pétrole/Kérosène/Jet — > 30 000 T", direction: "both", unit: "T", tarif: 9.1, conditions: "> 30 000 T" },
  { id: "fuel", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Fuel-oil (toutes tranches)", direction: "both", unit: "T", tarif: 8.25 },
  { id: "brut", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Pétrole brut", direction: "both", unit: "T", tarif: 4.64 },
  { id: "gpl", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "GPL", direction: "both", unit: "T", tarif: 9.9 },
  { id: "bitume", ports: ["mohammedia"], category: "manutention", subcategory: "Hydrocarbures", label: "Bitume", direction: "both", unit: "T", tarif: 19.8 },
  { id: "acide-phos-a", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide phosphorique — < 500 KT", direction: "both", unit: "T", tarif: 12.38 },
  { id: "acide-phos-d", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Acide phosphorique — > 1,5 MT", direction: "both", unit: "T", tarif: 8.96 },
  { id: "ammoniac", ports: ["jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Ammoniac", direction: "both", unit: "T", tarif: 12.5 },
  { id: "huiles", ports: ["casa-dtp", "jorf"], category: "manutention", subcategory: "Vracs liquides", label: "Huiles végétales", direction: "both", unit: "T", tarif: 16.01 },

  // ===== PÊCHE =====
  { id: "pelagique-deb", ports: ["laayoune", "dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Débarquement poisson pélagique", direction: "import", unit: "T", tarif: 31.42 },
  { id: "hauturier", ports: ["laayoune", "dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Produits de pêche hauturière", direction: "import", unit: "T", tarif: 131.38 },
  { id: "pelagique-exp", ports: ["dakhla"], category: "manutention", subcategory: "Produits de pêche", label: "Embarquement poisson pélagique", direction: "export", unit: "T", tarif: 31.42 },

  // ===== ANIMAUX =====
  { id: "bovins", ports: ["casa-dtp"], category: "manutention", subcategory: "Animaux vivants", label: "Équidés, bovins, camelidés", direction: "both", unit: "U", tarif: 144.01 },
  { id: "ovins", ports: ["casa-dtp"], category: "manutention", subcategory: "Animaux vivants", label: "Porcins, ovins, caprins, canins", direction: "both", unit: "U", tarif: 103.98 },

  // ===== MAGASINAGE CONTENEURS =====
  { id: "mag-20-pl-5", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 20' — ≤ 5 jours", unit: "Jour", tarif: 35.73 },
  { id: "mag-20-pl-15", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 20' — 5 à 15 jours", unit: "Jour", tarif: 71.47 },
  { id: "mag-20-pl-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 20' — > 15 jours", unit: "Jour", tarif: 285.64 },
  { id: "mag-40-pl-5", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 35'/40' — ≤ 5 jours", unit: "Jour", tarif: 71.47 },
  { id: "mag-40-pl-15", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 35'/40' — 5 à 15 jours", unit: "Jour", tarif: 142.94 },
  { id: "mag-40-pl-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs pleins", label: "Conteneur 35'/40' — > 15 jours", unit: "Jour", tarif: 571.27 },
  { id: "mag-20-vi-8", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 20' vide — ≤ 8 jours", unit: "Jour", tarif: 28.56 },
  { id: "mag-20-vi-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 20' vide — > 8 jours", unit: "Jour", tarif: 48.52 },
  { id: "mag-40-vi-8", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 35'/40' vide — ≤ 8 jours", unit: "Jour", tarif: 42.91 },
  { id: "mag-40-vi-plus", ports: CONTAINER_PORTS, category: "magasinage", subcategory: "Conteneurs vides", label: "Conteneur 35'/40' vide — > 8 jours", unit: "Jour", tarif: 72.78 },

  // ===== PRESTATIONS NAVIRE — LAMANAGE =====
  { id: "amarrage-min", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Amarrage & Désamarrage — minimum de perception", unit: "Opération", tarif: 757.0 },
  { id: "amarrage-120", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Amarrage & Désamarrage — navire ≤ 120 m", unit: "ml", tarif: 8.96 },
  { id: "amarrage-120plus", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Amarrage & Désamarrage — navire > 120 m", unit: "ml", tarif: 10.4 },
  { id: "dehalage", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_navire", subcategory: "Lamanage", label: "Déhalage — minimum de perception", unit: "Opération", tarif: 511.28 },

  // ===== LOCATION ENGINS =====
  { id: "grue-34", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile portuaire 3/4 T", unit: "Heure", tarif: 832.65 },
  { id: "grue-6", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile portuaire 6 T", unit: "Heure", tarif: 1349.78 },
  { id: "grue-30", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile 30 T", unit: "Heure", tarif: 2475.24 },
  { id: "grue-45", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile 45 T", unit: "Heure", tarif: 5249.02 },
  { id: "grue-100", ports: ["casa-dtcr"], category: "location", subcategory: "Grues mobiles", label: "Grue mobile 100 T", unit: "Heure", tarif: 5998.85 },
  { id: "chariot-10", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot élévateur 10 T", unit: "Heure", tarif: 675.61 },
  { id: "chariot-30", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot élévateur 11–30 T", unit: "Heure", tarif: 899.1 },
  { id: "chariot-cavalier", ports: ["casa-dtcr"], category: "location", subcategory: "Chariots", label: "Chariot cavalier", unit: "Heure", tarif: 1499.65 },
  { id: "tracteur", ports: ["casa-dtcr"], category: "location", subcategory: "Tracteurs", label: "Tracteur à sellette", unit: "Heure", tarif: 832.65 },

  // ===== PESAGE =====
  { id: "pesage-auto", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Autres marchandises", unit: "T", tarif: 5.65 },
  { id: "pesage-min", ports: ["casa-dtcr", "casa-dtp"], category: "prestation_marchandise", subcategory: "Pesage", label: "Minimum de perception", unit: "T", tarif: 28.56 },

  // ===== DÉPOTAGE =====
  { id: "depotage-manu", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Dépotage/Empotage", label: "Conteneurs — par le manutentionnaire", unit: "U", tarif: 1071.2 },
  { id: "depotage-user", ports: ["casa-dtcr", "casa-tc3"], category: "prestation_marchandise", subcategory: "Dépotage/Empotage", label: "Conteneurs — par l'usager", unit: "U", tarif: 264.24 },

  // ===== ASSISTANCE PASSAGERS =====
  { id: "passagers", ports: ["casa-dtp"], category: "prestation_marchandise", subcategory: "Passagers", label: "Frais d'assistance aux passagers", unit: "Passager", tarif: 9.44 },
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
