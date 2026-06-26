const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("sitewide card background contract", () => {
  test("keeps card and container surfaces white instead of gold-tinted fills", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain(".fj-page .fj-feature-card,");
    expect(globals).toContain(".fj-page .fj-final-cta--animated,");
    expect(globals).toContain("background: #ffffff !important;");
    expect(globals).toContain("background-image: none !important;");
    expect(globals).toContain(".fj-faq-panel.is-open {");
    expect(globals).toContain("background: #ffffff;");
  });
});
