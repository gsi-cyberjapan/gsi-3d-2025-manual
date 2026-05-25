import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import {
  getAllMarkdownFiles,
  extractImageReferences,
  imageExists,
  relativeFromDocs,
} from '../helpers/markdown-utils'

const markdownFiles = getAllMarkdownFiles()

describe('画像参照の整合性', () => {
  it('Markdown 内の画像パスが public/ に実在すること', () => {
    const missing: string[] = []

    for (const file of markdownFiles) {
      const content = readFileSync(file, 'utf-8')
      const images = extractImageReferences(content)

      for (const img of images) {
        if (!imageExists(img)) {
          missing.push(`${relativeFromDocs(file)}: ${img}`)
        }
      }
    }

    expect(missing, `存在しない画像参照:\n${missing.join('\n')}`).toEqual([])
  })
})
