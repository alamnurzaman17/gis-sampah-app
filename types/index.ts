import {
  Feature as GeoJsonFeatureType,
  MultiPolygon,
  Geometry,
  FeatureCollection as GeoJsonFeatureCollectionType,
} from "geojson";
import { LatLngExpression } from "leaflet";

// Tipe untuk basemap
export interface BasemapConfig {
  name: string;
  url: string;
  attribution: string;
}

// Definisikan semua properti yang MUNGKIN ada di data GeoJSON Anda
export interface BuildingProperties {
  Id: number;
  Shape_Leng?: number;
  Shape_Area?: number;
  Estimasi: number;
  RTNew: string;
  "Sampah Plastik (kg)"?: number;
  "Sampah Organik (kg)"?: number;
  "sampah Anorganik (kg)"?: number;
}

// Tipe fitur spesifik Anda dengan geometri MultiPolygon
export type AppSpecificBuildingFeature = GeoJsonFeatureType<
  MultiPolygon,
  BuildingProperties
>;

// Tipe koleksi fitur spesifik Anda
export type AppFeatureCollection = GeoJsonFeatureCollectionType<
  MultiPolygon,
  BuildingProperties
>;

// Tipe fitur generik untuk digunakan oleh callback Leaflet
export type LeafletCompatibleBuildingFeature<G extends Geometry = Geometry> =
  GeoJsonFeatureType<G, BuildingProperties>;

// Tipe untuk jenis sampah yang bisa dipilih untuk visualisasi
export type SampahType =
  | "Estimasi"
  | "Sampah Plastik (kg)"
  | "Sampah Organik (kg)"
  | "sampah Anorganik (kg)";

export interface LegendItem {
  color: string;
  label: string;
  count?: number;
}

// --- Tipe untuk State Global (Zustand Store) ---
export interface MapState {
  // Data & Layer
  map: L.Map | null; // Tipe Map dari Leaflet
  isDataVisible: boolean;
  geoJsonData: AppFeatureCollection | null; // Data utama yang mungkin difilter
  allFeatures: AppSpecificBuildingFeature[]; // SEMUA fitur asli untuk reset/pencarian

  // Kontrol Peta
  activeSampahType: SampahType;
  selectedFeature: AppSpecificBuildingFeature | null; // Konsisten dengan tipe data utama
  activeBasemap: BasemapConfig; // Ganti nama dari currentBasemap agar konsisten dengan setActiveBasemap
  searchTerm: string; // Jika ingin input pencarian dikelola global
  searchResultCenter: LatLngExpression | null; // Untuk flyTo hasil pencarian

  // Aksi (Metode untuk mengubah state)
  setMap: (map: L.Map | null) => void;
  setGeoJsonData: (data: AppFeatureCollection | null) => void; // Untuk data yang ditampilkan
  setAllFeatures: (features: AppSpecificBuildingFeature[]) => void; // Untuk semua data asli
  toggleDataVisibility: () => void;
  setActiveSampahType: (type: SampahType) => void;
  setSelectedFeature: (feature: AppSpecificBuildingFeature | null) => void;
  setActiveBasemap: (basemap: BasemapConfig) => void;
  setSearchTerm: (term: string) => void; // Jika ingin input pencarian dikelola global
  setSearchResultCenter: (center: LatLngExpression | null) => void;
}
