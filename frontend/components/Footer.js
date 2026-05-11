"use client";

import Link from "next/link";
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
      { href: "/contact", label: "Careers" },
      { href: "/contact", label: "Contact us" },
      { href: "/contact", label: "Privacy" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Start here" },
      { href: "/blog", label: "Tutorials" },
      { href: "/blog", label: "Blog" },
      { href: "/blog", label: "Article" },
    ],
  },
];

export default function Footer() {
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
            <form className="fj-newsletter">
              <input aria-label="Email address" type="email" placeholder="Email address" />
              <button className="fj-button fj-button--lime" type="button">
                Get updated <ArrowRight size={16} />
              </button>
            </form>
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
              </div>
            </div>
          ))}
        </div>

        <div className="footer-bottom fj-footer-bottom">
          <span>&copy; 2026 9Jobs, made by Om</span>
          <span>Australia / Global career support</span>
        </div>
      </div>
    </footer>
  );
}
