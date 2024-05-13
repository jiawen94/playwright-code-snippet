import { test, expect } from '@playwright/test';

test('test0', async ({ page }) => {
  await page.goto('https://www.baidu.com/');
  await page.locator('#kw').click();
  await page.locator('#kw').fill('playwright');
  await page.getByRole('button', { name: '百度一下' }).click();

});

test('test1', async ({ page }) => {
  await page.goto('https://www.baidu.com/');
  await page.locator('#kw').click();

  await page.waitForTimeout(5_000)
  await page.locator('#kw').fill('hehehe');
  await page.getByRole('button', { name: '百度一下' }).click();


});

test('test2', async ({ page }) => {
  await page.goto('https://www.baidu.com/');
  await page.locator('#kw').click();


  await page.waitForTimeout(5_000)
  await page.locator('#kw').fill('hehehe');
  await page.getByRole('button', { name: '百度一下' }).click();
});