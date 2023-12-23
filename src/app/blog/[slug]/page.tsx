import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation';
import readingDuration from 'reading-duration';

import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { classNames } from '@/utils';

import Breadcrumbs from '@/app/components/Breadcrumbs';
import "highlight.js/styles/github-dark-dimmed.css";
import PostViews from './_components/Views';

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
			openGraph: {
				images: [`${process.env.SITE_URL}/api/og?title=${post.title}&date=${post.updatedAt}`],
				type: 'article',
				authors: ['Pratik Mane'],
			},
			alternates: {
				canonical: `${process.env.SITE_URL}/blog/${post.title}`,
			},
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
		</div>
		<div className='mb-5'>
			<h1 className='mb-1 md:mb-3 text-4xl font-semibold sm:text-5xl sm:font-bold leading-8 tracking-wide'>{post.title}</h1>
			<div>
				<span className='text-xs md:text-sm'>Published on: {new Date(post.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: '2-digit' })}</span>
				{' '}|{' '}<span className='text-xs md:text-sm'>{readingDuration(post.content, { wordsPerMinute: 150, emoji: false })}</span>
				{' '}|<PostViews slug={params.slug} />
			</div>

			{post.description && (
				<div className="mt-5 flex items-center space-x-2">
					<p className='mt-3 text-sm md:text-base '>{post.description.split('.')[0]}.</p>
				</div>
			)}
		</div>
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
