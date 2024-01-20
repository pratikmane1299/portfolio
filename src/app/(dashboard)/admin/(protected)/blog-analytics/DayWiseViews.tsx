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

import { useFetchPostViewsByDays } from "../../_hooks/useAdmin";

export default function DayWiseViews() {
  const { data: daywiseViews, isLoading: loadingDaywiseViews } =
    useFetchPostViewsByDays();

  return (
    <div className="my-8 w-full h-[500px]">
      <section className="mb-5">
        <h3 className="mb-5 text-base font-medium">Post Views By Day</h3>
        {loadingDaywiseViews && <span>Loading...</span>}
        {!loadingDaywiseViews && daywiseViews && (
          <ResponsiveContainer width={"100%"} height={450}>
            <LineChart
              data={daywiseViews?.data?.map((d: any) => ({
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
  );
}
