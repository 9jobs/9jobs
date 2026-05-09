import Image from "next/image";
import Link from "next/link";
import { FadeIn, FadeUp, Popup, Stagger, StaggerItem } from "../components/Motion";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Check,
  FileText,
  Globe2,
  Layers3,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

const featureCards = [
  {
    title: "Goal management",
    badge: "New",
    description: "See each application step, track progress, and keep every next action visible.",
    image:
      "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "Real-time updates",
    description: "Stay aligned with your documents, applications, and career support requests.",
    image:
      "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "High-level customization",
    description: "Shape the application workflow around your market, role type, and timeline.",
    image:
      "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=900')",
  },
];

const pipelineItems = [
  {
    icon: Briefcase,
    title: "Career transition support",
    text: "Build a practical route from where you are to the roles you want.",
  },
  {
    icon: Users,
    title: "LinkedIn optimization",
    text: "Polish your profile for recruiters, hiring teams, and keyword discovery.",
  },
  {
    icon: FileText,
    title: "Resume review and editing",
    text: "Tighten structure, language, formatting, and ATS readiness.",
  },
  {
    icon: Globe2,
    title: "Market focus",
    text: "Tune your applications for Australia, global roles, or niche industries.",
  },
];

const values = [
  {
    title: "Team alignment",
    text: "Clear communication across every application step.",
    image:
      "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "Skills development",
    text: "Resume and profile improvements that compound.",
    image:
      "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "Progress tracking",
    text: "Know what is done, pending, and ready to send.",
    image:
      "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "Performance insights",
    text: "Use feedback to improve every application cycle.",
    image:
      "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=900')",
  },
];

const pricing = [
  {
    name: "Starter",
    text: "For candidates who need a clean resume review and focused application direction.",
    image:
      "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=900')",
  },
  {
    name: "Growth",
    text: "For active job seekers who want resume, LinkedIn, and application support together.",
    image:
      "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=900')",
  },
  {
    name: "Enterprise",
    text: "For teams and agencies that need repeatable candidate support workflows.",
    dark: true,
    image:
      "url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=900')",
  },
];

const leaderCards = [
  {
    title: "You are in control",
    text: "Approve direction, documents, and priorities before the next move.",
    image:
      "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "Data that scales every day",
    text: "Keep a simple view of applications, edits, and follow-up work.",
    image:
      "url('https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=900')",
  },
  {
    title: "Tailored for 150+ countries",
    text: "Adapt resumes and applications to the standards of your target market.",
    image:
      "url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=900')",
  },
];

export default function Home() {
  return (
    <main className="site-main">
      <section className="hero">
        <div className="container-wide hero-grid">
          <FadeIn className="hero-visual" aria-label="Candidate moving forward with application documents">
            <div className="hero-motion-stage">
              <Image
                className="hero-illustration"
                src="/brand/hero-applying-illustration.png"
                alt="Professional candidate carrying resume documents"
                width={1600}
                height={900}
                preload
              />
              <Image
                aria-hidden="true"
                className="hero-person-layer"
                src="/brand/hero-applying-illustration.png"
                alt=""
                width={1600}
                height={900}
              />
            </div>
          </FadeIn>

          <div className="hero-copy">
            <FadeUp className="eyebrow">
              <span className="eyebrow-mark">New</span>
              Job applying automation tool <ArrowRight size={14} />
            </FadeUp>

            <FadeUp as="h1" className="display-title" style={{ marginTop: 26 }}>
              Say hello to
              <br />
              smarter applying
            </FadeUp>

            <FadeIn as="p" className="lead">
              A professional job support platform for IT and non-IT candidates:
              resumes, LinkedIn profiles, targeted applications, and interview
              follow-ups in one clear workflow.
            </FadeIn>

            <FadeUp className="hero-actions">
              <Link className="btn btn-light" href="/register">
                Try for free
              </Link>
              <Link className="btn btn-dark" href="/contact?intent=demo">
                Schedule a demo
              </Link>
            </FadeUp>

            <FadeIn className="trust-row">
              <p className="label">16,000+ candidates and teams trust 9Jobs</p>
              <div className="logo-cloud" aria-label="Trusted by">
                <span>bluebird</span>
                <span>Galaxy</span>
                <span>berry</span>
                <span>Chameleon</span>
                <span>SHIP4450</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide center">
          <FadeUp as="span" className="icon-chip">
            <Share2 size={22} />
          </FadeUp>
          <FadeUp as="h2" className="section-title" style={{ margin: "26px auto 24px" }}>
            Everything you
            <br />
            need, all in <span className="heading-mark">one place</span>
          </FadeUp>
          <FadeUp>
            <Link className="btn btn-dark" href="/contact?intent=demo">
              Get a demo
            </Link>
          </FadeUp>

          <Stagger className="grid-3" style={{ marginTop: 72 }}>
            {featureCards.map((feature, index) => (
              <StaggerItem as="article" hover className="feature-card card" key={feature.title}>
                <FadeIn className="card-media" style={{ backgroundImage: feature.image }} />
                <div className="mini-ui">
                  <div className="mini-ui-row">
                    <span className="ui-dot" />
                    <span className="ui-line" style={{ width: 124 }} />
                  </div>
                  {[0, 1, 2].map((item) => (
                    <div className="task-row" key={item}>
                      <span className="ui-square" />
                      <span
                        className="ui-line"
                        style={{ width: `${index === item ? 72 : 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <h3>
                  {feature.title}{" "}
                  {feature.badge && <span className="eyebrow-mark">{feature.badge}</span>}
                </h3>
                <p>{feature.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-wide grid-2">
          <Popup className="activity-panel">
            <div className="activity-board">
              <div className="activity-top">
                <Link className="brand" href="/">
                  <span className="brand-mark">9</span>
                  <span>9Jobs</span>
                </Link>
                <Link className="btn btn-dark" href="/contact?intent=demo">
                  Generate report
                </Link>
              </div>

              {[
                ["Aisha Marshall", "Resume edits approved", "Just now", "avatar"],
                ["John Carter", "New application drafted", "2 min ago", "avatar peach"],
                ["Nadia Thompson", "Interview notes updated", "5 min ago", "avatar dark"],
              ].map(([name, action, time, avatar]) => (
                <div className="activity-row" key={name}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span className={avatar} />
                    <span className="stack">
                      <strong>{name}</strong>
                      <span>{action}</span>
                    </span>
                  </div>
                  <span className="muted" style={{ fontSize: "0.82rem" }}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </Popup>

          <div>
            <FadeUp as="p" className="label">Real-time updates</FadeUp>
            <FadeUp as="h2" className="section-title" style={{ marginTop: 20 }}>
              Empowering
              <br />
              your jobs <span className="heading-mark">pipeline</span>
            </FadeUp>
            <Stagger className="pipeline-list">
              {pipelineItems.map((item) => {
                const Icon = item.icon;
                return (
                  <StaggerItem className="pipeline-item" key={item.title}>
                    <Icon size={24} />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section">
        <Popup className="container soft-panel home-panel">
          <p className="label">Growth at high level</p>
          <FadeUp as="h2" className="section-title" style={{ margin: "18px auto 0" }}>
            Making yourself at <span className="heading-mark">home</span>
          </FadeUp>

          <Stagger className="value-grid">
            {values.map((value) => (
              <StaggerItem as="article" hover className="value-card card" key={value.title}>
                <FadeIn className="card-media compact" style={{ backgroundImage: value.image }} />
                <span className="icon-chip" style={{ marginBottom: 16 }}>
                  <Layers3 size={18} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Popup className="roles-card card">
            <FadeIn
              className="card-media compact"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=900')",
              }}
            />
            <h3 style={{ marginBottom: 20 }}>Roles</h3>
            {[
              ["Software Developer", "30 min", true],
              ["Lead Software Developer", "45 min", false],
              ["Product Owner", "1.5 h", false],
            ].map(([title, time, active]) => (
              <div className={`role-row${active ? " is-active" : ""}`} key={title}>
                <strong>{title}</strong>
                <span className="muted">{time}</span>
              </div>
            ))}
          </Popup>
        </Popup>
      </section>

      <section className="section center">
        <div className="container">
          <FadeUp as="h2" className="section-title" style={{ margin: "0 auto" }}>
            Less paperwork,
            <br />
            more <span className="heading-mark">people work</span>
          </FadeUp>
          <FadeIn as="p" className="lead" style={{ maxWidth: 640, margin: "24px auto 0" }}>
            We integrate with the tools and documents you already use so every
            application feels lighter and more focused.
          </FadeIn>
          <Stagger className="integration-strip">
            {["Resume", "LinkedIn", "ATS", "Email", "Interview"].map((item) => (
              <StaggerItem as="span" hover className="integration-pill" key={item}>
                {item}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section center">
        <div className="container">
          <FadeUp as="h2" className="section-title" style={{ margin: "0 auto" }}>
            Make actionable
            <br />
            decisions <span className="heading-mark">simpler</span>
          </FadeUp>
          <FadeIn as="p" className="lead" style={{ maxWidth: 620, margin: "24px auto 0" }}>
            Focus on the roles that matter while 9Jobs keeps the busywork clear,
            tracked, and ready for review.
          </FadeIn>

          <FadeIn className="photo-stage">
            <FadeIn
              className="photo-card"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000')",
              }}
            />
            <Popup className="floating-note">
              <span className="eyebrow-mark">New job found</span>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginTop: 18 }}>
                <span className="icon-chip">
                  <Sparkles size={18} />
                </span>
                <span className="stack">
                  <strong>CV recognition</strong>
                  <span>AI analysis complete</span>
                </span>
              </div>
            </Popup>
          </FadeIn>

          <FadeUp>
            <Link className="btn btn-dark" href="/contact?intent=demo" style={{ marginTop: 42 }}>
              Get a demo
            </Link>
          </FadeUp>
        </div>
      </section>

      <section className="section center">
        <div className="container-wide">
          <FadeUp as="h2" className="section-title" style={{ margin: "0 auto" }}>
            A plan for anyone.
            <br />
            <span className="heading-mark">Anytime.</span>
          </FadeUp>
          <FadeIn as="p" className="lead" style={{ marginTop: 18 }}>
            Choose the level of support that matches your job search.
          </FadeIn>

          <Stagger className="grid-3" style={{ marginTop: 58 }}>
            {pricing.map((plan) => (
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
                <h3>{plan.name}</h3>
                <p>{plan.text}</p>
                <Link className={`btn ${plan.dark ? "btn-lime" : "btn-light"}`} href="/contact?intent=demo">
                  Get started
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <FadeUp as="h2" className="section-title">
            9Jobs is the global
            <br />
            application support <span className="heading-mark">platform</span>
          </FadeUp>
          <Stagger className="story-grid" style={{ marginTop: 58 }}>
            {leaderCards.map((card) => (
              <StaggerItem as="article" hover className="article-card card split-card" key={card.title}>
                <FadeIn className="photo-tile" style={{ backgroundImage: card.image }} />
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-tight">
        <Popup className="container-wide cta-panel">
          <p className="label">Automate with 9Jobs</p>
          <FadeUp as="h2" className="section-title">Start for free <span className="heading-mark">today.</span></FadeUp>
          <div className="check-row">
            <span>
              <Check size={18} color="#6c8a00" /> Try 30 days
            </span>
            <span>
              <BadgeCheck size={18} color="#6c8a00" /> Clean setup
            </span>
          </div>
          <Link className="btn btn-dark" href="/contact?intent=demo">
            Schedule a demo
          </Link>
        </Popup>
      </section>
    </main>
  );
}
