import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollAnimations from "../components/ScrollAnimations";
import { CalendlyLoader } from "../components/CalendlyWidget";
import WhatsAppButton from "../components/WhatsAppButton";
import { GoogleAnalytics } from "@next/third-parties/google";

const homepageTitle = "9Jobs Australia | Resume Writing & Job Application Help";
const homepageDescription = "Get more interviews with 9Jobs Australia: ATS resume writing, LinkedIn and SEEK profile optimization, job application support, and interview coaching.";
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
    siteName: "9Jobs",
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
    "@type": ["Organization", "ProfessionalService"],
    "@id": "https://9jobs.co/#organization",
    "name": "9Jobs",
    "alternateName": [
      "9 Jobs",
      "9Jobs Australia",
      "9Jobs Application Services"
    ],
    "url": siteUrl,
    "logo": "https://9jobs.co/framer/app-icon.svg",
    "description": "9Jobs is a Career Services / Job Search Support provider helping Australian job seekers with resumes, LinkedIn, SEEK profiles, interviews, and applications.",
    "slogan": "Resume writing, profile optimization, and job application support for Australia.",
    "knowsAbout": [
      "ATS resume writing Australia",
      "LinkedIn profile optimization",
      "SEEK profile optimization",
      "job application support",
      "interview coaching",
      "Australian recruitment"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Level 12, 120 Collins Street",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "postalCode": "3000",
      "addressCountry": "AU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+61-422-552-002",
      "contactType": "customer service",
      "areaServed": "AU",
      "availableLanguage": "en"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "9Jobs Career Support Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Resume Writing Australia",
            "url": "https://9jobs.co/services/resume-writing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LinkedIn Optimization Australia",
            "url": "https://9jobs.co/services/linkedin-optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEEK Profile Optimization",
            "url": "https://9jobs.co/services/seek-profile-optimization"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Job Application Support",
            "url": "https://9jobs.co/services/job-application-automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interview Coaching Australia",
            "url": "https://9jobs.co/services/interview-coaching"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61589408708559",
      "https://www.instagram.com/9jobsau/",
      "https://www.linkedin.com/company/9jobs/",
      "https://www.youtube.com/@9jobs"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://9jobs.co/#website",
    "name": "9Jobs",
    "url": siteUrl,
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
