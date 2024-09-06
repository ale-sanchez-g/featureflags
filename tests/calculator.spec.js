// @ts-check
const { test, expect } = require("@playwright/test");

test("has title", async ({ page }) => {
  await page.goto("/featureflags");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Calculator/);
});

test("Enter Name", async ({ page }) => {
  await page.goto("/featureflags");

 // Fill name
  await page.fill('input[id="name"]', 'John Doe');

  // Click text=Submit
  await page.click('text=Submit');
});

test("adds 2 numbers", async ({ page }) => {
  await page.goto("/featureflags");

   // Fill name
   await page.fill('input[id="name"]', 'John Doe');

   // Click text=Submit
   await page.click('text=Submit');

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