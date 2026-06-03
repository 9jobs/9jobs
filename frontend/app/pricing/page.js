import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CalendlyLink } from "../../components/CalendlyWidget";
import PricingCheckoutButton from "../../components/PricingCheckoutButton";
import ResumePricingSection from "../../components/ResumePricingSection";

const plans = [
  {
    name: "Trial",
    price: "$25",
    period: "/ 1 day",
    summary: "Try the full 9Jobs experience for a day — perfect for a quick, focused job search sprint.",
    items: ["Full platform access", "Resume review", "Application support", "1-day support window"],
  },
  {
    name: "Non-IT",
    price: "$200",
    period: "/ week",
    summary: "Hands-on weekly support tailored for non-tech professionals ready to land their next role.",
    items: ["Resume & LinkedIn review", "Application tracking", "Job search strategy", "Follow-up support", "Weekly check-in"],
    highlighted: true,
  },
  {
    name: "IT",
    price: "$250",
    period: "/ week",
    summary: "Premium weekly support for tech professionals — from ATS-ready resumes to interview prep.",
    items: ["Tech resume optimization", "LinkedIn & GitHub review", "ATS keyword targeting", "Interview prep support", "Weekly check-in"],
    dark: true,
  },
];

export const metadata = {
  title: "Pricing | 9Jobs",
  description: "Choose a 9Jobs plan for resume, LinkedIn, application, and team support.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="site-main fj-page">
      <section className="fj-page-hero">
        <div className="fj-container">
          <span className="fj-announcement"><span>Plans</span> Clear support for every stage</span>
          <h1>A plan for anyone. <span className="heading-mark">Anytime.</span></h1>
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
              <strong>{plan.price}</strong>{plan.period && <span className="fj-price-period">{plan.period}</span>}
              <div className="fj-price-list">
                {plan.items.map((item) => (
                  <span key={item}><Check size={17} /> {item}</span>
                ))}
              </div>
              
              <div className="fj-pricing-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: 'auto' }}>
                <PricingCheckoutButton 
                  plan={plan} 
                  className={plan.dark ? "fj-button fj-button--lime" : "fj-button"}
                />
                <CalendlyLink className="fj-button fj-button--ghost">
                  Get a schedule <ArrowRight size={17} />
                </CalendlyLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ResumePricingSection />

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <Sparkles size={28} />
          <span>Need a custom setup</span>
          <h2>Book a short demo and we will map the right <span className="heading-mark">flow.</span></h2>
          <CalendlyLink className="fj-button fj-button--dark">
            Schedule a demo
          </CalendlyLink>
        </div>
      </section>
    </main>
  );
}
