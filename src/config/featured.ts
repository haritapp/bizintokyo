export interface FeaturedRef {
	slug: string;
	category: 'venue' | 'event' | 'eventguide' | 'news' | 'column' | 'hotel' | 'tips';
}

// Editorial pick. Update this list to change "編集部のおすすめ" on the top page.
export const featuredArticles: FeaturedRef[] = [
	{ slug: 'tokyo-bigsight-guide', category: 'venue' },
	{ slug: 'sushi-tech-tokyo-2026', category: 'event' },
	{ slug: 'why-tokyo-business-events', category: 'column' },
	{ slug: 'overseas-guests-guide', category: 'eventguide' },
];
