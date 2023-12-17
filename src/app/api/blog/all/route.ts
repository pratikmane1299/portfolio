import { NextResponse } from "next/server";

import { getAllPosts } from "@/lib/blog";

export async function GET(request: Request) {

	try {
		const blogPosts: any[] = await getAllPosts();

		return NextResponse.json({ blogPosts });
	} catch (error) {
		console.log('error');
	}
};
