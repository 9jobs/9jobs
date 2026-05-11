"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealRules = [
  [".site-nav.fj-nav", "slide-from-top", 0],
  [".fj-hero .fj-announcement, .fj-page-hero .fj-announcement", "fade-down", 0],
  [".fj-hero h1, .fj-page-hero h1", "fade-up", 70],
  [".fj-hero p, .fj-page-hero p", "fade-up", 140],
  [".fj-actions", "fade-up", 210],
  [".fj-hero-dashboard, .fj-dashboard", "slide-from-bottom", 120],
  [".fj-trust, .fj-quote-panel, .fj-final-cta", "zoom-in", 0],
  [".fj-section-head > *, .fj-copy-block > *", "fade-up", 0],
  [".fj-image-card, .fj-card-media, .fj-leader-media", "fade-in", 0],
  [".fj-contact-panel", "fade-left", 0],
  [".fj-contact-form-slot", "fade-right", 90],
  [".fj-footer", "fade-up", 0],
];

const cardSelector = [
  ".fj-feature-card",
  ".fj-plan-card",
  ".fj-pricing-card",
  ".fj-blog-card",
  ".fj-team-card",
  ".fj-mini-item",
  ".fj-activity-card",
  ".fj-role-card",
  ".fj-ai-card",
  ".fj-contact-hours",
].join(", ");

const rowSelector = [
  ".fj-table-row",
  ".fj-activity-row",
  ".fj-role-row",
  ".fj-task-row",
  ".fj-chip-list span",
  ".fj-price-list span",
  ".fj-logo-row span",
  ".fj-integration-grid span",
  ".fj-footer-links a",
].join(", ");

function toArray(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

function markElement(element, type, delay = 0) {
  if (!element || element.dataset.fjRevealBound === "true") return;
  element.dataset.fjReveal = type;
  element.dataset.fjRevealBound = "true";
  element.style.setProperty("--reveal-delay", `${Math.min(delay, 520)}ms`);
}

function markList(elements, type, baseDelay = 0, step = 70) {
  elements.forEach((element, index) => markElement(element, type, baseDelay + index * step));
}

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanupTimers = [];
    let cleanupSetup = () => {};

    function setup() {
      revealRules.forEach(([selector, type, delay]) => {
        markList(toArray(selector), type, delay, 55);
      });

      toArray(".fj-section").forEach((section) => {
        markElement(section, "smooth-section", 0);
        markList(toArray(cardSelector, section), "zoom-in", 60, 80);
        markList(toArray(rowSelector, section), "fade-up", 70, 50);
      });

      toArray(".fj-split").forEach((split) => {
        Array.from(split.children).forEach((child, index) => {
          markElement(child, index % 2 === 0 ? "slide-from-left" : "slide-from-right", index * 90);
        });
      });

      toArray(".fj-card-grid, .fj-list-grid, .fj-integration-grid, .fj-logo-row, .fj-footer-grid").forEach((group) => {
        group.dataset.fjStagger = "true";
        Array.from(group.children).forEach((child, index) => {
          if (!child.dataset.fjRevealBound) {
            markElement(child, index % 2 === 0 ? "fade-up" : "fade-in", index * 65);
          }
        });
      });

      toArray(".fj-hero-doodle, .fj-dashboard, .fj-image-card, .fj-leader-media, .fj-ai-card").forEach((element, index) => {
        element.dataset.fjParallax = index % 2 === 0 ? "18" : "-14";
      });

      const revealElements = toArray("[data-fj-reveal]");

      if (reduceMotion) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
        return () => {};
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const startsInView = rect.top < window.innerHeight * 0.94 && rect.bottom > -40;

        if (startsInView) {
          element.classList.add("is-visible");
        } else {
          observer.observe(element);
        }
      });
      toArray(".site-nav.fj-nav").forEach((element) => element.classList.add("is-visible"));

      let frame = 0;
      const parallaxElements = toArray("[data-fj-parallax]");

      function updateParallax() {
        frame = 0;
        const viewportHeight = window.innerHeight || 1;

        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < -120 || rect.top > viewportHeight + 120) return;

          const strength = Number(element.dataset.fjParallax || 16);
          const progress = (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight;
          element.style.setProperty("--parallax-y", `${(progress * strength).toFixed(2)}px`);
        });
      }

      function requestParallax() {
        if (!frame) frame = window.requestAnimationFrame(updateParallax);
      }

      requestParallax();
      window.addEventListener("scroll", requestParallax, { passive: true });
      window.addEventListener("resize", requestParallax);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", requestParallax);
        window.removeEventListener("resize", requestParallax);
        if (frame) window.cancelAnimationFrame(frame);
      };
    }

    const timer = window.setTimeout(() => {
      cleanupSetup = setup() || (() => {});
    }, 80);
    cleanupTimers.push(timer);

    return () => {
      cleanupTimers.forEach((item) => window.clearTimeout(item));
      cleanupSetup();
    };
  }, [pathname]);

  return null;
}
