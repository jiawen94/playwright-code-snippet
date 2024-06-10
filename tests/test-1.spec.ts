import { test, expect } from '@playwright/test';

    /**
     * @owner jiawen
     * @description
     * test test0
     */

test('test0', async ({ page }) => {
  await page.goto('https://www.baidu.com/');
  await page.locator('#kw').click();
  await page.locator('#kw').fill('playwright');
  await page.getByRole('button', { name: '百度一下' }).click();

});
