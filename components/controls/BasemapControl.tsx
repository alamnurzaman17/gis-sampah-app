// components/ui/BasemapControl.tsx
"use client";
import { Button } from "@/components/ui/button";
import { useMapStore } from "@/store/mapStore";
import { availableBasemaps } from "@/lib/mapUtils";

function BasemapControl() {
  const { currentBasemap, setCurrentBasemap } = useMapStore();

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] p-1 bg-background/80 backdrop-blur-sm rounded-lg shadow-md flex items-center space-x-1">
      {Object.values(availableBasemaps).map((basemapOption) => (
        <Button
          key={basemapOption.id}
          variant={
            currentBasemap.id === basemapOption.id ? "default" : "secondary"
          }
          size="sm"
          onClick={() => setCurrentBasemap(basemapOption)}
          className="text-xs px-3"
        >
          {basemapOption.name}
        </Button>
      ))}
    </div>
  );
}
export default BasemapControl;
