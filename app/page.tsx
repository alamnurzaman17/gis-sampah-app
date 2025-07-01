"use client";

import { useBreakpoint } from "@/hooks/use-breakpoint";
import DesktopMapWrapper from "@/components/layout/DekstopMapWrapper";
import MobileMapWrapper from "@/components/layout/MobileMapWrapper";

export default function Home() {
  // Gunakan hook untuk mendeteksi jika layar < 1024px (lg breakpoint di Tailwind)
  const isMobile = useBreakpoint("lg");

  // Tampilkan komponen yang sesuai
  // Jika isMobile true, render MobileMapWrapper. Jika false, render DesktopMapWrapper.
  return isMobile ? <MobileMapWrapper /> : <DesktopMapWrapper />;
}
