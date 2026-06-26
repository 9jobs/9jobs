const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("card CTA centering contract", () => {
  test("keeps shared card buttons bottom-centered across the site", () => {
    const globals = read("frontend/app/globals.css");

    expect(globals).toContain("align-self: center;");
    expect(globals).toContain("margin-inline: auto;");
    expect(globals).toContain(".fj-city-card .fj-button {");
    expect(globals).toContain("margin-top: auto;");
  });
});
