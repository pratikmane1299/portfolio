import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight/lib';

import { slugify } from "@/utils";
import { BlogFrontMatterType, BlogPostType, GithubIssueType } from '@/types';
import { components } from '@/app/components/MDX';
import { githubUser, issuesUrl } from '@/data';

const blogPosts: BlogPostType[] = [];

export async function getAllPosts() {
	if (blogPosts.length === 0) {
		const res = await fetch(issuesUrl, { cache: 'no-store' })
		const issues: GithubIssueType[] = await res.json();

		if (Array.isArray(issues) && issues.length > 0) {
			for (let i = 0; i < issues.length; i++) {
				const issue = issues[i];

				const isPublished = issue.labels?.find((label: any) => label.name?.toLowerCase() === 'published');
				if (issue.user?.login === githubUser && isPublished) {
					const { content, frontmatter } = await compileMDX<BlogFrontMatterType>({
						source: issue.body,
						options: {
							parseFrontmatter: true, mdxOptions: {
								remarkPlugins: [remarkGfm],
								rehypePlugins: [rehypeHighlight],
							},
						},
						components: components,
					});

					let slug, title = issue?.title ?? frontmatter.title;
					if (frontmatter.slug) {
						slug = frontmatter.slug;
					} else {
						slug = slugify(title);
					}

					let tags: string[] = [];
					if (frontmatter.tags)
						tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : frontmatter.tags.split(',').map(x => x.trim());

					blogPosts.push({
						frontmatter,
						title,
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
					});
				}
				
			}
		}
	}
	return blogPosts;
}

export function getPostBySlug(slug: string) {
	return blogPosts.find((post: any) => post.slug === slug);
}