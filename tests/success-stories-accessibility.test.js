const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("success stories page quality contract", () => {
  test("uses route metadata and darker stat labels for the success stories page", () => {
    const seo = read("frontend/data/seo.js");
    const page = read("frontend/app/success-stories/page.js");

    expect(seo).toContain('path: "/success-stories"');
    expect(page).toContain("createSeoMetadata");
    expect(page).toContain('const routeSeo = getRouteSeo("/success-stories");');
    expect(page).toContain("export const metadata = createSeoMetadata(routeSeo);");
    expect(page).toContain('color: "var(--ink-soft)"');
  });
});
