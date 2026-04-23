"use client";

import Image from "next/image";
import type { PortSpecialty } from "@/data/ports";

/**
 * Affiche la carte officielle fournie (public/marsa-map.png) telle quelle,
 * sans modification, sans overlay dessiné par-dessus.
 */
interface Props {
  hovered?: string | null;
  filter?: PortSpecialty | "all";
  onHover?: (code: string | null) => void;
  showLogo?: boolean;
}

export function MarsaMap(_props: Props) {
  return (
    <div className="relative h-full w-full">
      <Image
        src="/marsa-map.png"
        alt="Carte du Maroc — réseau Marsa Maroc (ports et filiales)"
        fill
        priority
        sizes="(max-width: 768px) 90vw, 460px"
        className="object-contain"
      />
    </div>
  );
}
