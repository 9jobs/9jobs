export default function sitemap() {
  const baseUrl = "https://9jobs.co";

  // Main Pages (Consolidated features to /features)
  const mainPages = ["/", "/about", "/pricing", "/contact", "/services", "/blog", "/features", "/success-stories", "/privacy-policy"].map((path) => ({
    url: path === "/" ? `${baseUrl}/` : `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "daily" : (path === "/pricing" || path === "/blog" || path === "/services") ? "weekly" : "monthly",
    priority: path === "/" ? 1.0 : (path === "/pricing" || path === "/services" || path === "/blog") ? 0.9 : 0.8,
  }));

  // Core Service Pages (New hierarchical URL structure)
  const servicePages = [
    "/services/resume-writing",
    "/services/linkedin-optimization",
    "/services/seek-profile-optimization",
    "/services/job-application-automation",
    "/services/interview-coaching"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Blog Pages
  const blogPages = [
    "/blog/how-to-get-a-job-in-australia",
    "/blog/ats-resume-format-australia",
    "/blog/linkedin-optimization-australia-guide",
    "/blog/seek-profile-optimization-tips",
    "/blog/why-you-are-not-getting-job-interviews",
    "/blog/best-resume-format-australia-2026",
    "/blog/how-ats-systems-work-in-australia",
    "/blog/how-to-get-more-interviews-in-melbourne",
    "/blog/how-to-get-more-interviews-in-sydney",
    "/blog/top-linkedin-mistakes-job-seekers-make",
    "/blog/seek-profile-optimization-checklist",
    "/blog/how-recruiters-find-candidates-on-linkedin",
    "/blog/why-your-resume-gets-rejected-in-australia",
    "/blog/jobs-in-australia-for-new-migrants",
    "/blog/australian-resume-vs-international-resume"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Consolidated City Regional Hubs
  const cityPages = [
    "/jobs/melbourne",
    "/jobs/sydney",
    "/jobs/brisbane",
    "/jobs/perth",
    "/jobs/adelaide",
    "/jobs/geelong",
    "/jobs/vic"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Niche Melbourne Landing Targets
  const nichePages = [
    "/jobs/melbourne/traffic-controller",
    "/jobs/melbourne/warehouse"
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...mainPages, ...servicePages, ...blogPages, ...cityPages, ...nichePages];
}
