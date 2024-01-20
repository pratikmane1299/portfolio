import { NextResponse } from "next/server";

import { env } from "@/env.mjs";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const secret = request.headers.get("some-secret");

    if (!secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    if (env.SOME_SECRET_TOKEN !== secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const results: number = await prisma.postViews.count();

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ success: true, data: [] }, { status: 400 });
  }
}
