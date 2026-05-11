import ContactForm from "../../components/ContactForm";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact | 9Jobs",
  description: "Contact 9Jobs for demos, resume support, LinkedIn optimization, and job application help.",
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const initialMessage =
    params?.intent === "demo" ? "I would like to schedule a 9Jobs demo." : "";

  return (
    <main className="site-main fj-page">
      <section className="fj-page-hero fj-contact-hero">
        <div className="fj-container">
          <span className="fj-announcement"><span>Contact</span> We are ready to help</span>
          <h1>Get in touch with 9Jobs.</h1>
          <p>Tell us what you want to improve: resume, LinkedIn, applications, interview flow, or a full demo of the platform.</p>
        </div>
      </section>

      <section className="fj-section fj-section--tight">
        <div className="fj-container fj-contact-layout">
          <aside className="fj-contact-panel">
            <div className="fj-icon-chip"><Sparkles size={22} /></div>
            <span className="fj-label">Contact information</span>
            <h2>Fast answers, clear next steps.</h2>
            <p>Share the outcome you want and the 9Jobs team will respond with the most useful path forward.</p>

            <div className="fj-contact-list">
              <a href="tel:+61422552002"><Phone size={20} /> +61 422 552 002</a>
              <a href="mailto:9jobsapplicationservice@gmail.com"><Mail size={20} /> 9jobsapplicationservice@gmail.com</a>
              <span><MapPin size={20} /> Melbourne, Australia</span>
            </div>

            <div className="fj-contact-hours">
              <strong>Business hours</strong>
              <p>Monday to Friday, 9:00 AM to 6:00 PM.</p>
            </div>
          </aside>

          <div className="fj-contact-form-slot">
            <ContactForm initialMessage={initialMessage} />
          </div>
        </div>
      </section>
    </main>
  );
}
