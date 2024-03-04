"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const queryClient = new QueryClient();

type ProvidersPropsType = PropsWithChildren<{}>;

export default function Providers({ children }: ProvidersPropsType) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ProgressBar
        height="3px"
        color="#fd55b6"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
}
