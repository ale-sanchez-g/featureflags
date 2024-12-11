// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://ale-sanchez-g.github.io/featureflags/");

  // wait for page to load
  await page.waitForLoadState('load');

  // if input name is displayed enter the name
  const inputName = await page.locator('input[id="name"]');
  
  if (await inputName.isVisible()) {
    await inputName.fill("Alejandro");
    await page.click('button[type="submit"]');
  }
});

test("adds 2 numbers", async ({ page }) => {
  // Click button 2
  await page.click("text=2");

  // Click text=Add
  await page.click("text=+");

  // Click text=3
  await page.click("text=3");

  // Click text= =
  await page.click("text==");

  // expect 5 to be in the page
  const result = await page.locator(".result");
  await expect(result).toHaveText("5");
});

test("Error", async ({ page }) => {
  // Click button 2
  await page.click("text=2");

  // Click text=Add
  await page.click("text=+");

  // Click text=3
  await page.click("text=-");

  // Click text= =
  await page.click("text==");

  // expect 5 to be in the page
  const result = await page.locator(".result");
  await expect(result).toHaveText("Error");
});
