import ContactForm from "../../components/ContactForm";
import { FadeIn, FadeUp, Popup } from "../../components/Motion";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | 9Jobs",
  description: "Contact 9Jobs for demos, resume support, LinkedIn optimization, and job application help.",
};

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  const initialMessage =
    params?.intent === "demo" ? "I would like to schedule a 9Jobs demo." : "";

  return (
    <main className="site-main">
      <section className="page-hero">
        <div className="container">
          <FadeUp as="span" className="eyebrow">
            <span className="eyebrow-mark">Contact</span>
            We are ready to help
          </FadeUp>
          <FadeUp as="h1" className="page-title" style={{ marginTop: 24 }}>
            Get in touch with <span className="heading-mark">9Jobs.</span>
          </FadeUp>
          <FadeIn as="p" className="lead">
            Tell us what you want to improve: resume, LinkedIn, applications,
            interview flow, or a full demo of the platform.
          </FadeIn>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container-wide grid-2 contact-layout">
          <Popup as="aside" hover className="contact-info card">
            <FadeIn
              className="card-media"
              style={{
                backgroundImage:
                  "url('/profession/meeting.png')",
              }}
            />
            <p className="label">Contact information</p>
            <FadeUp as="h2" className="section-title" style={{ fontSize: "3rem", marginTop: 18 }}>
              Fast answers, clear next <span className="heading-mark">steps.</span>
            </FadeUp>
            <FadeIn as="p" className="lead" style={{ marginTop: 20 }}>
              Share the outcome you want and the 9Jobs team will respond with
              the most useful path forward.
            </FadeIn>

            <div className="contact-list">
              <a href="tel:+61422552002">
                <Phone size={20} /> +61 422 552 002
              </a>
              <a href="mailto:9jobsapplicationservice@gmail.com">
                <Mail size={20} /> 9jobsapplicationservice@gmail.com
              </a>
              <span>
                <MapPin size={20} /> Melbourne, Australia
              </span>
            </div>

            <div className="soft-panel" style={{ marginTop: 30, padding: 22 }}>
              <strong>Business hours</strong>
              <p className="muted" style={{ marginTop: 8 }}>
                Monday to Friday, 9:00 AM to 6:00 PM.
              </p>
            </div>
          </Popup>

          <ContactForm initialMessage={initialMessage} />
        </div>
      </section>
    </main>
  );
}
