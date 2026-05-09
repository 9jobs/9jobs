import Link from "next/link";
import { FadeIn, FadeUp, Popup, Stagger, StaggerItem } from "../../components/Motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    summary: "For a focused first pass on your job search setup.",
    items: ["Resume direction", "Profile checklist", "Application priorities"],
    image:
      "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=900')",
  },
  {
    name: "Growth",
    price: "Custom",
    summary: "For candidates who want hands-on resume, LinkedIn, and application help.",
    items: ["Resume review", "LinkedIn optimization", "Application tracking", "Follow-up support"],
    highlighted: true,
    image:
      "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=900')",
  },
  {
    name: "Enterprise",
    price: "Team",
    summary: "For teams, agencies, and repeatable candidate support workflows.",
    items: ["Shared pipeline", "Reporting", "Team support", "Workflow setup"],
    dark: true,
    image:
      "url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=900')",
  },
];

export const metadata = {
  title: "Pricing | 9Jobs",
  description: "Choose a 9Jobs plan for resume, LinkedIn, application, and team support.",
};

export default function PricingPage() {
  return (
    <main className="site-main">
      <section className="page-hero">
        <div className="container">
          <FadeUp as="span" className="eyebrow">
            <span className="eyebrow-mark">Plans</span>
            Clear support for every stage
          </FadeUp>
          <FadeUp as="h1" className="page-title" style={{ marginTop: 24 }}>
            A plan for anyone. <span className="heading-mark">Anytime.</span>
          </FadeUp>
          <FadeIn as="p" className="lead">
            Start small, add hands-on support when you need it, or build a
            repeatable workflow for a team.
          </FadeIn>
        </div>
      </section>

      <section className="section section-tight">
        <Stagger className="container-wide grid-3">
          {plans.map((plan) => (
            <StaggerItem
              as="article"
              hover
              className={`price-card card${plan.dark ? " is-dark" : ""}`}
              key={plan.name}
              style={
                plan.dark
                  ? {
                      "--price-image":
                        "url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=900')",
                    }
                  : undefined
              }
            >
              {!plan.dark && (
                <FadeIn className="card-media" style={{ backgroundImage: plan.image }} />
              )}
              {plan.highlighted && (
                <span className="eyebrow-mark" style={{ marginBottom: 18 }}>
                  Popular
                </span>
              )}
              <h3>{plan.name}</h3>
              <p>{plan.summary}</p>
              <strong style={{ display: "block", fontSize: "2.4rem", marginBottom: 24 }}>
                {plan.price}
              </strong>
              <div style={{ display: "grid", gap: 12, marginBottom: 28 }}>
                {plan.items.map((item) => (
                  <span key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Check size={17} color={plan.dark ? "#d9ff5f" : "#6c8a00"} />
                    {item}
                  </span>
                ))}
              </div>
              <Link className={`btn ${plan.dark ? "btn-lime" : "btn-light"}`} href="/contact?intent=demo">
                Get started <ArrowRight size={17} />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section section-tight">
        <Popup className="container cta-panel">
          <span className="icon-chip" style={{ marginBottom: 18 }}>
            <Sparkles size={22} />
          </span>
          <p className="label">Need a custom setup</p>
          <FadeUp as="h2" className="section-title">Book a short demo and we will map the right <span className="heading-mark">flow.</span></FadeUp>
          <Link className="btn btn-dark" href="/contact?intent=demo">
            Schedule a demo
          </Link>
        </Popup>
      </section>
    </main>
  );
}
