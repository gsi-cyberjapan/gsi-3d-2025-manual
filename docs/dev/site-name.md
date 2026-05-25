---
title: サイト名の変更
---

# サイト名の変更

サイトタイトルやメタ情報を変更してカスタムサイトにする方法です。

## 設定ファイル

サイト全体の基本情報は `src/lib/config.ts` の `GENERAL_CONFIG` で定義されています。

```ts
export const GENERAL_CONFIG = {
  TITLE: "3次元地図可視化サイト",
  DESCRIPTION: "",
  LANGUAGE: "ja",
  HELP_PAGE_URL: "http://maps.gsi.go.jp/help/",
}
```

## 各フィールドの説明

### `TITLE`

サイトのタイトルです。ブラウザのタブやヘッダーに表示されます。

### `DESCRIPTION`

HTMLの `<meta name="description">` に設定される説明文です。検索エンジンの検索結果に表示されます。

### `LANGUAGE`

HTMLの `lang` 属性に設定される言語コードです。日本語サイトの場合は `"ja"` のままで問題ありません。

### `HELP_PAGE_URL`

ヘッダーのヘルプアイコンをクリックしたときに開くURLです。独自のヘルプページがある場合はここを変更してください。

## メタデータの生成の仕組み

`src/app/layout.tsx`（ルートレイアウト）で `GENERAL_CONFIG` の値を使ってメタデータを生成しています。

```tsx
export const metadata: Metadata = {
  title: GENERAL_CONFIG.TITLE,
  description: GENERAL_CONFIG.DESCRIPTION,
}
```

`GENERAL_CONFIG` の値を変更するだけで、サイト全体のメタデータが更新されます。個別のページでメタデータを上書きする必要はありません。
