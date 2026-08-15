import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://space-noble-cat.tsu.sh",
  vite: {
    plugins: [tailwindcss()],
  },
});
