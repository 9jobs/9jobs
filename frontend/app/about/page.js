import Image from "next/image";
import Link from "next/link";
import { FadeIn, FadeUp, Popup, Stagger, StaggerItem } from "../../components/Motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  Factory,
  FileCheck2,
  HeartHandshake,
  Play,
  SearchCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

const stats = [
  ["IT and non-IT", "role coverage"],
  ["4-step", "application workflow"],
  ["Human + AI", "support model"],
];

const process = [
  {
    icon: SearchCheck,
    title: "Discover",
    text: "We understand your target roles, experience, location, salary goals, and hiring timeline.",
  },
  {
    icon: FileCheck2,
    title: "Prepare",
    text: "Your resume, LinkedIn profile, and portfolio signals are tightened for recruiter review.",
  },
  {
    icon: Target,
    title: "Match",
    text: "Relevant IT and non-IT opportunities are filtered by skill fit, seniority, and career direction.",
  },
  {
    icon: ClipboardCheck,
    title: "Apply & follow up",
    text: "Applications, messages, interview notes, and follow-ups stay organized in one clear pipeline.",
  },
];

const roleGroups = [
  {
    icon: Cpu,
    title: "IT roles",
    text: "Support for candidates across modern technology teams.",
    roles: ["Software developer", "Data analyst", "Cloud engineer", "QA tester", "UI/UX designer"],
  },
  {
    icon: Factory,
    title: "Non-IT roles",
    text: "Practical guidance for operational, business, and frontline career paths.",
    roles: ["Sales executive", "HR coordinator", "Finance associate", "Operations manager", "Customer support"],
  },
];

const team = [
  {
    name: "Aarohi Mehta",
    role: "Career Strategy Lead",
    image: "/brand/team-01.jpg",
  },
  {
    name: "Kabir Sharma",
    role: "Talent Operations Lead",
    image: "/brand/team-02.jpg",
  },
  {
    name: "Naomi Brooks",
    role: "IT Placement Specialist",
    image: "/brand/team-03.jpg",
  },
  {
    name: "Ethan Park",
    role: "Non-IT Hiring Specialist",
    image: "/brand/team-04.jpg",
  },
];

export const metadata = {
  title: "About | 9Jobs",
  description:
    "Learn how 9Jobs helps IT and non-IT candidates find better opportunities with resume, LinkedIn, application, and follow-up support.",
};

export default function About() {
  return (
    <main className="site-main">
      <section className="page-hero about-hero">
        <div className="container">
          <FadeUp as="span" className="eyebrow">
            <span className="eyebrow-mark">About</span>
            Built for candidates and hiring teams
          </FadeUp>
          <FadeUp as="h1" className="page-title" style={{ marginTop: 24 }}>
            9Jobs helps IT and non-IT talent find the right{" "}
            <span className="heading-mark">opportunities.</span>
          </FadeUp>
          <FadeIn as="p" className="lead">
            We combine practical career support, professional content, and
            organized application workflows so candidates can move from search
            to interview with more clarity.
          </FadeIn>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container-wide about-story-grid">
          <FadeUp className="story-copy">
            <p className="label">Our story</p>
            <h2 className="section-title">
              Connecting skilled people with companies that need them.
            </h2>
          </FadeUp>

          <div className="story-body">
            <FadeIn as="p">
              9Jobs was created for candidates who know they can contribute, but
              need a sharper way to present their skills, choose the right roles,
              and stay consistent through the application process.
            </FadeIn>
            <FadeIn as="p">
              For IT professionals, we focus on technical clarity, project
              evidence, tools, and recruiter keywords. For non-IT professionals,
              we translate experience into outcomes hiring teams can quickly
              understand across sales, operations, finance, HR, support, and more.
            </FadeIn>
            <Stagger className="about-stats">
              {stats.map(([value, label]) => (
                <StaggerItem className="stat-card" key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <FadeIn className="container-wide about-image-band">
          <Image
            src="/brand/about-team-hero.jpg"
            alt="9Jobs team reviewing candidate opportunities together"
            width={1792}
            height={1024}
            preload
          />
        </FadeIn>
      </section>

      <section className="section">
        <div className="container-wide quote-layout">
          <FadeUp className="quote-card">
            <p className="label">What drives us</p>
            <h2>
              &quot;We remove the invisible barriers between talent and
              opportunity.&quot;
            </h2>
            <p>
              Our work is simple: help candidates show up clearly, apply with
              purpose, and stay ready when the right conversation begins.
            </p>
            <div className="quote-author">
              <span className="icon-chip">
                <HeartHandshake size={20} />
              </span>
              <span className="stack">
                <strong>9Jobs Career Team</strong>
                <span>Resume, LinkedIn, and hiring support</span>
              </span>
            </div>
          </FadeUp>

          <Popup className="quote-media">
            <Image
              src="/brand/about-candidate-story.jpg"
              alt="Candidate speaking with a 9Jobs career advisor"
              width={1792}
              height={1024}
            />
            <span className="play-button" aria-hidden="true">
              <Play size={18} fill="currentColor" />
            </span>
          </Popup>
        </div>
      </section>

      <section className="section">
        <div className="container-wide center">
          <FadeUp as="p" className="label">
            Our process
          </FadeUp>
          <FadeUp as="h2" className="section-title" style={{ margin: "18px auto 54px" }}>
            A clear path from profile to <span className="heading-mark">placement.</span>
          </FadeUp>
          <Stagger className="process-grid">
            {process.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem as="article" hover className="process-card card" key={item.title}>
                  <span className="icon-chip">
                    <Icon size={21} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container-wide role-layout">
          <Popup className="role-image">
            <Image
              src="/brand/about-operations.jpg"
              alt="9Jobs operations team reviewing a candidate matching workflow"
              width={1792}
              height={1024}
            />
          </Popup>

          <div>
            <FadeUp as="p" className="label">
              Role coverage
            </FadeUp>
            <FadeUp as="h2" className="section-title" style={{ marginTop: 18 }}>
              Built for technical and non-technical career paths.
            </FadeUp>
            <Stagger className="role-card-grid">
              {roleGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <StaggerItem as="article" hover className="role-card card" key={group.title}>
                    <span className="icon-chip">
                      <Icon size={21} />
                    </span>
                    <h3>{group.title}</h3>
                    <p>{group.text}</p>
                    <div className="role-list">
                      {group.roles.map((role) => (
                        <span key={role}>
                          <CheckCircle2 size={16} />
                          {role}
                        </span>
                      ))}
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="section team-section">
        <div className="container-wide center">
          <FadeUp as="p" className="label">
            People behind the platform
          </FadeUp>
          <FadeUp as="h2" className="section-title" style={{ margin: "18px auto 54px" }}>
            Powered by people who care about <span className="heading-mark">outcomes.</span>
          </FadeUp>
          <Stagger className="team-grid">
            {team.map((member) => (
              <StaggerItem as="article" hover className="team-card card" key={member.name}>
                <div className="team-photo">
                  <Image src={member.image} alt={member.name} width={1024} height={1536} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-tight">
        <Popup className="container about-cta-dark">
          <span className="icon-chip">
            <Sparkles size={22} />
          </span>
          <p className="label">Join 9Jobs</p>
          <FadeUp as="h2">
            Shape the future of job applying with 9Jobs.
          </FadeUp>
          <Link className="btn btn-lime" href="/contact?intent=demo">
            Get started <ArrowRight size={17} />
          </Link>
        </Popup>
      </section>
    </main>
  );
}
