const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function readFiles(dir) {
  const entries = fs.readdirSync(path.join(root, dir), { withFileTypes: true });
  return entries.flatMap((entry) => {
    const relativePath = path.join(dir, entry.name);
    if (entry.isDirectory()) return readFiles(relativePath);
    if (!/\.(js|jsx|ts|tsx)$/.test(entry.name)) return [];
    return [{ relativePath, content: read(relativePath) }];
  });
}

const expectedTitle = '9Jobs – Job Search, Resume Writing & Career Support Australia';
const expectedDescription =
  '9Jobs helps Australian job seekers with Resume Writing, LinkedIn Optimization, SEEK Profile Optimization, Interview Coaching, and Job Application Support. Start your career journey today.';
const expectedCtrTitle = '9Jobs Australia | Resume Writing & Job Application Help';
const expectedCtrDescription =
  'Get more interviews with 9Jobs Australia: ATS resume writing, LinkedIn and SEEK profile optimization, job application support, and interview coaching.';

describe('homepage technical SEO contract', () => {
  test('uses the brand-search metadata everywhere the homepage can inherit it', () => {
    const layout = read('frontend/app/layout.js');
    const page = read('frontend/app/page.js');
    const combined = `${layout}\n${page}`;

    expect(combined).not.toContain('9Jobs | Smarter Job Applying');
    expect(combined).toContain(expectedCtrTitle);
    expect(combined).toContain(expectedCtrDescription);
    expect(page).toContain('canonical: new URL("https://9jobs.co/")');
    expect(layout).not.toContain('canonical: "/"');
    expect(page).toContain('openGraph:');
    expect(page).toContain('title: homepageTitle');
    expect(page).toContain('description: homepageDescription');
    expect(page).toContain('twitter:');
    expect(page).not.toContain('href="/feature"');
  });

  test('keeps the homepage to one brand H1', () => {
    const page = read('frontend/app/page.js');

    expect((page.match(/<h1\b/g) || []).length).toBe(1);
    expect(page).toContain('9Jobs – Job Search, Resume Writing &');
    expect(page).toContain('Career Support Australia');
  });

  test('publishes organization and website schema with social identity', () => {
    const layout = read('frontend/app/layout.js');

    expect(layout).toContain('"@type": ["Organization", "ProfessionalService"]');
    expect(layout).toContain('Career Services / Job Search Support');
    expect(layout).toContain('"areaServed"');
    expect(layout).toContain('https://www.linkedin.com/company/9jobs/');
    expect(layout).toContain('https://www.facebook.com/profile.php?id=61589408708559');
    expect(layout).toContain('https://www.instagram.com/9jobsau/');
    expect(layout).toContain('https://www.youtube.com/@9jobs');
    expect(layout).toContain('"@type": "SearchAction"');
    expect(layout).toContain('"alternateName"');
    expect(layout).toContain('9Jobs Application Services');
    expect(layout).toContain('"knowsAbout"');
    expect(layout).toContain('"hasOfferCatalog"');
  });

  test('adds branded PAA coverage and strong internal service links to the homepage', () => {
    const page = read('frontend/app/page.js');

    expect(page).toContain('What is 9Jobs?');
    expect(page).toContain('Is 9Jobs the same as Nine Careers or a job board?');
    expect(page).toContain('Does 9Jobs apply for jobs for me?');
    expect(page).toContain('href="/services/resume-writing"');
    expect(page).toContain('href="/services/linkedin-optimization"');
    expect(page).toContain('href="/services/seek-profile-optimization"');
    expect(page).toContain('href="/services/job-application-automation"');
    expect(page).toContain('href="/services/interview-coaching"');
  });

  test('keeps crawl discovery and canonical route consolidation configured', () => {
    const robots = read('frontend/app/robots.js');
    const sitemap = read('frontend/app/sitemap.js');
    const config = read('frontend/next.config.mjs');

    expect(robots).toContain('userAgent: "Googlebot"');
    expect(robots).toContain('sitemap: "https://9jobs.co/sitemap.xml"');
    expect(sitemap).toContain('/jobs/melbourne');
    expect(sitemap).toContain('/services/resume-writing');
    expect(sitemap).not.toContain('/jobs-in-melbourne');
    expect(sitemap).not.toContain('/resume-writing-services-australia');
    expect(config).toContain('{ source: "/jobs-in-melbourne", destination: "/jobs/melbourne", statusCode: 301 }');
    expect(config).toContain('{ source: "/jobs-melbourne", destination: "/jobs/melbourne", statusCode: 301 }');
    expect(config).toContain('{ source: "/get-jobs-in-melbourne", destination: "/jobs/melbourne", statusCode: 301 }');
    expect(config).toContain('{ source: "/feature", destination: "/features", statusCode: 301 }');
  });

  test('does not link page content to redirected legacy URLs', () => {
    const legacyRoutePattern =
      /(?<![\w-])\/(?:resume-writing-services-australia|linkedin-optimization-australia|seek-profile-optimization|job-application-services-australia|interview-support-australia|get-jobs-in-(?:sydney-nsw|melbourne|brisbane-qld|perth-wa|adelaide-sa)|jobs-in-melbourne|jobs-melbourne)(?![\w-])/;
    const files = [
      ...readFiles('frontend/app'),
      ...readFiles('frontend/components'),
      ...readFiles('frontend/data'),
    ];
    const offenders = files
      .filter(({ relativePath }) => !relativePath.endsWith(path.normalize('app/robots.js')))
      .filter(({ relativePath }) => !relativePath.endsWith(path.normalize('app/sitemap.js')))
      .filter(({ content }) => legacyRoutePattern.test(content))
      .map(({ relativePath }) => relativePath);

    expect(offenders).toEqual([]);
    expect(read('frontend/app/jobs/[city]/[slug]/page.js')).toContain('href={`/jobs/${city}`}');
  });

  test('keeps database environment validation lazy for clean static builds', () => {
    const db = read('frontend/utils/db.js');

    expect(db).not.toContain('console.warn');
    expect(db).toContain('process.env.MONGODB_URI');
    expect(db).toContain('throw new Error');
  });
});
