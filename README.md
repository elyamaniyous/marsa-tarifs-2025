# Marsa Maroc · Tarifs Publics 2025

Prototype d'expérience tarifaire pour le réseau portuaire marocain : 11 terminaux, 420+ familles tarifaires, simulateur temps réel, comparateur, catalogue intégral.

**Données source :** grille publique 2025 [publiée par Marsa Maroc](https://www.marsamaroc.co.ma/fr/espace-client/tarification). Toutes les valeurs sont en MAD hors taxes.

## Stack

- Next.js 15 (App Router, Turbopack, React 19)
- TypeScript strict, Tailwind v4 (`@theme inline`)
- Motion v12 (ex-framer-motion)
- Lucide React
- Silhouette Maroc via concave-hull d'un GeoJSON Natural Earth + Sahara Occidental unifié

## Développement local

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build
```

## Déploiement

Railway détecte `railway.json` → build via `Dockerfile` (Next.js standalone) → démarre `node server.js`.

```bash
railway up
```

## Structure

- `app/` — layout + page racine (server components par défaut)
- `components/` — sections client (Navbar, Hero, PortsMap, Simulator, Comparator, Catalog, Footer, StatsBand, Marquee)
- `data/` — dataset tarifaire + GeoJSON Maroc
- `lib/` — helpers (projection géographique, `cn`, formattage MAD)

Branding : logo officiel Marsa Maroc, palette extraite du logo (`#1A3768` navy + `#007CBB` brand).
