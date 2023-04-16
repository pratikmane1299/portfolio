import './globals.css'

export const metadata = {
  title: "Pratik Mane",
  description: "Hey there, I'm Pratik, a software Engineer at MakeStories. ",
  twitter: {
    title: "Pratik Mane",
    description: "Hey there, I'm Pratik, a software Engineer at MakeStories. ",
  },
  openGraph: {
    title: "Pratik Mane",
    description: "Hey there, I'm Pratik, a software Engineer at MakeStories. ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="w-full md:max-w-3xl md:mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
