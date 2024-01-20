import { QueryKey } from "@tanstack/react-query";

import { env } from "@/env.mjs";
import { DatesFilterType } from "@/types";

type QueryKeyType = { queryKey: QueryKey };

export async function getDaywiseViews({ queryKey }: QueryKeyType) {
  const date = queryKey[1] as DatesFilterType;

  const newSearchParams = new URLSearchParams({ date });
  try {
    const res = await fetch(
      `/api/blog/analytics/daywise-views?${newSearchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "some-secret": env.NEXT_PUBLIC_SOME_SECRET_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const results = await res.json();

    return results;
  } catch (error) {
    throw error;
  }
}

export async function getPostWiseViews({ queryKey }: QueryKeyType) {
  try {
    const date = queryKey[1] as DatesFilterType;

    const newSearchParams = new URLSearchParams({ date });

    const res = await fetch(
      `/api/blog/analytics/post-wise?${newSearchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "some-secret": env.NEXT_PUBLIC_SOME_SECRET_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const results = await res.json();

    return results;
  } catch (error) {
    throw error;
  }
}
