import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { env } from "@/env.mjs";
import { DatesFilterType, datesEnum } from "@/types";
import { getToDateAndFromDateFromDateFilter } from "@/utils";

type DayWiseBlogViewsQueryType = {
  views: number;
  date: string;
};

export async function GET(request: Request) {
  try {
    const secret = request.headers.get("some-secret");

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const selectedDateFilter = searchParams.get("date") as DatesFilterType;

    const parsed = datesEnum.safeParse(selectedDateFilter);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Date is required" },
        { status: 400 }
      );
    }

    if (!secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    if (env.SOME_SECRET_TOKEN !== secret) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const { fromDate, toDate } =
      getToDateAndFromDateFromDateFilter(selectedDateFilter);

    const results = await prisma.$queryRaw<
      DayWiseBlogViewsQueryType[]
    >`SELECT date(created_at) as date, count(views)::int as views from "PostViews" WHERE created_at::timestamp between ${fromDate}::timestamp and ${toDate}::timestamp GROUP BY date ORDER BY date`;

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ success: true, data: [] }, { status: 400 });
  }
}
