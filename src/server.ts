import prisma from "./lib/prisma";
import redis from "./lib/redis";
import { DifficultType, LeetCodeTableProblemsResType, LeetcodeProblemDetailType, LeetcodeProblemsAllSlugsResType, TagType } from "./types";
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
}): Promise<LeetCodeTableProblemsResType> {
  const { page = 1, tags = "", difficulties = "", query = "" } = params;

  const queryHashKey = generateQueryHashKey({
    page,
    tags,
    difficulties,
    query,
  });

  const res: any = await redis.get(queryHashKey);

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

export async function getAllTagsForFilter(): Promise<TagType[]> {
  return (await redis.get("TAGS")) as TagType[];
}

export async function getAllDifficulty(): Promise<DifficultType[]> {
  return (await redis.get("DIFFICULTIES")) as DifficultType[];
}

export async function getLeetcodeProblemBySlug(
  slug: string
): Promise<LeetcodeProblemDetailType | null> {
  const KEY_PREFIX = "problem-page-";
  const cacheKey = KEY_PREFIX + slug;

  const dataFromCache = (await redis.get(
    cacheKey
  )) as LeetcodeProblemDetailType;

  if (dataFromCache !== null) return dataFromCache;

  const problem = (await prisma.question.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      id: true,
      number: true,
      title: true,
      description: true,
      code: true,
      difficulty: {
        select: {
          level: true,
        },
      },
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
    },
  })) as LeetcodeProblemDetailType;

  await redis.set(cacheKey, JSON.stringify(problem), { ex: 604_800 });

  return problem;
}

export async function getAllLeetcodeProblemsSlug(): Promise<LeetcodeProblemsAllSlugsResType> {
  const cacheKey = "ALL_PROBLEMS_SLUGS";

  const allSlugsFromCache = (await redis.get(
    cacheKey
  )) as LeetcodeProblemsAllSlugsResType;

  if (allSlugsFromCache !== null) return allSlugsFromCache;

  const allSlugsRes = (await prisma.question.findMany({
    select: {
      id: true,
      slug: true,
    },
  })) as LeetcodeProblemsAllSlugsResType;

  await redis.set(cacheKey, JSON.stringify(allSlugsRes), { ex: 86400 });

  return allSlugsRes;
}
