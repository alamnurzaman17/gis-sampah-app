"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { BuildingProperties } from "@/types";
import { cn } from "@/lib/utils";

// Tipe untuk props komponen (tidak berubah)
interface AnalysisTabContentProps {
  properties: BuildingProperties;
  isMobile?: boolean; // Prop untuk mode mobile
}

// Tipe untuk data chart kita (tidak berubah)
interface ChartDataItem {
  name: string;
  value: number;
}

// Konfigurasi kategori dan warna (tidak berubah)
const analysisCategories = [
  { key: "Sampah Plastik (kg)" as const, name: "Plastik", color: "#f87171" },
  { key: "Sampah Organik (kg)" as const, name: "Organik", color: "#38f88b" },
  { key: "sampah Anorganik (kg)" as const, name: "Lainnya", color: "#fbbf24" },
];
const COLORS = analysisCategories.map((c) => c.color);

const formatNumber = (num: number) => num.toLocaleString("id-ID");

export default function AnalysisTabContent({
  properties,
  isMobile = false, // Default ke false jika tidak disediakan
}: AnalysisTabContentProps) {
  // Kita memastikan setiap objek yang dibuat oleh .map() langsung sesuai dengan ChartDataItem
  const chartData: ChartDataItem[] = analysisCategories.map((category) => {
    const value = properties[category.key];
    return {
      name: category.name,
      // Jika 'value' adalah sebuah angka, gunakan itu. Jika tidak (undefined, null, dll.), gunakan 0.
      // Ini menjamin bahwa 'value' yang dikembalikan SELALU bertipe 'number'.
      value: typeof value === "number" ? value : 0,
    };
  });

  // Karena perbaikan di atas, TypeScript sekarang 100% yakin bahwa 'item.value' adalah 'number'.
  const totalSampah = chartData.reduce((sum, item) => sum + item.value, 0);

  // Demikian pula untuk 'a.value' dan 'b.value'.
  const sortedData = [...chartData].sort((a, b) => b.value - a.value);

  const sampahTerbanyak = sortedData[0];

  return (
    <div className="flex flex-col items-center space-y-3 pt-2 md:space-y-4 md:pt-4">
      <div
        className={cn(
          "flex w-full items-center justify-center",
          isMobile ? "flex-col space-y-3" : "space-x-8" // Vertikal di mobile, horizontal di desktop
        )}
      >
        <div
          className={cn(
            "relative",
            isMobile ? "h-36 w-36" : "h-48 w-48" // Lebih kecil di mobile
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 45 : 60}
                outerRadius={isMobile ? 60 : 80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className={cn("font-bold", isMobile ? "text-2xl" : "text-3xl")}>
              {formatNumber(totalSampah)}
            </p>
            <p
              className={cn(
                "text-muted-foreground",
                isMobile ? "text-xs" : "text-sm"
              )}
            >
              kg per hari
            </p>
          </div>
        </div>
        <div
          className={cn(
            "flex",
            isMobile ? "flex-row space-x-4" : "flex-col space-y-2" // Horizontal di mobile
          )}
        >
          {analysisCategories.map((category) => (
            <div key={category.name} className="flex items-center space-x-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className={cn(isMobile ? "text-xs" : "text-sm")}>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs md:text-sm text-muted-foreground max-w-xs pt-2 md:pt-4">
        {sampahTerbanyak && sampahTerbanyak.value > 0 ? (
          <>
            Estimasi sampah{" "}
            <strong className="text-foreground">
              {sampahTerbanyak.name.toLowerCase()}
            </strong>{" "}
            ({formatNumber(sampahTerbanyak.value)} kg) yang paling banyak
            dihasilkan oleh bangunan ini dalam satuan kilogram / hari.
          </>
        ) : (
          "Tidak ada data sampah yang dapat dianalisis untuk bangunan ini."
        )}
      </p>
    </div>
  );
}
