import { projects } from "@/data";
import { getGithubProfileUrl } from "@/utils";

import SectionTitle from "./SectionTitle";

function Projects() {
  return (
    <section id="projects" className="mb-16 px-4 w-full">
      <SectionTitle title="Projects" />
      <div className="w-full flex flex-col space-y-6">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="p-4 w-full flex flex-col bg-dracula-darker-800 rounded-md"
          >
            <h5 className="mb-2 text-lg font-medium text-dracula-dark-50">
              {project.name}
            </h5>
            <p className="mb-2 text-sm font-medium text-gray-300">
              {project.description}
            </p>

            <div className="flex flex-wrap space-x-2">
              {project.stack &&
                project.stack.split(",").map((t, jdx) => (
                  <span
                    key={jdx}
                    className="px-2 py-1.5 bg-dracula-dark-600 rounded text-xs text-white tracking-wide font-normal"
                  >
                    {t}
                  </span>
                ))}
            </div>

            <div className="mt-4 flex items-center space-x-3">
              {project.demoUrl && (
                <a
                  target="_blank"
                  rel="noopener norefferer"
                  className="text-gray-200 underline text-sm font-medium cursor-pointer"
                  href={project.demoUrl}
                >
                  Visit
                </a>
              )}
              {project?.repoName && (
                <a
                  target="_blank"
                  rel="noopener norefferer"
                  className="text-gray-200 underline text-sm font-medium cursor-pointer"
                  href={`${getGithubProfileUrl()}${project.repoName}`}
                >
                  View Code
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
