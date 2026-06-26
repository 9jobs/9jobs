const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("homepage hero spacing contract", () => {
  test("keeps the first hero announcement close to the fixed navbar", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain(".fj-homepage .fj-home-hero-shell {");
    expect(globals).toContain("padding-top: 108px;");
    expect(globals).toContain(".fj-home-hero-grid {");
    expect(globals).toContain("padding-top: 0;");
    expect(globals).toContain("@media (max-width: 1080px) {");
    expect(globals).toContain("padding-top: 100px;");
    expect(globals).toContain("@media (max-width: 640px) {");
    expect(globals).toContain("padding-top: 92px;");
  });
});
