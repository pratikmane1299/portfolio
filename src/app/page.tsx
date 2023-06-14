import { Mulish } from "next/font/google";

import { getRecentLeetcodeProblems } from "@/server";

import Navbar from "./components/Navbar";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ProfileCard from "./components/ProfileCard";
import Leetcode from "./components/Leetcode";

const mulish = Mulish({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default async function Home() {
	const problems = await getRecentLeetcodeProblems();

  return (
    <main className="flex min-h-screen flex-col" style={mulish.style}>
      <header>
        <Navbar />
      </header>

      {/* bio */}
      <ProfileCard />

      {/* work experience */}
      <Work />

      {/* projects */}
      <Projects />

      {/* leetcode */}
      <Leetcode problems={problems} />

      {/* footer */}
      <Footer />
    </main>
  );
}
