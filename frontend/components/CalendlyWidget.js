"use client";

const CALENDLY_URL = "https://calendly.com/mayanksodhi11/30min?hide_event_type_details=1";

let calendlyPromise = null;

export function loadCalendly() {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Calendly) return Promise.resolve(true);
  if (calendlyPromise) return calendlyPromise;

  calendlyPromise = new Promise((resolve) => {
    // 1. Load stylesheet
    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // 2. Load script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return calendlyPromise;
}

export async function openCalendlyPopup() {
  if (!window.Calendly) {
    const loaded = await loadCalendly();
    if (!loaded || !window.Calendly) {
      window.location.href = CALENDLY_URL;
      return;
    }
  }

  window.Calendly.initPopupWidget({ url: CALENDLY_URL });
}

export function CalendlyLoader() {
  return null; // Don't load script on initial mount to avoid third-party cookies
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
    <a
      className={className}
      href={CALENDLY_URL}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
