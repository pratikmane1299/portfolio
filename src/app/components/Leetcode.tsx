import { LeetCodeProblemWidgetType } from "@/types";

import SectionTitle from "./SectionTitle";

type LeetCodeWidgetPropsType = {
  problems: LeetCodeProblemWidgetType[];
};

export default function Leetcode({ problems }: LeetCodeWidgetPropsType) {
  return (
    <section id="leetcode" className="mb-16 px-4 w-full">
      <SectionTitle title="Recently solved leetcode problems" />
      <div className="w-full flex flex-col space-y-2">
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="-mx-4 px-4 py-2 flex justify-between items-center hover:bg-dracula-darker-800 hover:rounded-md cursor-pointer transition-all duration-500 ease-in-out"
          >
            <h6 className="text-sm md:text-base font-medium text-dracula-dark-50">
              <span className="mr-1 text-xs md:text-sm">{problem.number}.</span>
              {problem.title}
            </h6>
          </div>
        ))}
      </div>
    </section>
  );
}
