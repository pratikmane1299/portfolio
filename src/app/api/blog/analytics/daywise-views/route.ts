import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { env } from "@/env.mjs";

type DayWiseBlogViewsQueryType = {
  views: number;
  date: string;
};

export async function GET(request: Request) {
  try {
    const secret = request.headers.get("some-secret");

    if (!secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    if (env.SOME_SECRET_TOKEN !== secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const results = await prisma.$queryRaw<
      DayWiseBlogViewsQueryType[]
    >`SELECT date(created_at) as date, count(views)::int as views from "PostViews" GROUP BY date ORDER BY date`;

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ success: true, data: [] }, { status: 400 });
  }
}
