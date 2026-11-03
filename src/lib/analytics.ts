// Google Analytics (gtag.js) browser tracking.
// The Measurement ID is provided by the Google Analytics connector as
// VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY.

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized || !measurementId) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

// SPA route changes: gtag only auto-tracks the initial page load.
export function trackPageView(path: string) {
  if (!window.gtag || !measurementId) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
  });
}
