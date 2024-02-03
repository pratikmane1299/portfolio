"use client";

import { useAuthContext } from "@/contexts/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await fetch(`/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json().then((parsed) => ({
          status: res.status,
          message: parsed.message,
          error: parsed?.error,
        }));

        return Promise.reject(error);
      }

      return await res.json().then((data: any) => data.data);
    },
  });
}

export function useGetAuthUser() {
	const {setAuthState} = useAuthContext();

  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`/api/admin/auth-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return Promise.reject(
          await res.json().then((data) => ({
            status: res.status,
            message: data?.message,
            error: data?.error,
          }))
        );
      }

      return await res.json().then((data) => data.data);
    },
    onSuccess: (data) => {
      setAuthState({ loggedIn: true, user: data });
    },
  });
}
