import { bio, jobTitle, name } from "@/data";
import "./globals.css";

const description = `${jobTitle} ${bio}`;

export const metadata = {
  title: name,
  description,
  twitter: {
    title: name,
    description,
  },
  openGraph: {
    title: name,
    description,
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
