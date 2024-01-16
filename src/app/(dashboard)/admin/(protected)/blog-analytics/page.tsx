"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  useFetcPostViewsBySlug,
  useFetchPostViewsByDays,
} from "../../_hooks/useAdmin";

function BlogAnalytics() {
  const { data: daywiseViews, isLoading: loadingDaywiseViews } =
    useFetchPostViewsByDays();

  const { data: postwiseViews, isLoading: loadingPostwiseViews } =
    useFetcPostViewsBySlug();

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full">
        <div className="my-8 w-full h-[500px]">
          <section className="mb-5">
            <h3 className="mb-5 text-base font-medium">Post Views By Day</h3>
            {loadingDaywiseViews && <span>Loading...</span>}
            {!loadingDaywiseViews && daywiseViews && (
              <ResponsiveContainer width={"100%"} height={450}>
                <LineChart
                  data={daywiseViews?.data.map((d: any) => ({
                    ...d,
                    date: new Date(d.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                    }),
                  }))}
                >
                  <XAxis
                    dataKey="date"
                    padding={{ left: 30, right: 30 }}
                    stroke="#fff"
                  />
                  <YAxis stroke="#fff" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    activeDot={{ r: 8 }}
                    stroke="rgb(253 85 182)"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </section>
        </div>

        <div className="my-8">
          <section className="mb-5">
            <h3 className="mb-5 text-base font-medium">Post Views By Slug</h3>
            {loadingPostwiseViews && <span>Loading</span>}
            {!loadingPostwiseViews && postwiseViews && (
              <ul className="divide-y divide-dracula-darker-800 border border-dracula-darker-800">
                {postwiseViews.data?.map((d: any, idx: number) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-transparent  text-sm font-medium  text-dracula-dark-200 p-2"
                  >
                    <span className="flex-1">/{`${d.slug}`}</span>

                    <span className="text-dracula-pink-400 font-medium">
                      {d.views}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default BlogAnalytics;
