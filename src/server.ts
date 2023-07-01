"use server";

import prisma from "./lib/prisma";

import { splitString } from "./utils";

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
  difficulties?: string;
  query?: string;
}) {
  const { page = 1, tags = "", difficulties = "", query = "" } = params;

  const limit = 25;
  const tagsArr: string[] = splitString(tags),
    difficultiesArr: string[] = splitString(difficulties);

  const offset = limit * page - limit;

  const tagsFilter = tagsArr.length
    ? {
        tags: {
          some: {
            tag: {
              slug: {
                in: tagsArr,
              },
            },
          },
        },
      }
    : {};

  const difficultiesFilter = difficultiesArr.length
    ? {
        difficulty: {
          slug: {
            in: difficultiesArr,
          },
        },
      }
    : {};

  const nameFilter = query
    ? { title: { contains: query, mode: "insensitive" } }
    : {};

  const whereClause: any = {
    ...nameFilter,
    ...tagsFilter,
    ...difficultiesFilter,
  };

  const [total, problems] = await prisma.$transaction([
    prisma.question.count({ where: whereClause }),
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
      where: whereClause,
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
