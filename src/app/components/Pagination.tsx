"use client";

import React, { PropsWithChildren } from "react";
import Link from "next/link";

import { classNames, paginate } from "@/utils";
import useSerializeSearchParams from "@/hooks/useSerializeSearchParams";

type PaginationLinkPropsType = PropsWithChildren<{
  page: number;
  currentPage: number;
  urlPrefix?: string;
	isDisabled?: boolean;
}>;

function PaginationLink({
  children,
  page,
  currentPage,
  urlPrefix = "/",
  isDisabled = false,
}: PaginationLinkPropsType) {
  const serialized = useSerializeSearchParams({ page });
  const baseClasses =
    "px-4 py-2 text-sm font-normal transition duration-300 ease-in-out ";

  const activeClasses =
    currentPage === page
      ? "bg-dracula-darker-700"
      : "hover:bg-dracula-darker-700";

  const disabledClasses = isDisabled ? "disabled:cursor-not-allowed" : "";

  if (isDisabled) {
    return (
      <button
        type="button"
        disabled={isDisabled}
        className={classNames(baseClasses, disabledClasses, "outline-none")}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={{ pathname: urlPrefix, query: serialized }}
      className={classNames(baseClasses, activeClasses)}
    >
      {children}
    </Link>
  );
}

type PaginationPropsType = {
  page: number;
  pageSize: number;
  total: number;
  urlPrefix?: string;
};

export default function Pagination({
  page = 1,
  pageSize = 10,
  total,
  urlPrefix = "/",
}: PaginationPropsType) {
  const { pages, previousPage, nextPage, hasPreviousPage, hasNextPage } =
    paginate({ page, pageSize, total });

  return (
    <div className="ring-1 ring-gray-500 flex w-fit rounded-md divide-x divide-gray-500 overflow-hidden	">
      <PaginationLink
        urlPrefix={urlPrefix}
        currentPage={page}
        page={previousPage}
        isDisabled={!hasPreviousPage}
      >
        {"<"}
      </PaginationLink>
      {pages.map((pageNumber) => (
        <PaginationLink
					key={pageNumber}
          urlPrefix={urlPrefix}
          currentPage={page}
          page={pageNumber}
        >
          {pageNumber}
        </PaginationLink>
      ))}
      <PaginationLink
        urlPrefix={urlPrefix}
        currentPage={page}
        page={nextPage}
        isDisabled={!hasNextPage}
      >
        {">"}
      </PaginationLink>
    </div>
  );
}
