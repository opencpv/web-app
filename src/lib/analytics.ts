export const trackEvent = (eventName: string, properties = {}) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...properties,
    });
  }
};

// Add type definition for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
