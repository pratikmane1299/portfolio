import type { Metadata } from "next";
import { Mulish } from "next/font/google";

import { bio, jobTitle, name, url } from "@/data";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./globals.css";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "500", "600"] });

const description = `${jobTitle} ${bio}`;

export const metadata: Metadata = {
  title: name,
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
      <body>
        <main
          className="w-full md:max-w-3xl md:mx-auto flex min-h-screen flex-col"
          style={mulish.style}
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
