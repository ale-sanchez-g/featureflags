// browserInfo.js
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  let browserName = 'Unknown';
  let osName = 'Unknown';

  if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    browserName = 'Internet Explorer';
  }

  if (platform.indexOf('Win') > -1) {
    osName = 'Windows';
  } else if (platform.indexOf('Mac') > -1) {
    osName = 'MacOS';
  } else if (platform.indexOf('Linux') > -1) {
    osName = 'Linux';
  } else if (/Android/.test(userAgent)) {
    osName = 'Android';
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    osName = 'iOS';
  }

  return { browserName, osName, platform };
};