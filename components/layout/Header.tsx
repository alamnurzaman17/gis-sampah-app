// components/ui/Header.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Loader2 } from "lucide-react";
import { useMapStore } from "@/store/mapStore";
import { useDebounce } from "@/hooks/useDebounce"; // Hook kustom (akan kita buat)
import type { GeocodingResult } from "@/types";
import { cn } from "@/lib/utils";

function Header() {
  const {
    searchTerm,
    setSearchTerm,
    fetchGeocodingSuggestions,
    geocodingSuggestions,
    clearGeocodingSuggestions,
    setSearchResultCenter,
    isGeocodingLoading,
  } = useMapStore();

  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Gunakan debounce untuk menunda pemanggilan API saat pengguna mengetik
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Tunda 500ms

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchGeocodingSuggestions();
    } else {
      clearGeocodingSuggestions();
      setSearchResultCenter(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // Efek untuk menutup daftar saran saat klik di luar area pencarian
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        clearGeocodingSuggestions();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchContainerRef, clearGeocodingSuggestions]);

  const handleSuggestionClick = (suggestion: GeocodingResult) => {
    const lat = parseFloat(suggestion.lat);
    const lon = parseFloat(suggestion.lon);

    setSearchTerm(suggestion.display_name); // Set input text dengan nama lokasi
    setSearchResultCenter([lat, lon]); // Pindahkan peta ke lokasi
    clearGeocodingSuggestions(); // Sembunyikan saran
    setIsFocused(false); // Hilangkan fokus
  };

  return (
    <header
      className={cn(
        "absolute top-4 z-[1000]",
        // Style untuk Mobile: Beri jarak dari tombol menu kiri dan toolbar kanan
        "left-16 right-4",
        // Style untuk Desktop (md dan lebih besar): Kembali ke tengah
        "md:left-0 md:right-0 md:mx-auto md:w-full md:max-w-md"
      )}
    >
      <div className="relative" ref={searchContainerRef}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground">
          <Search size={20} />
        </div>
        <Input
          type="search"
          placeholder="Temukan Lokasi..."
          className={cn(
            // Base styles
            "w-full h-12 pl-12 pr-4 rounded-full shadow-lg shadow-black/5 border-0",
            // Colors
            "bg-white dark:bg-neutral-900",
            "text-black dark:text-white",
            "placeholder:text-neutral-500 dark:placeholder:text-neutral-400",
            // Focus
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          )}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {isGeocodingLoading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
        )}

        {/* Daftar Saran Autocomplete */}
        {isFocused && geocodingSuggestions.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-background rounded-lg shadow-lg border border-border overflow-hidden">
            <ul>
              {geocodingSuggestions.map((suggestion) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-accent"
                >
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-foreground truncate">
                    {suggestion.display_name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
