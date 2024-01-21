"use client";

import DayWiseViews from "./DayWiseViews";
import Filters from "./Filters";
import PostWiseViews from "./PostWiseViews";
import Stats from "./Stats";

export default function BlogAnalytics() {
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full">
        <div className="mt-5 flex justify-between items-center">
          <Stats />
          <Filters />
        </div>
        <div className="divide-y divide-gray-300">
          <DayWiseViews />
          <PostWiseViews />
        </div>
      </div>
    </div>
  );
}
