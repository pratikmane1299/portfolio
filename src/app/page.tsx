import React from "react";

import { getRecentLeetcodeProblems } from "@/server";

import Work from "./components/Work";
import Projects from "./components/Projects";
import ProfileCard from "./components/ProfileCard";
import Leetcode from "./components/Leetcode";

export default async function Home() {
  const problems = await getRecentLeetcodeProblems();

  return (
    <React.Fragment>
      {/* bio */}
      <ProfileCard />
      {/* work experience */}
      <Work />
      {/* projects */}
      <Projects />
      {/* leetcode */}
      <Leetcode problems={problems} />
    </React.Fragment>
  );
}
