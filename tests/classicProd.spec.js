// @ts-check
const { test, expect } = require("@playwright/test");

test("adds 2 numbers", async ({ page }) => {
    await page.goto("https://ale-sanchez-g.github.io/featureflags/");

    // Click button 2
    await page.click('text=2');
    
    // Click text=Add
    await page.click('text=+');
  
    // Click text=3
    await page.click('text=3');
  
      // Click text= =
      await page.click('text==');
  
    // expect 5 to be in the page
    const result = await page.locator('.result');
    await expect(result).toHaveText('5');
  });