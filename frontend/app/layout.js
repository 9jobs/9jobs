import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollAnimations from "../components/ScrollAnimations";
import { CalendlyLoader } from "../components/CalendlyWidget";

export const metadata = {
  title: "9Jobs | Smarter Job Applying",
  description: "A clean job applying platform for resumes, LinkedIn, applications, and career support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollAnimations />
        <CalendlyLoader />
      </body>
    </html>
  );
}
