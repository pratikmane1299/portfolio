import { Metadata } from "next";

import {
  getAllDifficulty,
  getAllTagsForFilter,
  getLeetcodeProblems,
} from "@/server";

import LeetcodeProblemsTable from "./components/LeetcodeProblemsTable";
import Pagination from "../components/Pagination";
import LeetcodeFilters from "./components/LeetcodeFilters";

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
  const { total, problems } = await getLeetcodeProblems(searchParams);

  return (
    <div className="mb-16 flex flex-col ">
      <section className="px-4 w-full">
        <h1 className="text-xl font-semibold leading-6 tracking-wide">
          Leetcode Problems
        </h1>

        <div className="mt-5">
          <LeetcodeFilters tags={tags} difficulties={difficulties} />

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
