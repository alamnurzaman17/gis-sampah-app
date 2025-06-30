# GisSampah App - Aplikasi Pemetaan Sampah

Selamat datang di GisSampah App, sebuah platform pemetaan interaktif yang dibangun dengan Next.js untuk memvisualisasikan dan menganalisis data sampah di suatu area. Aplikasi ini menyediakan antarmuka yang bersih dan modern untuk menampilkan data geografis dengan berbagai fitur.

![Screenshot Aplikasi](https://i.ibb.co/L5Q2ZfB/image.png)

---

## ✨ Fitur Utama

- **Peta Interaktif**: Tampilan peta yang mulus menggunakan Leaflet.js.
- **Visualisasi Data Dinamis**: Data GeoJSON bangunan ditampilkan dan diwarnai berdasarkan atribut yang dipilih (misalnya, volume sampah plastik, dll.).
- **Pencarian Lokasi Geografis**: Mencari nama tempat atau alamat di seluruh dunia menggunakan API Nominatim, dengan saran autocomplete.
- **Kontrol Layer**: Menampilkan atau menyembunyikan layer data bangunan.
- **Pilihan Basemap**: Beralih antara tema peta Light, Dark, dan Satellite.
- **Toolbar Peta**: Kontrol terpusat untuk Zoom In/Out, kembali ke posisi awal, dan memilih basemap.
- **Info Detail**: Menampilkan informasi rinci dari bangunan yang diklik dalam panel `Sheet` yang elegan.
- **Tooltip Interaktif**: Informasi singkat (ID dan RT) muncul saat kursor diarahkan ke bangunan.
- **Legenda Dinamis**: Legenda peta otomatis diperbarui sesuai dengan visualisasi data yang aktif.

---

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Peta**: [Leaflet.js](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Komponen UI**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Geocoding API**: [Nominatim (OpenStreetMap)](https://nominatim.org/)

---

## 📁 Struktur Folder Proyek

Struktur folder proyek ini diorganisir untuk modularitas dan kemudahan pemeliharaan.

```
gissampah-app/
├── app/                  # Direktori utama Next.js App Router (halaman dan layout)
├── components/
│   ├── map/              # Komponen inti terkait peta (MapDisplay, GeoJsonLayer, dll.)
│   └── ui/               # Komponen UI kustom dan dari shadcn/ui
├── config/               # File konfigurasi (misal: basemaps, warna legenda)
├── hooks/                # Hooks kustom React (misal: useDebounce)
├── lib/                  # Fungsi utilitas (mapUtils.ts, utils.ts dari shadcn)
├── public/
│   ├── data/             # Tempat penyimpanan file GeoJSON
│   └── images/           # Gambar thumbnail untuk basemap
├── store/                # State management global (Zustand store)
├── types/                # Definisi tipe TypeScript
└── ...                   # File konfigurasi Next.js, Tailwind, dll.
```

---

## 🏁 Memulai Proyek

### Prasyarat

- [Node.js](https://nodejs.org/) (versi LTS direkomendasikan)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/) atau [pnpm](https://pnpm.io/)

### Instalasi

1.  Clone repositori ini:
    ```bash
    git clone [URL_REPOSITORI_ANDA]
    ```
2.  Masuk ke direktori proyek:
    ```bash
    cd gissampah-app
    ```
3.  Instal semua dependensi:
    ```bash
    npm install
    # atau
    yarn install
    ```

### Menjalankan Server Pengembangan

Setelah instalasi selesai, jalankan server pengembangan:

```bash
npm run dev
# atau
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

---
