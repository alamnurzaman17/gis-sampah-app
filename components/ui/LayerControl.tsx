// components/ui/LayerControl.tsx
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function LayerControl() {
  const {
    isDataLayerVisible,
    toggleDataLayerVisibility,
    activeSampahType,
    setActiveSampahType,
  } = useMapStore();

  return (
    <Card className="w-full">
      <CardHeader className="py-3 px-4 border-b">
        <CardTitle className="text-base">Select Layer</CardTitle>
      </CardHeader>
      <CardContent className="p-3 space-y-4">
        {/* Kontrol untuk Data Dummy/Bangunan */}
        <div className="flex items-center justify-between">
          <Label htmlFor="data-dummy" className="text-sm font-medium">
            Data Dummy
          </Label>
          <Checkbox
            id="data-dummy"
            checked={isDataLayerVisible}
            onCheckedChange={toggleDataLayerVisibility}
          />
        </div>

        {/* Kontrol untuk memilih jenis sampah (jika diperlukan) */}
        {/* Anda bisa menambahkan ini jika ingin dropdown seperti di gambar referensi kedua */}
        <div>
          <Label
            htmlFor="sampah-type-select"
            className="text-xs text-muted-foreground mb-1 block"
          >
            Visualisasi Berdasarkan
          </Label>
          <Select
            value={activeSampahType}
            onValueChange={(value) => setActiveSampahType(value as SampahType)}
          >
            <SelectTrigger id="sampah-type-select">
              <SelectValue placeholder="Pilih Jenis Sampah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sampah Plastik (kg)">
                Sampah Plastik
              </SelectItem>
              <SelectItem value="Sampah Organik (kg)">
                Sampah Organik
              </SelectItem>
              <SelectItem value="sampah Anorganik (kg)">
                Sampah Lainnya
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default LayerControl;
