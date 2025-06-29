"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useMapStore } from "@/store/mapStore";
import { Map as LeafletMap } from "leaflet";

// Pindahkan semua import komponen UI ke sini
import Header from "@/components/ui/Header";
import LayerControl from "@/components/ui/LayerControl";
import LegendDisplay from "@/components/LegendDisplay";
import BuildingInfo from "@/components/BuildingInfo";

// Impor ikon untuk tombol toggle sidebar
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Pindahkan dynamic import ke sini
const MapDisplay = dynamic(() => import("@/components/map/MapDisplay"), {
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex justify-center items-center bg-background">
      <p className="text-muted-foreground">Memuat peta...</p>
    </div>
  ),
});

export default function MapWrapper() {
  const { setGeoJsonData, setAllFeatures } = useMapStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default sidebar terbuka
  const mapRef = useRef<LeafletMap | null>(null);

  // Efek untuk memuat data GeoJSON saat komponen MapWrapper pertama kali dimuat
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

  // --- EFEK BARU UNTUK OPTIMALISASI PETA ---
  useEffect(() => {
    // Beri sedikit jeda agar transisi CSS selesai sebelum me-refresh ukuran peta
    const timer = setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 350); // 350ms, sedikit lebih lama dari durasi transisi (300ms)

    return () => {
      clearTimeout(timer); // Cleanup timer
    };
  }, [isSidebarOpen]); // Jalankan efek ini setiap kali isSidebarOpen berubah

  return (
    // KONTENER UTAMA: Menggunakan Flexbox untuk mengatur sidebar dan peta
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* SIDEBAR */}
      <aside
        className={`transition-all duration-300 ease-in-out bg-card border-r flex flex-col z-20 shadow-lg
                    ${isSidebarOpen ? "w-[320px] p-3" : "w-0 -ml-1 p-0"}`} // Lebar bisa disesuaikan
      >
        {/* Konten sidebar hanya dirender jika isSidebarOpen true */}
        {isSidebarOpen && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-semibold px-1">Select Layer</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="h-8 w-8"
              >
                <ChevronLeft size={20} />
              </Button>
            </div>
            {/* LayerControl sekarang berada di dalam sidebar */}
            <div className="flex-grow overflow-y-auto pr-1">
              <LayerControl />
              {/* Anda bisa menambahkan komponen sidebar lain di sini, seperti Accordion */}
            </div>
          </div>
        )}
      </aside>

      {/* TOMBOL TOGGLE SIDEBAR (jika tertutup) */}
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
        <MapDisplay onMapCreated={(map) => (mapRef.current = map)} />{" "}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-[1000]">
          <LegendDisplay />
        </div>
      </main>

      {/* Info Bangunan  */}
      <BuildingInfo />
    </div>
  );
}
