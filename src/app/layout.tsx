import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";

import { bio, jobTitle, name, url } from "@/data";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";

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
  themeColor: "#fd55b6",
  metadataBase: new URL(`${url}`),
  alternates: {
    canonical: "/",
  },
  manifest: `${url}/site.webmanifest`,
  twitter: {
    card: "summary_large_image",
    creator: "@Prateek88900",
    title: name,
    description,
    site: url,
  },
  openGraph: {
    title: name,
    description,
    siteName: "Pratik Mane",
    locale: "en-US",
    type: "website",
    url: url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="pratikmane.netlify.app"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body>
        <main
          className="w-full md:max-w-3xl md:mx-auto flex h-screen min-h-screen flex-col"
          style={firaCode.style}
        >
          <header>
            <Navbar />
          </header>
          {children}
          {/* footer */}
          <Footer />
        </main>
      </body>
    </html>
  );
}
