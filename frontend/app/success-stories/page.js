"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Target, UsersRound, CalendarCheck, ShieldCheck } from "lucide-react";
import Testimonials from "../../components/Testimonials";
import InterviewExperiences from "../../components/InterviewExperiences";

const stats = [
  { value: "4.8/5", label: "Average Client Rating", icon: Star },
  { value: "1,200+", label: "Interviews Arranged", icon: CalendarCheck },
  { value: "450+", label: "Successful Placements", icon: ShieldCheck },
  { value: "92%", label: "Repeat Clients", icon: UsersRound }
];

export default function SuccessStories() {
  return (
    <main className="site-main fj-page">
      <section className="fj-hero" style={{ minHeight: "60vh", paddingBottom: "60px" }}>
        <div className="fj-container fj-hero-inner" style={{ paddingTop: "120px" }}>
          <h1>Client Success <span className="heading-mark">Stories</span></h1>
          <p>Discover how 9Jobs is transforming the hiring experience for businesses across Australia.</p>
        </div>
      </section>

      <section className="fj-section" style={{ paddingTop: "0" }}>
        <div className="fj-container">
          <div className="grid-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ background: "var(--surface)", padding: "32px", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "56px", height: "56px", background: "var(--lime)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <stat.icon size={28} />
                </div>
                <strong style={{ fontSize: "2.5rem", fontWeight: "900", lineHeight: "1" }}>{stat.value}</strong>
                <span style={{ color: "var(--muted)", fontWeight: "600" }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <h2>Featured <span className="heading-mark">Placements</span></h2>
            <p>Read about our recent successful candidate placements and client experiences.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }}>
            {[
              {
                client: "TechFlow Solutions",
                role: "Senior Full Stack Engineer",
                story: "We were struggling to find a developer who understood both Node.js and AWS infrastructure. 9Jobs not only sent us a curated list of top-tier candidates within 48 hours, but they also handled the initial technical screening. The candidate we hired has already optimized our backend, saving us 20% on cloud costs. We'll definitely use 9Jobs again.",
                rating: 5,
                image: "/framer/story-ops.jpg" // Using an existing placeholder
              },
              {
                client: "Bluebird Financial",
                role: "VP of Product",
                story: "Hiring for leadership is always tough. The 9Jobs team was incredibly professional and maintained consistent communication throughout the search. They arranged 5 high-quality interviews and the final placement exceeded our expectations. The platform made it so easy to track the pipeline.",
                rating: 5,
                image: "/framer/story-ops.jpg"
              }
            ].map((story, idx) => (
              <div key={idx} style={{ background: "#fff", borderRadius: "var(--radius-lg)", border: "1px solid var(--line)", overflow: "hidden", display: "flex", flexDirection: idx % 2 === 0 ? "row" : "row-reverse", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 300px", background: "var(--surface)", position: "relative", minHeight: "300px" }}>
                  <Image src={story.image} alt={story.client} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: "1 1 400px", padding: "48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} size={20} style={{ color: "var(--lime)", fill: "var(--lime)" }} />
                    ))}
                  </div>
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "8px" }}>{story.client}</h3>
                  <span style={{ display: "inline-block", background: "var(--surface-strong)", padding: "6px 12px", borderRadius: "99px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "24px", alignSelf: "flex-start" }}>Placed: {story.role}</span>
                  <p style={{ color: "var(--muted)", fontSize: "1.1rem", lineHeight: "1.6", fontStyle: "italic" }}>"{story.story}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We reuse the existing Testimonials component here */}
      <Testimonials />

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <span>Ready to hire?</span>
          <h2>Find your next <span className="heading-mark">star.</span></h2>
          <div className="fj-actions">
            <Link className="fj-button fj-button--dark" href="/pricing">View Pricing</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
