import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import LayerControl from "@/components/controls/LayerControl";

// Komponen ini menerima satu prop: fungsi `onClose`
interface SidebarContentProps {
  onClose: () => void;
}

export default function SidebarContent({ onClose }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header Sidebar */}
      <div className="flex items-center justify-between mb-2">
        <Image
          src="/logo-plasticycle-gis.png"
          alt="PlastiCycleGIS Logo"
          width={180}
          height={40}
          priority
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose} // Gunakan prop onClose di sini
          className="h-8 w-8"
        >
          <ChevronLeft size={20} />
        </Button>
      </div>

      {/* Konten Utama Sidebar */}
      <div className="flex-grow overflow-y-auto pr-1">
        <LayerControl />
        {/* Anda bisa menambahkan komponen lain di sini jika ada */}
      </div>
    </div>
  );
}
