// store/mapStore.ts
import { create } from "zustand";
import type {
  MapStoreState,
  GeocodingResult,
  RadiusAnalysisStats,
  AppSpecificBuildingFeature,
  GroupedStat,
} from "@/types";
import {
  initialBasemap,
  sampahColorRanges,
  getColorForValue,
} from "@/lib/mapUtils";

// Helper function ini akan dipanggil secara dinamis untuk menghindari error SSR
async function getPolygonCenter(feature: AppSpecificBuildingFeature) {
  const L = (await import("leaflet")).default;
  const coords = feature.geometry.coordinates[0][0];
  const latSum = coords.reduce((sum, p) => sum + p[1], 0);
  const lngSum = coords.reduce((sum, p) => sum + p[0], 0);
  return L.latLng(latSum / coords.length, lngSum / coords.length);
}

export const useMapStore = create<MapStoreState>((set, get) => ({
  // --- STATE YANG SUDAH ADA ---
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

  // --- STATE BARU UNTUK ANALISIS RADIUS ---
  isRadiusAnalysisActive: false,
  analysisRadius: 50, // Default 50 meter
  featuresInRadius: [],
  radiusAnalysisStats: null,

  // --- AKSI ---
  setGeoJsonData: (data) => set({ geoJsonData: data }),
  setAllFeatures: (features) => set({ allFeatures: features }),
  toggleDataLayerVisibility: () =>
    set((state) => ({ isDataLayerVisible: !state.isDataLayerVisible })),

  // Update setActiveSampahType untuk me-reset analisis
  setActiveSampahType: (type) => {
    set({ activeSampahType: type, selectedFeature: null });
    get().clearRadiusAnalysis();
  },

  // Update setSelectedFeature untuk memicu analisis secara otomatis
  setSelectedFeature: (feature) => {
    set({ selectedFeature: feature });
    if (feature) {
      get().runRadiusAnalysis(); // Jalankan analisis saat fitur baru dipilih
    } else {
      get().clearRadiusAnalysis(); // Bersihkan jika tidak ada fitur yang dipilih
    }
  },

  setCurrentBasemap: (basemap) => set({ currentBasemap: basemap }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResultCenter: (center) => set({ searchResultCenter: center }),
  clearGeocodingSuggestions: () => set({ geocodingSuggestions: [] }),

  // Aksi pencarian geocoding yang sudah ada
  fetchGeocodingSuggestions: async () => {
    const { searchTerm } = get();
    if (searchTerm.length < 3) {
      set({ geocodingSuggestions: [] });
      return;
    }
    set({ isGeocodingLoading: true });
    try {
      const params = new URLSearchParams({
        q: searchTerm,
        format: "json",
        addressdetails: "1",
        limit: "5",
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
      set({ geocodingSuggestions: [] });
    } finally {
      set({ isGeocodingLoading: false });
    }
  },

  // Aksi clearSearch yang mungkin Anda miliki
  clearSearch: () => {
    set({
      searchTerm: "",
      searchResultCenter: null,
      geocodingSuggestions: [],
    });
  },

  // --- AKSI BARU UNTUK ANALISIS RADIUS ---
  setAnalysisRadius: (radius: number) => {
    set({ analysisRadius: radius });
    if (get().selectedFeature) {
      get().runRadiusAnalysis(); // Jalankan ulang analisis jika radius berubah
    }
  },

  runRadiusAnalysis: async () => {
    const { selectedFeature, allFeatures, analysisRadius, activeSampahType } =
      get();
    if (!selectedFeature) {
      get().clearRadiusAnalysis();
      return;
    }

    const centerPoint = await getPolygonCenter(
      selectedFeature as AppSpecificBuildingFeature
    );

    const distancePromises = allFeatures.map(async (feature) => {
      if (feature.properties.Id === selectedFeature.properties.Id) return null;
      const featureCenter = await getPolygonCenter(feature);
      const distance = centerPoint.distanceTo(featureCenter);
      return distance <= analysisRadius ? feature : null;
    });

    const results = await Promise.all(distancePromises);
    const featuresInRadius = results.filter(
      Boolean
    ) as AppSpecificBuildingFeature[];

    const colorRanges = sampahColorRanges[activeSampahType];
    const statsMap = new Map<string, GroupedStat>();
    colorRanges.forEach((range) => {
      statsMap.set(range.label, {
        rangeLabel: range.label,
        color: range.color,
        count: 0,
      });
    });

    featuresInRadius.forEach((feature) => {
      const value = feature.properties[activeSampahType] as number | undefined;
      const color = getColorForValue(value, activeSampahType);
      const correspondingRange = colorRanges.find((r) => r.color === color);
      if (correspondingRange) {
        const stat = statsMap.get(correspondingRange.label);
        if (stat) {
          stat.count += 1;
        }
      }
    });

    const finalStats: RadiusAnalysisStats = {
      totalCount: featuresInRadius.length,
      groupedStats: Array.from(statsMap.values()).filter(
        (stat) => stat.count > 0
      ),
    };

    set({
      featuresInRadius,
      radiusAnalysisStats: finalStats,
      isRadiusAnalysisActive: true,
    });
  },

  clearRadiusAnalysis: () =>
    set({
      featuresInRadius: [],
      radiusAnalysisStats: null,
      isRadiusAnalysisActive: false,
    }),
}));
