import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  let payload: { problemId: number };
  try {
    payload = await request.json();

    if (!payload?.problemId)
      return NextResponse.json(
        {
          success: false,
          message: "Problem id is required",
        },
        { status: 400 }
      );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Problem id is required",
      },
      { status: 400 }
    );
  }

  const { problemId } = payload;

  const problem = await prisma.question.findFirst({
    where: { id: problemId },
    select: { id: true },
  });

  if (!problem)
    return NextResponse.json(
      {
        success: false,
        message: "Leetcode problem not found",
      },
      { status: 400 }
    );

  try {
    await prisma.questionViews.create({
      data: {
        questionId: problemId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
