import { LatLngExpression } from "leaflet";
import type { SampahType, LegendItem, BasemapConfig } from "@/types";

// Konfigurasi Peta Default (Tidak Diubah)
export const DEFAULT_MAP_CENTER: LatLngExpression = [-6.98043, 107.5945];
export const DEFAULT_MAP_ZOOM = 17;
export const DEFAULT_FLY_TO_ZOOM = 15;

// --- PALET WARNA BARU DITERAPKAN DI SINI ---
// Struktur dan label dipertahankan, hanya nilai 'color' yang diubah.
export const sampahColorRanges: Record<SampahType, LegendItem[]> = {
  // Palet Ungu untuk Estimasi (Tajam dan Netral)
  Estimasi: [
    { color: "#f3e8ff", label: "0 - 25" },
    { color: "#d8b4fe", label: "26 - 50" },
    { color: "#a855f7", label: "51 - 75" },
    { color: "#9333ea", label: "76 - 100" },
    { color: "#7e22ce", label: "101 - 150" },
    { color: "#6b21a8", label: "151 - 200" },
    { color: "#581c87", label: "201 - 300" },
    { color: "#3b0764", label: "> 300" },
  ],
  // Palet Biru untuk Sampah Plastik (Kontras Tinggi)
  "Sampah Plastik (kg)": [
    { color: "#00ffff", label: "0 - 20 kg" },
    { color: "#00bfff", label: "20 - 40 kg" },
    { color: "#009fff", label: "40 - 60 kg" },
    { color: "#0080ff", label: "60 - 80 kg" },
    { color: "#0060ff", label: "> 80 kg" },
  ],
  // Palet Hijau Zamrud untuk Sampah Organik (Lebih Kaya dan Jelas)
  "Sampah Organik (kg)": [
    { color: "#9080ff", label: "0 - 20 kg" },
    { color: "#776bcd", label: "20.1 - 40 kg" },
    { color: "#5e569b", label: "40.1 - 60 kg" },
    { color: "#48446e", label: "60.1 - 80 kg" },
    { color: "#363445", label: "> 80 kg" },
  ],
  // Palet Oranye/Coklat untuk Sampah Anorganik (Berbeda dan Jelas)
  "sampah Anorganik (kg)": [
    { color: "#ffb400", label: "0 - 10 kg" },

    { color: "#d2980d", label: "10.1 - 20 kg" },

    { color: "#a57c1b", label: "20.1 - 30 kg" },

    { color: "#786028", label: "30.1 - 40 kg" },

    { color: "#363445", label: "> 40 kg" },
  ],
};

// Fungsi helper (Tidak Diubah)
// Logika ini tetap valid dan akan bekerja dengan warna baru secara otomatis.
export function getColorForValue(
  value: number | undefined,
  type: SampahType
): string {
  const ranges = sampahColorRanges[type];
  if (typeof value !== "number" || !ranges) return "#CCCCCC";

  if (type === "Estimasi") {
    if (value <= 25) return ranges[0].color;
    if (value <= 50) return ranges[1].color;
    if (value <= 75) return ranges[2].color;
    if (value <= 100) return ranges[3].color;
    if (value <= 150) return ranges[4].color;
    if (value <= 200) return ranges[5].color;
    if (value <= 300) return ranges[6].color;
    return ranges[7].color;
  }
  if (type === "Sampah Plastik (kg)") {
    if (value <= 20) return ranges[0].color;
    if (value <= 40) return ranges[1].color;
    if (value <= 60) return ranges[2].color;
    if (value <= 80) return ranges[3].color;
    return ranges[4].color;
  }
  if (type === "Sampah Organik (kg)") {
    if (value <= 20) return ranges[0].color;
    if (value <= 40) return ranges[1].color;
    if (value <= 60) return ranges[2].color;
    if (value <= 80) return ranges[3].color;
    return ranges[4].color;
  }
  if (type === "sampah Anorganik (kg)") {
    if (value <= 10) return ranges[0].color;
    if (value <= 20) return ranges[1].color;
    if (value <= 30) return ranges[2].color;
    if (value <= 40) return ranges[3].color;
    return ranges[4].color;
  }

  return ranges[ranges.length - 1]?.color || "#CCCCCC";
}

// Konfigurasi Basemap (Tidak Diubah)
export const initialBasemap: BasemapConfig = {
  id: "light",
  name: "Light",
  url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  thumbnail: "/images/basemap-light.png",
};

export const availableBasemaps: Record<string, BasemapConfig> = {
  light: initialBasemap,
  dark: {
    id: "dark",
    name: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
    thumbnail: "/images/basemap-dark.png",
  },
  satellite: {
    id: "satellite",
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri",
    thumbnail: "/images/basemap-satellite.png",
  },
};
