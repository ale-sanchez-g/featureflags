const { DynatraceMetricsReporter } = require('../obs/dynatraceMetrics.js');

// Initialize Dynatrace reporter
const dynatraceReporter = new DynatraceMetricsReporter(
  "noj90533", 
  process.env.DYNATRACE_API_TOKEN
);

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

test("Broken Flow", async ({ page }) => {
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

// Send a custom metric to Dynatrace after each test
test.afterEach(async ({ page }, testInfo) => {
  // Get the status of the  testResult.status property
  const result = testInfo.status; 
  console.log('Test Result:', result);

  // Send the metric to Dynatrace
  await dynatraceReporter.sendMetric({
    metricKey: 'playwrightTestStatus,app="calculator"',
    value: result === 'passed' ? 0 : 1
  });
});