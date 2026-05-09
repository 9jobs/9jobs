import AuthPanel from "../../components/AuthPanel";

export const metadata = {
  title: "Register | 9Jobs",
  description: "Create a 9Jobs account placeholder.",
};

export default function RegisterPage() {
  return (
    <main className="site-main">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">
            <span className="eyebrow-mark">Start</span>
            Try 9Jobs for free
          </span>
        </div>
      </section>
      <section className="section section-tight" style={{ paddingTop: 0 }}>
        <AuthPanel mode="register" />
      </section>
    </main>
  );
}
