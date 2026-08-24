type Properties = Record<string, string | number | boolean | null | undefined>;

let captureImpl = (_event: string, _properties?: Properties) => {};

export const analytics = {
  capture(event: string, properties?: Properties) { captureImpl(event, properties); },
};

export async function initializeAnalytics() {
  const key = import.meta.env.VITE_POSTHOG_KEY;
  if (!key) return;
  const {default: posthog} = await import('posthog-js');
  posthog.init(key, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com',
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: false,
    disable_session_recording: true,
    person_profiles: 'never',
  });
  captureImpl = (event, properties) => posthog.capture(event, properties);
}
