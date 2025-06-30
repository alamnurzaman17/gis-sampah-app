"use client";

import { useState, useEffect } from "react";

// Breakpoint default untuk mobile (sesuai dengan Tailwind CSS 'md')
const MOBILE_BREAKPOINT = 768;

export function useBreakpoint() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fungsi untuk memeriksa ukuran window
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Panggil sekali saat komponen dimuat
    checkScreenSize();

    // Tambahkan event listener untuk memantau perubahan ukuran window
    window.addEventListener("resize", checkScreenSize);

    // Cleanup: hapus event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []); // Array dependensi kosong agar efek ini hanya berjalan sekali

  return { isMobile };
}
