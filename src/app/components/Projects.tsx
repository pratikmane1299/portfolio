import { projects } from "@/data";
import { getGithubProfileUrl } from "@/utils";

import SectionTitle from "./SectionTitle";
import Tag from "./Tag";
import ExternalLink from "./ExternalLink";
import { Badge } from "@/components/ui/badge";

function Projects() {
  return (
    <section id="projects" className="mb-16 px-4 w-full">
      <SectionTitle title="Projects" />
      <div className="w-full flex flex-col space-y-4 md:space-y-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="p-4 w-full flex flex-col bg-secondary rounded-md"
          >
            <h5 className="mb-1 md:mb-2 text-base md:text-lg font-medium text-secondary-foreground">
              {project.name}
            </h5>
            <p className="mb-1 md:mb-2 text-xs md:text-sm font-medium text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-2 md:mt-4 flex flex-wrap gap-2">
              {project.stack &&
                project.stack
                  .split(",")
                  .map((tag, jdx) => <Badge key={jdx}>
                    {tag}
                  </Badge>)}
            </div>

            <div className="mt-2 md:mt-4 flex items-center space-x-3">
              {project.demoUrl && (
                <ExternalLink
                  href={project.demoUrl}
                  data-umami-event="Visit project"
                  data-umami-event-project={project.name}
                >
                  Visit
                </ExternalLink>
              )}
              {project.demoUrl && project?.repoName && (
                <span className="mr-1 md:mx-2 inline-block top-1/2 transform -translate-y-1/2 h-1 w-1 rounded-full bg-gray-400"></span>
              )}
              {project?.repoName && (
                <ExternalLink
                  href={`${getGithubProfileUrl()}${project.repoName}`}
                  data-umami-event="View project code"
                  data-umami-event-project={project.name}
                >
                  View code
                </ExternalLink>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
