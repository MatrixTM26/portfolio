import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        target: "es2020",
        cssCodeSplit: true,
        reportCompressedSize: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ["react", "react-dom"]
                },
                chunkFileNames: "assets/[name]-[hash].js",
                entryFileNames: "assets/[name]-[hash].js",
                assetFileNames: "assets/[name]-[hash][extname]"
            }
        }
    },
    server: {
        hmr: true
    }
});
