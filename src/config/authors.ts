export type AuthorKey = 'shintaro' | 'editorial';

export interface Author {
	name: string;
	nameEn: string;
	role: string;
	roleEn: string;
	bio: string;
	bioEn: string;
	avatar: string;
}

export const authors: Record<AuthorKey, Author> = {
	shintaro: {
		name: 'Shintaro Hari',
		nameEn: 'Shintaro Hari',
		role: '編集長',
		roleEn: 'Editor-in-Chief',
		bio: '東京のビジネスイベントを海外に発信する編集長。Conec-tando, Inc. 代表。',
		bioEn: 'Editor-in-Chief dedicated to sharing Tokyo\'s business event scene with the world. Founder of Conec-tando, Inc.',
		avatar: '/images/authors/shintaro.jpg',
	},
	editorial: {
		name: 'BizinTokyo編集部',
		nameEn: 'BizinTokyo Editorial Team',
		role: '編集部',
		roleEn: 'Editorial Team',
		bio: '海外ビジネストラベラー向けに実用的な情報を発信する編集部。',
		bioEn: 'The editorial team delivering practical information for international business travelers.',
		avatar: '/images/authors/editorial.jpg',
	},
};
