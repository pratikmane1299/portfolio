import { MDXComponents } from "mdx/types";
import Link from 'next/link';

import { classNames } from "@/utils";

import ExternalLink from "./ExternalLink";
import Code from "./Code";

export const components: MDXComponents = {
  p: ({ className, ...props }: any) => (
    <p
      className={classNames(
        "text-xs sm:text-[14px] text-white tracking-wide font-normal break-words whitespace-break-spaces leading-8 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: any) => (
    <ul className={classNames("my-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: any) => (
    <ol
      className={classNames("my-6 list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: any) => (
    <li
      className={classNames("mt-1 text-xs sm:text-[14px] leading-7 text-white", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: any) => (
    <blockquote
      className={classNames(
        "mt-6 border-l-4 border-gray-500 italic [&>*]:text-dracula-darker-100",
        className
      )}
      {...props}
    />
  ),
  img: ({ className = "", alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={classNames("rounded md:rounded-md", className)}
      alt={alt}
      width={700}
      height={400}
      loading="lazy"
      {...props}
    />
  ),
  code: ({ className = '', ...props }) => (
    <code className={classNames(className, 'p-1 bg-dracula-dark-600 rounded md:rounded-md font-normal after:content-none before:content-none')} {...props} />
  ),
  pre: Code,
  a: ({ href, className, children }: React.HTMLProps<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      return <Link href={href}>{children}</Link>
    }

    if (href && href.startsWith('#')) {
      return <a href={href}>{children}</a>;
    }

    return <ExternalLink href={href} className="no-underline">{children}</ExternalLink>
  },
  table: ({
    className = "",
    ...props
  }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="w-full my-6 overflow-y-auto rounded-md ring-1 ring-gray-500">
      <table className={classNames("w-full m-0", className)} {...props} />
    </div>
  ),
  thead: ({
    className = '',
    children,
    ...props
  }: React.HtmlHTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={classNames(className, 'border-b border-gray-500')} {...props}>
      {children}
    </thead>
  ),
  tr: ({
    className = "",
    ...props
  }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={classNames(
        "m-0 divide-x divide-gray-500 p-0 [&:not(:last-child)]:border-gray-500 [&:not(:last-child)]border-b ",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: any) => (
    <th
      className={classNames(
        "py-2 px-3 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: any) => (
    <td
      className={classNames(
        "py-2 px-3 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  Details: ({ summary, children, ...props }: any) => {
    return (
      <div className="p-4 bg-gray-900 rounded md:rounded-md cursor-pointer">
        <details {...props}>
          <summary>{summary}</summary>

          {children}
        </details>
      </div>
    )
  },
};
