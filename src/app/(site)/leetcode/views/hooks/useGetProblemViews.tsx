'use client';

import { useQuery } from "@tanstack/react-query";

export default function useGetProblemViews(problemId: number) {
  return useQuery({
    queryKey: ["/problem/views", problemId],
    queryFn: ({ queryKey }: { queryKey: (string | number)[] }) => {
      const [, problemId] = queryKey;

      return fetch(`/leetcode/views/${problemId}`).then((res) => res.json());
    },
    select: (data) => data?.views,
    // staleTime: Infinity,
    // cacheTime: 0,
  });
}