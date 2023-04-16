import type { Metadata } from "next";

import { bio, jobTitle, name } from "@/data";
import "./globals.css";

const description = `${jobTitle} ${bio}`;

export const metadata: Metadata = {
  title: name,
  description,
  themeColor: "#fd55b6",
  twitter: {
    card: "summary_large_image",
    creator: "@Prateek88900",
    title: name,
    description,
    site: "",
  },
  openGraph: {
    title: name,
    description,
    siteName: "Pratik Mane",
    locale: "en-US",
    type: "website",
    url: "",
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
        <main className="w-full md:max-w-3xl md:mx-auto">{children}</main>
      </body>
    </html>
  );
}
