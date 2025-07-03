"use client";

import React from "react";
import { useMapStore } from "@/store/mapStore";
import { BuildingProperties } from "@/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// --- Impor komponen analisis baru ---
import AnalysisTabContent from "./AnalysisTabContent";
import { cn } from "@/lib/utils";

type DisplayProperty = {
  label: string;
  key: keyof BuildingProperties;
};

const displayablePropertiesOrder: ReadonlyArray<DisplayProperty> = [
  { label: "ID", key: "Id" },
  { label: "RT", key: "RTNew" },
  // { label: "Estimasi", key: "Estimasi" },
  { label: "Sampah Plastik (kg)", key: "Sampah Plastik (kg)" },
  { label: "Sampah Organik (kg)", key: "Sampah Organik (kg)" },
  { label: "Sampah Anorganik (kg)", key: "sampah Anorganik (kg)" },
  { label: "Luas Area (m²)", key: "Shape_Area" },
];

const formatPropertyValue = (
  key: keyof BuildingProperties,
  value: BuildingProperties[keyof BuildingProperties]
): string => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  if (typeof value === "number") {
    if (key === "Shape_Area") {
      return value.toFixed(2).replace(".", ",");
    }
    return value.toLocaleString("id-ID");
  }
  return String(value);
};

interface BuildingInfoProps {
  isMobileLayout?: boolean;
}

interface PropertyRowProps {
  label: string;
  value: string;
}

const PropertyRow: React.FC<PropertyRowProps> = ({ label, value }) => (
  <div className="flex justify-between items-center py-1 px-1.5 border-b border-border/50 text-xs">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium text-right text-green-600">{value}</span>
  </div>
);

export default function BuildingInfo({
  isMobileLayout = false,
}: BuildingInfoProps) {
  const { selectedFeature, setSelectedFeature } = useMapStore();

  if (!selectedFeature) {
    return null;
  }

  const properties = selectedFeature.properties;

  return (
    <Card
      className={cn(
        "shadow-2xl bg-card/95 backdrop-blur-sm pointer-events-auto",
        isMobileLayout ? "w-full max-w-[280px]" : "w-[380px]"
      )}
    >
      <CardHeader
        className={cn(
          "flex flex-row items-center justify-between",
          isMobileLayout ? "px-3 py-2" : "px-4 py-3"
        )}
      >
        <div>
          <CardTitle className={cn(isMobileLayout ? "text-base" : "text-lg")}>
            Informasi Bangunan
          </CardTitle>
          <CardDescription className="text-xs">Selected item</CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            isMobileLayout ? "-mr-1 -mt-1" : "-mr-2 -mt-2"
          )}
          onClick={() => setSelectedFeature(null)}
          title="Tutup"
        >
          <X size={20} />
        </Button>
      </CardHeader>
      <CardContent className={cn(isMobileLayout ? "p-2 pt-0" : "p-4 pt-0")}>
        <Tabs defaultValue="detail" className="w-full">
          <TabsList
            className={cn(
              "grid w-full grid-cols-2 h-9",
              isMobileLayout ? "mb-2" : "mb-3"
            )}
          >
            <TabsTrigger value="detail">Detail Fitur</TabsTrigger>
            <TabsTrigger value="analisis">Analisis</TabsTrigger>
          </TabsList>

          <TabsContent
            value="detail"
            className={cn(
              "space-y-0.5 text-sm overflow-y-auto pr-1",
              isMobileLayout ? "max-h-[55vh]" : "max-h-[60vh]"
            )}
          >
            {properties ? (
              displayablePropertiesOrder.map(({ label, key }) => {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                  const value = formatPropertyValue(key, properties[key]);
                  return <PropertyRow key={key} label={label} value={value} />;
                }
                return null;
              })
            ) : (
              <p className="text-muted-foreground text-center p-4">
                Properti tidak ditemukan.
              </p>
            )}
          </TabsContent>

          <TabsContent value="analisis">
            {properties ? (
              <AnalysisTabContent
                properties={properties}
                isMobile={isMobileLayout}
              />
            ) : (
              <div className="flex items-center justify-center h-24">
                <p className="text-muted-foreground">
                  Data properti tidak tersedia.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
