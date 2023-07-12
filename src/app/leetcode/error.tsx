"use client";
import { useEffect } from "react";
import Link from "next/link";

import ErrorIllustration from "../components/ErrorIllustration";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.log("error - ", error);
  }, [error]);

  return (
    <div className="flex h-full">
      <div className="m-auto">
        <div className="px-4 flex flex-col items-center">
          <ErrorIllustration className="w-[250px] md:w-[400px] h-auto" />
          <h6 className="mt-8 text-lg md:text-xl text-center font-medium tracking-wide">
            {`Oops !!! You weren't supposed to see this.`}
          </h6>
          <Link
            href={"/"}
            className="mt-5 px-2 py-1 md:px-4 md:py-2 block text-xs sm:text-sm font-normal tracking-wide  bg-dracula-pink-600 rounded-md border border-dracula-pink-600 hover:opacity-80 focus:ring-1 focus:ring-dracula-pink-600 focus:ring-offset-1"
          >
            {`Let's get you back to a safe place`}
          </Link>
        </div>
      </div>
    </div>
  );
}
