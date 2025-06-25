"use client";

import { useRef } from "react"; // Import useRef
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { useMapStore } from "@/store/mapStore";
import GeoJsonLayer from "./GeoJsonLayer";
import { Map as LeafletMap } from "leaflet"; // Impor tipe Map

const MapDisplay = () => {
  const { setMap, activeBasemap } = useMapStore();
  const mapRef = useRef<LeafletMap | null>(null); // Buat ref untuk Map instance

  return (
    <MapContainer
      center={[-6.979, 107.589]}
      zoom={17}
      className="h-full w-full z-0"
      // whenReady sekarang akan mengambil map instance dari ref
      whenReady={() => {
        if (mapRef.current) {
          setMap(mapRef.current);
        }
      }}
      ref={mapRef} // Tetapkan ref ke MapContainer
      zoomControl={false}
    >
      <TileLayer
        url={activeBasemap.url}
        attribution={activeBasemap.attribution}
        key={activeBasemap.name}
      />
      <GeoJsonLayer />
      <ZoomControl position="topright" />
    </MapContainer>
  );
};

export default MapDisplay;
