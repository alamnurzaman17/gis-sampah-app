"use client";

import React from "react";
import { useMapStore } from "@/store/mapStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";

// Impor komponen BuildingInfo yang sudah ada dan canggih
import BuildingInfo from "./BuildingInfo";

export default function MobileInfoSheet() {
  const { selectedFeature, setSelectedFeature } = useMapStore();

  // Fungsi ini dipanggil saat Sheet ingin ditutup
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedFeature(null); // Reset state jika sheet ditutup
    }
  };

  return (
    <Sheet open={!!selectedFeature} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="w-full p-0 border-none bg-transparent shadow-none"
        // Kita buat sheet-nya transparan, karena BuildingInfo sudah punya background Card
      >
        {/* 
          Di dalam sheet, kita render BuildingInfo.
          Kita beri tahu dia untuk menggunakan layout mobile.
          Kartu BuildingInfo akan secara otomatis berada di tengah sheet.
        */}
        <div className="flex justify-center items-center h-full pt-10">
          <BuildingInfo isMobileLayout={true} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
