import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight/lib";

import { classNames } from "@/utils";

const components: MDXComponents = {
  h1: ({ className, ...props }: any) => (
    <h1
      className={classNames(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: any) => (
    <h2
      className={classNames(
        "mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: any) => (
    <h3
      className={classNames(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: any) => (
    <h4
      className={classNames(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: any) => (
    <h5
      className={classNames(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: any) => (
    <h6
      className={classNames(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: any) => (
    <p
      className={classNames(
        "text-sm sm:text-base tracking-wide font-normal break-all leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: any) => (
    <ul className={classNames("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: any) => (
    <ol
      className={classNames("my-6 ml-6 list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: any) => (
    <li className={classNames("mt-2 text-sm sm:text-base", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: any) => (
    <blockquote
      className={classNames(
        "mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
        className
      )}
      {...props}
    />
  ),
  img: ({ className = "", alt, ...props }: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={classNames("rounded-md border border-zinc-200", className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-zinc-200 md:my-8" {...props} />
  ),
  table: ({
    className = "",
    ...props
  }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="w-full my-6 overflow-y-auto">
      <table className={classNames("w-full", className)} {...props} />
    </div>
  ),
  tr: ({
    className = "",
    ...props
  }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={classNames(
        "m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: any) => (
    <th
      className={classNames(
        "border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: any) => (
    <td
      className={classNames(
        "border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: any) => (
    <pre
      className={classNames(
        "overflow-x-auto text-sm sm:text-base rounded-lg bg-zinc-900",
        className
      )}
      {...props}
    />
  ),
  // code: ({ className, ...props }: any) => (
  //   <code
  //     className={classNames(
  //       "relative rounded py-[0.2rem] px-[0.3rem] font-mono text-sm text-dracula-darker-100",
  //       className
  //     )}
  //     {...props}
  //   />
  // ),
};

export default function MDXRenderer(props: MDXRemoteProps) {
  // @ts-expect-error RSC
  return (
    <MDXRemote
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
      }}
      components={components}
      {...props}
    />
  );
}
