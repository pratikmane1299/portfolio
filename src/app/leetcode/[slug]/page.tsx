import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight/lib";

import { getAllLeetcodeProblemsSlug, getLeetcodeProblemBySlug } from "@/server";

import DifficultyTag from "@/app/components/DifficultyTag";
import { components } from "@/app/components/MDX";
import Tag from "@/app/components/Tag";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Views from "../views/components/Views";

import "highlight.js/styles/github-dark-dimmed.css";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const problem = await getLeetcodeProblemBySlug(slug);

  if (problem === null) return { title: "Leetcode problem not found." };

  return {
    title: problem.title,
    keywords: problem.tags.map((tag) => tag.tag.name).join(","),
  };
}

export async function generateStaticParams() {
  const problems = await getAllLeetcodeProblemsSlug();

  return problems.map((problem) => ({
    slug: problem.slug,
  }));
}

export default async function LeetcodeProblem({
  params: { slug },
}: {
  params: { slug: string };
}) {
  redirect('/');
  const problem = await getLeetcodeProblemBySlug(slug);

  if (problem === null) return notFound();

  return (
    <div className="px-4 flex flex-col">
      <div className="mt-10 mb-5 flex flex-col">
        <Breadcrumbs
          pages={[
            { label: "Home", href: "/" },
            { label: "Leetcode", href: "/leetcode" },
            { label: problem?.title || '', href: "" },
          ]}
        />

        <h1 className="text-lg font-medium sm:text-xl sm:font-semibold leading-8 tracking-wide">
          {`${problem?.number}. ${problem?.title}`}
        </h1>
      </div>
      <div className="mb-3 flex items-center space-x-2">
        <DifficultyTag
          color="green"
          difficulty={problem?.difficulty.level || ""}
        />

        <Views problemId={problem?.id || 0} />
      </div>

      <article className="my-5">
        <div className="leetcode-problem">
          <MDXRemote
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
            components={components}
            source={`${problem?.description} \n ${problem?.code}`}
          />
        </div>
      </article>

      <section className="mb-5">
        <span className="block mb-2 text-base font-medium">Related Tags</span>
        <div className="flex gap-2 flex-wrap">
          {problem?.tags.map((tag: any) => (
            <Tag key={tag?.tag.id} tag={tag?.tag?.name} />
          ))}
        </div>
      </section>
    </div>
  );
}
