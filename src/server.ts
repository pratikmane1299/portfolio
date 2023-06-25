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

export async function getLeetcodeProblems(params: {
  page?: number;
  tags?: string;
}) {
  const { page = 1, tags } = params;
  const limit = 25;

  const offset = limit * page - limit;

  const [total, problems] = await prisma.$transaction([
    prisma.question.count(),
    prisma.question.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        number: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        difficulty: {
          select: {
            level: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: limit,
    }),
  ]);

  return { total, problems };
}

export async function getAllTagsForFilter() {
	return await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
}

export async function getAllDifficulty() {
	return await prisma.difficulty.findMany({
    select: {
      id: true,
      level: true,
      slug: true,
    },
  });
}
