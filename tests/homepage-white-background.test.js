const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("homepage white background contract", () => {
  test("forces homepage light section backgrounds to white", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain(".fj-homepage .fj-section--muted,");
    expect(globals).toContain(".fj-homepage .fj-home-section--compact {");
    expect(globals).toContain("background: #ffffff;");
    expect(globals).toContain(".fj-homepage .fj-home-marquee-shell::before {");
    expect(globals).toContain("background: linear-gradient(90deg, rgba(255, 255, 255, 0.98), transparent);");
  });
});
