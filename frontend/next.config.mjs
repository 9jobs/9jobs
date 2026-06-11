import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(appDir, "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
  async redirects() {
    return [
      // Core Service Redirects
      { source: "/resume-writing-services-australia", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/linkedin-optimization-australia", destination: "/services/linkedin-optimization", statusCode: 301 },
      { source: "/seek-profile-optimization", destination: "/services/seek-profile-optimization", statusCode: 301 },
      { source: "/job-application-services-australia", destination: "/services/job-application-automation", statusCode: 301 },
      { source: "/interview-support-australia", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/feature", destination: "/features", statusCode: 301 },

      // Melbourne Redirects
      { source: "/melbourne", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/get-jobs-in-melbourne", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/jobs-in-melbourne", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/careers-melbourne", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/jobs-melbourne", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/get-jobs-in-melbourne-vic", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/resume-melbourne", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/interview-coaching-melbourne", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/melbourne/get-jobs", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/melbourne/jobs", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/melbourne/careers", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/melbourne/resume", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/melbourne/interview-coaching", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/melbourne/jobs-melbourne", destination: "/jobs/melbourne", statusCode: 301 },
      { source: "/melbourne/get-jobs-vic", destination: "/jobs/melbourne", statusCode: 301 },

      // Sydney Redirects
      { source: "/sydney", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/get-jobs-in-sydney-nsw", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/jobs-in-sydney-nsw", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/career-services-sydney-nsw", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/resume-writer-sydney-nsw", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/interview-coaching-sydney-nsw", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/sydney/get-jobs", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/sydney/jobs", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/sydney/career-services", destination: "/jobs/sydney", statusCode: 301 },
      { source: "/sydney/resume-writer", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/sydney/interview-coaching", destination: "/services/interview-coaching", statusCode: 301 },

      // Brisbane Redirects
      { source: "/brisbane", destination: "/jobs/brisbane", statusCode: 301 },
      { source: "/get-jobs-in-brisbane-qld", destination: "/jobs/brisbane", statusCode: 301 },
      { source: "/jobs-in-brisbane-qld", destination: "/jobs/brisbane", statusCode: 301 },
      { source: "/resume-writer-brisbane-qld", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/brisbane/get-jobs", destination: "/jobs/brisbane", statusCode: 301 },
      { source: "/brisbane/jobs", destination: "/jobs/brisbane", statusCode: 301 },
      { source: "/brisbane/resume-writer", destination: "/services/resume-writing", statusCode: 301 },

      // Perth Redirects
      { source: "/perth", destination: "/jobs/perth", statusCode: 301 },
      { source: "/get-jobs-in-perth-wa", destination: "/jobs/perth", statusCode: 301 },
      { source: "/jobs-in-perth-wa", destination: "/jobs/perth", statusCode: 301 },
      { source: "/resume-writer-perth-wa", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/career-coaching-perth-wa", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/jobs-perth", destination: "/jobs/perth", statusCode: 301 },
      { source: "/jobs-in-perth", destination: "/jobs/perth", statusCode: 301 },
      { source: "/jobs-in-perth-wa-sourcing", destination: "/jobs/perth", statusCode: 301 },
      { source: "/perth/get-jobs", destination: "/jobs/perth", statusCode: 301 },
      { source: "/perth/jobs", destination: "/jobs/perth", statusCode: 301 },
      { source: "/perth/resume-writer", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/perth/career-coaching", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/perth/jobs-perth", destination: "/jobs/perth", statusCode: 301 },
      { source: "/perth/jobs-in-perth", destination: "/jobs/perth", statusCode: 301 },
      { source: "/perth/jobs-in-perth-wa", destination: "/jobs/perth", statusCode: 301 },

      // Adelaide Redirects
      { source: "/adelaide", destination: "/jobs/adelaide", statusCode: 301 },
      { source: "/get-jobs-in-adelaide-sa", destination: "/jobs/adelaide", statusCode: 301 },
      { source: "/jobs-in-adelaide-sa", destination: "/jobs/adelaide", statusCode: 301 },
      { source: "/adelaide/get-jobs", destination: "/jobs/adelaide", statusCode: 301 },
      { source: "/adelaide/jobs", destination: "/jobs/adelaide", statusCode: 301 },

      // Geelong Redirects
      { source: "/geelong", destination: "/jobs/geelong", statusCode: 301 },
      { source: "/jobs-in-geelong-vic", destination: "/jobs/geelong", statusCode: 301 },
      { source: "/resume-help-geelong-vic", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/career-coaching-geelong-vic", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/geelong/jobs", destination: "/jobs/geelong", statusCode: 301 },
      { source: "/geelong/resume-help", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/geelong/career-coaching", destination: "/services/interview-coaching", statusCode: 301 },

      // Victoria Redirects
      { source: "/vic", destination: "/jobs/vic", statusCode: 301 },
      { source: "/jobs-in-vic", destination: "/jobs/vic", statusCode: 301 },
      { source: "/resume-help-vic", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/career-coaching-vic", destination: "/services/interview-coaching", statusCode: 301 },
      { source: "/vic/jobs", destination: "/jobs/vic", statusCode: 301 },
      { source: "/vic/resume-help", destination: "/services/resume-writing", statusCode: 301 },
      { source: "/vic/career-coaching", destination: "/services/interview-coaching", statusCode: 301 },

      // Apex Redirect
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.9jobs.co",
          },
        ],
        destination: "https://9jobs.co/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
