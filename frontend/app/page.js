import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
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
} from "lucide-react";

const trustedBrands = ["bluebird", "Galaxy", "berry", "Chameleon", "SHIP4450"];

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
    eyebrow: "Goals",
    title: "Goal management",
    badge: "New!",
    text: "See all the steps you need to draft goals, gather input, and drive your job search forward.",
  },
  {
    icon: UsersRound,
    eyebrow: "Target",
    title: "Real-time updates",
    text: "Drive focus and progress with real-time status updates across every role.",
  },
  {
    icon: ClipboardCheck,
    eyebrow: "Pipeline",
    title: "High-level customization",
    text: "Choose from pre-built pipeline templates, or create custom interview steps.",
  },
];

const pipelineItems = [
  ["Career Transition Support", "Automate and manage jobs processing with real-time updates.", Briefcase],
  ["LinkedIn Optimization", "Optimized profiles present a strong and consistent professional brand.", SearchCheck],
  ["Resume Review & Editing", "Track reviews, versions, and recruiter-ready edits with ease.", FileText],
  ["Market Focus", "All content is aligned with Australian hiring practices recruiters expect.", Gauge],
];

const growthItems = [
  ["Team alignment", "Foster collaboration with transparent role-based objectives."],
  ["Skills development", "Empower your team with tailored learning pathways."],
  ["Progress tracking", "Monitor individual and team advancement effortlessly."],
  ["Performance insights", "Gain actionable data to optimize team productivity."],
];

const plans = [
  ["Startups", "Learn about the Remote platform and services."],
  ["Mid-size", "See our standard pricing and get a customized quote."],
  ["Enterprise", "See our standard pricing and get a customized quote."],
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

export default function Home() {
  return (
    <main className="site-main fj-page">
      <section className="fj-hero">
        <div className="fj-hero-doodle" aria-hidden="true">
          <Image src="/framer/app-icon.svg" alt="" width={360} height={360} priority />
        </div>
        <div className="fj-container fj-hero-inner">
          <Link className="fj-announcement" href="/feature">
            <span>New</span>
            Announcing our Job Applying Automation Tool
            <ArrowRight size={24} />
          </Link>
          <h1>Say hello to smarter applying</h1>
          <p>A job applying platform that works the better than you do. For you!</p>
          <div className="fj-actions">
            <Link className="fj-button fj-button--ghost" href="/register">Try for free</Link>
            <Link className="fj-button fj-button--dark" href="/contact?intent=demo">Get a demo</Link>
          </div>
        </div>

        <div className="fj-container fj-hero-dashboard">
          <DashboardPreview />
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-trust">
          <p>16,000+ small and medium businesses trust 9Jobs in Australia</p>
          <div className="fj-logo-row">
            {trustedBrands.map((brand) => <span key={brand}>{brand}</span>)}
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container">
          <div className="fj-section-head fj-section-head--split">
            <h2>Everything you need, all in one place</h2>
            <Link className="fj-button fj-button--dark" href="/contact?intent=demo">
              Get a demo <ArrowRight size={17} />
            </Link>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <article className="fj-feature-card" key={item.title}>
                  <div className="fj-card-eyebrow"><Icon size={19} /> {item.eyebrow}</div>
                  <h3>{item.title} {item.badge && <span>{item.badge}</span>}</h3>
                  <p>{item.text}</p>
                  <Link href="/feature">Learn more <ArrowRight size={16} /></Link>
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
              <Link className="fj-button fj-button--dark" href="/contact?intent=demo">Generate report</Link>
            </div>
            {[
              ["Alex Marshall", "processed a payroll"],
              ["Sophia R.", "signed a contract"],
              ["Alex Marshall", "applied for you 9Jobs"],
              ["Nadia Thompson", "paused Maddie D."],
            ].map(([name, action]) => (
              <div className="fj-activity-row" key={`${name}-${action}`}>
                <span className="fj-avatar">{name.slice(0, 2)}</span>
                <p><strong>{name}</strong> {action}</p>
              </div>
            ))}
          </div>

          <div className="fj-copy-block">
            <span className="fj-label">real-time updates</span>
            <h2>Empowering your jobs pipeline</h2>
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
            <h2>Making yourself at home</h2>
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
            {["Office Introduction", "Product Walkthrough Session", "Skill Development Courses", "Mentorship Program"].map((task, index) => (
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
            <h2>Less paperwork, more people work</h2>
            <p>We integrate seamlessly with the tools you already use. Apply smarter with 9Jobs.</p>
            <Link className="fj-link-light" href="/feature">See all integrations <ArrowRight size={17} /></Link>
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
            <h2>Make actionable decisions simpler</h2>
            <p>Focus on what matters. Let us handle the busywork while you build better relationships.</p>
            <Link className="fj-button fj-button--dark" href="/contact?intent=demo">Get a demo</Link>
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <h2>A plan for anyone. Anytime.</h2>
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
            <h2>9Jobs is the global payroll platform leader</h2>
            <p>Automate even the most complex hiring processes and signatures.</p>
          </div>
          <div className="fj-leader-media">
            <Image src="/framer/story-ops.jpg" alt="9Jobs candidate workflow" width={900} height={600} />
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <span>Automate with 9Jobs</span>
          <h2>Start for free today.</h2>
          <div className="fj-actions">
            <Link className="fj-button fj-button--ghost" href="/register">Try 30 days</Link>
            <Link className="fj-button fj-button--dark" href="/contact?intent=demo">Schedule a demo</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
