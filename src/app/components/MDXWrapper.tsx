import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight/lib";

import { components } from "./MDX";

type MDXWrapperPropsType = {
	source: string;
}

export default function MDXWrapper({ source }: MDXWrapperPropsType) {
	return <MDXRemote
		options={{
			mdxOptions: {
				remarkPlugins: [remarkGfm],
				rehypePlugins: [rehypeHighlight],
			},
		}}
		components={components}
		source={source}
	/>
}