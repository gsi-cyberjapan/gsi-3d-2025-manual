import { describe, it, expect } from 'vitest'
import { getAllMarkdownFiles, parseFrontmatter, relativeFromDocs } from '../helpers/markdown-utils'

const markdownFiles = getAllMarkdownFiles()

describe('フロントマター検証', () => {
  it('index.md に layout: home が設定されていること', () => {
    const indexFile = markdownFiles.find((f) => relativeFromDocs(f) === 'index.md')!
    const { data } = parseFrontmatter(indexFile)
    expect(data.layout).toBe('home')
  })

  it('ガイドページに title フロントマターがあること', () => {
    const guideFiles = markdownFiles.filter((f) => f.includes('/guide/'))
    for (const file of guideFiles) {
      const { data } = parseFrontmatter(file)
      expect(data.title, `${relativeFromDocs(file)} に title がありません`).toBeTruthy()
    }
  })

  it('overview.md に title フロントマターがあること', () => {
    const overviewFile = markdownFiles.find((f) => relativeFromDocs(f) === 'overview.md')!
    const { data } = parseFrontmatter(overviewFile)
    expect(data.title).toBeTruthy()
  })
})
