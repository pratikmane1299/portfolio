import { env } from "@/env.mjs";

export async function getDaywiseViews() {
  try {
    const res = await fetch(`/api/blog/analytics/daywise-views`, {
      method: "GET",
      headers: {
        "some-secret": env.NEXT_PUBLIC_SOME_SECRET_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const results = await res.json();

    return results;
  } catch (error) {
    throw error;
  }
}

export async function getPostWiseViews() {
  try {
    const res = await fetch(`/api/blog/analytics/post-wise`, {
      method: "GET",
      headers: {
        "some-secret": env.NEXT_PUBLIC_SOME_SECRET_TOKEN,
        "Content-Type": "application/json",
      },
    });

    const results = await res.json();

    return results;
  } catch (error) {
    throw error;
  }
}
