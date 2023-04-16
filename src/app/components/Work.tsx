import { calculateExperience, formatExperience } from "@/utils";
import { work } from "@/data";

import SectionTitle from "./SectionTitle";

function Work() {
  return (
    <section id="work" className="mb-16 px-4 w-full">
      <SectionTitle title="Work" />
      <div className="w-full flex flex-col">
        {work.map((exp, idx) => (
          <div
            key={idx}
            className="relative px-6 w-full grid grid-cols-[150px_1fr]"
          >
            <div className="px-6 flex flex-col items-end justify-center">
              <span className="text-sm font-semibold">
                {exp?.present
                  ? "Present"
                  : exp.end && formatExperience(exp.end)}
              </span>
              <span className="text-sm font-semibold">
                {formatExperience(exp.start)}
              </span>
              <span className="text-xs font-medium text-gray-300">{`(${calculateExperience(
                exp.start,
                exp?.end || new Date().toDateString()
              )})`}</span>
            </div>
            <div className="relative ">
              <div className="h-2 w-2 absolute top-1/2 -left-1 transform -translate-y-1/2 bg-gray-200 rounded-full"></div>
              <div className="px-6 pb-4 w-full flex flex-col border-l border-dracula-darker-800">
                <h5 className="text-lg font-semibold text-dracula-dark-50">
                  {exp.title}
                </h5>
                <div className="flex items-center">
                  <a
                    target="_blank"
                    rel="noopener norefferer"
                    href={exp.orgUrl}
                    className="inline-block w-fit text-sm font-medium text-dracula-pink-400 border-b border-transparent hover:border-dracula-pink-400"
                  >
                    {exp.org}
                  </a>
                  <span className="mx-2 inline-block top-1/2 transform -translate-y-1/2 h-1 w-1 rounded-full bg-gray-400"></span>
                  <span className="relative ">Mumbai, India</span>
                </div>
								<p className="mt-2 text-gray-300 text-sm font-medium tracking-wide leading-6">{exp.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;
