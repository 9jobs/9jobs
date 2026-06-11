"use client";

import { motion } from "framer-motion";
import { Star, CalendarCheck, ShieldCheck, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FeedbackStats() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const stats = [
    { value: "4.8/5", label: "Average Client Rating", icon: Star },
    { value: "1,200+", label: "Interviews Arranged", icon: CalendarCheck },
    { value: "450+", label: "Successful Placements", icon: ShieldCheck },
    { value: "92%", label: "Repeat Clients", icon: UsersRound },
  ];

  // Animation Variants
  const getContainerVariant = () => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 150ms delay between cards
      },
    },
  });

  const getCardVariant = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1, y: 0 },
        visible: { opacity: 1, y: 0 },
      };
    }
    return {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
    };
  };

  const getLeftSlideVariant = () => {
    if (prefersReducedMotion) {
      return { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } };
    }
    return {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 } },
    };
  };

  const getRightSlideVariant = () => {
    if (prefersReducedMotion) {
      return { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } };
    }
    return {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 } },
    };
  };

  const getIconVariant = () => {
    if (prefersReducedMotion) {
      return { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } };
    }
    return {
      hidden: { opacity: 0, scale: 0.5 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.3 } },
    };
  };

  return (
    <section className="fj-section" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <div className="fj-container">
        
        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={getContainerVariant()}
          className="grid-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: "40px" }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={getCardVariant()}
              style={{ background: "var(--surface)", padding: "24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            >
              <motion.div
                variants={getIconVariant()}
                whileHover={!prefersReducedMotion ? { scale: 1.1, rotate: 5 } : {}}
                style={{ width: "48px", height: "48px", background: "var(--lime)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "box-shadow 0.2s" }}
              >
                <stat.icon size={24} color="#000" />
              </motion.div>
              <strong style={{ fontSize: "2rem", fontWeight: "900", lineHeight: "1" }}>{stat.value}</strong>
              <span style={{ color: "var(--muted)", fontWeight: "600" }}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Feedback CTA Banner */}
        <div style={{ marginTop: "72px" }}>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={getCardVariant()}
            className="feedback-banner"
            style={{ 
              background: "var(--surface-strong)", 
              padding: "var(--banner-padding, 64px 80px)", 
              borderRadius: "var(--radius-lg)", 
              border: "1px solid var(--line)", 
              boxShadow: "var(--soft-shadow)",
              display: "flex", 
              flexDirection: "row", 
              alignItems: "center", 
              justifyContent: "space-between", 
              gap: "32px",
              flexWrap: "wrap",
              minHeight: "220px"
            }}
          >
            <div style={{ flex: "1 1 450px", textAlign: "left" }}>
              <h3 style={{ fontSize: "2rem", marginBottom: "14px", fontWeight: "900", lineHeight: "1.2" }}>
                How was our <span className="heading-mark">service?</span>
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "1.15rem", lineHeight: "1.7", margin: 0, maxWidth: "550px" }}>
                Let us know how satisfied you are with 9Jobs' hiring process. Your experience helps us fine-tune our recruitment and support services.
              </p>
            </div>
            <div style={{ flexShrink: 0, width: "var(--btn-wrapper-width, auto)" }}>
              <Link href="/client-service-feedback" passHref legacyBehavior>
                <motion.a 
                  whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}} 
                  whileTap={!prefersReducedMotion ? { scale: 0.95 } : {}} 
                  className="fj-button fj-button--dark"
                  style={{ display: "inline-flex", whiteSpace: "var(--btn-whitespace, nowrap)", padding: "16px 36px", fontSize: "1rem", fontWeight: "700", border: "none", width: "var(--btn-width, auto)", justifyContent: "center", textAlign: "center" }}
                >
                  Share Service Experience
                </motion.a>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
