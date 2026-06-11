"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/features", label: "Solutions" },
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog", label: "Newsletter" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/resume-writing", label: "Resume Writing" },
      { href: "/services/linkedin-optimization", label: "LinkedIn Optimization" },
      { href: "/services/seek-profile-optimization", label: "SEEK Profile Optimization" },
      { href: "/services/job-application-automation", label: "Job Sourcing & Applications" },
      { href: "/services/interview-coaching", label: "Interview Coaching" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact us" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Start here" },
      { href: "/blog", label: "Blog" },
      { href: "/success-stories", label: "Success Stories" },
      { href: "/admin/feedback", label: "Admin Feedback" },
    ],
  },
  {
    title: "Popular Locations",
    links: [
      { href: "/jobs/melbourne", label: "Jobs in Melbourne" },
      { href: "/jobs/sydney", label: "Jobs in Sydney" },
      { href: "/jobs/brisbane", label: "Jobs in Brisbane" },
      { href: "/jobs/perth", label: "Jobs in Perth" },
      { href: "/jobs/adelaide", label: "Jobs in Adelaide" },
      { href: "/jobs/geelong", label: "Jobs in Geelong" },
      { href: "/jobs/vic", label: "Jobs in Victoria" },
    ],
  },
];

const footerRows = Math.max(...footerGroups.map((group) => group.links.length));

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleNewsletterSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit email.");
      }

      setEmail("");
      setStatus("Thanks, we will keep you updated.");
    } catch (error) {
      setStatus(error.message || "Unable to submit email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="site-footer fj-footer">
      <div className="fj-container">
        <div className="fj-footer-grid">
          <div className="fj-footer-brand">
            <Link className="brand fj-brand" href="/">
              <span className="fj-brand-mark" aria-hidden="true">
                <span />
                <span />
              </span>
              <span>9Jobs</span>
            </Link>
            <p>Join the 40,000+ businesses in Australia using 9Jobs, today.</p>
            <form className="fj-newsletter" onSubmit={handleNewsletterSubmit}>
              <input
                aria-label="Email address"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button className="fj-button fj-button--lime" type="submit" disabled={loading}>
                {loading ? "Sending..." : "Get updated"} <ArrowRight size={16} />
              </button>
            </form>
            {status && <p className="fj-newsletter-status">{status}</p>}
            <div className="fj-footer-socials">
              <a href="https://www.instagram.com/9jobsau/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589408708559" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/9jobs/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {footerGroups.map((group) => (
            <div className="fj-footer-column" key={group.title}>
              <h3>{group.title}</h3>
              <div className="fj-footer-links">
                {group.links.map((link) => (
                  <Link href={link.href} key={`${group.title}-${link.label}`}>
                    {link.label}
                  </Link>
                ))}
                {Array.from({ length: footerRows - group.links.length }).map((_, index) => (
                  <span className="fj-footer-link-placeholder" aria-hidden="true" key={`${group.title}-placeholder-${index}`}>
                    &nbsp;
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom fj-footer-bottom" style={{ display: "flex", flexDirection: "column", gap: "10px", borderTop: "1px solid var(--line)", paddingTop: "20px", marginTop: "40px", fontSize: "0.8rem", color: "var(--muted)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "15px" }}>
            <span>&copy; 2026 9Jobs. All rights reserved. Registered Australian Business.</span>
            <span>ABN: 48 652 092 127 | Melbourne Office: Level 12, 120 Collins Street, Melbourne, VIC 3000</span>
          </div>
          <p style={{ margin: 0, fontSize: "0.75rem", lineHeight: "1.4" }}>
            Disclaimer: 9Jobs is a private career support, resume optimization, and job search facilitation provider. We are not associated with or endorsed by SEEK Limited, Jora, or LinkedIn Corporation. All product and service names, logos, and brands are property of their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
