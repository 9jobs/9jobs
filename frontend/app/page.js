import Image from "next/image";
import Link from "next/link";
import Testimonials from "../components/Testimonials";
import InterviewExperiences from "../components/InterviewExperiences";
import FeedbackStats from "../components/FeedbackStats";
import { CalendlyLink } from "../components/CalendlyWidget";
import { cities } from "../data/australianJobsData";
import {
  JsonLd,
  createBreadcrumbSchema,
  createFaqSchema,
} from "../data/seo";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  FileText,
  SearchCheck,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";

const homepageTitle = "9 Jobs Australia | 9jobs Resume Writing & Job Application Services";
const homepageDescription =
  "9jobs, also known as 9 Jobs, helps Australian professionals with Resume Writing Australia, LinkedIn Optimization, ATS Resume support, and Job Application Services.";
const homepageUrl = "https://9jobs.co/";

export const metadata = {
  title: homepageTitle,
  description: homepageDescription,
  keywords: [
    "9jobs",
    "9 Jobs",
    "9Jobs",
    "9jobs.co",
    "9 jobs australia",
    "Resume Writing Australia",
    "LinkedIn Optimization",
    "Job Application Services",
    "ATS Resume",
    "Australia Jobs",
  ],
  alternates: {
    canonical: new URL("https://9jobs.co/"),
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: homepageUrl,
    siteName: "9jobs",
    images: [
      {
        url: "/dashboard.png",
        width: 1200,
        height: 630,
        alt: "9jobs career support dashboard for Australian job seekers",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: ["/dashboard.png"],
  },
};

const trustedBrands = ["bluebird", "Galaxy", "berry", "Chameleon", "SHIP4450"];

const serviceCards = [
  {
    title: "Resume Writing Australia",
    text: "Achievement-led ATS Resume writing built for Australian recruiters, hiring managers, and application portals.",
    href: "/services/resume-writing",
    icon: FileText,
  },
  {
    title: "LinkedIn Optimization",
    text: "Sharper profile headlines, About copy, skills, and role positioning for recruiter discovery.",
    href: "/services/linkedin-optimization",
    icon: SearchCheck,
  },
  {
    title: "Job Application Services",
    text: "Role targeting, shortlist support, and structured applications across leading Australia Jobs channels.",
    href: "/services/job-application-automation",
    icon: Briefcase,
  },
];

const brandSignals = [
  ["9jobs and 9 Jobs are the same brand", "We use both versions naturally across the site so Google can consolidate entity understanding around 9jobs.co.", ShieldCheck],
  ["Australia Jobs support with clear positioning", "Service copy aligns job search intent with candidate support, not generic job board messaging.", Target],
  ["Candidate-first career support", "The site explains how resumes, LinkedIn, and applications connect to interviews and outcomes.", UsersRound],
];

const internalLinks = [
  { href: "/9-jobs", label: "9 Jobs" },
  { href: "/jobs", label: "9jobs Australia" },
  { href: "/services/resume-writing", label: "9 Jobs Resume Service" },
  { href: "/about", label: "9 Jobs Career Support" },
  { href: "/services/linkedin-optimization", label: "LinkedIn Optimization" },
  { href: "/services/seek-profile-optimization", label: "SEEK Profile Optimization" },
  { href: "/services/job-application-automation", label: "Job Application Services" },
  { href: "/services/interview-coaching", label: "Interview Coaching" },
];

const faqs = [
  [
    "What is 9Jobs?",
    "9jobs is an Australian career support brand that helps professionals improve resumes, optimize LinkedIn profiles, strengthen ATS Resume performance, and manage job applications more strategically.",
  ],
  [
    "What is 9 Jobs?",
    "9 Jobs is the spaced version of the 9jobs brand name. Both refer to the same business and the same website, 9jobs.co.",
  ],
  [
    "Is 9 Jobs Australia a recruitment agency?",
    "No. 9 Jobs Australia is not a recruitment agency. It is a career support service that helps candidates improve documents, profiles, and application quality.",
  ],
  [
    "How does 9 Jobs work?",
    "9 Jobs reviews your career goals, improves your resume and profiles, supports applications, and helps you stay interview-ready for Australian employers.",
  ],
  [
    "Does 9 Jobs help with resumes?",
    "Yes. 9jobs provides Resume Writing Australia support with ATS Resume structure, keyword strategy, and recruiter-friendly formatting.",
  ],
  [
    "Does 9jobs offer LinkedIn Optimization?",
    "Yes. LinkedIn Optimization is one of the core services, covering headline, About section, skills, and recruiter-facing profile positioning.",
  ],
  [
    "Does 9jobs help with Job Application Services?",
    "Yes. 9jobs supports Job Application Services through role targeting, shortlist management, and application workflow support.",
  ],
  [
    "Can 9jobs improve an ATS Resume?",
    "Yes. The service is designed to improve ATS Resume readability, keyword matching, and achievement clarity for Australian recruiters.",
  ],
  [
    "Who should use 9 Jobs Australia?",
    "Professionals across Australia who want stronger resumes, LinkedIn profiles, and job application outcomes can benefit from the service.",
  ],
  [
    "Does 9jobs support Australia Jobs outside major cities?",
    "Yes. 9jobs supports candidates targeting metro and regional Australia Jobs, including Melbourne, Sydney, Brisbane, Perth, Adelaide, Geelong, and Victoria-wide roles.",
  ],
  [
    "What makes 9jobs different from a job board?",
    "A job board lists vacancies. 9jobs focuses on improving the candidate side of the process with resumes, profiles, and application support.",
  ],
  [
    "Can 9 Jobs support career changers?",
    "Yes. 9 Jobs can help translate transferable experience into clearer resume and profile positioning for a new target role.",
  ],
  [
    "Does 9jobs work for IT and non-IT roles?",
    "Yes. 9jobs supports professionals across technical and non-technical roles with market-relevant career content.",
  ],
  [
    "Is Resume Writing Australia included in 9jobs support?",
    "Yes. Resume Writing Australia is one of the main service categories available through 9jobs.",
  ],
  [
    "How does 9jobs help with interviews?",
    "By improving resume clarity, profile consistency, and application targeting, 9jobs helps create stronger interview opportunities and preparation context.",
  ],
  [
    "Does 9jobs guarantee job placement?",
    "No. 9jobs does not guarantee placement. The service improves visibility, positioning, and application quality to increase interview potential.",
  ],
  [
    "Can I contact 9 Jobs directly from 9jobs.co?",
    "Yes. The official website for the 9jobs brand is 9jobs.co, where users can explore services and book a call.",
  ],
  [
    "Why does 9jobs mention 9 Jobs on the homepage?",
    "Because many users search the brand with a space. Using both forms helps users and search engines understand they refer to the same business.",
  ],
  [
    "Does 9jobs help with LinkedIn and resume consistency?",
    "Yes. 9jobs aligns LinkedIn Optimization with Resume Writing Australia so employers see a consistent professional story.",
  ],
  [
    "What should I do after visiting 9jobs.co?",
    "Start with the service pages, the dedicated 9 Jobs page, or the Australia Jobs hub to match your current career goal.",
  ],
];

export default function Home() {
  const breadcrumbSchema = createBreadcrumbSchema([{ name: "Home", path: "/" }]);
  const faqSchema = createFaqSchema(faqs);
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://9jobs.co/#webpage",
    "name": "9 Jobs Australia",
    "url": homepageUrl,
    "description": homepageDescription,
    "isPartOf": {
      "@id": "https://9jobs.co/#website",
    },
    "about": {
      "@id": "https://9jobs.co/#organization",
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": "https://9jobs.co/dashboard.png",
    },
  };

  return (
    <main className="site-main fj-page">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={webpageSchema} />

      <section className="fj-hero">
        <div className="fj-hero-doodle" aria-hidden="true">
          <Image src="/framer/app-icon.svg" alt="9jobs brand mark" width={360} height={360} priority />
        </div>
        <div className="fj-container fj-hero-inner">
          <Link className="fj-announcement" href="/9-jobs">
            <span>Brand</span>
            See how 9 Jobs and 9jobs connect
            <ArrowRight size={24} />
          </Link>
          <h1>
            9 Jobs Australia from <span className="heading-mark">9jobs career support</span>
          </h1>
          <p>
            9jobs helps professionals across Australia with Resume Writing Australia, LinkedIn Optimization,
            ATS Resume upgrades, and Job Application Services that support better interview outcomes.
          </p>
          <div className="fj-actions">
            <Link className="fj-button fj-button--ghost" href="/services">Explore services</Link>
            <CalendlyLink className="fj-button fj-button--dark">Get a strategy call</CalendlyLink>
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-trust">
          <p>Trusted by job seekers and professionals across Australia</p>
          <div className="fj-logo-row">
            {trustedBrands.map((brand) => <span key={brand}>{brand}</span>)}
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">Homepage SEO</span>
            <h2>Core services that explain the 9 Jobs brand clearly</h2>
            <p>
              This homepage uses semantic copy to connect 9jobs, 9 Jobs, and 9jobs.co while reinforcing
              Australia Jobs intent and candidate support outcomes.
            </p>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="fj-feature-card" key={card.href}>
                  <div className="fj-icon-chip"><Icon size={22} /></div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <Link href={card.href}>
                    Learn more <ArrowRight size={16} />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container fj-split">
          <div className="fj-copy-block">
            <span className="fj-label">Brand entity optimization</span>
            <h2>Why Google should understand 9jobs and 9 Jobs as one entity</h2>
            <p>
              9jobs is the brand name, 9 Jobs is the keyword variation, and 9jobs.co is the official site.
              Our homepage copy, Organization Schema, WebSite Schema, FAQ Schema, and internal links now align around that identity.
            </p>
            <p>
              Explore <Link href="/9-jobs">9 Jobs</Link>, <Link href="/jobs">9jobs Australia</Link>,{" "}
              <Link href="/services/resume-writing">9 Jobs Resume Service</Link>, and{" "}
              <Link href="/about">9 Jobs Career Support</Link>.
            </p>
          </div>
          <div className="fj-list-grid">
            {brandSignals.map(([title, text, Icon]) => (
              <div className="fj-mini-item" key={title}>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">Internal linking</span>
            <h2>Key pathways for brand and service discovery</h2>
            <p>
              These internal links reinforce brand equivalence while sending authority to the main commercial and informational pages.
            </p>
          </div>
          <div className="fj-chip-list">
            {internalLinks.map((link) => (
              <Link key={link.href + link.label} href={link.href}>
                <CheckCircle2 size={15} /> {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">Australia Jobs</span>
            <h2>Explore city pages that support localized search demand</h2>
            <p>
              City pages help 9jobs connect broad brand demand with local Australia Jobs intent and service relevance.
            </p>
          </div>
          <div className="fj-card-grid fj-card-grid--three" style={{ marginTop: "40px" }}>
            {Object.values(cities).slice(0, 6).map((city) => (
              <article className="fj-feature-card" key={city.slug}>
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                <Link href={`/jobs/${city.slug}`}>
                  Explore {city.name} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeedbackStats />
      <Testimonials />
      <InterviewExperiences />

      <section className="fj-section fj-section--muted" id="faqs">
        <div className="fj-container fj-faq-grid">
          <div className="fj-faq-intro">
            <span className="fj-label">FAQs</span>
            <h2>Questions searchers ask about 9 Jobs and 9jobs</h2>
            <p>These FAQs target brand variation, service intent, and trust-building questions.</p>
            <CalendlyLink className="fj-button fj-button--dark">
              Talk to us <ArrowRight size={17} />
            </CalendlyLink>
          </div>

          <div className="fj-faq-list">
            {faqs.map(([question, answer], index) => (
              <details className="fj-faq-item" key={question} open={index === 0}>
                <summary>
                  <span>{question}</span>
                  <ChevronDown size={20} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
