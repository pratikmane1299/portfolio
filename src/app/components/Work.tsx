import { calculateExperience, formatExperience } from "@/utils";
import { work } from "@/data";

import SectionTitle from "./SectionTitle";
import ExternalLink from "./ExternalLink";

function Work() {
  return (
    <section id="work" className="mb-16 px-4 w-full">
      <SectionTitle title="Work" />
      <div className="w-full flex flex-col">
        {work.map((exp, idx) => (
          <div
            key={idx}
            className="relative px-4 md:px-6 w-full grid grid-cols-[90px_1fr] md:grid-cols-[150px_1fr]"
          >
            <div className="w-full pr-4 md:pr-6 flex flex-col items-end justify-center">
              <span className="text-xs md:text-sm font-semibold text-secondary-foreground">
                {exp?.present
                  ? "Present"
                  : exp.end && formatExperience(exp.end)}
              </span>
              <span className="text-xs md:text-sm font-semibold text-secondary-foreground">
                {formatExperience(exp.start)}
              </span>
              <span className="text-xs font-medium text-muted-foreground">{`(${calculateExperience(
                exp.start,
                exp?.end || new Date().toDateString()
              )})`}</span>
            </div>
            <div className="relative w-full">
              <div className="h-2 w-2 absolute top-1/2 -left-1 transform -translate-y-1/2 bg-gray-200 rounded-full"></div>
              <div className="pl-4 md:pl-6 pb-4 w-full flex flex-col border-l border-dracula-darker-800">
                <h5 className="mb-1 text-base md:text-lg font-semibold text-secondary-foreground">
                  {exp.title}
                </h5>
                <div className="flex flex-col md:flex-row md:items-center">
                  <ExternalLink
                    href={exp.orgUrl}
                    className="mb-2 md:mb-0 inline-block w-fit "
                  >
                    {exp.org}
                  </ExternalLink>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span className="mr-1 md:mx-2 inline-block top-1/2 transform -translate-y-1/2 h-1 w-1 rounded-full bg-gray-400"></span>
                    <span>Mumbai, India</span>
                  </div>
                </div>
                <p className="mt-2 text-gray-300 text-xs md:text-sm font-medium leading-6 text-muted-foreground">
                  {exp.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Work;
