// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://bizintokyo.com',
	i18n: {
		defaultLocale: 'ja',
		locales: ['ja', 'en'],
		routing: { prefixDefaultLocale: false },
	},
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
