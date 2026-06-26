const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("homepage performance contract", () => {
  test("self-hosts the primary font instead of pulling it from fonts.gstatic at render time", () => {
    const layout = read("frontend/app/layout.js");
    const globals = read("frontend/app/globals.css");

    expect(layout).toContain('import { Onest } from "next/font/google";');
    expect(layout).toContain('variable: "--font-onest"');
    expect(layout).toContain("<body className={onest.variable}>");
    expect(globals).toContain("--fj-font: var(--font-onest), Inter, Arial, sans-serif;");
    expect(globals).not.toContain("fonts.gstatic.com");
    expect(globals).not.toContain("@font-face");
  });

  test("uses responsive Next images for the homepage logo marquee and fixes the low-contrast badge copy", () => {
    const page = read("frontend/app/page.js");
    const globals = read("frontend/app/globals.css");

    expect(page).toContain("width={logo.width}");
    expect(page).toContain("height={logo.height}");
    expect(page).toContain('sizes="(max-width: 640px) 96px, 120px"');
    expect(page).not.toContain("<img");
    expect(globals).toContain(".fj-page .fj-badge-gold {");
    expect(globals).toContain("color: #8a5b00 !important;");
    expect(globals).toContain(".fj-homepage .fj-announcement span {");
  });
});
