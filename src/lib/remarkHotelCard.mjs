import { visit } from 'unist-util-visit';

const escapeHtml = (s = '') =>
	String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');

const stripQuotes = (v) => v.trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');

function parseBlock(text) {
	const lines = text.split('\n').map((l) => l.trimEnd()).filter((l) => l.length > 0);
	const out = {};
	for (const line of lines) {
		const idx = line.indexOf(':');
		if (idx <= 0) continue;
		const key = line.slice(0, idx).trim();
		const val = stripQuotes(line.slice(idx + 1));
		out[key] = val;
	}
	return out;
}

function renderCard(data, lang) {
	const isEn = lang === 'en';
	const name = isEn ? data.nameEn || data.name : data.name;
	const description = isEn ? data.descriptionEn || data.description : data.description;
	const access = isEn ? data.accessEn || data.access : data.access;
	const price = isEn ? data.priceEn || data.price : data.price;
	const linkText = isEn ? data.linkTextEn || data.linkText : data.linkText;
	const link = data.link || '#';
	const image = data.image || '';
	const rating = Math.max(0, Math.min(5, parseInt(data.rating ?? '0', 10) || 0));

	const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

	return `<aside class="hotel-card my-8 border border-[#E5E5E5] bg-white p-5 sm:p-6 transition hover:shadow-sm not-prose">
	<div class="flex flex-col sm:flex-row gap-5">
		<div class="sm:w-48 flex-shrink-0 aspect-[4/3] bg-[#FAFAF7] overflow-hidden">${
			image
				? `<img src="${escapeHtml(image)}" alt="${escapeHtml(name)}" class="w-full h-full object-cover" loading="lazy" />`
				: `<div class="w-full h-full flex items-center justify-center text-[#6B6B6B] text-xs">No image</div>`
		}</div>
		<div class="flex-1 min-w-0">
			<h4 class="text-lg font-medium text-[#1A1A1A] m-0">${escapeHtml(name)}</h4>
			<div class="text-[#165E83] text-sm mt-1 tracking-widest">${stars}</div>
			${description ? `<p class="text-[#1A1A1A] text-sm leading-relaxed mt-3 mb-0">${escapeHtml(description)}</p>` : ''}
			<dl class="text-sm text-[#6B6B6B] mt-3 space-y-1">
				${access ? `<div><dt class="inline">${isEn ? 'Access' : 'アクセス'}：</dt><dd class="inline">${escapeHtml(access)}</dd></div>` : ''}
				${price ? `<div><dt class="inline">${isEn ? 'Price' : '料金'}：</dt><dd class="inline">${escapeHtml(price)}</dd></div>` : ''}
			</dl>
			<a href="${escapeHtml(link)}" target="_blank" rel="sponsored nofollow noopener" class="inline-flex items-center gap-1 mt-4 px-4 py-2 bg-[#165E83] text-white text-sm hover:bg-[#0F4A6B] transition no-underline">
				${escapeHtml(linkText || (isEn ? 'Book Now' : '予約する'))} →
			</a>
		</div>
	</div>
</aside>`;
}

const opener = /^:::hotel-card\s*$/m;

export default function remarkHotelCard() {
	return (tree, file) => {
		const lang = file?.data?.astro?.frontmatter?.lang || 'ja';
		visit(tree, 'paragraph', (node) => {
			const text = node.children
				.map((c) => {
					if (c.type === 'text') return c.value;
					if (c.type === 'break') return '\n';
					return '';
				})
				.join('');
			if (!opener.test(text)) return;
			const m = text.match(/:::hotel-card\s*\n([\s\S]*?)\n:::/);
			if (!m) return;
			const data = parseBlock(m[1]);
			node.type = 'html';
			node.value = renderCard(data, lang);
			delete node.children;
		});
	};
}
