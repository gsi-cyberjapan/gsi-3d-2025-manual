import { readFileSync, existsSync, globSync } from 'node:fs'
import { resolve, relative } from 'node:path'
import matter from 'gray-matter'

const DOCS_DIR = resolve(import.meta.dirname, '../../docs')
const PUBLIC_DIR = resolve(DOCS_DIR, 'public')

/** docs/ 配下の全 Markdown ファイルパスを返す（パス区切りは / に統一） */
export function getAllMarkdownFiles(): string[] {
  return globSync('**/*.md', { cwd: DOCS_DIR }).map((f) =>
    resolve(DOCS_DIR, f).split('\\').join('/'),
  )
}

/** Markdown ファイルのフロントマターを解析する */
export function parseFrontmatter(filePath: string) {
  const content = readFileSync(filePath, 'utf-8')
  return matter(content)
}

/** Markdown 本文中の画像参照パスを抽出する */
export function extractImageReferences(content: string): string[] {
  const pattern = /!\[.*?\]\((.+?)\)/g
  const images: string[] = []
  let match: RegExpExecArray | null
  while ((match = pattern.exec(content)) !== null) {
    images.push(match[1])
  }
  return images
}

/** Markdown 本文中の内部リンクを抽出する（画像参照・外部URLを除く） */
export function extractInternalLinks(content: string): string[] {
  // 負の後読みで画像参照 ![...](...)  を除外
  const pattern = /(?<!!)\[.*?\]\((.+?)\)/g
  const links: string[] = []
  let match: RegExpExecArray | null
  while ((match = pattern.exec(content)) !== null) {
    const href = match[1]
    // 外部URL・アンカーのみのリンクを除外
    if (!href.startsWith('http') && !href.startsWith('#')) {
      links.push(href)
    }
  }
  return links
}

/** 画像パスが public/ 内に存在するか確認する */
export function imageExists(imagePath: string): boolean {
  // /images/foo.png → docs/public/images/foo.png
  const resolved = resolve(PUBLIC_DIR, imagePath.replace(/^\//, ''))
  return existsSync(resolved)
}

/** 内部リンクが有効な Markdown ファイルを指しているか確認する */
export function internalLinkTargetExists(link: string, fromFile: string): boolean {
  // アンカーを除去
  const pathPart = link.split('#')[0]
  if (!pathPart) return true // アンカーのみなら OK

  // リンクパスを解決
  let targetPath: string
  if (pathPart.startsWith('/')) {
    // 絶対パス: /guide/search → docs/guide/search.md
    targetPath = resolve(DOCS_DIR, pathPart.replace(/^\//, ''))
  } else {
    // 相対パス
    targetPath = resolve(fromFile, '..', pathPart)
  }

  // 拡張子なしの場合は .md を付与
  if (!targetPath.endsWith('.md')) {
    targetPath += '.md'
  }

  return existsSync(targetPath)
}

/** ファイルパスを docs/ からの相対パスで返す（テスト表示用） */
export function relativeFromDocs(filePath: string): string {
  return relative(DOCS_DIR, filePath)
}
