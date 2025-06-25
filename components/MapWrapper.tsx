"use client";

import dynamic from "next/dynamic";

// Pindahkan semua import komponen UI ke sini
import Header from "@/components/ui/Header";
import LayerControl from "@/components/ui/LayerControl";
import BasemapControl from "@/components/ui/BasemapControl";
import LegendDisplay from "@/components/LegendDisplay";
import BuildingInfo from "@/components/BuildingInfo";

// Pindahkan dynamic import ke sini
const MapDisplay = dynamic(() => import("@/components/map/MapDisplay"), {
  ssr: false,
  loading: () => (
    <p className="h-screen w-screen flex justify-center items-center">
      Memuat peta...
    </p>
  ),
});

export default function MapWrapper() {
  return (
    <main className="relative h-screen w-screen">
      {/* UI Controls */}
      <Header />
      <LayerControl />
      <BasemapControl />
      <LegendDisplay />
      <BuildingInfo />

      {/* Map Component */}
      <MapDisplay />
    </main>
  );
}
