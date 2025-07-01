"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMapStore } from "@/store/mapStore";
import { Map as LeafletMap } from "leaflet";

import Header from "@/components/layout/Header";
// import LayerControl from "@/components/controls/LayerControl";
import LegendDisplay from "@/components/panel/LegendDisplay";
// Komponen kartu informasi yang akan kita tampilkan di tengah
import BuildingInfo from "@/components/panel/BuildingInfo";
import { Button } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";
import SidebarContent from "./SidebarContent";

const MapDisplay = dynamic(() => import("@/components/map/MapDisplay"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <p className="text-muted-foreground">Memuat peta...</p>
    </div>
  ),
});

export default function DekstopMapWrapper() {
  // Ambil state 'selectedFeature' untuk menentukan kapan harus menampilkan kartu
  const { setGeoJsonData, setAllFeatures, selectedFeature } = useMapStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    fetch("/data/RancamanyarDummy.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`Fetch Gagal: ${res.status}`);
        return res.json();
      })
      .then((geojsonData) => {
        setGeoJsonData(geojsonData);
        setAllFeatures(geojsonData.features);
      })
      .catch((error) => console.error("Error memuat data GeoJSON:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* SIDEBAR */}
      <aside
        className={`transition-all duration-300 ease-in-out bg-card border-r flex flex-col z-20 shadow-lg
                    ${isSidebarOpen ? "w-[320px] p-3" : "w-0 -ml-1 p-0"}`}
      >
        {isSidebarOpen && (
          <SidebarContent onClose={() => setIsSidebarOpen(false)} />
        )}
      </aside>

      {/* Tombol Toggle Sidebar */}
      {!isSidebarOpen && (
        <Button
          size="icon"
          className="absolute top-4 left-4 z-30
                     bg-background hover:bg-muted text-foreground
                     border-2 border-border/80 "
          onClick={() => setIsSidebarOpen(true)}
          title="Buka Sidebar"
        >
          <ChevronRight size={18} />
        </Button>
      )}

      {/* AREA PETA UTAMA */}
      <main className="flex-grow relative">
        <Header />
        <MapDisplay onMapCreated={(map) => (mapRef.current = map)} />
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-[1000]">
          <LegendDisplay />
        </div>

        {/* --- INI BAGIAN KUNCI UNTUK KARTU MENGAMBANG DI TENGAH --- */}
        {/* Tampilkan overlay ini HANYA jika ada 'selectedFeature' */}
        {selectedFeature && (
          <div
            // Container overlay yang menutupi seluruh area peta
            className="absolute inset-0 z-[1001] flex items-center justify-center  pointer-events-none"
          >
            {/* 
              Komponen BuildingInfo dirender di dalam container.
              Flexbox 'items-center justify-center' akan memposisikannya tepat di tengah.
              Container memiliki 'pointer-events-none' agar peta bisa digeser.
              Komponen BuildingInfo sendiri memiliki 'pointer-events-auto' agar bisa diklik.
            */}
            <BuildingInfo />
          </div>
        )}
        {/* --- AKHIR DARI BAGIAN KARTU MENGAMBANG --- */}
      </main>
    </div>
  );
}
