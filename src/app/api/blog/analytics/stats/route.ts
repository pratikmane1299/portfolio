import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import withAuth from "@/middlewares/auth";

export const GET = withAuth(async () => {
  const results: number = await prisma.postViews.count();

  return NextResponse.json({ success: true, data: results });
});
