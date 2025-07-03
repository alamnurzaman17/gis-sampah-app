import { LatLngExpression } from "leaflet";
import type { SampahType, LegendItem, BasemapConfig } from "@/types";

// Konfigurasi Peta Default (Tidak Diubah)
export const DEFAULT_MAP_CENTER: LatLngExpression = [-6.98043, 107.5945];
export const DEFAULT_MAP_ZOOM = 17;
export const DEFAULT_FLY_TO_ZOOM = 15;

// --- PALET WARNA BARU DITERAPKAN DI SINI ---
// Struktur dan label dipertahankan, hanya nilai 'color' dan jumlah kelas yang diubah
export const sampahColorRanges: Record<SampahType, LegendItem[]> = {
  // Palet Ungu untuk Estimasi (Tajam dan Netral)
  // Klasifikasi baru: 4 kelas berdasarkan NaturalBreaks (batas: 12, 15, 20, 25)
  // Estimasi: [
  //   { color: "#f3e8ff", label: "<= 12" }, // Sangat Rendah
  //   { color: "#d8b4fe", label: "> 12 - 15" }, // Rendah
  //   { color: "#a855f7", label: "> 15 - 20" }, // Sedang
  //   { color: "#9333ea", label: "> 20 - 25" }, // Tinggi
  // ],
  // Palet Biru untuk Sampah Plastik (Kontras Tinggi)
  // Klasifikasi baru: 4 kelas berdasarkan NaturalBreaks (batas: 12, 17, 22, 25)
  "Sampah Plastik (kg)": [
    { color: "#edf8fb", label: "<= 12 kg" }, // Sangat Rendah
    { color: "#b2e2e2", label: "> 12 - 17 kg" }, // Rendah
    { color: "#66c2a4", label: "> 17 - 22 kg" }, // Sedang
    { color: "#238b45", label: "> 22 - 25 kg" }, // Tinggi
  ],
  // Palet Hijau Zamrud untuk Sampah Organik (Lebih Kaya dan Jelas)
  // Klasifikasi baru: 3 kelas berdasarkan NaturalBreaks (batas: 5, 9, 12)
  "Sampah Organik (kg)": [
    { color: "#9080ff", label: "<= 5 kg" }, // Sangat Rendah
    { color: "#776bcd", label: "> 5 - 9 kg" }, // Rendah
    { color: "#5e569b", label: "> 9 - 12 kg" }, // Sedang
  ],
  // Palet Oranye/Coklat untuk Sampah Anorganik (Berbeda dan Jelas)
  // Klasifikasi baru: 3 kelas berdasarkan NaturalBreaks (batas: 2, 3, 8)
  "sampah Anorganik (kg)": [
    // Menggunakan 'sampah' huruf kecil sesuai kunci yang ada
    { color: "#fdcc8a", label: "<= 2 kg" }, // Sangat Rendah
    { color: "#fc8d59", label: "> 2 - 3 kg" }, // Rendah
    { color: "#d7301f", label: "> 3 - 8 kg" }, // Sedang
  ],
};

// Fungsi helper (Diubah sesuai klasifikasi baru)
// Logika ini telah disesuaikan dengan batas kelas NaturalBreaks yang baru.
export function getColorForValue(
  value: number | undefined,
  type: SampahType
): string {
  const ranges = sampahColorRanges[type];
  if (typeof value !== "number" || !ranges) return "#CCCCCC"; // Warna default jika nilai tidak valid atau tipe tidak dikenal

  // if (type === "Estimasi") {
  //   if (value <= 12) return ranges[0].color;
  //   if (value <= 15) return ranges[1].color;
  //   if (value <= 20) return ranges[2].color;
  //   if (value <= 25) return ranges[3].color;
  //   return ranges[ranges.length - 1].color; // Untuk nilai di atas batas tertinggi
  // }
  if (type === "Sampah Plastik (kg)") {
    if (value <= 12) return ranges[0].color;
    if (value <= 17) return ranges[1].color;
    if (value <= 22) return ranges[2].color;
    if (value <= 25) return ranges[3].color;
    return ranges[ranges.length - 1].color; // Untuk nilai di atas batas tertinggi
  }
  if (type === "Sampah Organik (kg)") {
    if (value <= 5) return ranges[0].color;
    if (value <= 9) return ranges[1].color;
    if (value <= 12) return ranges[2].color;
    return ranges[ranges.length - 1].color; // Untuk nilai di atas batas tertinggi
  }
  if (type === "sampah Anorganik (kg)") {
    // Menggunakan 'sampah' huruf kecil
    if (value <= 2) return ranges[0].color;
    if (value <= 3) return ranges[1].color;
    if (value <= 8) return ranges[2].color;
    return ranges[ranges.length - 1].color; // Untuk nilai di atas batas tertinggi
  }

  // Fallback jika tipe tidak cocok dengan klasifikasi yang ada
  return "#CCCCCC";
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
