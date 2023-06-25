import Link from "next/link";
import { Metadata } from "next";

import {
  getAllDifficulty,
  getAllTagsForFilter,
  getLeetcodeProblems,
} from "@/server";

import LeetcodeProblemsTable from "../components/LeetcodeProblemsTable";
import Tag from "../components/Tag";
import Pagination from "../components/Pagination";

export const metadata: Metadata = {
  title: 'Leetcode problems',
  description: 'All the leatcode problems solved by me.',
}

export default async function Leetcode({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const difficulties = await getAllDifficulty();
  const tags = await getAllTagsForFilter();
  const { total, problems } = await getLeetcodeProblems(searchParams);

  return (
    <div className="mb-16 flex flex-col ">
      <section className="px-4 w-full">
        <h1 className="text-xl font-semibold leading-6 tracking-wide">
          Leetcode Problems
        </h1>

        <div className="mt-5">
          <div>
            <input
              type="search"
              placeholder="Search problems via name..."
              className="w-full px-2.5 py-1.5 text-sm font-normal text-gray-800 rounded-md outline-none border border-gray-500 focus:ring-1 focus:ring-dracula-pink-400 focus:border-dracula-pink-400"
            />
            <div className="mt-3 flex items-center gap-6">
              <span className="text-sm font-normal">Difficulty:</span>
              <div className="flex-1 flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <Link key={difficulty.id} href={`/leetcode`}>
                    <Tag tag={difficulty.level} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-6">
              <span className="text-sm font-normal">Tags:</span>
              <div className="flex-1 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link key={tag.id} href={"/leetcode"}>
                    <Tag tag={tag.name} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <LeetcodeProblemsTable problems={problems} />
          </div>
          <div className="mt-5 flex justify-end">
            <Pagination
              page={Number(searchParams.page) || 1}
              pageSize={25}
              total={total}
              urlPrefix="/leetcode"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
