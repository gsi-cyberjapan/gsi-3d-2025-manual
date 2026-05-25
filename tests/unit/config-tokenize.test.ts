import { describe, it, expect } from 'vitest'
import { tokenize } from '../../docs/.vitepress/tokenize'

describe('日本語トークナイズ関数', () => {
  it('日本語テキストを単語に分割できること', () => {
    const tokens = tokenize('国土地理院の地図')
    expect(tokens.length).toBeGreaterThan(1)
    expect(tokens).toContain('国土')
    expect(tokens).toContain('地理')
    expect(tokens).toContain('地図')
  })

  it('英語テキストを単語に分割できること', () => {
    const tokens = tokenize('hello world')
    expect(tokens).toEqual(['hello', 'world'])
  })

  it('日本語と英語の混在テキストを処理できること', () => {
    const tokens = tokenize('VitePress でドキュメント')
    expect(tokens).toContain('VitePress')
    expect(tokens).toContain('ドキュメント')
  })

  it('空文字列で空配列を返すこと', () => {
    const tokens = tokenize('')
    expect(tokens).toEqual([])
  })

  it('記号のみのテキストで単語が含まれないこと', () => {
    const tokens = tokenize('!@#$%^&*()')
    expect(tokens.length).toBe(0)
  })
})
