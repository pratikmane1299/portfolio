"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import useSerializeSearchParams from "@/hooks/useSerializeSearchParams";
import { findFilter } from "@/utils";

import Tag from "./Tag";

type LeetcodeFiltersPropsType = {
  tags: any[];
  difficulties: any[];
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
  const [filters, setFilters] = useState<{ slug: string; key: string }[]>([]);

  useEffect(() => {
    const tagsString = searchParams.get("tags");
    const difficultiesString = searchParams.get("difficulties");

    const tags = tagsString
      ? tagsString?.split(",").map((tag) => ({ slug: tag, key: "tags" }))
      : [];
    const difficulties = difficultiesString
      ? difficultiesString
          ?.split(",")
          .map((difficulty) => ({ slug: difficulty, key: "difficulties" }))
      : [];
    setFilters([...tags, ...difficulties]);
  }, [searchParams]);

  return (
    <div>
      <input
        type="search"
        placeholder="Search problems via name..."
        className="w-full px-2.5 py-1.5 text-sm font-normal text-gray-800 rounded-md outline-none border border-gray-500 focus:ring-1 focus:ring-dracula-pink-400 focus:border-dracula-pink-400"
      />
      <div className="mt-3 flex items-center gap-6">
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
            // <Link key={tag.id} href={"/leetcode"}>
            //   <Tag tag={tag.name} />
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeetcodeFilters;
