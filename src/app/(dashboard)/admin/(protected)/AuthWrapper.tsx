"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/auth";
import { useGetAuthUser } from "../_hooks/useAuth";
import Spinner from "@/app/components/Spinner";

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { authState } = useAuthContext();

  const { isLoading } = useGetAuthUser();

  React.useLayoutEffect(() => {
    console.log(authState.loggedIn);

    if (!isLoading && !authState.loggedIn) {
      window.location.href = `${window.location.origin}/admin/login`;
    }
  }, [isLoading, authState.loggedIn]);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  if (!authState.loggedIn) return null;

  return children;
}
