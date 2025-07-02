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
    selectedFeature,
  } = useMapStore();

  const styleFunction: StyleFunction<BuildingProperties> = useMemo(
    () => (feature) => {
      // Style default (untuk poligon yang tidak terpilih)
      const isDarkTheme = currentBasemap.id === "dark";
      const defaultBorderColor = isDarkTheme ? "#FFFFFF" : "#4B5563";
      const defaultBorderWidth = isDarkTheme ? 0.8 : 0.5;

      if (!feature?.properties) {
        return {
          fillColor: "#CCCCCC",
          weight: defaultBorderWidth,
          color: defaultBorderColor,
          fillOpacity: 0.5,
          opacity: 1,
        };
      }
      const value = feature.properties[activeSampahType];
      const fillColor = getColorForValue(
        typeof value === "number" ? value : undefined,
        activeSampahType
      );

      // --- 2. Logika untuk menyorot poligon terpilih ---
      const isSelected =
        selectedFeature?.properties.Id === feature.properties.Id;

      if (isSelected) {
        // Jika terpilih, kembalikan style highlight
        return {
          fillColor,
          weight: 3, // Border lebih tebal
          opacity: 1,
          color: "#D946EF", // Warna border cerah (Cyan)
          fillOpacity: 0.9, // Sedikit lebih solid
        };
      } else {
        // Jika tidak terpilih, kembalikan style default
        return {
          fillColor,
          weight: defaultBorderWidth,
          opacity: 1,
          color: defaultBorderColor,
          fillOpacity: 0.8,
        };
      }
    },
    [activeSampahType, currentBasemap.id, selectedFeature]
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
