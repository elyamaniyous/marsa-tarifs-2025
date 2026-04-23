import geo from "@/data/morocco-geo.json";

const MOROCCO_FULL = geo.morocco_full as [number, number][];

// Bounding box (lon, lat) — Maroc entier (Sahara inclus, fusionné)
const LON_MIN = -17.0;
const LON_MAX = -1.0;
const LAT_MIN = 21.0;
const LAT_MAX = 36.0;

/** Project (lon, lat) → coordonnées SVG [0, width] × [0, height]. */
export function project(
  lon: number,
  lat: number,
  width = 100,
  height = 100,
  paddingX = 6,
  paddingY = 4
): [number, number] {
  const x =
    paddingX +
    ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (width - paddingX * 2);
  const y =
    paddingY +
    ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (height - paddingY * 2);
  return [x, y];
}

export function pathFromRing(
  ring: [number, number][],
  w = 100,
  h = 100,
  padX = 6,
  padY = 4
) {
  return ring
    .map(([lon, lat], i) => {
      const [x, y] = project(lon, lat, w, h, padX, padY);
      return `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

export const MOROCCO_PATH = (w = 100, h = 100, padX = 6, padY = 4) =>
  pathFromRing(MOROCCO_FULL, w, h, padX, padY);
