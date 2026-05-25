/**
 * Intl.Segmenter による日本語トークナイズ関数
 * MiniSearch のインデックスおよび検索で使用
 */
export function tokenize(text: string): string[] {
  const segmenter = new Intl.Segmenter('ja', { granularity: 'word' })
  const tokens: string[] = []
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    if (isWordLike) {
      tokens.push(segment)
    }
  }
  return tokens
}
