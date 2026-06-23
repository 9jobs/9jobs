import { Star, CalendarCheck, ShieldCheck, UsersRound } from "lucide-react";
import Link from "next/link";

export default function FeedbackStats() {
  const stats = [
    { value: "4.8/5", label: "Average Client Rating", icon: Star },
    { value: "1,200+", label: "Interviews Arranged", icon: CalendarCheck },
    { value: "450+", label: "Successful Placements", icon: ShieldCheck },
    { value: "92%", label: "Repeat Clients", icon: UsersRound },
  ];

  return (
    <section className="fj-section" style={{ paddingTop: "20px", paddingBottom: "20px" }}>
      <div className="fj-container">
        <div
          className="grid-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginBottom: "40px" }}
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="fj-stat-card"
              style={{ background: "var(--surface)", padding: "24px", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            >
              <div
                className="fj-stat-icon"
                style={{ width: "48px", height: "48px", background: "var(--lime)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <stat.icon size={24} color="#000" />
              </div>
              <strong className="fj-stat-value" style={{ fontSize: "2rem", fontWeight: "900", lineHeight: "1" }}>{stat.value}</strong>
              <span style={{ color: "var(--muted)", fontWeight: "600" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "72px" }}>
          <div
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
                Let us know how satisfied you are with 9Jobs&apos; hiring process. Your experience helps us fine-tune our recruitment and support services.
              </p>
            </div>
            <div style={{ flexShrink: 0, width: "var(--btn-wrapper-width, auto)" }}>
              <Link
                href="/client-service-feedback"
                className="fj-button fj-button--dark"
                style={{ display: "inline-flex", whiteSpace: "var(--btn-whitespace, nowrap)", padding: "16px 36px", fontSize: "1rem", fontWeight: "700", border: "none", width: "var(--btn-width, auto)", justifyContent: "center", textAlign: "center" }}
              >
                Share Service Experience
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
