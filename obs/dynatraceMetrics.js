const playwright = require('playwright');

class DynatraceMetricsReporter {
  constructor(environmentId, apiToken) {
    this.apiUrl = `https://${environmentId}.live.dynatrace.com/api/v2/metrics/ingest`;
    this.apiToken = apiToken;
  }

  /**
   * Send a custom metric to Dynatrace
   * @param {Object} metric Metric details including key, value, and optional dimensions
   * @param {string} metric.metricKey
   * @param {number} metric.value
   * @param {Object} [metric.dimensions]
   */
  async sendMetric(metric) {
    // Construct the metric string
    const dimensionsString = this.formatDimensions(metric.dimensions);
    const metricString = `${metric.metricKey}${dimensionsString ? ',' + dimensionsString : ''} ${metric.value}`;
    // console.log('Sending metric to Dynatrace:', metricString);

    try {
      const browser = await playwright.chromium.launch();
      const context = await browser.newContext();
      const page = await context.newPage();

      const response = await page.request.post(this.apiUrl, {
        headers: {
          'Authorization': `Api-Token ${this.apiToken}`,
          'Content-Type': 'text/plain; charset=utf-8'
        },
        data: metricString
      });

      if (!response.ok()) {
        const responseBody = await response.text();
        throw new Error(`Failed to send metric: ${response.status()} - ${responseBody}`);
      }

      await browser.close();
    } catch (error) {
      console.error('Error sending metric to Dynatrace:', error);
    }
  }

  /**
   * Format dimensions for the metric string
   * @param {Object} dimensions
   * @returns {string}
   */
  formatDimensions(dimensions = {}) {
    return Object.entries(dimensions)
      .map(([key, value]) => `${key}="${value}"`)
      .join(',');
  }
}

module.exports = { DynatraceMetricsReporter };