// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import remarkHotelCard from './src/lib/remarkHotelCard.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://bizintokyo.com',
	i18n: {
		defaultLocale: 'ja',
		locales: ['ja', 'en'],
		routing: { prefixDefaultLocale: false },
	},
	integrations: [sitemap()],
	markdown: {
		remarkPlugins: [remarkHotelCard],
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
