"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMapStore } from "@/store/mapStore";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import BuildingInfo from "@/components/panel/BuildingInfo";

import MobileSidebar from "./mobile/MobileSidebar";
import Header from "./Header";

const MapDisplay = dynamic(() => import("@/components/map/MapDisplay"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <p className="text-muted-foreground">Memuat peta...</p>
    </div>
  ),
});

export default function MobileMapWrapper() {
  const { setGeoJsonData, setAllFeatures, selectedFeature } = useMapStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("/data/RancamanyarDummy.geojson")
      .then((res) => res.json())
      .then((geojsonData) => {
        setGeoJsonData(geojsonData);
        setAllFeatures(geojsonData.features);
      })
      .catch((error) => console.error("Error memuat data GeoJSON:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-background">
      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Tombol Menu untuk membuka sidebar  */}
      <Button
        size="icon"
        variant="outline"
        className="absolute top-5 left-4 z-[1001] bg-background/80 shadow-lg"
        onClick={() => setIsMobileSidebarOpen(true)}
        title="Buka Menu"
      >
        <Menu size={20} />
      </Button>

      {/* Area Peta Utama  */}
      <main className="h-full w-full">
        <Header />
        <MapDisplay onMapCreated={() => {}} />

        {selectedFeature && (
          <div className="absolute inset-0 z-[1001] flex items-center justify-center pointer-events-none">
            <BuildingInfo />
          </div>
        )}
      </main>
    </div>
  );
}
