import React from "react";
// import { ErrorBoundary } from "react-error-boundary";

import Work from "../components/Work";
import Projects from "../components/Projects";
import ProfileCard from "../components/ProfileCard";
// import Leetcode from "./components/Leetcode";

export default async function Home() {
  return (
    <React.Fragment>
      {/* bio */}
      <ProfileCard />
      {/* work experience */}
      <Work />
      {/* projects */}
      <Projects />
      {/* leetcode */}
      {/* <ErrorBoundary
        fallback={
          <div className="my-5 text-center text-xs md:text-sm font-normal tracking-wide">
            Could not find leetcode problems
          </div>
        }
      >
        <Leetcode />
      </ErrorBoundary> */}
    </React.Fragment>
  );
}
