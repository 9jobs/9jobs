import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    summary: "For a focused first pass on your job search setup.",
    items: ["Resume direction", "Profile checklist", "Application priorities"],
  },
  {
    name: "Growth",
    price: "Custom",
    summary: "For candidates who want hands-on resume, LinkedIn, and application help.",
    items: ["Resume review", "LinkedIn optimization", "Application tracking", "Follow-up support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Team",
    summary: "For teams, agencies, and repeatable candidate support workflows.",
    items: ["Shared pipeline", "Reporting", "Team support", "Workflow setup"],
    dark: true,
  },
];

export const metadata = {
  title: "Pricing | 9Jobs",
  description: "Choose a 9Jobs plan for resume, LinkedIn, application, and team support.",
};

export default function PricingPage() {
  return (
    <main className="site-main fj-page">
      <section className="fj-page-hero">
        <div className="fj-container">
          <span className="fj-announcement"><span>Plans</span> Clear support for every stage</span>
          <h1>A plan for anyone. Anytime.</h1>
          <p>Start small, add hands-on support when you need it, or build a repeatable workflow for a team.</p>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-card-grid fj-card-grid--three">
          {plans.map((plan) => (
            <article className={plan.dark ? "fj-pricing-card is-dark" : "fj-pricing-card"} key={plan.name}>
              {plan.highlighted && <span className="fj-badge">Popular</span>}
              <h2>{plan.name}</h2>
              <p>{plan.summary}</p>
              <strong>{plan.price}</strong>
              <div className="fj-price-list">
                {plan.items.map((item) => (
                  <span key={item}><Check size={17} /> {item}</span>
                ))}
              </div>
              <Link className={plan.dark ? "fj-button fj-button--lime" : "fj-button fj-button--ghost"} href="/contact?intent=demo">
                Get started <ArrowRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <Sparkles size={28} />
          <span>Need a custom setup</span>
          <h2>Book a short demo and we will map the right flow.</h2>
          <Link className="fj-button fj-button--dark" href="/contact?intent=demo">
            Schedule a demo
          </Link>
        </div>
      </section>
    </main>
  );
}
