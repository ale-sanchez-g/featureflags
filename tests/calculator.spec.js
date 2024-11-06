// @ts-check
const { test, expect } = require("@playwright/test");

// loop 10 times
for (let i = 0; i < 5; i++) {
  // create a random string every time
  let randomString = Math.random().toString(36).substring(7);

  test.skip("has title +"+i, async ({ page }) => {
    await page.goto("/featureflags");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Calculator/);
  });

  test.skip("Enter Name +"+i, async ({ page }) => {
    await page.goto("/featureflags");

  // Fill name
    await page.fill('input[id="name"]', `John ${randomString}` );

    // Click text=Submit
    await page.click('text=Submit');
  });

  test("adds 2 numbers +"+i, async ({ page }) => {
    await page.goto("/featureflags");

    // Fill name
    await page.fill('input[id="name"]', `John ${randomString}` );

    // Click text=Submit
    await page.click('text=Submit');

    // Click button 2
    await page.click('text=2');
    
    // Click text=Add
    await page.click('text=+');

    // Click text=-
    await page.click('text=-');

    // Click text= =
    await page.click('text==');

    // expect 5 to be in the page
    const result = await page.locator('.result');
    await expect(result).toHaveText('Error');
  });
};