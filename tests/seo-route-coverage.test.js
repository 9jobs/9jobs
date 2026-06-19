const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function listPageFiles(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  return fs.readdirSync(absoluteDir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) return listPageFiles(entryPath);
    return entry.name === "page.js" ? [entryPath] : [];
  });
}

const indexableRoutes = [
  "/",
  "/9-jobs",
  "/about",
  "/pricing",
  "/contact",
  "/services",
  "/services/resume-writing",
  "/services/linkedin-optimization",
  "/services/seek-profile-optimization",
  "/services/job-application-automation",
  "/services/interview-coaching",
  "/blog",
  "/blog/how-to-get-a-job-in-australia",
  "/jobs",
  "/jobs/sydney",
  "/jobs/melbourne",
  "/jobs/brisbane",
  "/jobs/perth",
  "/jobs/adelaide",
  "/jobs/geelong",
  "/jobs/vic",
  "/jobs/melbourne/traffic-controller",
  "/jobs/melbourne/warehouse",
];

describe("site-wide SEO route coverage", () => {
  test("defines a central canonical route inventory used by sitemap and metadata", () => {
    const seo = read("frontend/data/seo.js");

    expect(seo).toContain("export const siteRoutes");
    expect(seo).toContain("export function createSeoMetadata");
    expect(seo).toContain("export function createBreadcrumbSchema");
    expect(seo).toContain("export function JsonLd");

    for (const route of indexableRoutes) {
      expect(seo).toContain(`path: "${route}"`);
    }
  });

  test("robots allows crawling and declares the canonical sitemap", () => {
    const robots = read("frontend/app/robots.js");

    expect(robots).toContain('userAgent: "*"');
    expect(robots).toContain('allow: "/"');
    expect(robots).not.toContain("disallow");
    expect(robots).toContain('sitemap: "https://9jobs.co/sitemap.xml"');
  });

  test("sitemap uses route-specific dates instead of a shared build timestamp", () => {
    const sitemap = read("frontend/app/sitemap.js");

    expect(sitemap).toContain("siteRoutes.map");
    expect(sitemap).toContain("lastModified: route.lastModified");
    expect(sitemap).not.toContain("lastModified: new Date()");
  });

  test("important pages emit canonical metadata plus Open Graph and Twitter cards", () => {
    const pageFiles = [
      "frontend/app/about/page.js",
      "frontend/app/pricing/page.js",
      "frontend/app/contact/page.js",
      "frontend/app/services/page.js",
      "frontend/app/jobs/page.js",
      "frontend/app/blog/page.js",
      "frontend/app/jobs/[city]/page.js",
      "frontend/app/jobs/[city]/[slug]/page.js",
      "frontend/app/jobs/melbourne/traffic-controller/page.js",
      "frontend/app/jobs/melbourne/warehouse/page.js",
      ...listPageFiles("frontend/app/services").filter((file) => file !== "frontend/app/services/page.js"),
      ...listPageFiles("frontend/app/blog").filter((file) => !file.includes("[slug]")),
    ];

    for (const file of pageFiles) {
      const content = read(file);
      expect(content).toContain("createSeoMetadata");
    }
  });

  test("footer exposes the requested Explore 9Jobs internal links", () => {
    const footer = read("frontend/components/Footer.js");

    expect(footer).toContain("Explore 9Jobs");
    for (const route of [
      "/jobs/sydney",
      "/jobs/melbourne",
      "/jobs/brisbane",
      "/services/resume-writing",
      "/services/linkedin-optimization",
      "/services/interview-coaching",
      "/blog/how-to-get-a-job-in-australia",
    ]) {
      expect(footer).toContain(`href: "${route}"`);
    }
  });
});
