import { NextResponse } from "next/server";

import { getPost } from "@/lib/blog";
import { identifier, ratelimit } from "@/lib/rate-limitter";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	const result = await ratelimit.limit(identifier);

	if (!result.success) {
		return NextResponse.json({ message: 'Slow down bud, you want to burn me or what ???' }, { status: 429 })
	}

	const post = getPost(slug);

	return NextResponse.json({ post })
}
