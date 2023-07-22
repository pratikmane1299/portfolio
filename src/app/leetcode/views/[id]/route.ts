import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const problemId = parseInt(params.id);

  try {
    const count = await prisma.questionViews.aggregate({
      _count: {
        questionId: true,
      },
      where: {
        questionId: problemId,
      },
    });

    return NextResponse.json({ success: true, views: count._count.questionId });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
