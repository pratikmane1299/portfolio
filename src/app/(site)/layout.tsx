import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import Script from "next/script";

import { bio, jobTitle, name } from "@/data";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "@/Providers";

import { env } from "@/env.mjs";

import "../globals.css";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const description = `${jobTitle} ${bio}`;

export const metadata: Metadata = {
  title: {
    template: `%s | ${name}`,
    default: name,
  },
  description,
  metadataBase: new URL(`${env.SITE_URL}`),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${env.SITE_URL}/feed.xml`,
    },
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Prateek88900",
    title: name,
    description,
    site: env.SITE_URL,
    images: [`${env.SITE_URL}/api/og/`],
  },
  openGraph: {
    title: name,
    description,
    siteName: "Pratik Mane",
    locale: "en-US",
    type: "website",
    url: env.SITE_URL,
    images: [`${env.SITE_URL}/api/og/`],
  },
  verification: {
    google: env.GOOGLE_VERIFICATION_ID, 
  },
};

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://umami-analytics-service.onrender.com/script.js"
            data-website-id={env.ANALYTICS_WEBSITE_ID}
          ></Script>
        )}
      </head>
      <body>
        <main
          className="w-full md:max-w-3xl md:mx-auto flex h-screen min-h-screen flex-col"
          style={firaCode.style}
        >
          <Providers>
            <header>
              <Navbar />
            </header>
            {children}
            {/* footer */}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
