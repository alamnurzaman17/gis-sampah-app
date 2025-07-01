"use client";

import React, { useState } from "react"; // Impor useState untuk mengontrol Popover
import { useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Minus, Map, LocateFixed } from "lucide-react";
import { useMapStore } from "@/store/mapStore";
import {
  availableBasemaps,
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
} from "@/lib/mapUtils";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Toolbar() {
  const map = useMap();
  const { currentBasemap, setCurrentBasemap, setSearchResultCenter } =
    useMapStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State untuk mengontrol Popover

  const handleBasemapChange = (basemap: typeof currentBasemap) => {
    setCurrentBasemap(basemap);
    setIsPopoverOpen(false); // Tutup popover setelah memilih
  };

  // --- FUNGSI BARU UNTUK KEMBALI KE POSISI AWAL ---
  const handleGoToHome = () => {
    map.flyTo(DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM);
    setSearchResultCenter(null);
  };

  return (
    // Mengganti flex-col dengan space-y-0 agar bisa menggabungkan styling grup
    <div className="absolute top-4 right-4 z-[1000] flex flex-col items-end">
      {/* Kontainer baru untuk menggabungkan semua tombol kontrol */}
      <div className="flex flex-col bg-background rounded-lg shadow-md border overflow-hidden">
        {/* Tombol Zoom In */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => map.zoomIn()}
          className="rounded-none border-b cursor-pointer"
        >
          <Plus size={18} />
        </Button>

        {/* Tombol Zoom Out */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => map.zoomOut()}
          className="rounded-none cursor-pointer"
        >
          <Minus size={18} />
        </Button>

        {/* Separator antara zoom dan basemap */}
        <div className="h-px bg-border w-full"></div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleGoToHome}
          className="rounded-none cursor-pointer"
        >
          <LocateFixed size={18} />
        </Button>

        {/* Separator */}
        <div className="h-px bg-border w-full"></div>

        {/* Tombol Basemap */}
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none cursor-pointer"
            >
              <Map size={18} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="end">
            <div className="space-y-2">
              <h4 className="font-medium text-sm px-2">Basemap</h4>
              <div className="h-px bg-border w-full"></div>
              <div className="flex space-x-2">
                {Object.values(availableBasemaps).map((basemap) => (
                  <button
                    key={basemap.id}
                    onClick={() => handleBasemapChange(basemap)}
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
                    <span className="text-xs text-foreground">
                      {basemap.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
