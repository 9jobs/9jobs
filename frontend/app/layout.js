import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollAnimations from "../components/ScrollAnimations";
import { CalendlyLoader } from "../components/CalendlyWidget";
import WhatsAppButton from "../components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  metadataBase: new URL("https://9jobs.co"),
  title: "9Jobs | Smarter Job Applying",
  description: "A clean job applying platform for resumes, LinkedIn, applications, and career support.",
  verification: {
    google: "S2M3LuBuz0NYvUAtbFqLd6ey52Ld9NgkvVAD04kfySY",
  },
  alternates: {
    canonical: "/",
  },
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
        <WhatsAppButton />
      </body>
      {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
