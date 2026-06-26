const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("homepage motion contract", () => {
  test("scopes Stripe-inspired motion hooks to the homepage only", () => {
    const page = read("frontend/app/page.js");
    const globals = read("frontend/app/globals.css");
    const scrollAnimations = read("frontend/components/ScrollAnimations.js");
    const primitives = read("frontend/components/homepage/HomeMotion.js");
    const stats = read("frontend/components/FeedbackStats.js");
    const testimonials = read("frontend/components/Testimonials.js");

    expect(page).toContain("fj-home-hero-shell");
    expect(page).toContain("fj-stripe-orb");
    expect(page).toContain("fj-home-section--spotlight");
    expect(page).toContain("fj-home-marquee-shell");
    expect(page).toContain("fj-hero-floating-cluster");
    expect(page).toContain("fj-progress-line-shell");
    expect(page).toContain("data-fj-motion-root=\"true\"");

    expect(globals).toContain(".fj-homepage .fj-home-hero-shell");
    expect(globals).toContain("@keyframes fj-orb-drift");
    expect(globals).toContain(".fj-homepage .fj-home-section--spotlight::before");
    expect(globals).toContain(".fj-homepage .fj-home-marquee-shell::before");
    expect(globals).toContain(".fj-hero-floating-card");
    expect(globals).toContain(".fj-progress-line-shell");
    expect(globals).toContain(".fj-faq-panel");

    expect(scrollAnimations).toContain(".fj-home-hero-shell");
    expect(scrollAnimations).toContain(".fj-home-parallax-card");
    expect(scrollAnimations).toContain(".fj-home-orb");
    expect(scrollAnimations).toContain("data-fj-motion-root");

    expect(primitives).toContain("export function Reveal");
    expect(primitives).toContain("export function StaggerContainer");
    expect(primitives).toContain("export function FloatingCard");
    expect(primitives).toContain("export function AnimatedCounter");
    expect(primitives).toContain("export function Marquee");
    expect(primitives).toContain("export function ScrollProgressLine");

    expect(stats).toContain("AnimatedCounter");
    expect(testimonials).toContain("drag=\"x\"");
  });
});
