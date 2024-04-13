"use client";
import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

type ProvidersPropsType = PropsWithChildren<{}>;

export default function Providers({ children }: ProvidersPropsType) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>

        {children}
        <ProgressBar
          height="3px"
          color="#89C3DC"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
