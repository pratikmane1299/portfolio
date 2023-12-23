import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { classNames } from '@/utils';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import "highlight.js/styles/github-dark-dimmed.css";

async function getPostData(slug: string) {
	const [postList, post] = await Promise.all([getAllPosts(), getPostBySlug(slug)]);

	return { postList, post };
}

type Props = {
	params: { slug: string }
	searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const slug = params.slug;

	const { post } = await getPostData(slug);

	if (post) {
		return {
			title: post.title,
			...(post.description ? { description: post.description } : {}),
		};
	}

	return { title: 'Post not found.' }
}

export async function generateStaticParams() {
	const allBlogPosts = await getAllPosts();

	return allBlogPosts.map((post: any) => ({
		slug: post.slug,
	}));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
	const { post } = await getPostData(params.slug);

	if (!post) notFound();

	return <div className='px-4 flex flex-col'>
		<div className='mt-10 mb-5 flex flex-col'>
			<Breadcrumbs pages={[
				{ label: 'Home', href: '/' },
				{ label: 'Blog', href: "/blog" },
				{ label: post.title, href: `/${post.slug}` }
			]}
			/>
			<h1 className='text-3xl font-medium sm:text-4xl sm:font-semibold leading-8 tracking-wide'>{post.title}</h1>
		</div>
		{post.description && (
			<div className="mb-3 flex items-center space-x-2">
				<span>{post.description}</span>
			</div>
		)}
		<article className="max-w-full prose prose-sm lg:prose-md 2xl:prose-lg prose-slate !prose-invert my-5">
			{post.compiledContent}
		</article>

		<section className="mb-5">
			<span className="block mb-2 text-base font-medium">Related Tags</span>
			<div className="flex gap-2 flex-wrap">
				{post?.tags.map((tag, idx: number) => (
					<span
						key={idx}
						className={classNames(
							"px-1.5 py-1 md:px-2 md:py-1.5 rounded md:rounded-md text-xs text-white tracking-wide font-normal",
							'bg-dracula-dark-600 hover:bg-dracula-darker-700')}
					>
						{tag}
					</span>
				))}
			</div>
		</section>
	</div>
}
