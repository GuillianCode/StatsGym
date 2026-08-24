type Properties = Record<string, string | number | boolean | null | undefined>;

let captureImpl = (_event: string, _properties?: Properties) => {};
let tracingHeadersImpl = () => ({} as Record<string, string>);
const allowedPropertyNames = new Set([
  'survey', 'survey_schema_version', 'step_number', 'step_name', 'profile', 'profile_label',
  'discipline', 'tab_name', 'share_medium', 'share_method', 'share_id', 'campaign',
  'profile_role', 'error_code',
]);

function withoutPersonalData(properties?: Properties) {
  return Object.fromEntries(Object.entries(properties ?? {}).filter(([name]) => allowedPropertyNames.has(name)));
}

export const analytics = {
  capture(event: string, properties?: Properties) { captureImpl(event, withoutPersonalData(properties)); },
  tracingHeaders() { return tracingHeadersImpl(); },
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
  tracingHeadersImpl = () => {
    const distinctId = posthog.get_distinct_id();
    const sessionId = posthog.get_session_id();
    return {
      ...(distinctId ? {'x-posthog-distinct-id': distinctId} : {}),
      ...(sessionId ? {'x-posthog-session-id': sessionId} : {}),
    };
  };
}
