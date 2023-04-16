import { Mulish } from "next/font/google";

const mulish = Mulish({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col" style={mulish.style}>
      hello world !!!
    </main>
  );
}
