import Link from "next/link";
import { FadeIn, FadeUp, Stagger, StaggerItem } from "./Motion";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { href: "/", label: "Homepage" },
      { href: "/feature", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact?intent=demo", label: "Demo" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Career tips" },
      { href: "/feature", label: "Resume support" },
      { href: "/feature", label: "LinkedIn support" },
      { href: "/contact", label: "Help desk" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide">
        <Stagger className="footer-grid">
          <StaggerItem>
            <Link className="brand" href="/">
              <span className="brand-mark">9</span>
              <span>9Jobs</span>
            </Link>
            <FadeIn as="p">
              Join candidates and teams using 9Jobs to apply smarter, polish
              profiles, and move faster through the hiring journey.
            </FadeIn>
            <div className="newsletter">
              <input aria-label="Email address" type="email" placeholder="Email address" />
              <button className="btn btn-lime" type="button">
                Get updated <ArrowRight size={16} />
              </button>
            </div>
          </StaggerItem>

          {footerGroups.map((group) => (
            <StaggerItem key={group.title}>
              <h4>{group.title}</h4>
              <div className="footer-links">
                {group.links.map((link) => (
                  <Link key={`${group.title}-${link.label}`} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="footer-bottom">
          <span>© 2026 9Jobs. All rights reserved.</span>
          <span>Australia / Global career support</span>
        </FadeUp>
      </div>
    </footer>
  );
}
