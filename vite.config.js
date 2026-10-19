import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Saat di-deploy di subfolder (GitHub Pages: /demo-laundry-kilat/), jalur
  // aset perlu disesuaikan. Di alamat utama, biarkan default "/".
  base: process.env.VITE_BASE || "/",
  plugins: [react(), tailwindcss()],
  build: { chunkSizeWarningLimit: 300 },
});
