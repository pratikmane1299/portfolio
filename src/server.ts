"use server";

import prisma from "./lib/prisma";
import redis from "./lib/redis";

import { generateQueryHashKey, splitString } from "./utils";

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

  const queryHashKey = generateQueryHashKey({
    page,
    tags,
    difficulties,
    query,
  });

  const res = await redis.get(queryHashKey);

  if (res !== null) {
    // if found in cache return the cached value;
    return res;
  }

  // fetch data from db and save in cache;
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

  // set cache for 1 day...
  await redis.set(queryHashKey, JSON.stringify({ total, problems }), {
    ex: 24 * 60 * 60,
  });

  return { total, problems };
}

export async function getAllTagsForFilter() {
  return await redis.get("TAGS");
}

export async function getAllDifficulty() {
  return await redis.get("DIFFICULTIES");
}
