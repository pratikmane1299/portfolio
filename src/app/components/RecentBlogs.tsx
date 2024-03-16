import Link from "next/link";

import { getAllPosts } from "@/lib/blog";

import SectionTitle from "./SectionTitle";
import PostsList from "./PostsList";

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
			<div className="mt-5">
				<PostsList posts={recentBlogs} />
			</div>
		</section>
	)
}
