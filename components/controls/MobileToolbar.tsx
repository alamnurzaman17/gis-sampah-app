"use client";

import React, { useState } from "react";
import { useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LegendDisplay from "../panel/LegendDisplay";
import {
  Plus,
  Minus,
  Layers, // Ikon baru yang lebih cocok untuk tombol utama
  LocateFixed,
} from "lucide-react";
import { useMapStore } from "@/store/mapStore";
import {
  availableBasemaps,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
} from "@/lib/mapUtils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { BasemapConfig } from "@/types";

// Komponen terpisah untuk pilihan basemap agar lebih rapi
const BasemapPicker = ({
  onSelect,
}: {
  onSelect: (basemap: BasemapConfig) => void;
}) => {
  const { currentBasemap } = useMapStore();

  return (
    <div className="flex space-x-2">
      {Object.values(availableBasemaps).map((basemap) => (
        <button
          key={basemap.id}
          onClick={() => onSelect(basemap)}
          className={cn(
            "flex flex-col items-center space-y-1 p-1 rounded-md transition-all outline-none cursor-pointer",
            "hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
            currentBasemap.id === basemap.id && "ring-2 ring-primary"
          )}
          title={basemap.name}
        >
          <Image
            src={basemap.thumbnail}
            alt={`${basemap.name} basemap thumbnail`}
            width={64}
            height={64}
            className="w-16 h-16 rounded-md object-cover border"
          />
          <span className="text-xs text-foreground">{basemap.name}</span>
        </button>
      ))}
    </div>
  );
};

export function MobileToolbar() {
  const map = useMap();
  const { setCurrentBasemap, setSearchResultCenter } = useMapStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleBasemapChange = (basemap: BasemapConfig) => {
    setCurrentBasemap(basemap);
    // Kita tidak menutup popover utama, agar pengguna bisa melakukan aksi lain
  };

  const handleGoToHome = () => {
    map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);
    setSearchResultCenter(null);
    setIsPopoverOpen(false); // Tutup setelah aksi
  };

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  return (
    <div className="absolute top-20 right-4 z-[1001]">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        {/* Tombol Aksi Utama */}
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="shadow-lg bg-background/80"
          >
            <Layers size={20} />
          </Button>
        </PopoverTrigger>

        {/* Konten Popover yang berisi semua alat */}
        <PopoverContent className="w-auto p-2" align="end">
          <div className="flex flex-col space-y-2">
            {/* 1. Kontrol Zoom */}
            <div className="flex items-center justify-center space-x-1">
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <Minus size={18} />
              </Button>
              <span className="px-2 text-sm text-muted-foreground">Zoom</span>
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <Plus size={18} />
              </Button>
            </div>

            {/* Garis Pemisah */}
            <div className="h-px bg-border w-full"></div>

            {/* 2. Tombol Kembali ke Awal */}
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleGoToHome}
            >
              <LocateFixed className="mr-2 h-4 w-4" />
              <span>Kembali ke Awal</span>
            </Button>

            {/* Garis Pemisah */}
            <div className="h-px bg-border w-full"></div>

            {/* 3. Legenda Peta */}
            <LegendDisplay showCard={false} />

            {/* Garis Pemisah */}
            <div className="h-px bg-border w-full"></div>

            {/* 4. Pilihan Basemap */}
            <div className="px-1">
              <h4 className="font-medium text-sm mb-2">Pilih Basemap</h4>
              <BasemapPicker onSelect={handleBasemapChange} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
