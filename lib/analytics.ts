export const GA_MEASUREMENT_ID = "G-3LBKY5NWQQ";

type AnalyticsEventParameters = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "event",
      eventName: string,
      parameters?: AnalyticsEventParameters,
    ) => void;
  }
}

export function trackLead(formName: "contact" | "service-request") {
  window.gtag?.("event", "generate_lead", {
    form_name: formName,
    lead_type: formName === "service-request" ? "service_booking" : "contact",
  });
}
