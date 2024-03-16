import Link from "next/link";

import { BlogPostType } from "@/types"
import { formatDate } from "@/utils";

type PostsListPropsType = {
	posts: BlogPostType[];
}
export default function PostsList({ posts }: PostsListPropsType) {
	return (
		<div>
			{posts.length > 0 ? (
				<ul className="space-y-2">
					{posts.map((post, idx) => (
						<li key={idx} className="relative -mx-4 hover:bg-dracula-darker-800 hover:rounded-md cursor-pointer transition-all duration-500 ease-in-out before:content-['»'] before:absolute before:left-[15px] before:top-[47%] before:transform before:-translate-y-1/2 before:text-white">
							<Link href={`/blog/${post.slug}`} className="py-2 px-4 pl-8 text-xs md:text-sm font-medium flex justify-between items-center">
								{post.title}
								<time className="text-xs md:text-sm">{formatDate(post.updatedAt)}</time>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<span>No blog posts found...</span>
			)}
		</div>
	)
}