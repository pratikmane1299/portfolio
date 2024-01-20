"use client";

import React, { useContext } from "react";

import { DatesFilterType } from "@/types";

type BlogAnalyticsType = {
  date: DatesFilterType;
};

type BlogAnalyticsContextType = {
  analyticsState: BlogAnalyticsType;
  setBlogAnalyticsState: React.Dispatch<
    React.SetStateAction<BlogAnalyticsType>
  >;
};

const BlogAnalyticsContext = React.createContext<BlogAnalyticsContextType>({
  analyticsState: { date: "today" },
  setBlogAnalyticsState: () => {},
});

export default function BlogAnalyticsProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [analyticsState, setBlogAnalyticsState] =
    React.useState<BlogAnalyticsType>({ date: "today" });

  return (
    <BlogAnalyticsContext.Provider
      value={{ analyticsState, setBlogAnalyticsState }}
    >
      {children}
    </BlogAnalyticsContext.Provider>
  );
}

export function useBlogAnalyticsContext() {
  return useContext(BlogAnalyticsContext);
}
