import { useQuery } from "@tanstack/react-query";

import { getDaywiseViews, getPostWiseViews, getStats } from "../_services/admin";
import useDateFilter from "./useDateFilter";

export function useFetchPostViewsByDays() {
  const { selectedDateFilter } = useDateFilter();

  return useQuery({
    queryKey: ["daywise-views", selectedDateFilter],
    queryFn: getDaywiseViews,
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 min,
  });
}

export function useFetcPostViewsBySlug() {
  const { selectedDateFilter } = useDateFilter();

  return useQuery({
    queryKey: ["postwise-views", selectedDateFilter],
    queryFn: getPostWiseViews,
    staleTime: 60000,
  });
}

export function useFetchStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 600000,
  });
}
