const testimonials = [
  {
    name: "Danielle Rodrigues",
    role: "HR lead",
    quote: "9Jobs made the whole application process easier to understand and easier to manage.",
  },
  {
    name: "David Wilson",
    role: "Founder",
    quote: "The clean workflow keeps candidates focused on the next meaningful action.",
  },
  {
    name: "Dennis Howell",
    role: "Software candidate",
    quote: "My resume and LinkedIn profile felt sharper before the first application went out.",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <div className="container-wide center">
        <p className="label">Testimonials</p>
        <h2 className="section-title" style={{ margin: "18px auto 54px" }}>
          What people are <span className="heading-mark">saying.</span>
        </h2>
        <div className="grid-3">
          {testimonials.map((testimonial) => (
            <article className="card split-card" key={testimonial.name}>
              <p style={{ fontSize: "1.18rem", fontWeight: 720 }}>{testimonial.quote}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 28 }}>
                <span className="avatar" />
                <span className="stack">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
