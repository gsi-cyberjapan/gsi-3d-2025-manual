import { test, expect } from '@playwright/test'

test.describe('検索機能', () => {
  test('検索ダイアログが開閉できること', async ({ page }) => {
    await page.goto('./')

    // 検索ボタンをクリック
    await page.locator('.VPNavBarSearch button, .DocSearch-Button').first().click()
    await expect(page.locator('.VPLocalSearchBox')).toBeVisible()

    // Escape で閉じる
    await page.keyboard.press('Escape')
    await expect(page.locator('.VPLocalSearchBox')).not.toBeVisible()
  })

  test('キーワード検索で結果が表示されること', async ({ page }) => {
    await page.goto('./')

    // 検索ダイアログを開く
    await page.locator('.VPNavBarSearch button, .DocSearch-Button').first().click()
    await expect(page.locator('.VPLocalSearchBox')).toBeVisible()

    // キーワードを入力
    await page.locator('.VPLocalSearchBox input').fill('地図')
    // 検索結果が表示されることを確認
    const results = page.locator('.VPLocalSearchBox .result')
    await expect(results.first()).toBeVisible({ timeout: 5000 })
  })

  test('検索結果をクリックするとページ遷移すること', async ({ page }) => {
    await page.goto('./')

    // 検索ダイアログを開いてキーワード入力
    await page.locator('.VPNavBarSearch button, .DocSearch-Button').first().click()
    await page.locator('.VPLocalSearchBox input').fill('地図')

    // 最初の結果のタイトル部分をクリック（excerpt-wrapper の重なりを回避）
    const firstResult = page.locator('.VPLocalSearchBox .result .title').first()
    await firstResult.waitFor({ state: 'visible', timeout: 5000 })
    await firstResult.click({ force: true })

    // 検索ダイアログが閉じてページ遷移すること
    await expect(page.locator('.VPLocalSearchBox')).not.toBeVisible({ timeout: 5000 })
    await expect(page.locator('h1')).toBeVisible()
  })
})
