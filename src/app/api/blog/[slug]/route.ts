import { NextResponse } from "next/server";

import { getPostBySlug } from "@/lib/blog";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	const post = getPostBySlug(slug);

	return NextResponse.json({ post })
}
