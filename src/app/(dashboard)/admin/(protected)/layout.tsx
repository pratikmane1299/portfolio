"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/auth";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { authState } = useAuthContext();

  React.useLayoutEffect(() => {
    console.log({
      authState,
    });

    if (!authState.loggedIn) return router.replace("/admin/login");
  }, [authState.loggedIn]);

  if (authState.loggedIn) {
    return children;
  }

  return <></>;
}
