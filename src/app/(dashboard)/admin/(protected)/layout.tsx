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

  React.useEffect(() => {
    if (!authState.loggedIn) return router.push("/admin/login");
  }, [authState.loggedIn, router]);

  return children;
}
