"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react"; // Gunakan 'X' saja, karena 'XIcon' mungkin tidak ada

import { cn } from "@/lib/utils";

// ... (kode Sheet, SheetTrigger, SheetClose, SheetPortal tidak berubah) ...
function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

// --- LAKUKAN SEMUA PERUBAHAN DI SINI ---

// SheetOverlay tidak kita gunakan jika modal={false}, jadi biarkan saja.
function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
        className
      )}
      {...props}
    />
  );
}

// Ubah SheetContent secara signifikan
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: "top" | "right" | "bottom" | "left";
}) {
  return (
    <SheetPortal>
      {/* Kita tidak render SheetOverlay di sini agar tidak ada background full-screen saat modal=false */}
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(
          // --- STYLE DEFAULT BARU ---
          "bg-black/60 backdrop-blur-md border-white/10 shadow-2xl text-white p-6",
          // --- Class animasi dan posisi ---
          "data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" &&
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full border-l-0 md:border-l w-full md:max-w-sm",
          side === "left" &&
            "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full border-r-0 md:border-r w-full md:max-w-sm",
          side === "top" &&
            "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" &&
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className // Memungkinkan override jika diperlukan
        )}
        {...props}
      >
        {children}

        {/* --- TOMBOL CLOSE KUSTOM SEBAGAI DEFAULT --- */}
        <SheetPrimitive.Close className="absolute top-4 right-4 p-1.5 rounded-full text-white/70 hover:bg-white/20 hover:text-white transition-colors">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

// Ubah default style untuk Header, Title, dan Description
function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      // Header tidak butuh padding default lagi karena sudah diatur di SheetContent
      className={cn("flex flex-col space-y-2 text-left", className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      // Warna putih solid sebagai default
      className={cn("text-lg font-semibold text-white", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      // Putih dengan opacity sebagai default
      className={cn("text-sm text-white/70", className)}
      {...props}
    />
  );
}

// ... (SheetFooter tetap sama, export juga sama)
function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
