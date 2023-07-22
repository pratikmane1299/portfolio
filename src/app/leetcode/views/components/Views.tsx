"use client";
import { useEffect } from "react";

import useGetProblemViews from "../hooks/useGetProblemViews";
import useTrackProblem from "../hooks/useTrackProblemViews";
import { classNames } from "@/utils";

export default function Views({ problemId }: { problemId: number }) {
  const { data: views, isLoading } = useGetProblemViews(problemId);
	const { mutateAsync: track } = useTrackProblem();

  useEffect(() => {
    const timeout = setTimeout(() => {
      track({ problemId });
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      className={classNames(
        isLoading ? "animate-pulse h-2 w-20 rounded-md bg-slate-500" : "text-xs"
      )}
    >
      {views !== undefined ? `Views - ${views}` : null}
    </span>
  );
}
