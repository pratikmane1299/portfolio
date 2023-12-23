import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { slug: string } }) {
	const { slug } = params;

	try {
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
