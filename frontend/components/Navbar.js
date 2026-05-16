"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { CalendlyLink } from "./CalendlyWidget";

const links = [
  { href: "/about", label: "About" },
  { href: "/feature", label: "Feature" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

function isActive(pathname, href) {
  if (href === "/feature") return pathname === "/feature" || pathname === "/features";
  return pathname === href;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav fj-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner fj-nav-inner">
        <Link className="brand fj-brand" href="/" aria-label="9Jobs home">
          <span className="fj-brand-mark" aria-hidden="true">
            <span />
            <span />
          </span>
          <span>9Jobs</span>
        </Link>

        <nav className="nav-links fj-nav-links" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              className={isActive(pathname, link.href) ? "is-active" : undefined}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions fj-nav-actions">
          <Link href="/pricing" className="fj-button fj-button--ghost">
            1 day trial
          </Link>
          <CalendlyLink className="fj-button fj-button--dark">
            Get a demo <ArrowRight size={17} />
          </CalendlyLink>
        </div>

        <motion.button
          className="mobile-menu-button fj-menu-button"
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          whileTap={{ scale: 0.94 }}
        >
          {isOpen ? <X size={21} /> : <Menu size={21} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-drawer fj-mobile-drawer"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((link) => (
              <Link
                key={link.href}
                className={isActive(pathname, link.href) ? "is-active" : undefined}
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link className="fj-button fj-button--ghost" href="/pricing" onClick={() => setIsOpen(false)}>
              1 day trial
            </Link>
            <CalendlyLink className="fj-button fj-button--dark" onClick={() => setIsOpen(false)}>
              Get a demo <ArrowRight size={17} />
            </CalendlyLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
