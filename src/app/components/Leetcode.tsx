import React from "react";
import Link from "next/link";

import { getRecentLeetcodeProblems } from "@/server";

import SectionTitle from "./SectionTitle";

export default function Leetcode() {
  const problems = React.use(getRecentLeetcodeProblems());

  return (
    <React.Suspense
      fallback={
        <div className="mb-16 px-4 flex flex-col animate-pulse">
          <div className="h-4 bg-slate-500 rounded w-64"></div>

          <div className="mt-10 space-y-8">
            {new Array(10).fill("").map((_, idx) => (
              <div
                key={idx}
                className="h-2.5 w-[75%] bg-slate-500 rounded"
              ></div>
            ))}
          </div>
        </div>
      }
    >
      <section id="leetcode" className="mb-16 px-4 w-full">
        <div className="mb-4 md:mb-6 flex items-center justify-between gap-6">
          <SectionTitle
            marginBottom={false}
            title="Recently solved leetcode problems"
            className="max-w-[80%]"
          />

          <Link
            href="/leetcode"
            className="group relative text-xs md:text-sm font-mediumb pb-0.5 after:absolute after:left-0 after:bottom-0 after:mt-1 after:h-[2px] after:w-0 after:block after:contents-[' '] after:h-[2px] after:bg-dracula-pink-400 hover:after:w-full after:transition-all after:duration-300 after:ease-linear"
          >
            View All
          </Link>
        </div>
        <div className="w-full flex flex-col space-y-2">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="-mx-4 px-4 py-2 flex justify-between items-center hover:bg-dracula-darker-800 hover:rounded-md cursor-pointer transition-all duration-500 ease-in-out"
            >
              <h6 className="text-sm md:text-base font-medium text-dracula-dark-50">
                <span className="mr-1 text-xs md:text-sm">
                  {problem.number}.
                </span>
                {problem.title}
              </h6>
            </div>
          ))}
        </div>
      </section>
    </React.Suspense>
  );
}
