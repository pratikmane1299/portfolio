import React, { use } from "react";
import Link from "next/link";

import { getDifficultyColor } from "@/utils";
import { getLeetcodeProblems } from "@/server";

import DifficultyTag from "@/app/components/DifficultyTag";
import Tag from "@/app/components/Tag";
import Pagination from "@/app/components/Pagination";
import NotFoundIcon from "../../components/404Icon";

export default function LeetcodeProblemsTable({
  searchParams,
}: {
  searchParams: any;
}) {
  const { total, problems } = use(getLeetcodeProblems(searchParams));

  return (
    <div className="mt-10">
      <div className="min-w-full overflow-x-auto rounded-md ring-1 ring-gray-500 ">
        <table className="w-full">
          <thead className="border-b border-gray-500 ">
            <tr className="divide-x divide-gray-500">
              <th className="w-[60px] py-2 px-3 text-center">
                <span className="text-sm md:text-base font-medium">Number</span>
              </th>
              <th className="py-2 px-3 text-left">
                <span className="text-sm md:text-base font-medium">Name</span>
              </th>
              <th className="w-[80px] py-2 px-3 text-left">
                <span className="text-sm md:text-base font-medium">
                  Difficulty
                </span>
              </th>
              <th className="py-2 px-3 text-left">
                <span className="text-sm md:text-base font-medium">Tags</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-500">
            {problems.length > 0 &&
              problems.map((problem) => (
                <tr key={problem.id} className="divide-x divide-gray-500">
                  <td className="py-2 px-3 text-center">
                    <div className="min-w-[60px] w-full">
                      <Link
                        href="/"
                        className="group relative text-xs md:text-sm font-mediumb pb-0.5 after:absolute after:left-0 after:bottom-0 after:mt-1 after:h-[2px] after:w-0 after:block after:contents-[' '] after:h-[2px] after:bg-dracula-pink-400 hover:after:w-full after:transition-all after:duration-300 after:ease-linear"
                      >
                        #{problem.number}
                      </Link>
                    </div>
                  </td>
                  <td className="min-w-[200px] w-full py-2 px-3">
                    <Link
                      className="text-xs md:text-sm font-normal tracking-wide leading-4"
                      href={`/leetcode/${problem.slug}`}
                    >
                      {problem.title}
                    </Link>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <DifficultyTag
                      color={getDifficultyColor(problem.difficulty.level)}
                      difficulty={problem.difficulty.level}
                    />
                  </td>
                  <td className="py-2 px-3">
                    <div className="min-w-[250px] w-full inline-flex flex-wrap gap-2">
                      {problem.tags.length > 0 &&
                        problem.tags.map((tag) => (
                          <Tag key={tag.tag.id} tag={tag.tag.name} />
                        ))}
                    </div>
                  </td>
                </tr>
              ))}

            {problems.length === 0 && (
              <tr className="divide-x divide-gray-500">
                <td colSpan={4} className="py-2 px-3">
                  <div className="py-10 flex items-center justify-center">
                    <div className="flex flex-col">
                      <NotFoundIcon />
                      <span className="text-xs font-medium">
                        No problems found, matching selected filters.
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex justify-center md:justify-end">
        <Pagination
          page={Number(searchParams.page) || 1}
          pageSize={25}
          total={total}
          urlPrefix="/leetcode"
        />
      </div>
    </div>
  );
}
