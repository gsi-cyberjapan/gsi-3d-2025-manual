---
title: セットアップ
---

# セットアップ

開発環境を構築し、ローカルで起動・ビルドするまでの手順です。

## 前提条件

以下のツールが必要です。

| ツール | バージョン |
|--------|-----------|
| Node.js | 24 以上 |
| pnpm | 10 以上 |

::: tip Volta を使用する場合
プロジェクトの `package.json` に Volta の設定が含まれているため、[Volta](https://volta.sh/) をインストールしていれば、Node.js のバージョンが自動的に切り替わります。
:::

## リポジトリのForkとクローン

1. GitHubでリポジトリをForkする
2. Forkしたリポジトリをクローンする

```bash
git clone <フォークしたリポジトリのURL>
cd <リポジトリ名>
```

## 依存パッケージのインストール

```bash
pnpm install
```

## 開発サーバーの起動

```bash
pnpm dev
```

`http://localhost:3000` でアプリケーションが起動します。ファイルを変更するとホットリロードで自動反映されます。

## 本番ビルド

```bash
pnpm build
```

`out/` ディレクトリに静的ファイルが出力されます。このディレクトリの内容をWebサーバーにデプロイしてください。

ビルド結果をローカルで確認するには:

```bash
pnpm start
```

## コード品質

コミット前に以下のコマンドで品質を確認してください。

```bash
pnpm lint      # ESLint によるコードチェック
pnpm format    # Prettier によるフォーマットチェック
```

自動修正する場合:

```bash
pnpm fix       # Prettier の自動整形 + ESLint の自動修正
```

## ディレクトリ構成

```
.
├── src/
│   ├── app/              # Next.js App Router のページ・レイアウト
│   ├── components/       # React コンポーネント
│   │   ├── map/          # 地図表示関連
│   │   ├── draw/         # 作図機能
│   │   ├── measure/      # 計測機能
│   │   ├── sidebar/      # サイドバー（レイヤ選択等）
│   │   ├── header/       # ヘッダー（検索、設定等）
│   │   └── ui/           # 汎用UIコンポーネント
│   ├── hooks/
│   │   └── store/        # Zustand ストア（状態管理）
│   ├── lib/
│   │   ├── config.ts     # 設定定数（サイト名・レイヤ等）
│   │   ├── draw/         # 作図スタイル定義
│   │   ├── grids/        # グリッド描画
│   │   ├── measure/      # 計測ロジック
│   │   ├── pointcloud/   # 点群データ表示
│   │   ├── relief/       # 色別標高図
│   │   └── map-utils/    # 座標変換・住所検索等
│   └── types/            # TypeScript 型定義
├── public/               # 静的アセット
├── next.config.ts        # Next.js 設定
├── tsconfig.json         # TypeScript 設定
└── package.json
```

## 技術スタック

| カテゴリ | ライブラリ |
|----------|-----------|
| フレームワーク | Next.js（App Router、静的エクスポート） |
| 地図レンダリング | MapLibre GL + react-map-gl |
| 点群レンダリング | deck.gl（@deck.gl/core、@deck.gl/geo-layers、@deck.gl/layers、@deck.gl/mapbox） |
| 描画機能 | TerraDraw |
| 状態管理 | Zustand |
| UIスタイリング | Tailwind CSS + Radix UI |
