import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content',
		generateId: ({ entry }) => entry.replace(/\.md$/, ''),
	}),
	schema: z.object({
		title: z.string(),
		description: z.string().max(200),
		date: z.coerce.date(),
		updated: z.coerce.date().optional(),
		category: z.enum(['venue', 'event', 'eventguide', 'news', 'column', 'hotel', 'tips']),
		slug: z.string(),
		lang: z.enum(['ja', 'en']),
		author: z.enum(['shintaro', 'editorial']).default('editorial'),
		template: z.enum(['guide', 'standard', 'event']).default('standard'),
		heroImage: z.string().optional().default(''),
		ogImage: z.string().optional().default(''),
		featured: z.boolean().default(false),
		keywords: z.array(z.string()).optional(),
		isPR: z.boolean().default(false),
	}),
});

export const collections = { articles };
