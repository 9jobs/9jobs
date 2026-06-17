"use client";

import { Quote, Star } from "lucide-react";
import { useState, useEffect } from "react";

const defaultTestimonials = [
  {
    name: "Nafisa",
    role: "Verified Client",
    quote: "Great experience with 9Jobs. The team is professional, responsive, and truly supportive. I highly recommend their services",
    rating: 4
  },
  {
    name: "Lachlan",
    role: "Verified Client",
    quote: "Honestly, the job application automation saved me so much time. I was struggling to find hours to apply while working full-time, but their team handled it seamlessly. Ended up getting three interview calls in two weeks.",
    rating: 5
  },
  {
    name: "Sarah",
    role: "Verified Client",
    quote: "My resume was completely overhauled to meet Australian ATS standards. The writers knew exactly what local recruiters look for. I saw a noticeable increase in responses from employers almost immediately after updating it.",
    rating: 5
  },
  {
    name: "Oliver",
    role: "Verified Client",
    quote: "Highly recommend their LinkedIn and Seek profile optimization services. They polished my profiles, added the right keywords, and made them look incredibly professional. I've had multiple recruiters reach out to me directly.",
    rating: 5
  },
  {
    name: "Amelia",
    role: "Verified Client",
    quote: "The interview coaching was a game-changer for me. The mock sessions gave me the confidence I needed to handle tough questions and present my experience effectively. Secured a great role last month.",
    rating: 5
  }
];

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [dbTestimonials, setDbTestimonials] = useState([]);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const res = await fetch(`/api/client-service-feedback?t=${Date.now()}`, {
          cache: 'no-store'
        });
        if (res.ok) {
          const result = await res.json();
          if (result.success && Array.isArray(result.data)) {
            // Only keep testimonials from Nafisa
            const filteredData = result.data.filter(item =>
              item.full_name && /Nafisa|Nafisha/i.test(item.full_name)
            );
            const mapped = filteredData.map(item => {
              let displayName = item.full_name || "Nafisa";
              // Remove Eqbali case-insensitively
              displayName = displayName.replace(/\s*Eqbali\s*/gi, "").trim();
              if (!displayName) displayName = "Nafisa";
              return {
                name: displayName,
                role: "Verified Client",
                quote: item.experience_message,
                rating: item.overall_satisfaction
              };
            });
            setDbTestimonials(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    }
    loadTestimonials();
  }, []);

  // Extract Nafisa from DB testimonials if present, otherwise use default Nafisa
  const defaultNafisa = defaultTestimonials.find(t => t.name === "Nafisa");
  const dbNafisa = dbTestimonials.find(t => /Nafisa/i.test(t.name));
  const nafisaToUse = dbNafisa || defaultNafisa;

  // Combine Nafisa with the rest of the default testimonials
  const otherDefaults = defaultTestimonials.filter(t => t.name !== "Nafisa");
  const listToUse = [nafisaToUse, ...otherDefaults];

  // Make sure we have at least 6 items in the list for smooth marquee scrolling without layout gaps
  let filledList = [...listToUse];
  while (filledList.length > 0 && filledList.length < 6) {
    filledList = [...filledList, ...listToUse];
  }

  const duplicatedTestimonials = [...filledList, ...filledList];

  return (
    <section className="fj-section" style={{ overflow: "hidden" }}>
      <div className="fj-container">
        <div className="fj-section-head" style={{ textAlign: "center", marginBottom: "64px" }}>
          <span className="fj-label" style={{ display: "block", marginBottom: "16px", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px", color: "var(--fj-muted)" }}>Testimonials</span>
          <h2 style={{ fontSize: "clamp(1rem, 3vw, 1.8rem)", fontWeight: 800, margin: 0, color: "var(--fj-ink)" }}>
            What people are <span className="heading-mark">saying.</span>
          </h2>
        </div>
        
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {duplicatedTestimonials.map((testimonial, idx) => (
              <article className="fj-feature-card" key={`${testimonial.name}-${idx}`} style={{ width: "var(--card-width, 400px)", flexShrink: 0, padding: "32px", display: "flex", flexDirection: "column", background: "#fff", border: "1px solid var(--fj-line)" }}>
                <div style={{ marginBottom: "24px" }}>
                  <Quote size={32} color="var(--fj-line)" strokeWidth={1.5} style={{ fill: "var(--fj-soft)", marginBottom: "16px" }} />
                  <p style={{ fontSize: "1.05rem", fontWeight: 500, color: "var(--fj-muted)", lineHeight: 1.7, margin: 0, textAlign: "left" }}>
                    {testimonial.quote}
                  </p>
                </div>
                
                <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid var(--fj-line)", display: "flex", alignItems: "center", gap: 14 }}>
                  <span className="fj-testimonial-avatar" aria-hidden="true">{getInitials(testimonial.name)}</span>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "0.95rem", color: "var(--fj-ink)", fontWeight: 700 }}>{testimonial.name}</strong>
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                           <Star key={i} size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "var(--fj-muted)" }}>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .marquee-wrapper {
            width: 100%;
            overflow: hidden;
            position: relative;
            padding: 10px 0;
          }
          .marquee-wrapper::before,
          .marquee-wrapper::after {
            content: "";
            position: absolute;
            top: 0;
            width: 150px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .marquee-wrapper::before {
            left: 0;
            background: linear-gradient(to right, var(--background), transparent);
          }
          .marquee-wrapper::after {
            right: 0;
            background: linear-gradient(to left, var(--background), transparent);
          }
          .marquee-track {
            display: flex;
            gap: var(--marquee-gap, 32px);
            width: max-content;
            animation: marquee 25s linear infinite;
            --card-width: 400px;
            --marquee-gap: 32px;
          }
          @media (max-width: 480px) {
            .marquee-track {
              --card-width: 290px;
              --marquee-gap: 16px;
            }
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
          .fj-testimonial-avatar {
            display: inline-flex;
            width: 44px;
            height: 44px;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--fj-line);
            border-radius: 50%;
            background: linear-gradient(135deg, #f7faf9, #eaff82);
            color: var(--fj-ink);
            font-size: 0.86rem;
            font-weight: 800;
          }
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - (var(--marquee-gap) / 2))); }
          }
        `}</style>
      </div>
    </section>
  );
}
