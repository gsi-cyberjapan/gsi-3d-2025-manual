import { test, expect } from '@playwright/test'

test.describe('ナビゲーション', () => {
  test('トップページが表示されること', async ({ page }) => {
    await page.goto('./')
    await expect(page.locator('.VPHero .name')).toBeVisible()
  })

  test('ナビバーのリンクが機能すること', async ({ page }) => {
    await page.goto('./')

    // 「操作マニュアル」リンクをクリック
    await page.locator('.VPNavBarMenuLink', { hasText: '操作マニュアル' }).click()
    await expect(page).toHaveURL(/\/overview/)
    await expect(page.locator('h1')).toContainText('機能概要')
  })

  test('サイドバーからページ遷移できること', async ({ page }) => {
    await page.goto('./overview')

    // サイドバーの「1. 地図」リンクをクリック
    const sidebarLink = page.locator('.VPSidebar .VPSidebarItem a', { hasText: '1. 地図' })
    await sidebarLink.waitFor({ state: 'visible', timeout: 10000 })
    await sidebarLink.click()
    await expect(page).toHaveURL(/\/guide\/map-layers/)
    await expect(page.locator('h1')).toContainText('地図')
  })

  test('全サイドバーリンクが404にならないこと', async ({ page }) => {
    await page.goto('./overview')

    // サイドバー内の全リンクを取得
    const sidebar = page.locator('.VPSidebar')
    await sidebar.waitFor({ state: 'visible', timeout: 10000 })
    const links = sidebar.locator('a[href]')
    const hrefs = await links.evaluateAll((els) =>
      els.map((el) => el.getAttribute('href')).filter(Boolean),
    )

    for (const href of hrefs) {
      const response = await page.goto(href!)
      expect(
        response?.status(),
        `${href} が ${response?.status()} を返しました`,
      ).not.toBe(404)
    }
  })
})
