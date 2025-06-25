"use client";

import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { useMapStore } from "@/store/mapStore"; // Pastikan store ini ada dan berfungsi
import { Layer, PathOptions, StyleFunction } from "leaflet";
// Impor tipe yang sudah diperbarui
import {
  BuildingProperties,
  AppFeatureCollection,
  AppSpecificBuildingFeature, // Tipe spesifik dengan MultiPolygon
  LeafletCompatibleBuildingFeature, // Tipe generik untuk callback Leaflet
} from "@/types"; // Pastikan path ini benar

const GeoJsonLayer = () => {
  const [data, setData] = useState<AppFeatureCollection | null>(null);
  const { isDataVisible, setSelectedFeature } = useMapStore();

  useEffect(() => {
    fetch("/data/RancamanyarDummy.geojson")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((geojsonData: AppFeatureCollection) => {
        console.log("Data GeoJSON berhasil dimuat:", geojsonData);
        setData(geojsonData);
      })
      .catch((error) => {
        console.error("Gagal memuat data GeoJSON:", error);
      });
  }, []);

  // getStyle sekarang menerima fitur yang kompatibel dengan Leaflet,
  // dengan properties bertipe BuildingProperties.
  const getStyle: StyleFunction<BuildingProperties> = (
    feature?: LeafletCompatibleBuildingFeature // Menggunakan tipe generik
  ): PathOptions => {
    if (!feature || !feature.properties) {
      return {
        fillColor: "#CCCCCC",
        weight: 0.5,
        color: "#6B7280",
        fillOpacity: 0.5,
        opacity: 1,
      };
    }

    // Akses properti. Karena sudah didefinisikan di BuildingProperties (mungkin opsional),
    // kita perlu menangani kasus undefined.
    const sampahPlastik = feature.properties["Sampah Plastik (kg)"];
    let fillColor = "#9CA3AF"; // Warna abu-abu default

    if (typeof sampahPlastik === "number") {
      // Pemeriksaan tipe memastikan sampahPlastik adalah angka
      if (sampahPlastik > 80) fillColor = "#14532D";
      else if (sampahPlastik > 60) fillColor = "#166534";
      else if (sampahPlastik > 40) fillColor = "#15803D";
      else if (sampahPlastik > 20) fillColor = "#16A34A";
      else fillColor = "#22C55E";
    } else {
      // Handle jika sampahPlastik undefined atau bukan angka
      // console.warn(`Properti "Sampah Plastik (kg)" tidak valid atau tidak ada untuk fitur ID: ${feature.properties.Id}`);
    }

    return {
      fillColor: fillColor,
      weight: 0.5,
      opacity: 1,
      color: "#4B5563",
      fillOpacity: 0.8,
    };
  };

  const onEachFeature = (
    feature: LeafletCompatibleBuildingFeature, // Menggunakan tipe generik
    layer: Layer
  ) => {
    layer.on({
      click: () => {
        // Jika setSelectedFeature di store Anda mengharapkan tipe AppSpecificBuildingFeature
        // (dengan geometri MultiPolygon yang ketat), Anda perlu melakukan type guard.
        if (feature.geometry && feature.geometry.type === "MultiPolygon") {
          setSelectedFeature(feature as AppSpecificBuildingFeature);
        } else {
          console.warn(
            "Fitur yang diklik bukan MultiPolygon atau tidak memiliki geometri yang valid:",
            feature
          );
          setSelectedFeature(feature as AppSpecificBuildingFeature); // Ini akan error jika geometrinya BUKAN MultiPolygon saat runtime
        }
      },
    });
  };

  if (!isDataVisible || !data) {
    return null;
  }

  return (
    <GeoJSON
      data={data}
      style={getStyle}
      onEachFeature={onEachFeature}
      key={JSON.stringify(data) + String(isDataVisible)}
    />
  );
};

export default GeoJsonLayer;
