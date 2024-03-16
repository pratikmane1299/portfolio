import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight/lib";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { slugify } from "@/utils";
import { BlogFrontMatterType, BlogPostType, GithubIssueType } from "@/types";
import { components } from "@/app/components/MDX";
import { githubUser, repo } from "@/data";
import { env } from "@/env.mjs";
import redis from "./redis";

async function parseIssue(issue: GithubIssueType): Promise<BlogPostType> {
  const { content, frontmatter } = await compileMDX<BlogFrontMatterType>({
    source: issue.body,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeHighlight,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { class: "no-underline" } },
          ],
        ],
      },
    },
    components: components,
  });

  let slug,
    title = issue?.title ?? frontmatter.title,
    description = frontmatter?.description || "";
  if (frontmatter.slug) {
    slug = frontmatter.slug;
  } else {
    slug = slugify(title);
  }

  let tags: string[] = [];
  if (frontmatter.tags)
    tags = Array.isArray(frontmatter.tags)
      ? frontmatter.tags
      : frontmatter.tags.split(",").map((x) => x.trim());

  const { url, total_count, ...emojis } = issue.reactions;

  return {
    frontmatter,
    title,
    description,
    issueNumber: issue.number,
    tags,
    content: issue.body,
    compiledContent: content,
    slug,
    user: {
      login: issue.user.login,
      id: issue.user.id,
      avatarUrl: issue.user.avatar_url,
    },
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    reactions: {
      url: issue?.html_url,
      total_count,
      emojis: { ...emojis },
    },
  };
}

export async function getAllPosts(options?: {limit: number}) {
  try {
    const {limit = 10} = options || {};
    const blogPosts: BlogPostType[] = [];
    const res = await fetch(
      `${env.GITHUB_API_BASE_URL}/repos/${githubUser}/${repo}/issues?creator=${githubUser}&state=all`,
      {
        cache: "no-store",
        method: "GET",
        headers: { Authorization: env.GITHUB_TOKEN || "" },
      }
    );
    const issues: GithubIssueType[] = await res.json();

    if (Array.isArray(issues) && issues.length > 0) {
      for (let i = 0; i < issues.length; i++) {
        const issue = issues[i];

        const isPublished = issue.labels?.find(
          (label: any) => label.name?.toLowerCase() === "published"
        );

        const isIssue = !Object.hasOwn(issue, "pull_request");

        if (issue.user?.login === githubUser && isIssue && isPublished) {
          const parsedIssue = await parseIssue(issue);
          blogPosts.push(parsedIssue);
        }
      }
    }
    return blogPosts.slice(0, limit);
  } catch (error) {
    console.log("error - ", error);
    return [];
  }
}

export async function getPost(slug: string) {
  let post: BlogPostType | null = null;
  try {
    const issueNumber = await redis.get(slug);

    if (issueNumber !== null) {
      const res = await fetch(
        `${env.GITHUB_API_BASE_URL}/repos/${githubUser}/${repo}/issues/${issueNumber}`,
        { headers: { Authorization: env.GITHUB_TOKEN || "" } }
      );
      if (res.ok) {
        const issue = await res.json();

        const isPublished = issue.labels?.find(
          (label: any) => label.name?.toLowerCase() === "published"
        );

        if (issue.user?.login === githubUser && isPublished) {
          post = await parseIssue(issue);
        }
      }
    }
  } catch (error) {
    post = null;
  }
  return post;
}
