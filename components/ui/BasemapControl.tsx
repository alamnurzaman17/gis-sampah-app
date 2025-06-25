"use client";
import { Button } from "@/components/ui/button";
import { useMapStore, basemapsData } from "@/store/mapStore";
import { cn } from "@/lib/utils";

const BasemapControl = () => {
  const { activeBasemap, setActiveBasemap } = useMapStore();

  const basemapOptions = [
    { key: "satellite", label: "Satellite" },
    { key: "light", label: "Light" },
    { key: "dark", label: "Dark" },
  ];

  return (
    // Container-nya sudah OK
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-1 p-1 bg-white backdrop-blur-sm rounded-full shadow-lg shadow-black/10">
      {basemapOptions.map((option) => {
        const isActive = activeBasemap.name.toLowerCase() === option.key;
        return (
          <Button
            key={option.key}
            onClick={() => setActiveBasemap(basemapsData[option.key])}
            className={cn(
              // Base styles
              "rounded-full h-9 px-4 text-sm font-medium transition-all duration-200 border-0 focus-visible:ring-2 focus-visible:ring-ring",

              // --- LOGIKA STYLING YANG DIPERBAIKI ---
              {
                // Jika AKTIF: Tetap sama, sudah bagus.
                "bg-primary text-primary-foreground shadow-sm": isActive,

                // Jika TIDAK AKTIF:
                // Gunakan warna SOLID yang sudah dirancang untuk kontras.
                "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground":
                  !isActive,
              }
            )}
          >
            {option.label}
          </Button>
        );
      })}
    </div>
  );
};

export default BasemapControl;
