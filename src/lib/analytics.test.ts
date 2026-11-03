import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Google Analytics command delivery", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY", "G-TEST123456");
    delete window.dataLayer;
    delete window.gtag;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    document.querySelectorAll('script[src*="googletagmanager.com"]').forEach((script) => script.remove());
  });

  it("queues initialization as Arguments objects that Google's library recognizes", async () => {
    const { initAnalytics } = await import("./analytics");
    initAnalytics();
    const queue = window.dataLayer || [];
    expect(queue).toHaveLength(3);
    for (const command of queue) {
      expect(Object.prototype.toString.call(command)).toBe("[object Arguments]");
    }
    expect(Array.from(queue[2] as IArguments)).toEqual([
      "config", "G-TEST123456", { send_page_view: false },
    ]);
  });

  it("queues initial and subsequent page views in the recognized format", async () => {
    const { initAnalytics, trackPageView } = await import("./analytics");
    initAnalytics();
    trackPageView("/");
    trackPageView("/endorsements");
    const events = (window.dataLayer || []).slice(3);
    expect(events).toHaveLength(2);
    events.forEach((event, index) => {
      expect(Object.prototype.toString.call(event)).toBe("[object Arguments]");
      expect(Array.from(event as IArguments)).toEqual([
        "event", "page_view", {
          page_path: index === 0 ? "/" : "/endorsements",
          page_location: window.location.href,
        },
      ]);
    });
  });

  it("initializes only once", async () => {
    const { initAnalytics } = await import("./analytics");
    initAnalytics();
    initAnalytics();
    expect(window.dataLayer).toHaveLength(3);
    expect(document.querySelectorAll('script[src*="googletagmanager.com"]')).toHaveLength(1);
  });
});