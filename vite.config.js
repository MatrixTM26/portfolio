import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/*
 * BASE_PATH is injected by the GitHub Actions workflow.
 * Falls back to '/' for local dev and Vercel deployments.
 */

const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
    base,
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
