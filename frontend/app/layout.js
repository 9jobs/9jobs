import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollAnimations from "../components/ScrollAnimations";
import { CalendlyLoader } from "../components/CalendlyWidget";
import WhatsAppButton from "../components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";

const homepageTitle = "9 Jobs Australia | 9jobs Resume Writing & Job Application Services";
const homepageDescription = "9jobs, also known as 9 Jobs, helps Australian professionals with Resume Writing Australia, LinkedIn Optimization, ATS Resume support, and Job Application Services.";
const siteUrl = "https://9jobs.co/";
const socialImage = {
  url: "/dashboard.png",
  width: 1200,
  height: 630,
  alt: "9Jobs career support dashboard for Australian job seekers",
};

export const metadata = {
  metadataBase: new URL("https://9jobs.co"),
  title: homepageTitle,
  description: homepageDescription,
  verification: {
    google: "S2M3LuBuz0NYvUAtbFqLd6ey52Ld9NgkvVAD04kfySY",
  },
  openGraph: {
    title: homepageTitle,
    description: homepageDescription,
    url: siteUrl,
    siteName: "9jobs",
    images: [socialImage],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homepageTitle,
    description: homepageDescription,
    images: ["/dashboard.png"],
  },
};

function jsonLd(schema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://9jobs.co/#organization",
    "name": "9jobs",
    "alternateName": [
      "9 Jobs",
      "9jobs.co"
    ],
    "url": siteUrl,
    "logo": "https://9jobs.co/framer/app-icon.svg",
    "description": "9jobs, also known as 9 Jobs, is an Australian career support brand helping professionals with resumes, LinkedIn optimization, ATS resume strategy, and job application services.",
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "sameAs": [
      "https://www.facebook.com/9jobs.co",
      "https://www.instagram.com/9jobsau/",
      "https://www.linkedin.com/company/9jobs/",
      "https://www.youtube.com/@9jobs"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://9jobs.co/#website",
    "name": "9jobs",
    "url": siteUrl,
    "alternateName": "9 Jobs",
    "publisher": {
      "@id": "https://9jobs.co/#organization"
    },
    "inLanguage": "en-AU",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://9jobs.co/jobs/melbourne?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
        />
      </head>
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
