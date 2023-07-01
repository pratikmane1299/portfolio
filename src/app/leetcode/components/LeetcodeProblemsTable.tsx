import React, { use } from "react";
import Link from "next/link";

import { getDifficultyColor } from "@/utils";
import { getLeetcodeProblems } from "@/server";

import DifficultyTag from "@/app/components/DifficultyTag";
import Tag from "@/app/components/Tag";
import Pagination from "@/app/components/Pagination";

export default function LeetcodeProblemsTable({
  searchParams,
}: {
  searchParams: any;
}) {
  const { total, problems } = use(getLeetcodeProblems(searchParams));

  return (
    <div className="mt-10">
      <table className="w-full rounded-md overflow-hidden ring-1 ring-gray-500">
        <thead className="border-b border-gray-500">
          <tr className="divide-x divide-gray-500">
            <th className="py-2 px-3 text-center">
              <span className="text-base font-medium">Number</span>
            </th>
            <th className="py-2 px-3 text-left">
              <span className="text-base font-medium">Name</span>
            </th>
            <th className="py-2 px-3 text-left">
              <span className="text-base font-medium">Difficulty</span>
            </th>
            <th className="py-2 px-3 text-left">
              <span className="text-base font-medium">Tags</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-500">
          {problems.map((problem) => (
            <tr key={problem.id} className="divide-x divide-gray-500">
              <td className="py-2 px-3 text-center">
                <div className="min-w-[60px] w-full">
                  <Link
                    href="/"
                    className="group relative text-sm font-mediumb pb-0.5 after:absolute after:left-0 after:bottom-0 after:mt-1 after:h-[2px] after:w-0 after:block after:contents-[' '] after:h-[2px] after:bg-dracula-pink-400 hover:after:w-full after:transition-all after:duration-300 after:ease-linear"
                  >
                    #{problem.number}
                  </Link>
                </div>
              </td>
              <td className="py-2 px-3">
                <span className="text-sm font-normal tracking-wide leading-4">
                  {problem.title}
                </span>
              </td>
              <td className="py-2 px-3 text-center">
                <DifficultyTag
                  color={getDifficultyColor(problem.difficulty.level)}
                  difficulty={problem.difficulty.level}
                />
              </td>
              <td className="py-2 px-3">
                <div className="inline-flex flex-wrap gap-2">
                  {problem.tags.length > 0 &&
                    problem.tags.map((tag: any) => (
                      <Tag key={tag.tag.id} tag={tag.tag.name} />
                    ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex justify-end">
        <Pagination
          page={searchParams.page || 1}
          pageSize={25}
          total={total}
          urlPrefix="/leetcode"
        />
      </div>
    </div>
  );
}
