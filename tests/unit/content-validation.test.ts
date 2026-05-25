import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { getAllMarkdownFiles, relativeFromDocs } from '../helpers/markdown-utils'

const markdownFiles = getAllMarkdownFiles()
// guide/ 配下のページ数の下限（現時点で13ファイル）
const MIN_GUIDE_PAGES = 13

describe('Markdown コンテンツ検証', () => {
  it('ガイドページが存在すること', () => {
    const guideFiles = markdownFiles.filter((f) => f.includes('/guide/'))
    expect(guideFiles.length).toBeGreaterThanOrEqual(MIN_GUIDE_PAGES)
  })

  it('index.md と overview.md が存在すること', () => {
    const names = markdownFiles.map((f) => relativeFromDocs(f))
    expect(names).toContain('index.md')
    expect(names).toContain('overview.md')
  })

  it('空のファイルがないこと', () => {
    for (const file of markdownFiles) {
      const content = readFileSync(file, 'utf-8').trim()
      expect(content.length, `${relativeFromDocs(file)} が空です`).toBeGreaterThan(0)
    }
  })

  it('各ファイルに H1 見出しがあること（index.md を除く）', () => {
    for (const file of markdownFiles) {
      const rel = relativeFromDocs(file)
      if (rel === 'index.md') continue // ホームページは layout: home のため H1 不要

      const content = readFileSync(file, 'utf-8')
      const h1Matches = content.match(/^# .+/gm)
      expect(h1Matches, `${rel} に H1 見出しがありません`).not.toBeNull()
    }
  })

  it('各ファイルの H1 見出しが一つだけであること（index.md を除く）', () => {
    for (const file of markdownFiles) {
      const rel = relativeFromDocs(file)
      if (rel === 'index.md') continue

      const content = readFileSync(file, 'utf-8')
      const h1Matches = content.match(/^# .+/gm) || []
      expect(h1Matches.length, `${rel} に H1 が ${h1Matches.length} 個あります`).toBe(1)
    }
  })

  it('見出し階層が正しいこと（H1 の後に H4 が来ないなど）', () => {
    for (const file of markdownFiles) {
      const rel = relativeFromDocs(file)
      if (rel === 'index.md') continue

      const content = readFileSync(file, 'utf-8')
      const headings = content.match(/^#{1,6} .+/gm) || []

      let lastLevel = 0
      for (const heading of headings) {
        const level = heading.match(/^(#{1,6}) /)![1].length
        if (lastLevel > 0) {
          expect(
            level,
            `${rel}: H${lastLevel} の次に H${level} があります（レベルのスキップ）`,
          ).toBeLessThanOrEqual(lastLevel + 1)
        }
        lastLevel = level
      }
    }
  })
})
