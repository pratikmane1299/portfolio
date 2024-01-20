"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useFetchStats } from "../../_hooks/useAdmin";
import { Skeleton } from "@/components/ui/skeleton";

export default function Stats() {
  const { data, isLoading } = useFetchStats();

  return (
    <div className="flex space-x-6">
      <Card className="w-[150px]">
        <CardContent className="p-4 flex flex-col space-y-1">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="h-3 w-[100px] rounded" />
              <Skeleton className="h-6 w-[80px] rounded" />
            </div>
          )}
          {!isLoading && data && (
            <>
              <span className="text-sm font-medium text-gray-300">
                Total Views
              </span>
              <span className="text-2xl font-semibold">{data}</span>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
