import { test, expect, devices } from '@playwright/test'

test.describe('レスポンシブ対応', () => {
  test('モバイルでハンバーガーメニューが表示されること', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 13'],
    })
    const page = await context.newPage()

    await page.goto('./')
    // モバイルではハンバーガーメニューボタンが表示される
    await expect(page.locator('.VPNavBarHamburger')).toBeVisible()

    await context.close()
  })

  test('モバイルでハンバーガーメニューからナビスクリーンが開けること', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 13'],
    })
    const page = await context.newPage()

    await page.goto('./overview')
    // ハンバーガーメニューをクリック（タイトルテキストの重なりを force で回避）
    await page.locator('.VPNavBarHamburger').click({ force: true })
    // ナビスクリーンが表示される
    await expect(page.locator('.VPNavScreen')).toBeVisible({ timeout: 5000 })

    await context.close()
  })

  test('デスクトップでサイドバーが表示されること', async ({ page }) => {
    await page.goto('./overview')
    const sidebar = page.locator('.VPSidebar')
    await expect(sidebar).toBeVisible({ timeout: 10000 })
    await expect(page.locator('.VPNavBarHamburger')).not.toBeVisible()
  })
})
