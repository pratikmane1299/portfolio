import { useQuery } from "@tanstack/react-query";

import { getDaywiseViews, getPostWiseViews } from "../_services/admin";

export function useFetchPostViewsByDays() {
  return useQuery({
    queryKey: ["daywise-views"],
    queryFn: getDaywiseViews,
    refetchOnWindowFocus: false,
    staleTime: 600000, // 10 mins,
  });
}

export function useFetcPostViewsBySlug() {
  return useQuery({
    queryKey: ["postwise-views"],
    queryFn: getPostWiseViews,
    staleTime: 600000,
  });
}
