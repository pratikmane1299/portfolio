"use server";

import prisma from "./lib/prisma";

export async function getRecentLeetcodeProblems() {
	return await prisma.question.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
			number: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
}
