"use client";

import { useState, useEffect } from "react";

// Definisikan breakpoint Anda (sesuai dengan Tailwind CSS)
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = (breakpoint: Breakpoint): boolean => {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    // Fungsi untuk memeriksa ukuran layar
    const handleResize = () => {
      if (window.innerWidth < breakpoints[breakpoint]) {
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
    };

    // Panggil sekali saat komponen dimuat
    handleResize();

    // Tambahkan event listener untuk memantau perubahan ukuran window
    window.addEventListener("resize", handleResize);

    // Cleanup: hapus event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]); // Jalankan ulang efek jika breakpoint berubah

  return isMatch;
};
