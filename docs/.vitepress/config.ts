import { defineConfig } from "vitepress";
import { tokenize } from "./tokenize";

export default defineConfig({
  lang: "ja",
  title: "国土地理院3次元地図可視化サイト マニュアル",
  description: "国土地理院の3次元地図可視化サイト（gsi-3d-2025）のマニュアル",
  base: "/gsi-3d-2025-manual/",

  themeConfig: {
    siteTitle: "3次元地図可視化サイト マニュアル",

    nav: [
      { text: "操作マニュアル", link: "/overview" },
      { text: "開発者向け", link: "/dev/" },
    ],

    sidebar: {
      "/dev/": [
        {
          text: "開発者向けマニュアル",
          items: [
            { text: "はじめに", link: "/dev/" },
            { text: "セットアップ", link: "/dev/setup" },
            { text: "サイト名の変更", link: "/dev/site-name" },
            { text: "レイヤの変更", link: "/dev/layers" },
          ],
        },
      ],
      "/": [
        {
          text: "機能概要",
          items: [{ text: "機能概要", link: "/overview" }],
        },
        {
          text: "操作マニュアル",
          items: [
            { text: "1. 地図", link: "/guide/map-layers" },
            { text: "2. 検索", link: "/guide/search" },
            { text: "3. 印刷", link: "/guide/print" },
            { text: "4. 共有", link: "/guide/share" },
            { text: "5. 設定", link: "/guide/settings" },
            {
              text: "6. 各種機能",
              collapsed: false,
              items: [
                { text: "作図・ファイル", link: "/guide/tools/draw" },
                { text: "計測", link: "/guide/tools/measure" },
                {
                  text: "並べて比較・重ねて比較",
                  link: "/guide/tools/compare",
                },
                { text: "3次元地図・点群等", link: "/guide/tools/3d" },
                { text: "Globe表示モード", link: "/guide/tools/globe" },
                { text: "その他", link: "/guide/tools/others" },
              ],
            },
            { text: "7. コンテキストメニュー", link: "/guide/context-menu" },
            { text: "8. 自分で作る色別標高図", link: "/guide/relief" },
          ],
        },
      ],
    },

    outline: {
      label: "目次",
    },

    docFooter: {
      prev: "前のページ",
      next: "次のページ",
    },

    darkModeSwitchLabel: "テーマ",
    lightModeSwitchTitle: "ライトモードに切り替え",
    darkModeSwitchTitle: "ダークモードに切り替え",
    sidebarMenuLabel: "メニュー",
    returnToTopLabel: "トップに戻る",

    search: {
      provider: "local",
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: "検索",
            buttonAriaLabel: "検索",
          },
          modal: {
            displayDetails: "詳細を表示",
            noResultsText: "見つかりませんでした",
            resetButtonTitle: "クリア",
            backButtonTitle: "検索を閉じる",
            footer: {
              selectText: "選択",
              selectKeyAriaLabel: "Enter キー",
              navigateText: "移動",
              navigateUpKeyAriaLabel: "上矢印キー",
              navigateDownKeyAriaLabel: "下矢印キー",
              closeText: "閉じる",
              closeKeyAriaLabel: "Esc キー",
            },
          },
        },
        miniSearch: {
          options: {
            tokenize,
          },
          searchOptions: {
            tokenize,
          },
        },
      },
    },
  },
});
