import { LatLngExpression } from "leaflet";
import type { SampahType, LegendItem, BasemapConfig } from "@/types";

// --- TAMBAHAN BARU: Konfigurasi Peta Default ---
export const DEFAULT_MAP_CENTER: LatLngExpression = [-6.98043, 107.5945]; // SESUAIKAN JIKA PERLU

export const DEFAULT_MAP_ZOOM = 17; // SESUAIKAN JIKA PERLU
export const DEFAULT_FLY_TO_ZOOM = 15; // Zoom saat pindah ke lokasi pencarian

// SESUAIKAN RENTANG NILAI DAN WARNA INI DENGAN DATA ANDA
// Ini adalah jantung dari styling dan legenda Anda
export const sampahColorRanges: Record<SampahType, LegendItem[]> = {
  Estimasi: [
    { color: "#FFFFE5", label: "0 - 25" },
    { color: "#FFF7BC", label: "26 - 50" },
    { color: "#FEE391", label: "51 - 75" },
    { color: "#FEC44F", label: "76 - 100" },
    { color: "#FE9929", label: "101 - 150" },
    { color: "#EC7014", label: "151 - 200" },
    { color: "#CC4C02", label: "201 - 300" },
    { color: "#8C2D04", label: "> 300" },
  ],
  "Sampah Plastik (kg)": [
    // Menggunakan skema warna hijau dari gambar Anda
    { color: "#22C55E", label: "0 - 20 kg" }, // green-500
    { color: "#16A34A", label: "20 - 40 kg" }, // green-600
    { color: "#15803D", label: "40 - 60 kg" }, // green-700
    { color: "#166534", label: "60 - 80 kg" }, // green-800
    { color: "#14532D", label: "> 80 kg" }, // green-900
  ],
  "Sampah Organik (kg)": [
    { color: "#F7FCF5", label: "0 - 20 kg" },
    { color: "#E5F5E0", label: "20.1 - 40 kg" },
    { color: "#C7E9C0", label: "40.1 - 60 kg" },
    { color: "#A1D99B", label: "60.1 - 80 kg" },
    { color: "#74C476", label: "> 80 kg" },
  ],
  "sampah Anorganik (kg)": [
    { color: "#FFF5EB", label: "0 - 10 kg" },
    { color: "#FEE6CE", label: "10.1 - 20 kg" },
    { color: "#FDD0A2", label: "20.1 - 30 kg" },
    { color: "#FDAE6B", label: "30.1 - 40 kg" },
    { color: "#FD8D3C", label: "> 40 kg" },
  ],
};

// Fungsi helper untuk mendapatkan warna berdasarkan nilai dan tipe sampah
export function getColorForValue(
  value: number | undefined,
  type: SampahType
): string {
  const ranges = sampahColorRanges[type];
  if (typeof value !== "number" || !ranges) return "#CCCCCC"; // Default jika tipe tidak ada atau nilai tidak valid

  // PENTING: Sesuaikan logika if/else ini agar sesuai dengan rentang `label` di atas
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
  // Fallback jika tidak ada kondisi yang cocok (seharusnya tidak terjadi jika logika if/else lengkap)
  return ranges[ranges.length - 1]?.color || "#CCCCCC";
}

// Konfigurasi Basemap
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
    id: "dark", // Sesuai dengan gambar referensi Anda
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
