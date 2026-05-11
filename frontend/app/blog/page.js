import Link from "next/link";
import { ArrowRight, BookOpen, BookUser, Briefcase, FileText } from "lucide-react";

const posts = [
  ["Resume tips that make your experience easier to scan", "A practical guide to structure, language, and the details that make a resume feel ready.", "Resume", FileText],
  ["How to choose roles that match your actual direction", "Sharper targeting saves time and keeps applications aligned with the work you want.", "Job search", Briefcase],
  ["LinkedIn profile improvements recruiters notice quickly", "Turn your headline, summary, and project details into a cleaner professional signal.", "LinkedIn", BookUser],
];

export const metadata = {
  title: "Blog | 9Jobs",
  description: "Career tips from 9Jobs for resumes, LinkedIn profiles, interviews, and smarter applications.",
};

export default function BlogPage() {
  return (
    <main className="site-main fj-page">
      <section className="fj-page-hero">
        <div className="fj-container">
          <span className="fj-announcement"><span>Blog</span> Career notes that stay practical</span>
          <h1>Small improvements that make applications stronger.</h1>
          <p>Clean advice for resumes, LinkedIn, interviews, targeting, and the habits that keep a job search moving.</p>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-card-grid fj-card-grid--three">
          {posts.map(([title, text, tag, Icon]) => (
            <article className="fj-blog-card" key={title}>
              <div className="fj-icon-chip"><Icon size={22} /></div>
              <span className="fj-badge">{tag}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <Link href="/contact">Read with 9Jobs <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-final-cta">
          <BookOpen size={28} />
          <h2>Want help applying the advice?</h2>
          <p>Send your goals to 9Jobs and we will help shape a practical next step.</p>
          <Link className="fj-button fj-button--dark" href="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
