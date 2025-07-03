// components/controls/LayerControl.tsx
"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMapStore } from "@/store/mapStore";
import type { SampahType } from "@/types";
import RadiusAnalysisPanel from "../panel/RadiusAnalysisPanel"; // <-- IMPORT BARU

function LayerControl() {
  const {
    isDataLayerVisible,
    toggleDataLayerVisibility,
    activeSampahType,
    setActiveSampahType,
  } = useMapStore();

  return (
    <Card className="w-full">
      <CardHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="data-dummy"
            className="text-sm font-medium cursor-pointer"
          >
            Data Layer
          </Label>
          <Checkbox
            id="data-dummy"
            checked={isDataLayerVisible}
            onCheckedChange={toggleDataLayerVisibility}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <div>
          <Label
            htmlFor="sampah-type-select"
            className="text-xs text-muted-foreground mb-1 block"
          >
            Visualisasi Berdasarkan Data Sampah
          </Label>
          <Select
            value={activeSampahType}
            onValueChange={(value) => setActiveSampahType(value as SampahType)}
          >
            <SelectTrigger id="sampah-type-select">
              <SelectValue placeholder="Pilih Jenis Sampah" />
            </SelectTrigger>
            <SelectContent className="z-[1003]">
              <SelectItem value="Sampah Plastik (kg)">
                Sampah Plastik
              </SelectItem>
              <SelectItem value="Sampah Organik (kg)">
                Sampah Organik
              </SelectItem>
              <SelectItem value="sampah Anorganik (kg)">
                Sampah Lainnya
              </SelectItem>
              {/* <SelectItem value="Estimasi">Estimasi</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {/* --- PANEL ANALISIS RADIUS DITEMPATKAN DI SINI --- */}
        <RadiusAnalysisPanel />
      </CardContent>
    </Card>
  );
}

export default LayerControl;
