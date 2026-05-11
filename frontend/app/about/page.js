import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Factory,
  FileCheck2,
  HeartHandshake,
  SearchCheck,
  Sparkles,
  Target,
} from "lucide-react";

const process = [
  ["Discover", "We understand your target roles, experience, location, salary goals, and hiring timeline.", SearchCheck],
  ["Prepare", "Your resume, LinkedIn profile, and portfolio signals are tightened for recruiter review.", FileCheck2],
  ["Match", "Relevant IT and non-IT opportunities are filtered by skill fit, seniority, and career direction.", Target],
  ["Apply & follow up", "Applications, messages, interview notes, and follow-ups stay organized in one clear pipeline.", ClipboardCheck],
];

const roleGroups = [
  ["IT roles", "Support for candidates across modern technology teams.", Cpu, ["Software developer", "Data analyst", "Cloud engineer", "QA tester"]],
  ["Non-IT roles", "Practical guidance for operational, business, and frontline career paths.", Factory, ["Sales executive", "HR coordinator", "Finance associate", "Operations manager"]],
];

const team = [
  ["Aarohi Mehta", "Career Strategy Lead", "/framer/portrait-01.jpg"],
  ["Kabir Sharma", "Talent Operations Lead", "/framer/portrait-02.jpg"],
  ["Naomi Brooks", "IT Placement Specialist", "/framer/portrait-03.jpg"],
];

export const metadata = {
  title: "About | 9Jobs",
  description:
    "Learn how 9Jobs helps IT and non-IT candidates find better opportunities with resume, LinkedIn, application, and follow-up support.",
};

export default function About() {
  return (
    <main className="site-main fj-page">
      <section className="fj-page-hero">
        <div className="fj-container">
          <span className="fj-announcement"><span>About</span> Built for candidates and hiring teams</span>
          <h1>9Jobs helps IT and non-IT talent find the right opportunities.</h1>
          <p>We combine practical career support, professional content, and organized application workflows so candidates can move from search to interview with more clarity.</p>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-split">
          <div className="fj-copy-block">
            <span className="fj-label">Our story</span>
            <h2>Connecting skilled people with companies that need them.</h2>
            <p>9Jobs was created for candidates who know they can contribute, but need a sharper way to present skills, choose the right roles, and stay consistent through applications.</p>
          </div>
          <div className="fj-image-card">
            <Image src="/framer/story-ops.jpg" alt="9Jobs team reviewing candidate opportunities" width={1200} height={800} priority />
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container fj-quote-panel">
          <HeartHandshake size={30} />
          <h2>We remove the invisible barriers between talent and opportunity.</h2>
          <p>Our work is simple: help candidates show up clearly, apply with purpose, and stay ready when the right conversation begins.</p>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">Our process</span>
            <h2>A clear path from profile to placement.</h2>
          </div>
          <div className="fj-card-grid fj-card-grid--four">
            {process.map(([title, text, Icon]) => (
              <article className="fj-feature-card" key={title}>
                <div className="fj-icon-chip"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section">
        <div className="fj-container fj-split">
          <div className="fj-copy-block">
            <span className="fj-label">Role coverage</span>
            <h2>Built for technical and non-technical career paths.</h2>
            <p>For IT professionals, we focus on technical clarity. For non-IT professionals, we translate experience into outcomes hiring teams can quickly understand.</p>
          </div>
          <div className="fj-card-grid fj-card-grid--two">
            {roleGroups.map(([title, text, Icon, roles]) => (
              <article className="fj-plan-card" key={title}>
                <div className="fj-icon-chip"><Icon size={22} /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="fj-chip-list">
                  {roles.map((role) => (
                    <span key={role}><CheckCircle2 size={15} /> {role}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--muted">
        <div className="fj-container">
          <div className="fj-section-head">
            <span className="fj-label">People behind the platform</span>
            <h2>Powered by people who care about outcomes.</h2>
          </div>
          <div className="fj-card-grid fj-card-grid--three">
            {team.map(([name, role, src]) => (
              <article className="fj-team-card" key={name}>
                <Image src={src} alt={name} width={600} height={760} />
                <h3>{name}</h3>
                <p>{role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <Sparkles size={28} />
          <h2>Shape the future of job applying with 9Jobs.</h2>
          <Link className="fj-button fj-button--dark" href="/contact?intent=demo">
            Get started <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
