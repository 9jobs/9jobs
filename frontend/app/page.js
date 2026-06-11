import Image from "next/image";
import Link from "next/link";
import Testimonials from "../components/Testimonials";
import InterviewExperiences from "../components/InterviewExperiences";
import FeedbackStats from "../components/FeedbackStats";
import { CalendlyLink } from "../components/CalendlyWidget";
import { cities } from "../data/australianJobsData";
import {
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gauge,
  Layers3,
  MailCheck,
  SearchCheck,
  Sparkles,
  Star,
  Target,
  UsersRound,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

const trustedBrands = ["bluebird", "Galaxy", "berry", "Chameleon", "SHIP4450"];
const homepageTitle = "9Jobs Australia | Resume Writing & Job Application Help";
const homepageDescription = "Get more interviews with 9Jobs Australia: ATS resume writing, LinkedIn and SEEK profile optimization, job application support, and interview coaching.";
const homepageUrl = "https://9jobs.co/";

export const metadata = {
  title: homepageTitle,
  description: homepageDescription,
  alternates: {
    canonical: new URL("https://9jobs.co/"),
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: homepageUrl,
    siteName: "9Jobs",
    images: [
      {
        url: "/dashboard.png",
        width: 1200,
        height: 630,
        alt: "9Jobs career support dashboard for Australian job seekers",
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

const candidates = [
  ["David Wilson", "Founder & CEO", "$200,000", "Pending", "DW"],
  ["Jessica Hayes", "Co-founder & CFO", "$200,000", "Pending", "JH"],
  ["Constanza Perez", "Head of Product", "$150,000", "Pending", "CP"],
  ["Meera Desai", "Head of Engineering", "$170,000", "Pending", "MD"],
  ["Benjamin Weber", "Backend Engineer", "$120,000", "Pending", "BW"],
  ["Jacob Jones", "Frontend Engineer", "$120,000", "Pending", "JJ"],
];

const featureCards = [
  {
    icon: Target,
    eyebrow: "Resume & Profiles",
    title: "ATS-friendly optimization",
    badge: "New!",
    text: "Get a professionally written, ATS-friendly resume and optimized profiles on LinkedIn, SEEK, and Jora.",
  },
  {
    icon: UsersRound,
    eyebrow: "Applications",
    title: "Done-for-you applications",
    text: "We identify matching roles in Australia and submit job applications on your behalf.",
  },
  {
    icon: ClipboardCheck,
    eyebrow: "Interviews",
    title: "Interview notification & prep",
    text: "Receive real-time notifications for interviews and target-specific prep support to secure offers.",
  },
];

const pipelineItems = [
  ["SEEK & Jora Optimization", "Optimize your SEEK and Jora profiles to capture attention from Australian recruiters.", Briefcase],
  ["LinkedIn Optimization", "Optimized profiles present a strong and consistent professional brand.", SearchCheck],
  ["Resume Review & Editing", "Get an ATS-friendly resume optimized with high-impact industry keywords.", FileText],
  ["Australian Market Focus", "All content is aligned with Australian hiring practices and employer expectations.", Gauge],
];

const growthItems = [
  ["Profile optimization", "Enhance your LinkedIn, SEEK, and Jora profiles to stand out to recruiters."],
  ["ATS-ready resumes", "Get custom, ATS-friendly resumes written specifically for Australian hiring systems."],
  ["Automated applications", "We actively search and apply for matching roles on your behalf."],
  ["Interview preparation", "Access targeted coaching and feedback to secure job offers."],
];

const plans = [
  ["Startups", "Learn about the Remote platform and services."],
  ["Mid-size", "See our standard pricing and get a customized quote."],
  ["Enterprise", "See our standard pricing and get a customized quote."],
];

const faqs = [
  [
    "What is 9Jobs?",
    "9Jobs is an Australia-focused career support service for job seekers who want help with ATS resume writing, LinkedIn optimization, SEEK profile optimization, job applications, and interview preparation. The service is built for candidates targeting roles across Australian cities and industries.",
  ],
  [
    "Is 9Jobs the same as Nine Careers or a job board?",
    "No. 9Jobs is not Nine Careers and it is not a generic job board. 9Jobs provides resume writing, profile optimization, application support, and interview coaching for Australian job seekers, while Nine Careers is a separate employer careers site.",
  ],
  [
    "Does 9Jobs apply for jobs for me?",
    "Yes. Depending on your plan, 9Jobs can help identify suitable roles, improve your resume and online profiles, submit applications, and organize your job search pipeline so you can focus on interview preparation and follow-ups.",
  ],
  [
    "Which 9Jobs service helps improve interview callbacks?",
    "The strongest results usually come from combining ATS resume writing, LinkedIn optimization, SEEK profile optimization, and job application support. This gives recruiters consistent information across your resume, LinkedIn, SEEK, and application forms.",
  ],
  [
    "Do you help candidates apply for jobs in Australia?",
    "Yes. 9Jobs supports Australia-focused job searches with resume improvement, LinkedIn optimization, role targeting, applications, and follow-up organization.",
  ],
  [
    "Which types of roles do you support?",
    "We support IT and non-IT roles, including software, data, cloud, QA, sales, finance, admin, HR, operations, and customer-facing positions.",
  ],
  [
    "Do you guarantee a job placement?",
    "No service can honestly guarantee employer selection. We improve your profile quality, application consistency, and interview readiness so you can compete more professionally.",
  ],
  [
    "Can you make my resume suitable for Australian employers?",
    "Yes. We review structure, keywords, achievements, clarity, and ATS readability so your resume is easier for Australian recruiters to scan.",
  ],
  [
    "How does the demo or contact request work?",
    "Send your details through the contact form and tell us your goal. The team will reply with the next steps for resume support, LinkedIn help, applications, or a full platform demo.",
  ],
];

const popularCities = [
  { name: "Melbourne", href: "/jobs/melbourne", desc: "Access premium roles, ATS resume support, and career sourcing across Melbourne VIC." },
  { name: "Sydney", href: "/jobs/sydney", desc: "Target top executive, financial, and tech opportunities in Sydney NSW." },
  { name: "Brisbane", href: "/jobs/brisbane", desc: "Discover active vacancies and localized recruiter networks in Brisbane QLD." },
  { name: "Perth", href: "/jobs/perth", desc: "Connect with mining, engineering, and professional career hubs in Perth WA." },
  { name: "Adelaide", href: "/jobs/adelaide", desc: "Position your profile for defense, space, and tech positions in Adelaide SA." },
  { name: "Geelong", href: "/jobs/geelong", desc: "Find regional government, NDIS, and insurance roles in Geelong VIC." },
  { name: "Victoria", href: "/jobs/vic", desc: "Expand your career search across regional Victoria and agricultural hubs." }
];

function DashboardPreview() {
  return (
    <div className="fj-dashboard">
      <div className="fj-dashboard-sidebar">
        <span className="fj-brand-mark fj-brand-mark--small" aria-hidden="true">
          <span />
          <span />
        </span>
        {[UsersRound, Briefcase, Gauge, Sparkles].map((Icon) => (
          <span className="fj-dashboard-icon" key={Icon.displayName || Icon.name}>
            <Icon size={19} />
          </span>
        ))}
      </div>
      <div className="fj-dashboard-main">
        <div className="fj-dashboard-top">
          <div>
            <p className="fj-dashboard-title">Good morning, Jessica!</p>
            <div className="fj-dashboard-filters">
              <span>Team <strong>All</strong></span>
              <span>Status <strong>Pending</strong></span>
            </div>
          </div>
          <div className="fj-dashboard-actions">
            <span><Sparkles size={18} /></span>
            <span><Bell size={18} /></span>
          </div>
        </div>
        <div className="fj-table">
          <div className="fj-table-head">
            <span>Users</span>
            <span>Role</span>
            <span>Status</span>
            <span>Amount</span>
            <span>Team</span>
          </div>
          {candidates.map(([name, role, amount, status, initials], index) => (
            <div className="fj-table-row" key={name}>
              <span className="fj-user-cell">
                <span className={index < 2 ? "fj-check is-active" : "fj-check"}>{index < 2 && <Check size={15} />}</span>
                <span className="fj-avatar">{initials}</span>
                {name}
              </span>
              <span>
                {role}
                {role.includes("Product") && <em>Product</em>}
                {role.includes("Engineer") && <em className="is-lime">Tech</em>}
              </span>
              <span><mark>{status}</mark></span>
              <span>{amount}</span>
              <span className="fj-team-bubbles">
                <i>AS</i><i>MB</i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function jsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a
      }
    }))
  };

  return (
    <main className="site-main fj-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }}
      />
      <section className="fj-hero">
        <div className="fj-hero-doodle" aria-hidden="true">
          <Image src="/framer/app-icon.svg" alt="9Jobs smarter job application automation tool" width={360} height={360} priority />
        </div>
        <div className="fj-container fj-hero-inner">
          <Link className="fj-announcement" href="/features">
            <span>New</span>
            Announcing our Job Applying Automation Tool
            <ArrowRight size={24} />
          </Link>
          <h1>9Jobs – Job Search, Resume Writing & <span className="heading-mark">Career Support Australia</span></h1>
          <p>We optimize your resume, LinkedIn, SEEK and Jora profiles, apply for jobs on your behalf, and help you secure interviews and job offers.</p>
          <div className="fj-actions">
            <Link className="fj-button fj-button--ghost" href="/pricing">1 day trial</Link>
            <CalendlyLink className="fj-button fj-button--dark">Get a demo</CalendlyLink>
          </div>
        </div>

        <div className="fj-container fj-hero-dashboard">
          <DashboardPreview />
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
            <span className="fj-label">9Jobs services</span>
            <h2>Choose the support that moves your search <span className="heading-mark">forward</span></h2>
            <p>Targeted help for your resume, LinkedIn, SEEK, applications, and interviews.</p>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            <article className="fj-feature-card">
              <h3>Resume Writing Australia</h3>
              <p>ATS-friendly resumes written for Australian recruiter expectations, local keywords, and clear achievement-led scanning.</p>
              <Link href="/services/resume-writing">Resume writing <ArrowRight size={16} /></Link>
            </article>
            <article className="fj-feature-card">
              <h3>LinkedIn Optimization</h3>
              <p>Profile headlines, summaries, skills, and experience sections aligned with LinkedIn Recruiter search behavior.</p>
              <Link href="/services/linkedin-optimization">LinkedIn optimization <ArrowRight size={16} /></Link>
            </article>
            <article className="fj-feature-card">
              <h3>SEEK Profile Optimization</h3>
              <p>SEEK summaries, target titles, skills, and visibility settings configured for Australian candidate searches.</p>
              <Link href="/services/seek-profile-optimization">SEEK profile optimization <ArrowRight size={16} /></Link>
            </article>
            <article className="fj-feature-card">
              <h3>Job Application Support</h3>
              <p>Structured job sourcing and application support to keep your role pipeline active across SEEK, LinkedIn, and Jora.</p>
              <Link href="/services/job-application-automation">Job application support <ArrowRight size={16} /></Link>
            </article>
            <article className="fj-feature-card">
              <h3>Interview Coaching</h3>
              <p>Mock interview practice, STAR answer coaching, and interview follow-up support for Australian hiring processes.</p>
              <Link href="/services/interview-coaching">Interview coaching <ArrowRight size={16} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container">
          <div className="fj-section-head fj-section-head--split">
            <h2>Everything you need, all in one <span className="heading-mark">place</span></h2>
            <CalendlyLink className="fj-button fj-button--dark">
              Get a demo <ArrowRight size={17} />
            </CalendlyLink>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <article className="fj-feature-card" key={item.title}>
                  <div className="fj-card-eyebrow"><Icon size={19} /> {item.eyebrow}</div>
                  <h3>{item.title} {item.badge && <span>{item.badge}</span>}</h3>
                  <p>{item.text}</p>
                  <Link href="/features">Learn more <ArrowRight size={16} /></Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container fj-split">
          <div className="fj-activity-card">
            <div className="fj-activity-top">
              <span className="fj-brand-mark fj-brand-mark--small" aria-hidden="true"><span /><span /></span>
              <CalendlyLink className="fj-button fj-button--dark">Generate report</CalendlyLink>
            </div>
            {[
              ["Alex Marshall", "optimized their resume"],
              ["Sophia R.", "updated LinkedIn & SEEK"],
              ["Alex Marshall", "applied to 12 jobs"],
              ["Nadia Thompson", "scheduled an interview"],
            ].map(([name, action]) => (
              <div className="fj-activity-row" key={`${name}-${action}`}>
                <span className="fj-avatar">{name.slice(0, 2)}</span>
                <p><strong>{name}</strong> {action}</p>
              </div>
            ))}
          </div>

          <div className="fj-copy-block">
            <span className="fj-label">real-time updates</span>
            <h2>Empowering your jobs <span className="heading-mark">pipeline</span></h2>
            <div className="fj-list-grid">
              {pipelineItems.map(([title, text, Icon]) => (
                <div className="fj-mini-item" key={title}>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container fj-split fj-split--reverse">
          <div className="fj-copy-block">
            <span className="fj-label">growth at every level</span>
            <h2>Optimized for the Australian Job <span className="heading-mark">Market</span></h2>
            <div className="fj-list-grid">
              {growthItems.map(([title, text]) => (
                <div className="fj-mini-item" key={title}>
                  <CheckCircle2 size={22} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="fj-role-card">
            {["Software Developer", "Lead Software Developer", "Product Owner"].map((role, index) => (
              <div className="fj-role-row" key={role}>
                <span>{role}</span>
                <strong>{index === 1 ? 8 : index === 2 ? 5 : 6}</strong>
              </div>
            ))}
            {["ATS Resume Drafted", "LinkedIn & SEEK Optimized", "Daily Job Applications Sent", "Interview Scheduled"].map((task, index) => (
              <div className="fj-task-row" key={task}>
                <CheckCircle2 size={18} />
                <span>{task}</span>
                {index > 1 && <em>Optional</em>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--dark">
        <div className="fj-container fj-split">
          <div className="fj-copy-block">
            <h2>Less stress, more interview <span className="heading-mark">calls</span></h2>
            <p>We integrate seamlessly with the tools you already use. Apply smarter with 9Jobs.</p>
            <Link className="fj-link-light" href="/features">See all integrations <ArrowRight size={17} /></Link>
          </div>
          <div className="fj-integration-grid">
            {["LinkedIn", "Gmail", "Calendar", "Indeed", "Seek", "Resume"].map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container fj-split">
          <div className="fj-ai-card">
            <div className="fj-ai-search">
              <Bot size={22} />
              <span>New job found</span>
            </div>
            <div className="fj-ai-note">
              <span>CV recognition</span>
              <strong>Analyse experience in Area</strong>
              <p>Yes, Chris has 3 years of experience in SaaS for Healthcare.</p>
            </div>
            <div className="fj-ai-note">
              <span>Compatibility</span>
              <strong>Masters in Computer Science</strong>
              <p>2 years working on healthcare and improving leadership skills.</p>
            </div>
          </div>
          <div className="fj-copy-block">
            <h2>Make actionable decisions <span className="heading-mark">simpler</span></h2>
            <p>Focus on what matters. Let us handle the busywork while you build better relationships.</p>
            <CalendlyLink className="fj-button fj-button--dark">Get a demo</CalendlyLink>
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <h2>A plan for anyone. <span className="heading-mark">Anytime.</span></h2>
            <p>We help you get your dream job.</p>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            {plans.map(([name, text]) => (
              <article className="fj-plan-card" key={name}>
                <h3>{name}</h3>
                <p>{text}</p>
                <Link href="/pricing">Learn more <ArrowRight size={16} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container fj-leader-card">
          <div>
            <h2>9Jobs is your job search partner in <span className="heading-mark">Australia</span></h2>
            <p>We manage your job search end-to-end: resume optimization, profile updates, and active applications.</p>
          </div>
          <div className="fj-leader-media">
            <Image src="/framer/story-ops.jpg" alt="9Jobs candidate workflow" width={900} height={600} />
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">Australian Opportunities</span>
            <h2>Explore Australian Job <span className="heading-mark">Opportunities</span></h2>
            <p>Target localized markets across Australia&apos;s major cities and regional centers with tailored application strategies.</p>
          </div>
          
          <div className="cities-marquee-wrapper">
            <div className="cities-marquee-track">
              {[...Object.values(cities), ...Object.values(cities)].map((city, idx) => (
                <article className="fj-city-card" key={`${city.slug}-${idx}`}>
                  <h3>{city.name}</h3>
                  <p>{city.description}</p>
                  <Link
                    href={`/jobs/${city.slug}`}
                    className="fj-button fj-button--ghost"
                  >
                    Explore {city.name} <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">Job Sourcing</span>
            <h2>Find Jobs Across <span className="heading-mark">Australia</span></h2>
            <p>Direct access to our dedicated, local career search landing pages in every major city and state region.</p>
          </div>
          <div className="fj-card-grid fj-card-grid--three" style={{ marginTop: "40px" }}>
            {popularCities.map((city) => (
              <article className="fj-feature-card" key={city.name} style={{ minHeight: "220px", display: "flex", flexDirection: "column" }}>
                <h3>{city.name}</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--fj-muted)", margin: "10px 0 20px" }}>{city.desc}</p>
                <Link href={city.href} className="fj-button fj-button--ghost" style={{ marginTop: "auto", minHeight: "44px", fontSize: "0.85rem" }}>
                  Jobs in {city.name} <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FeedbackStats />

      <Testimonials />

      <section className="fj-section fj-section--muted" id="faqs">
        <div className="fj-container fj-faq-grid">
          <div className="fj-faq-intro">
            <span className="fj-label">FAQs</span>
            <h2>Questions before you start with <span className="heading-mark">9Jobs.</span></h2>
            <p>Clear answers for candidates who want a more organized, Australia-ready job search.</p>
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

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <span>Automate with 9Jobs</span>
          <h2>Start for free <span className="heading-mark">today.</span></h2>
          <div className="fj-actions">
            <Link className="fj-button fj-button--ghost" href="/pricing">1 day trial</Link>
            <CalendlyLink className="fj-button fj-button--dark">Schedule a demo</CalendlyLink>
          </div>
        </div>
      </section>
    </main>
  );
}
