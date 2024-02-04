import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { DatesFilterType, datesEnum } from "@/types";
import { getToDateAndFromDateFromDateFilter } from "@/utils";
import withAuth from "@/middlewares/auth";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

type PostWiseBlogViewsQueryType = {
  views: number;
  slug: string;
};

export const GET = withAuth(
  async (request: Request, response: NextResponse) => {
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
      PostWiseBlogViewsQueryType[]
    >`SELECT slug, count(views)::int as views from "PostViews" WHERE created_at::timestamp between ${fromDate}::timestamp and ${toDate}::timestamp  GROUP BY slug`;

    return NextResponse.json({ success: true, data: results });
  }
);

export async function OPTIONS(req: Request) {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}
