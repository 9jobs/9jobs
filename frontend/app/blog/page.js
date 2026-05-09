import Link from "next/link";
import { FadeIn, FadeUp, Popup, Stagger, StaggerItem } from "../../components/Motion";
import { ArrowRight, BookOpen, BookUser, Briefcase, FileText } from "lucide-react";

const posts = [
  {
    icon: FileText,
    title: "Resume tips that make your experience easier to scan",
    text: "A practical guide to structure, language, and the details that make a resume feel ready.",
    tag: "Resume",
    image:
      "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: Briefcase,
    title: "How to choose roles that match your actual direction",
    text: "Sharper targeting saves time and keeps applications aligned with the work you want.",
    tag: "Job search",
    image:
      "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=900')",
  },
  {
    icon: BookUser,
    title: "LinkedIn profile improvements recruiters notice quickly",
    text: "Turn your headline, summary, and project details into a cleaner professional signal.",
    tag: "LinkedIn",
    image:
      "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=900')",
  },
];

export const metadata = {
  title: "Blog | 9Jobs",
  description: "Career tips from 9Jobs for resumes, LinkedIn profiles, interviews, and smarter applications.",
};

export default function BlogPage() {
  return (
    <main className="site-main">
      <section className="page-hero">
        <div className="container">
          <FadeUp as="span" className="eyebrow">
            <span className="eyebrow-mark">Blog</span>
            Career notes that stay practical
          </FadeUp>
          <FadeUp as="h1" className="page-title" style={{ marginTop: 24 }}>
            Small improvements that make applications <span className="heading-mark">stronger.</span>
          </FadeUp>
          <FadeIn as="p" className="lead">
            Clean advice for resumes, LinkedIn, interviews, targeting, and the
            habits that keep a job search moving.
          </FadeIn>
        </div>
      </section>

      <section className="section section-tight">
        <Stagger className="container-wide story-grid">
          {posts.map((post) => {
            const Icon = post.icon;
            return (
              <StaggerItem as="article" hover className="article-card card split-card" key={post.title}>
                <FadeIn className="photo-tile" style={{ minHeight: 220, backgroundImage: post.image }} />
                <span className="icon-chip">
                  <Icon size={22} />
                </span>
                <span className="eyebrow-mark" style={{ width: "fit-content" }}>
                  {post.tag}
                </span>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <Link className="btn btn-light" href="/contact">
                  Read with 9Jobs <ArrowRight size={17} />
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <section className="section section-tight">
        <Popup className="container soft-panel home-panel">
          <BookOpen size={28} />
          <FadeUp as="h2" className="section-title" style={{ margin: "18px auto" }}>
            Want help applying the <span className="heading-mark">advice?</span>
          </FadeUp>
          <FadeIn as="p" className="lead" style={{ maxWidth: 620, margin: "0 auto 28px" }}>
            Send your goals to 9Jobs and we will help shape a practical next step.
          </FadeIn>
          <Link className="btn btn-dark" href="/contact">
            Contact us
          </Link>
        </Popup>
      </section>
    </main>
  );
}
