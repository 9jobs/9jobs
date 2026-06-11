import Link from "next/link";
import { ArrowRight, Briefcase, FileText, MessageCircle, SearchCheck, UserCheck } from "lucide-react";
import { CalendlyLink } from "../../components/CalendlyWidget";

export const metadata = {
  title: "Career Services Australia | Resume, LinkedIn & Job Support | 9Jobs",
  description: "Explore 9Jobs career services for Australian job seekers, including resume writing, LinkedIn optimization, SEEK profile optimization, interview coaching, and job application support.",
  alternates: {
    canonical: "https://9jobs.co/services",
  },
};

const services = [
  {
    title: "Resume Writing",
    href: "/services/resume-writing",
    description: "ATS-friendly resume writing tailored to Australian hiring systems and recruiter expectations.",
    icon: FileText,
  },
  {
    title: "LinkedIn Optimization",
    href: "/services/linkedin-optimization",
    description: "Profile copy, keywords, and settings that help Australian recruiters find and trust your profile.",
    icon: SearchCheck,
  },
  {
    title: "SEEK Profile Optimization",
    href: "/services/seek-profile-optimization",
    description: "SEEK summary, visibility, and profile settings configured for local candidate searches.",
    icon: UserCheck,
  },
  {
    title: "Job Application Support",
    href: "/services/job-application-automation",
    description: "Done-for-you job sourcing and application support to keep your pipeline moving consistently.",
    icon: Briefcase,
  },
  {
    title: "Interview Coaching",
    href: "/services/interview-coaching",
    description: "Mock interview preparation, STAR response coaching, and offer-stage confidence building.",
    icon: MessageCircle,
  },
];

function jsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://9jobs.co/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://9jobs.co/services"
      }
    ]
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "9Jobs Career Services",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://9jobs.co${service.href}`,
      "name": service.title
    }))
  };

  return (
    <main className="site-main fj-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(itemListSchema) }}
      />

      <section className="fj-page-hero">
        <div className="fj-container">
          <nav className="fj-breadcrumbs" aria-label="Breadcrumb" style={{ marginBottom: "24px", display: "flex", gap: "8px", alignItems: "center", fontSize: "0.88rem", color: "var(--fj-muted)", fontWeight: 600 }}>
            <Link href="/" style={{ color: "inherit" }}>Home</Link>
            <span>&gt;</span>
            <span style={{ color: "var(--fj-ink)", fontWeight: 800 }}>Services</span>
          </nav>
          <span className="fj-announcement"><span>Services</span> Career support for Australia</span>
          <h1>Career Services for Australian Job Seekers</h1>
          <p>Choose focused support for your resume, LinkedIn profile, SEEK profile, applications, and interview preparation.</p>
          <div className="fj-actions">
            <Link className="fj-button fj-button--ghost" href="/pricing">View plans</Link>
            <CalendlyLink className="fj-button fj-button--dark">Book a call</CalendlyLink>
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">What we help with</span>
            <h2>Practical support across the full job search</h2>
            <p>Each service links to a dedicated page with detailed process, FAQs, and Australian market context.</p>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="fj-feature-card" key={service.href}>
                  <div className="fj-icon-chip"><Icon size={22} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href={service.href} className="fj-button fj-button--ghost" style={{ marginTop: "auto", minHeight: "40px", fontSize: "0.82rem" }}>
                    Learn more <ArrowRight size={14} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
