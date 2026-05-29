"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/feature", label: "Solutions" },
      { href: "/feature", label: "Feature" },
      { href: "/pricing", label: "Pricing" },
      { href: "/blog", label: "Newsletter" },
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

        <div className="footer-bottom fj-footer-bottom">
          <span>&copy; 2026 9Jobs website. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
