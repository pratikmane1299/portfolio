"use client";

import { useFetcPostViewsBySlug } from "../../_hooks/useAdmin";

import Spinner from "@/app/components/Spinner";

export default function PostWiseViews() {
  const {
    data: postwiseViews,
    isLoading: loadingPostwiseViews,
    isError,
  } = useFetcPostViewsBySlug();

  return (
    <section className="py-5 h-[300px]">
      <h3 className="mb-5 text-base font-medium">Post Views By Slug</h3>
      {loadingPostwiseViews && (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {!loadingPostwiseViews && postwiseViews && (
        <>
          {postwiseViews.data?.length > 0 && (
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

          {postwiseViews.data?.length === 0 && (
            <div className="h-full flex justify-center items-center">
              <span className="text-gray-200 text-sm">Data not available</span>
            </div>
          )}
        </>
      )}
      {isError && (
        <div className="h-full flex justify-center items-center">
          <span className="text-gray-200 text-sm">Could not fech data</span>
        </div>
      )}
    </section>
  );
}
