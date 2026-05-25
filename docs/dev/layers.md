---
title: レイヤの変更
---

# レイヤの変更

ベースレイヤやオプションレイヤの構成を変更する方法です。すべての設定は `src/lib/config.ts` にあります。

## ベースレイヤ

`BASE_LAYER_CONFIG` でベースレイヤを定義します。ベースレイヤには **Vector**（ベクタータイル）と **Raster**（ラスタータイル）の2種類があります。

### Vector レイヤ

ベクタータイルは `STYLE_URL` でMapLibre GL のスタイルJSONを指定します。

```ts
export const BASE_LAYER_CONFIG = {
  VECTOR_LAYERS: [
    {
      ID: "std-vector",
      TITLE: "標準地図",
      LEGEND_IMAGE_URL: "https://...",
      STYLE_URL: "https://...",
      MIN_ZOOM: 4,
      MAX_ZOOM: 16,
    },
    // ...
  ],
  // ...
}
```

### Raster レイヤ

ラスタータイルは `TILE_URL` でタイルURLテンプレートを指定します。`STYLE_URL` の代わりに `TILE_URL` を使用します。

```ts
{
  RASTER_LAYERS: [
    {
      ID: "std-raster",
      TITLE: "標準地図",
      LEGEND_IMAGE_URL: "https://...",
      TILE_URL: "https://maps.gsi.go.jp/xyz/std/{z}/{x}/{y}.png?_=20210915a",
      MIN_ZOOM: 4,
      MAX_ZOOM: 18,
    },
    // ...
  ],
}
```

### 各フィールドの説明

| フィールド | 説明 |
|-----------|------|
| `ID` | レイヤの一意な識別子。内部で使用されます |
| `TITLE` | UIに表示されるレイヤ名 |
| `LEGEND_IMAGE_URL` | レイヤ選択UIに表示されるサムネイル画像のURL |
| `STYLE_URL` | MapLibre GL スタイルJSONのURL（Vectorレイヤ用） |
| `TILE_URL` | ラスタータイルのURLテンプレート（Rasterレイヤ用） |
| `MIN_ZOOM` | 最小ズームレベル |
| `MAX_ZOOM` | 最大ズームレベル |
| `ERROR_TILE_URL` | タイル読み込みエラー時に表示する代替画像のURL（Rasterレイヤ用、省略可） |

### レイヤの追加

配列に新しいオブジェクトを追加します。

```ts
VECTOR_LAYERS: [
  // 既存のレイヤ...
  {
    ID: "my-custom-vector",
    TITLE: "カスタム地図",
    LEGEND_IMAGE_URL: "https://example.com/legend.png",
    STYLE_URL: "https://example.com/style.json",
    MIN_ZOOM: 2,
    MAX_ZOOM: 18,
  },
],
```

### レイヤの削除

配列から該当するオブジェクトを削除します。最低1つのレイヤは残してください。

### デフォルトレイヤ

配列の最初のレイヤがデフォルトで選択されます。デフォルトを変更したい場合は、配列内の順序を入れ替えてください。

## オプションレイヤ

`OPTIONAL_LAYER_CONFIG` でオプションレイヤ（重ね合わせレイヤ）の取得元を定義しています。

```ts
export const OPTIONAL_LAYER_CONFIG = {
  BASE_LAYER_URL: "https://raw.githubusercontent.com/gsi-cyberjapan/gsimaps/refs/heads/gh-pages/layers_txt",
  BASE_IMAGE_URL: "https://raw.githubusercontent.com/gsi-cyberjapan/gsimaps/refs/heads/gh-pages",
  LAYERS_DEFINITION_FILE_PATH: "/layers.txt",
  DISABLED_LAYER_IDS: ["xxx", "yyy"],
}
```

| フィールド | 説明 |
|-----------|------|
| `BASE_LAYER_URL` | レイヤ定義ファイルの取得先ベースURL |
| `BASE_IMAGE_URL` | レイヤサムネイル画像のベースURL |
| `LAYERS_DEFINITION_FILE_PATH` | レイヤ定義ファイルのパス |
| `DISABLED_LAYER_IDS` | 非表示にするレイヤIDの配列 |

オプションレイヤの一覧は外部のレイヤ定義ファイルから動的に取得されます。独自のレイヤ定義を使いたい場合は、これらのURLを変更してください。

## デフォルト表示位置

`DEFAULT_VIEW_CONFIG` で、サイトを開いたときの初期表示位置を定義しています。

```ts
export const DEFAULT_VIEW_CONFIG = {
  LONGITUDE: 140.084556,
  LATITUDE: 36.104611,
  ZOOM: 4,
  BEARING: 0,
  PITCH: 0,
}
```

| フィールド | 説明 |
|-----------|------|
| `LONGITUDE` | 初期表示の経度 |
| `LATITUDE` | 初期表示の緯度 |
| `ZOOM` | 初期ズームレベル |
| `BEARING` | 地図の回転角度（0 = 北が上） |
| `PITCH` | 地図の傾き（0 = 真上から） |

特定の地域にフォーカスしたサイトを構築する場合は、`LONGITUDE`・`LATITUDE`・`ZOOM` を適切に変更してください。
