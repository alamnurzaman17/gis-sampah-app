"use client";

import { useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export function ZoomControl() {
  const map = useMap();

  return (
    // Kontainer yang menggabungkan tombol, meniru style toolbar lainnya
    <div className="flex flex-col bg-background rounded-lg shadow-md border overflow-hidden">
      {/* Tombol Zoom In */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => map.zoomIn()}
        className="rounded-none border-b"
        title="Perbesar"
      >
        <Plus size={18} />
      </Button>

      {/* Tombol Zoom Out */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => map.zoomOut()}
        className="rounded-none"
        title="Perkecil"
      >
        <Minus size={18} />
      </Button>
    </div>
  );
}
