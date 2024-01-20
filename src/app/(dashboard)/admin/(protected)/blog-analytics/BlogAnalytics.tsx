"use client";

import DayWiseViews from "./DayWiseViews";
import Filters from "./Filters";
import PostWiseViews from "./PostWiseViews";

export default function BlogAnalytics() {
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full">
        <Filters />
        <DayWiseViews />
        <PostWiseViews />
      </div>
    </div>
  );
}
