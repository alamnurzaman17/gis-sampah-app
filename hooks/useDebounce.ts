// hooks/useDebounce.ts
import { useState, useEffect } from "react";

// T adalah tipe generik untuk nilai yang akan di-debounce
export function useDebounce<T>(value: T, delay: number): T {
  // State untuk menyimpan nilai yang sudah di-debounce
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Atur timer untuk mengupdate debouncedValue setelah `delay` ms
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Bersihkan timer setiap kali `value` atau `delay` berubah
      // Ini mencegah update jika pengguna terus mengetik
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Hanya jalankan ulang efek jika value atau delay berubah
  );

  return debouncedValue;
}
