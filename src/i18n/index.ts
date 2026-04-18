import { ja } from './ja';
import { en } from './en';

export type Lang = 'ja' | 'en';

const dict = { ja, en };

export function t(lang: Lang) {
	return dict[lang];
}

export const CATEGORIES = ['venue', 'event', 'eventguide', 'news', 'column', 'hotel', 'tips'] as const;
export type Category = (typeof CATEGORIES)[number];

export const ARTICLE_CATEGORIES = ['venue', 'event', 'eventguide', 'news', 'column'] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const PLACEHOLDER_CATEGORIES = ['hotel', 'tips'] as const;
