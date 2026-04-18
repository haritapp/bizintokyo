# bizintokyo.com 全面リニューアル 完全仕様書

**作成日：2026年4月18日**
**対象：Cowork / Claude Code 実装担当**
**プロジェクトオーナー：Shintaro Hari**

---

## 📑 目次

1. [プロジェクト概要](#1-プロジェクト概要)
2. [技術スタック](#2-技術スタック)
3. [現状と進捗](#3-現状と進捗)
4. [URL構造とSEO](#4-url構造とseo)
5. [デザインシステム](#5-デザインシステム)
6. [ページ別仕様](#6-ページ別仕様)
7. [記事テンプレート仕様](#7-記事テンプレート仕様)
8. [問い合わせフォーム](#8-問い合わせフォーム)
9. [多言語対応](#9-多言語対応)
10. [記事移行・作成ルール](#10-記事移行作成ルール)
11. [重要な禁止事項](#11-重要な禁止事項)
12. [実装優先順位](#12-実装優先順位)

---

## 1. プロジェクト概要

### サイトの目的

訪日外国人ビジネストラベラー・イベント参加者向けに、東京のビジネスイベント会場情報・ホテル情報・交通情報を提供するメディアサイト。ホテルアフィリエイトで収益化。

### ビジネスモデル

```
conec-tando.com（BtoB）= イベント運営者向け
       ↕ 相互送客
bizintokyo.com（BtoC）= イベント参加者向け
```

### ターゲット層

**メイン：** スタートアップ・テック層（若め・モダン・国際的）

---

## 2. 技術スタック

| 項目 | 選定 |
|---|---|
| フレームワーク | Astro |
| CSS | Tailwind CSS |
| ホスティング | Cloudflare Pages |
| ソース管理 | GitHub (`haritapp/bizintokyo`) |
| ドメインレジストラ | お名前.com |
| CMS | Markdown（frontmatter形式） |
| 記事生成 | Claude Project の記事エージェント |
| フォーム | Formspree（Phase 1）→ Pages Functions（Phase 2） |

---

## 3. 現状と進捗

### リポジトリ情報

| 項目 | 値 |
|---|---|
| GitHub | `github.com/haritapp/bizintokyo` |
| ブランチ | `main`（プロダクション） |
| 現在のURL | `bizintokyo.pages.dev` |
| 将来の独自ドメイン | `bizintokyo.com` |
| ローカルパス | `~/Projects/bizintokyo` |
| ビルドコマンド | `npm run build` |
| 出力ディレクトリ | `dist` |

### 完了済み

- Astro最小構成投入（Coming Soon表示）
- Cloudflare Pages稼働中
- GitHub連携・自動デプロイ構築
- ヘッダー（Header.astro）実装済み

### これから実装する内容

本仕様書の全項目を実装する。

---

## 4. URL構造とSEO

### 新URL構造（SEO最適化）

**カテゴリ一覧ページ：**

```
/venue/              ← 会場
/event/              ← イベント
/eventguide/         ← イベントガイド
/news/               ← ニュース
/column/             ← コラム
/hotel/              ← ホテル（準備中表示）
/tips/               ← お役立ち情報（準備中表示）
```

**記事詳細ページ：**

```
/venue/[slug]
/event/[slug]
/eventguide/[slug]
/news/[slug]
/column/[slug]
```

**英語版：**

```
/en/venue/
/en/venue/[slug]
（以下同様）
```

**その他：**

```
/contact
/en/contact
```

### 301リダイレクト設定（必須）

Cloudflare Pagesの `_redirects` ファイルで以下を設定：

```
/venuetag/venue           /venue/           301
/eventtag/event           /event/           301
/eventguidetag/eventguide /eventguide/      301
/newstag/news             /news/            301
/columntag/column         /column/          301
/en/venuetag/venue        /en/venue/        301
/en/eventtag/event        /en/event/        301
/en/eventguidetag/eventguide /en/eventguide/ 301
/en/newstag/news          /en/news/         301
/en/columntag/column      /en/column/       301
```

**重要：** 既存STUDIO版のURLからのSEO評価を新URLに引き継ぐため、この301リダイレクトは必須。

### SEO対策実装項目

**必須実装：**

1. **sitemap.xml** 自動生成（`@astrojs/sitemap`プラグイン）
2. **robots.txt** 設置
3. **canonical URL** 各ページに自動設定
4. **hreflangタグ** 日英切替用（`x-default`含む）
5. **メタタグ**
   - `<title>` 各ページ固有
   - `<meta name="description">` 120-160文字
   - OGP（og:title, og:description, og:image, og:url, og:type）
   - Twitter Card（summary_large_image）
6. **構造化データ（JSON-LD）**
   - Article（記事ページ）
   - BreadcrumbList（全ページ）
   - Organization（サイト全体）
   - WebSite（検索ボックス対応）

### ページタイトルの形式

**カテゴリ一覧ページ：**

```
会場一覧 | BizinTokyo - 東京のビジネスイベント会場完全ガイド
イベント一覧 | BizinTokyo - 東京のビジネスイベント情報
イベントガイド | BizinTokyo - 参加者向け完全ガイド
ニュース | BizinTokyo - ビジネスイベント最新情報
コラム | BizinTokyo - 東京ビジネスインサイト
ホテル | BizinTokyo - ビジネストラベラー向けホテル情報
お役立ち情報 | BizinTokyo - ビジネスイベント参加のコツ
```

**記事詳細ページ：**

```
[記事タイトル] | [カテゴリ名] | BizinTokyo
```

**英語版：**

```
Venues | BizinTokyo - Complete Guide to Business Event Venues in Tokyo
Events | BizinTokyo - Tokyo Business Event Information
（以下同様）
```

---

## 5. デザインシステム

### コンセプト

**「静」Japanese Modern Minimalism**

- 余白と線の美しさで日本を表現
- オリエンタルや装飾的な「和」は使わない
- 日本庭園や禅の静けさ × モダンミニマリズム
- ベンチマーク：Airbnb、The Tokyo Edition、Aesop、無印良品、Monocle

### 配色（確定版）

```css
--color-base:        #FFFFFF;   /* 純白 */
--color-text:        #1A1A1A;   /* 墨色（やわらかい黒） */
--color-text-sub:    #6B6B6B;   /* 墨色の薄め（補助情報用） */
--color-brand:       #1A1A1A;   /* ブランドカラー（ロゴ・見出し） */
--color-border:      #E5E5E5;   /* 区切り線（極薄グレー） */
--color-bg-sub:      #FAFAF7;   /* 背景サブ（生成り） */
--color-accent:      #165E83;   /* 藍色（リンク・ボタン・強調） */
--color-accent-dark: #0F4A6B;   /* 濃い藍（ホバー時） */
```

### フォント

**日本語：** Noto Sans JP
- ウェイト：300（Light）、400（Regular）、500（Medium）、700（Bold）
- 見出しは細め（300-400）を使用
- 太いウェイトは極力使わない

**英語：** Inter
- ウェイト：300、400、500、700
- シリコンバレー系スタートアップで最も使われる

**読み込み方法：**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">
```

### フォントサイズ

```css
h1 { font-size: 36-48px; font-weight: 300-400; }
h2 { font-size: 28px; font-weight: 400; }
h3 { font-size: 22px; font-weight: 400; }
h4 { font-size: 18px; font-weight: 500; }
body { font-size: 16-18px; font-weight: 400; }
caption { font-size: 14px; color: var(--color-text-sub); }
meta { font-size: 13px; color: var(--color-text-sub); }
```

### レイアウト原則

**余白を贅沢に：**
- セクション間：最低80px、PC版は120px
- カードとカードの間：広めに
- 見出しと本文の間：贅沢に

**線は極細・極少：**
- 区切り線は `1px`、色は `#E5E5E5`
- ボックスや囲みは極力使わない

**影はほぼ使わない：**
- ボックスシャドウ多用は和モダンに非ず
- カードhover時だけ、ごく薄く浮かせる程度

**角丸は控えめ：**
- `0px`（完全直角）または `4px` 程度
- 丸すぎると和の硬質感が失われる

### 見出しスタイル（本文内）

```css
h2 {
  font-size: 28px;
  font-weight: 400;
  color: #1A1A1A;
  border-left: 3px solid #165E83;  /* 藍色の縦棒 */
  padding-left: 16px;
  margin-top: 80px;
  margin-bottom: 32px;
}

h3 {
  font-size: 22px;
  font-weight: 400;
  color: #1A1A1A;
  border-bottom: 1px solid #E5E5E5;
  padding-bottom: 8px;
  margin-top: 48px;
  margin-bottom: 20px;
}

h4 {
  font-size: 18px;
  font-weight: 500;
  color: #1A1A1A;
  margin-top: 32px;
  margin-bottom: 16px;
}
```

### 絵文字の扱い

**原則として絵文字は一切使わない。**

- 見出しに絵文字を使わない（既存STUDIO版の 🎫🚃🏠 等は全削除）
- 本文中の絵文字も基本削除
- どうしても必要な場合はアイコン（Lucide等）に置き換え

### 画像の方向性

**OK：**
- 静かな東京の風景
- モダンな会議室（余白多め）
- シンプルな和の要素（障子、木目、石庭）
- モノトーン寄りの建築写真
- 霧がかった街並み

**NG：**
- 原色が強い写真
- 人が笑顔でガッツポーズ系の「海外的な安っぽいビジネス写真」
- 富士山＋芸者＋寿司のコラージュ的なもの
- 彩度が高すぎる商品写真

---

## 6. ページ別仕様

### 6.1 トップページ

**構成（上から順）：**

```
1. ヘッダー
2. ヒーロー（固定画像 + キャッチコピー）
3. 編集部のおすすめ（4件、大きめカード）
4. 会場（最新4件）
5. イベント（最新4件）
6. コラム（最新4件）
7. ニュース（最新4件）
8. イベントガイド（最新4件、記事が溜まったら表示）
9. フッター
```

**ヒーロー部分：**

- 背景：モノトーン気味の静かな画像（東京の朝、和の風景等）
- 画像の上に半透明オーバーレイ
- キャッチコピー（大きく、細めフォント）
  - JP：「東京のビジネスイベントを、もっと深く、もっとスマートに」
  - EN：`Your Gateway to Business Events in Tokyo`
- サブコピー：簡潔なサイト紹介
- 余白をたっぷり使う

**編集部のおすすめ：**

実装方法：`src/config/featured.ts` に記事のslugをリスト化

```typescript
// src/config/featured.ts
export const featuredArticles = [
  { slug: 'tib', category: 'venue' },
  { slug: 'sushitech1', category: 'event' },
  { slug: 'sushitech2026hotel', category: 'column' },
  { slug: 'sushitech_column', category: 'column' },
];
```

このリストを更新することで、トップページの「編集部のおすすめ」が変わる。

**各カテゴリセクション：**

- カード型、3列グリッド（PC）
- 各カテゴリ4件ずつ表示
- 「View All」リンクで一覧ページへ
- 記事が4件未満のカテゴリは実数のみ表示

**削除する要素（既存STUDIO版から）：**

- 会社紹介文の3回繰り返し
- 「資料ダウンロード」セクション
- Popular articles（空セクション）
- 準備中カテゴリの表示（コンテンツができてから表示）

---

### 6.2 カテゴリ一覧ページ

**URL：** `/venue/`、`/event/` 等

**構成：**

```
1. ヘッダー
2. パンくずリスト（ホーム > 会場）
3. カテゴリヘッダー
   - カテゴリ名（大きく）
   - 英語サブタイトル
   - カテゴリ説明文（SEO強化・100-150文字）
4. カテゴリ切替タブ（横並び）
5. 記事カード一覧（3列 × 4行 = 12件）
6. 「もっと読む記事を見る」ボタン
7. 数字式ページネーション（< 前へ 1 2 3 ... 次へ >）
8. フッター
```

**カテゴリタブ：**

```
[ すべて ] [ 会場 ] [ イベント ] [ イベントガイド ] [ ニュース ] [ コラム ] [ ホテル ] [ お役立ち情報 ]
              ─────
              現在地（藍色の下線）
```

- PC：横並びタブ
- モバイル：横スクロール可能
- `<a>` タグで実装（SEO強化のため）

**カテゴリ説明文例：**

```
会場（Venue）：
「東京のビジネスイベント会場を、海外から訪れる方々にわかりやすくご紹介。
各会場へのアクセス方法、周辺のホテル・レストラン、
実際に参加する際の注意点まで、実用的な情報を網羅しています。」

イベント（Event）：
「東京で開催される注目のビジネスイベントをご紹介。
スタートアップ、テック、イノベーション関連の大型カンファレンスから
専門セミナーまで、参加者にとって役立つ情報を発信しています。」

コラム（Column）：
「東京のビジネスシーンに関するインサイトをお届け。
イベントレポート、業界トレンド、
海外からのビジネストラベラーに役立つ実践的な情報を発信しています。」
```

**カードデザイン：**

```
┌──────────────────────┐
│                      │
│   [サムネイル 16:9]     │
│                      │
├──────────────────────┤
│                      │
│ venue  ·  2026.03.11 │ ← カテゴリ・日付（小さく）
│                      │
│ 初めてのTokyo         │ ← タイトル（細め）
│ Innovation Base      │
│                      │
│ 有楽町エリアに位置する、│ ← 概要（2行まで、薄グレー）
│ 東京都が運営する...     │
│                      │
│ 読む →                │ ← ホバーで藍色に変化
│                      │
└──────────────────────┘
```

**ホバー効果：**

- タイトルの色：墨色 → 藍色に変化
- 画像：わずかなズーム（1.05倍）
- 影：つけない（静けさを保つ）

**ページネーション（1ページ12件）：**

- `<a href="/venue/page/2">` でリンク実装（SEO強化）
- 「もっと読む」ボタン + 数字ページネーション併用
- PC版：`< 前へ   1  2  3  4  5   次へ >`
- モバイル版：`< 前へ   2 / 5   次へ >`

---

### 6.3 記事詳細ページ（3テンプレート）

記事の`template`フィールドで判別：

- `guide` → ガイド記事テンプレート
- `standard` → 標準記事テンプレート
- `event` → イベント記事テンプレート

詳細は「7. 記事テンプレート仕様」参照。

**共通機能：**

- 目次：PC版は追従サイドバー、モバイルは折りたたみ式
- 目次は見出し（H2/H3）から自動生成
- 現在読んでいるセクションは藍色でハイライト（PC追従目次）
- 目次項目クリックで該当箇所にスムーズスクロール
- モバイルはデフォルト折りたたみ、項目数を表示（例：「目次を表示（12項目）」）

**著者情報：**

`src/config/authors.ts` で管理：

```typescript
// src/config/authors.ts
export const authors = {
  shintaro: {
    name: "Shintaro Hari",
    nameEn: "Shintaro Hari",
    role: "編集長",
    roleEn: "Editor-in-Chief",
    bio: "東京のビジネスイベントを海外に発信する編集長...",
    bioEn: "Editor-in-Chief dedicated to sharing Tokyo's business event scene with the world...",
    avatar: "/images/authors/shintaro.jpg"
  },
  editorial: {
    name: "BizinTokyo編集部",
    nameEn: "BizinTokyo Editorial Team",
    role: "編集部",
    roleEn: "Editorial Team",
    bio: "海外ビジネストラベラー向けに実用的な情報を発信する編集部",
    bioEn: "The editorial team delivering practical information for international business travelers",
    avatar: "/images/authors/editorial.jpg"
  }
};
```

**関連記事：**

- 同カテゴリから4件表示
- 記事下部に配置
- 現在閲覧中の記事は除外

---

### 6.4 問い合わせページ

**URL：** `/contact`、`/en/contact`

詳細は「8. 問い合わせフォーム」参照。

---

### 6.5 フッター（全ページ共通）

**構成：**

```
BizinTokyo ロゴ

Privacy Policy  |  Company  ← conec-tando.comへリンク

SERVICE
├── Event Management Support  → conec-tando.com
├── Japan Tour                → conec-tando.com
└── Japan Expansion Support   → conec-tando.com

©Conectando.Inc All rights reserved.
```

**リンク先：**

- Privacy Policy → `https://www.conec-tando.com/policy`
- Company → `https://www.conec-tando.com/about`
- SERVICE系 → `https://www.conec-tando.com/service`

conec-tando.comへの相互送客構造は意図的に維持。

---

## 7. 記事テンプレート仕様

### 7.1 テンプレート1：ガイド記事（`template: "guide"`）

**用途：** venue、eventguide カテゴリ

**構成：**

```
1. パンくずリスト
2. カテゴリタグ（小さく、藍色）
3. タイトル（H1、細めフォント）
4. 著者名 · 公開日 · 最終更新日 · 読了時間
5. シェアボタン（Twitter、Facebook、LinkedIn、URLコピー）
6. ヒーロー画像（16:9）
7. リード文
8. 目次（PC追従、モバイル折りたたみ）
9. 本文
   - H2/H3/H4見出し（藍色縦棒 or 罫線）
   - 箇条書き
   - 画像（キャプション付き）
   - ホテルカード（埋め込み可能）
   - 外部リンク（自動で rel="sponsored nofollow"）
10. シェアボタン
11. 著者プロフィール
12. 関連記事（同カテゴリ4件）
13. 他カテゴリ誘導
14. フッター
```

**特徴：**

- 長文・情報量多い記事向け
- ホテルカード埋め込み対応
- 目次が必須

### 7.2 テンプレート2：標準記事（`template: "standard"`）

**用途：** column、news、tips、hotel カテゴリ

**構成：** ガイド記事と同じだが、以下の違いあり：

- 目次：見出し3項目以上ある時のみ表示
- ホテルカード：必要に応じて埋め込み（PR記事等）
- 情報量は中程度

### 7.3 テンプレート3：イベント記事（`template: "event"`）

**用途：** event カテゴリ

**構成：**

```
1. パンくずリスト
2. カテゴリタグ
3. タイトル（H1）
4. 著者名 · 公開日
5. シェアボタン
6. ヒーロー画像（16:9）
7. リード文（イベント概要）
8. 本文
   - 開催日・会場・料金は通常の本文内に自然に記載
   - 公式サイトへのリンク
   - 簡単な見所紹介
9. シェアボタン
10. 関連記事
11. 他カテゴリ誘導
12. フッター
```

**特徴：**

- 短め・コンパクト
- 情報ボックスなし（通常の本文でOK）
- 詳細は公式サイトに誘導

### 7.4 ホテルカード機能

**Markdown記法（記事エージェントが生成）：**

```markdown
:::hotel-card
name: 帝国ホテル 東京
nameEn: Imperial Hotel Tokyo
rating: 5
image: /images/hotels/imperial-tokyo.jpg
description: 日比谷に位置する日本を代表するラグジュアリーホテル。
descriptionEn: A representative luxury hotel of Japan located in Hibiya.
access: 有楽町駅から徒歩7分
accessEn: 7 min walk from Yurakucho Station
price: "¥50,000〜/泊"
priceEn: "¥50,000〜/night"
link: https://www.expedia.co.jp/...（アフィリエイトリンク）
linkText: 予約する（Expedia）
linkTextEn: Book Now (Expedia)
:::
```

**表示イメージ：**

```
┌──────────────────────────────────┐
│ ┌──────┐  帝国ホテル 東京            │
│ │      │  ★★★★★                  │
│ │ 画像  │                         │
│ │      │  日比谷に位置する日本を     │
│ └──────┘  代表するラグジュアリー... │
│                                   │
│  有楽町駅から徒歩7分                │
│  ¥50,000〜/泊                     │
│                                   │
│  [予約する（Expedia）→]             │
└──────────────────────────────────┘
```

**デザイン：**

- 枠線：極薄 `#E5E5E5`
- ボタン：藍色 `#165E83`、白文字
- 星評価：藍色の★
- ホバー：微細な影（浮き上がる程度）

**アフィリエイトリンク処理：**

- 自動で `rel="sponsored nofollow"` を付与（SEO的に正しい処理）
- `target="_blank"` で別タブ表示
- アイコンで外部リンクを明示

### 7.5 記事frontmatter仕様

```yaml
---
title: "初めてのTokyo Innovation Base（TIB）｜海外からの訪問者向け完全ガイド"
description: "有楽町のスタートアップ支援拠点TIBのアクセス・会場情報・周辺ホテル・レストランを完全ガイド"
date: "2026-03-11"
updated: "2026-04-17"  # 任意、更新日
category: "venue"
slug: "tib"
lang: "ja"
author: "shintaro"  # authors.tsのキー
template: "guide"  # guide / standard / event
ogImage: "/images/venue/tib-og.jpg"  # OGP画像
heroImage: "/images/venue/tib-hero.jpg"  # 記事冒頭のヒーロー画像
featured: false  # 編集部のおすすめに表示するか
---
```

---

## 8. 問い合わせフォーム

### 実装：Phase 1（初期リリース）

**推奨：Formspree**

Formspree（formspree.io）の無料プランを使用。

**フォーム項目：**

| 項目 | 型 | 必須 |
|---|---|---|
| お名前 | text | ✅ |
| メールアドレス | email | ✅ |
| 会社名 | text | - |
| お問い合わせ種別 | select | ✅ |
| お問い合わせ内容 | textarea | ✅ |

**お問い合わせ種別の選択肢：**

- 会場予約相談
- メディア掲載
- イベント情報提供
- 取材依頼
- その他

**英語版の選択肢：**

- Venue Booking Inquiry
- Media Feature
- Event Information
- Interview Request
- Other

### 実装手順

1. Shintaroが後でFormspree無料アカウントを作成
2. エンドポイントURL取得
3. `src/pages/contact.astro` のformタグに設定

**フォーム実装例：**

```html
<form action="https://formspree.io/f/[YOUR_FORM_ID]" method="POST">
  <label>お名前 *
    <input type="text" name="name" required>
  </label>
  <label>メールアドレス *
    <input type="email" name="email" required>
  </label>
  <label>会社名
    <input type="text" name="company">
  </label>
  <label>お問い合わせ種別 *
    <select name="type" required>
      <option value="venue">会場予約相談</option>
      <option value="media">メディア掲載</option>
      <option value="event">イベント情報提供</option>
      <option value="interview">取材依頼</option>
      <option value="other">その他</option>
    </select>
  </label>
  <label>お問い合わせ内容 *
    <textarea name="message" required></textarea>
  </label>
  <button type="submit">送信する</button>
</form>
```

### 実装：Phase 2（将来）

トラフィックが増えた段階でCloudflare Pages Functionsに移行：

- 送信先メールアドレスに自動転送
- スパム対策（Cloudflare Turnstile等）
- 管理画面での履歴確認

---

## 9. 多言語対応

### パス構造

```
日本語：/
英語：  /en/
```

### hreflangタグ

各ページに自動挿入：

```html
<link rel="alternate" hreflang="ja" href="https://bizintokyo.com/venue/tib">
<link rel="alternate" hreflang="en" href="https://bizintokyo.com/en/venue/tib">
<link rel="alternate" hreflang="x-default" href="https://bizintokyo.com/venue/tib">
```

### 言語切替UI

ヘッダーに配置済み：

```
[ ja ] [ en ]
```

- 現在の言語は墨色、もう一方は薄グレー
- クリックで対応する言語ページに遷移
- 対応する言語版がない記事は、トップページに遷移

### UIテキストの多言語化

- ナビゲーションメニュー
- カテゴリ名
- ボタンテキスト（「続きを読む」「もっと見る」等）
- メタ情報（「読了時間」「公開日」等）

**実装方法：**

```typescript
// src/i18n/ja.ts
export const ja = {
  nav: {
    venue: "会場",
    event: "イベント",
    eventguide: "イベントガイド",
    news: "ニュース",
    column: "コラム",
    contact: "お問い合わせ"
  },
  meta: {
    readTime: "読了時間",
    published: "公開日",
    updated: "最終更新日",
    author: "著者",
    share: "シェアする",
    relatedArticles: "関連記事",
    readMore: "続きを読む",
    loadMore: "もっと読む記事を見る",
    // ...
  }
};

// src/i18n/en.ts
export const en = {
  nav: {
    venue: "Venues",
    event: "Events",
    eventguide: "Event Guide",
    news: "News",
    column: "Column",
    contact: "Contact"
  },
  meta: {
    readTime: "Read time",
    published: "Published",
    updated: "Updated",
    author: "Author",
    share: "Share",
    relatedArticles: "Related Articles",
    readMore: "Read More",
    loadMore: "Load more articles",
    // ...
  }
};
```

---

## 10. 記事移行・作成ルール

### ディレクトリ構造

```
src/content/
├── venue/
│   ├── tib.md
│   ├── midtown.md
│   ├── ariake_arena.md
│   └── ...
├── event/
│   ├── sushitech1.md
│   ├── IVS2026.md
│   └── ...
├── eventguide/
│   └── sushitech2026.md
├── news/
│   └── ...
├── column/
│   └── ...
└── en/
    ├── venue/
    ├── event/
    └── ...
```

### 既存STUDIO記事の移植

**対象：** 既存bizintokyo.com（STUDIO版）の記事 約20本

**移植時の変換ルール：**

| 既存STUDIO版 | 新サイト |
|---|---|
| 絵文字見出し（🎫🚃等） | 削除 |
| URL: `/venue/tib` | URL: `/venue/tib`（変更なし） |
| ホテル情報のテキストリンク | ホテルカードに変換 |
| 外部リンク | `rel="sponsored nofollow"` 自動付与 |
| 「▲ 成田エクスプレス」等のキャプション矢印 | 削除 |
| Popular articles の空セクション | 削除 |

**維持するもの：**

- 記事URL（SEO評価継承）
- 目次構造
- 見出し階層（H2/H3/H4）
- ホテル情報の内容
- 外部リンク（ホテル公式サイト等）

### 記事エージェント連携

Claude Projectの記事生成エージェントは既に以下の形式で出力するよう設定済み：

**ファイル名：**

```
YYYY-MM-DD-記事スラッグ-lang.md
例：2026-04-18-tokyo-bigsite-guide-ja.md
```

**Markdown構造：**

```markdown
---
title: "記事タイトル"
description: "SEO用説明文（120-160文字）"
date: "2026-04-18"
category: "venue"
slug: "tokyo-bigsite-guide"
lang: "ja"
author: "shintaro"
template: "guide"
ogImage: "/images/venue/bigsite-og.jpg"
heroImage: "/images/venue/bigsite-hero.jpg"
featured: false
---

記事本文...

:::hotel-card
name: ホテル名
...
:::

記事本文続き...
```

### 記事作成フロー

```
1. Claude Project の記事エージェントが記事生成
   ↓
2. Markdownファイル出力
   ↓
3. GitHubにpush（手動 or エージェントが自動）
   ↓
4. Cloudflare Pages が自動ビルド
   ↓
5. 新記事が公開
```

---

## 11. 重要な禁止事項

### 以下は絶対に実施しないこと

1. **お名前.comのDNS設定変更**
   - 現時点ではSTUDIO版bizintokyo.comが稼働中
   - サイト完成まで絶対に触らない

2. **Cloudflare PagesのCustom domain設定で `bizintokyo.com` 追加**
   - サイト完成・動作確認完了まで待つ
   - 独自ドメイン接続は最終フェーズで一括実施

3. **既存STUDIO版 `bizintokyo.com` への変更・解約**
   - 新サイトが完全に稼働するまで維持
   - 切り替え完了後にShintaroの指示で解約

4. **有料サービスの契約**
   - Formspreeの有料プラン、その他サービス
   - すべて無料プランで運用可能
   - 有料化はShintaroの許可を得てから

5. **新サイトでの勝手な仕様変更**
   - 本仕様書に記載のない仕様は実装しない
   - 判断に迷った場合はShintaroに確認

### 段階的な移行プロセス

```
Phase 1：bizintokyo.pages.dev でサイト完成（現在）
   ↓
Phase 2：既存記事の移植・テスト
   ↓
Phase 3：Shintaroの最終確認
   ↓
Phase 4：【ここで初めて】お名前.comのDNSをCloudflareに向ける
   ↓
Phase 5：bizintokyo.com が新サイトに切り替わる
   ↓
Phase 6：動作確認後、Studio Design版を解約
```

---

## 12. 実装優先順位

### 優先度1（最優先）

1. **デザインシステム構築**
   - Tailwind config に配色・フォント・フォントサイズ設定
   - 共通コンポーネント（Button、Card、Heading等）

2. **トップページ実装**
   - ヒーロー
   - カテゴリ別記事一覧
   - 編集部のおすすめ

3. **カテゴリ一覧ページ実装**
   - 7カテゴリ分（venue, event, eventguide, news, column, hotel, tips）
   - カテゴリ切替タブ
   - ページネーション

### 優先度2（次に）

4. **記事詳細ページ実装（3テンプレート）**
   - ガイド記事テンプレート
   - 標準記事テンプレート
   - イベント記事テンプレート
   - 目次機能（PC追従、モバイル折りたたみ）
   - 著者情報表示
   - 関連記事

5. **ホテルカード機能実装**
   - Markdown独自記法の実装
   - カードコンポーネント
   - アフィリエイトリンク処理

6. **多言語対応実装**
   - `/en/` パス構造
   - hreflangタグ
   - UIテキストの多言語化

### 優先度3（その後）

7. **SEO対策**
   - sitemap.xml
   - robots.txt
   - 構造化データ（JSON-LD）
   - OGP・Twitter Card

8. **問い合わせフォーム**
   - Formspreeで実装
   - 日英両対応

9. **サンプル記事作成**
   - 各カテゴリに1-2本
   - 動作確認用

### 優先度4（最終段階）

10. **既存STUDIO記事の移植**
    - 約20本をMarkdown形式に変換
    - URL維持
    - ホテル情報のカード化

11. **301リダイレクト設定**
    - `_redirects` ファイル作成

12. **最終動作確認後、Shintaroの指示で独自ドメイン接続**

---

## 📞 質問・相談窓口

実装中に判断に迷う点があれば、Shintaroに確認してください。

**特に事前確認必須の項目：**

- DNS切り替え系の作業
- 既存STUDIO版への変更
- 追加サービスの有料プラン契約
- 本仕様書に記載のない仕様追加
- 記事エージェント（Claude Project）側の仕様変更

---

## 📎 参考リンク

- 既存サイト：https://bizintokyo.com/
- 運営会社サイト：https://www.conec-tando.com/
- 現在の新サイト：https://bizintokyo.pages.dev
- GitHub：https://github.com/haritapp/bizintokyo

---

## ✅ 完成までのマイルストーン

- [ ] デザインシステム構築完了
- [ ] トップページ実装完了
- [ ] カテゴリ一覧ページ（7カテゴリ）実装完了
- [ ] 記事詳細ページ（3テンプレート）実装完了
- [ ] ホテルカード機能実装完了
- [ ] 多言語対応実装完了
- [ ] SEO対策実装完了
- [ ] 問い合わせフォーム実装完了
- [ ] サンプル記事での動作確認完了
- [ ] 既存STUDIO記事の移植完了
- [ ] 301リダイレクト設定完了
- [ ] 最終動作確認完了
- [ ] 独自ドメイン接続（Shintaroの指示で実施）
- [ ] STUDIO版の解約（Shintaroの指示で実施）

---

以上、よろしくお願いいたします。
