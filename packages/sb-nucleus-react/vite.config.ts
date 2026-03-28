import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const nucleusRoot = path.resolve(__dirname, "../nucleus");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			// Specific: nucleus/loader is a directory import, must point to index.js
			{ find: "nucleus/loader", replacement: path.join(nucleusRoot, "loader/index.js") },
			// Catch-all: resolve any "nucleus/..." import to the sibling workspace package
			{ find: /^nucleus\/(.*)$/, replacement: path.join(nucleusRoot, "$1") },
			// Bare "nucleus" import
			{ find: /^nucleus$/, replacement: path.join(nucleusRoot, "dist/index.js") },
		],
	},
});
