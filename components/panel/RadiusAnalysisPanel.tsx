// components/panel/RadiusAnalysisPanel.tsx
"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useMapStore } from "@/store/mapStore";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RadiusAnalysisPanel() {
  const {
    selectedFeature, // Dibutuhkan untuk tahu apakah ada titik pusat
    radiusAnalysisStats,
    analysisRadius,
    setAnalysisRadius,
    activeSampahType,
  } = useMapStore();

  // Jangan tampilkan panel sama sekali jika tidak ada bangunan yang dipilih
  if (!selectedFeature) {
    return (
      <div className="pt-4 mt-4 border-t">
        <p className="text-xs text-center text-muted-foreground px-2">
          Klik sebuah bangunan di peta untuk mengaktifkan analisis radius.
        </p>
      </div>
    );
  }

  // Jika ada bangunan dipilih, tapi belum ada hasil analisis
  if (!radiusAnalysisStats) {
    return (
      <div className="pt-4 mt-4 border-t">
        <p className="text-xs text-center text-muted-foreground px-2">
          Memuat data analisis...
        </p>
      </div>
    );
  }

  const { totalCount, groupedStats } = radiusAnalysisStats;
  const chartData = groupedStats.map((stat) => ({
    name: stat.rangeLabel,
    value: stat.count,
    color: stat.color,
  }));
  const title = activeSampahType.replace(" (kg)", "");

  return (
    <div className="pt-4 mt-4 border-t">
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full"
      >
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="text-sm font-medium px-1 hover:no-underline">
            Analisis Radius ({analysisRadius}m)
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-4">
            {/* Chart Donat dan Legenda */}
            <div className="flex w-full items-center space-x-4">
              <div className="relative h-24 w-24 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={35}
                      outerRadius={45}
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-xl font-bold">{totalCount}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs w-full">
                {groupedStats.map((stat) => (
                  <div
                    key={stat.rangeLabel}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-1.5">
                      <div
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: stat.color }}
                      />
                      <span>{stat.rangeLabel}</span>
                    </div>
                    <span className="font-semibold ml-2">{stat.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider Radius */}
            <div className="flex items-center space-x-2 pt-2">
              <span className="text-xs text-muted-foreground">Radius:</span>
              <Slider
                defaultValue={[analysisRadius]}
                max={500}
                step={10}
                onValueChange={(value) => setAnalysisRadius(value[0])}
              />
            </div>

            {/* Teks Ringkasan */}
            <p className="text-center text-xs text-muted-foreground pt-1">
              Analisis <strong>{totalCount}</strong> bangunan dalam radius{" "}
              <strong>{analysisRadius}m</strong> berdasarkan layer{" "}
              <strong>{title}</strong>.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
