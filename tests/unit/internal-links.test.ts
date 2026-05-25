import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  getAllMarkdownFiles,
  extractInternalLinks,
  internalLinkTargetExists,
  relativeFromDocs,
} from '../helpers/markdown-utils'

const markdownFiles = getAllMarkdownFiles()

describe('内部リンクの有効性', () => {
  it('内部リンクが有効なファイルを指していること', () => {
    const broken: string[] = []

    for (const file of markdownFiles) {
      const content = readFileSync(file, 'utf-8')
      const links = extractInternalLinks(content)

      for (const link of links) {
        if (!internalLinkTargetExists(link, file)) {
          broken.push(`${relativeFromDocs(file)}: ${link}`)
        }
      }
    }

    expect(broken, `無効な内部リンク:\n${broken.join('\n')}`).toEqual([])
  })
})
