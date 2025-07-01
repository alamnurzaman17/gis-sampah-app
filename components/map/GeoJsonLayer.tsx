"use client";

import { useMemo } from "react";
import { GeoJSON } from "react-leaflet";
import { useMapStore } from "@/store/mapStore";
import { Layer, StyleFunction } from "leaflet";
import {
  AppSpecificBuildingFeature,
  LeafletCompatibleBuildingFeature,
  BuildingProperties,
} from "@/types";
import { getColorForValue } from "@/lib/mapUtils";

const GeoJsonLayer = () => {
  const {
    isDataLayerVisible,
    setSelectedFeature,
    activeSampahType,
    geoJsonData,
    currentBasemap,
  } = useMapStore();

  const styleFunction: StyleFunction<BuildingProperties> = useMemo(
    () => (feature) => {
      // <<< Logika untuk menentukan style border dinamis >>>
      const isDarkTheme = currentBasemap.id === "dark";
      const borderColor = isDarkTheme ? "#FFFFFF" : "#4B5563"; // Putih di tema gelap, abu-abu di tema terang
      const borderWidth = isDarkTheme ? 0.8 : 0.5; // Sedikit lebih tebal di tema gelap

      if (!feature?.properties) {
        return {
          fillColor: "#CCCCCC",
          weight: borderWidth,
          color: borderColor,
          fillOpacity: 0.5,
          opacity: 1,
        };
      }
      const value = feature.properties[activeSampahType];
      const fillColor = getColorForValue(
        typeof value === "number" ? value : undefined,
        activeSampahType
      );
      return {
        fillColor,
        weight: borderWidth,
        opacity: 1,
        color: borderColor,
        fillOpacity: 0.8,
      };
    },
    [activeSampahType, currentBasemap.id]
  ); // Style hanya dihitung ulang saat tipe sampah berubah

  const onEachFeature = (
    feature: LeafletCompatibleBuildingFeature,
    layer: Layer
  ) => {
    layer.on({
      click: () => {
        setSelectedFeature(feature as AppSpecificBuildingFeature);
      },
    });
  };

  if (!isDataLayerVisible || !geoJsonData) {
    return null;
  }

  return (
    <GeoJSON
      data={geoJsonData}
      style={styleFunction}
      onEachFeature={onEachFeature}
      key={activeSampahType} // Ini SANGAT PENTING untuk memaksa Leaflet menggambar ulang style
    />
  );
};

export default GeoJsonLayer;
