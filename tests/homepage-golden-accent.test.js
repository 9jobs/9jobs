const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("homepage golden accent contract", () => {
  test("uses the golden homepage accent palette", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain("--fj-home-accent: #D4A017;");
    expect(globals).toContain("--fj-home-accent-light: #e6bf4f;");
    expect(globals).toContain("--fj-home-accent-dark: #b5840d;");
  });
});
