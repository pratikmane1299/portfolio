import type { Metadata } from "next";

import BlogAnalyticsProvider from "@/contexts/blog-analytics";
import BlogAnalytics from "./BlogAnalytics";

export const metadata: Metadata = {
  title: "Blog Analytics",
  description: "Blog analytics for Pratik Manes blog.",
};

export default function Page() {
  return (
    <BlogAnalyticsProvider>
      <BlogAnalytics />
    </BlogAnalyticsProvider>
  );
}
