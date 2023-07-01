import React from "react";
import { Metadata } from "next";

import { getAllDifficulty, getAllTagsForFilter } from "@/server";

import LeetcodeProblemsTable from "./components/LeetcodeProblemsTable";
import LeetcodeFilters from "./components/LeetcodeFilters";
import LeetcodeProblemsTableSkeleton from "./components/LeetcodeProblemsTableSkeleton";

export const metadata: Metadata = {
  title: "Leetcode problems",
  description: "All the leatcode problems solved by me.",
};

export default async function Leetcode({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const difficulties = await getAllDifficulty();
  const tags = await getAllTagsForFilter();

  return (
    <div className="mb-16 flex flex-col ">
      <section className="px-4 w-full">
        <h1 className="text-xl font-semibold leading-6 tracking-wide">
          Leetcode Problems
        </h1>

        <div className="mt-5">
          <LeetcodeFilters tags={tags} difficulties={difficulties} />

          {/* streaming problems table */}
          <React.Suspense fallback={<LeetcodeProblemsTableSkeleton />}>
            <LeetcodeProblemsTable searchParams={searchParams} />
          </React.Suspense>
        </div>
      </section>
    </div>
  );
}
