"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuthContext } from "@/contexts/auth";

export default function PublicRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { authState } = useAuthContext();

  React.useEffect(() => {
    if (authState.loggedIn) return router.replace("/admin/blog-analytics");
  }, [authState.loggedIn]);

  if (!authState.loggedIn) {
    return children;
  }

  return <></>;
}
