const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("homepage button text centering contract", () => {
  test("keeps jobs CTA labels centered while the arrow stays on the right", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain(".fj-location-link {");
    expect(globals).toContain("grid-template-columns: 14px auto 14px;");
    expect(globals).toContain("padding-inline: 24px;");
    expect(globals).toContain(".fj-location-link::before {");
    expect(globals).toContain(".fj-location-link svg {");
    expect(globals).toContain("position: static;");
    expect(globals).toContain("justify-self: end;");
  });

  test("uses white backgrounds for homepage spotlight boxes", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain(".fj-homepage .fj-mini-item,");
    expect(globals).toContain(".fj-homepage .fj-home-section--spotlight .fj-activity-card,");
    expect(globals).toContain(".fj-homepage .fj-home-section--media .fj-leader-card,");
    expect(globals).toContain("background: #ffffff;");
  });
});
