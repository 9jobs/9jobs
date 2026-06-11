"use client";

import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ExternalLink, Home, Star } from "lucide-react";

const successDescription =
  "Your feedback has been submitted successfully. We appreciate your partnership with 9Jobs and value your input in helping us improve our recruitment and staffing services.";

const socialDescription =
  "Visit and connect with us on Instagram, LinkedIn, and Facebook for hiring updates, recruitment insights, workforce solutions, career opportunities, and business growth tips.";

const websitePromoText =
  "Visit the official 9Jobs website to discover recruitment solutions, staffing services, employer resources, workforce management support, and career opportunities across Australia.";

const socialLinks = [
  {
    name: "Instagram",
    text: "Visit our Instagram",
    href: "https://www.instagram.com/9jobsau",
    icon: "instagram",
    className: "is-instagram",
  },
  {
    name: "LinkedIn",
    text: "Connect with us on LinkedIn",
    href: "https://www.linkedin.com/company/9jobs/",
    icon: "linkedin",
    className: "is-linkedin",
  },
  {
    name: "Facebook",
    text: "Follow us on Facebook",
    href: "https://www.facebook.com/profile.php?id=61589408708559",
    icon: "facebook",
    className: "is-facebook",
  },
];

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export default function ClientServiceFeedback() {
  const [submitted, setSubmitted] = useState(false);
  const [showAsTestimonial, setShowAsTestimonial] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const initialFormData = {
    full_name: "",
    overall_satisfaction: 0,
    experience_message: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.full_name.trim()) {
      setErrorMsg("Full Name is required.");
      return;
    }

    if (formData.overall_satisfaction === 0) {
      setErrorMsg("Please select an overall satisfaction rating.");
      return;
    }

    if (!formData.experience_message.trim()) {
      setErrorMsg("Experience message is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/client-service-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitted(true);
        setShowAsTestimonial(data.data?.show_as_testimonial || false);
        setFormData(initialFormData);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Failed to submit feedback. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <main className="site-main fj-page">
      <section className="fj-section">
        <div className="fj-container" style={{ maxWidth: "700px" }}>
          {!submitted && (
            <div className="fj-section-head center">
              <h2>Client Service Experience <span className="heading-mark">Feedback</span></h2>
              <p>Help us improve by rating your overall experience working with 9Jobs.</p>
            </div>
          )}

          <div 
            style={submitted ? { 
              display: "flex", 
              flexDirection: "column", 
              gap: "24px", 
              background: "linear-gradient(180deg, #ffffff 0%, #fbfdfc 100%)", 
              padding: "var(--form-padding, 40px)", 
              borderRadius: "var(--fj-radius-lg)", 
              border: "1px solid rgba(224, 255, 130, 0.7)", 
              boxShadow: "0 30px 70px rgba(3, 31, 42, 0.08), 0 0 50px rgba(224, 255, 130, 0.15)",
              position: "relative",
              overflow: "hidden"
            } : { 
              display: "flex", 
              flexDirection: "column", 
              gap: "24px", 
              background: "#fff", 
              padding: "var(--form-padding, 40px)", 
              borderRadius: "var(--radius-lg)", 
              border: "1px solid var(--line)", 
              boxShadow: "var(--soft-shadow)",
              animation: "feedback-success-fade 520ms ease both"
            }}
          >
            {submitted && (
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(90deg, var(--fj-lime), #4ade80, var(--fj-lime))"
              }} />
            )}
            {submitted ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "28px", textAlign: "center", animation: "floatUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
                {/* Custom Pulsing Glow Success Badge */}
                <div className="success-icon-wrapper">
                  <div className="success-pulse-ring ring-1"></div>
                  <div className="success-pulse-ring ring-2"></div>
                  <div className="success-icon-center">
                    <CheckCircle2 size={30} className="success-checkmark" aria-hidden="true" />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <h1 className="page-title" style={{ fontSize: "2.2rem", fontWeight: "900", color: "var(--fj-ink-deep)", margin: 0, letterSpacing: "-0.5px" }}>
                    Thank You for Your Feedback!
                  </h1>
                  <p className="lead" style={{ color: "var(--fj-muted)", fontSize: "1.08rem", lineHeight: "1.65", margin: 0, maxWidth: "580px" }}>
                    {successDescription}
                  </p>
                </div>

                {/* Refined Approval Notices */}
                {showAsTestimonial ? (
                  <div style={{
                    padding: "16px 24px",
                    background: "linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(224, 255, 130, 0.15))",
                    border: "1px solid rgba(74, 222, 128, 0.3)",
                    borderRadius: "18px",
                    color: "#15803d",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 4px 12px rgba(74, 222, 128, 0.05)"
                  }}>
                    <CheckCircle2 size={18} style={{ color: "#15803d" }} />
                    <span>Your feedback is live! It has been approved to appear on our home page.</span>
                  </div>
                ) : (
                  <div style={{
                    padding: "16px 24px",
                    background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(251, 191, 36, 0.12))",
                    border: "1px solid rgba(245, 158, 11, 0.25)",
                    borderRadius: "18px",
                    color: "#9a3412",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 4px 12px rgba(245, 158, 11, 0.05)"
                  }}>
                    <AlertCircle size={18} style={{ color: "#b45309" }} />
                    <span>Your review was submitted successfully and is pending a quick team approval.</span>
                  </div>
                )}

                {/* Actions Grid */}
                <div className="feedback-success-actions" style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "12px" }}>
                  <a href="https://9jobs.co" className="success-btn-primary" style={{ minWidth: "220px" }}>
                    <Home size={18} aria-hidden="true" />
                    Back to Home
                  </a>
                  <a href="https://9jobs.co/client-service-feedback" className="success-btn-secondary" style={{ minWidth: "220px" }}>
                    <Star size={18} aria-hidden="true" />
                    Leave Another Review
                  </a>
                </div>

                {/* Stay Connected Premium Grid */}
                <div style={{ borderTop: "1px solid var(--fj-line)", paddingTop: "32px", marginTop: "16px", textAlign: "left" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "var(--fj-ink-deep)", margin: "0 0 10px" }}>
                    Stay Connected with 9Jobs
                  </h2>
                  <p style={{ color: "var(--fj-muted)", fontSize: "0.96rem", lineHeight: "1.6", margin: "0 0 24px" }}>
                    {socialDescription}
                  </p>
                  
                  <div className="social-grid">
                    {socialLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`social-card ${link.className}`}
                      >
                        <span className="social-card-icon-wrapper">
                          <SocialIcon type={link.icon} />
                        </span>
                        <span style={{ fontWeight: "700", fontSize: "0.92rem", color: "var(--fj-ink)" }}>
                          {link.name}
                        </span>
                        <ExternalLink size={14} style={{ position: "absolute", top: "14px", right: "14px", opacity: 0.4 }} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {errorMsg && (
                  <div style={{ padding: "16px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                    <AlertCircle size={20} /> {errorMsg}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "700" }}>Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    name="full_name" 
                    placeholder="Enter your full name"
                    value={formData.full_name} 
                    onChange={handleChange} 
                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)" }} 
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "700" }}>Overall Satisfaction *</label>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    {stars.map((star) => {
                      const isFilled = hoveredRating ? star <= hoveredRating : star <= formData.overall_satisfaction;
                      return (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, overall_satisfaction: star })}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: "4px",
                            outline: "none"
                          }}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          <Star
                            size={32}
                            style={{
                              color: isFilled ? "#fbbf24" : "var(--line)",
                              fill: isFilled ? "#fbbf24" : "transparent",
                              transition: "all 0.15s ease",
                              transform: hoveredRating === star ? "scale(1.15)" : "scale(1)"
                            }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontWeight: "700" }}>Share Your Experience with 9Jobs *</label>
                  <textarea 
                    required 
                    name="experience_message" 
                    rows="5" 
                    placeholder="How has your experience been with our recruitment services, support, and candidate quality?"
                    value={formData.experience_message} 
                    onChange={handleChange} 
                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid var(--line)", fontFamily: "inherit", resize: "vertical" }} 
                  />
                </div>

                <button type="submit" disabled={loading} className="fj-button fj-button--dark" style={{ marginTop: "16px", alignSelf: "flex-start", cursor: loading ? "not-allowed" : "pointer", border: "none", fontFamily: "var(--font-heading)", opacity: loading ? 0.7 : 1 }}>
                  {loading ? "Submitting..." : "Submit Feedback"} {!loading && <ArrowRight size={18} style={{ marginLeft: "8px" }} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.12; }
          50% { transform: scale(1.15); opacity: 0.28; }
          100% { transform: scale(0.95); opacity: 0.12; }
        }
        @keyframes floatUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .success-icon-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .success-pulse-ring {
          position: absolute;
          border-radius: 50%;
          background: var(--fj-lime);
          width: 100%;
          height: 100%;
        }
        .ring-1 {
          animation: pulseGlow 2.4s infinite ease-in-out;
        }
        .ring-2 {
          width: 80%;
          height: 80%;
          opacity: 0.25;
          animation: pulseGlow 2.4s infinite ease-in-out 0.6s;
        }
        .success-icon-center {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--fj-ink-deep);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(3, 31, 42, 0.2);
        }
        .success-checkmark {
          color: var(--fj-lime);
        }
        
        .success-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--fj-ink);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 16px 28px;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(3, 31, 42, 0.15);
          border: none;
          cursor: pointer;
        }
        .success-btn-primary:hover {
          background: var(--fj-lime);
          color: var(--fj-ink);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(224, 255, 130, 0.3);
        }
        
        .success-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #ffffff;
          color: var(--fj-ink);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 16px 28px;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-decoration: none;
          border: 1px solid var(--fj-line);
          box-shadow: 0 2px 6px rgba(0,0,0,0.02);
          cursor: pointer;
        }
        .success-btn-secondary:hover {
          border-color: var(--fj-ink);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(3, 31, 42, 0.05);
        }

        .social-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 16px;
        }
        @media (max-width: 640px) {
          .social-grid {
            grid-template-columns: 1fr;
          }
        }
        .social-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 24px 16px;
          border: 1px solid var(--fj-line);
          border-radius: 20px;
          color: var(--fj-ink);
          text-decoration: none;
          background: #ffffff;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .social-card-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--fj-soft);
          color: var(--fj-ink);
          transition: all 0.3s ease;
        }
        
        .social-card.is-instagram:hover {
          border-color: #fccc63;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(251, 173, 80, 0.15);
        }
        .social-card.is-instagram:hover .social-card-icon-wrapper {
          background: linear-gradient(45deg, #fccc63, #fbad50, #cd486b, #4c68d7);
          color: #ffffff;
        }
        
        .social-card.is-linkedin:hover {
          border-color: #0077b5;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 119, 181, 0.15);
        }
        .social-card.is-linkedin:hover .social-card-icon-wrapper {
          background: #0077b5;
          color: #ffffff;
        }
        
        .social-card.is-facebook:hover {
          border-color: #1877f2;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(24, 119, 242, 0.15);
        }
        .social-card.is-facebook:hover .social-card-icon-wrapper {
          background: #1877f2;
          color: #ffffff;
        }
      `}</style>
    </main>
  );
}
