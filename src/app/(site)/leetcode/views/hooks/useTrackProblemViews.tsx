"use client";

import { useMutation } from "@tanstack/react-query";

function track({ problemId }: { problemId: number }) {
  return fetch(`/leetcode/views/track`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ problemId }),
  });
}

export default function useTrackProblem() {
  return useMutation(track);
}
