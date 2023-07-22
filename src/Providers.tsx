"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

type ProvidersPropsType = PropsWithChildren<{}>;

export default function Providers({ children }: ProvidersPropsType) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
