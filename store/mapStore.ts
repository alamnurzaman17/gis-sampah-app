// store/mapStore.ts
import { create } from "zustand";
import type { MapStoreState, GeocodingResult } from "@/types";
import { initialBasemap } from "@/lib/mapUtils";

export const useMapStore = create<MapStoreState>((set, get) => ({
  // --- STATE ---
  isDataLayerVisible: true,
  geoJsonData: null,
  allFeatures: [],
  activeSampahType: "Sampah Plastik (kg)",
  selectedFeature: null,
  currentBasemap: initialBasemap,
  searchTerm: "",
  searchResultCenter: null,
  geocodingSuggestions: [],
  isGeocodingLoading: false,

  // --- AKSI ---
  setGeoJsonData: (data) => set({ geoJsonData: data }),
  setAllFeatures: (features) => set({ allFeatures: features }),
  toggleDataLayerVisibility: () =>
    set((state) => ({ isDataLayerVisible: !state.isDataLayerVisible })),
  setActiveSampahType: (type) =>
    set({ activeSampahType: type, selectedFeature: null }),
  setSelectedFeature: (feature) => set({ selectedFeature: feature }),
  setCurrentBasemap: (basemap) => set({ currentBasemap: basemap }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResultCenter: (center) => set({ searchResultCenter: center }),
  clearGeocodingSuggestions: () => set({ geocodingSuggestions: [] }), // Aksi untuk membersihkan saran

  // --- AKSI PENCARIAN GEOCODING  ---
  fetchGeocodingSuggestions: async () => {
    const { searchTerm } = get();
    if (searchTerm.length < 3) {
      // Jangan cari jika input terlalu pendek
      set({ geocodingSuggestions: [] });
      return;
    }

    set({ isGeocodingLoading: true });

    try {
      // Gunakan URLSearchParams untuk encoding yang aman
      const params = new URLSearchParams({
        q: searchTerm,
        format: "json",
        addressdetails: "1",
        limit: "5", // Batasi hasil menjadi 5 saran
      });

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`Nominatim API error! status: ${response.status}`);
      }

      const data: GeocodingResult[] = await response.json();
      set({ geocodingSuggestions: data });
    } catch (error) {
      console.error("Failed to fetch geocoding suggestions:", error);
      set({ geocodingSuggestions: [] }); // Bersihkan jika error
    } finally {
      set({ isGeocodingLoading: false });
    }
  },
}));
