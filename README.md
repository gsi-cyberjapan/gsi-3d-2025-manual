# 国土地理院 3次元地図可視化サイト マニュアル

国土地理院3次元地図可視化サイトの操作マニュアルおよび開発者向けマニュアルです。

## ドキュメント構成

本マニュアルは、一般ユーザー向けの「操作マニュアル」と、サイト運用者向けの「開発者向けマニュアル」で構成されています。

## 技術スタック

- **静的サイトジェネレーター**: [VitePress](https://vitepress.dev/)
- **デプロイ先**: GitHub Pages
- **CI/CD**: GitHub Actions
- **テスト**: [Vitest](https://vitest.dev/)（ユニットテスト）、[Playwright](https://playwright.dev/)（E2Eテスト）
- 
## 開発方法

### 前提条件

- [Node.js](https://nodejs.org/) 22
- [pnpm](https://pnpm.io/)

### 基本コマンド

```bash
# 依存パッケージのインストール
pnpm install

# ローカル開発サーバー起動
pnpm docs:dev

# ビルド
pnpm docs:build

# ビルド結果のプレビュー
pnpm docs:preview
```

### テスト

```bash
# ユニットテスト（Vitest）
pnpm test

# E2Eテスト（Playwright、ビルド+プレビューサーバー自動起動）
pnpm test:e2e

# 全テスト実行
pnpm test:all
```

## CI/CD

GitHub Actions で以下の2つのワークフローを実行しています。

- **テスト**（`test.yml`）: push および PR 時に、ユニットテスト → ビルド → E2Eテストを段階的に実行します。
- **デプロイ**（`deploy.yml`）: `main` ブランチへの push 時に、GitHub Pages へ自動的にデプロイします。
