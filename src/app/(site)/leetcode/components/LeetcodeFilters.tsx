"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import useSerializeSearchParams from "@/hooks/useSerializeSearchParams";
import { findFilter } from "@/utils";
import { DifficultType, TagType } from "@/types";

import Tag from "../../../components/Tag";

type LeetcodeFiltersPropsType = {
  tags: TagType[];
  difficulties: DifficultType[];
};

function FilterTag({
  filter: { name, slug },
  filters,
  paramsKey,
}: {
  filter: { id: number; name: string; slug: string };
  filters: { slug: string; key: string }[];
  paramsKey: string;
}) {
  const found = findFilter(filters, slug);

  const withoutSelf = filters
    .filter((f) => f.key === paramsKey)
    .filter((f) => f.slug !== slug)
    .map((f) => f.slug)
    .join(",");

  const includingSelf = [...filters, { slug, key: paramsKey }]
    .filter((f) => f.key === paramsKey)
    .map((f) => f.slug)
    .join(",");

  const params = useSerializeSearchParams({
    [paramsKey]: found ? withoutSelf : includingSelf,
    page: undefined,
  });

  const pathname = usePathname();

  return (
    <Link href={{ pathname, query: params }}>
      <Tag tag={name} isActive={!!found} />
    </Link>
  );
}

function LeetcodeFilters({ tags, difficulties }: LeetcodeFiltersPropsType) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<{ slug: string; key: string }[]>([]);
  const searchRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const tagsString = searchParams.get("tags");
    const difficultiesString = searchParams.get("difficulties");
    const query = searchParams.get("query") || "";

    const tags = tagsString
      ? tagsString?.split(",").map((tag) => ({ slug: tag, key: "tags" }))
      : [];
    const difficulties = difficultiesString
      ? difficultiesString
          ?.split(",")
          .map((difficulty) => ({ slug: difficulty, key: "difficulties" }))
      : [];
    setFilters([...tags, ...difficulties]);

    if (searchRef.current) {
      searchRef.current.value = query;
    }
  }, [searchParams]);

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const keys = [...searchParams.keys()].filter(
        (param) => param !== "page" && param !== "query"
      );

      const query = searchRef.current?.value;

      let mergedQueryParams = query
        ? `query=${searchRef.current?.value.trim()}`
        : "";
      keys.forEach(
        (key) => (mergedQueryParams += `&${key}=${searchParams.get(key)}`)
      );

      router.push(
        `/leetcode${mergedQueryParams ? `?${mergedQueryParams}` : ""}`
      );
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="search hidden" className="text-sm md:text-base ">
          Search problems
        </label>
        <input
          ref={searchRef}
          type="search"
          name="search"
          id="search"
          placeholder="Search problems via name..."
          className="w-full px-2.5 py-1.5 text-xs md:text-sm font-normal text-gray-800 rounded-md outline-none border border-gray-500 focus:ring-1 focus:ring-dracula-pink-400 focus:border-dracula-pink-400"
          onKeyDown={handleKeyDown}
        />
        <span className="mt-1 block text-xs font-normal text-gray-400 leading-5 tracking-wide">
          Hit enter to search.
        </span>
      </div>
      <div className="mt-5 flex items-center gap-6">
        <span className="text-sm font-normal">Difficulty:</span>
        <div className="flex-1 flex flex-wrap gap-2">
          {difficulties.map((difficulty) => (
            <FilterTag
              key={difficulty.id}
              filter={{
                id: difficulty.id,
                name: difficulty.level,
                slug: difficulty.slug,
              }}
              filters={filters}
              paramsKey="difficulties"
            />
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-6">
        <span className="text-sm font-normal">Tags:</span>
        <div className="flex-1 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <FilterTag
              key={tag.id}
              filter={{
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
              }}
              filters={filters}
              paramsKey="tags"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeetcodeFilters;
