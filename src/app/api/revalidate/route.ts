import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { env } from '@/env.mjs';

export async function GET(request: NextRequest) {
	const path = request.nextUrl.searchParams.get('path');
	const secret = request.nextUrl.searchParams.get('secret');

	if (secret !== env.REVALIDATE_SECRET_TOKEN) {
		return NextResponse.json({
			success: false,
			message: 'You are not me. Don\'t try this again.'
		});
	}

	if (path) {
		revalidatePath(path)
		return NextResponse.json({ success: true, revalidated: true, now: Date.now() });
	}

	return NextResponse.json({
		success: false,
		revalidated: false,
		now: Date.now(),
		message: 'Missing path to revalidate',
	});
}
