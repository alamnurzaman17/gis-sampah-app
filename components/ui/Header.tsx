"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    // Penyesuaian: Gunakan padding dan max-width yang lebih fleksibel
    <header className="absolute top-4 left-0 right-0 mx-auto z-10 w-full max-w-lg px-4 md:max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
        <Input
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
        />
      </div>
    </header>
  );
};
export default Header;
