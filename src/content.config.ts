import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
	loader: glob({
		pattern: '**/*.md',
		base: './src/content/articles',
		generateId: ({ entry }) => entry.replace(/\.md$/, ''),
	}),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		category: z.enum(['venue', 'event', 'eventguide', 'news', 'column']),
		slug: z.string(),
		lang: z.enum(['ja', 'en']),
		description: z.string().max(160),
		image: z.string().optional(),
		keywords: z.array(z.string()).optional(),
		isPR: z.boolean().default(false),
	}),
});

export const collections = { articles };
