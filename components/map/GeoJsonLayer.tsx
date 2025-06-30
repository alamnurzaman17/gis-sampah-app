// src/components/map/GeoJsonLayer.tsx
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
  } = useMapStore();

  const styleFunction: StyleFunction<BuildingProperties> = useMemo(
    () => (feature) => {
      if (!feature?.properties) {
        return {
          fillColor: "#CCCCCC",
          weight: 0.5,
          color: "#6B7280",
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
        weight: 0.5,
        opacity: 1,
        color: "#4B5563",
        fillOpacity: 0.8,
      };
    },
    [activeSampahType]
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
