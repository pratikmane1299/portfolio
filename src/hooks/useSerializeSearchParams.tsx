"use client";
import { useSearchParams } from "next/navigation";

export default function useSerializeSearchParams(paramsToSerialize: {
  [key: string]: string | number;
}) {
  const seachParams = useSearchParams();

  let queryParams: any = {};

  for (const [param, value] of [
    ...seachParams.entries(),
    ...Object.entries(paramsToSerialize),
  ]) {
    if (typeof param === "string")
      queryParams = { ...queryParams, [param]: value };
  }

	return queryParams;
}