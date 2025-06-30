// types/index.ts
import {
  Feature as GeoJsonFeatureType,
  MultiPolygon,
  Geometry,
  FeatureCollection as GeoJsonFeatureCollectionType,
} from "geojson";
import { LatLngExpression } from "leaflet";

// --- Tipe untuk Data Bangunan (Properties) ---
export interface BuildingProperties {
  Id: number;
  Shape_Leng?: number;
  Shape_Area?: number;
  Estimasi: number;
  RTNew: string;
  "Sampah Plastik (kg)"?: number;
  "Sampah Organik (kg)"?: number;
  "sampah Anorganik (kg)"?: number;
  [key: string]: string | number | undefined | null;
}

// --- Tipe untuk Fitur GeoJSON ---
export type AppSpecificBuildingFeature = GeoJsonFeatureType<
  MultiPolygon,
  BuildingProperties
>;
export type AppFeatureCollection = GeoJsonFeatureCollectionType<
  MultiPolygon,
  BuildingProperties
>;
export type LeafletCompatibleBuildingFeature = GeoJsonFeatureType<
  Geometry,
  BuildingProperties
>;

// --- Tipe untuk Peta ---
export interface BasemapConfig {
  id: string;
  name: string;
  url: string;
  attribution: string;
  thumbnail: string;
}

export type SampahType =
  | "Estimasi"
  | "Sampah Plastik (kg)"
  | "Sampah Organik (kg)"
  | "sampah Anorganik (kg)";

export interface LegendItem {
  color: string;
  label: string;
}

// --- Tipe untuk Hasil Geocoding Nominatim ---
export interface GeocodingResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon?: string;
}

//  TIPE UNTUK STATE GLOBAL (ZUSTAND STORE)
export interface MapStoreState {
  // Data & Layer
  isDataLayerVisible: boolean;
  geoJsonData: AppFeatureCollection | null;
  allFeatures: AppSpecificBuildingFeature[];

  // Kontrol Peta
  activeSampahType: SampahType;
  selectedFeature: LeafletCompatibleBuildingFeature | null;
  currentBasemap: BasemapConfig;

  // State & Aksi Pencarian BARU
  searchTerm: string;
  searchResultCenter: LatLngExpression | null;
  geocodingSuggestions: GeocodingResult[]; // Untuk menyimpan saran autocomplete
  isGeocodingLoading: boolean; // Untuk menampilkan indikator loading

  // Aksi (Metode untuk mengubah state)
  setGeoJsonData: (data: AppFeatureCollection | null) => void;
  setAllFeatures: (features: AppSpecificBuildingFeature[]) => void;
  toggleDataLayerVisibility: () => void;
  setActiveSampahType: (type: SampahType) => void;
  setSelectedFeature: (
    feature: LeafletCompatibleBuildingFeature | null
  ) => void;
  setCurrentBasemap: (basemap: BasemapConfig) => void;
  setSearchTerm: (term: string) => void;
  setSearchResultCenter: (center: LatLngExpression | null) => void;
  fetchGeocodingSuggestions: () => void; // Aksi baru untuk autocomplete
  clearGeocodingSuggestions: () => void; // Aksi baru untuk membersihkan saran
}
