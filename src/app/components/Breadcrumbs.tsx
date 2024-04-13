import React from "react";
import Link from "next/link";

type PagePropsType = {
  href: string;
  label: string;
};

type BreadcrumbsPropsType = {
  pages: PagePropsType[];
};

export default function Breadcrumbs({ pages }: BreadcrumbsPropsType) {
  return (
    <nav className="mb-4">
      <ol className="flex flex-wrap items-center">
        {pages.map((page, idx) => {
          const isCurrentPage = idx === pages.length - 1;

          return (
            <li key={idx} className="py-1 text-xs font-light mr-2 leading-5 text-secondary-foreground">
              {isCurrentPage ? (
                <span>{page.label}</span>
              ) : (
                <React.Fragment>
                  <Link
                    href={page.href}
                    aria-aria-current={isCurrentPage ? "page" : false}
                    className="mr-2"
                  >
                    {page.label}
                  </Link>
                  {!isCurrentPage && <span>/</span>}
                </React.Fragment>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
