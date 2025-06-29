// components/ui/BuildingInfo.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Ganti impor dari Sheet ke Dialog
import { useMapStore } from "@/store/mapStore";
import type { BuildingProperties } from "@/types";

// Komponen InfoRow (tetap sama seperti kode Anda)
interface InfoRowProps {
  label: string;
  value: string | number | undefined | null;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-border/60 py-2.5">
    {" "}
    {/* Sedikit penyesuaian padding */}
    <p className="text-sm text-muted-foreground">{label}</p>{" "}
    {/* Ganti text-inherit ke text-muted-foreground untuk konsistensi */}
    <p className="text-sm font-semibold text-right text-primary">
      {" "}
      {/* Ganti warna ke primary */}
      {value !== null && value !== undefined && String(value).trim() !== ""
        ? String(value)
        : "-"}
    </p>
  </div>
);

// Tipe formatter (tetap sama)
type FormatterValue = BuildingProperties[keyof BuildingProperties];

function BuildingInfo() {
  const { selectedFeature, setSelectedFeature } = useMapStore();

  const handleOpenChange = (isOpen: boolean) => {
    // Jika dialog ditutup (misalnya dengan menekan Esc atau klik di luar),
    // reset selectedFeature di store.
    if (!isOpen) {
      setSelectedFeature(null);
    }
  };

  const properties = selectedFeature?.properties;

  // Daftar properti yang akan ditampilkan (tetap sama)
  const displayableProperties: Array<{
    label: string;
    key: keyof BuildingProperties;
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
        if (typeof val === "number") {
          return val.toFixed(2);
        }
        return val !== undefined && val !== null ? String(val) : "-";
      },
    },
  ];

  return (
    // Gunakan Dialog, bukan Sheet
    <Dialog open={!!selectedFeature} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[80vh] flex flex-col">
        {" "}
        {/* Tambah flex-col */}
        <DialogHeader>
          <DialogTitle>Detail Bangunan</DialogTitle>
          <DialogDescription>
            Informasi detail dari poligon yang dipilih.
          </DialogDescription>
        </DialogHeader>
        {properties ? (
          // Tambahkan div dengan overflow agar konten bisa di-scroll jika panjang
          <div className="flex-grow overflow-y-auto pr-3 -mr-2">
            {displayableProperties.map((propInfo) => {
              const valueFromProperties = properties[propInfo.key];
              const displayValue = propInfo.formatter
                ? propInfo.formatter(valueFromProperties)
                : valueFromProperties;
              return (
                <InfoRow
                  key={propInfo.key}
                  label={propInfo.label}
                  value={displayValue}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Properti tidak ditemukan untuk fitur ini.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default BuildingInfo;
