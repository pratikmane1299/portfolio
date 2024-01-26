"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/auth";

export default function AuthWrapper({ children }: React.PropsWithChildren) {
  const router = useRouter();
  const { authState } = useAuthContext();

  React.useLayoutEffect(() => {
    console.log({
      authState,
    });

    if (!authState.loggedIn) {
      window.location.href = `${window.location.origin}/admin/login`;
    }
  }, [authState.loggedIn]);

  if (!authState.loggedIn) return null;

  // if (window && !authState.loggedIn) {
  //   return (window.location.href = `${window.location.origin}/admin/login`);
  // }

  return children;
}
