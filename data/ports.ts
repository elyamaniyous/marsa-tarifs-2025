export type PortSpecialty = "conteneur" | "vrac" | "hydrocarbure" | "peche" | "polyvalent";

export interface Port {
  code: string;
  name: string;
  city: string;
  terminals?: string[];
  region: "Atlantique Nord" | "Atlantique Centre" | "Atlantique Sud" | "Méditerranée";
  specialties: PortSpecialty[];
  highlight: string;
  tagline: string;
  coords: { lon: number; lat: number };
  volume: string;
  established?: string;
}

export const PORTS: Port[] = [
  {
    code: "casa-dtcr",
    name: "Casablanca · DTCR",
    city: "Casablanca",
    terminals: ["Conteneurs", "Roulier"],
    region: "Atlantique Centre",
    specialties: ["conteneur", "polyvalent"],
    highlight: "Division Terminaux à Conteneurs et Roulier — tarifs unifiés 3×8",
    tagline: "Le hub containers du royaume",
    coords: { lon: -7.60, lat: 33.60 },
    volume: "1,8 M EVP",
    established: "1923",
  },
  {
    code: "casa-dtp",
    name: "Casablanca · DTP",
    city: "Casablanca",
    terminals: ["Vracs", "Divers"],
    region: "Atlantique Centre",
    specialties: ["vrac", "polyvalent"],
    highlight: "Division Trafic Polyvalent — vracs solides, liquides & conventionnels",
    tagline: "Polyvalence industrielle",
    coords: { lon: -7.61, lat: 33.62 },
    volume: "12 M T",
  },
  {
    code: "casa-tc3",
    name: "Casablanca · TC3",
    city: "Casablanca",
    terminals: ["Terminal à Conteneurs 3"],
    region: "Atlantique Centre",
    specialties: ["conteneur"],
    highlight: "Terminal à Conteneurs 3 — trafic conteneurisé premium",
    tagline: "Le terminal nouvelle génération",
    coords: { lon: -7.62, lat: 33.61 },
    volume: "600 K EVP",
  },
  {
    code: "jorf",
    name: "Jorf Lasfar",
    city: "El Jadida",
    region: "Atlantique Centre",
    specialties: ["vrac", "hydrocarbure"],
    highlight: "Port industriel spécialisé — vracs solides et liquides",
    tagline: "Moteur industriel du Maroc",
    coords: { lon: -8.63, lat: 33.11 },
    volume: "26 M T",
  },
  {
    code: "safi",
    name: "Safi",
    city: "Safi",
    region: "Atlantique Centre",
    specialties: ["vrac", "polyvalent"],
    highlight: "Port polyvalent — vracs solides & marchandises conventionnelles",
    tagline: "Port phosphatier historique",
    coords: { lon: -9.24, lat: 32.30 },
    volume: "5 M T",
  },
  {
    code: "agadir",
    name: "Agadir",
    city: "Agadir",
    region: "Atlantique Sud",
    specialties: ["polyvalent", "conteneur"],
    highlight: "Port polyvalent — agrumes, primeurs, conteneurs, vracs",
    tagline: "La porte export du Sud",
    coords: { lon: -9.61, lat: 30.42 },
    volume: "4 M T",
  },
  {
    code: "agadir-sma",
    name: "Agadir · SMA",
    city: "Agadir",
    terminals: ["Quai Nord"],
    region: "Atlantique Sud",
    specialties: ["polyvalent"],
    highlight: "Terminal Quai Nord (SMA) — société de manutention d'Agadir",
    tagline: "Terminal spécialisé primeurs",
    coords: { lon: -9.63, lat: 30.44 },
    volume: "1,2 M T",
  },
  {
    code: "mohammedia",
    name: "Mohammedia",
    city: "Mohammedia",
    region: "Atlantique Centre",
    specialties: ["hydrocarbure"],
    highlight: "Spécialisé hydrocarbures — tarifs dégressifs par tranche",
    tagline: "Le port énergie",
    coords: { lon: -7.38, lat: 33.72 },
    volume: "10 M T",
  },
  {
    code: "nador",
    name: "Nador",
    city: "Nador",
    region: "Méditerranée",
    specialties: ["polyvalent", "conteneur", "vrac"],
    highlight: "Port méditerranéen — vracs, conteneurs, marchandises conventionnelles",
    tagline: "Porte de la Méditerranée",
    coords: { lon: -2.93, lat: 35.17 },
    volume: "3 M T",
  },
  {
    code: "laayoune",
    name: "Laâyoune",
    city: "Laâyoune",
    region: "Atlantique Sud",
    specialties: ["vrac", "peche"],
    highlight: "Vracs solides, produits de pêche, sable",
    tagline: "Sud atlantique, pêche & phosphates",
    coords: { lon: -13.20, lat: 27.10 },
    volume: "9 M T",
  },
  {
    code: "dakhla",
    name: "Dakhla",
    city: "Dakhla",
    region: "Atlantique Sud",
    specialties: ["peche", "polyvalent"],
    highlight: "Produits de pêche et trafic régional",
    tagline: "Le Grand Sud maritime",
    coords: { lon: -15.93, lat: 23.70 },
    volume: "1 M T",
  },
];

export const SPECIALTY_LABEL: Record<PortSpecialty, string> = {
  conteneur: "Conteneurs",
  vrac: "Vracs",
  hydrocarbure: "Hydrocarbures",
  peche: "Pêche",
  polyvalent: "Polyvalent",
};

export const REGION_LABEL: Record<Port["region"], string> = {
  "Atlantique Nord": "Atlantique Nord",
  "Atlantique Centre": "Atlantique Centre",
  "Atlantique Sud": "Atlantique Sud",
  "Méditerranée": "Méditerranée",
};
