const sendMetricToDynatrace = async (metricName, value) => {
    // const dynatraceApiToken = process.env.REACT_APP_DYNATRACE_API_TOKEN;
    const dynatraceUrl = 'https://noj90533.live.dynatrace.com/api/v2/metrics/ingest';
  
    const payload = `${metricName} ${value}`;
    const response = await fetch(dynatraceUrl, {
      method: 'POST',
      headers: {
        // 'Authorization': `Api-Token ${dynatraceApiToken}`,
        'Content-Type': 'text/plain',
      },
      body: payload,
    });
  
    if (!response.ok) {
      console.error('Failed to send metric to Dynatrace', response.statusText);
    } else {
      console.log('Metric sent successfully to Dynatrace');
    }
  };
  
export default sendMetricToDynatrace;