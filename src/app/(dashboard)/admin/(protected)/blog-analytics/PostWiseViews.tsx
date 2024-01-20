"use client";

import { useFetcPostViewsBySlug } from "../../_hooks/useAdmin";

export default function PostWiseViews() {

  const { data: postwiseViews, isLoading: loadingPostwiseViews } =
    useFetcPostViewsBySlug();

  return (
    <div className="my-8">
      <section className="mb-5">
        <h3 className="mb-5 text-base font-medium">Post Views By Slug</h3>
        {loadingPostwiseViews && <span>Loading...</span>}
        {!loadingPostwiseViews && postwiseViews && (
          <ul className="divide-y divide-dracula-darker-800 border border-dracula-darker-800">
            {postwiseViews.data?.map((d: any, idx: number) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-transparent  text-sm font-medium  text-dracula-dark-200 p-2"
              >
                <span className="flex-1">/{`${d.slug}`}</span>

                <span className="text-dracula-pink-400 font-medium">
                  {d.views}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
