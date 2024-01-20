"use client";

import { useState } from "react";

import { DatesFilterType } from "@/types";
import { useBlogAnalyticsContext } from "@/contexts/blog-analytics";

export default function useDateFilter() {
  const { analyticsState, setBlogAnalyticsState } = useBlogAnalyticsContext();

  function setDateFilter(date: DatesFilterType) {
    setBlogAnalyticsState((prev) => ({
      ...prev,
      date,
    }));
  }

  return { selectedDateFilter: analyticsState.date, setDateFilter };
}
