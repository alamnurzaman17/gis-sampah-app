"use client";

import React from "react";
import SidebarContent from "../SidebarContent";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    // Container utama, menggunakan transisi untuk muncul/hilang
    <div
      className={`fixed inset-0 z-[1002] transition-opacity duration-300 ease-in-out
                  ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      {/* Backdrop gelap, klik di sini akan menutup sidebar */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel sidebar yang sebenarnya */}
      <div
        className={`relative flex flex-col h-full w-[300px] bg-card shadow-xl p-3
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Masukkan konten sidebar di sini */}
        <SidebarContent onClose={onClose} />
      </div>
    </div>
  );
}
