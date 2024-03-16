import Link from 'next/link';

import { formatDate } from "@/utils";
import { getAllPosts } from "@/lib/blog";

const blogTitle = 'Pratik Mane\'s Blog';

export const metadata: Metadata = {
	title: blogTitle,
	alternates: {
		canonical: "/blog",
	},
	openGraph: {
		title: blogTitle,
	},
	twitter: {
		title: blogTitle,
	},
};

import Breadcrumbs from "../../components/Breadcrumbs";
import { Metadata } from 'next';
import PostsList from '@/app/components/PostsList';

export const revalidate = 86400;

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

			<div className='mt-5'>
				<PostsList posts={posts} />
			</div>
		</section>
	</div>
}
