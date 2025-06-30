// components/map/MapDisplay.tsx
"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { useMapStore } from "@/store/mapStore";
import GeoJsonLayer from "./GeoJsonLayer";
import { ChangeView } from "./ChangeView";
import { Toolbar } from "../controls/Toolbar";
import { Map as LeafletMap } from "leaflet";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  DEFAULT_FLY_TO_ZOOM,
} from "@/lib/mapUtils";
interface MapDisplayProps {
  onMapCreated: (map: LeafletMap) => void;
}

// const MapDisplay: React.FC<MapDisplayProps> = ({ onMapCreated }) => {
const MapDisplay: React.FC<MapDisplayProps> = ({ onMapCreated }) => {
  const { currentBasemap, searchResultCenter } = useMapStore();

  const handleMapRef = (instance: LeafletMap | null) => {
    if (instance) {
      // Panggil callback yang diberikan dari parent saat instance peta siap
      onMapCreated(instance);
    }
  };

  return (
    <MapContainer
      ref={handleMapRef}
      center={DEFAULT_MAP_CENTER}
      zoom={DEFAULT_MAP_ZOOM}
      className="h-full w-full z-0"
      zoomControl={false}
    >
      <TileLayer
        url={currentBasemap.url}
        attribution={currentBasemap.attribution}
        key={currentBasemap.id} // Ganti ke `id` yang lebih stabil
      />

      <GeoJsonLayer />

      {/* Komponen ini akan mendeteksi perubahan pada `searchResultCenter` dan memicu `flyTo` */}
      <ChangeView center={searchResultCenter} zoom={DEFAULT_FLY_TO_ZOOM} />

      <Toolbar />
    </MapContainer>
  );
};

export default MapDisplay;
