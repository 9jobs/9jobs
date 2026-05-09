import Link from "next/link";
import { FadeIn, FadeUp, Popup, Stagger, StaggerItem } from "../../components/Motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  BookUser,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  MailCheck,
  SearchCheck,
  Settings2,
} from "lucide-react";

const platformFeatures = [
  {
    icon: FileCheck2,
    title: "Resume review and editing",
    text: "Improve structure, clarity, keywords, formatting, and ATS readiness.",
    image:
      "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: BookUser,
    title: "LinkedIn optimization",
    text: "Turn your profile into a stronger signal for recruiters and hiring managers.",
    image:
      "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: SearchCheck,
    title: "Application targeting",
    text: "Focus on roles that match your profile, location, level, and goals.",
    image:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: MailCheck,
    title: "Follow-up workflows",
    text: "Keep follow-ups, recruiter notes, and application status in one clean view.",
    image:
      "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: Bot,
    title: "Automation assist",
    text: "Use smart support for repetitive job search tasks while you approve key decisions.",
    image:
      "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: Gauge,
    title: "Progress reporting",
    text: "See what moved forward, what needs review, and what is ready next.",
    image:
      "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900')",
  },
];

export const metadata = {
  title: "Features | 9Jobs",
  description: "Explore 9Jobs features for resumes, LinkedIn, applications, automation, and job search tracking.",
};

export default function FeaturePage() {
  return (
    <main className="site-main">
      <section className="page-hero">
        <div className="container">
          <FadeUp as="span" className="eyebrow">
            <span className="eyebrow-mark">Feature</span>
            All the moving parts in one place
          </FadeUp>
          <FadeUp as="h1" className="page-title" style={{ marginTop: 24 }}>
            A cleaner operating system for job <span className="heading-mark">applying.</span>
          </FadeUp>
          <FadeIn as="p" className="lead">
            9Jobs brings documents, profile work, job targeting, follow-ups, and
            reporting into a simple workflow that stays easy to scan.
          </FadeIn>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container-wide grid-2">
          <Popup className="activity-panel">
            <div className="activity-board">
              <FadeIn
                className="card-media compact"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=900')",
                }}
              />
              <div className="activity-top">
                <span className="icon-chip">
                  <ClipboardCheck size={22} />
                </span>
                <Link className="btn btn-dark" href="/contact?intent=demo">
                  Preview flow
                </Link>
              </div>
              {[
                ["Resume", "ATS format reviewed", "Complete"],
                ["LinkedIn", "Headline and summary tuned", "Ready"],
                ["Applications", "Priority roles selected", "Live"],
                ["Follow-up", "Recruiter messages queued", "Next"],
              ].map(([title, text, status]) => (
                <div className="activity-row" key={title}>
                  <span className="stack">
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </span>
                  <span className="eyebrow-mark">{status}</span>
                </div>
              ))}
            </div>
          </Popup>

          <div>
            <FadeUp as="p" className="label">Built for repeated action</FadeUp>
            <FadeUp as="h2" className="section-title" style={{ marginTop: 18 }}>
              Less scattered work. More forward <span className="heading-mark">motion.</span>
            </FadeUp>
            <FadeIn as="p" className="lead" style={{ marginTop: 24 }}>
              The reference experience is intentionally calm: big readable
              sections, focused cards, and enough visual context to understand
              what is happening without digging.
            </FadeIn>
            <Stagger className="pipeline-list">
              {[
                [BriefcaseBusiness, "Role-focused support"],
                [Settings2, "Custom workflows"],
                [ArrowRight, "Clear next steps"],
                [ClipboardCheck, "Approval checkpoints"],
              ].map(([Icon, title]) => (
                <StaggerItem className="pipeline-item" key={title}>
                  <Icon size={24} />
                  <h3>{title}</h3>
                  <p>Everything is designed to keep the application process easy to read.</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-wide center">
          <FadeUp as="h2" className="section-title" style={{ margin: "0 auto 56px" }}>
            The tools candidates naturally <span className="heading-mark">expect.</span>
          </FadeUp>
          <Stagger className="grid-3">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <StaggerItem as="article" hover className="feature-card card" key={feature.title}>
                  <FadeIn className="card-media" style={{ backgroundImage: feature.image }} />
                  <span className="icon-chip" style={{ marginBottom: 24 }}>
                    <Icon size={22} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section section-tight">
        <Popup className="container cta-panel">
          <p className="label">Ready to see it</p>
          <FadeUp as="h2" className="section-title">Get a clean 9Jobs <span className="heading-mark">walkthrough.</span></FadeUp>
          <Link className="btn btn-dark" href="/contact?intent=demo">
            Schedule a demo <ArrowRight size={17} />
          </Link>
        </Popup>
      </section>
    </main>
  );
}
