"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useMapStore } from "@/store/mapStore";
// import { ChevronUp } from "lucide-react";

// Komponen untuk setiap baris legenda gradasi
const GradientLegendItem = ({
  color,
  range,
}: {
  color: string;
  range: string;
}) => (
  <div className="flex items-center space-x-3">
    <div
      className="w-5 h-5 rounded-sm"
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-sm text-black">{range}</span>
  </div>
);

const LegendDisplay = () => {
  // const { isDataVisible } = useMapStore();

  // if (!isDataVisible) return null;

  return (
    <Card className="absolute bg-gray-100 shadow-2xl text-black bottom-20 right-4 z-10 w-64 md:bottom-4">
      <CardHeader className="flex flex-row items-center justify-between p-3">
        <CardTitle className="text-base font-semibold">Legend</CardTitle>
        {/* <ChevronUp className="h-5 w-5 text-muted-foreground" /> */}
      </CardHeader>

      <div className="p-3 border-t border-border">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-black">Sampah Plastik</h4>
        </div>

        <div className="space-y-2">
          <GradientLegendItem color="#22C55E" range="0 - 20 kg" />
          <GradientLegendItem color="#16A34A" range="20 - 40 kg" />
          <GradientLegendItem color="#15803D" range="40 - 60 kg" />
          <GradientLegendItem color="#166534" range="60 - 80 kg" />
          <GradientLegendItem color="#14532D" range="> 80 kg" />
        </div>
      </div>
    </Card>
  );
};

export default LegendDisplay;
