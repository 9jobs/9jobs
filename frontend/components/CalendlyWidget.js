"use client";

import Script from "next/script";

const CALENDLY_URL = "https://calendly.com/mayanksodhi11";

export function openCalendlyPopup() {
  if (!window.Calendly) {
    window.location.href = CALENDLY_URL;
    return;
  }

  window.Calendly.initPopupWidget({ url: CALENDLY_URL });
}

export function CalendlyLoader() {
  return (
    <>
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      <Script
        id="calendly-widget"
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}

export function CalendlyLink({ children, className, onClick }) {
  function handleClick(event) {
    onClick?.(event);

    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    openCalendlyPopup();
  }

  return (
    <a className={className} href={CALENDLY_URL} onClick={handleClick}>
      {children}
    </a>
  );
}
