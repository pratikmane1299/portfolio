import React from "react";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

import { getAllDifficulty, getAllTagsForFilter } from "@/server";
import { DifficultType, TagType } from "@/types";

import LeetcodeProblemsTable from "./components/LeetcodeProblemsTable";
import LeetcodeFilters from "./components/LeetcodeFilters";
import LeetcodeProblemsTableSkeleton from "./components/LeetcodeProblemsTableSkeleton";
import Breadcrumbs from "../../components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Leetcode problems",
  description: "All the leatcode problems solved by me.",
};

export default async function Leetcode({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  redirect('/');

  const difficulties: DifficultType[] = await getAllDifficulty();
  const tags: TagType[] = await getAllTagsForFilter();

  return (
    <div className="my-10 flex flex-col ">
      <section className="px-4 w-full">
        <Breadcrumbs
          pages={[
            { label: "Home", href: "/" },
            { label: "Leetcode", href: "" },
          ]}
        />
        <h1 className="text-lg md:text-xl font-semibold leading-6 tracking-wide">
          Leetcode Problems
        </h1>

        <div className="mt-5">
          <React.Suspense fallback={<div>placeholder</div>}>
            <LeetcodeFilters tags={tags} difficulties={difficulties} />
          </React.Suspense>

          {/* streaming problems table */}
          <React.Suspense fallback={<LeetcodeProblemsTableSkeleton />}>
            <LeetcodeProblemsTable searchParams={searchParams} />
          </React.Suspense>
        </div>
      </section>
    </div>
  );
}
