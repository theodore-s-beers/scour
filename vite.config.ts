import { sveltekit } from "@sveltejs/kit/vite";
import vercel from "@sveltejs/adapter-vercel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: vercel(),
		}),
	],
});
