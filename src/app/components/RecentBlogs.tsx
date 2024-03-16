import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import SectionTitle from "./SectionTitle";
import { formatDate } from "@/utils";

export default async function RecentBlogs() {
	const recentBlogs = await getAllPosts({ limit: 4 });

	return (
		<section id="recent-blogs" className="mb-16 px-4 w-full">
			<div className="mb-4 md:mb-1 flex items-center justify-between gap-6">
				<SectionTitle title="Recent Blogs" marginBottom={false} />

				<Link
					href={"/blog"}
					className="group relative text-xs md:text-sm font-mediumb pb-0.5 after:absolute after:left-0 after:bottom-0 after:mt-1 after:h-[2px] after:w-0 after:block after:contents-[' '] after:h-[2px] after:bg-dracula-pink-400 hover:after:w-full after:transition-all after:duration-300 after:ease-linear"
				>
					View All
				</Link>

			</div>
			<div className="w-full flex flex-col">
				<div className="mt-5">
					{recentBlogs.length > 0 ? (
						<ul className="space-y-2">
							{recentBlogs.map((post, idx) => (
								<li key={idx} className="relative -mx-4 hover:bg-dracula-darker-800 hover:rounded-md cursor-pointer transition-all duration-500 ease-in-out before:content-['»'] before:absolute before:left-[15px] before:top-[47%] before:transform before:-translate-y-1/2 before:text-white">
									<Link href={`/blog/${post.slug}`} className="py-2 px-4 pl-8 text-xs md:text-sm font-medium flex justify-between items-center">
										{post.title}
										<time className="text-xs md:text-sm">{formatDate(post.updatedAt)}</time>
									</Link>
								</li>
							))}
						</ul>
					) : (
						<span>No blog recentBlogs found...</span>
					)}
				</div>

			</div>
		</section>
	)
}
