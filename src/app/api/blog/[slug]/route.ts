import { NextResponse } from "next/server";

import { getPost } from "@/lib/blog";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	const post = getPost(slug);

	return NextResponse.json({ post })
}
