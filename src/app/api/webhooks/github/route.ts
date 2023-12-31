import { NextResponse } from 'next/server';
import * as crypto from "crypto";

import redis from '@/lib/redis';
import { env } from '@/env.mjs';
import { slugify } from '@/utils';
import { revalidatePath } from 'next/cache';

const WEBHOOK_SECRET = env.GITHUB_WEBHOOK_SECRET;

const verifySignature = (req: Request) => {
	const signature = crypto
		.createHmac("sha256", WEBHOOK_SECRET)
		.update(JSON.stringify(req.body))
		.digest("hex");

	const secretHash = req.headers.get("X-Hub-Signature-256") || '';

	let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
	let untrusted = Buffer.from(secretHash, 'ascii');

	return crypto.timingSafeEqual(trusted, untrusted);
};

export async function POST(request: Request) {
	if (!verifySignature(request)) {
		return NextResponse.json({ success: false, message: 'Invalid something' }, { status: 401 });
	}

	let keyExists: boolean | undefined = undefined;
	let valuesMatch: boolean | undefined = undefined;

	const payload = await request.json();

	const { action, issue, changes } = payload;

	if (!issue) return NextResponse.json({ success: false, message: 'No issue found' }, { status: 400 });

	const slug = slugify(issue?.title);
	if (!slug) return NextResponse.json({ success: false, message: 'No slug` found' }, { status: 400 });

	const keyFound = await redis.get(slug);

	if (typeof keyFound === 'number') {
		keyExists = true;
		valuesMatch = keyFound === issue?.number?.toString();
	} else {
		keyExists = false;
		valuesMatch = false;
	}

	if (action === 'deleted' && keyExists) {
		await redis.del(slug);
	} else if (keyExists && !valuesMatch) {
		await redis.set(slug, issue?.number);
	} else if (!keyExists) {
		await redis.set(slug, issue?.number);
	}

	if (action === 'edited') {
		const oldSlug = slugify(changes?.title?.from || '');
		if (oldSlug && slug !== oldSlug) {
			await redis.del(oldSlug);
		}
	}

	revalidatePath(`/blog/${slug}`);

	return NextResponse.json({ success: true });
}
