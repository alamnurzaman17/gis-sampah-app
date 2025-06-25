import { create } from "zustand";
import { Map } from "leaflet";
import {
  BasemapConfig,
  AppSpecificBuildingFeature, // Atau tipe fitur lain yang sesuai
  SampahType, // Impor tipe SampahType
} from "@/types"; // Sesuaikan path jika perlu

export const basemapsData: { [key: string]: BasemapConfig } = {
  light: {
    name: "Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  },
  dark: {
    name: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri",
  },
};

interface MapState {
  map: Map | null;
  isDataVisible: boolean;
  activeBasemap: BasemapConfig;
  selectedFeature: AppSpecificBuildingFeature | null;
  activeSampahType: SampahType; // <<-- TAMBAHKAN INI
  setMap: (map: Map) => void;
  toggleDataVisibility: () => void;
  setActiveBasemap: (basemap: BasemapConfig) => void;
  setSelectedFeature: (feature: AppSpecificBuildingFeature | null) => void;
  setActiveSampahType: (type: SampahType) => void; // <<-- TAMBAHKAN INI
}

export const useMapStore = create<MapState>((set) => ({
  map: null,
  isDataVisible: true,
  activeBasemap: basemapsData.light,
  selectedFeature: null,
  activeSampahType: "Estimasi", // Nilai default untuk activeSampahType
  setMap: (map) => set({ map }),
  toggleDataVisibility: () =>
    set((state) => ({ isDataVisible: !state.isDataVisible })),
  setActiveBasemap: (basemap) => set({ activeBasemap: basemap }),
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
  setActiveSampahType: (type) => set({ activeSampahType: type }), // Implementasi setter
}));
