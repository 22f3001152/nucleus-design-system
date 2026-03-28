import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

const nucleusRoot = path.resolve(__dirname, "../nucleus");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			// Catch-all: resolve any "nucleus/..." import to the sibling workspace package
			{ find: /^nucleus\/(.*)$/, replacement: path.join(nucleusRoot, "$1") },
			// Bare "nucleus" import
			{ find: /^nucleus$/, replacement: path.join(nucleusRoot, "dist/index.js") },
		],
	},
});
