import Link from 'next/link';

import { formatDate } from "@/utils";
import { BlogPostType } from "@/types";
import { getAllPosts } from "@/lib/blog";

import Breadcrumbs from "../components/Breadcrumbs";

export default async function Blog() {

	const posts = await getAllPosts();

	return <div className="my-10">
		<section className="px-4 w-full">
			<Breadcrumbs
				pages={[
					{ label: "Home", href: "/" },
					{ label: "Blog", href: "/blog" },
				]}
			/>
			<h1 className="text-lg md:text-xl font-semibold leading-6 tracking-wide">
				Blog
			</h1>

			<div className="mt-5">
				{posts.length > 0 ? (
					<ul className="space-y-2">
						{posts.map((post, idx) => (
							<li key={idx} className="relative -mx-4 hover:bg-dracula-darker-800 hover:rounded-md cursor-pointer transition-all duration-500 ease-in-out before:content-['»'] before:absolute before:left-[15px] before:top-[47%] before:transform before:-translate-y-1/2 before:text-white">
								<Link href={`/blog/${post.slug}`} className="py-2 px-4 pl-8 text-xs md:text-sm font-medium flex justify-between items-center">
									{post.title}
									<time className="text-xs md:text-sm">{formatDate(post.createdAt)}</time>
								</Link>
							</li>
						))}
					</ul>
				) : (
					<span>No blog posts found...</span>
				)}
			</div>
		</section>
	</div>
}
