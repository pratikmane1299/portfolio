import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { DatesFilterType, datesEnum } from "@/types";
import { getToDateAndFromDateFromDateFilter } from "@/utils";
import withAuth from "@/middlewares/auth";

type DayWiseBlogViewsQueryType = {
  views: number;
  date: string;
};

export const GET = withAuth(async (request, response) => {
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

  const { fromDate, toDate } =
    getToDateAndFromDateFromDateFilter(selectedDateFilter);

  const results = await prisma.$queryRaw<
    DayWiseBlogViewsQueryType[]
  >`SELECT date(created_at) as date, count(views)::int as views from "PostViews" WHERE created_at::timestamp between ${fromDate}::timestamp and ${toDate}::timestamp GROUP BY date ORDER BY date`;

  return NextResponse.json({ success: true, data: results });
});
