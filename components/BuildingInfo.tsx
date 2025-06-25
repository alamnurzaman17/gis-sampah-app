"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useMapStore } from "@/store/mapStore";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BuildingProperties } from "@/types"; // Pastikan path ini benar

interface InfoRowProps {
  label: string;
  value: string | number | undefined | null;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-white/10 py-3">
    <p className="text-sm text-inherit">{label}</p>
    <p
      className="text-sm font-semibold text-right pr-1 text-emerald-400"
      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
    >
      {value !== null && value !== undefined && String(value).trim() !== ""
        ? String(value)
        : "-"}
    </p>
  </div>
);

// Definisikan tipe untuk parameter 'val' pada formatter
type FormatterValue = BuildingProperties[keyof BuildingProperties]; // Ini akan menjadi union dari semua tipe properti

const BuildingInfo = () => {
  const { selectedFeature, setSelectedFeature } = useMapStore();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const side = isDesktop ? "right" : "bottom";
  const properties: BuildingProperties | undefined =
    selectedFeature?.properties;

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedFeature(null);
    }
  };

  // Beri tipe yang lebih spesifik untuk 'val' di formatter
  const displayableProperties: Array<{
    label: string;
    key: keyof BuildingProperties;
    // 'val' sekarang akan mengambil tipe dari BuildingProperties berdasarkan 'key'
    // Namun, untuk membuatnya lebih sederhana di sini, kita gunakan FormatterValue
    formatter?: (val: FormatterValue) => string | number;
  }> = [
    { label: "ID", key: "Id" },
    { label: "RT", key: "RTNew" },
    { label: "Estimasi", key: "Estimasi" },
    { label: "Sampah Plastik (kg)", key: "Sampah Plastik (kg)" },
    { label: "Sampah Organik (kg)", key: "Sampah Organik (kg)" },
    { label: "Sampah Anorganik (kg)", key: "sampah Anorganik (kg)" },
    {
      label: "Luas Area (m²)",
      key: "Shape_Area",
      formatter: (val) => {
        // Karena val bisa undefined (jika Shape_Area opsional), kita perlu menanganinya
        if (typeof val === "number") {
          return val.toFixed(2);
        }
        return val !== undefined && val !== null ? String(val) : "-"; // Fallback jika bukan angka atau undefined/null
      },
    },
  ];

  return (
    <Sheet
      open={!!selectedFeature}
      onOpenChange={handleOpenChange}
      modal={false}
    >
      <SheetContent side={side} className="w-full md:w-[400px] lg:w-[450px]">
        <SheetHeader>
          <SheetTitle>Detail Bangunan</SheetTitle>
          <SheetDescription>
            Informasi detail dari poligon yang dipilih.
          </SheetDescription>
        </SheetHeader>

        {properties && (
          <div className="grid gap-0 mt-4">
            {displayableProperties.map((propInfo) => {
              const valueFromProperties = properties[propInfo.key];
              const displayValue = propInfo.formatter
                ? propInfo.formatter(valueFromProperties) // Sekarang valueFromProperties memiliki tipe yang lebih baik
                : valueFromProperties;
              return (
                <InfoRow
                  key={propInfo.key}
                  label={propInfo.label}
                  value={displayValue} // displayValue sekarang adalah string atau number
                />
              );
            })}
          </div>
        )}
        {!properties && selectedFeature && (
          <p className="mt-4 text-sm text-muted-foreground">
            Properti tidak ditemukan untuk fitur ini.
          </p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BuildingInfo;
