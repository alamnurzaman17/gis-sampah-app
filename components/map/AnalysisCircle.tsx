"use client";

import React from "react";

import { useMemo } from "react";
import { useMapStore } from "@/store/mapStore";
import { Circle } from "react-leaflet";
import L from "leaflet";
import type { AppSpecificBuildingFeature } from "@/types";

// Helper untuk mendapatkan pusat poligon, pastikan sama dengan yang di mapStore
async function getPolygonCenter(
  feature: AppSpecificBuildingFeature
): Promise<L.LatLng> {
  const L = (await import("leaflet")).default;
  const coords = feature.geometry.coordinates[0][0];
  const latSum = coords.reduce((sum, p) => sum + p[1], 0);
  const lngSum = coords.reduce((sum, p) => sum + p[0], 0);
  return L.latLng(latSum / coords.length, lngSum / coords.length);
}

export function AnalysisCircle() {
  const { isRadiusAnalysisActive, selectedFeature, analysisRadius } =
    useMapStore();
  const [center, setCenter] = React.useState<L.LatLng | null>(null);

  // Hitung ulang pusat lingkaran hanya saat selectedFeature berubah
  useMemo(() => {
    if (selectedFeature) {
      getPolygonCenter(selectedFeature as AppSpecificBuildingFeature).then(
        setCenter
      );
    } else {
      setCenter(null);
    }
  }, [selectedFeature]);

  // Jangan render apapun jika analisis tidak aktif atau pusat belum dihitung
  if (!isRadiusAnalysisActive || !center) {
    return null;
  }

  // Tentukan style untuk lingkaran
  const circleOptions = {
    color: "#D946EF", // Warna border (magenta)
    fillColor: "#D946EF", // Warna isian
    fillOpacity: 0.1, // Buat isian sangat transparan
    weight: 1.5, // Ketebalan border
  };

  return (
    <Circle
      center={center}
      radius={analysisRadius}
      pathOptions={circleOptions}
    />
  );
}
