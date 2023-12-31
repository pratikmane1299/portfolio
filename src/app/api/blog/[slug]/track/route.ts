import prisma from "@/lib/prisma";
import { identifier, ratelimit } from "@/lib/rate-limitter";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	try {
		const result = await ratelimit.limit(identifier);

		if (!result.success) {
			return NextResponse.json({ message: 'Slow down bud, you want to burn me or what ???' }, { status: 429 })
		}

		await prisma.postViews.create({
			data: {
				slug,
				views: 1
			}
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.log('error - ', error);
		
		return NextResponse.json({ success: false, message: "could not track post", })
	}
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	try {
		const result = await ratelimit.limit(identifier);

		if (!result.success) {
			return NextResponse.json({ message: 'Slow down bud, you want to burn me or what ???' }, { status: 429 })
		}

		const views = await prisma.postViews.aggregate({
			_count: {
				views: true,
			},
			where: {
				slug,
			},
		});

		return NextResponse.json({ success: true, views });
	} catch (error) {
		console.log('error - ', error);
		return NextResponse.json({ success: false, message: 'post not found' });
	}
}
