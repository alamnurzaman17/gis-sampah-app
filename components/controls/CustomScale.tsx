"use client";

import { useState, useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import L from "leaflet"; // Impor L untuk mengakses LatLng

// Helper function untuk memformat jarak (tidak berubah)
function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(2)} km`;
}

export const CustomScale = () => {
  const map = useMap();
  const [scaleText, setScaleText] = useState("");

  const updateScale = () => {
    const bounds = map.getBounds();
    const center = map.getCenter();

    // --- PERBAIKAN DI SINI ---
    // Buat titik koordinat baru di tepi timur peta dengan latitude yang sama dengan pusat.
    const eastPoint = L.latLng(center.lat, bounds.getEast());

    // Sekarang hitung jarak ke titik yang valid ini.
    const meters = center.distanceTo(eastPoint);
    // --- AKHIR PERBAIKAN ---

    // Perkirakan lebar skala yang representatif (sekitar 1/4 lebar peta)
    const scaleWidth = meters / 2;

    // Bulatkan ke angka "cantik" (1, 2, 5, 10, 20, 50, ...)
    const powers = [
      1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000,
    ];
    let niceDistance = 0;
    for (let i = powers.length - 1; i >= 0; i--) {
      if (scaleWidth > powers[i]) {
        niceDistance = powers[i];
        break;
      }
    }
    if (niceDistance === 0) niceDistance = scaleWidth;

    setScaleText(formatDistance(niceDistance));
  };

  // Gunakan useMapEvents untuk mendengarkan event peta
  useMapEvents({
    zoomend: updateScale,
    moveend: updateScale,
  });

  // Panggil sekali saat pertama kali render
  useEffect(() => {
    // Beri sedikit jeda agar peta benar-benar siap saat pertama kali load
    const timer = setTimeout(() => updateScale(), 100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  if (!scaleText) return null;

  return (
    <div
      className="leaflet-control leaflet-control-scale"
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        padding: "2px 5px",
        borderRadius: "3px",
        fontSize: "11px",
        color: "#333",
        textShadow: "1px 1px #fff",
      }}
    >
      {scaleText}
    </div>
  );
};
