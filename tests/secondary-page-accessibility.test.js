const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

describe("secondary page accessibility contract", () => {
  test("keeps non-homepage announcement badges on an accessible dark-gold text color", () => {
    const globals = read("frontend/app/globals.css");
    const landing = read("frontend/app/9-jobs/page.js");
    const announcementMatch = globals.match(/\.fj-page \.fj-announcement span \{([\s\S]*?)\n\}/);

    expect(landing).toContain("<span>Brand page</span> 9jobs and 9 Jobs are the same service");
    expect(announcementMatch).not.toBeNull();
    expect(announcementMatch[1]).toContain("color: #8a5b00 !important;");
  });
});
