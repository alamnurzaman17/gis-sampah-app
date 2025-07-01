"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import { Map as LeafletMap } from "leaflet";
import { useMapStore } from "@/store/mapStore";
import GeoJsonLayer from "./GeoJsonLayer";
import { ChangeView } from "./ChangeView";
import {
  DEFAULT_MAP_CENTER,
  DEFAULT_MAP_ZOOM,
  DEFAULT_FLY_TO_ZOOM,
} from "@/lib/mapUtils";

import { Toolbar } from "../controls/Toolbar"; // Versi Desktop
import { MobileToolbar } from "../controls/MobileToolbar"; // Versi Mobile
import { useBreakpoint } from "@/hooks/use-breakpoint"; // Hook kita
import { CustomScale } from "../controls/CustomScale";

interface MapDisplayProps {
  onMapCreated: (map: LeafletMap) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ onMapCreated }) => {
  const { currentBasemap, searchResultCenter } = useMapStore();
  const isMobile = useBreakpoint("lg"); // Cek apakah ini mobile

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

      {isMobile ? <MobileToolbar /> : <Toolbar />}

      <CustomScale />
    </MapContainer>
  );
};

export default MapDisplay;
