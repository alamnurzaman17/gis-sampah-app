// components/map/ChangeView.tsx
"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface ChangeViewProps {
  center: LatLngExpression | null;
  zoom?: number;
}

export function ChangeView({ center, zoom }: ChangeViewProps) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      // Pindahkan peta dengan animasi ke lokasi baru
      map.flyTo(center, zoom || 15); // Beri zoom default (misal 15) jika tidak ada
    }
  }, [center, zoom, map]); // Efek ini berjalan setiap kali 'center' berubah

  return null; // Komponen ini tidak merender UI
}
