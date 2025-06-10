'use client';

import CookieConsent from 'react-cookie-consent';

export function CookieBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="mzinga_cookie_consent"
      style={{ background: '#2B373B', fontSize: '14px' }}
      buttonStyle={{ background: '#f1c40f', color: '#000', fontSize: '13px', borderRadius: '6px' }}
      declineButtonStyle={{ background: '#555', color: '#fff', fontSize: '13px', borderRadius: '6px' }}
    >
      MzingaHub uses cookies to enhance your experience.{" "}
      <a href="/cookie-policy" className="underline text-blue-400">Learn more</a>.
    </CookieConsent>
  );
}
