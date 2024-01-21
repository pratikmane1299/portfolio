"use client";

import { useMemo } from "react";
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

import Spinner from "@/app/components/Spinner";

export default function DayWiseViews() {
  const {
    data: daywiseViews,
    isLoading: loadingDaywiseViews,
    isError,
  } = useFetchPostViewsByDays();

  const chartData = useMemo(() => {
    if (daywiseViews?.data && daywiseViews?.data?.length > 0) {
      return daywiseViews?.data?.map((d: any) => ({
        ...d,
        date: new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        }),
      }));
    } else {
      return [];
    }
  }, [daywiseViews]);

  return (
    <section className="py-5 h-[500px]">
      <h3 className="mb-5 text-base font-medium">Post Views By Day</h3>
      {loadingDaywiseViews && (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!loadingDaywiseViews && daywiseViews && (
        <>
          {chartData.length > 0 && (
            <ResponsiveContainer width={"100%"} height={400}>
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  padding={{ left: 30, right: 30 }}
                  stroke="#fff"
                  className="text-xs"
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
          {chartData.length === 0 && (
            <div className="h-full flex justify-center items-center">
              <span className="text-gray-200 text-sm">Data not available</span>
            </div>
          )}
        </>
      )}
      {isError && (
        <div className="h-full flex justify-center items-center">
          <span className="text-gray-200 text-sm">Could not fech data</span>
        </div>
      )}
    </section>
  );
}
